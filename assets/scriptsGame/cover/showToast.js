/*
 * @Author: Chen Li Xi
 * @Description: 
 */
let Cls_BasePopup = require("base_popup");
cc.Class({
   extends: Cls_BasePopup,

   properties: {
      cLabel: cc.Label,
      nRoot: cc.Node,
      nMask: cc.Node,
   },

   onShowFinished(tip, isMask = true) {
      if (this.nMask instanceof cc.Node) {
         this.nMask.active = isMask;
      }
      if (typeof tip === 'string' && this.cLabel) {
         let len = tip.length;
         if (len <= 18) {
            this.nRoot.width = tip.length * 30 + 40;
            this.nRoot.height = 60;
         }
         else {
            this.nRoot.width = 18 * 30 + 40;
            this.nRoot.height = Math.ceil(len / 18) * 46 + 14;
         }
         this.cLabel.string = tip;
      }
      this.scheduleOnce(() => {
         this.onClose();
      }, 1.2);
   },
   onClose() {
      G_UIManager.hideUI('showToast');
   }
});
