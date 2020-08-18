/*
 * @Author: Chen Li Xi
 * @Description: 签到功能管理模块
 * 签到数据保存为数组，数组的值是已签到当日字符 
 * ['20200118','20200123']
 * 签到可中断，只累积七日一循环
 */

let userInfo = require('user_info').getInstance();

let _playerInfo = null;
function initUserInfo() {
   userInfo.onLoad(playerInfo => {
      _playerInfo = playerInfo;
   });
}

let _Sign_Info = (function () {
   let _instance = {
      /**
       * 获取玩家所有的签到信息
       * @returns Array
       */
      getSignInfo() {
         if (_playerInfo) {
            // 后期增加的保存信息，要先判断对象下是否有该属性
            // 如无要设置初始值。
            if (typeof _playerInfo.signInfo === 'undefined') {
               _playerInfo.signInfo = "";
            }

            let arr = _playerInfo.signInfo.split(',');
            arr = arr.filter(item => !!item);
            return arr;
         } else {
            return [];
         }
      },
      /**
       * 记录今日已签到
       */
      setSignInfo() {
         if (_playerInfo) {
            let today = G_chSdk.getTodayStr();
            let signInfo = this.getSignInfo();
            signInfo.push(today);
            signInfo = [...new Set(signInfo)]; // 去重
            this.delSignInfo(signInfo); // 默认最多保存28次
            _playerInfo.signInfo = signInfo.join();
            console.log('保存用户签到信息', _playerInfo.signInfo);

            userInfo.updateUserInfo();
            G_chSdk.dispatchEvent(G_Const.EventName.CH_SIGN_SUCC);
         }
      },
      /**
       * 今日是否已签到
       * 返回 true 表示已经签到 false 未签到
       */
      todayIsSign() {
         let today = G_chSdk.getTodayStr();
         let signInfo = this.getSignInfo();
         return signInfo.indexOf(today) !== -1;
      },
      /**
       * 七日签到情况
       * 从0开始计数，该数字内的项都是已经签到状态
       */
      getSevenLen() {
         let signInfo = this.getSignInfo();
         let result = signInfo.length % 7;
         return result;
      },
      /**
       * 是否为第一周签到，true 为第一周
       */
      isFirstWeek() {
         let signInfo = this.getSignInfo();
         return signInfo.length <= 7;
      },
      /**
       * 防止保存的字符数据过多
       * 默认最多保存28次签到
       */
      delSignInfo(signInfo) {
         if (signInfo.length < 28) {
            return;
         }
         else {
            signInfo.splice(0, 7);
         }
      }
   };
   initUserInfo();
   return {
      getInstance() {
         return _instance;
      }
   };
})();
module.exports = _Sign_Info;