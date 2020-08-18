/*
 * @Author: Chen Li Xi
 * @Description: 
 */
let BaseAdvB = require('baseAdvB');
cc.Class({
   extends: BaseAdvB,

   properties: {},
   start() {
      this._getAdv(_allAdvInfo => {
         
         if (Array.isArray(_allAdvInfo)) {
            let node = this._createBtn(_allAdvInfo[0], 0);
            if (node instanceof cc.Node) {
               node.parent = this.node;
            }
         } else {
            this.node.active = false;
         }
      });
   },
});