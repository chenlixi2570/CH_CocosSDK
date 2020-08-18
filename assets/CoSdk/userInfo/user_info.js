/*
 * @Author: Chen Li Xi
 * @Description: 用户信息数据
 */
let { StorageKey } = require('global_const');


// 保存用户数据缓存键名
let _storage_key = StorageKey.SK_USER_INFO; // 缓存用户数据的键名
let _isNewPlayer = false; // 是否为新用户
let _outlineTime = 0;  // 离线时间长度
let _originUserInfo = ''; // 缓存起来的用户数据
let _playerInfo = null; // 用户信息对象
let _isLoad = false; // 用户信息对象是否创建完成
let _loadCbs = []; // 监听用户信息是否创建完成

/**
 * 当前时间戳
 */
let _getTimestamp = function () {
   return Math.floor(G_chSdk.getServerTime() / 1000.0);
};
/**
 * 将用户数据保存在本地缓存中
 */
let _serializePlayerInfoIntoLocal = function () {
   // body...
   if (_playerInfo) {
      _playerInfo.lastSaveTime = _getTimestamp();
      let serialize_btyes = _playerInfo.constructor.encode(_playerInfo).finish();
      let serialize_text = G_chSdk.Uint8Array2HexString(serialize_btyes);

      let save_json = {
         saveTime: _getTimestamp(),
         data: serialize_text
      };
      save_json = JSON.stringify(save_json);
      // console.log('==保存用户到缓存数据', save_json);

      // save
      G_chSdk.setStorage(_storage_key, save_json);
   }
};
/**
 * 生成新用户数据结构
 * @param {string} openID 
 * @param {string} sessID 
 */
let _createNewUserInfo = function (openID, sessID) {
   // console.log('==新用户创建初始信息对象');
   _isNewPlayer = true;

   return _createUserInfo(openID, sessID);
};
let _createUserInfo = function (openID, sessID) {
   let playerInfo = new db["PlayerInfo"];
   playerInfo.openID = openID;
   playerInfo.sessID = sessID;
   playerInfo.userID = 0;
   playerInfo.lastSaveTime = 0;
   playerInfo.nickname = "";
   playerInfo.sex = 0; // sex中0未未知，1为男性，2为女性，默认为0
   playerInfo.headUrl = ""; // headUrl头像网络地址，默认空字符
   playerInfo.coin = "0";
   playerInfo.totalCoin = "0";
   playerInfo.shareTimesOfToday = 0;
   playerInfo.recordDayOfShareTimes = G_chSdk.getCurServerDayOfYear();
   playerInfo.advTimesOfToday = 0;
   playerInfo.recordDayOfAdvTimes = G_chSdk.getCurServerDayOfYear();

   playerInfo.currLevel = 0; // 玩家最新关卡
   playerInfo.physical = 40; //玩家体力。。。
   playerInfo.gem = 0; // 钻石数量
   playerInfo.levelStar = "{}"; // 玩家通过之后获得的星星数
   playerInfo.currSkin = "{normal:0}"; // 玩家当前皮肤编号
   playerInfo.unlockSkin = "{normal:[0]}"; // 玩家已解锁皮肤编号
   playerInfo.signInfo = ""; // 玩家已经领奖的签到

   playerInfo.buySing = '{}'; // 玩家已购买的关卡标志
   playerInfo.unlockGun = '1'; // 玩家已解锁准星编号
   playerInfo.currGun = 1; // 玩家当前准星编号
   playerInfo.starScale = '{}'; // 玩家过关后取得命中数的百分比

   return playerInfo;
};

let _updateInfo = function (sessID) {
   _playerInfo.sessID = sessID;
   if (_playerInfo.currSkin === "{normal:0}") {
      _playerInfo.currSkin = 0;
   }
   if (_playerInfo.unlockSkin === "{normal:[0]}") {
      _playerInfo.unlockSkin = "0";
   }
};

/**
 * 计算离线时间
 */
let _caculateOutlineTime = function () {
   // body...
   if (_playerInfo && _playerInfo.lastSaveTime !== 0) {
      _outlineTime = _getTimestamp() - _playerInfo.lastSaveTime;

      if (_outlineTime < 0) {
         _outlineTime = 0;
      }
   }
   else {
      _outlineTime = 0;
   }

   console.log(`==离线时间: ${_outlineTime} 秒`);
};
/**
 * 保存用户数据到服务器
 */
let _saveToServer = function () {
   _playerInfo.lastSaveTime = _getTimestamp();
   let serialize_btyes = _playerInfo.constructor.encode(_playerInfo).finish();
   let serialize_text = G_chSdk.Uint8Array2HexString(serialize_btyes);
   // 发送请求, 微信环境下才会发送
   window.newLogin && newLogin.setUserInfo({
      sessID: _playerInfo.sessID,
      szStatus: serialize_text,
      success: res => {
         // 应该实现向开放数据域保存数据
         // let WxOpen = require('open_helper').getInstance();
         // WxOpen.saveSelfInfo({
         //    totalCoin: _playerInfo.totalCoin,
         // }, () => {
         //    console.log("Upload To WX Cloud Succ.");
         // });
      },
      fail: res => {
         _serializePlayerInfoIntoLocal();
      }
   });
};
/**
 * 用户信息对象创建完成
 */
