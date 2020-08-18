/*
 * @Author: Chen Li Xi
 * @Description: 
 */
let Cls_BasePopup = require("base_popup");
cc.Class({
   extends: Cls_BasePopup,

   properties: {
      taskNum: cc.Label, // 看视频可以得到的钻石数
      taskNode: cc.Node, // 视频按钮节点
   },

   onLoad() {
      G_chSdk.registerBtnClick(this, 'Close', this.onClose);
      // 购买一次钻石消耗的金币总数
      this.updateNum();
   },
   updateNum() {
      if (this.taskNum) {
         this.taskNum.string = '+' + G_chInfo.getCfgInt('TASK_GEM');
      }
   },
   onClose() {
      G_UIManager.hideUI('gainCoin');
   },
   // 推广任务完成得钻石
   taskAddGem() {
      this.saveGemPlus(G_chInfo.getCfgInt('TASK_GEM'), this.taskNode);
   },
   // 保存增加钻石
   saveGemPlus(num = 0, node) {
      num = num >= 9 ? 9 : num;
      G_chSdk.dispatchEvent(
         G_Const.EventName.EN_ADD_MOVE,
         'gem',
         node,
         () => {
            G_chInfo.plusGem(num);
         }
      );
   },
});
