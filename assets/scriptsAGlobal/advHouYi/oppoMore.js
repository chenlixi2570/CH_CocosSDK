// oppo 平台的左侧更多游戏

cc.Class({
   extends: cc.Component,
   properties: {
      nList: cc.Node,
      _openStatu: false, // 广告列表显示状态，false 在右则隐藏
   },
   onLoad() {
      G_chSdk.registerBtnClick(this, 'oppoMoreBtn', this.openList);
      G_chSdk.registerBtnClick(this, 'oppoCloseBtn', this.closeList);
   },
   openList() {
      if (!this._openStatu && this.nList instanceof cc.Node) {
         this._openStatu = true;
         this.nList.stopAllActions();
         this.nList.runAction(
            cc.moveBy(0.5, 180, 0).easing(cc.easeInOut(3.0))
         );
      }
   },
   closeList() {
      if (this._openStatu && this.nList instanceof cc.Node) {
         this._openStatu = false;
         this.nList.stopAllActions();
         this.nList.runAction(
            cc.moveBy(0.5, -180, 0).easing(cc.easeInOut(3.0))
         );
      }
   }
})