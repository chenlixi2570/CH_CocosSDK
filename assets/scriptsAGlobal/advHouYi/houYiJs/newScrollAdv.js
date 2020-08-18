let BaseAdvB = require('baseAdvB');
let ScrollDir = cc.Enum({
   Horizontal: 0,
   Vertical: 1,
});
cc.Class({
   extends: BaseAdvB,
   properties: {
      scrollDir: {
         type: ScrollDir,
         default: ScrollDir.Horizontal,
         tooltip: '滚动广告横向滚动还是纵向滚动'
      },
      gridTh: {
         default: cc.v2(4, 2),
         tooltip: 'x: 广告列数，y: 广告行数'
      },
      isScroll: {
         default: true,
         tooltip: '是否自动滚动'
      },
      speedDir: {
         default: true,
         tooltip: '运动方向，true 从下到上，从右向左，false相反'
      },
      _speed: 0.8,
      testFrame: cc.SpriteFrame,
   },
   onLoad() {
      this.initX = 0;
      this.initY = 0;
      this._getAdv(_allAdvInfo => {
         if (Array.isArray(_allAdvInfo)) {
            this.addNodes();
         } else {
            this.node.active = false;
         }
      });
   },
   /**
    * 每次显示时随机乱序广告列表
    * this.canScroll 为 true时广告已经生成加载完
    * 此时重新设置广告的advInfo可以改变广告内容
    */
   onEnable() {
      if (!this.canScroll) return;
      let len = this.advListNode.children.length;
      let dataLen = this._allAdvInfo.length;
      let dataIdxs = [];
      for (let j = 0; j < dataLen; j++) {
         dataIdxs.push(j);
      }
      // 随机排序
      dataIdxs.sort((a, b) => Math.random() - 0.5);
      for (let i = 0; i < len; i++) {
         let nBtn = this.advListNode.children[i];
         let idx = dataIdxs[i % dataLen];
         let advInfo = this._allAdvInfo[idx];
         nBtn.advInfo = advInfo;
         typeof nBtn.updateNode === 'function' && nBtn.updateNode();
      }
      // console.log('==滚动区随机排序广告', len, dataIdxs);
   },

   update(dt) {
      if (!this.canScroll || !this.isScroll) return;
      let speed = this._speed;
      if (this.isHori) {
         // 横向滚动
         if (this.speedDir) {
            // 从右向左，x轴递减
            if (this.advListNode.x <= -this.initX) {
               this.advListNode.x = this.initX;
            }
            this.advListNode.x -= speed;
         } else {
            // 从左向右，x轴递增
            if (this.advListNode.x >= -this.initX) {
               this.advListNode.x = this.initX;
            }
            this.advListNode.x += speed;
         }
      } else {
         // 纵向滚动
         if (this.speedDir) {
            // 从下向上， y轴递增
            if (this.advListNode.y >= -this.initY) {
               this.advListNode.y = this.initY;
            }
            this.advListNode.y += speed;
         } else {
            // 从上向下，y轴递减
            if (this.advListNode.y <= -this.initY) {
               this.advListNode.y = this.initY;
            }
            this.advListNode.y -= speed;
         }

      }
   },
   addNodes() {
      // 遮罩层与挂载节点大小一致
      let wh = this.node.getContentSize();
      this.maskNode = new cc.Node('mask');
      this.maskNode.addComponent(cc.Mask);
      this.maskNode.setContentSize(wh);
      // 用于放广告按钮的列表节点，宽高根据实际行列数确定
      this.advListNode = new cc.Node('advList');
      this.advListNode.parent = this.maskNode;
      // 添加滚动组件
      let scroll_comp = this.node.addComponent(cc.ScrollView);
      scroll_comp.content = this.advListNode;
      scroll_comp.inertia = false;
      scroll_comp.elastic = false;
      scroll_comp.horizontal = this.scrollDir == ScrollDir.Horizontal;
      scroll_comp.vertical = this.scrollDir !== ScrollDir.Horizontal;
      this.isHori = this.scrollDir == ScrollDir.Horizontal; // 是横向滚动

      this.resetListNode();
   },
   resetListNode() {
      // 不管能不能滚动，都只生成设置的广告数量
      let pad = this.btnPadding;
      let nodeWH = this._getBtnWH();
      let xRow = this.gridTh.x;
      let yRow = this.gridTh.y;
      let listW = nodeWH.width * xRow + pad.x * (xRow - 1);
      let listH = nodeWH.height * yRow + pad.y * (yRow - 1);
      this.advListNode.setContentSize(listW, listH);
      this.btnWH = nodeWH;
      this.addBtnNode();
      this.layoutAdvList();
      this.initScrollLocal(); // 初始化滚动位置
      // 按钮加好之后再渲染到节点中去
      this.maskNode.parent = this.node;
      this.canScroll = true; // 可以开始滚动
      // 测试用
      if (CC_DEBUG) {
         G_chSdk.setTestArea(this.advListNode, this.testFrame);
      }
   },
   // 生成广告按钮节点
   addBtnNode() {
      let total = this.gridTh.x * this.gridTh.y;
      let dataLen = this._allAdvInfo.length;
      let nodes = [];
      if (dataLen >= total) {
         nodes = this._createAllBtns();
         nodes.forEach((node, i) => {
            if (node instanceof cc.Node && i < total) {
               node.parent = this.advListNode;
            }
         });
      } else {
         for (let i = 0; i < total; i++) {
            let advInfo = this._allAdvInfo[i % dataLen];
            let node = this._createBtn(advInfo, i);
            if (node instanceof cc.Node) {
               node.parent = this.advListNode;
            }
         }
      }
   },
   // 自动网格布局
   layoutAdvList() {
      let layout = this.advListNode.addComponent(cc.Layout);
      layout.type = cc.Layout.Type.GRID;
      layout.spacingX = this.btnPadding.x;
      layout.spacingY = this.btnPadding.y;
   },
   initScrollLocal() {
      let maskWH = this.maskNode.getContentSize();
      let listWH = this.advListNode.getContentSize();
      if (this.isHori) {
         // 横向滚动,改x轴
         let disX = (listWH.width - maskWH.width) / 2;
         if (this.speedDir) {
            // 显示最左方
            this.advListNode.x = disX;
         } else {
            // 显示最右方
            this.advListNode.x = -disX;
         }
         this.advListNode.y = 0;
         this.initX = this.advListNode.x;
      } else {
         // 纵向滚动，改y轴
         let disY = (listWH.height - maskWH.height) / 2;
         if (this.speedDir) {
            // 显示最上方广告
            this.advListNode.y = -disY;
         } else {
            // 显示最下方广告
            this.advListNode.y = disY;
         }
         this.advListNode.x = 0;
         this.initY = this.advListNode.y;
      }
   },

});