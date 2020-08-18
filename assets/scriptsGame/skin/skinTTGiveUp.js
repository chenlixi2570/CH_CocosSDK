// 条头分享送东西同步图片
let SkinTTGiveUp = cc.Class({
   extends: cc.Component,
   properties: {
      skinFrame: cc.SpriteFrame,
      coinFrame: cc.SpriteFrame,
      sprite: cc.Sprite,
      coinLab: cc.Label,
      _isSkin: true,
      _skinId: -1
   },
   onEnable() {
      this.updateInfo();
   },
   updateInfo() {
      if (
         !this.skinFrame ||
         !this.coinFrame ||
         !this.sprite
      ) return;

      let allSkin = G_chInfo.getAllSkinLen();
      this._skinId = -1;
      for (let i = 0; i < allSkin; i++) {
         let skinData = G_chInfo.getSkinDataByIndex(i);

         if (skinData && skinData.onlyGive == 1) {
            this._skinId = i;
            break;
         }
      }

      this._isSkin = this._skinId !== -1 && !G_chInfo.includeSkin(this._skinId);
      if (this._isSkin) {
         this.sprite.spriteFrame = this.skinFrame;

         this.coinLab && G_chSdk.hideThatNode(this.coinLab.node);
      }
      else {
         this.sprite.spriteFrame = this.coinFrame;
         this.coinLab && G_chSdk.showThatNode(this.coinLab.node);
         let coinCount = +G_chInfo.getCfgByKey('SHARE_COIN');
         if (G_chSdk.isNumber(coinCount) && this.coinLab) {
            this.coinLab.string = coinCount;
         }
      }
   }
});