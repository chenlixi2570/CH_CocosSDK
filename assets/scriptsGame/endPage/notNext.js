// 没有下一关按钮
let NotNext = cc.Class({
   extends: cc.Component,
   properties: {
      nextBtn: cc.Node,
      resetBtn: cc.Node, // 重玩
      backBtn: cc.Node, // 返回
   },
   onEnable() {
      if (G_chInfo.isEndLevel()) {
         this.notNextBtn();
      } else {
         this.hasNextBtn();
      }
   },
   toggleNodeShow(active) {
      if (this.nextBtn instanceof cc.Node && this.nextBtn.active != active) {
         this.nextBtn.active = active;
      }
   },
   // 有下一曲
   hasNextBtn() {
      this.toggleNodeShow(true);
      if (this.resetBtn) {
         this.resetBtn.x = -240;
      }
      if (this.backBtn) {
         this.backBtn.x = 240;
      }
   },
   // 没有下一曲
   notNextBtn() {
      this.toggleNodeShow(false);
      if (this.resetBtn) {
         this.resetBtn.x = -160;
      }
      if (this.backBtn) {
         this.backBtn.x = 160;
      }
   }
});