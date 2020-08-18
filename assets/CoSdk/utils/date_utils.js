/**
 * 时间管理工具
 * 在请求成功的时候使用服务器时间，否则使用本地时间
 * 依赖 http_net 模块，且服务器提供返回时间戳的接口
 * 依赖 定时器模块 G_Scheduler
 */

let _loaded = false;  // 时间管理工具中的时间戳是否为服务器时间，false 使用前端本地时间
let _serverTime = 0;
let _startedAppTime = 0;
let _startedServerTime = 0;
let _formatNumberWithFilling = function (number, len, filling) {
   var sRet = number.toString();
   if (!filling) {
      filling = '0';
   }
   while (sRet.length < len) {
      sRet = filling + sRet;
   }
   return sRet;
};
// 注册的时间来自于登录从服务端获取
// serverTime 为时间戳，单位精确到秒, 转换成毫秒
// 且不停的增加
let _registerServerTime = function (serverTime) {
   // body...
   _startedAppTime = Date.now();
   _serverTime = serverTime * 1000;
   _startedServerTime = _serverTime;

   // schedule forever
   G_Scheduler.schedule('Server_Time_Tick', function () {
      // body...
      if (_loaded) {
         _serverTime = _startedServerTime + Date.now() - _startedAppTime;
      }
   }, 0.0);
};
// 
let _unregisterServerTime = function () {
   // body...
   if (_loaded) {
      _loaded = false;
      _serverTime = 0;
      _startedAppTime = 0;
      _startedServerTime = 0;

      // unschedule server tick
      G_Scheduler.unschedule('Server_Time_Tick');
   }
};

