/**
 * 基于cocos 动作系统的动作
 * 不依赖任何component组件
 * 只动作一次就结束的都返回 promise
 * 无限循环的动作在一次动作结束时回调一次函数
 */

/**
 * 彩色块动作
 * @param {*} node 
 * @param {Array} rangeX  x轴喷射范围
 * @param {Array} rangeY  y轴喷射范围
 */

function colorBlockAction(node, {
   rangeX = [-360, 360], // x轴喷射范围
   rangeY = [-100, 780], // y轴喷射范围
} = {}) {
   if (!(node instanceof cc.Node)) return null;
   node.stopAllActions();
   let mX = G_chSdk.random(rangeX[0], rangeX[1]);
   let mY = G_chSdk.random(rangeY[0], rangeY[1]);
   let time = G_chSdk.randomDouble(0.2, 0.5);
   let time1 = G_chSdk.randomDouble(1.2, 2);
   let scale = node.getScale();
   let h = cc.view.getVisibleSizeInPixel().height;
   return new Promise((resolve, reject) => {
      node.runAction(
         cc.sequence(
            cc.spawn(
               cc.moveBy(0.3, mX, mY).easing(cc.easeCubicActionIn()),
               cc.fadeIn(0.3)
            ),
            cc.spawn(
               cc.moveBy(time1, 0, -h).easing(cc.easeCubicActionIn()),
               cc.sequence(
                  cc.scaleTo(time, scale, -scale),
                  cc.scaleTo(time, -scale, scale),
                  cc.scaleTo(time, scale, -scale),
                  cc.scaleTo(time, scale, scale),
               )
            ),

            cc.callFunc(() => {
               resolve();
            })
         )
      );
   });
}

/**
 * 向四周喷射动作
 * @param {cc.Node} node 
 * @param {number} time 
 * @param {Array} rangeX  x轴喷射范围
 * @param {Array} rangeY  y轴喷射范围
 * @param {Array} rangeScale  缩放范围
 * @param {Array} rangeRotate  旋转范围
 */
function sparyAction(node, {
   time = 0.5,
   rangeX = [-280, 280], // x轴喷射范围
   rangeY = [-280, 280], // y轴喷射范围
   rangeScale = [0.8, 1.8], // 缩放范围
   rangeRotate = [-400, 400], // 旋转范围
} = {}) {
   if (!(node instanceof cc.Node)) return null;
   node.stopAllActions();
   let mX = G_chSdk.random(rangeX[0], rangeX[1]);
   let mY = G_chSdk.random(rangeY[0], rangeY[1]);
   let scale = G_chSdk.randomDouble(rangeScale[0], rangeScale[1]);
   let rotate = G_chSdk.random(rangeRotate[0], rangeRotate[1]);
   return new Promise((resolve, reject) => {
      node.runAction(
         cc.sequence(
            cc.spawn(
               cc.moveBy(time, mX, mY),
               cc.rotateBy(time, rotate),
               cc.sequence(
                  cc.scaleTo(time / 2, scale),
                  cc.scaleTo(time / 2, 0),
               )
            ),
            cc.callFunc(() => {
               resolve();
            })
         )
      );
   });
}

/**
 * 淡出淡入同时变大或变小
 * @param {cc.Node} node
 * @param {number} time
 * @param {number} scale 需要动画到的缩放值
 * @param {number} opacity 需要动画到的透明值
 */
function fadeScale(node, {
   time = .3,
   scale = 2.4,
   opacity = 100
} = {}) {
   if (!(node instanceof cc.Node)) return null;
   node.stopAllActions();
   return new Promise((resolve, reject) => {
      node.runAction(
         cc.sequence(
            cc.spawn(
               cc.scaleTo(time, scale, scale),
               cc.fadeTo(time, opacity)
            ),
            cc.callFunc(() => {
               resolve();
            })
         )
      );
   });
}

/**
 * 金币增加减少动作，变化 scale opacity position
 * 缩放先放大到2.4然后缩小到0.5，位移先快后慢 透明底终点是100
 * @param {cc.Node} node 动作节点
 * @param {cc.Vec2} mvTarget 位移动作终点
 * @param {number} time 动作持续时间
 * @param {number} delay 动作开始延迟时间
 */
function coinAction(node, {
   mvTarget = null,
   time = 0.8,
   delay = 0
} = {}) {
   return new Promise((resolve, reject) => {
      if (
         !(node instanceof cc.Node) ||
         !(mvTarget instanceof cc.Vec2)
      ) {
         console.warn('coinAction parameter error...', JSON.stringify(node), JSON.stringify(mvTarget));
         resolve();
         return;
      }
      node.stopAllActions();
      node.opacity = 255;
      node.setScale(1);
      node.runAction(
         cc.sequence(
            cc.delayTime(delay),
            cc.spawn(
               cc.moveTo(time, mvTarget).easing(cc.easeQuinticActionInOut(0.3)),
               cc.fadeTo(time, 100),
               cc.sequence(
                  cc.scaleTo(time * 0.5, 2.4),
                  cc.scaleTo(time * 0.5, 0.5)
               )
            ),
            cc.callFunc(() => {
               resolve();
            })
         )
      );
   });
}

/**
 * 缩放晃动 常用于浮动广告
 * 该动作无限循环
 * @param {cc.Node} node 
 * @param {function} cb 一次动画完成回调一次
 * @param {object} time scaleLow scaleHeiht rotate
 */
function tadaAction(node, cb, {
   time = 1.4,
   scaleLow = 0.92,
   scaleHeiht = 1.08,
   rotate = 4,
   delayTm = 0.5
} = {}) {
   if (!(node instanceof cc.Node)) return;
   let acArr = G_CSSAnimate.tadaActionOnce({ time, scaleLow, rotate, scaleHeiht });
   node.stopAllActions();
   node.runAction(
      cc.repeatForever(
         cc.sequence(
            cc.delayTime(delayTm),
            ...acArr, // 动作序列
            cc.callFunc(() => {
               typeof cb === 'function' && cb();
            })
         )
      )
   );
}




module.exports = {
   coinAction,
   tadaAction,
   fadeScale,
   sparyAction,
   colorBlockAction
};