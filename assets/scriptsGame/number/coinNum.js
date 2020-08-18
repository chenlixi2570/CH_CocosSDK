cc.Class({
   extends: cc.Component,
   properties: {

   },
   editor: CC_EDITOR && {
      requireComponent: cc.Label,
   },
   onLoad() {
      this.numLabel = this.node.getComponent(cc.Label);
      this.cointChange();
      this.listernerEvent();
   },
   onDestroy() {
      G_chSdk.removeEventListener(G_Const.EventName.CH_COIN_CHANGED, this.cointChange, this);
   },
   listernerEvent() {
      G_chSdk.addEventListener(G_Const.EventName.CH_COIN_CHANGED, this.cointChange, this);
   },
   cointChange() {
      let coinCount = G_chInfo.getCoin();
      if (this.numLabel instanceof cc.Label) {
         this.numLabel.string = coinCount;
      }
   }
});