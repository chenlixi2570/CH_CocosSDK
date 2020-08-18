// 游戏提示
cc.Class({
   extends: cc.Component,
   properties: {
      nodeTip: cc.Node,
      dotImg: cc.SpriteFrame,
      startImg: cc.SpriteFrame,
      endImg: cc.SpriteFrame,
      nHand: cc.Node, // 手动画
      _handMoveData: [], // 手动画位置数据
      _mvIdx: 0,
      _isUnlock: false,
   },
   onLoad() {
      this.listenerEv();
      this.lvData = G_chInfo.getLevelData();
      this.tipsData = this.lvData.tips && JSON.parse(this.lvData.tips);

      if (Array.isArray(this.tipsData) && this.nodeTip instanceof cc.Node) {
         // this.drawTips();
         this.getHandMoveData();
         let lvId = G_chInfo.getCurrLevel();
         if (lvId <= 4) {
            this._isUnlock = true;
            this.handMove();
         }
         else {
            G_chSdk.hideThatNode(this.nHand);
         }
      }
      else {
         G_chSdk.hideThatNode(this.nHand);
      }
   },
   onDestroy() {
      G_chSdk.removeEventListener(
         G_Const.EventName.CH_TOUCHSTART,
         this._touchStart,
         this
      );
   },
   listenerEv() {
      G_chSdk.addEventListener(
         G_Const.EventName.CH_TOUCHSTART,
         this._touchStart,
         this
      );
   },
   onTipsTaskSucc() {
      this._isUnlock = true;
      this.handMove();
   },
   /**
    * 监听手机触摸事件，当触摸点离动画指示方向的节点比较近时隐藏，播放下一个指示方向的动画
    * @param {*} ev 
    */
   _touchStart(ev) {
      if (!this._isUnlock) return;
      let pos = G_chSdk.getNodeSpacePosi(ev, this.node);
      let curTipData = this._handMoveData[this._mvIdx];
      if (Array.isArray(curTipData) && curTipData.length >= 2) {
         let center = G_chSdk.getCenterPoint(curTipData[0], curTipData[1]);
         let minDis = G_chSdk.getMag(center, pos);
         curTipData.forEach(item => {
            let dis = G_chSdk.getMag(item, pos);
            if (dis < minDis) {
               minDis = dis;
            }
         });
         console.log('触摸开始距离最小的是', center, minDis);

         if (minDis < 150) {
            this.nextHandMove();
         }
      }
   },
   /**
    * 监听手机触摸事件，当触摸点离动画指示方向的节点比较近时隐藏，播放下一个指示方向的动画
    * @param {*} ev 
    */
   _touchStartOld(ev) {
      let pos = G_chSdk.getNodeSpacePosi(ev, this.node);
      let tipWrap = this.node.children[this._mvIdx];
      if (tipWrap instanceof cc.Node && tipWrap.active) {
         let minDis = 9999;
         tipWrap.children.forEach(item => {
            let mag = G_chSdk.getMag(pos, item.position);
            if (mag < minDis) {
               minDis = mag;
            }
         });
         console.log('触摸开始距离最小的是', minDis);

         if (minDis < 150) {
            this.nextHandMove();
            G_chSdk.hideThatNode(tipWrap);
         }
      }
   },
   getHandMoveData() {
      this.tipsData.forEach(item => {
         if (item && item.tipData) {
            let tipData = JSON.parse(item.tipData);
            let handData = [];
            // console.log(tipData, 222);
            Array.isArray(tipData) && tipData.forEach(data => {
               if (G_chSdk.isObject(data)) {
                  let pos = G_chSdk.getNodePtORSz(data.pt);
                  handData.push(cc.v2(pos[0], pos[1]));
               }
            });
            this._handMoveData.push(handData);
         }
      });
      // console.log(this._handMoveData, '提示数据');
   },
   drawTips() {
      this.tipsData.forEach(item => {
         if (item && item.tipData) {
            let tipWrap = new cc.Node('tipWrap');
            let tipData = JSON.parse(item.tipData);
            let handData = [];
            // console.log(tipData, 222);
            Array.isArray(tipData) && tipData.forEach(data => {
               if (G_chSdk.isObject(data)) {
                  let node = cc.instantiate(this.nodeTip);
                  this.setSpriteFrame(node, data.imgNm);
                  let size = G_chSdk.getNodePtORSz(data.sz);
                  let pos = G_chSdk.getNodePtORSz(data.pt);
                  let scale = G_chSdk.getNodePtORSz(data.sc);
                  handData.push(cc.v2(pos[0], pos[1]));
                  if (node instanceof cc.Node) {
                     node.setPosition(pos[0], pos[1]);
                     node.setContentSize(size[0], size[1]);
                     node.setScale(scale[0], scale[1]);
                     node.rotation = data.ro;
                     node.active = true;
                     node.parent = tipWrap;
                  }
               }
            });
            tipWrap.active = false;
            tipWrap.parent = this.node;
            this._handMoveData.push(handData);
         }
      });
   },
   setSpriteFrame(node, imgNm) {
      if (node instanceof cc.Node) {
         let sprite = node.getComponent(cc.Sprite);
         if (sprite instanceof cc.Sprite) {
            if (imgNm === 'solution_start') {
               sprite.spriteFrame = this.startImg;
            }
            else if (imgNm === 'solution_dot') {
               sprite.spriteFrame = this.dotImg;
            }
            else if (imgNm === 'solution_end') {
               sprite.spriteFrame = this.endImg;
            }
         }
      }
   },
   nextHandMove() {
      this.nHand.stopAllActions();
      this._mvIdx += 1;
      G_chSdk.hideThatNode(this.nHand);
      if (this._mvIdx < this._handMoveData.length) {
         this.scheduleOnce(() => {
            this.handMove();
         }, 2);
      }
      else {
      }
   },
   handMove() {
      // let tipWrap = this.node.children[this._mvIdx];
      let curMvData = this._handMoveData[this._mvIdx];
      if (
         this.nHand instanceof cc.Node
         && Array.isArray(curMvData)
         && curMvData.length >= 2
         // && tipWrap instanceof cc.Node
      ) {
         let speed = 260; // 每秒动画距离
         let actArray = [];
         let startPos = null;
         let prevPos = null;

         curMvData.forEach((pos, i) => {
            if (i === 0) {
               prevPos = pos;
               startPos = pos;
            }
            else {
               let dis = G_chSdk.getMag(prevPos, pos);
               let time = dis / speed;
               actArray.push(
                  cc.moveTo(time, pos)
               );
               prevPos = pos;
            }
         });
         // G_chSdk.showThatNode(tipWrap);
         G_chSdk.showThatNode(this.nHand);
         actArray.push(
            cc.delayTime(0.3),
            cc.callFunc(() => {
               this.nHand.setPosition(startPos);
            })
         );
         this.nHand.setPosition(startPos);
         this.nHand.stopAllActions();
         this.nHand.runAction(
            cc.repeatForever(
               cc.sequence(actArray))
         );
      }
   },
});