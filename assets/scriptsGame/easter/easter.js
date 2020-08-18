/*
 * @Author: Chen Li Xi
 * @Description: 复活弹窗
 */
let Cls_BasePopup = require("base_popup");
cc.Class({
   extends: Cls_BasePopup,

   properties: {
   },

   onLoad() {
      G_chSdk.registerBtnClick(this, 'Close', this.onClose);
   },

   // onEnable() { },
   // onShowFinished() { },
   /**
    * 不复活关弹窗
    */
   onClose() {
      // console.log('暂不复活按钮点击');
      this.gameOver();
   },
   // 任务完成复活
   taskSucc() {
      // G_UIManager.hideUI('gameScene');
      // G_UIManager.showUI('gameScene');
      G_UIManager.hideUI('easter');
      G_chSdk.dispatchEvent(G_Const.EventName.GAME_AGAIN);
   },
   // 倒计时结束未复活
   timeoutFail() {
      console.log('时间到，没有选择复活');
      this.gameOver();
   },
   // 游戏失败
   gameOver() {
      G_UIManager.hideUI('easter');
      if (this.isShowConfirm()) {
         G_UIManager.showUI('easterConfirm');
      } else {
         console.log('派发复活失败事件');

         G_chSdk.dispatchEvent(G_Const.EventName.EASTER_FAIL);
      }
   },
   // 是否显示确认界面
   isShowConfirm() {
      return false;

      let gemCount = 0; // 当前关可得钻石数量

      if (this.cointCount <= 0 && this.starCount < 0 && gemCount <= 0) {
         return false;
      } else {
         return true;
      }
   }
});
