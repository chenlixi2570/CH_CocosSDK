let _skinFrame = null;
cc.Class({
   extends: cc.Component,
   properties: {
      skinAtlas: cc.SpriteAtlas,
      skinIcon: cc.Sprite,
      itemBg: cc.Node,
      nLock: cc.Node,
      nCurr: cc.Node,
   },
   // 早于 onEnable 执行
   _init(idx) {
      if (!Array.isArray(_skinFrame)) {
         _skinFrame = G_chSdk.get_frames(this.skinAtlas, 'role', true);
      }
      this.skin_idx = idx;
      let frame = _skinFrame[idx];
      if (frame instanceof cc.SpriteFrame && this.skinIcon) {
         this.skinIcon.spriteFrame = frame;
      }
   },
   onLoad() {
      G_chSdk.registerBtnClick(this, 'skinItem', this.onClick);
      G_chSdk.addEventListener(
         'click_skin_select',
         this.runClick,
         this
      );
      G_chSdk.addEventListener(
         'update_curr_use_skin',
         this.updateInfo,
         this
      );
   },
   onDestroy() {
      G_chSdk.removeEventListener(
         'click_skin_select',
         this.runClick,
         this
      );
      G_chSdk.removeEventListener(
         'update_curr_use_skin',
         this.updateInfo,
         this
      );
   },
   onEnable() {
      this.updateInfo();
   },
   updateInfo() {
      this.updateLock(); // 更新是否已解锁
      this.updateCurr(); // 更新当前正在使用的皮肤显示
   },
   updateLock() {
      let isUnlock = G_chInfo.includeSkin(this.skin_idx);
      if (isUnlock) {
         // 已解锁
         G_chSdk.hideThatNode(this.nLock);
      } else {
         // 未解锁
         G_chSdk.showThatNode(this.nLock);
      }
   },
   updateCurr() {
      let currUse = G_chInfo.getCurrSkin();
      if (currUse === this.skin_idx) {
         G_chSdk.showThatNode(this.nCurr);
         if (this.itemBg) {
            this.itemBg.color = new cc.Color(176, 237, 255);
         }
      } else {
         G_chSdk.hideThatNode(this.nCurr);
         if (this.itemBg) {
            this.itemBg.color = new cc.Color(138, 188, 208);
         }
      }
   },

   // 玩家点击皮肤选择
   onClick() {
      G_chSdk.dispatchEvent('click_skin_select', this.skin_idx);
   },
   // 响应玩家点击UI
   runClick(skin_idx) {
      if (skin_idx === this.skin_idx) {
         G_chSdk.showThatNode(this.nCurr);
      } else {
         G_chSdk.hideThatNode(this.nCurr);
      }

   }

});