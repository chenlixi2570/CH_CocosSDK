function _typeof2(obj) {
   return Object.prototype.toString(obj).slice(8, -1).toLowerCase();
}

var tjconf = {
   app_key: "",
   getLocation: false,
   company: "quyou"
};
/**
 * 2019.9.7修改
 * 1. 增加 isArray() 函数，用于判断数据类型是否为数组
 * 1. tjconf 配置项 adv_key 删除，依赖该配置项的 h_GetAdv方法修改参数传递方式，该方法目前没有被使用过
 * 1. 调整顶层变量位置，放在了自执行函数的顶部，方便阅读
 * 1. 调整主请求函数 o() 中对传参数 e 扩展赋值的位置，放在函数声明之前
 * 1. o() 函数增加一个形参 isReport，该参数的作用是，上报缓存中的信息时不触发检测缓存是否有未上报的信息
 * 1. 将顶层变量 g 的值从自执行函数改为：声明uuidStorage函数，然后函数执行赋值
 * 1. 新增 saveStro() 函数，该函数用于将 o()函数上报请求失败的信息记录在缓存
 * 1. 记录在缓存的信息数据结构是 {事件名：[上报信息对象]} ，其中事件名有：init even show hide ,上报信息对象为上报参数data的值 e
 * 1. 在 o() 函数中的 success 与 fail 回调中执行 saveStro()
 * 1. 新增 reportStro() 函数， 该函数读取缓存数据，查看是否存在有未上报成功的信息，如果有会直接调用 o() 主函数重新上报
 * 1. reprotStro() 函数在 o() 方法中被调用，用第四参数解决死循环的问题，如果这个参数是个真值，不会检查缓存
 * 1. h_ClickAd 方法中调用 h_SendEvent 方法是传第三个参数， h_SendEvent 方法增加第三个参数k 接收 h_ClickAd 传入的值，然后传递给 o()，
 */

//  只导出，不要执行

