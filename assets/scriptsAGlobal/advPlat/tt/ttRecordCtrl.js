
/**
 * 头条平台监听游戏流程
 * 开启自动录屏
 */
let RecordMgr = require('tt_record').getInstance();

cc.Class({
   extends: cc.Component,
   properties: {},
   onLoad() {
      if (G_Const.IssuePlat === 'tt') {
         require('tt_record').getInstance()._init();
         this.listenerEv();
      }
   },
   onDestroy() {
      if (G_Const.IssuePlat === 'tt') {
         this.removeEv();
      }
   },
   listenerEv() {
      // 音乐播放，关卡开始
      this.gamePlay = function () {
         RecordMgr.start();
      }.bind(this);
      G_chSdk.addEventListener(G_Const.EventName.GAME_ING, this.gamePlay);
      // 关卡结束，音乐播放完毕
      this.gameFinish = function () {
         RecordMgr.stop();
      }.bind(this);
      G_chSdk.addEventListener(G_Const.EventName.GAME_FINISH, this.gameFinish);
      // 关卡结束，音乐未播放完毕
      this.easterFaill = function () {
         console.log('玩家未选择复活，关卡结束');

         RecordMgr.stop();
      }.bind(this);
      G_chSdk.addEventListener(G_Const.EventName.EASTER_FAIL, this.easterFaill);
      // 关卡中失败，询问是否复活
      this.gameDie = function () {
         // RecordMgr.pause();
         RecordMgr.stop();
      }.bind(this);
      G_chSdk.addEventListener(G_Const.EventName.GAME_DIE, this.gameDie);
      // 复活成功，游戏继续
      this.gameAgain = function () {
         RecordMgr.resume();
      }.bind(this);
      G_chSdk.addEventListener(G_Const.EventName.GAME_AGAIN, this.gameAgain);

   },
   removeEv() {
      G_chSdk.removeEventListener(G_Const.EventName.GAME_FINISH, this.gameFinish);
      G_chSdk.removeEventListener(G_Const.EventName.EASTER_FAIL, this.easterFaill);
      G_chSdk.removeEventListener(G_Const.EventName.GAME_DIE, this.gameDie);
      G_chSdk.removeEventListener(G_Const.EventName.GAME_AGAIN, this.gameAgain);
      G_chSdk.removeEventListener(G_Const.EventName.GAME_ING, this.gamePlay);
   }
});