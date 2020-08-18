cc.Class({
   extends: cc.Component,
   properties: {

   },
   onEnable() {
      if (
         G_Const.IssuePlat === 'qq'
         || G_Const.IssuePlat === 'vivo'
         || G_Const.IssuePlat === 'oppo'
      ) {
         G_Strategy.doAdvMgr('showBanner', 'qq,vivo,oppo,tt');
      }
   },
   onDisable() {

   }
})