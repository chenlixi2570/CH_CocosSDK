cc.Class({
   extends: cc.Component,
   properties: {

   },
   onEnable() {
      if (G_Const.IssuePlat === 'qq') {
      }
   },
   onDisable() {
      if (G_Const.IssuePlat === 'qq') {
         G_Strategy.doAdvMgr('hideBanner');
      }
   }

})