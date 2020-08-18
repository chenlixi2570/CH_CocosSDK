// author: http://lamyoung.com/

const DIG_RADIUS = 50;
const DIG_FRAGMENT = 12;
const DIG_OPTIMIZE_SIZE = 1;



const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {

   @property(cc.Graphics)
   graphics: cc.Graphics = null;

   @property(cc.Node)
   node_dirty: cc.Node = null;

   @property(cc.Node)
   node_ball: cc.Node = null;

   @property(cc.Node)
   node_qrCode: cc.Node = null;

   private _regions: number[][][] = [];

   onLoad() {
      cc.director.getPhysicsManager().enabled = true;
      // 开启物理步长的设置
      cc.director.getPhysicsManager().enabledAccumulator = true;

      // 物理步长，默认 FIXED_TIME_STEP 是 1/60
      cc.PhysicsManager.FIXED_TIME_STEP = 1 / 30;

      // 每次更新物理系统处理速度的迭代次数，默认为 10
      cc.PhysicsManager.VELOCITY_ITERATIONS = 8;

      // 每次更新物理系统处理位置的迭代次数，默认为 10
      cc.PhysicsManager.POSITION_ITERATIONS = 8;

      // for (let index = 0; index < 100; index++) {
      //     const c = this.node_dirty.addComponent(cc.PhysicsChainCollider);
      //     c.loop = true;
      //     c.enabled = false;
      // }

      this.graphics.node.on(cc.Node.EventType.TOUCH_START, this._touchMove, this);
      this.graphics.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMove, this);


   }

   start() {
      this.reset();
   }

   private _optimizePoint(point) {
      return [Math.floor(point[0] * DIG_OPTIMIZE_SIZE) / DIG_OPTIMIZE_SIZE, Math.floor(point[1] * DIG_OPTIMIZE_SIZE) / DIG_OPTIMIZE_SIZE];
   }

   private _optimizeRegions() {
      function lengthSqr(posi) {
         return posi.x * posi.x + posi.y * posi.y;
      }
      const regions = [];
      for (let index = 0; index < this._regions.length; index++) {
         const pos = this._regions[index];
         const newPos = [];
         pos.forEach((p, i) => {
            p = this._optimizePoint(p);
            const p_pre = this._optimizePoint(pos[(i - 1 + pos.length) % pos.length]);
            const p_next = this._optimizePoint(pos[(i + 1) % pos.length]);
            const vec1 = cc.v2(p[0] - p_pre[0], p[1] - p_pre[1]);
            const vec2 = cc.v2(p_next[0] - p[0], p_next[1] - p[1]);
            if (lengthSqr(vec1) != 0 && lengthSqr(vec2) != 0 && vec1.cross(vec2) != 0) {
               newPos.push(p);
            }
         })

         if (newPos.length > 2) {
            regions.push(newPos);
         }
      }
      this._regions = regions;
   }

   private _touchMove(touch: cc.Touch) {
      const regions = [[]];
      const pos = this.graphics.node.convertToNodeSpaceAR(touch.getLocation());
      // cc.log(touch.getDelta());
      const delta = touch.getDelta();
      function lengthSqr(posi) {
         return posi.x * posi.x + posi.y * posi.y;
      }
      const count = DIG_FRAGMENT;
      if (lengthSqr(delta) < 5) {
         for (let index = 0; index < count; index++) {
            const r = 2 * Math.PI * index / count;
            const x = pos.x + DIG_RADIUS * Math.cos(r);
            const y = pos.y + DIG_RADIUS * Math.sin(r);
            regions[0].push(this._optimizePoint([x, y]));
         }
      } else {
         const startPos = pos.sub(delta);
         for (let index = 0; index < count; index++) {
            const r = 2 * Math.PI * index / count;
            let vec_x = DIG_RADIUS * Math.cos(r);
            let vec_y = DIG_RADIUS * Math.sin(r);
            let x, y;
            if (delta.dot(cc.v2(vec_x, vec_y)) > 0) {
               x = pos.x + vec_x;
               y = pos.y + vec_y;
            } else {
               x = startPos.x + vec_x;
               y = startPos.y + vec_y;
            }
            regions[0].push(this._optimizePoint([x, y]));
         }

      }


      // const result = PolyBool.difference({
      //     regions: this._regions,
      //     inverted: false
      // }, {
      //     regions,
      //     inverted: false
      // });

      const seg1 = PolyBool.segments({
         regions: this._regions,
         inverted: false
      });
      const seg2 = PolyBool.segments({
         regions,
         inverted: false
      });
      const comb = PolyBool.combine(seg1, seg2);
      const result = PolyBool.polygon(PolyBool.selectDifference(comb));

      this._regions = result.regions;
      this._optimizeRegions();
      this.draw();

   }

   reset() {
      this._regions = [
         [[-375, -667], [-375, 500], [-50, 500], [-40, 450], [40, 450], [50, 500], [375, 500], [375, -667]]
      ];
      this.node_ball.setPosition(0, 500);
      this.draw();
   }

   draw() {
      const chains = this.node_dirty.getComponents(cc.PhysicsChainCollider);
      chains.forEach((c) => {
         c.enabled = false;
      })

      const enabled_chains_points: cc.Vec2[][] = [];

      for (let index = 0; index < this._regions.length; index++) {
         const pos = this._regions[index];
         let poly = chains[index];
         if (!poly) {
            poly = this.node_dirty.addComponent(cc.PhysicsChainCollider);
            poly.loop = true;
         }

         poly.points.length = 0;
         poly.points = pos.map((v, i) => {
            const v2 = cc.v2(v[0], v[1])
            return v2;
         });

         poly.enabled = true;
         poly['apply']();
         enabled_chains_points[index] = poly.points;

      }

      this.graphics.clear(true);
      const enabled_chains_points_sort = enabled_chains_points.map((curPoly, curPoly_i) => {
         const count = enabled_chains_points.reduce((pre, nextPoly, nextPoly_i) => {
            if ((curPoly_i != nextPoly_i)) {
               const length = curPoly.length;
               for (let i = 0; i < length; ++i) {
                  const p0 = curPoly[i];
                  if (!cc.Intersection.pointInPolygon(p0, nextPoly))
                     return pre;
               }
               return pre + 1;
            }
            return pre;
         }, 0);

         return { curPoly, count };
      }).sort((a, b) => {
         return a.count - b.count;
      })

      enabled_chains_points_sort.forEach(({ curPoly, count }) => {
         this.graphics.fillColor = count % 2 === 0 ? cc.Color.ORANGE : cc.Color.BLACK;
         this._drawPoly(this.graphics, curPoly);
         this.graphics.fill();
      })

      // window['_regions'] = this._regions;
   }

   private _drawPoly(ctx, poly) {
      poly.forEach((pos, i) => {
         if (i === 0)
            ctx.moveTo(pos.x, pos.y);
         else
            ctx.lineTo(pos.x, pos.y);
         ctx.close();
      });
   }


   private debug() {
      cc.debug.setDisplayStats(!cc.debug.isDisplayStats());
      cc.director.getPhysicsManager().debugDrawFlags = cc.debug.isDisplayStats() ? 1 : 0;
   }

   private showOrHideQrCode() {
      this.node_qrCode.active = !this.node_qrCode.active;
   }

}
// 欢迎关注微信公众号[白玉无冰]