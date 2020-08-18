var _instance;
// const
var _bannerAdUnitID = "none";
var _videoAdUnitID = "none";
var _oldBannerAdObj = null;
var _oldBannerCbs = {};
var _bannerAdObj = null;
var _bannerCbs = {};
var _videoAdIns = null;
var _videoCbs = {};

var registerAdUnitID = function (videoAdUnitID) {

   if (!G_chSdk.checkString(videoAdUnitID)) {
      console.warn("Register Video Ad Unit ID Fail, Check Input!");
      return;
   }

   _videoAdUnitID = videoAdUnitID;

};

let _stopSupportVideoAd = function () {
   // body...
   _videoAdUnitID = "none";

   // notify
   G_chSdk.dispatchEvent(G_Const.EventName.EN_VIDEO_NOT_SUPPORT_RIGHT_NOW);
};

class _Adv {
   constructor() {
      return _instance || (_instance = this);
   }
   static getInstance() {
      return _instance || (_instance = new this);
   }
   init(videoAdUnitID) {
      registerAdUnitID(videoAdUnitID);
   }

   isSupportBannerAd() {
      // body...
      return (_bannerAdUnitID !== "none");
   }

   isSupportVideoAd() {
      // body...
      return (_videoAdUnitID !== "none");
   }

   createBannerAdv(style, errCb) {
      // body...
      if (!this.isSupportBannerAd()) {
         // notify
         G_chSdk.dispatchEvent(G_Const.EventName.EN_BANNER_NOT_SUPPORT_RIGHT_NOW);

         return;
      }

      if (_bannerAdObj) {
         _oldBannerAdObj = _bannerAdObj;
         _oldBannerCbs = _bannerCbs;
         _bannerAdObj = null;
         _bannerCbs = {};
      }

      var self = this;

      if (window.wx && window.wx.createBannerAd) {
         _bannerAdObj = window.wx.createBannerAd({
            adUnitId: _bannerAdUnitID,
            style: style
         });

         if (_bannerAdObj) {
            _bannerCbs.errCb = errCb;

            _bannerAdObj.onResize(function (size) {
               // body...
               if (_bannerAdObj) {
                  _bannerAdObj.realWidth = size.width;
                  _bannerAdObj.realHeight = size.height;
               }
            });

            _bannerAdObj.onLoad(function () {
               // body...
               self.showBannerAdv();

               if (_oldBannerAdObj !== null) {
                  _oldBannerAdObj.destroy();
                  _oldBannerAdObj = null;
                  _oldBannerCbs = {};
               }
            });

            _bannerAdObj.onError(function (err) {
               // body...
               // stop support banner

               if (_bannerAdObj) {
                  _bannerAdObj = null;
               }

               if (_bannerCbs) {
                  let _errCb = _bannerCbs.errCb;
                  _bannerCbs = {};

                  if (typeof _errCb === "function") {
                     _errCb();
                  }
               }
            });
         }
      }
   }

   showBannerAdv() {
      // body...
      if (_bannerAdObj) {
         _bannerAdObj.show();
      }
   }

   hideBannerAdv() {
      // body...
      if (_bannerAdObj) {
         _bannerAdObj.hide();
      }
   }

   destroyBannerAdv() {
      // body...
      if (_bannerAdObj) {
         _bannerAdObj.destroy();
         _bannerAdObj = null;
         _bannerCbs = {};
      }
   }

   createVideoAdv(closeCb, errCb) {
      // body...
      if (!this.isSupportVideoAd()) {
         // notify
         G_chSdk.dispatchEvent(G_Const.EventName.EN_VIDEO_NOT_SUPPORT_RIGHT_NOW);

         return;
      }

      if (typeof errCb === "undefined") {
         errCb = null;
      }

      if (window.wx && window.wx.createRewardedVideoAd) {
         if (_videoAdIns === null) {
            _videoAdIns = window.wx.createRewardedVideoAd({
               adUnitId: _videoAdUnitID
            });

            if (_videoAdIns) {
               _videoAdIns.onClose(function (result) {
                  // body...
                  // resume all sounds
                  cc.audioEngine.resumeAll();

                  if (result && result.isEnded) {
                     G_chInfo.plusTodayAdvimes();
                  }
                  else if (!result) {
                     G_chInfo.plusTodayAdvimes();
                  }

                  if (_videoAdIns) {
                     if (_videoCbs) {
                        let _closeCb = _videoCbs.closeCb;
                        _videoCbs = {};

                        if (typeof _closeCb === "function") {
                           if (result) {
                              _closeCb(result.isEnded);
                           }
                           else if (!result) {
                              _closeCb(true);
                           }
                        }
                     }
                  }
               });

               _videoAdIns.onError(function (result) {
                  // body...
                  // resume all sounds
                  cc.audioEngine.resumeAll();

                  // stop support video
                  _stopSupportVideoAd();

                  if (_videoAdIns) {
                     _videoAdIns = null;
                  }

                  if (_videoCbs) {
                     let _errCb = _videoCbs.errCb;
                     _videoCbs = {};

                     if (typeof _errCb === "function") {
                        _errCb();
                     }
                  }
               });
            }
         }

         if (_videoAdIns) {
            _videoCbs.closeCb = closeCb;
            _videoCbs.errCb = errCb;

            // pause all sounds
            cc.audioEngine.pauseAll();

            // show
            _videoAdIns.show().catch(() => {
               // fail then try again
               _videoAdIns.load()
                  .then(() => _videoAdIns.show())
                  .catch(err => {
                     console.log("show videoAd fail...");

                     // resume all sounds
                     cc.audioEngine.resumeAll();

                     // stop support video
                     _stopSupportVideoAd();

                     if (_videoAdIns) {
                        _videoAdIns = null;
                     }

                     if (_videoCbs) {
                        let _errCb = _videoCbs.errCb;
                        _videoCbs = {};

                        if (typeof _errCb === "function") {
                           _errCb();
                        }
                     }
                  });
            });
         }
         else {
            // stop support video
            _stopSupportVideoAd();

            if (typeof errCb === "function") {
               errCb();
            }
         }
      }
   }

};

// export
module.exports = _Adv;