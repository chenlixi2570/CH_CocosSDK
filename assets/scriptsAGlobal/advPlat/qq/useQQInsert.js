// 使用qq插屏广告
cc.Class({
   extends: cc.Component,
   properties: {
      firstIsShow: false,
      _isFirst: true,
   },
   onLoad() {
      this.onOff = G_chInfo.isClickMistakeEnabled();
   },
   onEnable() {
      if (G_Const.IssuePlat === 'qq') {
         // this.showInsert();
         this.showBox();
         return;
      }
   },
   /**
    * 第一次根据设置显示插屏广告，
    */
   showInsert() {
      if (this.firstIsShow) {
         // 第一次显示则直接显示
         this.showBox();
      }
      else {
         console.log('--准备显示插屏广告', this._isFirst);

         if (this._isFirst) {
            this._isFirst = false;
         }
         else {
            this.showBox();
         }
      }
   },
   showAdv() {
      G_Strategy.doAdvMgr('createIns');
   },
   showBox() {
      console.log('==首页显示盒子广告', this.onOff);

      if (this.onOff) {
         G_Strategy.doAdvMgr('showBoxAd');
      }
   }
});