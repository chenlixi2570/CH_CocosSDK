let TestArea = cc.Class({
   extends: cc.Component,
   properties: {
      ctx: cc.Graphics,
   },
   onLoad() {
      G_chSdk.addEventListener(
         'test_btn4',
         () => {
            this.ctx && this.ctx.clear();
         }
      );
   },
   clearArea() {
      this.ctx && this.ctx.clear();
   },
   drawCricleByWorld(worldPos) {
      if (!(worldPos instanceof cc.Vec2)) return;
      let point = this.node.convertToNodeSpaceAR(worldPos);
      this.ctx.circle(point.x, point.y, 5);
      this.ctx.fill();
   },
   drawCricleByNodeSpace(nodePos) {
      if (!(nodePos instanceof cc.Vec2)) return;
      this.ctx.circle(nodePos.x, nodePos.y, 5);
      this.ctx.fill();
   },
   drawLineByNodeSpace(start, end) {
      this.ctx.circle(start.x, start.y, 10);
      this.ctx.circle(end.x, end.y, 10);
      this.ctx.fill();

      this.ctx.moveTo(start.x, start.y);
      this.ctx.lineTo(end.x, end.y);
      this.ctx.stroke();
   },
   drawLineByWorld(start, end) {
      start = this.node.convertToNodeSpaceAR(start);
      end = this.node.convertToNodeSpaceAR(end);
      this.ctx.circle(start.x, start.y, 10);
      this.ctx.circle(end.x, end.y, 10);
      this.ctx.fill();

      this.ctx.moveTo(start.x, start.y);
      this.ctx.lineTo(end.x, end.y);
      this.ctx.stroke();
   }
})