/**
 * 重写登陆模块，改变点
 * 由原来默认解析 code 之后再登陆，改为默认使用本地缓存
 */
let _instance = null;
let _isLogin = false; // 登陆成功之后变为true
let _raw_cfgs = null; // 线上原始数据
let _loginSuccCbs = [];
let { SK_OPENID_SESSID } = require('global_const').StorageKey;
let AND_TAKEN = '&&'; // openID 与 sessID 拼接字符

class _New_Login {
   constructor() {
      this._ids = {
         isStorage: false, // 缓存中的是否有ID
         openID: '',
         sessID: '',
      };
   }
   static getInstance() {
      return _instance || (_instance = new this);
   }
   login(succ) {
      if (_isLogin) {
         typeof succ === 'function' && succ(_raw_cfgs);
      }
      else {
         _loginSuccCbs.push(succ);
         _loginSuccCbs.length === 1 && this._loginRun();
      }
   }
   /**
    * 登陆成功需要处理的逻辑
    */
   _doLoginCbs(raw_cfgs) {
      _raw_cfgs = raw_cfgs;
      for (const cb of _loginSuccCbs) {
         typeof cb === 'function' && cb(_raw_cfgs);
      }
      _loginSuccCbs = [];
   };
   /**
    * 登陆启动函数
    * 获取 openID 与 sessID 
    * 先取缓存，缓存中没有直接生成随机新ID
    */
   _loginRun() {
      let openId_SessId = G_chSdk.getStorage(SK_OPENID_SESSID);
      if (G_chSdk.checkString(openId_SessId)) {
         // 缓存值为字符且不为空
         let arr = openId_SessId.split(AND_TAKEN);
         if (Array.isArray(arr) && arr.length == 2) {
            // 使用缓存中的ID
            this._ids.isStorage = true;
            this._ids.openID = arr[0];
            this._ids.sessID = arr[1];
            // console.log(`==缓存中openid:${this._ids.openID};sessid:${this._ids.sessID}`);
            // 当缓存中有ID时检查缓存中的用户数据
            // 用于保存由于 openID 不一致导致的数据丢失
            // 此时 user_info 模块已经取好缓存中的用户信息了
            G_chInfo.saveStorageUserInfo(this._ids.openID);
         }
         else {
            this._generateNewID(); // 创建新的随机ID
         }
      }
      else {
         this._generateNewID(); // 创建新的随机ID
      }

      // 本地缓存登陆完成，准备取线上配置参数
      this._localeLoginSucc();
   };
   /**
    * 生成新的 openID 与 sessID 
    */
   _generateNewID() {
      this._ids.openID = G_chSdk.generateString(32);
      this._ids.sessID = G_chSdk.generateString(26);
   };
   /**
    * 本地登陆完成，此时缓存中的用户信息已取到内存
    * openID sessID 已经生成，缓存中有则使用缓存，缓存中没有生成随机
    * 微信 QQ 平台可以改写这个函数使用平台 code 登陆
    */
   _localeLoginSucc() {
      // 请求线上配置参数
      this.getOnlineCfg(null, (res) => {
         this.updateIds(); // 生成用户信息对象 保存ID到缓存
         G_chInfo.setAllCfgs(res); // 更新配置信息对象 
         this._doLoginCbs(res); // 回调登陆成功
      });
   }

   /**
    * 更新 openID 与 sessID 到缓存中
    */
   updateIds(data = null) {
      let stVal = this._ids.openID + AND_TAKEN + this._ids.sessID;
      G_chSdk.setStorage(SK_OPENID_SESSID, stVal);
      G_chInfo.setPlayerInfo(this._ids.openID, this._ids.sessID, data);
   }

   /**
    * 取线上配置数据
    * @param {null or object} data 
    * @param {function} cb 
    */
   getOnlineCfg(data, cb) {
      if (G_chSdk.getPlatStr() === 'pc') {
         let { IS_Test_Cfg } = require('global_const');
         if (IS_Test_Cfg) {
            // 浏览器下取线上配置
            this.cfgRequest(cb, data);
         } else {
            typeof cb === 'function' && cb(data);
         }
      }
      else {
         this.cfgRequest(cb, data);
      }
   }

   cfgRequest(cb, data) {
      G_chSdk.requestConfig({
         header: 'application/x-www-form-urlencoded',
         path: "/pip/earnGameCfgOPPO?app_id=" + G_Const.platAppId,
         data: '',
         isMakeUrl: false,
         success: res => {
            // console.log('==线上配置数据', res);
            typeof cb === 'function' && cb(res.data);
         },
         fail: () => {
            typeof cb === 'function' && cb(data);
         }
      });
   }

   /**
    * 向后端保存微信端用户数据
    * @param {*} param0 
    */
   setUserInfo({ sessID, szStatus, success, fail }) {
      typeof fail === 'function' && fail();
   }
}

module.exports = _New_Login;