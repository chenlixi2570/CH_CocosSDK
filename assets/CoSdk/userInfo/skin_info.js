/*
 * @Author: Chen Li Xi
 * @Description: 皮肤管理模块
 * 用数字编号皮肤，从0开始计数，所有已解锁皮肤保存在一个数组中
 */

let userInfo = require('user_info').getInstance();

let _playerInfo = null;
let _allSkin = []; // 所有皮肤数据数组
let _skinLen = 0; // 总皮肤长度
let _taskCount = null; // 保存看广告任务次数 {skinflag: count,}
let _storageKey = 'SK_Skin_Task_Count';
function initUserInfo() {
   userInfo.onLoad(playerInfo => {
      _playerInfo = playerInfo;
   });
}

function _getTaskCountData() {
   if (_taskCount === null) {
      let taskData = G_chSdk.getStorage(_storageKey);
      if (G_chSdk.checkString(taskData)) {
         console.log('==缓存中皮肤广告次数', taskData);

         let data = JSON.parse(taskData);
         _taskCount = G_chSdk.isObject(data) ? data : {};
      }
      else {
         _taskCount = {};
      }
   }
   return _taskCount;

}

let _Skin_Info = (function () {
   let _instance = {
      /**
       * 设置所有皮肤数据
       * @param {Array} allSkin 
       */
      setAllSkin(allSkin) {
         if (Array.isArray(allSkin)) {
            _allSkin = allSkin;
            _skinLen = allSkin.length;
         }
      },
      /**
       * 得到当前正在使用的皮肤编号
       */
      getCurrSkin() {
         if (_playerInfo) {
            return _playerInfo.currSkin;
         } else {
            return 0;
         }
      },
      /**
       * 得到当前正在使用的皮肤数据
       */
      getCurrSkinData() {
         let idx = this.getCurrSkin();
         let skinData = _allSkin[idx];
         if (skinData) {
            return skinData;
         }
         else {
            return null;
         }
      },
      /**
       * 更新当前正在使用的皮肤编号
       * @param {number} skinId 
       */
      setCurrSkin(skinId) {
         skinId = parseInt(skinId, 10);
         skinId = Number.isInteger(skinId) ? skinId : 0;
         if (_playerInfo) {
            _playerInfo.currSkin = skinId;
            G_chInfo.updateUserInfo();
            G_chSdk.dispatchEvent(G_Const.EventName.CH_SKIN_UPDATE, skinId);
         }
      },
      /**
       * 获取所有已解锁的皮肤
       */
      getUnlockSkin() {
         if (_playerInfo) {
            if (typeof _playerInfo.unlockSkin === 'undefined') {
               _playerInfo.unlockSkin = "";
            }
            let arr = _playerInfo.unlockSkin.split(',');
            arr = arr.map(item => +item);
            arr = arr.filter(item => Number.isInteger(item));
            console.log('==所有已解锁皮肤', arr);

            return arr;
         } else {
            return [];
         }
      },
      /**
       * 加入新解锁的皮肤
       * @param {*} skinId 
       */
      setUnlockSkin(skinId) {
         skinId = parseInt(skinId);
         if (!Number.isInteger(skinId)) return;
         let arr = this.getUnlockSkin();
         arr.push(skinId);
         arr = [...new Set(arr)]; // 去重
         if (_playerInfo) {
            _playerInfo.unlockSkin = arr.join(',');
            G_chInfo.updateUserInfo();
            console.log('==保存解锁皮肤的编号', _playerInfo.unlockSkin);
            G_chSdk.dispatchEvent(G_Const.EventName.CH_SKIN_NEW, skinId);
         }
      },
      /**
       * 获取所有未解锁的皮肤
       */
      getLockSkin() {
         let result = [];
         let unlock = this.getUnlockSkin();
         unlock = unlock.map(item => parseInt(item, 10));
         for (let i = 0; i < _skinLen; i++) {
            if (!unlock.includes(i)) {
               result.push(i);
            }
         }
         return result;
      },

      /**
       * 当前皮肤是否已经解锁
       * @param {number} skinId 
       */
      includeSkin(skinId) {
         skinId = parseInt(skinId);
         if (!Number.isInteger(skinId)) return false;
         let arr = this.getUnlockSkin();
         arr = arr.map(item => parseInt(item));
         return arr.includes(skinId);
      },
      /**
       * 获得所有皮肤长度
       */
      getAllSkinLen() {
         return _skinLen;
      },
      /**
       * 获得指定索引的皮肤数据
       * 不指定索引返回当前正在使用的皮肤数据
       * @param {number} idx 
       */
      getSkinDataByIndex(idx) {
         if (Number.isInteger(idx) &&
            idx >= 0 &&
            idx < _skinLen
         ) {
            return _allSkin[idx];
         } else {
            return this.getCurrSkinData();
         }
      },
      /**
       * 获得标识对应皮肤已看广告任务次数
       * @param {string} skinFlag 皮肤标识字符串
       */

      getSkinTaskCount(skinFlag) {
         if (!G_chSdk.checkString(skinFlag)) return 0;
         let taskCount = _getTaskCountData();
         if (!G_chSdk.isNumber(taskCount[skinFlag])) {
            taskCount[skinFlag] = 0;
         }
         return taskCount[skinFlag];
      },
      /**
       * 保存标识对应皮肤已看广告任务次数 累加1
       * @param {string} skinFlag 皮肤标识字符串
       */
      saveSkinTaskCount(skinFlag) {
         if (!G_chSdk.checkString(skinFlag)) return;
         let taskCount = _getTaskCountData();
         if (!G_chSdk.isNumber(taskCount[skinFlag])) {
            taskCount[skinFlag] = 1;
         }
         else {
            taskCount[skinFlag] += 1;
         }
         G_chSdk.setStorage(_storageKey, taskCount);
      }

   };
   initUserInfo();
   return {
      getInstance() {
         return _instance;
      }
   };
})();
module.exports = _Skin_Info;