/**
 * 定时器
 */
var __Scheduler = cc.Class({
   extends: cc.Component,

   // properties
   properties: {
      _scheduledInfos: {
         default: {},
         visible: false
      },
   },

   // methods

   /**
    * 创建定时器 成功返回true 失败返回false
    * @param {*} key 标识符(全局唯一)
    * @param {*} cb 回调
    * @param {*} interval 间隔（默认0）
    * @param {*} repeat 重复次数（默认cc.macro.REPEAT_FOREVER)
    * @param {*} delay 延迟（默认0）
    * @param {*} paused 是否暂停（默认false)
    */
   schedule: function (key, cb, interval, repeat, delay, paused) {
      // body...
      if (!this._checkKey(key) || !this._checkCallback(cb)) {
         return false;
      }

      if (this._scheduledInfos[key]) {
         return false;
      }

      if (typeof repeat === "undefined" || repeat === null) {
         repeat = cc.macro.REPEAT_FOREVER;
      }

      let scheduleCb = repeat === 0 ? cb : function (dt) {
         // body...
         let _info = this._scheduledInfos[key];
         if (_info) {
            _info.invokeTimes += 1;

            if (_info.invokeTimes >= repeat) {
               // temp save
               let _cb = _info.cb;

               // unschedule
               delete this._scheduledInfos[key];

               // callback
               _cb();
            }
            else {
               // callback
               _info.cb(dt);
            }
         }
      }.bind(this);

      cc.director.getScheduler().schedule(scheduleCb
         , this
         , (interval || 0)
         , repeat
         , (delay || 0)
         , (paused || false));

      // save
      if (repeat !== 0) {
         this._scheduledInfos[key] = {
            invokeTimes: 0,
            scheduleCb: scheduleCb,
            cb: cb
         };
      }

      return true;
   },

   /**
    * 取消定时器
    * @param {string} key 
    */
   unschedule: function (key) {
      // body...
      if (!this._checkKey(key)) {
         return false;
      }

      if (!this._scheduledInfos[key]) {
         return false;
      }

      cc.director.getScheduler().unschedule(this._scheduledInfos[key].scheduleCb, this);

      // reset
      delete this._scheduledInfos[key];

      return true;
   },

   /**
    * 是否存在此定时器
    * @param {string} key 
    */
   isScheduled: function (key) {
      // body...
      if (!this._checkKey(key)) {
         return false;
      }

      if (!this._scheduledInfos[key]) {
         return false;
      }

      return cc.director.getScheduler().isScheduled(this._scheduledInfos[key].scheduleCb, this);
   },

   /**
    * 取消所有定时器
    */
   unscheduleAll: function () {
      // body...
      for (let key in this._scheduledInfos) {
         cc.director.getScheduler().unschedule(this._scheduledInfos[key].scheduleCb, this);
      }

      this._scheduledInfos = {};
   },

   _checkKey: function (key) {
      // body...
      if ((typeof key === "string") && key !== "") {
         return true;
      }

      return false;
   },

   _checkCallback: function (cb) {
      // body...
      if (typeof cb === "function") {
         return true;
      }

      return false;
   }
});

var _Scheduler = (function () {
   var _instance;

   function init() {
      // body...
      // console.log('实例化 G_Scheduler...');

      // create and return
      return (new __Scheduler());
   }

   return {
      getInstance: function () {
         if (!_instance) {
            _instance = init();
         }

         return _instance;
      }
   };
})();

// export
module.exports = _Scheduler;