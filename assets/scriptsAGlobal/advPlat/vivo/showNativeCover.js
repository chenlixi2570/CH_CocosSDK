// 显示oppo原生广告
cc.Class({
   extends: cc.Component,
   properties: {},
   onEnable() {
      if (G_chInfo.isShowAdvOfVIVO()) {
         return;
      } else if (cc.sys.platform === cc.sys.VIVO_GAME) {
         G_UIManager.showUI('nativeAdv_vv');
      }
   },
   onDisable() {
      // if (cc.sys.platform === cc.sys.VIVO_GAME) {
      //    G_Strategy.doAdvMgr('hideBanner');
      // }
   }
});