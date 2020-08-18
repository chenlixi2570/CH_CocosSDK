/*
 * @Author: Chen Li Xi
 * @Description: 游戏首页测试各弹窗按钮
 */

let ccAction = require('cc_action').getInstance();
cc.Class({
   extends: cc.Component,

   properties: {
      aNode: cc.Node,
      bNode: cc.Node,
      baseAtlas: cc.SpriteAtlas, // 常用的动作动画图片放在该图集中，按标识区分
   },

   onLoad() {
      this.registerBtnClick();
   },
   // 结果页返回定位到最新位置
   registerBtnClick() {
      G_chSdk.registerBtnClick(this, 'gameOver', this.gameOver);
      G_chSdk.registerBtnClick(this, 'anyTest', this.anyTest);
      G_chSdk.registerBtnClick(this, 'gameEnd', this.gameEnd);
      G_chSdk.registerBtnClick(this, 'easter', this.easter);
      G_chSdk.registerBtnClick(this, 'qqFastClick', this.qqFastClick);
      G_chSdk.registerBtnClick(this, 'qqGemCase', this.qqGemCase);
      G_chSdk.registerBtnClick(this, 'setting', this.setting);
      G_chSdk.registerBtnClick(this, 'sign', this.sign);
      G_chSdk.registerBtnClick(this, 'skin', this.skin);
      G_chSdk.registerBtnClick(this, 'showToast', this.onShowBuy);
      G_chSdk.registerBtnClick(this, 'toLv1Scene', this.toLv1Scene);
      G_chSdk.registerBtnClick(this, 'levelSelect', this.levelSelect);
   },
   // 任意功能测试
   anyTest() {
      // let frames = G_chSdk.get_frames(this.baseAtlas, 'block', false);
      // ccAction.createRain(frames[0])
      // console.log(G_GameMove.sparyMove);
      return;
      G_GameMove.coinMove('coin', this.bNode, this.aNode);
      return;
      G_Strategy.doAdvMgr('canShowExit', statu => { });
      return;
      G_UIManager.showUI('exitAdv');
      return;
      G_chInfo.setCurrLevel(5);
      return;
      // 测试取动态资源中的图片
      let frame = G_chSdk.getFrameByName('FF1');
      frame && frame.then(img => {
         console.log(img);

      });
   },
   //  显示签到弹窗
   gameOver() {
      // let ccAction = require('cc_action').getInstance();
      // ccAction.createIgnite(this.frame);
      // return;
      G_UIManager.showUI("gameOver");
   },
   // 显示设置弹窗
   gameEnd() {
      G_UIManager.showUI("gameEnd");
   },
   easter() {
      G_UIManager.showUI("easter");
   },
   setting() {
      G_UIManager.showUI('setting');
   },
   sign() {
      G_UIManager.showUI('sign');
   },
   skin() {
      G_UIManager.showUI('skin');
   },
   onShowBuy() {
      G_UIManager.showUI('showToast', '测试 showToast 文字要多一点，这么多够了吗，不够再加点可不可以...');
   },
   qqFastClick() {
      G_UIManager.showUI('fastClick');
   },
   qqGemCase() {
      G_UIManager.showUI('GemCase');
   },
   toLv1Scene() {
      cc.director.loadScene('lv1');
   },
   levelSelect() {
      G_UIManager.showUI('levelSelect');
   }




});
