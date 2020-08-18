/**
 * 使用cocos官方示例中滚动区懒加载
 * 当前组件绑要定在有 ScrollView 组件的节点上
 * 向每一个条目传递数据的方式是绑定在节点上或调用节点上的方法更新
 * 无缝滚动，
 */

cc.Class({
   extends: cc.Component,

   properties: {
      itemTemplate: { // 项目模板以实例化其他项目
         default: null,
         type: cc.Prefab
      },
      spacing: 0, // 条目之间的间隔
      beyondCount: 1, // 超出个数
      _bufferZone: 0, // 当上下距离可视区多高时重新渲染条目
      _updateTimer: 0, // 
      _updateInterval: 0.2, // 控制刷新次数
      _items: [], // 数组来存储产生的物品
      _lastContentPosY: 0, // 使用此变量来检测我们是向上滚动还是向下滚动
   },
   editor: CC_EDITOR && {
      requireComponent: cc.ScrollView
   },

   /**
    * @param {Array}  子项数据数组
    */
   drawList(tCount) {
      this.totalCount = tCount;

      if (this.itemTemplate instanceof cc.Prefab) {
         this.initialize();
      } else {
         console.warn('---ListViewCtrl 组件 itemTemplate 属性的值是必需的');
      }
   },

   initialize: function () {
      this.scrollView = this.node.getComponent(cc.ScrollView);
      this.contentNode = this.scrollView.content;
      this.itemHeight = this.itemTemplate.data.height;
      this.itemOccH = this.itemHeight + this.spacing; // 一个条目占用空间高
      this.contentNode.height = this.totalCount * this.itemOccH;
      this.contentNode.anchorY = 1;
      // 初始渲染条目在可视区高能渲染的数量上再加超出个数
      this.spawnCount = Math.ceil(this.node.height / this.itemOccH) + this.beyondCount;
      this.spawnCount = this.spawnCount > this.totalCount ? this.totalCount : this.spawnCount;
      this._bufferZone = Math.ceil(this.beyondCount * this.itemOccH);
      for (let i = 0; i < this.spawnCount; ++i) {
         let item = cc.instantiate(this.itemTemplate);
         let y = -item.height * (0.5 + i) - this.spacing * i;
         item.setPosition(0, y);
         item.list_idx = i;
         this.contentNode.addChild(item);

         this._items.push(item);
      }
   },

   getPositionInView: function (item) {
      // 获取项目在scrollview的节点空间中的位置
      let worldPos = item.parent.convertToWorldSpaceAR(item.position);
      let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
      return viewPos;
   },

   update: function (dt) {
      if (!this.contentNode) return;
      // 不需要每一帧都做计算
      this._updateTimer += dt;
      if (this._updateTimer < this._updateInterval) return;
      this._updateTimer = 0;

      let items = this._items;
      let buffer = this._bufferZone;
      // scrolling direction
      let isDown = this.contentNode.y < this._lastContentPosY;
      let offset = this.itemOccH * items.length;
      for (let i = 0; i < items.length; ++i) {
         let item = items[i];
         let viewPos = this.getPositionInView(item);
         if (isDown) {
            // 如果远离缓冲区但未达到内容顶部
            if (viewPos.y < -buffer && item.y + offset < 0) {
               item.y = item.y + offset;
               item.list_idx -= items.length;
               item.updateItem && item.updateItem();
            }
         } else {
            // 如果远离缓冲区但未达到内容底部
            if (viewPos.y > buffer &&
               item.y - offset > -this.contentNode.height) {
               item.y = item.y - offset;
               item.list_idx += items.length;
               item.updateItem && item.updateItem();
            }
         }
      }
      // update _lastContentPosY
      this._lastContentPosY = this.contentNode.y;
   },

   scrollEvent: function (sender, event) { },
   // 增加一条
   addItem: function () {
      this.contentNode.height = (this.totalCount + 1) * this.itemOccH + this.spacing; // get total content height
      this.totalCount = this.totalCount + 1;
   },
   // 删除一条
   removeItem: function () {
      if (this.totalCount - 1 < 0) {
         cc.error("can't remove item less than 30!");
         return;
      }

      this.contentNode.height = (this.totalCount - 1) * this.itemOccH + this.spacing; // get total content height
      this.totalCount = this.totalCount - 1;

      this.moveBottomItemToTop();
   },
   // 更新最滚动区
   moveBottomItemToTop() {
      let length = this._items.length;
      let offset = this.itemOccH * length;
      let item = this.getItemAtBottom();

      // whether need to move to top
      if (item.y + offset < 0) {
         item.y = item.y + offset;
         let itemComp = item.getComponent(this.itemCompStr);
         let itemId = itemComp.itemID - length;
         itemComp.updateItem(itemId);
      }
   },

   getItemAtBottom() {
      let item = this._items[0];
      for (let i = 1; i < this._items.length; ++i) {
         if (item.y > this._items[i].y) {
            item = this._items[i];
         }
      }
      return item;
   },
   // 滚动到指定位置
   scrollToFixedPosition: function () {
      this.scrollView.scrollToOffset(cc.v2(0, 500), 2);
   }
});
