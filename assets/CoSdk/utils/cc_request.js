
let _CC_Request = (function () {
   let _instance = {
      /**
       * 发送请求，失败重连三次
       * @param {string} url 请求地址
       * @param {string} header 请求头
       * @param {string} method 请求方法
       * @param {string/object} data 传递给后端数据
       */
      requestReconnect({ url, header, method, timeout, data, success, fail, complete } = {}) {
         let try_times = 0;
         let doRequest = () => {
            this.request({
               url,
               header,
               method,
               timeout,
               data,
               success,
               complete,
               fail: res => {
                  // 失败重联
                  if (try_times >= 3) {
                     typeof fail === 'function' && fail(res);
                  } else {
                     try_times += 1;
                     doRequest();
                  }
               }
            });
         };
         doRequest();
      },

      /**
       * 发送请求
       * @param {string} url 请求路径 默认''
       * @param {string} method 请求方法 默认 POST
       * @param {string/object} data 发送数据 默认''
       * @param {string} header 请求头 默认'application/x-www-form-urlencoded' 
       * @param {number} timeout 超时时间，单位为毫秒
       * @param {function} success 请求成功回调函数
       * @param {function} fail 请求失败回调函数
       * @param {function} complete 接口调用结束的回调函数（调用成功、失败都会执行）
       * @return {xhr or null}
       */
      request({
         url = '',
         method = 'POST',
         data = '',
         header = 'application/x-www-form-urlencoded',  // application/json 
         timeout = 5000,
         success = res => { },
         fail = res => { },
         complete = res => { },
      } = {}) {
         var xhr = cc.loader.getXMLHttpRequest();
         xhr.open(method, url, true);
         if (typeof header === 'string') {
            xhr.setRequestHeader('content-type', header);
         }
         else if (header && typeof header === 'object') {
            for (const key of Object.keys(header)) {
               xhr.setRequestHeader(key, header[key]);
            }
         }
         // set success cb
         xhr.onload = function (e) {
            // body...
            if (
               xhr.readyState === 4 &&
               xhr.status >= 200 &&
               xhr.status < 300
            ) {
               let header_type = xhr.getResponseHeader('content-type');

               if (header_type === 'arraybuffer') {
                  let res = {
                     statusCode: xhr.status,
                     data: xhr.response,
                     type: "arraybuffer"
                  };
                  typeof success === 'function' && success(res);
                  typeof complete === 'function' && complete(res);
               }
               else {
                  let res = {
                     statusCode: xhr.status,
                     data: xhr.responseText,
                     type: "json"
                  };
                  typeof success === 'function' && success(res);
                  typeof complete === 'function' && complete(res);
               }
            }
            else {
               let res = {
                  statusCode: xhr.status,
                  data: xhr.responseText,
               };
               typeof fail === 'function' && fail(res);
               typeof complete === 'function' && complete(res);
            }
         };

         xhr.timeout = timeout;
         xhr.ontimeout = function (e) {
            let res = {
               statusCode: xhr.status,
               data: e
            };
            typeof fail === 'function' && fail(res);
            typeof complete === 'function' && complete(res);
         };

         xhr.onerror = function (e) {
            console.warn('xhr onerror', e);
            let res = {
               statusCode: xhr.status,
               data: e
            };
            typeof fail === 'function' && fail(res);
            typeof complete === 'function' && complete(res);
         };
         xhr.send(data);

         // console.log('==请求地址', url);
         // console.log('==请求参数', data);
         // console.log('==请求结果', xhr);
         return xhr;
      }
   };

   return () => {
      return _instance;
   };
})();

module.exports = _CC_Request;