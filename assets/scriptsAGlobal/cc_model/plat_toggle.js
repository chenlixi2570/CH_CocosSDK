/**
 * 切换显示，解决某个平台显示某个平台不显示
 */

cc.Class({
   extends: cc.Component,

   properties: {
      wx: true,
      oppo: true,
      vivo: true,
      tt: true,
      qq: true,
   },
   onLoad() {
      // console.log('==多平台显示切换节点: ', this.node.name);
      let platStr = G_Const.IssuePlat;
      this.node.active = this[platStr];
   }
});