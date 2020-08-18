// 趣游公司服务器请求

let _Qy_Server = (function () {
   let _baseUrl = null;
   function sehcRequest({ url, header, method, timeout, data, success, fail, complete } = {}) {
      window.G_chSdk && G_chSdk.requestReconnect({
         url,
         header,
         method,
         timeout,
         data,
         success: res => {
            if (res && typeof res === 'object' && res.type === 'json') {
               typeof success === 'function' &&
                  success(JSON.parse(res.data));
            } else {
               typeof fail === 'function' && fail(res);
            }
         },
         fail,
         complete
      });
   }


   let _instance = {
      /**
       * 请求趣游游戏管理后台服务器
       * 用于登陆，配置参数下发
       */
      requestConfig({ path, header, data, success, fail } = {}) {
         if (!_baseUrl) {
            _baseUrl = require('global_const').HttpConf.baseUrl;
         }
         let url = _baseUrl + path;
         sehcRequest({
            url, header, data, success, fail,
         });
      },
      /**
       * 请求微信后羿后台
       */
      requestApi({ path, header, data, success, fail } = {}) {
         let baseUrl = 'https://api.game.hnquyou.com/api/';
         let url = baseUrl + path;
         sehcRequest({
            url, header, data, success, fail,
         });
      },
      /**
       *  请求其他平台后羿后台
       */
      requestAppApi({ path, header, data, success, fail } = {}) {
         let baseUrl = 'https://appapi.game.hnquyou.com/api/';
         let url = baseUrl + path;
         sehcRequest({
            url, header, data, success, fail,
         });
      },
      /**
       * 发送获取服务器信息请求，返回服务器时间
       */
      reqGetServerTime({ success, fail } = {}) {
         this.requestConfig({
            header: 'application/x-www-form-urlencoded',
            path: "/wx/getTime",
            data: null,
            success,
            fail
         });
      }
   };
   return () => {
      return _instance;
   };
})();

module.exports = _Qy_Server;
