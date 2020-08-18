// 在不同长度的手机上以同一比例调整y轴的值

cc.Class({
   extends: cc.Component,
   properties: {},
   onLoad() {
      this.convertY();
   },
   // 变换Y轴坐标
   convertY() {
      let winSize = G_chSdk.getPxSize();
      let oldScale = 750 / 1334;
      let curScale = winSize.width / winSize.height;
      let scale = oldScale / curScale;
      let y = this.node.y * scale;
      // console.log('y轴缩放', oldScale, curScale);

      this.node.y = y;
   }
});