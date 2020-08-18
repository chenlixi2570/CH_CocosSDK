/*
 * @Author: Chen Li Xi
 * @Description: 
 */
let Cls_BasePopup = require("base_popup");

cc.Class({
   extends: Cls_BasePopup,

   properties: {
      coinLab: cc.Label,
      _coinCount: 0,
      _clickLock: false,
   },

   onLoad() {
      this.updateCoin();
      G_chSdk.registerBtnClick(this, 'Close', this.onSigleSave);
   },
   onShowFinished() {
      this._clickLock = false;
   },
   updateCoin() {
      this._coinCount = G_chInfo.getCfgByKey('BOX_COIN');
      if (this.coinLab) {
         this.coinLab.string = this._coinCount;
      }
   },
   onClose() {
      G_UIManager.hideUI('ttBoxCover');
   },
   // 选择新解锁的皮肤
   onSigleSave() {
      if (this._clickLock) return;
      this._clickLock = true;
      this.saveNum(1);
   },
   onDoubleSave() {
      if (this._clickLock) return;
      this._clickLock = true;
      G_UIManager.showUI('showToast', '恭喜获得三倍奖励!!');
      this.saveNum(2);
   },

   saveNum(n = 1) {
      this._coinCount > 0 && G_chInfo.plusCoin(this._coinCount * n);
      this.onClose();
   },
});
