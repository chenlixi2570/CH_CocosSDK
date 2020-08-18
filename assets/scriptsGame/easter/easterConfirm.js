/*
 * @Author: Chen Li Xi
 * @Description: 
 */
let Cls_BasePopup = require("base_popup");
cc.Class({
   extends: Cls_BasePopup,

   properties: {
      coinNum: cc.Label, // 已获得金币数
      starNum: cc.Label, // 已获得星星数
      gemNum: cc.Label, // 当前关可获得钻石数
      coinNode: cc.Node,
      starNode: cc.Node,
      gemNode: cc.Node,
      nNumWrap: cc.Node,
   },

   onLoad() {
      G_chSdk.registerBtnClick(this, 'Close', this.onClose);
      // 购买一次钻石消耗的金币总数
   },
   onShowFinished(cointCount, starCount) {
      console.log('复活确认界面', cointCount, starCount);
      this.updateNum(cointCount, starCount);
      this.updateLocalt();
   },
   updateNum(cointCount, starCount) {
      if (this.coinNum) {
         if (cointCount > 0) {
            this.showThatNode(this.coinNode, -70);
            this.coinNum.string = '+' + cointCount;
         } else {
            this.hideThatNode(this.coinNode);
         }
      }

      if (this.starNum) {
         if (starCount >= 0) {
            this.showThatNode(this.starNode, 70);
            this.starNum.string = '+' + (starCount + 1);
         } else {
            this.hideThatNode(this.starNode);
         }
      }
      let gemCount = 0; // 当前关奖励的钻石数量
      if (this.gemNum) {
         if (gemCount > 0) {
            this.showThatNode(this.gemNode, 0);
            this.gemNum.string = '+' + gemCount;
         } else {
            this.hideThatNode(this.gemNode);
         }
      }
   },
   onClose() {
      this.gameOver();
   },
   // 任务完成复活
   taskSucc() {
      G_UIManager.hideUI('easterConfirm');
   },
   // 游戏失败
   gameOver() {
      G_UIManager.hideUI('easterConfirm');
      G_chSdk.dispatchEvent(G_Const.EventName.EASTER_FAIL);
   },
   showThatNode(node, y) {
      if (node instanceof cc.Node && !node.active) {
         node.y = y;
         node.active = true;
      }
   },
   hideThatNode(node) {
      if (node instanceof cc.Node && node.active) {
         node.active = false;
      }
   },
   updateLocalt() {
      if (!(this.nNumWrap instanceof cc.Node)) return;
      let nodes = [];
      this.nNumWrap.children.forEach(item => {
         if (item instanceof cc.Node && item.active) {
            nodes.push(item);
         }
      });
      if (nodes.length == 2) {
         nodes[0].y = 40;
         nodes[1].y = -40;
      }
      else if (nodes.length == 1) {
         nodes[0].y = 0;
      }

   }

});
