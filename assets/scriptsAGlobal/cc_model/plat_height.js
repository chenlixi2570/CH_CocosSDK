// 根据不同平台使用不同的y轴设置

cc.Class({
   extends: cc.Component,

   properties: {
      wx: 0,
      oppo: 0,
      vivo: 0,
      tt: 0,
      qq: 0
   },
   onLoad() {
      // console.log('--height_plat: ', this.node.name);

      if (G_Const.IssuePlat === 'pc') {
         return;
      }
      let h = +this[G_Const.IssuePlat];
      if (Number.isNaN(h)) return;
      this.node.y += h;
   }
});