var _instance;
var _videoAdUnitID = "none";
var _videoAdIns = null;
var _videoCbs = {};

let _stopSupportVideoAd = function () {
   // body...
   _videoAdUnitID = "none";
};

class _Adv {
   constructor() {
      return _instance || (_instance = this);
   }
   static getInstance() {
      return _instance || (_instance = new this);
   }
   init(videoAdUnitID) {
      if (!G_chSdk.checkString(videoAdUnitID)) {
         console.warn("Register Video Ad Unit ID Fail, Check Input!");
         return;
      }

      _videoAdUnitID = videoAdUnitID;
   }

   isSupportVideoAd() {
      // body...
      return (_videoAdUnitID !== "none");
   }


   createVideoAdv(closeCb, errCb) {
      // body...
      if (!this.isSupportVideoAd()) {
         // notify

         return;
      }

      if (typeof errCb === "undefined") {
         errCb = null;
      }

      if (window.qq && window.qq.createRewardedVideoAd) {
         if (_videoAdIns === null) {
            _videoAdIns = window.qq.createRewardedVideoAd({
               adUnitId: _videoAdUnitID
            });

            if (_videoAdIns) {
               _videoAdIns.onClose(function (result) {
                  // body...
                  // resume all sounds
                  cc.audioEngine.resumeAll();

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
                     CC_DEBUG && console.log("show videoAd fail...");

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