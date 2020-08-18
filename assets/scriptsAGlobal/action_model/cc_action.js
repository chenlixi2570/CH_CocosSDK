/**
 * 利用 cocos 动作系统实现一些简单的动画
 */
let _instance = null;
let _parentNode = null;


class _CC_Action {
   constructor() {
      return _instance || (_instance = this);
   }

   static getInstance() {
      return _instance || (_instance = new this);
   }
   _tryParentNode() {
      if (!_parentNode) {
         _parentNode = G_chSdk.getMoveParentNode('moveParent');
      }
   }
   _getNode(pool, frame) {
      let node = null;
      if (!(this[pool] instanceof cc.NodePool)) {
         this[pool] = new cc.NodePool();
      }
      if (this[pool].size() > 0) {
         node = this[pool].get();
      } else {
         node = new cc.Node('_ccAction');
         let sprite = node.addComponent(cc.Sprite);
         if (frame instanceof cc.SpriteFrame) {
            sprite.spriteFrame = frame;
         } else if (Array.isArray(frame)) {
            let idx = G_chSdk.random(0, frame.length);
            if (frame[idx] instanceof cc.SpriteFrame) {
               sprite.spriteFrame = frame[idx];
            }
         }
      }
      return node;
   }
   /**
    * 过关胜利动画
    */
   createWinMove(frames = [], cb) {
      this._tryParentNode();
      if (!(_parentNode instanceof cc.Node)) {
         return null;
      }
      let time = 0.26, count = 0, total = 3;
      let proArr = [];
      G_Scheduler.schedule('_win_move', () => {
         let len = G_chSdk.random(3, 7);
         time = G_chSdk.randomDouble(0.1, 0.2);
         for (let i = 0; i < len; i++) {
            let node = this.createWinNode(frames);
            node.active = true;
            node.parent = _parentNode;
            let pro = this.winAction(node);
            if (pro instanceof Promise) {
               proArr.push(pro);
            }
         }
         count += 1;
         if (count === total) {
            console.log('定时器执行结束');
            Promise.all(proArr).then(() => {
               typeof cb === 'function' && cb();
            });
         }
      }, time, total);
   }
   createWinNode(frames = []) {
      let node = this._getNode('_winPool', frames);
      node.nScale = G_chSdk.randomDouble(0.5, 1.5);
      let x = G_chSdk.random(-180, 180);
      let y = G_chSdk.random(-140, 140);
      node.opacity = 255;
      node.setScale(node.nScale, node.nScale);
      node.setPosition(x, y);

      return node;
   }
   /**
    * 单个胜利节点动作
    * @param {*} cb 
    */
   winAction(node) {
      if (!(node instanceof cc.Node)) {
         return null;
      }
      let time = 1.2, dir = 40;
      let byX = node.x >= 0 ? dir : -dir;
      let byY = node.y >= 0 ? dir : -dir;
      node.stopAllActions();
      return new Promise((resolve, reject) => {
         node.runAction(
            cc.sequence(
               cc.spawn(
                  cc.moveBy(time, byX, byY),
                  cc.sequence(
                     cc.scaleTo(time / 4, node.nScale + 0.3),
                     cc.scaleTo(time / 4, node.nScale),
                     cc.scaleTo(time / 4, node.nScale + 0.25),
                     cc.scaleTo(time / 4, node.nScale),
                  )
               ),
               cc.spawn(
                  cc.moveBy(time, byX / 2, -40),
                  cc.fadeTo(time, 100),
                  cc.sequence(
                     cc.scaleTo(time / 4, node.nScale + 0.2),
                     cc.scaleTo(time / 4, node.nScale),
                     cc.scaleTo(time / 4, node.nScale + 0.16),
                     cc.scaleTo(time / 4, node.nScale),
                  )
               ),
               cc.callFunc(() => {
                  node.active = false;
                  this._winPool.put(node);
                  resolve();
               })
            )
         );
      });
   }

   /**** *****/

   /**
    * 电音枪手收集金币动画
    */
   gainCoinMove(frame, posi, target) {
      this._tryParentNode();
      if (!(_parentNode instanceof cc.Node) ||
         !(frame instanceof cc.SpriteFrame)
      ) {
         return null;
      }
      let node = this._getNode('_coin', frame);
      node.active = true;
      node.setPosition(posi.x, posi.y);
      node.parent = _parentNode;
      return this.gainCoinAction(node, target);
   }
   gainCoinAction(node, target) {
      return new Promise((resolve, reject) => {
         node.stopAllActions();
         node.opacity = 255;
         node.runAction(
            cc.sequence(
               cc.delayTime(0.2),
               cc.spawn(
                  cc.moveTo(0.6, target).easing(cc.easeIn(0.3)),
                  cc.fadeTo(0.6, 100)
               ),
               cc.callFunc(() => {
                  this._coin.put(node);
                  resolve();
               })
            )
         );
      });
   }
}

module.exports = _CC_Action;