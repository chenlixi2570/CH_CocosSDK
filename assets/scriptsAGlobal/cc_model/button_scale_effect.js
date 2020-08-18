/*
* 按钮点击效果
* 
*/
cc.Class({
   extends: cc.Component,

   properties: {
      disableIfUninteractable: true,
      downScale: new cc.v2(0.9, 0.9),
      upScale: new cc.v2(1.0, 1.0),
   },

   editor: CC_EDITOR && {
      requireComponent: cc.Button,
   },

   onLoad() {
      // body...
      var scaleX = this.node.scaleX;
      var scaleY = this.node.scaleY;
      this.downScale = new cc.v2(scaleX - 0.1, scaleY - 0.1);
      this.upScale = new cc.v2(scaleX, scaleY);
   },

   start() {
      // body...
      this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
         if (!this._checkEnable()) {
            this.node.setScale(this.upScale);
            return;
         }

         this.node.setScale(this.downScale);
      }, this);

      this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
         if (!this._checkEnable()) {
            this.node.setScale(this.upScale);
            return;
         }

         this.node.setScale(this.upScale);
      }, this);

      this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
         if (!this._checkEnable()) {
            this.node.setScale(this.upScale);
            return;
         }

         this.node.setScale(this.upScale);
      }, this);
   },

   _checkEnable() {
      if (this.disableIfUninteractable && !this.node.getComponent(cc.Button).interactable) {
         return false;
      }

      return true;
   }
});
