
cc.Class({
   extends: cc.Component,
   properties: {
      cRigid: cc.RigidBody,
   },
   onLoad() {
      G_chSdk.registerBtnClick(this, 'btn1', this.onJump);
      G_chSdk.registerBtnClick(this, 'btn2', this.onGo);
      G_chSdk.registerBtnClick(this, 'btn3', this.onReset);
      G_chSdk.registerBtnClick(this, 'btn4', this.onrayCast);
   },
   onJump() {
      G_chSdk.dispatchEvent('test_btn1');
   },
   onGo() {
      G_chSdk.dispatchEvent('test_btn2');

   },
   onReset() {
      G_chSdk.dispatchEvent('test_btn3');

   },
   onrayCast() {
      G_chSdk.dispatchEvent('test_btn4');

   }
});