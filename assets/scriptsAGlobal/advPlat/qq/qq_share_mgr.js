
let { ShareScene } = require('global_const');
let WxPlat = require('wx_plat').getInstance();

let _instance;
let _cfgs = {};

let _shareFailTips = [
   '请不要一直打扰同一个群',
   '请分享到不同的群聊中',
   '只有分享到群中才可以获得奖励'
];
let _sharingSceneInfo = null;
let _minDurationBetweenShare = 3000;


let _getShareInfo = function (_scene_name) {
   // body...
   if (!_cfgs || !_cfgs[_scene_name]) {
      return null;
   }

   return _cfgs[_scene_name];
};

let _getDoShareCfg = function (_shareInfo) {
   // body...
   if (!_shareInfo || !_shareInfo.cfgs) {
      return null;
   }

   let cfgs = _shareInfo.cfgs;
   let all_weights = 0;

   for (let i = 0; i < cfgs.length; i++) {
      all_weights += parseInt(cfgs[i].weight, 10);
   }

   let random_weight = G_chSdk.randomInt(all_weights);

   let start_weight = 0;
   let end_weight = 0;

   for (let i = 0; i < cfgs.length; i++) {
      start_weight = end_weight;
      end_weight += parseInt(cfgs[i].weight, 10);

      if (random_weight >= start_weight && random_weight <= end_weight) {
         return cfgs[i];
      }
   }

   return null;
};

let _doShare = function (_scene_name, _customQueryObj, _showFailTips, _cb) {
   // body...
   let cfg = _getDoShareCfg(_getShareInfo(_scene_name));
   if (cfg) {
      let shareFunc = null;


      if (G_chInfo.isAldReportEnabled()) {
         shareFunc = wx.aldShareAppMessage;
      }
      else if (G_chInfo.isQyReportEnabled()) {
         shareFunc = wx.h_ShareAppMessage;
      }
      else {
         shareFunc = wx.shareAppMessage;
      }

      if (shareFunc) {
         shareFunc(_makeAndSaveShareInfo(_scene_name, cfg, _customQueryObj, _showFailTips, _cb));
      }
   }
   else {
      typeof _cb === "function" && _cb(false);
   }
};

let _makeAndSaveShareInfo = function (_scene_name, _cfg, _customQueryObj, _showFailTips, _cb) {
   // body...
   _sharingSceneInfo = null;

   if (_cfg) {
      _sharingSceneInfo = {
         scene: _scene_name,
         customQueryObj: _customQueryObj,
         showFailTips: _showFailTips,
         startTime: new Date().getTime(),
         cb: _cb
      };

      let queryStr = `scene=${_scene_name}&tag=${_cfg.tag}`;
      if (_customQueryObj) {
         for (let key in _customQueryObj) {
            queryStr += "&" + key + "=" + _customQueryObj[key];
         }
      }

      return {
         title: _cfg.title,
         imageUrl: _cfg.img_url,
         query: queryStr,
         success: function () {
            // 分享成功
            if (_sharingSceneInfo &&
               typeof _sharingSceneInfo.cb === "function") {
               _sharingSceneInfo.cb(true);

               _sharingSceneInfo = null;
            }
         },
         fail: function () {
            if (_sharingSceneInfo) {

               if (_sharingSceneInfo.showFailTips) {
                  WxPlat.showRandomToast(_shareFailTips);
               }

               if (typeof _sharingSceneInfo.cb === "function") {
                  _sharingSceneInfo.cb(false);
               }

               _sharingSceneInfo = null;
            }
         }
      };
   }
   else {
      return {};
   }
};

let _checkShareResult = function (sharingInfo) {
   // body...
   if (sharingInfo) {
      // 间隔时间
      let interTime = new Date().getTime() - sharingInfo.startTime;
      if (interTime >= _minDurationBetweenShare) {
         if (sharingInfo.scene !== ShareScene.SS_SYSTEM_MENU) {
            // 除来自系统菜单的分享，则增加有效分享次数
            G_chInfo.plusTodayShareTimes();

            if (sharingInfo.scene !== ShareScene.SS_CUSTOMER_SERVER
               && sharingInfo.scene !== ShareScene.SS_INVITE) {
               G_chInfo.plusTodayAdvimes();
            }
         }

         return true;
      }
   }

   return false;
};

let _addCfgs = function (cfgs) {
   if (cfgs && typeof cfgs === 'object') {
      for (const key of Object.keys(cfgs)) {
         _cfgs[key] = cfgs[key];
      }
   }
};

class _Share {
   constructor() {
      // console.log('---实例化 _Share...');
      return _instance || (_instance = this);
   }
   static getInstance() {
      return _instance || (_instance = new this);
   }
   /**
    * 只在微信环境下才执行
    */
   init() {
      if (!G_chSdk.isQQ()) {
         return;
      }
      _addCfgs(G_chInfo.getShareCfgs());
      _minDurationBetweenShare = G_chInfo.getMinDurationBetweenShare();
      cc.game.on(cc.game.EVENT_SHOW, () => {
         if (_sharingSceneInfo) {
            let bSucc = _checkShareResult(_sharingSceneInfo);

            if (typeof _sharingSceneInfo.cb === "function") {
               _sharingSceneInfo.cb(bSucc);
            }

            if (!bSucc && _sharingSceneInfo.showFailTips) {
               WxPlat.showRandomToast(_shareFailTips);
            }

            _sharingSceneInfo = null;
         }
      });

      let info = {};
      let shareInfo = _getShareInfo(ShareScene.SS_SYSTEM_MENU);
      let cfg = _getDoShareCfg(shareInfo);

      if (cfg) {
         info = _makeAndSaveShareInfo(ShareScene.SS_SYSTEM_MENU, cfg, null, false, null);
      }
      WxPlat.onShare(info);
   }

   canShare() {
      // body...
      return Object.keys(_cfgs).length > 0;
   }
   // showFailTips 默认为true
   share(scene_name, customQueryObj, showFailTips, cb) {
      if (!G_chSdk.isQQ()) {
         console.log('不是微信环境，默认分享成功');
         typeof cb === 'function' && cb(true);
         return;
      }

      if (!scene_name || scene_name === "") {
         typeof cb === "function" && cb(false);
      }

      if (typeof showFailTips === "undefined" || showFailTips === null) {
         showFailTips = true;
      }
      _doShare(scene_name, customQueryObj, showFailTips, cb);
   }
};

// export
module.exports = _Share;