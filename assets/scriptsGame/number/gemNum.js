cc.Class({
   extends: cc.Component,
   properties: {

   },
   editor: CC_EDITOR && {
      requireComponent: cc.Label,
   },
   onLoad() {
      this.numLabel = this.node.getComponent(cc.Label);
      this.gemChangeRun();
      this.listernerEvent();
   },
   onDestroy() {
      G_chSdk.removeEventListener(G_Const.EventName.EN_GEM_CHANGE, this.gemChange);
   },
   listernerEvent() {
      this.gemChange = function () {
         this.gemChangeRun();
      }.bind(this);
      G_chSdk.addEventListener(G_Const.EventName.EN_GEM_CHANGE, this.gemChange);
   },
   // 钻石值改变时执行
   gemChangeRun() {
      let gemCount = G_chInfo.getGem();
      if (this.numLabel instanceof cc.Label) {
         this.numLabel.string = gemCount;
      }
   }
});