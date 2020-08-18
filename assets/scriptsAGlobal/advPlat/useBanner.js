/*
 * @Author: Chen Li Xi
 * @Description: 使用各平台的banner
 */
let _BanType = cc.Enum({
   normal: 0,
   moveUp: 1,
   fastClick: 2,
   none: 5,
});
let _PlatType = cc.Class({
   name: '_PlatType',
   properties: {
      oppo: {
         default: _BanType.normal,
         type: _BanType,
         tooltip: 'normal 正常显示在下边居中，moveUp 上移，fastClick 快速点击',
      },
      wx: {
         default: _BanType.normal,
         type: _BanType,
         tooltip: 'normal 正常显示在下边居中，moveUp 上移，fastClick 快速点击',
      },
      qq: {
         default: _BanType.none,
         type: _BanType,
         tooltip: 'normal 正常显示在下边居中，moveUp 上移，fastClick 快速点击',
      },
      tt: {
         default: _BanType.none,
         type: _BanType,
         tooltip: 'normal 正常显示在下边居中，moveUp 上移，fastClick 快速点击',
      },
      vivo: {
         default: _BanType.none,
         type: _BanType,
         tooltip: 'normal 正常显示在下边居中，moveUp 上移，fastClick 快速点击',
      },
   }
});

cc.Class({
   extends: cc.Component,

   properties: {
      banType: {
         type: _PlatType,
         default: [],
      },
      moveBtn: [cc.Node]
   },
   onLoad() {
      if (!this.banType[0]) return;
      this.platType = this.banType[0][G_Const.IssuePlat];
      // console.log(`--${this.node.name} 使用了useBanner组件`);
   },
   onEnable() {
      if (typeof this.platType !== 'number') return;
      switch (this.platType) {
         case _BanType.normal:
            G_Strategy.doAdvMgr('showBanner', () => {
               // console.log('==banner显示成功');
            }, () => {
               // console.log('==banner显示失败');
            });
            break;
         case _BanType.moveUp:
            G_Strategy.doAdvMgr('showMoveUpBanner', this.moveBtn);
            break;
         case _BanType.fastClick:
            // console.log('==快速点击在页面实现');
            break;
      }
   },
   onDisable() {
      // vivo 不关banner广告
      if (
         this.platType !== _BanType.none
         && cc.sys.platform !== cc.sys.VIVO_GAME
      ) {
         G_Strategy.doAdvMgr('hideBanner');
      }
   },

});
