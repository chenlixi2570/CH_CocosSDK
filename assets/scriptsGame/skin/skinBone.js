cc.Class({
   extends: cc.Component,
   properties: {
      bones: {
         default: [],
         type: cc.Node,
      }
   },
   onLoad() {
      this.listenerEv();
   },
   selectSkin(skinId) {
      this.bones.forEach((item, i) => {
         if (skinId == i) {
            G_chSdk.showThatNode(item);
         }
         else {
            G_chSdk.hideThatNode(item);
         }
      });
   },
   listenerEv() {
      G_chSdk.addEventListener(
         'click_skin_select',
         this.selectSkin,
         this
      );
   },
   onDestroy() {
      G_chSdk.removeEventListener(
         'click_skin_select',
         this.selectSkin,
         this
      );
   },
})