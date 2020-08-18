// 自动生成场景长度与重音点标示

let _speed = 280; // 每秒前进值

cc.Class({
   extends: cc.Component,
   properties: {
      rapid: cc.Prefab,
      // tipsLabel: cc.Label,
      nGround: cc.Node,
      nFixedWall: cc.Node,
      nGrap: cc.Node,
      _musicData: [],
      musicJson: {
         default: null,
         type: cc.JsonAsset,
         notify: function (oldVal) {
            this._loadJson();
         }
      },
   },
   editor: {
      executeInEditMode: true,
   },
   onLoad() {
      // this._loadJson();
   },
   _loadJson() {
      if (!(this.musicJson instanceof cc.JsonAsset)) return;
      // this.tipsLabel.string = '当前设置歌曲为：' + this.musicJson.json.name;
      this._musicData = this.musicJson.json.data;
      this.drawWay();
   },
   drawWay() {
      // this.tipsLabel.string = this._musicData.length;
      if (
         !Array.isArray(this._musicData) ||
         this._musicData.length < 1 ||
         !(this.nGround instanceof cc.Node) ||
         !(this.nFixedWall instanceof cc.Node) ||
         !(this.rapid instanceof cc.Prefab)
      ) return;

      let totalTm = Math.ceil(this._musicData[this._musicData.length - 1].T);
      let totalDis = _speed * totalTm;
      // this.tipsLabel.string = totalDis;
      if (G_chSdk.isNumber(totalDis)) {
         this.nGround.width = totalDis;
         this.nFixedWall.width = totalDis;
         this.nGrap.width = totalDis;
      }
      this.nGround.removeAllChildren();
      this._musicData.forEach(item => {
         let node = cc.instantiate(this.rapid);
         let label = node && this.seekNodeByName(node, 'tmLabel');
         let cLabel = label && label.getComponent(cc.Label);
         let x = _speed * item.T;
         node.x = x;
         if (cLabel instanceof cc.Label) {
            cLabel.string = item.T;
         }
         node.parent = this.nGround;
      });
   },

   createPointNode() {

   },
   /**
   * 遍历查找指定名称的节点
   */
   seekNodeByName(node, name) {
      if (
         !(node instanceof cc.Node) ||
         !G_chSdk.checkString(name)
      ) {
         return null;
      }

      if (node.name === name) return node;
      let result = null;
      node.children.forEach(ele => {
         if (!result) {
            result = this.seekNodeByName(ele, name);
         }
      });
      return result;
   },

});