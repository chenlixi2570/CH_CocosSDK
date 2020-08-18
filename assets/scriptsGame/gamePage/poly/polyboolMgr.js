/**
 * 管理多边形绘制区域
 * 该区域用于物理位置渲染与UI绘制
 * 区域用下列数据格式表示
 * poly1: {
      regions: [ // 多个不相交的区域，一个区域是一个子项，子项的值是顶点数组，
         [[200, 200], [200, -200], [-200, -200], [-200, 200]]
      ],
      inverted: false
   },
 */
let _instance = null;
const DIG_RADIUS = require('project_const').dig_radius; // 触摸点半径
const DIG_FRAGMENT = require('project_const').dig_fragment; // 一个圆有几个点组成
const DIG_OPTIMIZE_SIZE = require('project_const').dig_optimize; // 相近的右方与下方的点算做一个点

let _lvData = null; // 当前关卡数据
let _fixedRegions = null; // 固定墙体矩形三维数组 用于物理组件
let _fixedRegionsByUI = null; // 固定墙体矩形三维数组 用于像素UI
let _regions = null; // 可消除墙体三维数组
let _wallsData = null;

function lengthSqr(posi) {
   return posi.x * posi.x + posi.y * posi.y;
}

/**
 * 剔除一些长度为0的边
 * 用到了向量的叉乘
 */
function _optimizeRegions() {
   const regions = [];
   for (let index = 0; index < _regions.length; index++) {
      const pos = _regions[index];
      const newPos = [];
      pos.forEach((p, i) => {
         p = _optimizePoint(p);
         const p_pre = _optimizePoint(pos[(i - 1 + pos.length) % pos.length]);
         const p_next = _optimizePoint(pos[(i + 1) % pos.length]);
         const vec1 = cc.v2(p[0] - p_pre[0], p[1] - p_pre[1]);
         const vec2 = cc.v2(p_next[0] - p[0], p_next[1] - p[1]);
         if (lengthSqr(vec1) != 0 && lengthSqr(vec2) != 0 && vec1.cross(vec2) != 0) {
            newPos.push(p);
         }
      });

      if (newPos.length > 2) {
         regions.push(newPos);
      }
   }
   _regions = regions;
}
/**
 * 把所有的点都优化到整数范围
 * DIG_OPTIMIZE_SIZE 改大一点，就是把相近的右方与下方的点算做一个点
 * 相近的距离就是 DIG_OPTIMIZE_SIZE 值
 * @param {array} point 顶点数组
 */
function _optimizePoint(point) {
   return [Math.floor(point[0] * DIG_OPTIMIZE_SIZE) / DIG_OPTIMIZE_SIZE, Math.floor(point[1] * DIG_OPTIMIZE_SIZE) / DIG_OPTIMIZE_SIZE];
}
/**
 * 计算差集
 */
function differCalc(regions) {
   /** 功能一样 */
   // const result = PolyBool.difference({
   //    regions: _regions,
   //    inverted: false
   // }, {
   //    regions,
   //    inverted: false
   // });
   /** 效率更好 */
   const seg1 = PolyBool.segments({
      regions: _regions,
      inverted: false
   });
   const seg2 = PolyBool.segments({
      regions,
      inverted: false
   });
   const comb = PolyBool.combine(seg1, seg2);
   const result = PolyBool.polygon(PolyBool.selectDifference(comb));
   _regions = result.regions;
   return result;
}

/**
 * 将数组格式表示的顶点数据转成 cc.Vec2 格式
 */
function _getRegionsToVec2(regions) {
   const chains_points = [];
   for (let index = 0; index < regions.length; index++) {
      const pos = regions[index];

      let points = pos.map((v, i) => {
         const v2 = cc.v2(v[0], v[1]);
         return v2;
      });
      chains_points[index] = points;
   }

   return chains_points;
}

