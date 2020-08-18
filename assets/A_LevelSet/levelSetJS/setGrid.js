let RunLevelSetting = require('level_setting');
// 三角形块
cc.Class({
   extends: RunLevelSetting,
   properties: {
      subVertex: [],//顶点数组 世界坐标系
      lrx: '0,0', // 所占区域最左边界与最右边界，世界坐标系
      rects: [], // 节点所在矩形框数据
      isDie:'1',
   },
   onLoad() {
      this._super();
      this.onChange();
   },
   onChange() {
      this.getVertex();
      this.getLRX();
   },
   getLRX() {
      this.lrx = this.getLeftRightX(this.node);
   },
   getVertex() {
      this.setChildVertex();
   },

   setChildVertex() {
      let result = {
         regions: [],
         inverted: false,
      };
      this.rects = [];
      this.node.children.forEach(item => {
         let comp = item.getComponent('setTriangle');
         if (!comp) {
            comp = item.getComponent('setRect');
         }
         if (comp) {
            typeof comp.onChange === 'function' && comp.onChange();
            let vertex = comp.subVertex;
            if (result.regions.length === 0) {
               result.regions = vertex;
            }
            else {
               let poly = {
                  regions: vertex,
                  inverted: false
               };
               result = PolyBool.union(result, poly);
            }

            this.setMultRectData(comp.rects);
         }
      });
      this.convertVec(result.regions);
      this.subVertex = result.regions;
      this.rects.sort((a, b) => {
         a = +a.pt.split(',')[0];
         b = +b.pt.split(',')[0];
         return a - b;
      });
   },
   // 多个拼接取矩形数组
   setMultRectData(childRects) {
      if (Array.isArray(childRects)) {
         childRects.forEach(item => {
            let point = item.pt.split(',');
            let vec = cc.v2(point[0], point[1]);
            // console.log('原坐标', JSON.stringify(vec));
            let world = this.node.convertToWorldSpaceAR(vec);;
            // console.log('先转为世界坐标', JSON.stringify(world));
            let space = this.node.parent.convertToNodeSpaceAR(world);
            item.pt = this.roundTwo(space.x) + ',' + this.roundTwo(space.y);
            this.rects.push(item);
         });
      }
   },
   // 将grid 节点下的坐标转为 fixedSet 节点下的坐标
   convertVec(regions) {
      Array.isArray(regions) && regions.forEach(item => {
         Array.isArray(item) && item.forEach(point => {
            let vec = cc.v2(point[0], point[1]);
            // console.log('原坐标', JSON.stringify(vec));
            let world = this.node.convertToWorldSpaceAR(vec);;
            // console.log('先转为世界坐标', JSON.stringify(world));
            let space = this.node.parent.convertToNodeSpaceAR(world);
            // console.log('再转为父级空间下的坐标', JSON.stringify(space));
            point[0] = this.roundTwo(space.x);
            point[1] = this.roundTwo(space.y);
         });
      });
   },
   roundTwo(n) {
      return Math.round(n * 10) / 10;
   },

   returnReg() {
      return this.subVertex;
   }
});