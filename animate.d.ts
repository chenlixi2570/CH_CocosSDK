/**
 * 依赖moveParent节点的动画实现
 */
declare namespace G_GameMove {
   /**
    * 金币、体力、钻石增加减少动作动画
    * @param {string} type coin gem physcial
    * @param {cc.Node or cc.Vec2} start 动作起点 坐标要是世界坐标系
    * @param {cc.Node or cc.Vec2} end 动作终点 坐标要是世界坐标系
    * @param {function} cb 动作结束回调
    */
   export function coinMove();
   /**
    * 创建一个圆点，然后缩放动画消失
    * @param {cc.Event.EventTouch} ev 
    * @param {*} param1 
    */
   export function dotMove({
      time = 0.6,
      color = cc.Color.WHITE,
      width = 30,
      opacity = 255,
      position = cc.v2(375, 1334 / 2)
   } = {});
   /**
    * 喷射动画
    * @param {function} cb 
    * @param {cc.Vec2} position 世界坐标系
    * @param {string} imgName 动画图片名公共部分
    * @param {number} total 一次生成总数
    */
   export function sparyMove({
      cb = () => { },
      position = cc.v2(0, 0), // 
      total = 30, // 一次生成总数
      imgName = '', // 动画图片名公共部分
      time = 0.5, // 动画时间
      rangeX = [-280, 280], // x轴喷射范围
      rangeY = [-280, 280], // y轴喷射范围
      rangeScale = [0.8, 1.8], // 缩放范围
      rangeRotate = [-400, 400], // 旋转范围
   } = {});
   /**
    * 过关彩色块
    * @param {function} cb 动画完成回调
    * @param {cc.Vec2} position 世界坐标系 起始点
    * @param {number} total 一次生成总数 
    */
   export function colorBlockMove({
      cb = () => { },
      position = cc.v2(0, 0),
      total = 30, // 一次生成总数
      rangeX = [-360, 360], // x轴喷射范围
      rangeY = [-100, 780], // y轴喷射范围
   } = {})
}
/**
 * 不依赖组件与节点的动画实现
 */
declare namespace G_chAction {
   /**
    * 彩色块动作
    * @param {*} node 
    * @param {Array} rangeX  x轴喷射范围
    * @param {Array} rangeY  y轴喷射范围
    */
   export function colorBlockAction(node, {
      rangeX = [-360, 360], // x轴喷射范围
      rangeY = [-100, 780], // y轴喷射范围
   } = {});

   /**
    * 向四周喷射动作
    * @param {cc.Node} node 
    * @param {number} time 
    * @param {Array} rangeX 
    * @param {Array} rangeY 
    * @param {Array} rangeScale 
    * @param {Array} rangeRotate 
    */
   export function sparyAction(node, {
      time = 0.5,
      rangeX = [-280, 280], // x轴喷射范围
      rangeY = [-280, 280], // y轴喷射范围
      rangeScale = [0.8, 1.8], // 缩放范围
      rangeRotate = [-400, 400], // 旋转范围
   } = {});

   /**
    * 金币增加减少动作，变化 scale opacity position
    * 缩放先放大到2.4然后缩小到0.5，位移先快后慢 透明底终点是100
    * @param {cc.Node} node 动作节点
    * @param {cc.Vec2} mvTarget 位移动作终点
    * @param {number} mvTm 动作持续时间
    * @param {number} delay 动作开始延迟时间
    */
   export function coinAction(node, {
      mvTarget = null,
      time = 0.8,
      delay = 0
   } = {});

   /**
    * 缩放晃动 常用于浮动广告
    * 该动作无限循环
    * @param {cc.Node} node 
    * @param {function} cb 一次动画完成回调一次
    * @param {object} time scaleLow scaleHeiht rotate
    */
   export function tadaAction(node, cb, {
      time = 1.4,
      scaleLow = 0.92,
      scaleHeiht = 1.08,
      rotate = 4
   } = {});

   /**
    * 淡出淡入同时变大或变小
    * @param {cc.Node} node
    * @param {number} time
    * @param {number} scale 需要动画到的缩放值
    * @param {number} opacity 需要动画到的透明值
    */
   export function fadeScale(node, {
      time = .3,
      scale = 2.4,
      opacity = 100
   } = {});
}

declare namespace G_CSSAnimate {
   /**
    * 返回一个动作数组，动作模拟animate.css 的 tada 缩放晃动
    * @param {number} time
    * @param {number} scaleLow 放大最小值
    * @param {number} rotate 动作旋转的角度
    * @param {number} scaleHeiht 放大最大值
    */
   export function tadaActionOnce({
      time = 1.4,
      scaleLow = 0.92,
      scaleHeiht = 1.08,
      rotate = 4,
   } = {});
}