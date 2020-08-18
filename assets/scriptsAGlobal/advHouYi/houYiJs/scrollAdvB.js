/*
 * @Author: Chen Li Xi
 * @Description: 后羿广告方案C滚动广告
 */
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
         tooltip: 'Horizontal: 横向滚动,Vertical: 纵向滚动'
      },
      isScroll: {
         default: true,
         tooltip: '是否自动滚动'
      },
      gridTh: {
         default: cc.v2(1, 4),
         tooltip: 'x: 可视区列数，y: 可视区行数'
      },
      delayTm: {
         default: 1.3,
         tooltip: '间隔多久时间运动一次'
      },
      testFrame: cc.SpriteFrame,
      _dTime: 0,
      _moveBack: 1, // 控制运动方向，
      _moveTm: 0.8, // 一次动画需要的时间
      _xIndex: 0, // 控制x轴运动
      _enableCount: 0,
   },
   onLoad() {
      this._getAdv(_allAdvInfo => {
         if (Array.isArray(_allAdvInfo)) {
            this.addNodes();
            this.listerScrollEvent();
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
      if (this._enableCount === 0) {
         this._enableCount += 1;
         return;
      };
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
      // return;
      if (!this.canScroll || !this.isScroll) return;
      this._dTime += dt;
      if (this._dTime < this.delayTm) return;
      this._dTime = 0;
      // console.log('有人在拖我吗', this.scrollComp.isScrolling());
      if (this.scrollComp.isScrolling()) return;

      this.moveOnceScroll();
   },
   listerScrollEvent() {
      this.node.on('scroll-ended', this.scrollEndHeadler, this);
   },
   addNodes() {
      this.maskNode = new cc.Node('mask');
      this.maskNode.addComponent(cc.Mask);
      this.maskNode.setContentSize(this.node.width, this.node.height);

      this.advListNode = new cc.Node('advList');
      this.advListNode.parent = this.maskNode;

      this.scrollComp = this.node.addComponent(cc.ScrollView);
      this.scrollComp.content = this.advListNode;
      this.scrollComp.inertia = false;
      this.scrollComp.elastic = false;
      this.scrollComp.horizontal = this.scrollDir == ScrollDir.Horizontal;
      this.scrollComp.vertical = this.scrollDir !== ScrollDir.Horizontal;
      this.isHori = this.scrollDir == ScrollDir.Horizontal; // 是横向滚动

      this.resetListNode();
   },
   resetListNode() {
      let pad = this.btnPadding;
      let nodeWH = this._getBtnWH();
      let xRow = this.gridTh.x;
      let yRow = this.gridTh.y;
      let listW = nodeWH.width * xRow + pad.x * (xRow - 1);
      let listH = nodeWH.height * yRow + pad.y * (yRow - 1);
      this.advListNode.setContentSize(listW, listH);
      this.addBtnNode();
      this.layoutAdvList();
      this.initScrollLocal();
      this.maskNode.parent = this.node;
      this.canScroll = true;
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
               this.testAddIndex(node, i);
               node.parent = this.advListNode;
            }
         });
      } else {
         let idxArr = [];
         let once = false;
         for (let i = 0; i < total; i++) {
            let idx = i % dataLen;
            if (i > dataLen - 1) {
               if (!once) {
                  once = true;
                  idxArr = idxArr.sort((a, b) => Math.random() - 0.5);
               }
               idx = idxArr[idx];

            } else {
               idxArr.push(idx);
            }
            let advInfo = this._allAdvInfo[idx];
            let node = this._createBtn(advInfo, i);
            if (node instanceof cc.Node) {
               this.testAddIndex(node, i);
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
   // 设置初始滚动节点位置
   initScrollLocal() {
      let maskWH = this.maskNode.getContentSize();
      let listWH = this.advListNode.getContentSize();
      let nodeWH = this._getBtnWH();
      let pad = this.btnPadding;
      if (this.isHori) {
         // 横向滚动,改x轴  显示最左方 初始向右动
         let disX = maskWH.width / 2;
         this.advListNode.anchorX = 0;
         this.advListNode.x = -disX;
         this.advListNode.y = 0;
         this.initListX = this.advListNode.x;
         this.moveTotalDis = listWH.width - maskWH.width; // 可以动作的总距离
         this.moveDis = nodeWH.width + pad.x; // 横向一次滚动长度
         this.isToRight = true; // 是否向右动
      } else {
         // 纵向滚动，改y轴 显示最上方广告 初始向下动
         let disY = maskWH.height / 2;
         this.advListNode.anchorY = 1;
         this.advListNode.y = disY;
         this.advListNode.x = 0;
         this.initListY = this.advListNode.y;
         this.moveTotalDis = listWH.height - maskWH.height; // 可以动作的总距离
         this.moveDis = nodeWH.height + pad.y; // 纵向一次滚动长度
         this.isToDown = true; // 是否向下动
      }
   },

   moveOnceScroll() {
      if (this.isHori) {
         // 横向滚动
         this.currListX = this.advListNode.x;
         let dis = 0;
         if (this.isToRight) { // 是否向右动
            dis = this.currListX - this.moveDis;
            if (dis < this.initListX - this.moveTotalDis) { // 向左动
               dis = this.initListX - this.moveTotalDis;
               this.isToRight = false;
            }
         }
         else {
            dis = this.currListX + this.moveDis;
            if (dis > this.initListX) {
               dis = this.initListX;
               this.isToRight = true;
            }
         }

         this.advListNode.runAction(
            cc.moveTo(this._moveTm, cc.v2(dis, 0)),
         );
      } else {
         // 纵向滚动
         this.currListY = this.advListNode.y;
         let dis = 0;
         if (this.isToDown) { // 是否向右动
            dis = this.currListY + this.moveDis;
            // console.log(dis, this.initListY + this.moveTotalDis);

            if (dis > this.initListY + this.moveTotalDis) { // 向下动
               dis = this.initListY + this.moveTotalDis;
               this.isToDown = false;
            }
         }
         else {
            dis = this.currListY - this.moveDis;
            if (dis < this.initListY) {
               dis = this.initListY;
               this.isToDown = true;
            }
         }

         this.advListNode.runAction(
            cc.moveTo(this._moveTm, cc.v2(0, dis)),
         );
      }
   },
   // 手动滚动结束时重定位
   scrollEndHeadler(ev) {
      this.canScroll = false;
      let minDir = 9999;
      if (this.isHori) { // 横向运动

         let nearX = this.advListNode.x;
         let len = Math.ceil(this.moveTotalDis / this.moveDis) + 1;
         // 比对距离停止点最近的广告分界位置
         for (let i = 0; i < len; i++) {
            let listX = this.initListX - this.moveDis * i;
            if (i === len - 1) {
               listX = this.initListX - this.moveTotalDis;
            }
            let dir = Math.abs(this.advListNode.x - listX);
            if (dir < minDir) {
               minDir = dir;
               nearX = listX;
            }
         }

         if (nearX != this.advListNode.x) {
            let time = minDir / 200;
            this.advListNode.runAction(
               cc.sequence(
                  cc.moveTo(time, cc.v2(nearX, 0)),
                  cc.callFunc(() => {
                     this.setCanScroll();
                  })
               )
            );
         }
         else {
            this.setCanScroll();
         }
      }
      else {
         let nearY = this.advListNode.y;
         let len = Math.ceil(this.moveTotalDis / this.moveDis) + 1;

         // 比对距离停止点最近的广告分界位置
         for (let i = 0; i < len; i++) {
            let listY = this.initListY + this.moveDis * i;
            if (i === len - 1) {
               listY = this.initListY + this.moveTotalDis;
            }
            let dir = Math.abs(this.advListNode.y - listY);
            if (dir < minDir) {
               minDir = dir;
               nearY = listY;
            }
         }

         if (nearY != this.advListNode.y) {
            let time = minDir / 200;
            this.advListNode.runAction(
               cc.sequence(
                  cc.moveTo(time, cc.v2(0, nearY)),
                  cc.callFunc(() => {
                     this.setCanScroll();
                  })
               )
            );
         }
         else {
            this.setCanScroll();
         }
      }

   },
   setCanScroll() {
      this.canScroll = true;
      this._dTime = 0;
   },

   testAddIndex(node, i) {
      return
      if (node instanceof cc.Node) {
         let label = new cc.Node('label');
         let cLabel = label.addComponent(cc.Label);
         cLabel.string = i;
         label.zIndex = 999;
         label.color = cc.Color.RED;
         label.parent = node;

      }
   }

});