let _createUserInfoFinish = function () {
   _caculateOutlineTime(); // 计算离线时间

   _doLoadCbs();
   console.log('==用户信息创建成功', _playerInfo);
   _serializePlayerInfoIntoLocal(); // 保存到缓存
   G_Scheduler.schedule("Auto_Save_Player_Info", () => {
      // body...
      _saveToServer();
   }, 180);
};
let _doLoadCbs = function () {
   _isLoad = true;
   _loadCbs.forEach(cb => {
      typeof cb === 'function' &&
         cb(_playerInfo);
   });
   _loadCbs = [];
};

let _User_Info = (function () {
   let _instance = {
      onLoad(cb) {
         if (_isLoad) {
            typeof cb === 'function' &&
               cb(_playerInfo);
         }
         else {
            _loadCbs.push(cb);
         }
      },
      /**
       * 设置用户信息对象
       * @param {string} openID 
       * @param {string} sessID 
       * @param {object} data 后端请求返回的用户数据，如无请不要传递参数
       */
      setPlayerInfo(openID, sessID, data = null) {
         // console.log('==准备生成用户信息对象', openID, sessID, data);
         _storage_key = _storage_key.format(openID);
         if (data && data.selfStore !== '') {
            // 后端有用户数据
            let serialize_btyes = G_chSdk.HexString2Uint8Array(data.selfStore);

            _playerInfo = new db["PlayerInfo"].decode(serialize_btyes);
         }
         // 验证缓存中的数据
         this.checkUserInfo(openID, sessID);
      },
      /**
       * 检查缓存中用户数据
       * @param {string} sessID 
       */
      checkUserInfo(openID, sessID) {
         let save_json_str = _originUserInfo;

         if (save_json_str && save_json_str !== "") {
            // console.log('==缓存中的用户信息', save_json_str);
            // 缓存中有数据
            let save_json = JSON.parse(save_json_str);

            if (
               !_playerInfo || // 后端没有返回用户数据
               // 缓存中有数据且比后端数据更新，
               (typeof save_json["saveTime"] !== "undefined" &&
                  typeof save_json["data"] !== "undefined" &&
                  save_json["saveTime"] > _playerInfo.lastSaveTime)
            ) {
               // 使用缓存中的数据
               let serialize_btyes = G_chSdk.HexString2Uint8Array(save_json["data"]);

               _playerInfo = new db["PlayerInfo"].decode(serialize_btyes);
            }
         }
         else if (!_playerInfo) {
            // 缓存中无数据且后端也未返回用户信息，
            // 进入这个判断体代表后端没有数据，且没有缓存数据
            _playerInfo = _createNewUserInfo(openID, sessID);
         }
         // 所有条件未成立，此时后端数据是已经保存在 _playerInfo 中了

         // 创建完成在使用之前对数据更改
         _updateInfo(sessID);
         // 派发用户信息创建完成
         _createUserInfoFinish();
      },
      /**
       * 更新缓存中的用户信息
       */
      updateUserInfo() {
         _serializePlayerInfoIntoLocal();
      },
      /**
       * 保存缓存中的用户信息
       * 该函数要实现的功能是：当网络请求不成功时，会让用户使用默认配置玩游戏
       * 默认 openID 与网络下发的 openID 不一致
       * 当下次网络请求成功之后，将缓存中的用户数据合到用户新的sessID缓存中
       * 并上传网络，
       */
      saveStorageUserInfo(openID) {
         // 不要改全局的缓存键名，因为 openID 可能不一致
         // 登陆操作结束之后才可以改全局缓存键名
         let storKey = _storage_key.format(openID);
         let save_json_str = G_chSdk.getStorage(storKey);

         // console.log('==先保存缓存中的数据', save_json_str);
         if (save_json_str && save_json_str !== "") {
            _originUserInfo = save_json_str;
            // 置空原缓存信息
            G_chSdk.setStorage(storKey, '');
         }
      },
      getNickName() {
         // body...
         if (_playerInfo) {
            return _playerInfo.nickname;
         }
         else {
            return "";
         }
      },
      getSex() {
         // body...
         if (_playerInfo) {
            return _playerInfo.sex;
         }
         else {
            return "";
         }
      },
      getHeadUrl() {
         // body...
         if (_playerInfo) {
            return _playerInfo.headUrl;
         }
         else {
            return "";
         }
      },

      // 获取是否是新玩家
      isNewPlayer() {
         // body...
         if (_playerInfo) {
            return _isNewPlayer;
         }
         else {
            return false;
         }
      },

      // 获取离线时长（重新登录才会计算）
      getOutlineTime() {
         // body...
         return _outlineTime;
      },
      /**
       * 使用后端设置的值更新新用户初始数值
       * @param {number} phys 
       */
      updateInitCfg() {
         let phys = G_chInfo.getCfgInt('PHYS_INIT');
         if (_isNewPlayer && Number.isInteger(phys)) {
            _playerInfo.physical = phys;
         }
      },
      getSessId() {
         if (_playerInfo) {
            return _playerInfo.sessID;
         }
         else {
            return "";
         }
      },

      getOpenId() {
         if (_playerInfo) {
            return _playerInfo.openID;
         }
         else {
            return "default_user";
         }
      },
      
   };
   return {
      getInstance() {
         return _instance;
      }
   };
})();
module.exports = _User_Info;