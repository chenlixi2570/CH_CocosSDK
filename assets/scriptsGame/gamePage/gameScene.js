/*
 * @Author: Chen Li Xi
 * @Description: 
 */
let Cls_BasePopup = require("base_popup");

cc.Class({
   extends: Cls_BasePopup,

   properties: {},
   onShowFinished(type) {
      console.log('进入游戏场景');
   },
   onLoad() {
      // this.resetWindow();
      this.listernerEvent();
      G_chSdk.registerBtnClick(this, 'btnClose', this.onClose);
   },
   resetWindow() {
      // 重置窗口尺寸，有物理组件对 widget 支持不好
      let wh = cc.view.getVisibleSizeInPixel();
      console.log('屏幕尺寸', wh);
      let nMask = G_chSdk.seekNodeByName(this.node, 'Mask');
      nMask instanceof cc.Node && nMask.setContentSize(wh);
   },
   start() {
      G_GameFlow.gameStart();
      G_Reportor.reportLevelStart(); // 微信阿拉丁上报关卡开始
      G_chSdk.dispatchEvent(G_Const.EventName.GAME_ING);
   },

   onDestroy() {
      G_chSdk.removeEventListener(
         G_Const.EventName.GAME_FINISH,
         this.gameFinish,
         this
      );
      G_chSdk.removeEventListener(
         G_Const.EventName.EASTER_FAIL,
         this.easterFail,
         this
      );
      G_chSdk.removeEventListener(
         G_Const.EventName.GAME_DIE,
         this.gameDie,
         this
      );
   },
   listernerEvent() {
      G_chSdk.addEventListener(
         G_Const.EventName.GAME_FINISH,
         this.gameFinish,
         this
      );
      G_chSdk.addEventListener(
         G_Const.EventName.EASTER_FAIL,
         this.easterFail,
         this
      );
      G_chSdk.addEventListener(
         G_Const.EventName.GAME_DIE,
         this.gameDie,
         this
      );
   },
   // 游戏完成 state 为 true 表示游戏成功，false 游戏失败
   gameFinish(state) {
      this.reportAld(state);
      if (G_Const.IssuePlat === 'wx') {
         // this.gameFinishCb();
         // return;
         G_Strategy.doAdvMgr('canShowExit', isShow => {
            console.log('是否出退出页广告', isShow);
            if (isShow) {
               G_UIManager.showUI('exitAdv', () => {
                  this.gameFinishCb();
               });
            }
            else {
               this.gameFinishCb();
            }
         });
      }
      else if (G_Const.IssuePlat === 'qq' && state) {
         G_Strategy.doAdvMgr('isShowFastClick',
            isShow => {
               console.log('==是否显示宝箱误触', isShow);
               if (isShow) {

                  G_UIManager.showUI('GemCase', () => {
                     this.gameFinishCb();
                  });
               }
               else {
                  this.gameFinishCb();
               }
            });
      }
      else {
         this.gameFinishCb();
      }
   },
   gameFinishCb() {
      G_UIManager.hideUI('gameScene');
      G_UIManager.showUI("gameEnd");
   },
   // 复活失败，游戏失败
   easterFail() {
      this.reportAld(false); // 微信阿拉丁上报关卡失败

      if (G_Const.IssuePlat === 'wx') {
         G_Strategy.doAdvMgr('canShowExit', statu => {
            console.log('==是否出退出页广告', statu);
            if (statu) {
               G_UIManager.showUI('exitAdv', () => {
                  this.easterFailCb();
               });
            }
            else {
               this.easterFailCb();
            }
         });
      }
      else if (G_Const.IssuePlat === 'qq') {
         G_Strategy.doAdvMgr('isShowFastClick',
            isShow => {
               console.log('==是否显示快速点击误触', isShow);
               if (isShow) {
                  G_UIManager.showUI('fastClick', () => {
                     this.easterFailCb();
                  });
               }
               else {
                  this.easterFailCb();
               }
            });
      }
      else {
         this.easterFailCb();
      }
   },
   easterFailCb() {
      G_UIManager.hideUI('gameScene');
      G_UIManager.showUI("gameEnd");
   },
   // 角色死亡、中途失败
   gameDie() {
      this.gameDieCb();
      return;
      if (G_Const.IssuePlat === 'wx') {
         this.easterFail();
      }
      else {
         this.gameDieCb();
      }
   },
   gameDieCb() {
      G_UIManager.showUI("easter");
   },
   onGameEnd() {
      G_UIManager.hideUI('gameScene');
      G_UIManager.showUI('gameEnd');
   },
   // 返回首页
   onClose() {
      G_UIManager.hideUI('gameScene');
      G_UIManager.showUI('indexPage');
   },

   reportAld(isSucc) {
      G_GameFlow.gameEnd(isSucc);
      if (isSucc) {
         G_Reportor.reportLevelStart('complete'); // 微信阿拉丁上报关卡成功
      }
      else {
         G_Reportor.reportLevelStart('fail'); // 微信阿拉丁上报关卡失败
      }
   }

});
