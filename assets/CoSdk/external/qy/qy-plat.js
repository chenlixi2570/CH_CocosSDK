let tjconf = require('qy-plat-config');

var qy_plat = {};

var plat = null;
if (typeof window.qq !== "undefined") {
   plat = window.qq;
}
else if (typeof window.tt !== "undefined") {
   plat = window.tt;
}
else if (typeof window.qg !== "undefined") {
   plat = window.qg;
}

if (plat) {
   var g_sendingCount = 0;

   qy_plat.init = function () {
      // console.log("start to load qy_plat sdk...");

      // 顶层通用函数
      /**
       * 检查类型
       * 
       * @returns {String}
       */
      var _typeof = function (obj) {
         return Object.prototype.toString(obj).slice(8, -1).toLowerCase();
      };

      /**
       * 检查字符
       * 要求字符数据且非空
       * 
       * @returns {Boolean}
       */
      var _checkString = function (str) {
         // body...
         if (typeof str === "string" && str !== "") {
            return true;
         }
         else {
            return false;
         }
      };

      /**
       * 创建用户uuid
       * 
       * @returns {String}
       */
      var _createUUID = function () {
         function e() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
         }

         return e() + e() + e() + e() + e() + e() + e() + e();
      };

      /**
       * 存储本地数据
       * @param {String} key 键名(全局唯一)，不能为空
       * @param {String} data 字符数据
       */
      var setStorage = function (key, data) {
         if (!_checkString(key)) {
            console.warn("setStorage Fail, Check Input Key...");
            return;
         }
         if (!_checkString(data)) {
            console.warn("setStorage Fail, only support string data...");
            return;
         }

         if (typeof Laya !== "undefined") {
            Laya.LocalStorage.setItem(key, data);
         }
         else if (typeof cc !== "undefined") {
            cc.sys.localStorage.setItem(key, data);
         }
      };

      /**
       * 获取本地数据
       * @param {String} key 键名(全局唯一)，不能为空
       * 
       * @returns {String}
       */
      var getStorage = function (key, def) {
         if (!_checkString(key)) {
            console.warn("getStorage Fail, Check Input Key...");

            if (typeof def !== "undefined") {
               return def;
            }
            else {
               return null;
            }
         }

         let ret = null;

         if (typeof Laya !== "undefined") {
            ret = Laya.LocalStorage.getItem(key);
         }
         else if (typeof cc !== "undefined") {
            ret = cc.sys.localStorage.getItem(key);
         }

         if ((ret === null || ret === "") && typeof def !== "undefined") {
            return def;
         }
         else {
            return ret;
         }
      };

      /**
       * 清除本地数据
       * @param {String} key 键名(全局唯一)，不能为空
       */
      var clearStorage = function (key) {
         if (!_checkString(key)) {
            console.warn("clearStorage Fail, Check Input Key...");
            return;
         }

         if (typeof Laya !== "undefined") {
            Laya.LocalStorage.removeItem(key);
         }
         else if (typeof cc !== "undefined") {
            cc.sys.localStorage.removeItem(key);
         }
      };

      var login = function () {
         if (typeof window.qq !== "undefined") {
            return new Promise(function (resolve, reject) {
               plat.login({
                  success: function success(res) {
                     g_code = res.code;
                     resolve("");
                  }
               });
            });
         }
         else {
            return new Promise(function (resolve, reject) {
               resolve("");
            });
         }
      };

      /**
       * 数据上报请求
       * @param {Object} obj 请求数据
       * @param {String} obj.url 请求地址
       * @param {Object} obj.data 请求的参数
       * @param {Object} obj.header 请求的 header
       * @param {Number} obj.success 接口调用成功的回调函数
       * @param {Number} obj.fail 接口调用失败的回调函数
       * @param {Number} obj.complete 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      var request = function (content_type, obj) {
         if (typeof obj === "object") {
            let _requestHttp = null;

            if (typeof Laya !== "undefined") {
               _requestHttp = (new Laya.HttpRequest())._http;
            }
            else if (typeof cc !== "undefined") {
               _requestHttp = cc.loader.getXMLHttpRequest();
            }

            if (_requestHttp) {
               _requestHttp.open("POST", obj.url, true);

               // print
               // console.log("req adv url: " + obj.url);

               if (typeof obj.complete === "function") {
                  _requestHttp.onreadystatechange = function () {
                     if (_requestHttp.readyState === 2 && typeof obj.complete === "function") {
                        obj.complete();
                     }
                  };
               }

               _requestHttp.onload = function () {
                  // body...
                  if (_requestHttp.readyState === 4) {
                     let _cb = null;

                     if (_requestHttp.status >= 200 && _requestHttp.status < 300) {
                        _cb = obj.success;
                     }
                     else {
                        _cb = obj.fail;
                     }

                     if (typeof _cb === "function") {
                        try {
                           var responseObj = JSON.parse(_requestHttp.responseText);
                           _cb({ data: responseObj, statusCode: _requestHttp.status });
                        }
                        catch (e) {
                           _cb({ data: _requestHttp.responseText, statusCode: _requestHttp.status });
                        }
                     }
                  }
               };

               _requestHttp.timeout = 10000;
               _requestHttp.ontimeout = function (e) {
                  // body...
                  console.warn(e);

                  if (typeof obj.fail === "function") {
                     obj.fail({ data: null, statusCode: _requestHttp.status });
                  }
               };

               _requestHttp.onerror = function (e) {
                  console.warn(e);

                  if (typeof obj.fail === "function") {
                     obj.fail({ data: null, statusCode: _requestHttp.status });
                  }
               };

               // header -- company
               _requestHttp.setRequestHeader('au', tjconf.company);

               if (typeof obj.header === "object") {
                  for (let key in obj.header) {
                     _requestHttp.setRequestHeader(key, obj.header[key]);
                  }
               }

               // header -- type
               if (content_type === "form") {
                  _requestHttp.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
               }
               else {
                  _requestHttp.setRequestHeader('content-type', 'application/json');
               }

               // send
               if (obj.data) {
                  if (content_type === "form") {
                     _requestHttp.send(obj.data);
                  }
                  else {
                     _requestHttp.send(JSON.stringify(obj.data));
                  }
               }
               else {
                  _requestHttp.send(null);
               }
            }
         }
      };

      var _saveToUnsendDict = function (event_name, event_obj) {
         let unsendDictStr = getStorage("qy_unsend_dict");
         let unsendDict = {};

         if (typeof unsendDictStr === "string" && unsendDictStr !== "") {
            unsendDict = JSON.parse(unsendDictStr);
         }

         let key = _createUUID();
         unsendDict[key] = {
            event: event_name,
            data: event_obj
         };

         // save
         setStorage("qy_unsend_dict", JSON.stringify(unsendDict));
      };

      var _clearUnsendDict = function () {
         if (g_sendingCount > 0) {
            return;
         }

         let unsendDictStr = getStorage("qy_unsend_dict");

         if (typeof unsendDictStr === "string" && unsendDictStr !== "") {
            let unsendDict = JSON.parse(unsendDictStr);

            for (let key in unsendDict) {
               let event_name = unsendDict[key].event;
               let event_obj = unsendDict[key].data;

               // retain
               ++g_sendingCount;

               // report
               login().then(() => {
                  report(event_name, event_obj, function () {
                     // release
                     --g_sendingCount;

                     _doClearTargetUnsendInDict(key);
                  }, function () {
                     // release
                     --g_sendingCount;
                  });
               });
            }
         }
      };

      var _doClearTargetUnsendInDict = function (targetkKey) {
         let unsendDictStr = getStorage("qy_unsend_dict");

         if (typeof unsendDictStr === "string" && unsendDictStr !== "") {
            let unsendDict = JSON.parse(unsendDictStr);
            let bFound = false;

            for (let key in unsendDict) {
               if (key === targetkKey) {
                  bFound = true;
                  delete unsendDict[key];
                  break;
               }
            }

            if (bFound) {
               // save
               setStorage("qy_unsend_dict", JSON.stringify(unsendDict));
            }
         }
      };

      var _addSysInfoInto = function (p) {
         if (p && plat.getSystemInfoSync) {
            let T = plat.getSystemInfoSync();
            if (T) {
               p.br = T.brand;
               p.md = T.model;
               p.pr = T.pixelRatio;
               p.sw = T.screenWidth;
               p.sh = T.screenHeight;
               p.ww = T.windowWidth;
               p.wh = T.windowHeight;
               p.lang = T.language;
               p.wv = T.COREVersion;
               p.sv = T.system || "";
               p.wvv = T.platform || "";
               p.wsdk = T.platformVersion || "";
               p.fs = T.fontSizeSetting || "";
               p.bh = T.benchmarkLevel || "";
               p.bt = T.battery || "";
               p.wf = T.wifiSignal || "";
               p.lng = "";
               p.lat = "";
               p.nt = "";
               p.spd = "";
               p.ufo = "";
            }
         }
      };

      /**
       * 数据上报
       * 
       */
      var report = function (event_name, event_obj, succCb, failCb) {
         if (!_checkString(event_name) || event_name.length > 255) {
            console.warn("事件名称必须为String类型且不能超过255个字符");
            return;
         }

         let event_obj_str = "";
         if (typeof event_obj === "string") {
            event_obj_str = event_obj;
         }
         else if (typeof event_obj === "object") {
            event_obj_str = JSON.stringify(event_obj);
         }

         if (event_obj_str.length > 255) {
            console.warn("事件参数必须为String或Object类型，且参数长度不能超过255个字符");
            return;
         }

         let reportData = {
            ak: tjconf.app_key,
            uu: g_uuid,
            oid: "",
            cd: g_code,
            ev: "event",
            tp: event_name,
            ct: event_obj_str,
            v: g_ver,
            st: Date.now(),
            wsr: g_launchOpts,
         };

         // add sys info
         _addSysInfoInto(reportData);

         // request
         request("json", {
            url: g_domain + "/NewReport/report.html",
            data: reportData,
            success: function (res) {
               if (res.data.Status === 200) {
                  // console.log("report to server succ...");

                  if (typeof succCb === "function") {
                     succCb();
                  }
               }
               else {
                  // console.log("report to server fail...");

                  if (typeof failCb === "function") {
                     failCb();
                  }
               }
            },
            fail: function (res) {
               // console.log("report to server fail...");

               if (typeof failCb === "function") {
                  failCb();
               }
            },
         });
      };

      /**
       * 获取用户uuid
       * 
       * @returns {String}
       */
      var getUUID = function () {
         let uuid = getStorage("qy_plat_uuid");

         if (uuid === null || uuid === "") {
            uuid = _createUUID();

            // save
            setStorage("qy_plat_uuid", uuid);
         }

         return uuid;
      };

      // 环境检查
      if (!_checkString(tjconf.app_key)) {
         console.warn("请在配置文件(qy-plat-config.js)中填写您的app_key");
      }

      // 顶层变量
      var g_ver = "1.0.0";
      var g_uuid = getUUID();
      var g_domain = "https://appapi.game.hnquyou.com/api";
      var g_launchOpts = {};
      var g_code = "";
      if (plat.getLaunchOptionsSync) {
         g_launchOpts = plat.getLaunchOptionsSync();
      }

      console.warn("g_uuid: ", g_uuid);

      // 添加的方法名
      var g_funcNames = ["h_GetAdvListPlat", "h_ToMinProgram", "h_SendEvent", "h_JudgeRegion"];
      var g_funcs = {
         h_GetAdvListPlat: function (_obj) {
            var timelog = Date.now();
            var obj = _typeof(_obj) === 'object' ? _obj : {};
            var adv_key = obj.adv_key ? obj.adv_key : "";
            // 0两个平台 1-安卓 2-IOS
            // oppo和vivo必定是Android平台
            var platform = 1;

            // request
            request("form", {
               url: g_domain + "/api/Sw/getAllAdvByIndexPlat.html",
               header: { appid: tjconf.app_key },
               data: "key=" + adv_key + "&timelog=" + timelog + "&platform=" + platform + "&sign=" + hex_md5('key:' + adv_key + 'platform:' + platform + 'timelog:' + timelog),
               success: function (res) {
                  typeof obj.success === 'function' && obj.success(res.data);
               },
               fail: function (res) {
                  typeof obj.fail === 'function' && obj.fail(res);
               },
               complete: function () {
                  typeof obj.complete === 'function' && obj.complete();
               },
            });
         },

         h_ToMinProgram: function (_obj) {
            var obj = _typeof(_obj) === 'object' ? _obj : {};
            var succCb = _obj.success;
            var failCb = _obj.fail;
            var timelog = Date.now();

            // check pkgName
            if (!_checkString(obj.pkgName) && _checkString(obj.appid)) {
               obj.pkgName = obj.appid;
            }

            // check path
            if (!_checkString(obj.path)) {
               obj.path = undefined;
            }

            var doNavigationReport = function (type) {
               login().then(() => {
                  report("clickad", {
                     adv_id: obj.adv_id,
                     timelog: timelog,
                     type: type
                  }, null, function () {
                     _saveToUnsendDict("clickad", {
                        adv_id: obj.adv_id,
                        timelog: timelog,
                        type: type
                     });
                  });
               });
            };

            obj.success = function (res) {
               // succ
               doNavigationReport(1);

               if (typeof succCb === "function") {
                  succCb(res);
               }
            };

            obj.fail = function (res) {
               // fail
               doNavigationReport(2);

               if (typeof failCb === "function") {
                  failCb(res);
               }
            };

            if (plat && plat.navigateToMiniGame) {
               // open
               doNavigationReport(0);

               // navigate
               plat.navigateToMiniGame(obj);
            }
         },

         h_SendEvent: function (event_name, event_obj) {
            // clear if exist
            _clearUnsendDict();

            login().then(() => {
               report(event_name, event_obj, null, function () {
                  _saveToUnsendDict(event_name, event_obj);
               });
            });
         },

         h_JudgeRegion: function (_obj) {
            var obj = _typeof(_obj) === 'object' ? _obj : { scene: 1001 };

            if (typeof obj.scene === "undefined") {
               obj.scene = 1001;
            }

            // request
            request("form", {
               url: g_domain + "/Product/judgeRegion.html",
               data: "appid=" + tjconf.app_key + "&scene=" + obj.scene.toString(),
               success: function (res) {
                  typeof obj.success === 'function' && obj.success(res.data);
               },
               fail: function (res) {
                  typeof obj.fail === 'function' && obj.fail(res);
               },
               complete: function () {
                  typeof obj.complete === 'function' && obj.complete();
               },
            });
         }
      };

      // add all func into plat
      for (let funcIndex = 0; funcIndex < g_funcNames.length; funcIndex++) {
         let funcName = g_funcNames[funcIndex];
         let func = g_funcs[funcName];

         Object.defineProperty(plat, funcName, {
            value: func,
            writable: false,
            enumerable: true,
            configurable: true
         });
      }

      // report
      if (plat.h_SendEvent) {
         plat.h_SendEvent("qy_sdk_inited");
      }
   };
}
else {
   qy_plat.init = function () {
      // console.log("qy_plat sdk not support on windows platform....");
   };
}
module.exports = qy_plat;
// export { qy_ov };