// 依赖 cocos 环境

let _CC_SysInfo = (function () {
   let size = null;
   let pxSize = null;
   let _sysInfo = null;

   function _initSysInfo() {
      size = cc.view.getFrameSize();

      /**
    * 系统信息中的宽高取的是缩放比之前的宽高
    * 实际像素宽高要与设备像素比相乘
    * system 用于区分是 IOS 系统还是 Android
    * platform 用于区分微信 QQ OPPO VIVO
    */
      _sysInfo = {
         screenHeight: size.height,
         screenWidth: size.width,
         windowHeight: size.height,
         windowWidth: size.width,
         pixelRatio: 2, // 设备像素比
         language: cc.sys.language, // 语言
         system: cc.sys.os + ' ' + cc.sys.osVersion, // 操作系统及版本号
         platform: 'pc', // 小游戏运行平台 默认浏览器
      };
      if (window.qq && typeof window.qq === 'object') {
         _sysInfo.platform = 'qq';
      }
      else if (window.tt && typeof window.tt === 'object') {
         _sysInfo.platform = 'tt';
      }
      else if (cc.sys.platform === cc.sys.OPPO_GAME) {
         _sysInfo.platform = 'oppo';
      }
      else if (cc.sys.platform === cc.sys.VIVO_GAME) {
         _sysInfo.platform = 'vivo';
      }
      else if (cc.sys.platform === cc.sys.WECHAT_GAME) {
         _sysInfo.platform = 'wx';
      }
      else {
         _sysInfo.platform = 'pc';
      }
      console.log('==系统信息', _sysInfo);
   }

   cc.game.on(cc.game.EVENT_GAME_INITED, () => {
      _initSysInfo();
   });
   let _instance = {
      getSystemInfo() {
         return _sysInfo;
      },
      getPlatStr() {
         return _sysInfo.platform;
      },
      /**
       * 获得可视区像素宽高
       */
      getPxSize() {
         if (!pxSize) {
            pxSize = cc.view.getVisibleSizeInPixel();
            _sysInfo.pixelRatio = pxSize.width / size.width;
         }
         return pxSize;
      },
      /**
       * 是否为苹果手机
       */
      isIphone() {
         return cc.sys.os === cc.sys.OS_IOS;
      },
      /**
       * 是否为安卓手机
       */
      isAndroid() {
         return cc.sys.os === cc.sys.OS_ANDROID;
      },
      /**
       * 当前是否在微信平台下
       */
      isWX() {
         return _sysInfo.platform === 'wx';
      },
      /**
       * 当前是否在 OPPO 平台下
       */
      isOPPO() {
         return cc.sys.platform === cc.sys.OPPO_GAME;
      },
      /**
       * 当前是否在 VIVO 平台下
       */
      isVIVO() {
         return cc.sys.platform === cc.sys.VIVO_GAME;
      },
      /**
       * 当前是否在 QQ 平台下
       */
      isQQ() {
         return _sysInfo.platform === 'qq';
      },
      /**
       * 当前是否在 头条 平台下
       */
      isTT() {
         return _sysInfo.platform === 'tt';
      },
      /**
       * 平台API全局对象
       */
      getPlat() {
         let str = _sysInfo.platform;
         if (str === 'wx') {
            return window.wx;
         }
         else if (str === 'qq') {
            return window.qq;
         }
         else if (str === 'tt') {
            return window.tt;
         }
         else if (str === 'vivo') {
            return window.qg;
         }
         else if (str === 'oppo') {
            return window.qg;
         }
         else {
            return null;
         }
      },
      // /**
      //  * 当前是否在 Baidu 平台下
      //  */
      // isBaidu() {
      //    return cc.sys.platform === cc.sys.BAIDU_GAME;
      // },
      // /**
      //  * 当前是否在 Xiaomi 平台下
      //  */
      // isXiaomi() {
      //    return cc.sys.platform === cc.sys.XIAOMI_GAME;
      // },
      // /**
      //  * 当前是否在 Huawei 平台下
      //  */
      // isHuawei() {
      //    return cc.sys.platform === cc.sys.HUAWEI_GAME;
      // }
   };

   return () => {
      return _instance;
   };
})();


module.exports = _CC_SysInfo;