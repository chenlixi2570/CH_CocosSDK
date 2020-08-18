/**
 * 将animate.css库的一些动画转换为cocos动作序列
 * 函数返回值都是数组，数组项即是 cc.Action 的实例
 */

/**
 * 返回一个动作数组，动作模拟animate.css 的 tada
 * @param {number} time
 * @param {number} scaleLow 放大最小值
 * @param {number} rotate 动作旋转的角度
 * @param {number} scaleHeiht 放大最大值
 */
function tadaActionOnce({
   time = 1.4,
   scaleLow = 0.92,
   scaleHeiht = 1.08,
   rotate = 4,
} = {}) {
   return [
      cc.spawn(
         cc.scaleTo(time * 0.1, scaleLow),
         cc.rotateTo(time * 0.1, -rotate)
      ),//10
      cc.spawn(
         cc.scaleTo(time * 0.1, scaleLow),
         cc.rotateTo(time * 0.1, -rotate)
      ),//20
      cc.spawn(
         cc.scaleTo(time * 0.1, scaleHeiht),
         cc.rotateTo(time * 0.1, rotate)
      ),//30
      cc.spawn(
         cc.scaleTo(time * 0.1, scaleHeiht),
         cc.rotateTo(time * 0.1, -rotate)
      ),//40
      cc.spawn(
         cc.scaleTo(time * 0.1, scaleHeiht),
         cc.rotateTo(time * 0.1, rotate)
      ),//50
      cc.spawn(
         cc.scaleTo(time * 0.1, scaleHeiht),
         cc.rotateTo(time * 0.1, -rotate)
      ),//60
      cc.spawn(
         cc.scaleTo(time * 0.1, scaleHeiht),
         cc.rotateTo(time * 0.1, rotate)
      ),//70
      cc.spawn(
         cc.scaleTo(time * 0.1, scaleHeiht),
         cc.rotateTo(time * 0.1, -rotate)
      ),//80
      cc.spawn(
         cc.scaleTo(time * 0.1, scaleHeiht),
         cc.rotateTo(time * 0.1, rotate)
      ),//90
      cc.spawn(
         cc.scaleTo(time * 0.1, 1),
         cc.rotateTo(time * 0.1, 0)
      ),//100
   ];
}

module.exports = {
   tadaActionOnce
};