let qy_report = function () {
   if (!window.wx) return;
   // 顶层变量
   var f = "1.0.0", d = tjconf, h = "", p = {}, v = "", w = "", _ = 0, y = "", x = Date.now(), k = 0, M = "", b = "", dsq = false, dshi, cd = '', O = !0;
   var g = uuidStorage(),
      domain = 'https://api.game.hnquyou.com/api',
      S = wx.getLaunchOptionsSync(),
      m = "" + Date.now() + Math.floor(1e7 * Math.random()),
      q = "" + Date.now() + Math.floor(1e7 * Math.random()),
      D = ["h_SendEvent", "h_OnShareAppMessage", "h_ShareAppMessage", "h_SendSession", "h_SendOpenid", "h_GetAdv", "h_ClickAd", "h_ToMinProgram", "h_GetAdvList", "h_GetAdvListPlat", "h_GetAppFlowAdList", , "h_JudgeRegion"]; // 挂载wx.XXXX 方法

   setAppKey();
   d.app_key = d.app_key.replace(/\s/g, "");
   function setAppKey() {
      // console.log(__wxConfig);
      if (typeof __wxConfig === 'object') {
         let accountInfo = __wxConfig.accountInfo;
         // console.log(accountInfo)
         if (typeof accountInfo === 'object' && accountInfo.appId) {
            d.app_key = accountInfo.appId;
         } else if ("" === d.app_key) {
            throwError();
         }
      } else if ("" === d.app_key) {
         throwError();
      }
      function throwError() {
         console.warn("请在配置项 tjconf 中填写您的app_key,他的值是您的小游戏AppId");
         wx.showModal({
            title: '提示',
            content: '请在配置项 tjconf 中填写您的app_key,他的值是您的小游戏AppId',
         });
      }
   }
   function uuidStorage() {
      var e = "";
      try {
         e = wx.getStorageSync("h_stat_uuid"), wx.setStorageSync("h_ifo", !0);
      } catch (n) {
         e = "uuid_getstoragesync";
      }
      if (e) h = !1; else {
         e = s(), h = !0;
         try {
            wx.setStorageSync("h_stat_uuid", e);
         } catch (e) {
            wx.setStorageSync("h_stat_uuid", "uuid_getstoragesync");
         }
      }
      return e;
   }
   function e() {
      var e = this;
      this.concurrency = 200, this.queue = [], this.tasks = [], this.activeCount = 0;
      this.push = function (n) {
         this.tasks.push(new Promise(function (t, r) {
            var a = function a() {
               e.activeCount++ , n().then(function (e) {
                  t(e);
               }).then(function () {
                  e.next();
               });
            };
            e.activeCount < e.concurrency ? a() : e.queue.push(a);
         }));
         // console.log('3');
      };
      this.all = function () {
         // console.log('4');
         return Promise.all(this.tasks);
      };
      this.next = function () {
         // console.log('5');
         e.activeCount-- , e.queue.length > 0 && e.queue.shift()();
      };
   }
   // 获取微信 code 返回promise
   function n() {
      return new Promise(function (e, n) {
         wx.login({
            success: function (t) {
               cd = t.code;
               console.log(cd + '----code----');
               e("");
            }
         });
      });
   }
   function t() {
      return new Promise(function (e, n) {
         wx.getNetworkType({
            success: function success(n) {
               e(n);
            }, fail: function fail() {
               e("");
            }
         });
      });
   }
   function r() {
      return new Promise(function (e, n) {
         "1044" == S.scene ? wx.getShareInfo({
            shareTicket: S.shareTicket, success: function success(n) {
               e(n);
            }, fail: function fail() {
               e("");
            }
         }) : e("");
      });
   }
   function a() {
      return new Promise(function (e, n) {
         d.getLocation ? wx.getLocation({
            success: function success(n) {
               e(n);
            }, fail: function fail() {
               e("");
            }
         }) : wx.getSetting({
            success: function success(n) {
               n.authSetting["scope.userLocation"] ? (wx.getLocation({
                  success: function success(n) {
                     e(n);
                  }, fail: function fail() {
                     e("");
                  }
               }), e("")) : e("");
            }, fail: function fail() {
               e("");
            }
         });
      });
   }
   function s() {
      // 生成uuid
      function e() {
         return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
      }
      return e() + e() + e() + e() + e() + e() + e() + e();
   }
   function isArray(obj) {
      if (!obj) return false;
      return Object.prototype.toString.call(obj).toLowerCase().slice(8, -1) === 'array';
   }
   // 请求失败保存到缓存
   function saveStro(e, n) {
      var h_event_info = wx.getStorageSync("h_event_info");
      if (h_event_info) {
         if (isArray(h_event_info[n])) {
            h_event_info[n].push(e);
         } else {
            h_event_info[n] = [e];
         }
      } else {
         // 缓存中没有信息
         h_event_info = {};
         h_event_info[n] = [e];
      }
      wx.setStorageSync("h_event_info", h_event_info);
   }
   // 相看缓存中是否在未上报的信息，有则重新上报
   function reportStro() {
      var h_event_info = wx.getStorageSync("h_event_info");
      if (h_event_info) {
         for (var key in h_event_info) {
            if (h_event_info.hasOwnProperty(key)) {
               var val = h_event_info[key];
               if (isArray(val)) {
                  while (val.length > 0) {
                     var e = val.pop();
                     n().then(function () {
                        o(e, key, true, true);
                     });
                  }
               }
            }
         }
      }
      wx.setStorageSync("h_event_info", h_event_info);
   }
   // 主请求
   function o(e, n, k, isReport) {
      // e.ev = n;
      e.cd = cd, e.rq_c = y, e.ifo = h, e.ak = d.app_key, e.uu = g, e.v = f, e.st = Date.now(), e.ev = n, e.wsr = S, e.ufo = i(e.ufo), e.ec = _;
      if (!isReport) {
         reportStro(); // 检查缓存中是否在未上报的信息
      }

      function t() {
         return new Promise(function (n, t) {
            var tjxx = wx.getStorageSync('tjxx');
            if (undefined !== tjxx.openid) {
               for (k in tjxx) {
                  e[k] = tjxx[k];
               }
            }

            if (e.cd == '') {
               n("");
            } else {
               y++; var l = 'ad.ali-yun';

               wx.request({
                  url: domain + '/NewReport/report.html',
                  data: e,
                  header: { se: v || "", op: w || "", img: b || "", au: tjconf.company },
                  method: "POST",
                  success: function success(d) {
                     wx.setStorageSync('tjxx', d.data);
                     clearTimeout(dshi);
                     dsq = true;
                     if (undefined !== d.data.rtime && parseInt(d.data.rtime) > 0) {
                        dshi = setTimeout(function () { o(e, n, 2); }, parseInt(d.data.rtime) * 1000);
                     } else if (undefined !== tjxx.rtime && parseInt(tjxx.rtime) > 0) {
                        dshi = setTimeout(function () { o(e, n, 2); }, parseInt(tjxx.rtime) * 1000);
                     }
                     // 请求成功但没有状态或状态不是200，将要上报的数据保存到缓存
                     if (!d.data.Status || d.data.Status != 200) {
                        saveStro(e, e.ev);
                     }

                  },
                  fail: function fail() {
                     dsq = true;
                     if (undefined !== tjxx.rtime && parseInt(tjxx.rtime) > 0) {
                        clearTimeout(dshi);
                        dshi = setTimeout(function () { o(e, n, 2); }, parseInt(tjxx.rtime) * 1000);
                     }
                     // 请求失败直接将上报的数据保存到缓存
                     saveStro(e, e.ev);
                  }
               });
            }
         });
      }

      if (undefined === k) {
         wx.H_Queue.push(t);
      } else {
         t();
      }
   }

   function i(e) {
      if (void 0 === e || "" === e) return ""; var n = {}; for (var t in e) {
         "rawData" != t && "errMsg" != t && (n[t] = e[t]);
      } return n;
   }

   function c(e) {
      var n = {}; for (var t in e) {
         n[t] = e[t];
      } return n;
   }

   function u(e) {
      for (var n = "", t = 0; t < e.length; t++) {
         e[t].length > n.length && (n = e[t]);
      } return n;
   }

   wx.H_Queue = new e(), wx.H_Queue.all();

   (function () {
      return Promise.all([n(), t(), a()]);
   })().then(function (e) {
      "" !== e[2] ? (p.lat = e[2].latitude || "", p.lng = e[2].longitude || "", p.spd = e[2].speed || "") : (p.lat = "", p.lng = "", p.spd = ""), "" !== e[1] ? p.nt = e[1].networkType || "" : p.nt = ""; var n = c(p); "" !== e[0] && (n.ufo = e[0], M = e[0]), o(n, "init");
   });

   wx.onShow(function (e) {
      y = 0, S = e, k = Date.now(), O || (m = "" + Date.now() + Math.floor(1e7 * Math.random()), h = !1, wx.setStorageSync("h_ifo", !1)), O = !1; var n = c(p), t = c(p);
      n.sm = k - x, e.query && e.query.h_share_src && e.shareTicket && "1044" === e.scene ?
         (t.tp = "h_share_click",
            r().then(function (e) {
               t.ct = e, o(t, "event");
            })
         ) : e.query && e.query.h_share_src && (t.tp = "h_share_click", t.ct = "1", o(t, "event")), o(n, "show");

   });

   wx.onHide(function () {
      var e = c(p); e.dr = Date.now() - k, "" === M ? wx.getSetting({
         success: function success(n) {
            n.authSetting["scope.userInfo"] ? wx.getUserInfo({
               success: function success(n) {
                  e.ufo = n, M = n, b = u(n.userInfo.avatarUrl.split("/")), o(e, "hide");
               }
            }) : o(e, "hide");
         }
      }) : o(e, "hide");
   });

   wx.onError(function (e) {
      var n = c(p); n.tp = "h_error_message", n.ct = e, _++ , o(n, "event");
   });

   for (var I = {
      h_SendEvent: function h_SendEvent(e, n, k) {
         function _typeof(obj) { return typeof obj; }
         var t = c(p);
         "" !== e && "string" == typeof e && e.length <= 255 ? (t.tp = e, "string" == typeof n && n.length <= 255 ? (t.ct = String(n), o(t, "event", k)) : "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) ? (JSON.stringify(n).length >= 255 && console.warn("自定义事件参数不能超过255个字符"), t.ct = JSON.stringify(n), o(t, "event", k)) : void 0 === n || "" === n ? o(t, "event", k) : console.warn("事件参数必须为String,Object类型,且参数长度不能超过255个字符")) : console.warn("事件名称必须为String类型且不能超过255个字符");
      },
      h_OnShareAppMessage: function h_OnShareAppMessage(e) {
         wx.updateShareMenu({
            withShareTicket: !0, complete: function complete() {
               wx.onShareAppMessage(function () {
                  var n = e(), t = "", r = "";
                  t = void 0 !== n.success ? n.success : "", r = void 0 !== n.fail ? n.fail : "";
                  var a = "";
                  a = void 0 !== S.query.h_share_src ? void 0 !== n.query ? (S.query.h_share_src.indexOf(g), n.query + "&h_share_src=" + S.query.h_share_src + "," + g) : (S.query.h_share_src.indexOf(g), "h_share_src=" + S.query.h_share_src + "," + g) : void 0 !== n.query ? n.query + "&h_share_src=" + g : "h_share_src=" + g;
                  var s = c(p);
                  return n.query = a, s.ct = n, s.tp = "h_share_chain", o(s, "event"), n.success = function (e) {
                     s.tp = "h_share_status", o(s, "event"), "" !== t && t(e);
                  }, n.fail = function (e) {
                     s.tp = "h_share_fail", o(s, "event"), "" !== r && r(e);
                  }, n;
               });
            }
         });
      },
      h_ShareAppMessage: function h_ShareAppMessage(e) {
         var n = e, t = "", r = "";
         t = void 0 !== n.success ? n.success : "", r = void 0 !== n.fail ? n.fail : "";
         var a = "";
         a = void 0 !== S.query.h_share_src ? void 0 !== n.query ? (S.query.h_share_src.indexOf(g), n.query + "&h_share_src=" + S.query.h_share_src + "," + g) : (S.query.h_share_src.indexOf(g), "h_share_src=" + S.query.h_share_src + "," + g) : void 0 !== n.query ? n.query + "&h_share_src=" + g : "h_share_src=" + g, n.query = a;
         var s = c(p);
         s.ct = n, s.tp = "h_share_chain", o(s, "event"), n.success = function (e) {
            s.tp = "h_share_status", o(s, "event"), "" !== t && t(e);
         }, n.fail = function (e) {
            s.tp = "h_share_fail", o(s, "event"), "" !== r && r(e);
         }, wx.updateShareMenu({
            withShareTicket: !0, complete: function complete() {
               wx.shareAppMessage(n);
            }
         });
      },
      h_SendSession: function h_SendSession(e) {
         if ("" === e || !e) return void console.warn("请传入从后台获取的session_key");
         var n = c(p);
         n.tp = "session", n.ct = "session", v = e, "" === M ? wx.getSetting({
            success: function success(e) {
               e.authSetting["scope.userInfo"] ? wx.getUserInfo({
                  success: function success(e) {
                     n.ufo = e, o(n, "event");
                  }
               }) : o(n, "event");
            }
         }) : (n.ufo = M, "" !== M && (n.gid = ""), o(n, "event"));
      },
      h_SendOpenid: function h_SendOpenid(e) {
         if ("" === e || !e) return void console.warn("openID不能为空");
         w = e;
         var n = c(p);
         n.tp = "openid", n.ct = "openid", o(n, "event");
      },
      h_ClickAd: function h_ClickAd(adv_id, type) {
         // 上报用户点击自有广告
         if (!adv_id) return;
         var tjxx = wx.getStorageSync('tjxx'), timelog = Date.now(), uid = 0;
         if (tjxx && typeof tjxx === 'object' && tjxx.Status === 200) {
            uid = tjxx.Result.uid ? tjxx.Result.uid : uid;
         }
         n().then(function () {
            wx.h_SendEvent('clickad', { adv_id: adv_id, timelog: timelog, type: type }, 1);
         });
         return;
         wx.request({
            url: 'https://api.game.hnquyou.com/api/Sw/' + 'clickad.html', data: {
               adv_id,
               timelog,
               type,
               uid,
               sign: hex_md5('adv_id:' + adv_id + 'timelog:' + timelog + 'type:' + type + 'uid:' + uid)
            }, method: "POST", header: { 'content-type': 'application/x-www-form-urlencoded', au: tjconf.company },
            success: res => { /*console.log('h_ClickAd -- success res', res);*/ },
            fail: res => { },
            complete: res => { }
         });
      },
      h_ToMinProgram: function h_ToMinProgram(e) {
         var n = e, t = "", r = ""; t = void 0 !== n.success ? n.success : "", r = void 0 !== n.fail ? n.fail : "";
         n.success = function (e) {
            reportClick(1);
            typeof t === 'function' && t(e);
         };
         n.fail = function (e) {
            reportClick(2);
            typeof r === 'function' && r(e);
         };
         if (wx && wx.navigateToMiniProgram) {
            reportClick(0);
            wx.navigateToMiniProgram(n);
         }
         function reportClick(type) {
            typeof wx.h_ClickAd === 'function' && n && typeof n === 'object' && n.adv_id && wx.h_ClickAd(n.adv_id, type);
         }
      },
      h_GetAdv: function h_GetAdv(e) {
         var timelog = Date.now();
         var n = e && typeof e === 'object' ? e : {};
         var adv_key = n.adv_key ? n.adv_key : '';
         wx.request({
            url: domain + '/Sw/getAdvByIndex.html',
            data: {
               key: adv_key,
               timelog: timelog,
               sign: hex_md5('key:' + adv_key + 'timelog:' + timelog)
            },
            method: "POST",
            header: {
               'content-type': 'application/x-www-form-urlencoded',
               au: tjconf.company
            },
            success: res => {
               typeof n.success === 'function' && n.success(res.data);
            },
            fail: res => {
               typeof n.fail === 'function' && n.fail(res.data);
            },
            complete: res => {
               typeof n.complete === 'function' && n.complete(res.data);
            }
         });
      },
      h_GetAdvList: function h_GetAdvList(e) {
         var timelog = Date.now();
         var n = e && typeof e === 'object' ? e : {};
         var adv_key = n.adv_key ? n.adv_key : '';
         wx.request({
            url: domain + '/api/Sw/getAllAdvByIndex.html',
            data: {
               key: adv_key,
               timelog: timelog,
               sign: hex_md5('key:' + adv_key + 'timelog:' + timelog)
            },
            method: "POST",
            header: {
               'content-type': 'application/x-www-form-urlencoded',
               au: tjconf.company
            },
            success: res => {
               typeof n.success === 'function' && n.success(res.data);
            },
            fail: res => {
               typeof n.fail === 'function' && n.fail(res.data);
            },
            complete: res => {
               typeof n.complete === 'function' && n.complete(res.data);
            }
         });
      },
      h_GetAdvListPlat: function h_GetAdvListPlat(e) {
         var timelog = Date.now();
         var n = typeof e === 'object' ? e : {};
         var adv_key = n.adv_key ? n.adv_key : '';
         var platform = 0; // 0两个平台 1安卓 2 IOS
         var sysInfo = wx.getSystemInfoSync();
         if (sysInfo) {
            if (sysInfo.platform.toLowerCase().indexOf("ios") !== -1) {
               platform = 2;
            }
            else if (sysInfo.platform.toLowerCase().indexOf("and") !== -1) {
               platform = 1;
            }
         }
         wx.request({
            url: domain + '/api/Sw/getAllAdvByIndexPlat.html',
            data: {
               key: adv_key,
               timelog: timelog,
               platform: platform,
               sign: hex_md5('key:' + adv_key + 'platform:' + platform + 'timelog:' + timelog)
            },
            method: "POST",
            header: {
               'content-type': 'application/x-www-form-urlencoded',
               au: tjconf.company
            },
            success: res => { typeof n.success === 'function' && n.success(res.data); },
            fail: res => { typeof n.fail === 'function' && n.fail(res.data); },
            complete: res => { typeof n.complete === 'function' && n.complete(res.data); }
         });
      },
      h_GetAppFlowAdList: function h_GetAppFlowAdList(e) {
         var timelog = Date.now();
         var n = e && _typeof2(e) === 'object' ? e : {};
         wx.request({
            url: domain + '/Sw/getAppFlowAdList.html',
            data: {
               appid: tjconf.app_key,
               timelog: timelog,
               sign: hex_md5('appid:' + tjconf.app_key + 'timelog:' + timelog)
            },
            method: "POST",
            header: {
               'content-type': 'application/x-www-form-urlencoded',
               au: tjconf.company
            },
            success: function success(res) {
               typeof n.success === 'function' && n.success(res.data);
            },
            fail: function fail(res) {
               typeof n.fail === 'function' && n.fail(res.data);
            },
            complete: function complete(res) {
               typeof n.complete === 'function' && n.complete(res.data);
            }
         });
      },
      h_JudgeRegion: function h_JudgeRegion(e) {
         var n = e && _typeof2(e) === 'object' ? e : {};
         wx.request({
            url: domain + '/Product/judgeRegion.html',
            data: {
               appid: tjconf.app_key,
               scene: e.scene
            },
            method: "POST",
            header: {
               'content-type': 'application/x-www-form-urlencoded',
               au: tjconf.company
            },
            success: function success(res) {
               typeof n.success === 'function' && n.success(res.data);
            },
            fail: function fail(res) {
               typeof n.fail === 'function' && n.fail(res.data);
            },
            complete: function complete(res) {
               typeof n.complete === 'function' && n.complete(res.data);
            }
         });
      }
   }, P = 0; P < D.length; P++) {
      !function (e, n) {
         Object.defineProperty(wx, e, { value: n, writable: !1, enumerable: !0, configurable: !0 });
      }(D[P], I[D[P]]);
   }
   try {
      var T = wx.getSystemInfoSync(); p.br = T.brand || "", p.md = T.model, p.pr = T.pixelRatio, p.sw = T.screenWidth, p.sh = T.screenHeight, p.ww = T.windowWidth, p.wh = T.windowHeight, p.lang = T.language, p.wv = T.version, p.sv = T.system, p.wvv = T.platform, p.fs = T.fontSizeSetting, p.wsdk = T.SDKVersion, p.bh = T.benchmarkLevel || "", p.bt = T.battery || "", p.wf = T.wifiSignal || "", p.lng = "", p.lat = "", p.nt = "", p.spd = "", p.ufo = "";
   } catch (e) { }
};

module.exports = qy_report;