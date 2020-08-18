// 显示oppo原生广告
let _naCount = 0;
cc.Class({
   extends: cc.Component,
   properties: {},
   onEnable() {
      let off = G_chInfo.getCfgByKey('count_switch') == '0';
      console.log('是否显示原生', off, _naCount, _naCount / 2 > 8, _naCount % 2 == 0);

      if (off && _naCount / 2 > 8) return;
      if (cc.sys.platform === cc.sys.OPPO_GAME && _naCount % 2 == 0) {
         console.log('显示原生了吗');
         G_Strategy.doAdvMgr('hideBanner');
         G_UIManager.showUI('nativeAdv', () => {
            G_Strategy.doAdvMgr('showBanner','oppo');
         });
      }
      _naCount += 1;
   },
   onDisable() {
      if (cc.sys.platform === cc.sys.OPPO_GAME) {
         G_Strategy.doAdvMgr('hideBanner');
      }
   }
});