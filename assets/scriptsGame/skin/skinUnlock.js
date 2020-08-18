/*
 * @Author: Chen Li Xi
 * @Description: 
 */
let Cls_BasePopup = require("base_popup");

cc.Class({
   extends: Cls_BasePopup,

   properties: {
      skinAtlas: cc.SpriteAtlas,
      skinIcon: cc.Sprite,
      rNameSpr: cc.Sprite,
      _skinFrame: null,
      _rNameFrame: null, // 角色名字图片
   },

   onLoad() {
      G_chSdk.registerBtnClick(this, 'Close', this.onClose);
      G_chSdk.registerBtnClick(this, 'useBtn', this.onUseSkin);
   },
   onShowFinished(idx) {
      if (!Array.isArray(this._skinFrame)) {
         this._skinFrame = G_chSdk.get_frames(this.skinAtlas, 'role', true);
      }
      if (!Array.isArray(this._rNameFrame)) {
         this._rNameFrame = G_chSdk.get_frames(this.skinAtlas, 'rName', true);
      }
      let frame = this._skinFrame[idx];
      if (frame instanceof cc.SpriteFrame && this.skinIcon) {
         this.skinIcon.spriteFrame = frame;
      }
      let rFrame = this._rNameFrame[idx];
      if (rFrame instanceof cc.SpriteFrame && this.rNameSpr) {
         this.rNameSpr.spriteFrame = rFrame;
      }
   },
   onClose() {
      G_UIManager.hideUI('skinUnlock');
   },
   // 选择新解锁的皮肤
   onUseSkin() {
      this.onClose();
   },
});
