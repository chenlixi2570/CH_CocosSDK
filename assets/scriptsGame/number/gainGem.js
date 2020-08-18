/*
 * @Author: Chen Li Xi
 * @Description: 
 */
let Cls_BasePopup = require("base_popup");
cc.Class({
   extends: Cls_BasePopup,

   properties: {
      taskNum: cc.Label, // 看视频可以得到的钻石数
      gemNum: cc.Label, // 金币兑换的钻石数
      coinNum: cc.Label, // 兑换钻石消耗金币数
      taskNode: cc.Node, // 视频按钮节点
      _clickLock: false, // 多次快速点击锁
   },

   onLoad() {
      G_chSdk.registerBtnClick(this, 'Close', this.onClose);
      // 购买一次钻石消耗的金币总数
      this.needCoin = G_chInfo.getCfgInt('GEM_COUNT') * G_chInfo.getCfgInt('COIN_TO_GEM');
      this.updateNum();
   },
   updateNum() {
      if (this.taskNum) {
         this.taskNum.string = 'X' + G_chInfo.getCfgInt('TASK_GEM');
      }
      if (this.gemNum) {
         this.gemNum.string = 'X' + G_chInfo.getCfgInt('GEM_COUNT');
      }
      if (this.coinNum) {
         this.coinNum.string = this.needCoin + '金币';
      }
   },
   onClose() {
      G_UIManager.hideUI('gainGem');
   },
   // 金币购买钻石
   buyGemRun(e) {
      if (this._clickLock) return;
      this._clickLock = true;
      if (G_chInfo.canMinusCoin(this.needCoin)) {
         G_chInfo.minusCoin(this.needCoin);
         G_chInfo.plusGem(G_chInfo.getCfgInt('GEM_COUNT'));
         this.minusMove(G_chInfo.getCfgInt('GEM_COUNT'), e.currentTarget);
      } else {
         if (G_chInfo.isShowAdvOfVIVO()) {
            // 开关关闭
            G_UIManager.showUI('showToast', '金币不足哟...');
         }
         else {
            G_UIManager.showUI('gainCoin');
         }
         this._clickLock = false;
      }
   },
   // 推广任务完成得钻石
   taskAddGem() {
      G_chInfo.plusGem(G_chInfo.getCfgInt('TASK_GEM'));
      this.saveGemPlus(G_chInfo.getCfgInt('TASK_GEM'), this.taskNode);
   },
   // 保存增加钻石
   saveGemPlus(num = 0, node) {
      G_chSdk.dispatchEvent(
         G_Const.EventName.EN_ADD_MOVE,
         'gem',
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
         'coin',
         node,
         () => {
            this.saveGemPlus(num, node);
         }
      );
   }
});
