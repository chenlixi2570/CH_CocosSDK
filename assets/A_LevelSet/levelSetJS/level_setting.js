// 设置场景时设置数据

let RunLevelSetting = cc.Class({
   extends: cc.Component,
   properties: {
      compName: '',
      nodeName: '',
      // nodeID: '',
      _time: 0,
   },
   editor: {
      executeInEditMode: true,
   },

   setNodeInfo() {
      // this.nodeID = this.node.uuid;
      this.compName = this.constructor.name;
      this.nodeName = this.node.name;
      typeof this.onComp === 'function' && this.onComp();
   },

   onLoad() {
      this.setNodeInfo();
      this.listenerEv();
   },
   listenerEv() {
      this.node.on(cc.Node.EventType.POSITION_CHANGED, this.nodeChange, this);
      this.node.on(cc.Node.EventType.SIZE_CHANGED, this.nodeChange, this);
      this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this.nodeChange, this);
      this.node.on(cc.Node.EventType.CHILD_ADDED, this.nodeChange, this);
      this.node.on(cc.Node.EventType.CHILD_REMOVED, this.nodeChange, this);
      this.node.on(cc.Node.EventType.CHILD_REORDER, this.nodeChange, this);
      this.node.on(cc.Node.EventType.GROUP_CHANGED, this.nodeChange, this);
   },
   nodeChange() {
      typeof this.onChange === 'function' && this.onChange();
   },
   update(dt) {
      if (!CC_EDITOR) return;
      this._time += dt;
      if (this._time < 0.1) return;
      this._time = 0;

      this.setNodeInfo();
   },

   // 工具方法
   round2(n) {
      return Math.round(n * 10) / 10;
   },
   getNodeData(node) {
      return {
         // sz: this.getNodeSz(node),
         // sc: this.getNodeSc(node),
         pt: this.getNodePt(node),
         rt: this.getNodeRt(node),
      };
   },
   getNodeSc(node) {
      if (node instanceof cc.Node) {
         return node.scaleX + ',' + node.scaleY;
      } else {
         return '1,1';
      }
   },
   getNodeRt(node) {
      if (node instanceof cc.Node) {
         let rt = node.rotation;
         return this.round2(rt);
      } else {
         return 0;
      }
   },
   getNodePt(node) {
      if (node instanceof cc.Node) {
         let world = node.position;
         let x = this.round2(world.x);
         let y = this.round2(world.y);
         return x + ',' + y;
      } else {
         return '0,0';
      }
   },
   getNodePtToWorld(node) {
      if (node instanceof cc.Node) {
         let world = this.nodeSpaceToWorld(node);
         let x = this.round2(world.x);
         let y = this.round2(world.y);
         return x + ',' + y;
      } else {
         return '0,0';
      }
   },
   getNodeSz(node) {
      if (node instanceof cc.Node) {
         let w = this.round2(node.width);
         let h = this.round2(node.height);
         return w + ',' + h;
      } else {
         return '0,0';
      }
   },
   /**
    * 遍历查找指定名称的节点
    */
   seekNodeByName(node, name) {
      if (node.name === name) return node;
      let result = null;
      node.children.forEach(ele => {
         if (!result) {
            result = this.seekNodeByName(ele, name);
         }
      });
      return result;
   },
   /**
    * 将参数节点下相对点位置转换为相对世界坐标系的点
    * @param {cc.Node} node 
    * @param {cc.Vec2} point 
    */
   nodeSpaceToWorld(node, point) {
      if (node instanceof cc.Node) {
         point = point ? point : node.position;
         return node.parent.convertToWorldSpaceAR(point);
      }
      else {
         return cc.v2(0, 0);
      }
   },
   /**
    * 将世界坐标系下点转换为节点空间中的点
    * @param {cc.Node} node 
    * @param {cc.Vec2} world 
    */
   worldToNodeSpace(node, world) {
      if (node instanceof cc.Node && world instanceof cc.Vec2) {
         return node.convertToNodeSpaceAR(world);
      }
      else {
         return cc.v2(0, 0);
      }
   },

   /**
    * 传入初始坐标与圆心坐标，以及旋转角度，直接传节点的rotation,
    * 顺时针角度值为正，逆时针角度值为负
    * 返回旋转之后的 a点对应的坐标值
    * @param {object} a {x:0, y:0} 初始坐标
    * @param {object} o {x:0, y:0} 圆心坐标
    * @param {number} angle 角度值 节点的rotation值
    */
   getRotateAnglePoint(a, o, angle) {
      if (!this.isPoint(a) || !this.isPoint(o)) {
         return { x: 0, y: 0 };
      }
      angle = this.ang2rad(-angle);
      return {
         x: (a.x - o.x) * Math.cos(angle) - (a.y - o.y) * Math.sin(angle) + o.x,
         y: (a.x - o.x) * Math.sin(angle) + (a.y - o.y) * Math.cos(angle) + o.y
      };
   },
   /**
    * 角度转弧度
    * @param {number} ang 
    */
   ang2rad(ang) {
      if (typeof ang !== 'number') {
         return 0;
      }
      return ang * Math.PI / 180;
   },
   /**
    * 弧度转角度
    * @param {number} ang 
    */
   rad2ang(rad) {
      if (typeof rad !== 'number') {
         return 0;
      }
      return rad * 180 / Math.PI;
   },
   /**
    * 是否为坐标点对象
    * 该对象应该包含 x, y 两个属性，且x，y 的值必需是 Number 类型
    * @param {object} point 坐标点
    */
   isPoint(point) {
      if (!point || typeof point !== 'object') {
         return false;
      }
      point.x = this.round2(point.x);
      point.y = this.round2(point.y);
      if (typeof point.x !== 'number' || typeof point.y !== 'number') {
         return false;
      }
      return true;
   },
   /**
    * 获取左右边界x轴的值 返回世界坐标系下的点
    * 返回值类型为字符串 格式为 'leftX,rightX'
    */
   getLeftRightX(node) {
      if (!(node instanceof cc.Node)) return '0,0';
      let center = node.position;
      let w = node.width / 2;
      return (this.round2(center.x - w)) + ',' + (this.round2(center.x + w));
   },

   /**
    * 三角形顶点 返回父级坐标系下的点
    * 三角形向上绘制
    * @param {cc.Node} node 
    */
   getTriangleVer(node) {
      let vertex = [];
      if (!(node instanceof cc.Node)) return vertex;
      let center = node.position;
      let w = node.width / 2;
      let h = node.height / 2;
      vertex.push(cc.v2(center.x - w, center.y - h)); // lb
      vertex.push(cc.v2(center.x + w, center.y - h)); // rb
      vertex.push(cc.v2(center.x, center.y + h));
      // console.log(JSON.stringify(vertex));
      vertex = vertex.map(it => {
         let rotate = this.getRotateAnglePoint(it, center, node.rotation);
         // console.log(rotate, this.nodeSpaceToWorld(node, rotate));

         return rotate;
      });
      // console.log('三角形顶点', vertex);
      return this.vecToRegions(vertex);
   },

   /**
    * 矩形顶点 返回父级坐标系下的点
    * @param {cc.Node} node 
    */
   getRectVer(node) {
      let vertex = [];
      if (!(node instanceof cc.Node)) return vertex;
      let center = node.position;
      let w = node.width / 2;
      let h = node.height / 2;
      vertex.push(cc.v2(center.x - w, center.y + h));
      vertex.push(cc.v2(center.x + w, center.y + h));
      vertex.push(cc.v2(center.x + w, center.y - h));
      vertex.push(cc.v2(center.x - w, center.y - h));
      // console.log(JSON.stringify(vertex));
      vertex = vertex.map(it => {
         let rotate = this.getRotateAnglePoint(it, center, node.rotation);
         return rotate;
      });

      return this.vecToRegions(vertex);
   },
   // 顶点vec格式转三维
   vecToRegions(vecArr) {
      let result = [];
      if (!Array.isArray(vecArr)) return result;
      let points = vecArr.map(it => {
         return [this.round2(it.x), this.round2(it.y)];
      });
      result.push(points);
      return result;
   },
   // 求并集
   getUnionTwo(regions1, regions2) {
      let one = {
         regions: regions1,
         inverted: false,
      };
      let two = {
         regions: regions2,
         inverted: false,
      };
      let result = PolyBool.union(one, two);
      this.roundRegions(result.regions);
      return result.regions;
   },
   // 舍入小数点，只保留一位
   roundRegions(regions) {
      Array.isArray(regions)
         && regions.forEach(item => {
            Array.isArray(item)
               && item.forEach(it => {
                  if (Array.isArray(it) && it.length >= 2) {
                     it[0] = this.round2(it[0]);
                     it[1] = this.round2(it[1]);
                  }
               });
         });
      return regions;
   },

   /*
    * 多个矩形顶点数组(值为vec2对象)求其并集[[vLT,vRT,vRB,vLB],[vLT,vRT,vRB,vLB]]
    * 返回值为三维数组，坐标点三数组表示，Regions 类型
   */
   getUnionVer(verArr) {
      // 多边区域取并集，
      let poly_fixed = {
         // [[200, 200], [200, -200], [-200, -200], [-200, 200]]
         regions: [],
         inverted: false,
      };
      verArr.forEach((item, i) => {
         let point = item.map(it => {
            return [this.round2(it.x), this.round2(it.y)];
         });
         if (poly_fixed.regions.length === 0) {
            poly_fixed.regions.push(point);
         }
         else {
            let poly = {
               regions: [point],
               inverted: false
            };
            poly_fixed = PolyBool.union(poly_fixed, poly);
            // console.log(poly, JSON.stringify(poly_fixed));
         }
      });
      this.roundRegions(poly_fixed.regions);
      // console.log('矩形并集', poly_fixed);
      // console.log('矩形并集', verArr);

      return poly_fixed.regions;
   },
   /**
    * 求矩形差集
    * 返回值为三维数组，坐标点三数组表示，Regions 类型
    * regions - verArr
    * @param {array} regions 
    * @param {array} verArr 矩形的四个点 [vLT,vRT,vRB,vLB]
    */
   getDiffVer(regions, verArr) {
      let poly_fixed = {
         // [[200, 200], [200, -200], [-200, -200], [-200, 200]]
         regions: regions,
         inverted: false,
      };
      let point = verArr.map(it => {
         return [this.round2(it.x), this.round2(it.y)];
      });
      let poly = {
         regions: [point],
         inverted: false
      };
      poly_fixed = PolyBool.difference(poly_fixed, poly);
      this.roundRegions(poly_fixed.regions);
      return poly_fixed.regions;
   },

   /**
    * 添加顶点，将直边变成异型边
    * @param {*} area 
    */
   convertSide(area) {
      const OFFSET = 6; // 上下偏移值
      // points 可能有多个数组，一个数组是一个多边形
      let points = area.regions;
      let newPoints = [];
      Array.isArray(points) && points.forEach((item) => {
         let result = [];
         Array.isArray(item) && item.forEach((it, i) => {
            result.push(it);
            let next = item[i + 1];
            if (Array.isArray(next)) {
               let itPoint = {
                  x: it[0],
                  y: it[1]
               };
               let nextPoint = {
                  x: next[0],
                  y: next[1]
               };
               let dir = G_chSdk.getMag(itPoint, nextPoint);
               let ang = G_chSdk.getXDeg(itPoint, nextPoint);
               // console.log('当前点与下一点的距离', dir, ang, it, next);
               if (dir > 30) {
                  let count = Math.floor(dir / 25);
                  let total = 0;
                  for (let i = 0; i < count; i++) {
                     let inter = G_chSdk.randomInt(15, 25);
                     total += inter;
                     if (dir - total > 10) {
                        if (itPoint.x == nextPoint.x) {
                           // 沿y轴变形
                           let iY = itPoint.y < nextPoint.y ? total : -total;
                           let iX = G_chSdk.randomInt(-OFFSET, OFFSET);
                           let arr = [itPoint.x + iX, itPoint.y + iY];
                           result.push(arr);
                        }
                        else if (itPoint.y === nextPoint.y) {
                           // 沿x轴变形
                           let iY = G_chSdk.randomInt(-OFFSET, OFFSET);
                           let iX = itPoint.x < nextPoint.x ? total : -total;
                           let arr = [itPoint.x + iX, itPoint.y + iY];
                           result.push(arr);
                        }

                     }

                  }
               }

            }
         });
         newPoints.push(result);
      });
      // area.regions = newPoints;
      return newPoints;
   },

   // 三角形顶点 返回世界坐标系下的点 依赖变换 skewX skewY 值
   getTriangleVerBySkew(node) {
      // console.log(node.getBoundingBox());
      let vertex = [];
      let rect = node.getBoundingBox();
      vertex.push(cc.v2(rect.xMin, rect.center.y));
      vertex.push(cc.v2(rect.center.x, rect.yMin));
      vertex.push(cc.v2(rect.xMax, rect.center.y));
      vertex.push(cc.v2(rect.center.x, rect.yMax));
      // console.log(JSON.stringify(vertex));

      vertex = vertex.map(it => {
         let world = this.nodeSpaceToWorld(node, it);
         // let space = this.worldToNodeSpace(this.node.parent, world);

         return world;
      });
      // console.log(JSON.stringify(vertex));
      return vertex;
   },

   /**
    * 三角形顶点 返回世界坐标系下的点
    * 三角形向上绘制
    * @param {cc.Node} node 
    */
   getTriangleVerToWorld(node) {
      let vertex = [];
      if (!(node instanceof cc.Node)) return vertex;
      let center = node.position;
      let w = node.width / 2;
      let h = node.height / 2;
      vertex.push(cc.v2(center.x - w, center.y - h)); // lb
      vertex.push(cc.v2(center.x + w, center.y - h)); // rb
      vertex.push(cc.v2(center.x, center.y + h));
      // console.log(JSON.stringify(vertex));
      vertex = vertex.map(it => {
         let rotate = this.getRotateAnglePoint(it, center, node.rotation);

         return this.nodeSpaceToWorld(node.parent, cc.v2(rotate.x, rotate.y));
      });
      // console.log('三角形顶点', vertex);
      return this.vecToRegions(vertex);
   },

   /**
    * 矩形顶点 返回世界坐标系下的点
    * @param {cc.Node} node 
    */
   getRectVerToWorld(node) {
      let vertex = [];
      if (!(node instanceof cc.Node)) return vertex;
      let center = node.position;
      let w = node.width / 2;
      let h = node.height / 2;
      vertex.push(cc.v2(center.x - w, center.y + h));
      vertex.push(cc.v2(center.x + w, center.y + h));
      vertex.push(cc.v2(center.x + w, center.y - h));
      vertex.push(cc.v2(center.x - w, center.y - h));
      // console.log(JSON.stringify(vertex));
      vertex = vertex.map(it => {
         let rotate = this.getRotateAnglePoint(it, center, node.rotation);
         return this.nodeSpaceToWorld(node.parent, cc.v2(rotate.x, rotate.y));
      });

      return this.vecToRegions(vertex);
   },

   setOtherComp() {
      this.node._components.forEach(item => {
         item._name = this.node.uuid;
      });
   },

});