let _Date_Utils = (function () {

   let _instance = {
      /**
       * 初始时间管理工具的时间戳为服务器时间
       * @param {function} cb 
       */
      initServerTime(cb) {
         _loaded = false;
         G_chSdk &&
            G_chSdk.reqGetServerTime({
               success: res => {
                  // console.log('==服务器时间', res);
                  if (res && res.code === 0) {
                     _loaded = true;
                     _registerServerTime(parseInt(res.time, 10));
                     typeof cb === "function" && cb();
                  }
               }
            });
      },
      /**
       * 未使用
       * 每次从后台重新切入游戏主动调用
       * 只有服务器正常才会回调
       * @param {function} cb 
       */
      onReload(cb) {
         _unregisterServerTime();

         // reload
         this.initServerTime(cb);
      },

      /**
       * 获得当前时间戳
       */
      getServerTime() {
         if (!_loaded) {
            return Date.now();
         }
         else {
            return _serverTime;
         }
      },
      /**
       * 返回当日字符串值
       * 例 20200118
       */
      getTodayStr() {
         let date = this.getServerDate();
         let year = date.getFullYear().toString();
         let mon = _formatNumberWithFilling(date.getMonth() + 1, 2);
         let day = _formatNumberWithFilling(date.getDate(), 2);

         return year + mon + day;
      },
      /**
       * 获得当前时间对象 Date 的实例
       */
      getServerDate() {
         if (!_loaded) {
            return new Date();
         }
         else {
            return new Date(_serverTime);
         }
      },
      /**
       * 当前是星期几
       */
      getCurServerDayOfWeek() {
         // body...
         let day = this.getServerDate().getDay();

         // set sunday to 7
         if (day === 0) {
            day = 7;
         }

         return day;
      },
      /**
       * 一月中的第几日
       */
      getCurServerDayOfMonth() {
         return this.getServerDate().getDate();
      },
      /**
       * 一年中的第几天
       */
      getCurServerDayOfYear() {
         // body...
         let now = this.getServerDate();
         let start = new Date(now.getFullYear(), 0, 0);
         let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
         let oneDay = 1000 * 60 * 60 * 24;
         let dayNo = Math.floor(diff / oneDay);

         return dayNo;
      },
      /**
       * 一年中的第几周
       */
      getCurServerWeekOfYear() {
         // body...
         var instance = this.getServerDate();

         // Create a copy of this date object
         var target = new Date(instance.valueOf());

         // ISO week date weeks start on monday
         // so correct the day number
         var dayNr = (instance.getDay() + 6) % 7;

         // ISO 8601 states that week 1 is the week
         // with the first thursday of that year.
         // Set the target date to the thursday in the target week
         target.setDate(target.getDate() - dayNr + 3);

         // Store the millisecond value of the target date
         var firstThursday = target.valueOf();

         // Set the target to the first thursday of the year
         // First set the target to january first
         target.setMonth(0, 1);
         // Not a thursday? Correct the date to the next thursday
         if (target.getDay() !== 4) {
            target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
         }

         // The weeknumber is the number of weeks between the
         // first thursday of the year and the thursday in the target week
         var weekNo = 1 + Math.ceil((firstThursday - target) / 604800000);

         return weekNo;
      },
      /**
       * 格式化时间, 
       * 默认格式 2018年1月1日 01:02:03,
       * 当first = 2时日期格式为 2018/01/01 23:45:08
       * @param {Date} date 目标时间结构
       * @param {Boolean} first 是否需要年月日
       * @param {Boolean} last 是否需要当日时间
       */
      formatDate(date, first, last) {
         // body...
         var sDate = '';
         var sTime = '';

         if (!first && !last) {
            first = last = true;
         }

         if (first) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            if (first == 2) {
               sDate = y + '/' + _formatNumberWithFilling(m, 2) + '/' + _formatNumberWithFilling(d, 2);
            }
            else {
               sDate = y + '年' + m + '月' + d + '日';
            }
         }

         if (last) {
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();

            sTime = _formatNumberWithFilling(h, 2) + ':' + _formatNumberWithFilling(m, 2) + ':' + _formatNumberWithFilling(s, 2);
         }

         if (first && last) {
            return sDate + ' ' + sTime;
         }
         else if (first) {
            return sDate;
         }
         else if (last) {
            return sTime;
         }

         return sDate + ' ' + sTime;
      },
      /**
      * 将秒数转化为时分制 
      */
      convertSecondToHourMinute(seconds) {
         // body...
         if (!G_GameDB.isLoaded()) {
            return "";
         }

         let strHour = '小时';
         let strMinute = '分钟';

         if (typeof seconds === "number") {
            if (seconds >= 3600) {
               let hours = Math.floor(seconds / 3600);
               let minutes = Math.floor((seconds - 3600 * hours) / 60);

               if (minutes > 0) {
                  return hours.toString() + strHour + minutes.toString() + strMinute;
               }
               else {
                  return hours.toString() + strHour;
               }
            }
            else if (seconds >= 60) {
               let minutes = Math.floor(seconds / 60);
               return minutes.toString() + strMinute;
            }
            else if (seconds > 0) {
               return "1" + strMinute;
            }
            else {
               return "0" + strMinute;
            }
         }

         return "";
      },

      /**
      * 将秒数转化为时分秒制 
      */
      convertSecondToHourMinuteSecond(seconds) {
         // body...
         let ret = "";

         if (seconds >= 3600) {
            let hours = Math.floor(seconds / 3600);
            if (hours >= 10) {
               ret += hours.toString();
            }
            else {
               ret += "0" + hours.toString();
            }
         }
         else {
            ret += "00";
         }

         ret += ":";

         let minutes = Math.floor((seconds % 3600) / 60);
         if (minutes > 0) {
            if (minutes >= 10) {
               ret += minutes.toString();
            }
            else {
               ret += "0" + minutes.toString();
            }
         }
         else {
            ret += "00";
         }

         ret += ":";

         let secs = seconds % 60;
         if (secs > 0) {
            if (secs >= 10) {
               ret += secs.toString();
            }
            else {
               ret += "0" + secs.toString();
            }
         }
         else {
            ret += "00";
         }

         return ret;
      },
      /**
       * 将星期数字转化为中文
       * 支持数字1-7
       */
      convertNumberToChinese(num) {
         // body...
         if (typeof num === "number") {
            switch (num) {
               case 1:
                  return "一";
               case 2:
                  return "二";
               case 3:
                  return "三";
               case 4:
                  return "四";
               case 5:
                  return "五";
               case 6:
                  return "六";
               case 7:
                  return "日";
               default:
                  return "一";
            }
         }
         else {
            return "一";
         }
      }
   };
   return {
      getInstance() {
         return _instance;
      }
   };
})();
module.exports = _Date_Utils;