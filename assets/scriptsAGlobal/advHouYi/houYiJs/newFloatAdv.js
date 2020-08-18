/**
 * 浮动广告
 */
let BaseAdvB = require('baseAdvB');
// 动作类型
let AdvAction = cc.Enum({
   flash: 0,
   tada: 1,
});
cc.Class({
   extends: BaseAdvB,

   properties: {
      advAction: {
         type: cc.Enum(AdvAction),
         default: AdvAction.tada,
         tooltip: '浮动广告动作，flash: 眨眼动作，tada:缩放晃动'
      },
      _isFirst: true,
   },
   onLoad() {
      this.indexAdv = 0; // 默认显示第1个广告
   },
   /**
   * 每次显示时随机乱序广告列表
   * 此时重新设置广告的advInfo可以改变广告内容
   */
   onEnable() {
      if (this._isFirst) return;
      let len = this.node.children.length;
      let dataLen = this._allAdvInfo.length;
      let dataIdxs = [];
      for (let j = 0; j < dataLen; j++) {
         dataIdxs.push(j);
      }
      // 随机排序
      dataIdxs.sort((a, b) => Math.random() - 0.5);
      for (let i = 0; i < len; i++) {
         let nBtn = this.node.children[i];
         let idx = dataIdxs[i % dataLen];
         let advInfo = this._allAdvInfo[idx];
         nBtn.advInfo = advInfo;
         typeof nBtn.updateNode === 'function' && nBtn.updateNode();
      }
      console.log('==浮动广告随机排序', len, dataIdxs);
   },
   start() {
      this._getAdv(_allAdvInfo => {
         if (Array.isArray(_allAdvInfo)) {
            this.draw_advlist();
         } else {
            this.node.active = false;
         }
         this._isFirst = false;
      });
   },
   // 渲染广告 
   draw_advlist() {
      this.clildNodes = this._createAllBtns();
      let advLen = this.clildNodes.length;
      this.node.children.forEach((item, i) => {
         let idx = i % advLen;
         let btn = this.clildNodes[idx];
         if (i >= advLen) {
            let advInfo = this._allAdvInfo[idx];
            btn = this._createBtn(advInfo, idx);
         }

         if (btn instanceof cc.Node) {
            btn.parent = this.node;
            btn.x = item.x;
            btn.y = item.y;
            this.add_action(btn);
         }
         G_chSdk.hideThatNode(item);
      });

      // this.clildNodes.forEach((btn) => {
      //    btn.active = false;
      // });
      // let childAdv = this.clildNodes[this.indexAdv];
      // if (childAdv) {
      //    childAdv.active = true;
      // }

   },
   change_adv() {
      return;
      G_chSdk.hideThatNode(this.clildNodes[this.indexAdv]);
      this.indexAdv = G_chSdk.random(0, this.clildNodes.length - 1);
      G_chSdk.showThatNode(this.clildNodes[this.indexAdv]);
   },

   add_action(node) {
      switch (this.advAction) {
         case AdvAction.flash: // 眨眼动作
            this.flashAction(node);
            break;
         case AdvAction.tada: // 缩放晃动
            G_chAction.tadaAction(node, () => {
               this.change_adv();
            });
            break;
      }
   },
   // 眨眼动作
   flashAction(node, delayTime = 1.6) {
      if (typeof node !== 'object'
         || typeof node.runAction !== 'function'
         || typeof node.stopAllActions !== 'function') return;
      let time = 1.2;
      node.stopAllActions();
      node.runAction(
         cc.repeatForever(
            cc.sequence(
               cc.fadeOut(time * 0.25), // 25
               cc.fadeIn(time * 0.25), // 50
               cc.fadeOut(time * 0.25), // 75
               cc.fadeIn(time * 0.25), // 100          
               cc.delayTime(delayTime)
            )
         )
      );
   },
});