function _sortPoints(points) {
   return points.map((curPoly, curPoly_i) => {
      const count = points.reduce((pre, nextPoly, nextPoly_i) => {
         if ((curPoly_i != nextPoly_i)) {
            const length = curPoly.length;
            for (let i = 0; i < length; ++i) {
               const p0 = curPoly[i];
               if (!cc.Intersection.pointInPolygon(p0, nextPoly))
                  return pre;
            }
            return pre + 1;
         }
         return pre;
      }, 0);

      return { curPoly, count };
   }).sort((a, b) => {
      return a.count - b.count;
   });
}

class _PolyBoolMgr {
   constructor() {
      if (!_instance) {
         _instance = this;
      }
      return _instance;
   }
   initLvData(lvData) {
      _lvData = lvData;
      this.initRegions();
   }
   initRegions() {
      // let clearData = JSON.parse(_lvData.clearWall);
      // let clearEreaData = JSON.parse(clearData[0].areaData);
      let fixedData = JSON.parse(_lvData.fixedWall);
      let fixedEreaData = JSON.parse(fixedData[0].areaData);
      // let propD = JSON.parse(_lvData.prop);
      // _regions = clearEreaData.area;
      _fixedRegions = fixedEreaData.area;
      _wallsData = fixedEreaData.walls;
      // _fixedRegionsByUI = fixedEreaData.phyPoints;
      console.log('固定墙体数据', fixedEreaData);
   }
   /**
    * 传入触摸点
    * 得到与当前可消除区域 _regions 计算差集
    * 结果仍然保存在 _regions 中
    */
   getDifferRegions(pos, delta = null, radius) {
      const regions = [[]];
      const count = DIG_FRAGMENT;
      radius = G_chSdk.isNumber(radius) ? radius : DIG_RADIUS;
      if (!delta || lengthSqr(delta) < 5) {
         for (let index = 0; index < count; index++) {
            const r = 2 * Math.PI * index / count;
            const x = pos.x + radius * Math.cos(r);
            const y = pos.y + radius * Math.sin(r);
            regions[0].push(_optimizePoint([x, y]));
         }
      }
      else {
         const startPos = pos.sub(delta);
         for (let index = 0; index < count; index++) {
            const r = 2 * Math.PI * index / count;
            let vec_x = radius * Math.cos(r);
            let vec_y = radius * Math.sin(r);
            let x, y;
            if (delta.dot(cc.v2(vec_x, vec_y)) > 0) {
               x = pos.x + vec_x;
               y = pos.y + vec_y;
            } else {
               x = startPos.x + vec_x;
               y = startPos.y + vec_y;
            }
            regions[0].push(_optimizePoint([x, y]));
         }
      }


      /** 计算差集 */
      differCalc(regions);
      /** 优化计算 */
      _optimizeRegions();
      return _regions;
   }
   /**
    * 得到可消除区域要绘制UI与物理组件的顶点数组
    */
   getClearPoints() {
      if (!Array.isArray(_regions)) return null;
      const enabled_chains_points = _getRegionsToVec2(_regions);
      const enabled_chains_points_sort = _sortPoints(enabled_chains_points);
      return {
         chainPoints: enabled_chains_points, // 物理组件顶点
         uiPoints: enabled_chains_points_sort // ui区域顶点
      };
   }
   /**
    * 获取固定区域区域顶点数组
    */
   getFixedPoints() {
      if (!Array.isArray(_fixedRegions)) return null;
      const enabled_chains_points = _getRegionsToVec2(_fixedRegions); // 物理顶点是直线
      // const UI_points = _getRegionsToVec2(_fixedRegionsByUI); // UI 顶点是随机折线
      const enabled_chains_points_sort = _sortPoints(enabled_chains_points);
      return {
         chainPoints: enabled_chains_points, // 物理组件顶点
         uiPoints: enabled_chains_points_sort // ui区域顶点
      };
   }

   getWallsData() {
      return _wallsData;
   }
}

module.exports = new _PolyBoolMgr;