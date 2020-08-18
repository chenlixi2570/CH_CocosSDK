/*
 * @Author: Chen Li Xi
 * @Description: 分享与视频次数限制管理模块
 */

let userInfo = require('user_info').getInstance();

let _playerInfo = null;
function initUserInfo() {
   userInfo.onLoad(playerInfo => {
      _playerInfo = playerInfo;
   });
}

let _Free_Info = (function () {
   let _instance = {

      getTodayShareTimes() {
         // body...
         if (_playerInfo) {
            // check first
            this._checkShareTimesValid();

            return _playerInfo.shareTimesOfToday;
         }
         else {
            return 0;
         }
      },

      plusTodayShareTimes() {
         // body...
         if (_playerInfo) {
            // check first
            this._checkShareTimesValid();

            _playerInfo.shareTimesOfToday += 1;
            _playerInfo.recordDayOfShareTimes = G_chSdk.getCurServerDayOfYear();
            userInfo.updateUserInfo();
         }
      },

      _checkShareTimesValid() {
         // body...
         if (_playerInfo.recordDayOfShareTimes !== G_chSdk.getCurServerDayOfYear()) {
            _playerInfo.shareTimesOfToday = 0;
            _playerInfo.recordDayOfShareTimes = G_chSdk.getCurServerDayOfYear();
            userInfo.updateUserInfo();
         }
      },

      // 奖励广告次数，部分分享也会记入广告次数
      getTodayAdvTimes() {
         // body...
         if (_playerInfo) {
            // check first
            this._checkAdvTimesValid();

            return _playerInfo.advTimesOfToday;
         }
         else {
            return 0;
         }
      },

      plusTodayAdvimes() {
         // body...
         if (_playerInfo) {
            // check first
            this._checkAdvTimesValid();

            _playerInfo.advTimesOfToday += 1;
            _playerInfo.recordDayOfAdvTimes = G_chSdk.getCurServerDayOfYear();
            userInfo.updateUserInfo();

            // event
            G_chSdk.dispatchEvent(G_Const.EventName.EN_ADV_TIMES_CHANGED);
         }
      },

      isNoMoreAdvTimesToday(cb) {
         // body...
         let CfgInfo = require('cfg_info').getInstance();
         let maxAdvTimes = CfgInfo.getRewardTimesOfEachDay();
         return this.getTodayAdvTimes() >= maxAdvTimes;
      },

      _checkAdvTimesValid() {
         // body...
         if (_playerInfo.recordDayOfAdvTimes !== G_chSdk.getCurServerDayOfYear()) {
            _playerInfo.advTimesOfToday = 0;
            _playerInfo.recordDayOfAdvTimes = G_chSdk.getCurServerDayOfYear();
            userInfo.updateUserInfo();
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

module.exports = _Free_Info;