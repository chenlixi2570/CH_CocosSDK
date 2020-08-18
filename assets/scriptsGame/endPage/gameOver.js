/*
 * @Author: Chen Li Xi
 * @Description: 
 */
let Cls_BasePopup = require("base_popup");
let GameOver = cc.Class({
   extends: Cls_BasePopup,

   properties: {
      coinNode: cc.Node,
      gemNode: cc.Node,
      _clickLock: false, // 普通收集点击锁
      _coinCount: 0, // 本次过关获得金币数
      _gemCount: 0, // 本次过关获得金币数
   },

   onLoad() {
      G_chSdk.registerBtnClick(this, 'Close', this.onClose);
   },

   onShowFinished() {
      console.log('游戏结算');
      this._clickLock = false;
      G_chInfo.addTodayCount(); // 本生命周期过关次数
      this.lvData = G_chInfo.getLevelData();
      this.saveGainStar();
   },
   onClose() {
      if (this._clickLock) return;
      this._clickLock = true;
      let pro = this.saveGemAndCoin();
      pro.then(() => {
         // console.log('收集金币与钻石的动画结束');
         this.saveNum(1);
      });
   },
   saveNum(n = 1) {
      this._coinCount > 0 && G_chInfo.plusCoin(this._coinCount * n);
      this._gemCount > 0 && G_chInfo.plusGem(this._gemCount * n);
      G_UIManager.hideUI('gameOver');
      G_UIManager.showUI('gameEnd');
   },
   onDoubleSave() {
      if (this._clickLock) return;
      this._clickLock = true;
      let pro = this.saveGemAndCoin();
      pro.then(() => {
         // console.log('收集金币与钻石的动画结束');
         this.saveNum(3);
      });
   },
   saveGemAndCoin() {
      let proCoin = null;
      let proGem = null;
      if (this._coinCount > 0 && this.coinNode) {
         proCoin = new Promise((resolve, reject) => {
            G_chSdk.dispatchEvent(
               G_Const.EventName.EN_ADD_MOVE,
               'coin',
               this.coinNode,
               () => {
                  resolve();
               });
         });
      }
      if (this._gemCount > 0 && this.gemNode) {
         proGem = new Promise((resolve, reject) => {
            G_chSdk.dispatchEvent(
               G_Const.EventName.EN_ADD_MOVE,
               'gem',
               this.gemNode,
               () => {
                  resolve();
               });
         });
      }
      return Promise.all([proCoin, proGem]);
   },

   // 保存收集的星星到用户数据
   saveGainStar() {
      let count = this.starCount;
      let flag = this.lvData.flag;
      let oldVal = G_chInfo.getCurLevelStar(flag);
      // G_chInfo.setLevelStar(flag, oldVal.join());
   },
   onCancel() {
      if (G_Const.IssuePlat !== 'wx') {
         return;
      }
      G_Strategy.doAdvMgr('hideBanner');
      G_UIManager.showUI('fullAdvB', () => {
         G_Strategy.doAdvMgr('showBanner', 'wx');
      });
   },
});
