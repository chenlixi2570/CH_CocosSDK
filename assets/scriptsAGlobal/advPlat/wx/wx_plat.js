/*
 * @Author: Chen Li Xi
 * @Description: 所有需要调用微信API的接口都在此实例下维护
 * 其他文件中不可以再存在 wx.xxx
 * 所有需要判断是否微信环境的情况都调用此实例下的方法
 * 其他文件中不可以再存在 window.wx
 */
let _Base_Plat = require('base_plat');
let _instance = null;
let _isAdvStateNormal = null; // IP与场景值屏蔽
let _isExportAdvEnabled = null; // false则广点通屏蔽
let _channelID = null;


class _WX_Plat extends _Base_Plat {
   constructor() {
      super();
   }

   static getInstance() {
      return _instance || (_instance = new this);
   }
   /**
    * 监听网络状态改变
    * @param {function} 
    */
   onNetworkStatus(cb) {
      let _netType = null;
      if (G_chSdk.isWX() && window.wx.onNetworkStatusChange) {
         window.wx.onNetworkStatusChange(info => {
            // body...
            let originalNetType = _netType;
            _netType = info.networkType;

            if (!info.isConnected) {
               _netType = 'none';
            }

            if (_netType === 'none') {
               // 网络连接丢失事件执行
               G_chSdk.dispatchEvent(G_Const.EventName.EN_NET_CONNECTION_LOST);
            }
            else if (originalNetType === 'none') {
               // 网络连接恢复事件执行
               G_chSdk.dispatchEvent(G_Const.EventName.EN_NET_CONNECTION_RECOVER);
            }
            typeof cb === 'function' && cb(_netType);
         });
      }
   }
   /**
    * 获取当前网络状态
    */
   getNetworkType({ success = () => { }, fail = () => { } } = {}) {
      if (G_chSdk.isWX() && window.wx.getNetworkType) {
         window.wx.getNetworkType({
            success: info => {
               console.log('取得网络类型', info);
               let netType = info.networkType;
               success(netType);
            },
            fail: err => {
               fail('none');
            }
         });
      } else {
         fail('none');
      }
   }


   showToast(info) {
      if (!G_chSdk.isWX()) {
         console.log('---toast提示', info);
         return;
      }
      if (typeof info === 'string') {
         wx.showToast({
            title: info,
            icon: 'none',
            duration: 2000
         });
      }
      else if (info && typeof info === 'object') {
         wx.showToast(info);
      }
   }

   showModal(info) {
      if (!G_chSdk.isWX()) {
         console.log('---toast提示', info);
         return;
      }
      if (typeof info === 'string') {
         wx.showModal({
            title: '提示',
            content: info,
            showCancel: true,
         });
      }
      else if (info && typeof info === 'object') {
         wx.showModal(info);
      }
   }
   /**
    * 获取胶囊按钮信息
    */
   getMenuBtnRect() {
      if (!G_chSdk.isWX()) {
         return null;
      }
      if (typeof window.wx.getMenuButtonBoundingClientRect === 'function') {
         let rect = wx.getMenuButtonBoundingClientRect();
         return rect;
      }
   }

