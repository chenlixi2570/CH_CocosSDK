let RunLevelSetting = require('level_setting');
// 圆形块
cc.Class({
   extends: RunLevelSetting,
   properties: {
      subVertex: [],
      lrx: '0,0',
      rects: [],
      isDie: '1',
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
      data.type = 'c';
      data.imNm = this.getImgName(this.node);
      result.push(data);
      this.rects = result;
      console.log('圆形矩形数据', this.rects);
   },
   getLRX() {
      this.lrx = this.getLeftRightX(this.node);
   },
   getVertex() {
      let vertex = this.getRectVer(this.node);
      this.subVertex = vertex;
      // console.log('圆形顶点', this.subVertex);
   },

   getImgName(node) {
      let result = '';
      if (node instanceof cc.Node) {
         let sprite = node.getComponent(cc.Sprite);
         if (sprite) {
            result = sprite.spriteFrame.name;
         }
      }
      return result;
   },


   returnReg() {
      return this.subVertex;
   }
});