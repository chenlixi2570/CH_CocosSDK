/*
* 开放数据域功能模块，
*/
let { OpenDataOperation } = require('global_const');
let _instance;
let _isSupport = false;
class _OpenHelper {
   constructor() {
      this.init();
      return _instance || (_instance = this);
   }
   static getInstance() {
      return _instance || (_instance = new this);
   }
   init() {
      // body...
      // let sdkVer = SDKVersion;
      let sdkVer = '1.0.0';
      if (G_chSdk.compareVersion(sdkVer, '1.9.92') != -1) {
         _isSupport = true;
      }
      else {
         _isSupport = false;

         // notify
      }
   }

   isSupport() {
      // body...
      return _isSupport;
   }

   saveSelfInfo(info, cb) {
      // body...
      if (!_isSupport) {
         return;
      }

      if (window.wx && window.wx.setUserCloudStorage) {
         let keys = Object.keys(info);
         let dataList = keys.map(key => {
            return {
               key: key,
               value: info[key].toString()
            };
         });

         wx.setUserCloudStorage({
            KVDataList: dataList,
            success() {
               // body...
               typeof cb === "function" && cb();
            }
         });
      }
   }

   clearSelfInfo(keys, cb) {
      // body...
      if (!_isSupport) {
         return;
      }

      if (window.wx && window.wx.removeUserCloudStorage) {
         wx.removeUserCloudStorage({
            KVDataList: keys,
            success() {
               // body...
               typeof cb === "function" && cb();
            }
         });
      }
   }

   showRank(params) {
      // body...
      if (!_isSupport) {
         return;
      }

      this._doOperation(OpenDataOperation.ODO_SHOW_RANK, params);
   }

   _doOperation(operation, params) {
      // body...
      if (window.wx && window.wx.getOpenDataContext) {
         let openDataContext = window.wx.getOpenDataContext();

         let message = {
            operation: operation
         };

         if (typeof params !== "undefined" && params !== null) {
            message.params = JSON.stringify(params);
         }

         // post
         openDataContext.postMessage(message);
      }
   }
}

// export
module.exports = _OpenHelper;