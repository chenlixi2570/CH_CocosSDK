/*
 * @Author: Chen Li Xi
 * @Description: 
 */
cc.Class({
   extends: cc.Component,
   
   properties: {
   },
   
   onLoad() {
      G_chSdk.registerBtnClick(this, this.node.name, this.onAddPhysical);
   },
   onAddPhysical(ev) {
      // return;
      G_UIManager.showUI('gainGem');
   },
});
