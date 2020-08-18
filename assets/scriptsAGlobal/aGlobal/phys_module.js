/**
 * 体力控制模块
 * 玩家体力小于上限时，倒计时增加
 * 玩家离线时，再次进入体力小于上限时增加体力
 */

let _instance = null;
class Phys_Module {
   constructor() {
      if (!_instance) {
         _instance = this;
      }
      return _instance;
   }
   static getInstance() {
      return _instance || (_instance = new this);
   }
   init() {
      let { hasPhysical } = require('global_const');
      console.log('==游戏是否开启体力系统', hasPhysical)
      if (hasPhysical) {
         this.addTimeEvent(); // 启动全局定时器，当体力小于上限时倒计时增加
         this.outlinePhys();// 检查离线时间加体力
      }
   }
   /** 倒计时体力更新实现 start **/
   // 启动体力更改事件，
   addTimeEvent() {
      G_chSdk.addEventListener(
         G_Const.EventName.CH_PHYS_CHANGED,
         this.canStartTimedown,
         this
      );
      // 程序第一次进入时立即查看玩家体力是否达到上限
      this.canStartTimedown();
   }

   // 当体力低于上限时，启动定时器倒计时增加体力，
   // 当体力达到上限时停止定时器。如果体力未达到上限重新开启倒计时。
   startTimedownPhysical() {
      let isHas = G_Scheduler.isScheduled('timedown_physical');
      if (isHas) return;

      let phys_time = G_chInfo.getCfgInt('PHYS_TIME');
      G_Scheduler.schedule("timedown_physical", () => {
         G_chSdk.dispatchEvent(G_Const.EventName.EN_SECOND_RUN, phys_time);

         if (phys_time === 0) {
            G_Scheduler.unschedule("timedown_physical");
            G_chInfo.plusPhysical(G_chInfo.getCfgInt('PHYS_VAL'));
         } else {
            phys_time--;
         }
      }, 1);
   }
   // 可以开始倒计时吗
   canStartTimedown() {
      let currPhy = G_chInfo.getPhysical();
      let limitPhy = G_chInfo.getCfgInt('PHYS_LIMIT');
      if (currPhy < limitPhy) {
         this.startTimedownPhysical();
      } else {
         G_chSdk.dispatchEvent(G_Const.EventName.EN_PHYSICAL_TIMEDOWN_END);
      }
   }
   /**
    * 检查离线时间加体力
    */
   outlinePhys() {
      // 不是新用户并且当前体力小于上限，增加离线体力
      let _isNewPlayer = G_chInfo.isNewPlayer();
      let physical = G_chInfo.getPhysical();
      let limit = +G_chInfo.getCfgInt('PHYS_LIMIT');
      let _outlineTime = G_chInfo.getOutlineTime();
      if (!_isNewPlayer && physical < limit) {

         let count = Math.floor(_outlineTime / G_chInfo.getCfgInt('PHYS_TIME'));
         let phys = parseInt(count * G_chInfo.getCfgInt('PHYS_VAL'));
         let maxPhys = limit - physical;
         let currPhys = Math.min(maxPhys, phys);

         console.log(`==离线可增加体力${maxPhys}`);

         if (Number.isInteger(phys)) {
            if (currPhys > 0) {
               G_chInfo.plusPhysical(currPhys);
               G_UIManager.showUI('showToast', `离线增加${currPhys}点体力`);
            }
         }
      }
   }
   /** 倒计时体力更新实现 end **/
}
module.exports = Phys_Module;