/*
 * @Author: Chen Li Xi
 * @Description: 
 */
cc.Class({
   extends: cc.Component,

   properties: {
      cPropress: cc.ProgressBar,
      propLabel: cc.Label,
      _propScale: 0, // 进度条值
   },

   onLoad() {
      this.updatePropress();
   },
   update(dt) {
      if (this.stopProgress) return;
      this.moveProgress(dt);
   },
   updatePropress() {
      this.cPropress.progress = this._propScale;
      this.propLabel.string = (this._propScale * 100).toFixed(0) + '%'; // '加载' +
   },
   // 进度条动画
   moveProgress(dt) {
      let scale = G_GameFlow.getLoadScale();
      if (scale > this._propScale) {
         this._propScale += 0.04;
         this._propScale = this._propScale > 1 ? 1 : this._propScale;
         this.updatePropress();
      } else if (G_GameFlow.isLoadSuccess()) {
         this.stopProgress = true;
         // 游戏首页
         this.scheduleOnce(() => {
            G_UIManager.showUI('indexPage');
            // G_UIManager.showUI('gameScene');
            // G_UIManager.showUI("testSetLevel");
            this.node.active = false;
         }, 0.2);
      }
   },
});
