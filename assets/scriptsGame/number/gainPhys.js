/*
 * @Author: Chen Li Xi
 * @Description: 获取更多体力
 */
let Cls_BasePopup = require("base_popup");
cc.Class({
   extends: Cls_BasePopup,

   properties: {
      total_time: cc.Label,
      timedownLab: cc.Label,
      taskNum: cc.Label, // 看视频可以得到的钻石数
      gemNum: cc.Label, // 兑换体力消耗的钻石数
      physNum: cc.Label, // 消耗钻石可获得体力数
      taskNode: cc.Node, // 视频按钮节点
      _clickLock: false, // 多次快速点击锁
   },

   onLoad() {
      G_chSdk.registerBtnClick(this, 'Close', this.onClose);
      // 可以购买到的体力值
      this.gainPhys = G_chInfo.getCfgInt('PHYS_COUNT') * G_chInfo.getCfgInt('GEM_TO_PHYS');
      this.listenerEv();
      this.updateNum();
   },
   listenerEv() {
      this.run_update_timedown = function (second) {
         this.update_timedown(second);
      }.bind(this);

      this.run_total_time = function () {
         this.draw_total_time();
      }.bind(this);

      G_chSdk.addEventListener(
         G_Const.EventName.EN_SECOND_RUN,
         this.run_update_timedown
      );
      G_chSdk.addEventListener(
         G_Const.EventName.CH_PHYS_CHANGED,
         this.run_total_time
      );
   },
   onDestroy() {
      G_chSdk.removeEventListener(
         G_Const.EventName.CH_PHYS_CHANGED,
         this.run_total_time
      );
      G_chSdk.removeEventListener(
         G_Const.EventName.EN_SECOND_RUN,
         this.run_update_timedown
      );
   },
   onEnable() {
      this.draw_total_time();
   },
   onShowFinished() {
   },
   onClose() {
      G_UIManager.hideUI('gainPhys');
   },
   // 显示全部恢复的时间 
   draw_total_time() {
      let currPhy = G_chInfo.getPhysical();
      let limitPhy = G_chInfo.getCfgInt('PHYS_LIMIT');
      let minPhy = limitPhy - currPhy;
      let secTime = minPhy * G_chInfo.getCfgInt('PHYS_TIME');
      let time = G_chSdk.convertSecondToHourMinute(secTime);
      if (this.total_time) {
         this.total_time.string = '全部恢复: ' + time;
      }
   },
   // 倒计时刷新
   update_timedown(second) {
      let time = G_chSdk.convertSecondToHourMinuteSecond(second);
      if (this.timedownLab) {
         this.timedownLab.string = time;
      }
   },
   // 任务完成得奖励
   finishTask() {
      G_chInfo.plusPhysical(G_chInfo.getCfgInt('TASK_PHYS'));
      G_UIManager.showUI('showToast',  '恭喜获得' + G_chInfo.getCfgInt('TASK_PHYS') + '体力！！')
      this.onClose();
   },
   updateNum() {
      if (this.taskNum) {
         this.taskNum.string = 'X' + G_chInfo.getCfgInt('TASK_PHYS');
      }
      if (this.gemNum) {
         this.gemNum.string = 'X' + G_chInfo.getCfgInt('PHYS_COUNT');
      }
      if (this.physNum) {
         this.physNum.string = 'X' + this.gainPhys;
      }
   },
   // 钻石购买体力
   buyPhysRun(e) {
      if (this._clickLock) return;
      this._clickLock = true;

      if (G_chInfo.canMinusGem(G_chInfo.getCfgInt('PHYS_COUNT'))) {
         this.minusMove(this.gainPhys, e.currentTarget);
         console.log('---钻石购买体力', this.gainPhys);
         G_chInfo.minusGem(G_chInfo.getCfgInt('PHYS_COUNT'));
         G_chInfo.plusPhysical(this.gainPhys);
      } else {
         G_UIManager.showUI('gainGem');
         this._clickLock = false;
      }
   },
   // 推广任务完成得体力
   taskAddPhys() {
      G_chInfo.plusPhysical(G_chInfo.getCfgInt('TASK_PHYS'));
      this.savePhysPlus(G_chInfo.getCfgInt('TASK_PHYS'), this.taskNode);
   },
   // 保存增加体力
   savePhysPlus(num = 0, node) {
      G_chSdk.dispatchEvent(
         G_Const.EventName.EN_ADD_MOVE,
         'physcial',
         node,
         () => {
            this._clickLock = false;
         }
      );

   },
   // 购买的先出减少动画
   minusMove(num = 0, node) {
      // 先减钻石
      G_chSdk.dispatchEvent(
         G_Const.EventName.EN_SUB_MOVE,
         'gem',
         node,
         () => {
            this.savePhysPlus(num, node);
         }
      );
   }
});
