/*
 * @Author: Chen Li Xi
 * @Description: 微信平台banner广告
 */
let _instance;
let _Base_Adv_Mgr = require('base_adv_mgr');

let ttPlat = require('tt_plat').getInstance();
let ttAdv = null;

let _onLoadCbs = [];
let _loadedBanner = false;
let _bannerCaches = []; // 缓存创建好的banner广告
let _advIdIndex = 0; // 在缓存中取广告，按顺序循环取
let _advBanner = null; // 广告对象，保证页面总是只存在一个广告
let _bStyle = {};

let _getAdvWH = function () {
   let viewWH = cc.view.getFrameSize();
   let viewScale = viewWH.width / viewWH.height;
   // console.log('==手机屏幕比', viewScale);

   let width = 370;
   let adH = 130;

   if (viewScale >= 0.52 && viewScale < 0.54) {
      width = 340;
      adH = 120;
   } else if (viewScale >= 0.54) {
      width = 300;
      adH = 108;
   }
   let left = (viewWH.width - width) / 2; // 左右居中
   let top = viewWH.height - adH; // 后面被减数是广告占用的高度

   _bStyle = { width, top, left };
};
// 广告都加载成功
let _inited = function (bool) {
   _loadedBanner = true;

   for (let j = 0; j < _onLoadCbs.length; j++) {
      _onLoadCbs[j](bool);
   }
   _onLoadCbs = [];
};

function onLoadByBanner(loadCb) {
   if ("function" === typeof loadCb) {
      if (_loadedBanner) {
         let len = _bannerCaches.length;
         loadCb(len > 0);
      }
      else {
         _onLoadCbs[_onLoadCbs.length] = loadCb;
      }
   }
}

// 创建一个banner广告
function createBanner(id) {
   if (!G_chSdk.isTT()) return null;
   let errorCount = 0; // 创建失败次数

   return new Promise((resolve, reject) => {
      createBan();
      function createBan() {
         let banner = tt.createBannerAd({
            adUnitId: id,
            style: _bStyle,
         });

         banner.onLoad(function (res) {
            // console.log('banner创建成功', banner);
            _bannerCaches.push(banner); // 缓存起来
            resolve();
         });
         banner.onResize(size => {
            // console.log('---banner重置尺寸', size);
            let viewWH = cc.view.getFrameSize();
            banner.style.top = viewWH.height - size.height - 3;
            banner.style.left = (viewWH.width - size.width) / 2;
         });
         banner.onError(function (res) {
            // banner创建失败，延迟时间0.1秒之后，
            // 销毁重新创建，连续失败3-5次不再创建；
            errorCount += 1;

            if (errorCount < 2) {
               G_Scheduler.schedule("banner_error_reset", function () {
                  banner && banner.destroy && banner.destroy(); // 销毁
                  banner = null;
                  createBan(); // 重新创建
                  G_Scheduler.unschedule("banner_error_reset");
               }, 0.1, 1);
            } else {
               resolve();
            }
         });
      }
   });
}

// 优先使用线上配置的banner id
function _getBannerIds() {
   let { TT } = require('adv_const');
   let adUnitIds = Array.isArray(TT.bannerIDs) ? TT.bannerIDs : [];
   let onlineIds = G_chInfo.getFlowAd('banner');

   if (G_chSdk.checkString(onlineIds)) {
      adUnitIds = onlineIds.split('||');
   }
   console.log('==线上bannerId', onlineIds, adUnitIds);
   return adUnitIds;
}

function _initBanner() {
   _getAdvWH();
   // console.log('==初始头条banner样式位置', _bStyle);
   let adUnitIds = _getBannerIds();

   let proArr = [];
   let len = adUnitIds.length;
   let startIdx = G_chSdk.random(0, len);
   let currLen = len >= 3 ? 3 : len;

   for (let i = 0; i < currLen; i++) {
      let index = startIdx + i;
      index = index % len;
      let id = adUnitIds[index];

      proArr.push(createBanner(id));
   }

   Promise.all(proArr).then(() => {
      _inited();
   });
}

function _initVideo() {
   let { TT } = require('adv_const');
   let videoAdUnitID = TT.videoID;
   let onlineId = G_chInfo.getFlowAd('video');

   if (G_chSdk.checkString(onlineId)) {
      videoAdUnitID = onlineId;
   }
   console.log('==线上视频广告Id', onlineId, videoAdUnitID);
   // 视频模块
   if (ttAdv === null) {
      ttAdv = require('tt_adv').getInstance();
   }
   ttAdv.init(videoAdUnitID);
}

class _TT_Adv_Mgr extends _Base_Adv_Mgr {
   constructor() {
      super();
   }
   static getInstance() {
      return _instance || (_instance = new this);
   }

   // 一次加载好所有banner，方便后面统一控制
   init() {
      super.init(); // 先执行父类的方法
      _initBanner(); // 微信可以先加载好所有banner备用
      _initVideo();
   }

