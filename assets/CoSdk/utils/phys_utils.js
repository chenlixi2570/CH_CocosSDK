/*
 * @Author: Chen Li Xi
 * @Description: 碰撞及物理引擎工具
 */

let _Phys_Utils = (function () {
   /**
   * 获取指定世界坐标点到上下左右四个方向最近刚体的距离
   * 以及该刚体碰撞分组字符标识
   * @param {cc.Vec2} center 
   * @param {Array} dir ['left', 'right', 'top', 'bottom']
   */
   function _getCollideDistance(center, dir = ['left', 'right', 'top', 'bottom']) {
      if (
         !(center instanceof cc.Vec2) ||
         !Array.isArray(dir)
      ) {
         console.warn('** getCollideDistance 参数类型错误');

         return null;
      }
      let result = {};
      let p1 = center;
      dir.forEach(item => {
         let p2 = cc.v2(p1.x, p1.y);
         if (item === 'left') {
            p2.x -= 1000;
         }
         else if (item === 'right') {
            p2.x += 1000;
         }
         else if (item === 'top') {
            p2.y += 1000;
         }
         else if (item === 'bottom') {
            p2.y -= 1000;
         }
         let manager = cc.director.getPhysicsManager();
         let rayCast = manager.rayCast(p1, p2, cc.RayCastType.Closest);
         let rayCastResult = rayCast[0];

         // G_GameTest.drawLineByWorld(p1, p2);
         // console.log('起点，终点', p1, p2, rayCast);

         if (rayCastResult) {
            let dis = G_chSdk.getMag(p1, rayCastResult.point);
            let group = rayCastResult.collider.node.group;
            result[item] = [dis, group];
         }
         else {
            result[item] = [0, ''];
         }
      });

      return result;
   }

   let _instance = {
      /**
       * 开启碰撞系统
       */
      open_collider() {
         cc.director.getCollisionManager().enabled = true;
         // IS　TEST　调试碰撞盒模式，上线要注释掉
         cc.director.getCollisionManager().enabledDebugDraw = true;
         cc.director.getCollisionManager().enabledDrawBoundingBox = true;
      },
      /**
       * 开启物理系统
       */
      open_rigid() {
         cc.director.getPhysicsManager().enabled = true;
         this.setStep();
         // this._debugDraw();
      },
      /**
       * 在节点四周加上静态刚体，阻止物体弹出节点
       * @param parent {cc.Node} 需要加静态刚体的节点
       */
      addRigidBody(parent) {
         if (!parent instanceof cc.Node) {
            console.warn('函数 addRigidBody 期望的参数是 cc.Node 的实例');
            return;
         }
         let size = cc.size(0, 0);
         let width = size.width || parent.width;
         let height = size.height || parent.height;

         let node = new cc.Node();
         node.groupIndex = 1;
         node.name = 'rigidBox';
         // 添加刚体组件
         let body = node.addComponent(cc.RigidBody);
         // 设置刚体类型为静态
         body.type = cc.RigidBodyType.Static;
         let thickness = 4; // 刚体的厚度
         this._addBound(node, 0, height / 2, width, thickness);
         // this._addBound(node, 0, -height / 2, width, thickness);
         this._addBound(node, -width / 2, 0, thickness, height);
         this._addBound(node, width / 2, 0, thickness, height);

         node.parent = parent;
      },
      // 插入刚体节点
      _addBound(node, x, y, width, height, dir = '') {
         let collider = node.addComponent(cc.PhysicsBoxCollider);
         collider.offset.x = x;
         collider.offset.y = y;
         collider.size.width = width;
         collider.size.height = height;
         collider.nodeDir = dir;
         if (dir) {
            collider.sensor = true;
         }
      },
      // 设置物理步长 默认这个步长即是你的游戏的帧率：1/framerate。
      setStep() {
         var manager = cc.director.getPhysicsManager();
         // 开启物理步长的设置
         manager.enabledAccumulator = true;
         // 物理步长，默认 FIXED_TIME_STEP 是 1/60
         manager.FIXED_TIME_STEP = 1 / 30;
         // 每次更新物理系统处理速度的迭代次数，默认为 10
         manager.VELOCITY_ITERATIONS = 8;
         // 每次更新物理系统处理位置的迭代次数，默认为 10
         manager.POSITION_ITERATIONS = 8;
      },
      // 绘制调试信息
      _debugDraw() {
         cc.director.getPhysicsManager().debugDrawFlags = 1;
         return;
         cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
            cc.PhysicsManager.DrawBits.e_pairBit |
            cc.PhysicsManager.DrawBits.e_centerOfMassBit |
            cc.PhysicsManager.DrawBits.e_jointBit |
            cc.PhysicsManager.DrawBits.e_shapeBit
            ;
      },
      /**
       * 获取到两个碰撞体相互碰撞时在碰撞点上的相对速度
       * @param {*} contact 
       * @param {*} selfCollider 
       * @param {*} otherCollider 
       */
      getCollideSpeed(contact, selfCollider, otherCollider) {
         if (
            !(contact instanceof cc.PhysicsContact) ||
            !(selfCollider instanceof cc.PhysicsCollider) ||
            !(otherCollider instanceof cc.PhysicsCollider)
         ) return 0;
         let worldManifold = contact.getWorldManifold();
         let otherBody = otherCollider.node.getComponent(cc.RigidBody);
         let selfBody = selfCollider.node.getComponent(cc.RigidBody);
         let vel1 = selfBody.getLinearVelocityFromWorldPoint(worldManifold.points[0]);
         let vel2 = otherBody.getLinearVelocityFromWorldPoint(worldManifold.points[0]);
         let relativeVelocity = vel1.sub(vel2).mag();
         return relativeVelocity;
      },
      /**
       * 获取到与当前碰撞体碰撞的质心与另一个碰撞体时所有碰撞点中心方向
       * 返回以当前碰撞体质心为圆心的角度
       * @param {*} contact 
       * @param {*} selfCollider 
       * @returns {number} 
       */
      getCollideDirection(contact, selfCollider) {
         var worldManifold = contact.getWorldManifold();
         let centerPoint = null; // 中点坐标
         worldManifold.points.forEach((item, i) => {
            if (i === 0) {
               centerPoint = item;
            }
            else {
               let center = G_chSdk.getCenterPoint(centerPoint, item);
               centerPoint = cc.v2(center.x, center.y);
            }
         });
         if (centerPoint === null) {
            return 0;
         }
         else {
            let selfBody = selfCollider.node.getComponent(cc.RigidBody);
            // 刚体质心
            let p1 = selfBody.getWorldCenter();
            let rotate = G_chSdk.getRotate(p1, centerPoint);

            return rotate;
         }
      },
      /**
       * 获取刚体质心点到上下左右四个方向最近刚体的距离
       * 以及该刚体碰撞分组字符标识
       * @param {cc.RigidBody} rigidBody 
       * @param {Array} dir ['left', 'right', 'top', 'bottom']
       */
      getCollideDistance(
         rigidBody,
         dir = ['left', 'right', 'top', 'bottom'],
         addPos = cc.v2(0, 0)
      ) {
         if (
            !(rigidBody instanceof cc.RigidBody) ||
            !Array.isArray(dir)
         ) {
            console.warn('** getCollideDistance 参数类型错误');

            return null;
         }
         let p1 = rigidBody.getWorldCenter().addSelf(addPos);

         return _getCollideDistance(p1, dir);
      },
      /**
       * 两个刚体质心连线的角度
       * 返回以当前碰撞体质心为圆心的角度
       * @param {cc.RigidBody} selfCollider 
       * @param {cc.PhysicsCollider} selfCollider 
       * @returns {number} 
       */
      getRigidDirection(selfCollider, otherCollider) {
         if (!(selfCollider instanceof cc.PhysicsCollider) ||
            !(otherCollider instanceof cc.PhysicsCollider)) {
            return 0;
         }
         let selfBody = selfCollider.node.getComponent(cc.RigidBody);
         let otherBody = otherCollider.node.getComponent(cc.RigidBody);
         // 刚体质心
         let p1 = selfBody.getWorldCenter();
         let p2 = otherBody.getWorldCenter();
         let rotate = G_chSdk.getRotate(p1, p2);

         return rotate;
      },
      /**
       * 获取指定方向上所有与射线相交的物理碰撞体，同一碰撞体只返回最近的点
       * 方向是正右方为0度，然后逆时针旋转为正值
       * @param {cc.RigidBody} rigidBody 检测起点
       * @param {number} angle 角度值，右0 上90 左180 下270
       */
      getRayCast(rigidBody, angle, addPos = cc.v2(0, 0)) {
         if (!(rigidBody instanceof cc.RigidBody) || !G_chSdk.isNumber(angle)) {
            return null;
         }
         let rad = G_chSdk.ang2rad(angle);
         let start = rigidBody.getWorldCenter().addSelf(addPos);
         let end = cc.v2(Math.cos(rad), Math.sin(rad)).mulSelf(1000).addSelf(start);
         var manager = cc.director.getPhysicsManager();
         var results = manager.rayCast(start, end, cc.RayCastType.AllClosest);
         if (Array.isArray(results) && results.length >= 2) {
            results.sort((a, b) => a.fraction - b.fraction);
         }

         Array.isArray(results) && results.forEach(item => {
            let dis = G_chSdk.getMag(start, item.point);
            let group = item.collider.node.group;
            item.dis = dis;
            item.group = group;
         });

         // G_GameTest.drawLineByWorld(start, end);
         // console.log('起点与终点', start, end, results);

         return results;
      }

   };
   return {
      getInstance() {
         return _instance;
      }
   };
})();
// export
module.exports = _Phys_Utils;
