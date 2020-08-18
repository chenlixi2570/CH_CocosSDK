/*
 * @Author: Chen Li Xi
 * @Description: 皮肤界面
 */
let Cls_BasePopup = require("base_popup");
cc.Class({
   extends: Cls_BasePopup,

   properties: {
   },

   onLoad() {
      G_chSdk.registerBtnClick(this, 'Close', this.onClose);
   },

   onEnable() {
   },
   onClose() {
      G_UIManager.hideUI('skin');
   },
   totalCb() {
      let total = G_chInfo.getLevelLength();
      return {
         total: 10,
         curr: 5
      };
   }
});
