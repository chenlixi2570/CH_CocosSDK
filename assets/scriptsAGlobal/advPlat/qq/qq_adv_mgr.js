/*
 * @Author: Chen Li Xi
 * @Description: 微信平台banner广告
 */
let _instance;
let _Base_Adv_Mgr = require('base_adv_mgr');

let qqAdv = null;

let _adUnitIds = [];
let _onLoadCbs = [];
let _loadedBanner = false;
let _bannerCaches = []; // 缓存创建好的banner广告
let _advIdIdx = 0; // 当前已加载的广告id下标
let _advBanner = null; // 广告对象，保证页面总是只存在一个广告
let _bStyle = {};

let _InterstitialAd = null; // 插屏广告对象
let _appbox = null; // 盒子广告对象
let _boxAdLoad = null; // 盒子广告加载 promise
let _boxAdCb = null; // 盒子广告监听关闭事件
let _boxCount = 0; // 统计盒子广告显示次数

let _getAdvWH = function () {
   let viewWH = cc.view.getFrameSize();
   let curScale = viewWH.width / viewWH.height;
   let oldScale = 750 / 1334;
   let scale = oldScale / curScale;
   // console.log('==手机屏幕比差值', scale);

   let width = viewWH.width - 20;
   let adH = 100;

   let left = (viewWH.width - width) / 2; // 左右居中
   let top = viewWH.height - adH; // 后面被减数是广告占用的高度

   _bStyle = { width, top, left };
};

