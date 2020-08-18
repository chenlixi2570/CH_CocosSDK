let RunLevelSetting = require('level_setting');
// 三角形块
cc.Class({
   extends: RunLevelSetting,
   properties: {
      subVertex: [],
      lrx: '0,0',
      rects: [],
      isDie:'1',
   },
   onLoad() {
      this._super();
      this.onChange();
   },
   onChange() {
      this.getVertex();
      this.getLRX();
      this.getNodeRect();
   },
   getNodeRect() {
      let result = [];
      let data = this.getNodeData(this.node);
      data.type = 'tn';
      if(this.node.width > 30){
         data.type = 'tw'
      }
      else if(this.node.height > 30){
         data.type = 'tl'
      }
      result.push(data);
      this.rects = result;
   },
   getLRX() {
      this.lrx = this.getLeftRightX(this.node);
   },
   getVertex() {
      let vertex = this.getTriangleVer(this.node);
      this.subVertex = vertex;
      // console.log('三角形顶点', this.subVertex);
   },


   returnReg() {
      return this.subVertex;
   }
});