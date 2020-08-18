/*
 * @Author: Chen Li Xi
 * @Description: 
 */
let Cls_BasePopup = require("base_popup");
cc.Class({
   extends: Cls_BasePopup,

   properties: {
   },

   onLoad() {
      G_chSdk.registerBtnClick(this, 'Close', this.onClose);
   },

   onClose() {
      G_UIManager.hideUI('setting');
   }
});