// banner广告都加载成功
let _inited = function () {
   _loadedBanner = true;
   let len = _bannerCaches.length;
   for (let j = 0; j < _onLoadCbs.length; j++) {
      _onLoadCbs[j](len > 0);
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

// 优先使用线上配置的banner id
function _getBannerIds() {
   let { QQ } = require('adv_const');
   let adUnitIds = Array.isArray(QQ.bannerIDs) ? QQ.bannerIDs : [];
   let onlineIds = G_chInfo.getFlowAd('banner');

   if (G_chSdk.checkString(onlineIds)) {
      adUnitIds = onlineIds.split('||');
   }
   console.log('==线上bannerId', onlineIds, adUnitIds);
   _adUnitIds = adUnitIds;
   return adUnitIds;
}


// 创建一个banner广告
function createBanner(id) {
   if (!G_chSdk.isQQ()) return null;
   let errorCount = 0; // 创建失败次数
   console.log('开始创建QQ banner', id);

   return new Promise((resolve, reject) => {
      createBan();
      function createBan() {

         let banner = qq.createBannerAd({
            adUnitId: id,
            style: _bStyle,
         });
         let loadFn = function (res) {
            console.log('==banner创建成功', JSON.stringify(banner));
            _bannerCaches.push(banner);  // 缓存起来
            banner.offLoad(loadFn);
            resolve();
         };
         let resizeFn = function (size) {
            console.log('==banner重置尺寸', size);
            let viewWH = cc.view.getFrameSize();
            banner.style.top = viewWH.height - size.height - 2;
            banner.style.left = (viewWH.width - size.width) / 2;
            banner.offResize(resizeFn);
         };
         let errorFn = function (res) {
            // banner创建失败，延迟时间0.1秒之后，
            // 销毁重新创建，连续失败2次不再创建；
            errorCount += 1;
            // 测试创建失败重新创建
            console.log('==banner创建失败', JSON.stringify(res));

            if (errorCount < 2) {
               G_Scheduler.schedule("banner_error_reset", function () {
                  banner && banner.destroy && banner.destroy(); // 销毁
                  banner = null;
                  createBan(); // 重新创建
                  G_Scheduler.unschedule("banner_error_reset");
               }, 0.1, 1);
            } else {
               banner.offError(errorFn);
               resolve();
            }
         };

         banner.onLoad(loadFn);

         banner.onResize(resizeFn);

         banner.onError(errorFn);
      }
   });
}

function _initBanner() {
   _getAdvWH();
   console.log('==QQbanner样式位置', _bStyle);
   let adUnitIds = _getBannerIds();
   return; // 不预先加载banner
   let proArr = [];
   let len = adUnitIds.length;
   let startIdx = G_chSdk.random(0, len);
   let currLen = len >= 3 ? 3 : len;

   for (let i = 0; i < currLen; i++) {
      let index = startIdx + i;
      index = index % len;
      _advIdIdx = index;
      let id = adUnitIds[index];

      proArr.push(createBanner(id));
   }

   Promise.all(proArr).then(() => {
      _inited();
   });
}
/**
 * 分享菜单开启
 */
function _initShareMenu() {
   if (window.qq && qq.showShareMenu) {
      qq.showShareMenu({
         showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
      });
      let shareCfg = G_chInfo.getShareCfgs();
      if (shareCfg &&
         shareCfg.ShareList &&
         Array.isArray(shareCfg.ShareList.cfgs) &&
         shareCfg.ShareList.cfgs.length > 0) {
         let obj = shareCfg.ShareList.cfgs[0];
         if (G_chSdk.isObject(obj)) {
            qq.onShareAppMessage(() => ({
               title: obj.title,
               imageUrl: obj.img_url // 图片 URL
            }));

         }
      }
   }
}
/**
 * 初始创建插屏广告
 */
function _initInterAd() {
   /* 建议放在onReady里执行，提前加载广告 */
   if (!window.qq || !window.qq.createInterstitialAd) return;
   let { QQ } = require('adv_const');
   let insertId = QQ.insertID;
   let onlineId = G_chInfo.getFlowAd('insert');

   if (G_chSdk.checkString(onlineId)) {
      insertId = onlineId;
   }
   console.log('--初始QQ插屏广告', insertId);
   if (!G_chSdk.checkString(insertId)) return;

   _InterstitialAd = qq.createInterstitialAd({
      adUnitId: insertId
   });
   // _InterstitialAd.load().catch((err) => {
   //    console.warn('load', err);
   // });
   _InterstitialAd.onLoad(() => {
      console.log('QQ插屏广告 onLoad');
   });
   _InterstitialAd.onClose(() => {
      console.log('QQ插屏广告 close ');
   });
   _InterstitialAd.onError((e) => {
      console.log('QQ插屏广告 error', JSON.stringify(e));
   });
}
/**
 * 初始创建盒子广告
 */
function _initBoxAd() {
   if (!window.qq || !window.qq.createAppBox) return null;
   let { QQ } = require('adv_const');
   let boxId = QQ.boxID;
   let onlineId = G_chInfo.getFlowAd('box');

   if (G_chSdk.checkString(onlineId)) {
      boxId = onlineId;
   }
   console.log('--初始QQ盒子广告', boxId);
   if (!G_chSdk.checkString(boxId)) return;

   _appbox = qq.createAppBox({
      adUnitId: boxId
   });
   _boxAdLoad = _appbox && _appbox.load && _appbox.load();

   _appbox && _appbox.onClose && _appbox.onClose(() => {
      console.log('--用户关闭盒子广告');
      _boxCount += 1;
      if (_boxCount % 2 == 0) {
         _boxAdLoad = null;
         _boxAdLoad = _appbox && _appbox.load && _appbox.load();
      }
      typeof _boxAdCb === 'function' && _boxAdCb();
      _boxAdCb = null;
   });
}

function createNextBanner() {
   // 创建一条新的广告加入缓存数组
   _advIdIdx += 1;
   let index = _advIdIdx % _adUnitIds.length;
   _advIdIdx = index;
   let id = _adUnitIds[index];

   let promise = createBanner(id);

   promise && promise.then(() => {
      console.log('--销毁banner后重新创建一条新的', id, index);
   });
}

function _initVideo() {
   let { QQ } = require('adv_const');
   let videoAdUnitID = QQ.videoID;
   let onlineId = G_chInfo.getFlowAd('video');

   if (G_chSdk.checkString(onlineId)) {
      videoAdUnitID = onlineId;
   }
   console.log('==线上视频广告Id', videoAdUnitID);
   // qq 视频模块
   if (qqAdv === null) {
      qqAdv = require('qq_adv').getInstance();
   }
   qqAdv.init(videoAdUnitID);
}

class _QQ_Adv_Mgr extends _Base_Adv_Mgr {
   constructor() {
      super();
   }
   static getInstance() {
      return _instance || (_instance = new this);
   }


   init() {
      super.init(); // 先执行父类的方法
      _initBanner(); // 一次加载好两条banner，方便后面统一控制
      _initVideo();
      _initInterAd(); // 提前准好插屏广告
      _initBoxAd(); // 提前准备好盒子广告
      _initShareMenu();
   }
   /**
    * 插屏广告显示
    */
   createIns() {
      /* 建议放在需要展示插屏广告的时机执行 */
      console.log('--尝试显示插屏广告');

      _InterstitialAd && _InterstitialAd.show().catch((err) => {
         console.warn('插屏广告显示出错', err);
      });
   }
   /**
    * 显示盒子广告
    * @param {function} cb 
    */
   showBoxAd(cb) {
      console.log('==QQ盒子广告显示函数执行');

      if (_appbox && _boxAdLoad instanceof Promise) {
         if (typeof cb === 'function') {
            _boxAdCb = cb;
         }
         _boxAdLoad.then(() => {
            _appbox.show && _appbox.show();
         });
      }
   }
   // 显示刷新广告，每隔 30 秒重新换个banner
   showBanner(succ, fail, finish = () => { }) {
      let delayTime = 60; // 刷新时间
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
      // 创建一条新的banner
      // createNextBanner();
   }
   createVideoAdv(closeCb, errCb) {
      if (qqAdv === null) {
         qqAdv = require('qq_adv').getInstance();
      }

      if (G_chSdk.getPlatStr() === 'pc') {
         // 浏览器测试直接成功
         typeof closeCb === 'function' && closeCb(true);
      }
      else {
         qqAdv.createVideoAdv(closeCb, errCb);
      }
   }
   share(scene_name, customQueryObj, showFailTips, cb) {
      if (!window.qq || !qq.shareAppMessage) return;
      qq.shareAppMessage({
         success(res) {
            console.log('qq分享成功', JSON.stringify(res));
            typeof cb === 'function' && cb(true);
         },
         fail(res) {
            console.log('qq分享失败', JSON.stringify(res));
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
    * 显示快速点击误触广告
    */
   showFastClickBanner(cb) {
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
    * 显示按钮误触广告
    * @param {function} cb 
    */
   showBtnBanner(cb) {
      this.isShowBtn(isShow => {
         if (isShow) {
            // 显示快速点击误触
            this._showOnceBanner(() => {
               console.log('显示按钮误触广告');
               typeof cb === 'function' && cb(true);
               this.saveCount('btnCount', 1);
            }, () => {
               typeof cb === 'function' && cb(false);
            });
         }
         else {
            typeof cb === 'function' && cb(false);
         }
      });
   }

   /**
    * 显示微信banner广告
    * QQ 改为每次取第1个，关banner时销毁，然后在数组的最后新加一个
    * @param {function} succ 广告显示成功的回调
    * @param {function} fail 广告未加载的回调
    */
   _showOnceBanner(succ, fail) {
      this.showCreateBan(succ, fail);
      return; // 不预先加载好banner
      onLoadByBanner((hasBan) => {
         if (!hasBan) {
            typeof fail === 'function' && fail();
            return;
         }

         let banner = _bannerCaches.shift();
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
   }

   /**
    * 获取后羿广告数据
    */
   getAdvListPlat({
      adv_key,
      success,
      fail,
      complete,
      tryCount = 0
   } = {}) {
      console.warn('**QQ平台无后羿广告数据');
   }

   // 显示一个刚创建的banner广告
   showCreateBan(succ, fail) {
      if (!G_chSdk.isQQ()) {
         typeof fail === 'function' && fail();
         return null;
      }
      let len = _adUnitIds.length;
      let index = G_chSdk.random(0, len);
      let id = _adUnitIds[index];

      let banner = qq.createBannerAd({
         adUnitId: id,
         style: _bStyle,
      });
      let loadFn = function (res) {
         console.log('==banner创建成功', JSON.stringify(banner));
         _advBanner && _advBanner.hide && _advBanner.hide();
         _advBanner = banner;
         banner.show();
         typeof succ === 'function' && succ();
         banner.offLoad(loadFn);
      };
      let resizeFn = function (size) {
         console.log('==banner重置尺寸', size);
         let viewWH = cc.view.getFrameSize();
         banner.style.top = viewWH.height - size.height - 2;
         banner.style.left = (viewWH.width - size.width) / 2;
         banner.offResize(resizeFn);
      };
      let errorFn = function (res) {
         console.log('==banner创建失败', JSON.stringify(res));
         typeof fail === 'function' && fail();
         banner.offError(errorFn);
      };

      banner.onLoad(loadFn);

      banner.onResize(resizeFn);

      banner.onError(errorFn);
   }
};

module.exports = _QQ_Adv_Mgr;