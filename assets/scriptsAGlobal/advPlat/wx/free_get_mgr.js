/*
* 免费获取管理
*/
let wxAdv = require('wx_adv').getInstance();
let { FreeGetWay } = require('global_const');
var _FreeGetMgr = function () {
   var _instance;

   function init() {
      return {
         getNextFreeGetWay: function (cb) {
            // body...
            if (typeof cb !== "function") {
               return;
            }
            // 非微信平台默认为视频任务
            if (G_Const.IssuePlat !== 'wx' || CC_DEBUG) {
               cb(FreeGetWay.FGW_ADV);
               return;
            }
            let isNoMore = G_chInfo.isNoMoreAdvTimesToday();
            if (isNoMore) {
               cb(FreeGetWay.FGW_NONE);
            }
            else {
               let isPublishing = G_chInfo.isPublishing();
               if (isPublishing) {
                  if (wxAdv.isSupportVideoAd()) {
                     cb(FreeGetWay.FGW_ADV);
                  }
                  else {
                     cb(FreeGetWay.FGW_NONE);
                  }
               }
               else {
                  if (wxAdv.isSupportVideoAd()) {
                     let times = G_chInfo.getAdvTimesBeforeShare();
                     let tTimes = G_chInfo.getTodayAdvTimes();
                     if (tTimes < times) {
                        cb(FreeGetWay.FGW_ADV);
                     }
                     else {
                        let rate = G_chInfo.getRateOfShare();
                        if (G_chSdk.random(1, 100) <= rate) {
                           cb(FreeGetWay.FGW_SHARE);
                        }
                        else {
                           cb(FreeGetWay.FGW_ADV);
                        }
                     }
                  }
                  else {
                     cb(FreeGetWay.FGW_SHARE);
                  }

               }
            }
         }
      };
   };

   return {
      getInstance: function () {
         if (!_instance) {
            _instance = init();
         }

         return _instance;
      }
   };
}();

module.exports = _FreeGetMgr;