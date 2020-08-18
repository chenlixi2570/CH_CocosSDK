cc.Class({
   extends: cc.Component,

   properties: {},
   editor: CC_EDITOR && {
      requireComponent: cc.Label,
   },
   onLoad() {
      this.numLabel = this.node.getComponent(cc.Label);
      this.updateNum();
   },
   updateNum() {
      let physCount = G_chInfo.getCfgInt('PHYS_LEVEL');
      if (this.numLabel instanceof cc.Label) {
         this.numLabel.string = physCount;
      }
   },
});
