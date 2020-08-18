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
      _trySkinId: -1,
      _taskSucc: false,
   },
   onLoad() {
      G_chSdk.registerBtnClick(this, 'Close', this.onClose);
      // G_chSdk.registerBtnClick(this, 'useBtn', this.onUseSkin);
   },

   onShowFinished() {
      this._trySkinId = -1;
      this._taskSucc = false;
      this.getLockSkinData();
   },
   onClose() {
      let skinId = this._taskSucc ? this._trySkinId : -1;
      G_UIManager.hideUI('skinTry', skinId);
   },
   getLockSkinData() {
      let lockSkinIds = G_chInfo.getLockSkin();
      // console.log('未解锁皮肤', lockSkinIds);

      let idx = G_chInfo.getCurrSkin();
      if (lockSkinIds.length === 0) {
         // 已全部解锁
         this.onClose();
         return;
      } else if (lockSkinIds.length === 1) {
         idx = lockSkinIds[0];
      } else {
         lockSkinIds.splice(lockSkinIds.indexOf(4), 1);
         let i = G_chSdk.randomInt(0, lockSkinIds.length - 1);
         idx = lockSkinIds[i];
      }
      this.updateFrame(idx);
   },
   // 广告任务完成使用试用的皮肤
   onUseSkin() {
      this._taskSucc = true;
      this.onClose(this._trySkinId);
   },
   updateFrame(idx) {
      if (!Number.isInteger(+idx)) return;
      this._trySkinId = +idx;
      if (!Array.isArray(this._skinFrame)) {
         this._skinFrame = G_chSdk.get_frames(this.skinAtlas, 'role', true);
      }
      if (!Array.isArray(this._rNameFrame)) {
         this._rNameFrame = G_chSdk.get_frames(this.skinAtlas, 'rName', true);
      }
      let frame = this._skinFrame[this._trySkinId];
      if (frame instanceof cc.SpriteFrame && this.skinIcon) {
         this.skinIcon.spriteFrame = frame;
      }
      let rFrame = this._rNameFrame[this._trySkinId];
      if (rFrame instanceof cc.SpriteFrame && this.rNameSpr) {
         this.rNameSpr.spriteFrame = rFrame;
      }
   }
});
