cc.Class({
   extends: cc.Component,

   properties: {},
   editor: CC_EDITOR && {
      requireComponent: cc.Label,
   },
   onLoad() {
      this.numLabel = this.node.getComponent(cc.Label);
      this.updateNumRun();
      this.listernerEvent();
   },
   listernerEvent() {
      this.updateNum = function () {
         this.updateNumRun();
      }.bind(this);
      G_chSdk.addEventListener(
         G_Const.EventName.CH_PHYS_CHANGED,
         this.updateNum
      );
   },
   updateNumRun() {
      
      let physCount = G_chInfo.getPhysical() + "/" + G_chInfo.getCfgInt('PHYS_LIMIT');
      if (this.numLabel instanceof cc.Label) {
         this.numLabel.string = physCount;
      }
   },
   onDestroy() {
      G_chSdk.removeEventListener(
         G_Const.EventName.CH_PHYS_CHANGED,
         this.updateNum
      );
   }
});
