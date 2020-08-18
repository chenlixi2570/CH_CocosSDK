/*
 * @Author: Chen Li Xi
 * @Description: oppo 平台视频广告，banner广告，插屏广告
 */
var _instance;
let _Base_Adv_Mgr = require('base_adv_mgr');
let { VIVO } = require('adv_const');
let _banner = null;
let _video = null;

let _nativeAd = null; // 原生广告管理对象
let _naLoad = false; // 原生广告加载成功
let _naInfo = null; // 原生广告数据对象
let _naCbs = []; // 保存请求原生广告的回调函数

class _OPPO_Adv extends _Base_Adv_Mgr {
   constructor() {
      super();
      this.banIsShow = false;
   }

   static getInstance() {
      return _instance || (_instance = new this);
   }
   init() {
      super.init(); // 先执行父类的方法
      this.initOnlineId();
   }
   // 取线上广告ID
   initOnlineId() {
      let allCfg = G_chInfo.getAllCfgs();
      let flowAd = allCfg.flowAd;
      console.log('==代码包中广告id', JSON.stringify(VIVO));

      Array.isArray(flowAd) && flowAd.forEach(item => {
         if (item.flows_type === 'banner' && item.flows_id !== '') {
            VIVO.bannerID = item.flows_id;
         }
         else if (item.flows_type === 'video' && item.flows_id !== '') {
            VIVO.videoID = item.flows_id;
         }
         if (item.flows_type === 'native' && item.flows_id !== '') {
            VIVO.nativeID = item.flows_id;
         }
      });
      console.log('==vivo替换之后广告id', JSON.stringify(VIVO));
   }
   showBanner() {
      if (G_chInfo.isShowAdvOfVIVO()) {
         return;
      }
      if (!G_chSdk.isVIVO() || !window.qg.createBannerAd) return;
      console.log('---尝试显示Banner广告');
      if (_banner) {
         this.hideBanner();
      }
      _banner = qg.createBannerAd({ posId: VIVO.bannerID, style: {} });
      let adShow = _banner && _banner.show();
      adShow && adShow.then(() => {
         console.log('banner 广告显示');
         this.banIsShow = true;
         G_Scheduler.unschedule('show_vivo_err');
      }).catch(err => {
         console.log('banner 广告显示失败', JSON.stringify(err));
         if (err.code === 30007) {
            this.banIsShow = true;
         }
      });
      this.loadFailBanner();
   }
   // banner广告加载失败
   loadFailBanner() {
      console.log('失败之后再次尝试显示banner广告');
      G_Scheduler.schedule('show_vivo_err', () => {
         if (this.banIsShow) {
            G_Scheduler.unschedule('show_vivo_err');
         } else {
            this.showBanner();
         }
      }, 18);
   }
   hideBanner() {
      console.log('---尝试关闭vivo Banner广告');
      _banner && _banner.destroy && _banner.destroy();
      _banner = null;
   }
   createVideoAdv(_closeCb, _errCb) {
      if (!window.qg || !window.qg.createRewardedVideoAd) return;
      if (_video && _video.load) {
         let adLoad = _video.load();
         adLoad && adLoad.then(() => {
            console.log('激励视频广告开始加载');

         }).catch(err => {
            console.log('激励视频广告加载失败', err);
         });
      }

      if (_video === null) {
         let videoObj = window.qg.createRewardedVideoAd({ posId: VIVO.videoID });

         videoObj.onLoad(function () {
            let adShow = videoObj.show();
            adShow && adShow.then(() => {
               console.log('激励视频广告开始播放');
               cc.audioEngine.pauseAll();
            }).catch(err => {
               console.log('激励视频广告播放失败', err);

            });
         });

         videoObj.onClose(function (res) {
            if (res.isEnded) {
               console.log('激励视频广告完成，发放奖励');
            } else {
               console.log('激励视频广告取消关闭，不发放奖励');
            }
            cc.audioEngine.resumeAll();
            typeof _closeCb === 'function' && _closeCb(res.isEnded);

         });
         // 创建错误
         videoObj.onError(function (err) {
            console.log('创建视频对象出错', err);

            typeof _errCb === 'function' && _errCb();
         });

         // save to on show
         _video = videoObj;
      }
   }
   /**
    * 原生广告加载成功
    * @param {function} cb 
    */
   naOnLoad(cb) {
      console.log('有没有去请求广告数据', _naLoad);

      if (_naLoad) {
         // 已经加载成功直接返回
         typeof cb === 'function' && cb(_naInfo);
      }
      else {
         _naCbs.push(cb);
         this.createNativeAsync();
      }
   }
   _doNaCbs() {
      if (_naLoad && _naCbs.length > 0) {
         _naCbs.forEach(cb => {
            typeof cb === 'function' && cb(_naInfo);
         });
         _naCbs = [];
      }
   }
   /**
    * 异步取广告对象
    */
   createNativeAsync() {
      _nativeAd = this._createNt();
      if (!_nativeAd) {
         this._doNaCbs();
         return;
      };

      _nativeAd.onLoad((res) => {
         if (res.adList.length > 0) {
            _naInfo = res.adList[0];
            console.log('---原生广告数据', res);
            _naLoad = true;
            this._doNaCbs();
         } else {
            console.log('---load成功，但无数据');
            this.destroyNative();
            this._doNaCbs();
         }
      });
      _nativeAd.onError(function (err) {
         console.log('---原生广告err', err);
         this.destroyNative();
         this._doNaCbs();
      });
      _nativeAd.load();
   }
   getNaInfo() {
      return _naInfo;
   }
   _createNt() {
      if (!window.qg || !window.qg.createNativeAd) return null;
      let aid = VIVO.nativeID; // 改为640*320图片
      console.log('原生广告id', aid);
      if (aid) {
         let ntAd = qg.createNativeAd({ posId: aid });
         return ntAd;
      } else {
         return null;
      }
   }

