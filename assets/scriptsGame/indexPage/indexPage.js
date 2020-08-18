/*
 * @Author: Chen Li Xi
 * @Description: 游戏首页
 */
let Cls_BasePopup = require("base_popup");


cc.Class({
   extends: Cls_BasePopup,

   properties: {},

   onLoad() {
      this.registerBtnClick();
      // console.log('节点盒子', this.node.getBoundingBox());

   },
   onEnable() {
      // console.log("==首页 onEnable", this.showArgs);
   },
   start() {
      G_chSdk.dispatchOnce(G_Const.EventName.GAME_INDEX);
      // this.startGame();
   },
   onShowFinished(type) {
      // console.log("==首页 onShowFinished", type);
   },
   // 结果页返回定位到最新位置
   registerBtnClick() {
      G_chSdk.registerBtnClick(this, 'btnSign', this.onShowSign);
      G_chSdk.registerBtnClick(this, 'btnSeting', this.onSetting);
      G_chSdk.registerBtnClick(this, 'startGame', this.onStartGame);
      G_chSdk.registerBtnClick(this, 'btnSkin', this.onShowSkin);
      // G_chSdk.registerBtnClick(this, 'rank', this.testEvent);
   },

   //  显示签到弹窗
   onShowSign() {
      G_UIManager.showUI("sign");
   },
   // 显示设置弹窗
   onSetting() {
      G_UIManager.showUI("setting");
   },
   // 测试弹窗
   testEvent(event) {
      G_UIManager.showUI('gameEnd', 100, 1, 30);
   },
   onStartGame(ev) {
      console.log('开始游戏点击');
      this.startGame();
      return; // 减体力动画
      G_chSdk.dispatchEvent(
         G_Const.EventName.EN_SUB_MOVE,
         'physcial',
         ev.currentTarget,
         () => {
            this.startGame();
         }
      );
   },
   startGame() {
      G_UIManager.hideUI('indexPage');
      G_UIManager.showUI("gameScene");
   },
   onShowMusicList() {
      G_UIManager.hideUI('indexPage');
      // G_UIManager.showUI("listMusic");
   },
   onShowSkin() {
      G_UIManager.showUI('showToast', '功能开发中...');
   },
   onCancel() {
      if (G_Const.IssuePlat !== 'wx') {
         return;
      }
      G_UIManager.showUI('fullAdvB');
   },
});
