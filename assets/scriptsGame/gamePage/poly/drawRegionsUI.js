/**
 * 绘制多边形区域
 */

let DrawRegUI = cc.Class({
   extends: cc.Component,
   properties: {
      graphics: cc.Graphics,
      cMask: cc.Mask
   },
   /**
    * 将数组所有给定的区域都绘制出来
    * 不同区域用不同的颜色标示
    * @param {array} uiPoints 
    */
   drawUI(uiPoints) {
      if (!this.graphics) return;
      this.graphics.clear();
      uiPoints.forEach(({ curPoly, count }) => {
         this.graphics.fillColor = count % 2 === 0 ? cc.Color.ORANGE : cc.Color.RED;
         this._drawPoly(this.graphics, curPoly);
         this.graphics.fill();
      });
   },
   /**
    * 
    * @param {} ctx 
    * @param {array} poly 区域顶点数组
    * @param {number} offset 绘制区域偏移量
    */
   _drawPoly(ctx, poly, offset = 0) {
      poly.forEach((pos, i) => {
         if (i === 0)
            ctx.moveTo(pos.x + offset, pos.y - offset);
         else
            ctx.lineTo(pos.x + offset, pos.y - offset);
      });
      ctx.close();
   },
   /**
    * 绘制 Graphics 组件
    * @param {number} n 0 绘制包围大区域 1 绘制大区域中的挖空区域 2 绘制所有区域
    */
   drawGraphics(uiPoints, n = 0, offset = 0) {
      if (!this.graphics) return;
      this.graphics.clear();
      uiPoints.forEach(({ curPoly, count }) => {
         this.graphics.fillColor = cc.Color.BLACK;
         if (count % 2 === n || n == 2) {
            this._drawPoly(this.graphics, curPoly, offset);
            this.graphics.fill();
         }
      });
   },
   /**
    * 绘制 Mask 组件
    * @param {array} uiPoints 
    * @param {number} n 0 绘制包围大区域 1 绘制大区域中的挖空区域 2 绘制所有区域
    */
   drawMask(uiPoints, n = 0, offset = 0) {
      if (!this.cMask || !this.cMask._graphics) return;

      this.cMask._graphics.clear();
      this.cMask._graphics.lineWidth = 1;
      this.cMask._graphics.strokeColor = cc.color(255, 0, 0);
      this.cMask._graphics.fillColor = cc.color(0, 255, 0);
      uiPoints.forEach(({ curPoly, count }) => {
         if (count % 2 === n || n == 2) {
            this._drawPoly(this.cMask._graphics, curPoly);
            this.cMask._graphics.fill();
            this.cMask._graphics.stroke();
         }
      });
   },

});