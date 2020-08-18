/*
 * @Author: Chen Li Xi
 * @Description: 侧边广告
 */
let Cls_BasePopup = require("base_popup");

cc.Class({
   extends: Cls_BasePopup,

   properties: {},
   onLoad() {
      G_chSdk.registerBtnClick(this, 'close', this.closeCover);
   },
   onEnable() { },
   onShowFinished(btn) {
      if (btn instanceof cc.Node) {
         this.toggleBtn = btn;
         G_chSdk.hideThatNode(this.toggleBtn);
      }
   },
   closeCover() {
      G_UIManager.hideUI('sidebarAdv');
   },

});
