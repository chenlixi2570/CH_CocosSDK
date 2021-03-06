cc.Class({
   extends: cc.Component,
   properties: {
      page_len: {
         default: 16,
         tooltip: '一页显示多少个项目'
      },
      itemPre: cc.Node,
   },
   onLoad() {
      // console.log('当前页索引', this.node.page_idx);
      this.list_len = G_chInfo.getAllSkinLen();
      this.pageIndex = Number.isInteger(this.node.page_idx) ? this.node.page_idx : 0;
      this.ttPage = Number.isInteger(this.node.page_total) ? this.node.page_total : 0;
      this.draw_page_list();
   },
   // 绘制一页中节点列表
   draw_page_list() {
      // 不是最后一页，或者最后一页刚好可以渲染满，则使用一页的长度，否则使用余数。
      let len = this.pageIndex < this.ttPage - 1
         || this.list_len % this.page_len === 0
         ? this.page_len
         : this.list_len % this.page_len;
      // step 3 循环添加
      for (let i = 0; i < len; i++) {
         let item_idx = this.pageIndex * this.page_len + i;
         this.create_item(item_idx, i);
      }
   },

   // 创建一个关卡按钮
   create_item(item_idx, i) {
      let item_node = null;
      if (i === 0) {
         item_node = this.itemPre;
         this.initItemNode(item_idx, item_node);
      } else {
         item_node = cc.instantiate(this.itemPre);
         this.initItemNode(item_idx, item_node);
         item_node.parent = this.node;
      }
   },
   initItemNode(item_idx, item_node) {
      item_node.item_idx = item_idx;
      let comp = item_node.getComponent('skinItem');
      comp && typeof comp._init === 'function' && comp._init(item_idx);

   }
})