   /**
    * 屏蔽IP与场景值
    * 是否正常显示广告，默认true
    * True代表允许误触 False代表不允许误触
    * 只在微信端有该功能
    */
   isAdvStateNormal(cb) {
      return new Promise((resolve, reject) => {
         if (!G_chSdk.isWX() ||
            typeof window.wx.h_JudgeRegion !== 'function') {
            typeof cb === 'function' && cb(true);
            resolve(true);
            return;
         }
         if (_isAdvStateNormal === null) {
            wx.h_JudgeRegion({
               scene: this.getLaunchOptions().scene,
               success: function (res) {
                  // console.log('查询IP与场景值',res);

                  if (res.Status === 200) {
                     _isAdvStateNormal = res.Result.Status === 0;
                  }
                  else {
                     _isAdvStateNormal = true;
                  }
                  typeof cb === 'function' && cb(_isAdvStateNormal);
                  resolve(_isAdvStateNormal);
               }
            });
         }
         else {
            typeof cb === 'function' && cb(_isAdvStateNormal);
            resolve(_isAdvStateNormal);
         }
      });
   }
   /**
    * 导出商业广告是否可用，默认 true  false则要屏蔽广点通
    */
   isExportAdvEnabled() {
      let sCfg = G_chInfo.getExportAdv();
      if (_isExportAdvEnabled === null) {
         let channelID = this.getChannelID();
         console.log("==当前屏蔽广点通 channelID: ", channelID);

         if (channelID !== "") {

            let disabledChIDs = sCfg.split("||");
            if (Array.isArray(disabledChIDs)) {
               for (let i = 0; i < disabledChIDs.length; i++) {
                  if (disabledChIDs[i].toString() === channelID) {
                     _isExportAdvEnabled = false;
                     break;
                  }
               }
            }

            if (_isExportAdvEnabled === null) {
               _isExportAdvEnabled = true;
            }
         }
         else {
            _isExportAdvEnabled = true;
         }
      }
      return _isExportAdvEnabled;
   }
   /**
    * 获取进入游戏链接上携带的广点通屏蔽id
    */
   getChannelID() {
      if (_channelID === null) {
         if (G_chSdk.isWX()) {
            let launchInfo = window.wx.getLaunchOptionsSync();
            _channelID = "";

            for (let key in (launchInfo.query || {})) {
               if (key === "chid") {
                  _channelID = launchInfo.query[key].toString();
                  break;
               }
            }
         }
         else {
            _channelID = "";
         }
      }

      return _channelID;
   }
   /**
    * 进入微信小游戏场景值及链接携带的数据
    */
   getLaunchOptions() {
      if (G_chSdk.isWX()) {
         return window.wx.getLaunchOptionsSync();
      }
      else {
         return {};
      }
   }
   /**
    * 监听用户主动分享，更新分享信息对象
    */
   onShare(info = {}) {
      if (!G_chSdk.isWX()) return;
      let registerOnShareFunc = function (onShareFunc) {
         if (onShareFunc) {
            if (window.wx.showShareMenu) {
               window.wx.showShareMenu({
                  // body...
                  withShareTicket: true
               });
            }

            onShareFunc(function () {
               // body...
               return info;
            });
         }
      };

      if (G_chInfo.isAldReportEnabled()) {
         registerOnShareFunc(window.wx.aldOnShareAppMessage);
      }
      else {
         if (G_chInfo.isQyReportEnabled()) {
            registerOnShareFunc(window.wx.h_OnShareAppMessage);
         }
         else {
            registerOnShareFunc(window.wx.onShareAppMessage);
         }
      }
   }
   /**
    * 随机提示一条 toast 内容
    */
   showRandomToast(tips = []) {
      let idx = G_chSdk.randomInt(0, tips.length - 1);
      this.showToast(tips[idx]);
   }
   /**
    * 监听音频被系统占用中断事件
    */
   onAudio() {
      if (!G_chSdk.isWX()) return;
      if (window.wx.onAudioInterruptionBegin) {
         window.wx.onAudioInterruptionBegin(function () {
            // pause all sounds
            cc.audioEngine.pauseAll();
         });
      }

      if (window.wx.onAudioInterruptionEnd) {
         window.wx.onAudioInterruptionEnd(function () {
            // resume all sounds
            cc.audioEngine.resumeAll();
         });
      }
   }
   /**
    * 短时间的振动（15 ms）
    */
   vibrateShortRun(succ, fail) {
      if (!G_chSdk.isWX()) return;
      if (wx.vibrateShort) {

         console.log('==调用微信短振动API');

         wx.vibrateShort({
            success: succ,
            fail: fail
         });
      }
   }
}


module.exports = _WX_Plat;