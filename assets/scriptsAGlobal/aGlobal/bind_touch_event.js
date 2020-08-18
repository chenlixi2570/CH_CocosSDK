/**
 * 游戏场景控制
 */
cc.Class({
   extends: cc.Component,
   properties: {
      touchNode: cc.Node,
   },
   onLoad() {
      this.listenerEv();
   },
   onDestroy() {
      this.removeEv();
   },
   listenerEv() {
      if (this.touchNode) {
         console.log(111111111);
         this.touchNode.on(cc.Node.EventType.TOUCH_START, this._touchStart, this);
         this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, this._touchMove, this);
         this.touchNode.on(cc.Node.EventType.TOUCH_END, this._touchEnd, this);
         this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEnd, this);
      }
   },
   removeEv() {
      if (this.touchNode) {
         this.touchNode.off(cc.Node.EventType.TOUCH_START, this._touchStart, this);
         this.touchNode.off(cc.Node.EventType.TOUCH_MOVE, this._touchMove, this);
         this.touchNode.off(cc.Node.EventType.TOUCH_END, this._touchEnd, this);
         this.touchNode.off(cc.Node.EventType.TOUCH_CANCEL, this._touchEnd, this);
      }
   },

   _touchStart(event) {
      G_chSdk.dispatchEvent(G_Const.EventName.CH_TOUCHSTART, event);
   },
   _touchEnd(event) {
      G_chSdk.dispatchEvent(G_Const.EventName.CH_TOUCHEND, event);
   },
   _touchMove(event) {
      this.testTouchMove(event);
      G_chSdk.dispatchEvent(G_Const.EventName.CH_TOUCHMOVE, event);
   },
   testTouchMove(event) {
      return
      let world = event.getLocation();
      G_GameMove.dotMove({
         position: world,
         color: cc.Color.RED
      });
   }
});