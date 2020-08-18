/**
 * 绘制物理区域
 */

let DrawCollider = cc.Class({
   extends: cc.Component,
   properties: {
      node_dirty: cc.Node, // 绘制物理区域的节点
   },
   onLoad() {
      if (!this.node_dirty) return;
      for (let index = 0; index < 20; index++) {
         const c = this.node_dirty.addComponent(cc.PhysicsChainCollider);
         c.loop = true;
         c.enabled = false;
         // c.friction = 0;
      }
   },
   drawPhysics(chains_points) {
      if (!Array.isArray(chains_points) || !this.node_dirty) return;
      // console.log('==绘制刚体数组数据', chains_points);

      const chains = this.node_dirty.getComponents(cc.PhysicsChainCollider);
      chains.forEach((c) => {
         c.enabled = false;
         c.friction = 0;
      });
      let len = chains_points.length;
      for (let index = 0; index < len; index++) {
         let poly = chains[index];
         if (!poly) {
            poly = this.node_dirty.addComponent(cc.PhysicsChainCollider);
            poly.loop = true;
         }
         poly.points.length = 0;
         poly.points = chains_points[index];
         poly.enabled = true;
      }
   }

});