   // 显示刷新广告，每隔 30 秒（默认，后端可控）重新换个banner
   showBanner(succ, fail, finish = () => { }) {
      let delayTime = 50; // 刷新时间
      let refreshMax = 300; // 自动刷新总次数
      let refreshCount = 0;  // 已刷新次数
      let callSucc = () => {
         refreshCount += 1;
         typeof succ === 'function' && succ();
      };
      this._showOnceBanner(() => {
         callSucc();
         G_Scheduler.unschedule("banner_update_refresh");
         G_Scheduler.schedule(
            "banner_update_refresh",
            function () {
               if (refreshCount == refreshMax) {
                  // 已经展示了最大次数，刷新结束后回调
                  typeof finish === 'function' && finish();
                  G_Scheduler.unschedule("banner_update_refresh");
               } else {
                  console.log('---刷新banner显示', refreshCount);
                  // 还可继续刷新
                  this._showOnceBanner(callSucc, fail);
               }
            }.bind(this), delayTime);
      }, fail);
   }
   hideBanner() {
      _advBanner && _advBanner.hide && _advBanner.hide();
      _advBanner = null;

      // 停止刷新
      G_Scheduler.unschedule("banner_update_refresh");
   }
   createVideoAdv(closeCb, errCb) {
      if (ttAdv === null) {
         ttAdv = require('tt_adv').getInstance();
      }

      if (G_chSdk.getPlatStr() === 'pc') {
         // 浏览器测试直接成功
         typeof closeCb === 'function' && closeCb(true);
      }
      else {
         ttAdv.createVideoAdv(closeCb, errCb);
      }
   }
   share(scene_name, customQueryObj, showFailTips, cb) {
      if (!window.tt || !tt.shareAppMessage) return;
      tt.shareAppMessage({
         success(res) {
            console.log('tt分享成功', JSON.stringify(res));
            typeof cb === 'function' && cb(true);
         },
         fail(res) {
            console.log('tt分享失败', JSON.stringify(res));
            typeof cb === 'function' && cb(false);

         }
      });
   }
   /** 
    * 显示按钮上移误触广告
    */
   showMoveUpBanner(moveBtns, succ, fail) {
      console.log('showMoveUpBanner 执行');
      this.isShowMoveUp(isShow => {
         if (isShow) {
            this.moveBtnToDown(moveBtns);
            G_Scheduler.schedule('btn_up_tkip_banner',
               () => {
                  this._showOnceBanner(() => {
                     typeof cb === 'function' && cb(true);
                     this.saveCount('moveCount', 1);
                     G_Scheduler.schedule('to_up_btns', () => {
                        this.moveBtnToUp(moveBtns);
                     }, 1, 1);
                  }, () => {
                     this.moveBtnToUp(moveBtns);
                     typeof cb === 'function' && cb(false);
                  });
                  G_Scheduler.unschedule("btn_up_tkip_banner");
               }, 0.5, 1);
         }
         else {
            // 不显示上移误触，显示正常广告
            this.showBanner();
            typeof cb === 'function' && cb(false);
         }
      });
   }

   /*
    * 显示快速点击误触广告 未完成
    */
   showFastClickBanner(succ, fail) {
      this.isShowFastClick(isShow => {
         if (isShow) {
            // 显示快速点击误触
            this._showOnceBanner(() => {
               // console.log('显示快速误触广告');
               typeof cb === 'function' && cb(true);
               this.saveCount('clickCount', 1);
            }, () => {
               typeof cb === 'function' && cb(false);
            });
         }
         else {
            // 不显示，则出正常banner
            typeof cb === 'function' && cb(false);
         }
      });
   }

   /**
    * 显示微信banner广告
    * @param {function} succ 广告显示成功的回调
    * @param {function} fail 广告未加载的回调
    */
   _showOnceBanner(succ, fail) {
      onLoadByBanner((hasBan) => {
         onLoadByBanner((hasBan) => {
            if (!hasBan) {
               typeof fail === 'function' && fail();
               return;
            }
            let banner = _bannerCaches[_advIdIndex];
            _advIdIndex += 1;
            _advIdIndex %= _bannerCaches.length;

            if (banner) {
               console.log('banner 广告显示 show 执行', banner);
               // 先尝试隐藏页面已存在的 banner 广告;
               _advBanner && _advBanner.hide && _advBanner.hide();
               _advBanner = null;
               // 然后再显示加载好的新广告;
               banner.show();
               // 再将广告保存到变量中已备下一次隐藏;
               _advBanner = banner;
               typeof succ === 'function' && succ();
            } else {
               typeof fail === 'function' && fail();
            }
         });
      });
   }

   /**
    * 获取后羿广告数据
    */
   getAdvListPlat({ adv_key, success, fail, complete, tryCount = 0 } = {}) {
      tryCount += 1;
      if (G_chSdk.isTT()) {
         typeof tt.h_GetAdvListPlat === 'function' &&
            tt.h_GetAdvListPlat({
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
         console.warn('***非微信平台 getAdvListPlat');

      }
   }
};

module.exports = _TT_Adv_Mgr;