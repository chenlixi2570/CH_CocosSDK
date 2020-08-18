let RunLevelSetting = require('level_setting');

cc.Class({
   extends: RunLevelSetting,

   properties: {
      wd: 0,
      lamp: {
         default: [],
         type: cc.Color,
         tooltip: '呼吸灯效果颜色值，第一个色号要与最后一个色号相同'
      },
      tm: {
         default: 1,
         tooltip: '从一个色号变换到另一个色号需要的时间，单位秒'
      },
      mu: '', // 音乐 flag
      gr: [], // 网格数据
   },
   onLoad() {
      this._super();
      this.getWayData();
   },
   start() {
      this.getGridData();
      console.log('网格数据 fixedSet', this.gr);
   },
   onComp() {
      this.wd = this.node.width;
      if (this.wayComp) {
         this.mu = this.wayComp.musicJson.json.name;
      }
      this.getGridData();
   },
   getWayData() {
      let createWay = this.seekNodeByName(this.node.parent, 'createWay');
      this.wayComp = createWay && createWay.getComponent('create_way');
      if (this.wayComp) {
         this.mu = this.wayComp.musicJson.json.name;
      }
   },
   getGridData() {
      let result = [];
      this.node.children.forEach(item => {
         if (item instanceof cc.Node) {
            let comp = item.getComponent('setGrid');
            if (!comp) {
               comp = item.getComponent('setTriangle');
            }
            if (!comp) {
               comp = item.getComponent('setRect');
            }
            if (!comp) {
               comp = item.getComponent('setCirle');
            }
            if (comp) {
               let data = {
                  ver: comp.subVertex,//顶点数组 世界坐标系
                  lrx: comp.lrx, // 所占区域最左边界与最右边界，世界坐标系
                  rects: comp.rects,
                  isDie: comp.isDie
               };
               result.push(data);
            }
         }
      });
      result.sort((a, b) => {
         return a.lrx.split(',')[0] - b.lrx.split(',')[0];
      });
      this.gr = result;
   },

   returnReg() {
      return this.gr;
   }
});
