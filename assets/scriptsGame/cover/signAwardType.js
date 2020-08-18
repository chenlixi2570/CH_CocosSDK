let _skinFrame = null;
cc.Class({
   extends: cc.Component,
   properties: {
      nPar: cc.Node,
      gemFrame: cc.SpriteFrame,
      physFrame: cc.SpriteFrame,
      coinFrame: cc.SpriteFrame,
      skinAtlas: cc.SpriteAtlas,
   },
   onLoad() {
      if (!Array.isArray(_skinFrame)) {
         _skinFrame = G_chSdk.get_frames(this.skinAtlas, 'role', true);
      }
      let sprite = this.node.getComponent(cc.Sprite);
      if (!sprite || this.nPar.sign_type == undefined) return;
      if (this.nPar.sign_type == 0) {
         // 钻石
         sprite.spriteFrame = this.gemFrame;
      } else if (this.nPar.sign_type == 1) {
         // 体力
         sprite.spriteFrame = this.physFrame;
      } else if (this.nPar.sign_type == 3) {
         // 金币
         sprite.spriteFrame = this.coinFrame;
      }
   },
   // 皮肤要及时更新
   onEnable() {
      let sprite = this.node.getComponent(cc.Sprite);
      if (this.nPar.sign_type == 4) {
         let str = G_chSdk.checkString(this.nPar.sign_count) ? this.nPar.sign_count : '';
         if (str.indexOf(',') !== -1) {
            let arr = str.split(',');
            let isUnlock = G_chInfo.includeSkin(+arr[0]);
            if (isUnlock) {
               sprite.spriteFrame = this.coinFrame;
               sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
               let rect = this.coinFrame.getRect();
               sprite.node.setContentSize(rect.width, rect.height);
            } else {
               let frame = _skinFrame[arr[0]];
               if (frame instanceof cc.SpriteFrame) {
                  sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                  let rect = frame.getRect();
                  sprite.node.setContentSize(rect.width * .6, rect.height * .6);
                  sprite.spriteFrame = frame;
               }
            }
         }
      }
   }
});