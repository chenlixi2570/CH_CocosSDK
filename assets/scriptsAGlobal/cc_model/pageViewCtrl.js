
// 一页一页的滚动，
cc.Class({
   extends: cc.Component,

   properties: {
      itemPre: cc.Prefab,
      listDataCB: {
         default: null,
         type: cc.Component.EventHandler,
         tooltip: '列表数据保存在对象中，属性total表示总数，curr表示显示页面'
      },
      isHorizontal: {
         default: true,
         tooltip: '滚动方向是横向滚动吗，默认是，false 则为纵向滚动'
      },
      indicator: cc.PageViewIndicator,
      nextBtn: cc.Node,
      prevBtn: cc.Node,
   },
   onLoad() {
      if (
         this.itemPre instanceof cc.Prefab &&
         this.listDataCB instanceof cc.Component.EventHandler
      ) {
         this._init_page();
         this.addBtnClick();
      }
      else {
         console.warn('**滚动页面的子节点预制件是必需的');
      }
   },
   // 通过节点对象传递数据 数据保存在节点的 list_data 属性中
   // 属性的值会是 数组或整数，
   // 所有页面
   _init_page() {
      this.list_data = G_chSdk.emitEventHandler(this.listDataCB);
      let len = this.list_data && Number.isInteger(this.list_data.total) ? this.list_data.total : 0;
      let curIdx = this.list_data && Number.isInteger(this.list_data.curr) ? this.list_data.curr : 0;
      this.ttPage = len >= 0 ? len : 0; // 总页数
      console.log('总页数', this.ttPage);

      this.pageWH = cc.instantiate(this.itemPre).getContentSize();
      this.node.setContentSize(this.pageWH);

      this.pageview = this.add_pageview_comp();
      for (let i = 0; i < this.ttPage; i++) {

         let page = this.create_page(i);
         this.pageview.addPage(page);
      }
      if (curIdx === 0) {
         this.lazyLoad(curIdx);
      }
      else if (curIdx > 0) {
         this.pageview.scrollToPage(curIdx, 0.5);
      }
   },

   // 添加滚动组件 参数是页总数
   add_pageview_comp() {
      let pageview = this.node.addComponent(cc.PageView);
      let eventHandler = this.addEventHandler(pageview);
      pageview.content = this.create_content();
      pageview.bounceDuration = 0.2;
      pageview.brake = 0.2;
      pageview.sizeMode = cc.PageView.SizeMode.Unified;
      if (this.isHorizontal) {
         pageview.direction = cc.PageView.Direction.Horizontal;
      } else {
         pageview.direction = cc.PageView.Direction.Vertical;
      }
      pageview.indicator = this.indicator;
      pageview.pageEvents.push(eventHandler);

      return pageview;
   },
   // 增加滑动到位事件监听
   addEventHandler() {
      var eventHandler = new cc.Component.EventHandler();
      eventHandler.target = this.node;
      eventHandler.component = "pageViewCtrl";
      eventHandler.handler = "onPageEvent";
      eventHandler.customEventData = "";

      return eventHandler;
   },
   // 监听滚动结束事件，返回当前是第几页。 e 是 cc.PageView 的实例
   onPageEvent(e) {
      let curr_page = e.getCurrentPageIndex();
      // console.log(curr_page, '当前页号');
      this.toggleActive();
      this.lazyLoad(curr_page);
   },
   // 创建放滚动页面的父节点，该节点是滚动的目标节点，会溢出宽或高
   create_content() {
      let content = new cc.Node('content');
      let width, height;
      if (this.isHorizontal) {
         [width, height] = [this.pageWH.width * this.ttPage, this.pageWH.height];
         content.anchorX = 0;
         content.x = - this.pageWH.width * this.node.anchorX;
      } else {
         [width, height] = [this.pageWH.width, this.pageWH.height * this.ttPage];
         content.anchorY = 1;
         content.y = this.pageWH.height * this.node.anchorY;
      }

      content.setContentSize(width, height);
      this.node.addChild(content);
      return content;
   },
   // 创建一页 参数为第几页 从0开始计数
   create_page(i) {
      // let page = new cc.Node('page');
      let page = cc.instantiate(this.itemPre);
      let x, y;
      if (this.isHorizontal) {
         [x, y] = [this.pageWH.width * i + this.pageWH.width / 2, 0];
      } else {
         [x, y] = [0, -(this.pageWH.height * i + this.pageWH.height / 2)];
      }

      if (CC_DEBUG) {
         // 给页面加个随机颜色的背景
         page.color = cc.color(G_chSdk.random(0, 255), G_chSdk.random(0, 255), G_chSdk.random(0, 255));
      }

      // page.setContentSize(this.pageWH.width, this.pageWH.height);
      page.setPosition(x, y);
      page.active = false;
      page.page_idx = i;
      page.page_total = this.ttPage;
      return page;
   },


   // 只渲染当前页、前一页与后一页，减轻渲染压力
   // 不参加渲染的节点使用active属性隐藏，减少节点创建与销毁的性能开销
   lazyLoad(pageIndex) {
      if (pageIndex < 0 || pageIndex > this.ttPage - 1) return;
      let pages = this.pageview.getPages();
      Array.isArray(pages) && pages.forEach((item, i) => {
         if (item instanceof cc.Node) {
            if (
               i === pageIndex - 1 ||
               i === pageIndex ||
               i === pageIndex + 1
            ) {
               G_chSdk.showThatNode(item);
            }
            else {
               G_chSdk.hideThatNode(item);
            }
         }
      });

   },

   // 增加上一页下一页按钮
   addBtnClick() {
      if (!this.nextBtn || !this.prevBtn) return;
      let nextButton = this.nextBtn.addComponent(cc.Button);
      let prevButton = this.prevBtn.addComponent(cc.Button);
      nextButton.node.on('click', () => {
         let curr_page = this.pageview.getCurrentPageIndex();
         if (curr_page == this.ttPage - 1) return; // 到最后一页
         curr_page += 1;
         this.pageview.scrollToPage(curr_page, 0.5);
      }, this);
      prevButton.node.on('click', () => {
         let curr_page = this.pageview.getCurrentPageIndex();
         if (curr_page == 0) return; // 到首页
         curr_page -= 1;
         this.pageview.scrollToPage(curr_page, 0.5);
      }, this);
      this.toggleActive();
   },
   toggleActive() {
      if (!this.nextBtn || !this.prevBtn) return;
      let curr_page = this.pageview.getCurrentPageIndex();
      if (curr_page == 0) {
         this._fadeOutMove(this.prevBtn);
      } else if (!this.prevBtn.active) {
         this._fadeInMove(this.prevBtn);
      }
      if (curr_page == this.ttPage - 1) {
         this._fadeOutMove(this.nextBtn);
      } else if (!this.nextBtn.active) {
         this._fadeInMove(this.nextBtn);
      }
   },
   _fadeInMove(node) {
      if (!node) return;
      node.stopAllActions();
      node.opacity = 0;
      node.active = true;
      node.runAction(
         cc.fadeIn(0.3)
      );
   },
   _fadeOutMove(node) {
      if (!node) return;
      node.stopAllActions();
      node.opacity = 255;
      node.runAction(
         cc.sequence(
            cc.fadeOut(0.3),
            cc.callFunc(() => {
               node.active = false;
            })
         )
      );
   }

});