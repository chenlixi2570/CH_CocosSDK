cc.Class({
   extends: cc.Component,
   properties: {},
   onLoad() {
      G_chSdk.registerBtnClick(this, 'btnMore', this.onClick);
   },
   onClick() {
      if (G_Const.IssuePlat === 'wx') {
         G_UIManager.showUI('sidebarAdv');
      }
      else if (G_Const.IssuePlat === 'qq') {
         G_Strategy.doAdvMgr('showBoxAd');
      }
   }
})