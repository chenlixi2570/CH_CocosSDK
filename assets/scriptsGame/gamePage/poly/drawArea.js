/**
 * 绘制固定墙体、阴影、物理组件
 */

let polyboolMgr = require('polyboolMgr');
let DrawRegUI = require('drawRegionsUI');
let DrawCollider = require('drawCollider');

cc.Class({
   extends: cc.Component,
   properties: {
      cDwCollider: { // 物理节点
         default: null,
         type: DrawCollider
      },
      cInMask: {
         default: null,
         type: DrawRegUI
      },
      nWall: cc.Node,
   },
   start() {
      this.draw();
      this.drawWalls();
   },
   draw() {
      let points = polyboolMgr.getFixedPoints();
      if (!points) return;
      const enabled_chains_points = points.chainPoints;
      const enabled_chains_points_sort = points.uiPoints;
      this.cDwCollider && this.cDwCollider.drawPhysics(enabled_chains_points);
      this.cInMask && this.cInMask.drawMask(enabled_chains_points_sort, 1);
   },
   drawWalls() {
      let wallsData = polyboolMgr.getWallsData();
      Array.isArray(wallsData) && wallsData.forEach((item, i) => {
         if (G_chSdk.isObject(item) && this.nWall instanceof cc.Node) {
            let sz = G_chSdk.getNodePtORSz(item.sz);
            let pt = G_chSdk.getNodePtORSz(item.pt);
            let node = this.nWall;
            if (i > 0) {
               node = cc.instantiate(this.nWall);
               node.parent = this.nWall.parent;
            }

            node.setPosition(pt[0], pt[1]);
            node.setContentSize(sz[0], sz[1]);
            node.rotation = item.rt;
         }
      });
   }

});