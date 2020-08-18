/**
 * 几何计算函数
 */

let _Geom_Utils = (function () {

   let _instance = {
      /**
       * 角度转弧度
       * @param {number} ang 
       */
      ang2rad(ang) {
         if (typeof ang !== 'number') {
            return 0;
         }
         return ang * Math.PI / 180;
      },
      /**
       * 弧度转角度
       * @param {number} ang 
       */
      rad2ang(rad) {
         if (typeof rad !== 'number') {
            return 0;
         }
         return rad * 180 / Math.PI;
      },
      /**
       * 是否为坐标点对象
       * 该对象应该包含 x, y 两个属性，且x，y 的值必需是 Number 类型
       * @param {object} point 坐标点
       */
      isPoint(point) {
         if (!point || typeof point !== 'object') {
            return false;
         }
         point.x = Math.round(point.x);
         point.y = Math.round(point.y);
         if (typeof point.x !== 'number' || typeof point.y !== 'number') {
            return false;
         }
         return true;
      },
      /**
       * 返回两个坐标点的距离
       * @param {object or cc.Vec2} pA 
       * @param {object or cc.Vec2} pB 
       */
      getMag(pA, pB) {
         if (!this.isPoint(pA) || !this.isPoint(pB)) {
            return 0;
         }

         let x = pA.x - pB.x;
         let y = pA.y - pB.y;
         return Math.sqrt(x * x + y * y);
      },
      /**
       * 传入两个点，得到相对于x轴的角度值，不是弧度值
       * @param {object or cc.Vec2} pA 
       * @param {object or cc.Vec2} pB 
       */
      getXDeg(pA, pB) {
         if (!this.isPoint(pA) || !this.isPoint(pB)) {
            return 0;
         }
         let radian = Math.atan2((pA.y - pB.y), (pA.x - pB.x));

         return 180 - this.rad2ang(radian);
      },
      // 根据开始点与结束点，得到结束点围绕开始点360旋转的角度，
      getRotate(start, end) {
         if (!this.isPoint(start) || !this.isPoint(end)) {
            return 0;
         }

         let d = Math.abs(start.y - end.y);
         let n = Math.abs(start.x - end.x);
         let len = Math.sqrt(Math.pow(d, 2) + Math.pow(n, 2));
         let radian = Math.asin(d / len);

         let deg = this.rad2ang(radian);
         if (start.y > end.y) {
            if (start.x < end.x) {
               return deg;// 0 - 90
            } else {
               return 180 - deg; // 90 - 180
            }
         } else {
            if (start.x < end.x) {
               return 360 - deg; // 270 - 360
            } else {
               return 180 + deg; // 180 - 270
            }
         }
      },
      // 传入开始点，长度，角度，得到下一点位置
      getNextPoint(startP, len, deg) {
         let result = {};
         if (!this.isPoint(startP) ||
            typeof len !== 'number' ||
            typeof deg !== 'number') {
            return result;
         }

         let radian = this.ang2rad(deg);
         let x = len * Math.sin(radian);
         let y = len * Math.cos(radian);
         x = Number(x.toFixed(2));
         y = Number(y.toFixed(2));
         result.x = Math.round(startP.x + y);
         result.y = Math.round(startP.y - x);
         // console.log('传入开始点，长度，角度，得到下一点位置', result);
         return result;
      },
      // 传入开始点，长度，角度，得到上一点位置
      getPrevPoint(startP, len, deg) {
         let result = {};
         if (!this.isPoint(startP) ||
            typeof len !== 'number' ||
            typeof deg !== 'number') {
            return result;
         }

         let radian = this.ang2rad(deg);
         let x = len * Math.sin(radian);
         let y = len * Math.cos(radian);
         result.x = Math.round(startP.x - y);
         result.y = Math.round(startP.y + x);
         return result;
      },
      /**
       * 求两点的中点坐标
       * @param {object} pA 
       * @param {object} pB 
       */
      getCenterPoint(pA, pB) {
         if (!this.isPoint(pA) || !this.isPoint(pB)) {
            return { x: 0, y: 0 };
         }
         else {
            return {
               x: (pA.x + pB.x) / 2,
               y: (pA.y + pB.y) / 2
            };
         }
      },
      /**
       * 传入初始坐标与圆心坐标，以及旋转角度，顺时针角度值为正，逆时针角度值为负
       * 返回旋转之后的 a点对应的坐标值
       * @param {object} a {x:0, y:0} 初始坐标
       * @param {object} o {x:0, y:0} 圆心坐标
       * @param {number} angle 角度值 节点的rotation值
       */
      getRotateAnglePoint(a, o, angle) {
         if (!this.isPoint(a) || !this.isPoint(o)) {
            return { x: 0, y: 0 };
         }
         angle = this.ang2rad(-angle);
         return {
            x: (a.x - o.x) * Math.cos(angle) - (a.y - o.y) * Math.sin(angle) + o.x,
            y: (a.x - o.x) * Math.sin(angle) + (a.y - o.y) * Math.cos(angle) + o.y
         };
      }
   };
   return {
      getInstance() {
         return _instance;
      }
   };
})();

// export
module.exports = _Geom_Utils;
