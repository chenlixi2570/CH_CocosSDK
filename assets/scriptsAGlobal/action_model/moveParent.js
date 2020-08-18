let poolPR = '_noodpool_'; // 对象池属性名前缀

let GameMove = cc.Class({
   extends: cc.Component,
   properties: {
      nAction: cc.Node, // 该节点渲染动作动画图片
      baseAtlas: cc.SpriteAtlas, // 常用的动作动画图片放在该图集中，按标识区分
   },
   onLoad() {
      let frames = G_chSdk.get_frames(this.baseAtlas, 'block', false);
   },
   /**
    * 过关彩色块
    * @param {function} cb 动画完成回调
    * @param {cc.Vec2} position 世界坐标系 起始点
    * @param {number} total 一次生成总数 
    */
   colorBlockMove({
      cb = () => { },
      position = cc.v2(0, 0),
      total = 30, // 一次生成总数
      rangeX = [-360, 360], // x轴喷射范围
      rangeY = [-100, 780], // y轴喷射范围
   } = {}) {
      let poolName = poolPR + 'colorBlockMove';
      let frames = this._getFrame('block', true);
      let proArr = [];
      for (let i = 0; i < total; i++) {
         let node = this._getNode(poolName, frames);
         let x = G_chSdk.random(-2, 2);
         let y = G_chSdk.random(-2, 2);
         let center = this._getPosition(position);
         node.setPosition(center.x + x, center.y + y);
         node.setScale(1.5);
         node.opacity = 10;
         node.parent = this.nAction;
         let promise = G_chAction.colorBlockAction(node, { rangeX, rangeY });
         if (promise instanceof Promise) {
            proArr.push(promise);
            promise.then(() => {
               this._putNode(poolName, node);
            });
         }
      }
      return Promise.all(proArr).then(() => {
         typeof cb === 'function' && cb();
      });
   },
   /**
    * 喷射动画
    * @param {function} cb 
    * @param {cc.Vec2} position 世界坐标系
    * @param {string} imgName 动画图片名公共部分
    * @param {number} total 一次生成总数
    */
   sparyMove({
      cb = () => { },
      position = cc.v2(0, 0), // 
      total = 30, // 一次生成总数
      imgName = '', // 动画图片名公共部分
      time = 0.5, // 动画时间
      rangeX = [-280, 280], // x轴喷射范围
      rangeY = [-280, 280], // y轴喷射范围
      rangeScale = [0.8, 1.8], // 缩放范围
      rangeRotate = [-400, 400], // 旋转范围
   } = {}) {
      if (!(position instanceof cc.Vec2)) {
         return;
      }
      let poolName = poolPR + 'spartMove';
      let frames = this._getFrame(imgName, true);
      let proArr = [];
      for (let i = 0; i < total; i++) {
         let node = this._getNode(poolName, frames);
         if (node instanceof cc.Node) {
            let x = G_chSdk.random(-2, 2);
            let y = G_chSdk.random(-2, 2);
            let w = G_chSdk.random(40, 80);
            let h = G_chSdk.random(16, 50);
            node.rotation = G_chSdk.random(0, 180);
            node.setContentSize(w, h);
            let posi = this._getPosition(position);
            node.setPosition(posi.x + x, posi.y + y);

            node.parent = this.nAction;
            let promise = G_chAction.sparyAction(node, { time, rangeX, rangeY, rangeScale, rangeRotate });
            if (promise instanceof Promise) {
               proArr.push(promise);
               promise.then(() => {
                  this._putNode(poolName, node);
               });
            }
         }
      }
      return Promise.all(proArr).then(() => {
         typeof cb === 'function' && cb();
      });
   },
   /**
    * 创建一个圆点，然后缩放动画消失
    * @param {cc.Event.EventTouch} ev 
    * @param {*} param1 
    */
   dotMove({
      time = 0.6,
      color = cc.Color.WHITE,
      width = 60,
      opacity = 255,
      position = cc.v2(375, 670)
   } = {}) {
      let poolName = poolPR + 'dotMove';
      let frame = this._getFrame('aCircle');
      let node = this._getNode(poolName, frame);
      if (node instanceof cc.Node) {
         node.color = color;
         node.setContentSize(width, width);
         node.opacity = opacity;
         node.setScale(1.0, 1.0);
         node.position = this._getPosition(position);
         node.parent = this.nAction;
         let promise = G_chAction.fadeScale(node, {
            time,
            scale: 0.2,
            opacity: 50,
         });
         promise && promise.then(() => {
            this._putNode(poolName, node);
         });
      }
   },

   /**
    * 金币、体力、钻石增加减少动作动画
    * @param {string} type coin gem physcial
    * @param {cc.Node or cc.Vec2} start 动作起点 坐标要是世界坐标系
    * @param {cc.Node or cc.Vec2} end 动作终点 坐标要是世界坐标系
    * @param {function} cb 动作结束回调
    */
   coinMove(type, start, end = cc.v2(375, 1400), cb) {
      if (
         !G_chSdk.checkString(type) ||
         !start || !end
      ) return console.warn('coinMove parameter error');
      let iconNm = 'num' + type[0].toUpperCase() + type.slice(1);
      let poolName = poolPR + iconNm;
      // console.log('金币动作图片名称', iconNm);
      let iconFrame = this._getFrame(iconNm);

      if (!(iconFrame instanceof cc.SpriteFrame)) return console.warn('no match spriteFrame');;
      start = this._getPosition(start);
      end = this._getPosition(end);

      let proArr = [];
      for (let i = 0; i < 2; i++) {
         let node = this._getNode(poolName, iconFrame);
         if (node instanceof cc.Node && this.nAction instanceof cc.Node) {
            node.setPosition(start);
            node.parent = this.nAction;
            let promise = G_chAction.coinAction(node, {
               mvTarget: end,
               time: 0.8,
               delay: i * 0.25
            });
            promise && promise.then(() => {
               this._putNode(poolName, node);
            });
            proArr.push(promise);
         }
      }
      Promise.all(proArr).then(() => {
         typeof cb === 'function' && cb();
      });
   },

   /**
    * 根据名称从baseAtlas中取图片
    * @param {string} name 图片名称
    * @param {boolean} isArr 是否为取图片集
    */
   _getFrame(name, isArr = false) {
      if (
         G_chSdk.checkString(name) &&
         this.baseAtlas instanceof cc.SpriteAtlas
      ) {
         if (isArr) {
            return G_chSdk.get_frames(this.baseAtlas, name, false);
         }
         else {
            return this.baseAtlas.getSpriteFrame(name);
         }
      }
      else {
         return null;
      }
   },
   /**
    * 回收一个节点
    * @param {string} poolName 
    * @param {cc.Node} node 
    */
   _putNode(poolName, node) {
      node instanceof cc.Node
         && this[poolName] instanceof cc.NodePool
         && this[poolName].put(node);
   },

   /**
    * 生成一个节点
    * @param {string} poolName 对象属性名，该属性的值将保存此名称类型节点的节点池
    * @param {cc.SpriteFrame or Array} frames 
    */
   _getNode(poolName, frames) {
      let node = null;
      if (
         !(frames instanceof cc.SpriteFrame) &&
         !Array.isArray(frames)
      ) return node;

      if (!(this[poolName] instanceof cc.NodePool)) {
         this[poolName] = new cc.NodePool();
      }
      if (this[poolName].size() > 0) {
         node = this[poolName].get();
      } else {
         node = new cc.Node(poolName);
         let sprite = node.addComponent(cc.Sprite);
         if (frames instanceof cc.SpriteFrame) {
            sprite.spriteFrame = frames;
         } else if (Array.isArray(frames)) {
            let idx = G_chSdk.random(0, frames.length);
            if (frames[idx] instanceof cc.SpriteFrame) {
               sprite.spriteFrame = frames[idx];
            }
         }
      }
      return node;
   },
   /**
    * 将其他节点中心点或世界坐标点转换成 this.nAction 节点空间下的坐标
    * @param {cc.Node or cc.Vec2} arg 坐标需要是世界坐标系坐标
    */
   _getPosition(arg) {
      if (arg instanceof cc.Node) {
         let worldPos = arg.parent.convertToWorldSpaceAR(arg.position);
         let viewPos = this.nAction.convertToNodeSpaceAR(worldPos);
         return viewPos;
      }
      else if (arg instanceof cc.Vec2) {
         let viewPos = this.nAction.convertToNodeSpaceAR(arg);
         return viewPos;
      }
      else {
         return cc.v2(0, 0);
      }
   }
});