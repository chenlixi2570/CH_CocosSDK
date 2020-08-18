// 金币 钻石 体力增减动画

cc.Class({
   extends: cc.Component,
   properties: {
      moveType: '', // coin gem physcial 
   },
   onLoad() {
      this.listernerEvent();
   },
   onDestroy() {
      G_chSdk.removeEventListener(
         G_Const.EventName.EN_ADD_MOVE,
         this.addMove,
         this
      );
      G_chSdk.removeEventListener(
         G_Const.EventName.EN_SUB_MOVE,
         this.subMove,
         this
      );
   },
   listernerEvent() {
      G_chSdk.addEventListener(
         G_Const.EventName.EN_ADD_MOVE,
         this.addMove,
         this
      );
      G_chSdk.addEventListener(
         G_Const.EventName.EN_SUB_MOVE,
         this.subMove,
         this
      );
   },
   /**
    * 增加动画 从触发事件的节点动画到当前点
    * @param {string} type 
    * @param {cc.Node} emitNode 触发事件的节点
    */
   addMove(type, target, cb) {
      // 终点是当前节点
      if (type === this.moveType &&
         (target instanceof cc.Node ||
            target instanceof cc.Vec2)
      ) {
         G_GameMove.coinMove(this.moveType, target, this.node, cb);
      }
   },
   /**
    * 减少动画 从当前点动画到触发事件的节点
    * @param {string} type 
    * @param {cc.Node} emitNode 触发事件的节点
    */
   subMove(type, target, cb) {
      // 起点是当前节点
      if (type === this.moveType &&
         (target instanceof cc.Node ||
            target instanceof cc.Vec2)
      ) {
         G_GameMove.coinMove(this.moveType, this.node, target, cb);
      }
   },


});