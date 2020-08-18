let _minScale = 0.68;
cc.Class({
   extends: cc.Component,

   properties: {
      indexLabel: cc.Label, // 第几关数字
      nCondit: cc.Node,
      nLockNum: cc.Label,
   },

   onLoad() { },
   _init() {
      this.updateIdx();
   },
   /**
    * 更新项目显示数据
    */
   updateItem() {
      let idx = this.node.list_idx;
      this.lvData = G_chInfo.getLevelDataToIndex(idx);
      if (this.lvData === null) return;
      // console.log('更新子节点信息', this.node.list_idx, this.lvData);
      let flag = this.lvData.flag;
      G_chSdk.getFrameByName(flag).then(frame => {
         this.nCoverPlot.spriteFrame = frame;
      }).catch(() => {

      });
      // 更新锁定信息
      this.updateLockCond();
   },
   // 更新锁定信息
   updateLockCond() {
      let starGem = this.lvData['common'].split('|');
      this.needStar = starGem[0]; // 解锁需要的星星
      this.totalStar = G_chInfo.getTotalStar(); // 已得到总星星数

      if (this.needStar <= this.totalStar) {
         if (this.lvData.buy == '0') {
            G_chSdk.hideThatNode(this.nCondit);
         } else {
            // 当未解锁时查看玩家是否已经购买
            let buyStatus = G_chInfo.getCurBuySing(this.lvData.flag).split(',');
            let isBuy = buyStatus[0];
            if (isBuy == 1) {
               G_chSdk.hideThatNode(this.nCondit);
            }
         }
      } else {
         // 当未解锁时查看玩家是否已经购买
         G_chSdk.showThatNode(this.nCondit);
         if (this.nLockNum) {
            this.nLockNum.string = this.totalStar + '/' + this.needStar;
         }
      }
   },




   updateIdx() {
      if (this.indexLabel && Number.isInteger(this.node.level_index)) {
         this.indexLabel.string = this.node.level_index;
      }
   },
   onClick() {
      if (Number.isInteger(this.node.level_index)) {
         G_chInfo.setCurrLevel(this.node.level_index - 1);
         G_UIManager.showUI("gameScene");
      }
   }



});
