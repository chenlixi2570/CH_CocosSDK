/*
 * @Author: Chen Li Xi
 * @Description: 用户关卡数据处理模块
 * 过关完成等级星星功能管理模块
 * 签到数据保存为对象，属性名为关卡标识，属性值为当前关可得几颗星
 */

let userInfo = require('user_info').getInstance();

let _playerInfo = null;
let _allLevelData = []; // 所有关卡数据
let _totalLe = 0; // 关卡总数
let _currLvId = 0; // 当前正在进行的关卡ID
let _currLvData = {}; // 当前正在进行的关卡数据
let _todayCount = 0; // 当天已经玩了几关，过关一次增加1
function initUserInfo() {
   userInfo.onLoad(playerInfo => {
      // console.log('关卡取得了用户数据吗', playerInfo);

      _playerInfo = playerInfo;
   });
}
let _Level_Info = (function () {
   let _instance = {
      /**
       * 获取玩家已经能玩的最大关卡，
       * 该关卡用户可以玩，但没通关
       * 该关之前都已通关，该关之后都未解锁
       * 第一关是 0
       */
      getLatestLevel() {
         if (_playerInfo &&
            Number.isInteger(parseInt(_playerInfo.currLevel, 10))) {
            return parseInt(_playerInfo.currLevel, 10);
         } else {
            return 0;
         }
      },
      /**
       * 玩家过关之后将玩家的最新关卡加 1
       */
      addLatestLevel() {
         // if (_playerInfo && _playerInfo.currLevel < _totalLe - 1) {
         // 最新关卡可以无限增加，达到最大关卡数据取随机关卡数据
         if (_playerInfo && G_chSdk.isNumber(_playerInfo.currLevel)) {
            _playerInfo.currLevel += 1;
            G_chInfo.updateUserInfo();
            console.log('==最新关卡增加，当前=', _playerInfo.currLevel);
            G_chSdk.dispatchEvent(G_Const.EventName.CH_CURRLEVEL_ADD);
         }
      },

      /**
       * 设置所有关卡数据
       * 初始会将用户关卡数据更新到最新关卡
       * @param {array} arr 
       */
      setAllLevelData(arr) {
         if (Array.isArray(arr)) {
            _allLevelData = arr;
            _totalLe = arr.length;
            this.setCurrLevelToLatest();
         }
      },
      /**
       * 获取所有关卡数据
       */
      getAllLevelData() {
         return _allLevelData;
      },
      /**
       * 定向为最新关卡
       * 到最后一关时从第一关继续
       */
      setCurrLevelToLatest() {
         let index = this.getLatestLevel();
         // if (index > _totalLe - 1) {
         //    index = 0;
         // }
         // 最新关卡可以无限增加，达到最大关卡数据取随机关卡数据
         console.log(`==定向到最新关${index},一共=${_totalLe}`);
         this.setCurrLevel(index);
      },
      /**
       * 定向为下一关
       */
      setCurrLevelToNext() {
         let index = _currLvId;
         let latest = this.getLatestLevel();
         if (_currLvId < latest) {
            index += 1;
         }
         this.setCurrLevel(index);
         console.log(`==定向为下一关 ${index}, 一共=${_totalLe}`);
      },
      /**
       * 定向为任意一关卡
       * @param {number} index 
       */
      setCurrLevelToIndex(index) {
         index = +index;
         let latest = this.getLatestLevel();
         if (
            Number.isInteger(index) &&
            index <= latest
         ) {
            this.setCurrLevel(index);
         }
      },
      /**
       * 设置当前在玩的关卡
       * @param {number} index 
       */
      setCurrLevel(index) {
         // if (index >= _totalLe - 1) {
         //    index = _totalLe - 1;
         // } else if (index <= 0) {
         //    index = 0;
         // }
         // 最新关卡可以无限增加，达到最大关卡数据取随机关卡数据
         _currLvId = index;
         this.setLevelData();
      },
      /**
       * 设置当前关卡的数据
       */
      setLevelData() {
         let lvData = null;
         if (_currLvId >= _totalLe) {
            lvData = _allLevelData[0, G_chSdk.randomInt(0, _totalLe - 1)];
         }
         else {
            lvData = _allLevelData[_currLvId];
         }
         console.log('==当前在玩关', _currLvId, lvData);

         if (G_chSdk.isObject(lvData)) {
            _currLvData = lvData;
         }
      },
      /**
       * 游戏中得到当前关卡ID
       * 从0开始计数
       */
      getCurrLevel() {
         return _currLvId;
      },
      /**
       * 当前关是否为最后一关
       */
      isEndLevel() {
         return _currLvId == _totalLe - 1;
      },
      /**
       * 当前关卡数据
       */
      getLevelData() {
         return _currLvData;
      },
      /**
       * 取任意索引关卡的数据
       * 返回null则未取到
       * @param {number} index 
       */
      getLevelDataToIndex(index) {
         let lvData = _allLevelData[index];

         if (G_chSdk.isObject(lvData)) {
            return lvData;
         } else {
            return null;
         }
      },
      /**
       * 返回关卡总长度
       */
      getLevelLength() {
         return _totalLe;
      },
      /**
       * 返回小游戏生命周期内已过关次数
       */
      getTodayCount() {
         return _todayCount;
      },
      /**
       * 记录小游戏生命周期内已过关次数
       */
      addTodayCount() {
         _todayCount += 1;
         console.log(`==本次已玩过 ${_todayCount} 局`);
         if (_todayCount === 1) {
            G_chSdk.dispatchOnce('today_count_of_one');
         }
      },
      // 是否有关卡数据
      hasAllLevel() {
         return _allLevelData.length > 0;
      },
      /**
       * 得到用户购买关卡的所有信息
       */
      getBuySing() {
         if (_playerInfo) {
            if (typeof _playerInfo.buySing === 'undefined' ||
               _playerInfo.buySing === '') {
               _playerInfo.buySing = "{}";
            }

            return JSON.parse(_playerInfo.buySing);
         } else {
            return {};
         }
      },
      /**
       * 设置购买关卡购买
       * 保存格式，键名关卡标志字符，键值 '0,1' 0 未购买，1 已购买
       */
      setBuySing(flag, buyStatus) {
         if (!G_chSdk.checkString(flag)) return;
         if (_playerInfo) {
            let obj = this.getBuySing();
            obj[flag] = buyStatus;

            _playerInfo.buySing = JSON.stringify(obj);
            console.log('==保存关卡购买状态', _playerInfo.buySing);
            userInfo.updateUserInfo();
         }
      },
      /**
       * 当前关卡是否已购买
       * 先判断完是否需要购买再来判断是否已购买
       */
      getCurBuySing(flag) {
         if (!G_chSdk.checkString(flag)) return '0';
         if (_playerInfo) {
            let obj = this.getBuySing();
            if (typeof obj[flag] !== 'undefined') {
               return obj[flag];
            }
         }
         return '0';
      },

      /**
       * 得到用户所有关卡解锁星星的信息
       */
      getLevelStar() {
         if (_playerInfo) {
            if (typeof _playerInfo.levelStar === 'undefined' ||
               _playerInfo.levelStar === '') {
               _playerInfo.levelStar = "{}";
            }

            return JSON.parse(_playerInfo.levelStar);
         } else {
            return {};
         }
      },
      /**
       * 设置过关后解锁星星的数量
       * 保存格式，键名关卡标志，键值 '1' 
       */
      setLevelStar(level, star) {
         if (!level || typeof level === 'object') return;
         if (_playerInfo) {
            let obj = this.getLevelStar();
            obj[level] = star;

            _playerInfo.levelStar = JSON.stringify(obj);
            console.log('==保存过关星星数量', _playerInfo.levelStar);
            userInfo.updateUserInfo();
         }
      },
      /**
       * 当前关卡星星数量
       * 用关卡标志取当前这首歌已得到的星星
       */
      getCurLevelStar(level) {
         if (!level || typeof level === 'object') return;
         if (_playerInfo) {
            let obj = this.getLevelStar();
            if (typeof obj[level] !== 'undefined') {
               return obj[level];
            }
         }
         return '0';
      },
      /**
       * 已取得的星星总数
       */
      getTotalStar() {
         let all = this.getLevelStar();
         let total = 0;
         for (const key of Object.keys(all)) {
            // let val = all[key].split(',');
            let val = all[key];
            Array.isArray(val) && val.forEach(item => {
               let count = parseInt(item);
               if (Number.isInteger) {
                  total += count;
               }
            });
         }
         return total;
      },

      /**
       * 得到用户所有关卡完成进度
       */
      getStarScale() {
         if (_playerInfo) {
            if (typeof _playerInfo.starScale === 'undefined' ||
               _playerInfo.starScale === '') {
               _playerInfo.starScale = "{}";
            }

            return JSON.parse(_playerInfo.starScale);
         } else {
            return {};
         }
      },
      /**
       * 设置过关后关卡完成进度
       * 保存格式，键名关卡标志，键值 '0-100' 
       */
      setStarScale(level, star) {
         if (!level || typeof level === 'object') return;
         if (_playerInfo) {
            let obj = this.getStarScale();
            if (obj[level] === undefined || star > obj[level]) {
               obj[level] = star;
               _playerInfo.starScale = JSON.stringify(obj);
               console.log('==保存过关完成进度', _playerInfo.starScale);
               userInfo.updateUserInfo();
            }
         }
      },
      /**
       * 当前关卡完成进度
       * 用关卡标志取当前这首歌的完成进度
       */
      getCurStarScale(level) {
         if (!level || typeof level === 'object') return '';
         if (_playerInfo) {
            let obj = this.getStarScale();
            if (typeof obj[level] !== 'undefined') {
               return obj[level];
            }
         }
         return '0';
      },
   };
   initUserInfo();
   return {
      getInstance() {
         return _instance;
      }
   };
})();
module.exports = _Level_Info;