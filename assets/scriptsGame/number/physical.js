/*
 * @Author: Chen Li Xi
 * @Description: 
 */
cc.Class({
   extends: cc.Component,

   properties: {
      timedownNode: cc.Node,
      timeNumLab: cc.Label,
   },

   onLoad() {
      this.timedownEnd();
      G_chSdk.registerBtnClick(this, this.node.name, this.onAddPhysical);
   },
   onDisable() {
      G_chSdk.removeEventListener(G_Const.EventName.EN_SECOND_RUN, this.updateTimedown, this);
      G_chSdk.removeEventListener(G_Const.EventName.EN_PHYSICAL_TIMEDOWN_END, this.timedownEnd, this);
   },
   start() {
      G_chSdk.addEventListener(
         G_Const.EventName.EN_SECOND_RUN,
         this.updateTimedown,
         this
      );

      G_chSdk.addEventListener(
         G_Const.EventName.EN_PHYSICAL_TIMEDOWN_END,
         this.timedownEnd,
         this
      );
   },
   onAddPhysical(ev) {
      G_UIManager.showUI('gainPhys');
   },
   updateTimedown(second) {
      G_chSdk.showThatNode(this.timedownNode);
      let time = G_chSdk.convertSecondToHourMinuteSecond(second);
      if (this.timeNumLab) {
         this.timeNumLab.string = time;
      }
   },
   timedownEnd() {
      G_chSdk.hideThatNode(this.timedownNode);
   }
});
