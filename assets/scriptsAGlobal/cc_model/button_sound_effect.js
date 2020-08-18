/**
 * 按钮点击音效
 */
cc.Class({
   extends: cc.Component,

   properties: {
      disableIfUninteractable: true,
      clickAudio: {
         default: null,
         type: cc.AudioClip
      }
   },

   editor: CC_EDITOR && {
      requireComponent: cc.Button,
   },

   onLoad() {
      // body...
      this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
         // body...
         this.onClick();
      }, this);
   },

   onClick() {
      // body...
      if (!this._checkEnable()) {
         return;
      }

      if (this.clickAudio) {
         G_chSdk.playEffect(this.clickAudio);
      }
      else {
         console.log('the clip of button is null...');
      }
   },

   _checkEnable() {
      if (this.disableIfUninteractable && !this.node.getComponent(cc.Button).interactable) {
         return false;
      }

      return true;
   }
});
