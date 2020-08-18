cc.Class({
   extends: cc.Component,
   properties: {
      pHead: cc.Prefab,
   },
   onLoad() {
      let nHead = cc.instantiate(this.pHead);
      if (nHead instanceof cc.Node) {
         nHead.parent = this.node.parent;
         this.node.active = false;
      }
   }
})