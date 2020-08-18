let RunLevelSetting = require('level_setting');
// 矩形块
cc.Class({
   extends: RunLevelSetting,
   properties: {
      subVertex: [],
      lrx: '0,0',
      rects: [],
      isDie:'0',
   },
   onLoad() {
      this._super();
      this.onChange();
   },
   onChange() {
      this.getVertex();
      this.getLRX();
      this.getMulRect();
   },
   // 将大矩形切成30 * 30的小矩形
   getMulRect() {
      let row = Math.ceil(this.node.height / 30); // 横行
      let col = Math.ceil(this.node.width / 30); // 纵列
      let result = [];
      let c = this.node.position; // 节点中心
      let w = this.node.width / 2;
      let h = this.node.height / 2;
      // 左上角第一个30*30矩形的中心点
      let ltCenter = cc.v2(c.x - w + 15, c.y + h - 15);
      for (let i = 0; i < row; i++) {
         for (let j = 0; j < col; j++) {
            let x = ltCenter.x + (j * 30);
            let y = ltCenter.y - (i * 30);
            let data = {
               // sz: '30,30',
               type: 'r',
               rt: 0,
               pt: this.roundOne(x) + ',' + this.roundOne(y)
            };
            result.push(data);
         }
      }
      this.rects = result;
      this.rects.sort((a, b) => {
         a = +a.pt.split(',')[0];
         b = +b.pt.split(',')[0];
         return a - b;
      });
   },
   getLRX() {
      this.lrx = this.getLeftRightX(this.node);
   },
   getVertex() {
      let vertex = this.getRectVer(this.node);

      this.subVertex = vertex;
      // console.log('矩形顶点', this.subVertex);
   },
   roundOne(n) {
      return Math.round(n * 10) / 10;
   },


   returnReg() {
      return this.subVertex;
   },

});