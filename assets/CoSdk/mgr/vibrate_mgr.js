/**
 * 振动模块
 */

let _VibrateMgr = (function () {
   let _storage_key = 'sk_vibrate_setting';
   let _isVigrate = true;  // 是否可以振动
   let _save = function () {
      if (_isVigrate) {
         G_chSdk.setStorage(_storage_key, "1");
      }
      else {
         G_chSdk.setStorage(_storage_key, "0");
      }
   };
   let _instance = {
      initVibrateMgr() {
         let vibrate_set = G_chSdk.getStorage(_storage_key);

         if (vibrate_set && vibrate_set === "0") {
            _isVigrate = false;
         }
         else {
            _isVigrate = true;
         }
      },
      /**
       * 设置是否允许振动
       * @param {boolean} isOn 
       */
      setVibrateState(isOn) {
         _isVigrate = isOn;
         _save();
      },
      /**
       * 查询是否可以振动
       */
      isVibrateOn() {
         return _isVigrate;
      },
      /**
       * 使手机发生较短时间的振动（15 ms）。
       * 仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
       */
      vibrateShort() {
         if (_isVigrate) {
            let plat = G_chSdk.getPlat();
            plat &&
               typeof plat.vibrateShort === 'function' &&
               plat.vibrateShort();
         }
      },
      /**
       * 使手机发生较长时间的振动（400 ms)
       */
      vibrateLong() {
         if (_isVigrate) {
            let plat = G_chSdk.getPlat();
            plat &&
               typeof plat.vibrateLong === 'function' &&
               plat.vibrateLong();
         }
      }
   };

   return () => {
      return _instance;
   };

})();

module.exports = _VibrateMgr;