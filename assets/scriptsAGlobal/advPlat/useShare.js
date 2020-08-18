/*
 * @Author: Chen Li Xi
 * @Description: 
 */
// 只分享
cc.Class({
   extends: cc.Component,

   properties: {
      succCB: {
         default: [],
         type: cc.Component.EventHandler,
         tootip: '分享任务成功回调'
      },
      failCB: {
         default: [],
         type: cc.Component.EventHandler,
         tootip: '分享任务失败回调'
      },
      clickCB: {
         default: [],
         type: cc.Component.EventHandler,
         tootip: '点击按钮立即执行的回调'
      },
   },
   editor: CC_EDITOR && {
      requireComponent: cc.Button,
   },
   onLoad() {
      this.node.on('click', this.loadVideoAdv, this);
   },
   loadVideoAdv() {
      // console.log('==分享按钮被点击');
      this.clickCB.forEach(item => {
         item.emit();
      });

      G_Strategy.doAdvMgr('share',
         'ShareList',
         null,
         true, (statu) => {
            // console.log('==分享状态', statu);
            if (statu) {
               this.succCB.forEach(item => {
                  item.emit();
               });
            } else {
               this.failCB.forEach(item => {
                  item.emit();
               });
            }
         });
   },
   failToast() {
      G_UIManager.showUI('showToast', '请分享到不同的群');
   }
});