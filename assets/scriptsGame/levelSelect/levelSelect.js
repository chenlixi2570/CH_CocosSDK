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
      // init UI
      G_chSdk.registerBtnClick(this, 'close', this.onClose);
   },

   onEnable() {
      console.log("选择关卡页加载成功");
   },
   onClose() {
      G_UIManager.hideUI('levelSelect');
   },
   setListData() {
      let total = G_chInfo.getLevelLength();
      return {
         total: Math.ceil(total / 12),
         curr: 0
      };
   },
});
