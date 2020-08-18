// 使用盒子广告 更多好玩按钮

cc.Class({
   extends: cc.Component,
   properties: {},
   onLoad() {
      if (G_Const.IssuePlat === 'qq') {
         G_chSdk.registerBtnClick(this, 'qqBoxAdv', this.onClickBtn);
      }
      else {
         G_chSdk.hideThatNode(this.node);
      }
   },
   onClickBtn() {
      G_Strategy.doAdvMgr('showBoxAd');
   }

});