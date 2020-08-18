

cc.Class({
   extends: cc.Component,
   properties: {
      isClear: {
         default: false,
         notify: function (oldVal) {
            this.clearGrap();
            this.drawRegions();
         }
      },
      returnRegions: {
         default: null,
         type: cc.Component.EventHandler,
      },
      returnGrid: {
         default: null,
         type: cc.Component.EventHandler,
      },
      cGrap: cc.Graphics,
   },
   editor: {
      executeInEditMode: true,
   },
   start() {
      this.drawRegions();
      this.drawGrid();
   },
   clearGrap() {
      this.cGrap && this.cGrap.clear();
   },
   // 统一矩形顶点的数据格式为 regions 且是世界坐标系下的点
   drawRegions() {
      if (!(this.returnRegions instanceof cc.Component.EventHandler)) return;
      let data = this.emitEventHandler(this.returnRegions);
      this.drawWorldPoint(data, false);
   },
   drawGrid() {
      if (!(this.returnGrid instanceof cc.Component.EventHandler)) return;
      let data = this.emitEventHandler(this.returnGrid);
      Array.isArray(data) && data.forEach(item => {
         let vertex = item.ver;
         this.drawWorldPoint(vertex, false);
      });
   },

   drawWorldPoint(vertex, isWorld = true) {
      Array.isArray(vertex) && vertex.forEach(rectArr => {
         if (isWorld) {
            rectArr = rectArr.map((point, i) => {
               let world = this.worldToNodeSpace(this.node, cc.v2(point[0], point[1]));
               return [world.x, world.y];
            });
         }
         // console.log('drawVec22', JSON.stringify(rectArr));
         this.drawArr(rectArr, false);
      });
   },

   drawArr(arr, isVec2 = true) {
      Array.isArray(arr) && arr.forEach((it, i) => {
         let x = isVec2 ? it.x : it[0];
         let y = isVec2 ? it.y : it[1];
         if (i === 0) {
            this.cGrap && this.cGrap.moveTo(x, y);
         }
         else {
            this.cGrap && this.cGrap.lineTo(x, y);
         }
      });
      this.cGrap && this.cGrap.close();
      this.cGrap && this.cGrap.stroke();
      this.cGrap && this.cGrap.fill();
   },

   /**
    * 与 cc.Component.EventHandler 类的实例方法 emit 一样执行其他组件中的函数
    * 区别是本方法会返回的 EventHandler 的返回值
    * @param {cc.Component.EventHandler} evHandler 另一个组件中的函数
    */
   emitEventHandler(evHandler) {
      if (evHandler instanceof cc.Component.EventHandler) {
         let cName = G_chSdk.checkString(evHandler._componentName) ? evHandler._componentName : 'abc';
         let self = evHandler.target && evHandler.target.getComponent(cName);
         return self && self[evHandler.handler] && self[evHandler.handler].call(self);
      }
      return null;
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
});