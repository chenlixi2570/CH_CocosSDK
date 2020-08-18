/*
 * @Author: Chen Li Xi
 * @Description: 同步当前关卡数字
 */

cc.Class({
   extends: cc.Component,
   properties: {

   },
   editor: CC_EDITOR && {
      requireComponent: cc.Label,
   },
   onLoad() {
      this.numLabel = this.node.getComponent(cc.Label);
   },
   onEnable() {
      this.updateNum();
   },
   updateNum() {
      if (!this.numLabel) return;
      let num = G_chInfo.getCurrLevel() + 1;
      this.numLabel.string = num;
   }

});