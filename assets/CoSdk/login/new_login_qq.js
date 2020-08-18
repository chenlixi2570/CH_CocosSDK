/**
 * 微信登陆
 */

let _New_Login = require('new_login');
let _instance = null;

class _New_Login_QQ extends _New_Login {
   constructor() {
      super();
   }

   static getInstance() {
      return _instance || (_instance = new this);
   }
   /**
    * 微信平台登陆失败，使用本地登陆继续游戏
    * 
    */
   _defaultGame() {
      // G_chInfo.setAllCfgs(res); // 不需要更新配置信息对象 使用默认配置
      this.updateIds(); // 生成用户信息对象 保存ID到缓存
      this._doLoginCbs(null); // 回调登陆成功
   }

   /**
    * 本地登陆完成，此时缓存中的用户信息已取到内存
    * openID sessID 已经生成，缓存中有则使用缓存，缓存中没有生成随机
    * 微信 QQ 平台可以改写这个函数使用平台 code 登陆
    */
   _localeLoginSucc() {
      if (this._ids.isStorage) {
         // 缓存中有id，需要到平台端验证登陆态
         this.checkSession({
            success: (NoOverdue, code) => {
               if (NoOverdue) {
                  // 未过期， 使用缓存中的ID去后端验证sessID
                  this._reqHttpCheck();
               } else if (code) {
                  // 已过期，但此时已经取 code 成功
                  this._reqHttpLogin(code);
               }
            },
            fail: err => {
               // 使用随机出来的id 
               console.warn('过期，且平台端取code失败', err);
               this._defaultGame();
            }
         });
      } else {
         // 缓存中无id，直接登陆平台
         this._loginPlat();
      }
   }

   /**
    * 调用平台登陆接口
    */
   _loginPlat() {
      this.platLogin({
         success: code => {
            // 取code成功，用code与后端通信
            // console.log('==无缓存取code', code);
            this._reqHttpLogin(code);
         },
         fail: err => {
            // console.warn('==平台端取code失败', err);
            // 使用随机出来的id
            this._defaultGame();
         }
      });
   }

   /**
    * 向后端验证sessID 的有效性
    * 失败或无效都重新向平台请求code
    */
   _reqHttpCheck() {
      this.reqCheckLogin({
         sessID: this._ids.sessID,
         success: res => {
            if (res && res.code === 0) {
               this._getUserInfo();
            }
            else {
               this._loginPlat();
            }
         },
         fail: res => {
            this._loginPlat();
         }
      });
   };
   /**
    * 用平台登陆凭证code获取后端 ID
    * 解析code失败使用随机ID
    * @param {string} code 平台登陆凭证
    */
   _reqHttpLogin(code) {
      this.reqLogin({
         code,
         success: res => {
            // console.log('==后端解析code完成', res);
            if (res && res.code === 0) {
               this._ids.openID = res.data.openId;
               this._ids.sessID = res.data.javaSessionID;
               this._getUserInfo(); // 然后向后端请求用户及配置数据
            }
            else {
               this._defaultGame();
            }
         },
         fail: res => {
            this._defaultGame();
         }
      });
   };
   /**
    * 获取用户信息及配置信息
    */

   _getUserInfo() {
      this.getUserInfo({
         sessID: this._ids.sessID,
         success: res => {
            // console.log('==获取用户信息成功', res);
            if (res && res.code === 0) {
               this.updateIds(res.data); // 生成用户信息对象 保存ID到缓存
               G_chInfo.setAllCfgs(res.data); // 更新配置信息对象 
               this._doLoginCbs(res.data);
            } else {
               this._defaultGame();
            }
         },
         fail: res => {
            this._defaultGame();
         }
      });
   };

   /**
    * 检查微信登录态是否过期。
    * 回调返回第一个参数为布尔值，true表示未过期，此时二参为空字符
    * 如果一参为false，则调用微信登陆，二参为 code
    * 如果reject 执行，表示登陆态过期，且无法再次登陆微信取得code 或是在非微信环境中
    */
   checkSession({ success = () => { }, fail = () => { } } = {}) {
      if (!G_chSdk.isQQ()) {
         fail();
         return;
      }
      window.qq.checkSession({
         success: () => {
            // console.log('==session_key 未过期，并且在本生命周期一直有效');
            success(true, '');
         },
         fail: () => {
            // session_key 已经失效，需要重新执行登录流程
            this.platLogin({
               success: code => {
                  // console.log('==过期取code成功', code);
                  success(false, code);
               },
               fail
            });
         }
      });
   }
   /**
    * 平台登陆取code
    */
   platLogin({ success = () => { }, fail = () => { } } = {}) {
      if (!G_chSdk.isQQ()) {
         fail();
         return;
      }
      window.qq.login({
         success: res => {
            if (res.code) {
               //发起网络请求
               success(res.code);
            } else {
               // console.log('==登录失败！' + res.errMsg);
               fail(res);
            }
         },
         fail
      });
   }
   /**
    * 发送AppId与code到后端返回sessID 与 openID
    */
   reqLogin({ code, success, fail } = {}) {
      let data = {
         app_id: G_Const.platAppId,
         code,
      };
      G_chSdk.requestConfig({
         header: 'application/x-www-form-urlencoded',
         path: "/qq/login",
         data,
         success,
         fail
      });
   }
   /**
    * 向后端验证缓存中的 sessid 是否合法
    */
   reqCheckLogin({ sessID, success, fail } = {}) {
      // body...
      let data = {
         JavasessionId: sessID
      };
      G_chSdk.requestConfig({
         header: 'application/x-www-form-urlencoded',
         path: "/qq/checkLogin",
         data,
         success,
         fail
      });
   }
   /**
    * 向后端请求微信端用户数据
    */
   getUserInfo({ sessID, success, fail }) {
      let data = {
         JavasessionId: sessID
      };
      if (G_chSdk.isQQ()) {
         G_chSdk.requestConfig({
            header: 'application/x-www-form-urlencoded',
            path: "/qq/getWxUserInfo",
            data,
            success,
            fail
         });
      } else {
         typeof fail === 'function' && fail();
      }
   }
   /**
    * 向后端保存微信端用户数据
    * @param {*} param0 
    */
   setUserInfo({ sessID, szStatus, success, fail }) {
      let data = {
         JavasessionId: sessID,
         selfStore: szStatus
      };
      if (G_chSdk.isQQ()) {
         G_chSdk.requestConfig({
            header: 'application/x-www-form-urlencoded',
            path: "/qq/setWxUserInfo",
            data,
            success,
            fail
         });
      } else {
         typeof fail === 'function' && fail();
      }
   }
}

module.exports = _New_Login_QQ;