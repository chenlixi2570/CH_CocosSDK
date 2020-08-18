
// gameOver 界面中间显示获得的金币与钻石数
let ShowGemUI = cc.Class({
   extends: cc.Component,
   properties: {
      coinLabel: cc.Label,
      gemLabel: cc.Label,
      coinItem: cc.Node,
      gemItem: cc.Node,
   },
   showCoinGem(coinCount, gemCount) {
      if (coinCount <= 0) {
         this.hideThatNode(this.coinItem);
      } else {
         if (this.coinLabel) {
            this.showThatNode(this.coinItem);
            this.coinLabel.string = 'x' + coinCount;
         }
      }

      if (gemCount <= 0) {
         this.hideThatNode(this.gemItem);
      } else {
         if (this.gemLabel) {
            this.showThatNode(this.gemItem);
            this.gemLabel.string = 'x' + gemCount;
         }
      }

      this.updatePosiY();
   },
   showThatNode(node) {
      if (node instanceof cc.Node && !node.active) {
         node.active = true;
      }
   },
   hideThatNode(node) {
      if (node instanceof cc.Node && node.active) {
         node.active = false;
      }
   },
   updatePosiY() {
      if (!this.coinItem || !this.gemItem) return;
      let sCoin = this.coinItem.active;
      let sGem = this.gemItem.active;
      if (sCoin && sGem) {
         this.coinItem.y = 28.5;
         this.gemItem.y = -28.5;
      } else if (!sCoin && sGem) {
         this.gemItem.y = 0;
      } else if (sCoin && !sGem) {
         this.coinItem.y = 0;
      }
   }
});