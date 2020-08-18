// 结果页头条显示分享录屏，其他平台下一关按钮居中

cc.Class({
   extends: cc.Component,
   properties: {},
   onLoad() {
      if (G_Const.IssuePlat !== 'tt') {
         this.node.x = 0;
      }
   }
})