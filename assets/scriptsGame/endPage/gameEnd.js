/*
 * @Author: Chen Li Xi
 * @Description: 游戏结算页
 */
let Cls_BasePopup = require("base_popup");
let TTShareVideo = require('ttShareVideo');
let GameEnd = cc.Class({
   extends: Cls_BasePopup,

   properties: {
      nStarWrap: cc.Node,
      cTTShare: {
         default: null,
         type: TTShareVideo
      },
      _clickLock: false, // 快速点击锁
   },

   onLoad() {
      G_chSdk.registerBtnClick(this, 'nextLevel', this.onNextBtn);
      G_chSdk.registerBtnClick(this, 'Close', this.onIndexPage);
      G_chSdk.registerBtnClick(this, 'resetStart', this.resetStart);
   },
   onEnable() {
      this._clickLock = false;
      // G_UIManager.showUI('nativeAdv');
   },
   onShowFinished() {
      console.log('游戏结果页分流');
      // isFail 为 true 表示未复活，游戏失败结束
      if (G_chSdk.isTT()) {
         let isFail = G_GameFlow.isGameFail();
         this.cTTShare && this.cTTShare.toggleAutoNode(!isFail);
      }
   },

   //  下一关按钮点击
   onNextBtn(e) {
      if (G_chSdk.isTT()) {
         // 头条平台自动分享录频功能
         let isNext = this.cTTShare && this.cTTShare.doShare();
         if (isNext) return;
      }

      if (this._clickLock) return;
      this._clickLock = true;

      this.nextStart(e);
   },
   onIndexPage() {
      G_GameFlow.isGameSuccess() && G_chInfo.setCurrLevelToNext();
      G_UIManager.hideUI('gameEnd');
      if (G_Const.IssuePlat === 'wx') {
         G_UIManager.showUI('fullAdvB', () => {
            G_UIManager.showUI('indexPage', 'gameEnd');
         });
      }
      else {
         G_UIManager.showUI('indexPage', 'gameEnd');
      }
   },
   nextStart(e) {
      this.startGame();
      // this.startMove(e);
   },
   // 重新开始
   resetStart(e) {
      if (this._clickLock) return;
      this._clickLock = true;
      this.startGame();
      // this.startMove(e);
   },
   // 检查体力是否足够
   startMove(e) {
      if (G_chInfo.canMinusPhysical(G_chInfo.getCfgInt('PHYS_LEVEL'))) {
         G_chInfo.minusPhysical(G_chInfo.getCfgInt('PHYS_LEVEL'));
         G_chSdk.dispatchEvent(
            G_Const.EventName.EN_SUB_MOVE,
            'physcial',
            e.currentTarget,
            () => {
               this.startGame();
            });
      } else {
         this._clickLock = false;
         G_UIManager.showUI('gainPhys');
      }
   },
   onCancel() {
      if (G_Const.IssuePlat !== 'wx') return;
      G_Strategy.doAdvMgr('hideBanner');
      G_UIManager.showUI('fullAdvB', () => {
         G_Strategy.doAdvMgr('showBanner', 'wx');
      });
   },
   // 将当前关卡数据定位到下一关，然后加载关卡场景
   startGame() {
      G_GameFlow.isGameSuccess() && G_chInfo.setCurrLevelToNext();
      G_UIManager.hideUI('gameEnd');
      if (G_Const.IssuePlat === 'wx') {
         G_UIManager.showUI('fullAdvB', () => {
            G_UIManager.showUI('gameScene');
         });
      }
      else {
         G_UIManager.showUI('gameScene');
      }
   },

   updateStar(count) {
      if (!Number.isInteger(count) || !this.nStarWrap) return;
      this.nStarWrap.children.forEach((item, i) => {
         if (item instanceof cc.Node) {
            let ligt = G_chSdk.seekNodeByName(item, 'starGet');
            if (ligt instanceof cc.Node) {
               if (i < count) {
                  ligt.active = true;
               } else {
                  ligt.active = false;
               }
            }
         }
      });
   }


});
