/**
 * 游戏场景控制
 */
let PlayAnimate = require('playAnimate');
cc.Class({
   extends: cc.Component,
   properties: {
   },
   onLoad() {
      this.listenerEv();
      this.playAudio();
      this.initLvData();
      G_chSdk.registerBtnClick(this, 'btnReset', this.onGameReset);
      // G_chSdk.registerBtnClick(this, 'btnNext', this.onGameNext);
   },

   initLvData() {
      require('handleLevelData').initData();
      return;
      let lvData = G_chInfo.getLevelData();
      require('polyboolMgr').initLvData(lvData);
      require('propMgr').initPropData(lvData);
   },
   // 重置游戏场景，重新开始
   onGameReset() {
      if (G_Const.IssuePlat === 'wx') {
         G_UIManager.showUI('fullAdvB', () => {
            this.gameResetRun();
         });
      }
      else if (G_Const.IssuePlat === 'qq') {
         G_Strategy.doAdvMgr('showBoxAd', () => {
            this.gameResetRun();
         });
      }
      else {
         this.gameResetRun();
      }
   },
   onGameNext() {
      console.log('==跳过此关');
      G_chInfo.addLatestLevel();
      G_chInfo.setCurrLevelToNext();
      G_UIManager.hideUI('gameScene');
      G_UIManager.showUI('gameScene');
   },
   // 继续游戏逻辑实现
   gameResetRun() {
      G_UIManager.hideUI('gameScene');
      G_UIManager.showUI('gameScene');
   },
   // 复活成功继续事件回调
   gameAgain() {
      // this.onGameReset();
   },
   // 角色死亡
   gameDie() {
      G_chSdk.dispatchEvent('stop_drive'); // 结束横向运动
      this.stopAudio();
   },
   test2() {
      G_chSdk.dispatchEvent('start_drive'); // 开始横向运动
   },
   onDestroy() {
      this.stopAudio();
      this.removeEv();
   },
   listenerEv() {
      G_chSdk.addEventListener(
         G_Const.EventName.GAME_AGAIN,
         this.gameAgain,
         this
      );
      G_chSdk.addEventListener(
         G_Const.EventName.GAME_DIE,
         this.gameDie,
         this
      );
      // G_chSdk.addEventListener(
      //    G_Const.EventName.CH_TNT_BOMB,
      //    this.playBomb,
      //    this
      // );
      G_chSdk.addEventListener('test_btn2', this.test2, this);
   },
   removeEv() {
      G_chSdk.removeEventListener(
         G_Const.EventName.GAME_AGAIN,
         this.gameAgain,
         this
      );
      G_chSdk.removeEventListener(
         G_Const.EventName.GAME_DIE,
         this.gameDie,
         this
      );
      // G_chSdk.removeEventListener(
      //    G_Const.EventName.CH_TNT_BOMB,
      //    this.playBomb,
      //    this
      // );
      G_chSdk.removeEventListener('test_btn2', this.test2, this);
   },

   playAudio() { },
   stopAudio() { },
   // 播放爆炸动画 pos 是世界坐标
   playBomb(pos) {
   },


});