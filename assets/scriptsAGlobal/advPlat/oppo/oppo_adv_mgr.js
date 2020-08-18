/*
 * @Author: Chen Li Xi
 * @Description: oppo 平台视频广告，banner广告，插屏广告
 */
var _instance;
let _Base_Adv_Mgr = require('base_adv_mgr');
let { OPPO } = require('adv_const');
let _banner = null;
let _insert = null;
let _video = null;

let _nativeAd = null; // 原生广告管理对象
let _naLoad = false; // 原生广告加载成功
let _naInfo = null; // 原生广告数据对象
let _naCbs = []; // 保存请求原生广告的回调函数


class _OPPO_Adv extends _Base_Adv_Mgr {
   constructor() {
      super();
   }

   static getInstance() {
      return _instance || (_instance = new this);
   }
   init() {
      super.init(); // 先执行父类的方法
      this.initOnlineId();
      this.initAdService();
   }
   // 取线上广告ID
   initOnlineId() {
      let allCfg = G_chInfo.getAllCfgs();
      let flowAd = allCfg.flowAd;
      console.log('==代码包中广告id', JSON.stringify(OPPO));

      Array.isArray(flowAd) && flowAd.forEach(item => {
         if (item.flows_type === 'banner' && item.flows_id !== '') {
            OPPO.bannerID = item.flows_id;
         }
         else if (item.flows_type === 'video' && item.flows_id !== '') {
            OPPO.videoID = item.flows_id;
         }
         if (item.flows_type === 'native' && item.flows_id !== '') {
            OPPO.nativeID = item.flows_id;
         }
      });
      console.log('==oppo替换之后广告id', JSON.stringify(OPPO));
   }
   initAdService() {
      if (window.qg && window.qg.initAdService) {
         qg.initAdService({
            appId: G_Const.platAppId,
            isDebug: true,
            success: function (res) {
               console.log(" initAdService success");
            }.bind(this),
            fail: function (res) {
               console.log(" initAdService fail:" + res.code + res.msg);
            },
            complete: function (res) {
               console.log("initAdService complete");
            }
         });
      }
   }
   showBanner() {
      if (!window.qg || !window.qg.createBannerAd) return;
      console.log('---尝试显示Banner广告');

      _banner = qg.createBannerAd({ posId: OPPO.bannerID });
      _banner.onShow(() => {
         // console.log('banner 广告显示')
      });
      _banner.onError((err) => {
         console.log('---banner广告加载出错', err);
      });
      _banner.show();
   }
   hideBanner() {
      console.log('---尝试关闭oppo Banner广告');

      _banner && _banner.destroy && _banner.destroy();
      _banner = null;
   }
   bannerShowCb() {
      this.hideBanner();
   }
   createIns() {
      if (!window.qg || !window.qg.createInsertAd) return;
      console.log('---尝试显示插屏');

      if (!_insert) {
         _insert = qg.createInsertAd({ posId: OPPO.insertID });
         _insert.onLoad(() => {
            _insert.show();
         });
         _insert.onClose(() => {
            this.showBanner();
         });
         _insert.onError(err => {
            console.log('---加载插屏广告出错', err);
            this.showBanner();
         });
      }
      _insert && _insert.load();
   }
   createVideoAdv(succ, fail) {
      if (!window.qg || !window.qg.createRewardedVideoAd) return;
      // 如果创建新的广告位 Ad 对象，会导致之前的 Ad 被销毁
      _video = qg.createRewardedVideoAd({ posId: OPPO.videoID });
      console.log('---视频广告', _video);

      _video.onLoad(function () {
         _video.show();
      }.bind(this));
      _video.onClose((res) => {
         if (res.isEnded) {
            typeof succ === 'function' && succ(true);
            console.log('激励视频广告完成，发放奖励');
         } else {
            typeof succ === 'function' && succ(false);
            console.log('激励视频广告取消关闭，不发放奖励');
         }
      });
      _video.onError(res => {
         console.log('---视频广告出错', res);
         typeof fail === 'function' && fail();
      });

      _video.load();
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
            console.log('---原生广告数据', _naInfo);
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
      let aid = OPPO.nativeID; // 改为640*320图片
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
      let adId = _naInfo.adId;
      console.log('---上报曝光', adId);

      if (typeof adId === 'string' && adId !== '') {
         _nativeAd && _nativeAd.reportAdShow({ adId });

      }
   }
   /**
    * 上报广告点击
    */
   reportAdClick(cb) {
      if (!_naInfo) return;
      let adId = _naInfo.adId;
      console.log('---上报点击', adId);
      if (typeof adId === 'string' && adId !== '') {
         _nativeAd && _nativeAd.reportAdClick({ adId });
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
         console.warn('***非oppo getAdvListPlat');
      }
   }
}


module.exports = _OPPO_Adv;