   /**
    * 上报广告曝光
    */
   reportAdShow() {
      if (!_naInfo) return;
      let adId = _naInfo.adId.toString();

      if (typeof adId === 'string' && adId !== '') {
         console.log('---上报曝光', typeof adId, adId);
         _nativeAd && _nativeAd.reportAdShow({ adId });

      }
   }
   /**
    * 上报广告点击
    */
   reportAdClick(cb) {
      if (!_naInfo) return;
      let adId = _naInfo.adId.toString();
      if (typeof adId === 'string' && adId !== '') {
         console.log('---上报点击', adId, _nativeAd.reportAdClick);
         _nativeAd && _nativeAd.reportAdClick({ adId: adId });
         typeof cb === 'function' && cb();
      }
   }
   /**
    * 销毁原生广告
    */
   destroyNative() {
      _nativeAd && _nativeAd.destroy && _nativeAd.destroy();
      _nativeAd = null;
      _naInfo = null;
      _naLoad = false;
   }

   /**
    * 获取后羿广告数据
    */
   getAdvListPlat({ adv_key, success, fail, complete, tryCount = 0 } = {}) {
      tryCount += 1;
      if (window.qg) {
         typeof qg.h_GetAdvListPlat === 'function' &&
            qg.h_GetAdvListPlat({
               adv_key,
               success,
               fail: err => {
                  if (tryCount < 3) {
                     this.getAdvListPlat({
                        adv_key,
                        success,
                        fail,
                        complete,
                        tryCount
                     });
                  } else {
                     typeof fail === 'function' && fail(err);
                  }
               },
               complete
            });
      } else {
         console.warn('***非vivo getAdvListPlat');
      }
   }
}


module.exports = _OPPO_Adv;

// adId: 0
// clickBtnTxt: ""
// creativeType: 0
// desc: "支付宝发福利：点击解锁更多惊喜好礼！"
// icon: ""
// imgUrlList: Array(1)
// 0: "https://static.global.durianclicks.com/res/ad/api/20200420/04201010026891747392.jpg"
// length: 1
// __proto__: Array(0)
// interactionType: 1
// logoUrl: ""
// title: "支付宝红包免单"