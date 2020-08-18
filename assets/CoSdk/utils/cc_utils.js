/*
 * @Author: Chen Li Xi
 * @Description: 依赖cc 命名空间的工具类
 */


let _globalNodes = {}; // 保存场景常驻节点
let _assetsUrl = '';

let _CC_Utils = (function () {

   let _instance = {
      /**
       * 获取本地缓存数据
       * 取值不成功时浏览器返回 null 而微信中返回空字符
       * @param {String} key 键名(全局唯一)，不能为空
       * @param {any} def 默认值，当取值不成功时返回
       */
      getStorage(key, def) {
         let ret = cc.sys.localStorage.getItem(key);

         if ((ret === null || ret === '') && typeof def !== 'undefined') {
            return def;
         }
         else {
            return ret;
         }
      },

      /**
       * 存储本地缓存数据
       * @param {String} key 键名(全局唯一)，不能为空
       * @param {Any} data 需要存储的内容。只支持原生类型、Date、及能够通过JSON.stringify序列化的对象
       */
      setStorage(key, data) {
         if (data && typeof data === 'object') {
            data = JSON.stringify(data);
         }
         cc.sys.localStorage.setItem(key, data);
      },

      /**
       * 清除所有本地缓存数据
       */
      clearStorage() {
         cc.sys.localStorage.clear();
      },
      /**
       * 清除某一项本地缓存数据
       * @param {String} key 键名(全局唯一)，不能为空
       */
      removeStorage(key) {
         cc.sys.localStorage.removeItem(key);
      },

      /**
       * 重新开始游戏
       */
      restartApp() {
         cc.game.restart();
      },
      /**
       * 退出当前游戏
       */
      exitApp() {
         // body...
         cc.game.end();
      },
      /**
       * 遍历查找指定名称的节点
       */
      seekNodeByName(node, name) {
         if (
            !(node instanceof cc.Node) ||
            !G_chSdk.checkString(name)
         ) {
            return null;
         }

         if (node.name === name) return node;
         let result = null;
         node.children.forEach(ele => {
            if (!result) {
               result = this.seekNodeByName(ele, name);
            }
         });
         return result;
      },

      /*
       * 得到图集中一个子集，子集中图片名字包含str
       * @param {cc.SpriteAtlas} atlas 
       * @param {string} str 
       * @returns {array}
       */
      get_frames(atlas, str, isSort = true) {
         let result = [];
         if (!(atlas instanceof cc.SpriteAtlas)) {
            console.warn('****get_frames 一参数必须是 Atlas', atlas);
            return result;
         }

         let all_frames = atlas.getSpriteFrames();
         result = all_frames.filter(item => item && item.name && item.name.includes(str));
         if (isSort) {
            result = result.sort((a, b) => {
               let a_i = /\d{1,}/g.exec(a.name)[0];
               let b_i = /\d{1,}/g.exec(b.name)[0];

               return a_i - b_i;
            });
         }

         return result;
      },

      /**
       * 将图集处理成spriteFram 与 name 对应的对象
       */
      getFramesDir(atlas) {
         let result = {};
         if (atlas instanceof cc.SpriteAtlas) {
            let all_frames = atlas.getSpriteFrames();
            for (const frame of all_frames) {
               if (frame instanceof cc.SpriteFrame) {
                  result[frame.name] = frame;
               }
            }
         }
         return result;
      },

      /**
       * 重置适配方式，长宽比小于设计图的使用高度适配。
       */
      resetFit() {
         let viewBox = cc.view.getFrameSize();
         let bFitWidth = (viewBox.width / viewBox.height) < (750 / 1334);
         cc.Canvas.instance.fitWidth = !bFitWidth;
         cc.Canvas.instance.fitHeight = bFitWidth;
      },
      /**
       * 从预制资源或节点实例新的节点
       * @param {object} pool cc.NodePool
       * @param {object} prefab cc.Prefab || cc.Node
       */
      createNodeByObj(pool, prefab) {
         if (!(prefab instanceof cc.Node)
            && !(prefab instanceof cc.Prefab)) {
            console.warn('****createNodeByObj 二参必须是节点或预制件', prefab);
            return false;
         }
         let result = null;
         if (pool instanceof cc.NodePool &&
            pool.size() > 0) {
            result = pool.get();
         } else {
            result = cc.instantiate(prefab);
         }

         return result;
      },

      /**
       * 节点Button组件注册事件
       * @param {cc.Component} comp
       * @param {string} nodeName 节点 name
       * @param {function} lister 事件函数
       */
      registerBtnClick(comp, nodeName, lister) {
         let nBtn = this.seekNodeByName(comp.node, nodeName);
         if (!(nBtn instanceof cc.Node)) {
            console.warn(`**按钮${nodeName}: 添加点击事件失败`);
            return;
         }
         let cBtn = nBtn.getComponent(cc.Button);
         if (!cBtn) {
            cBtn = nBtn.addComponent(cc.Button);
         }
         // cBtn.node.on('click', lister, comp);

         var eventHandler = new cc.Component.EventHandler();

         let classNm = G_chSdk.checkString(comp.__classname__) ? comp.__classname__ : comp.name.slice(0, comp.name.indexOf('<'));
         eventHandler.target = comp.node;
         eventHandler.component = classNm;
         eventHandler.handler = lister.name;
         eventHandler.customEventData = "";

         cBtn.clickEvents.push(eventHandler);
      },
      // 将世界坐标转化为OpenGL坐标
      // 基于左下角坐标转为基于左上角
      convertToOpenGLPt(worldPt) {
         // body...
         let openGLPt = cc.v2(0, 0);

         if (
            typeof worldPt.x === "undefined" ||
            worldPt.x === null ||
            typeof worldPt.y === "undefined" ||
            worldPt.y === null
         ) {
            return openGLPt;
         }
         let frameSize = cc.view.getFrameSize();
         openGLPt.x = worldPt.x / cc.winSize.width * frameSize.width;
         openGLPt.y = (1 - worldPt.y / cc.winSize.height) * frameSize.height;

         return openGLPt;
      },

      // 将世界Size转化为OpenGL的Size
      convertToOpenGLSize(worldSize) {
         // body...
         let openGLSize = cc.size(0, 0);

         if (
            typeof worldSize.width === "undefined" ||
            worldSize.width === null ||
            typeof worldSize.height === "undefined" ||
            worldSize.height === null
         ) {
            return openGLSize;
         }

         let frameSize = cc.view.getFrameSize();
         openGLSize.width = worldSize.width / cc.winSize.width * frameSize.width;
         openGLSize.height = worldSize.height / cc.winSize.height * frameSize.height;

         return openGLSize;
      },
      /**
       * 注册场景常驻节点
       * @param {string} tag 
       * @param {cc.Node} node 
       */
      registerGlobalNode(tag, node) {
         // body...
         if (!G_chSdk.checkString(tag)) {
            return;
         }

         if (!node) {
            return;
         }

         if (_globalNodes[tag]) {
            return;
         }

         _globalNodes[tag] = node;
         cc.game.addPersistRootNode(node);
      },
      /**
       * 注销场景常驻节点
       * @param {string} tag 
       */
      unregisterGlobalNode(tag) {
         // body...
         if (!G_chSdk.checkString(tag)) {
            return;
         }

         if (!_globalNodes[tag]) {
            return;
         }

         cc.game.removePersistRootNode(_globalNodes[tag]);
         delete _globalNodes[tag];
      },
      /**
       * 获取全局常驻节点
       * @param {string} tag 
       */
      getGlobalNode(tag) {
         // body...
         if (!G_chSdk.checkString(tag)) {
            return null;
         }

         return _globalNodes[tag];
      },
      /**
       * 注册一个所有弹窗都可以共用的节点
       * @param {*} tag 
       * @param {*} node 
       */
      registerMoveParent(tag, node) {
         if (!G_chSdk.checkString(tag)) {
            return;
         }

         if (!node) {
            return;
         }

         if (_globalNodes[tag]) {
            return;
         }

         _globalNodes[tag] = node;
      },
      /**
       * 根据标志取得所有弹窗都可共用的节点
       * @param {string} tag 
       */
      getMoveParentNode(tag) {
         // body...
         if (!G_chSdk.checkString(tag)) {
            return null;
         }

         return _globalNodes[tag];
      },
      /**
       * 将传入的节点定位到距离屏幕四边的位置
       * x 负为左，正为右
       * y 负为下，正为上
       * 返回该节点在父节点下的cocos位置
       */
      getWidgetPosition(node, x, y) {
         if (!(node instanceof cc.Node)) return;
         let widWH = cc.view.getVisibleSize();
         let nodeWH = node.getContentSize();
         let scale = node.getScale();
         let width = nodeWH.width * scale;
         let height = nodeWH.height * scale;
         let dirX = x > 0 ? 1 : -1;
         let dirY = y > 0 ? 1 : -1;
         let nX = (widWH.width / 2 - Math.abs(x) - width / 2) * dirX;
         let nY = (widWH.height / 2 - Math.abs(y) - height / 2) * dirY;
         // console.log('---', widWH, x, y);

         // node.setPosition(nX, nY);
         return {
            x: Math.round(nX),
            y: Math.round(nY)
         };
      },
      /**
       * 显示指定节点
       * @param {cc.Node} node 
       */
      showThatNode(node) {
         if (!(node instanceof cc.Node)) return;
         if (!node.active) {
            node.active = true;
         }
      },
      /**
       * 隐藏指定节点
       * @param {cc.Node} node 
       */
      hideThatNode(node) {
         if (!(node instanceof cc.Node)) return;
         if (node.active) {
            node.active = false;
         }
      },
      /**
       * 将rgb字符数值创建 cc.Color
       * @param {string} colorStr '255,255,255'
       */
      createColor(colorStr) {
         if (!G_chSdk.checkString(colorStr)) {
            console.warn('---参数必须是字符', colorStr);
            return new cc.Color(255, 255, 255);
         }
         let color = colorStr.split(',');
         color = color.map(item => G_chSdk.isNumber(+item) ? +item : 255);
         if (color.length < 3) return new cc.Color(255, 255, 255);
         return new cc.Color(color[0], color[1], color[2]);
      },
      /**
       * 传入事件对象，将世界坐标转换为节点空间坐标
       * @param {cc.Event.EventTouch} ev 
       * @param {cc.Node} node 
       */
      getNodeSpacePosi(ev, node) {
         if (ev instanceof cc.Event.EventTouch) {
            let posi = ev.getLocation();
            let cPosi = node.convertToNodeSpaceAR(posi);
            return cPosi;
         } else {
            return cc.v2(0, 0);
         }
      },
      /**
       * 下载网络资源
       */
      downloadAssets(url, succ, fail) {
         cc.loader.load(url, (err, result) => {
            if (err) {
               typeof fail === 'function' && fail(err);
            } else {
               typeof succ === 'function' && succ(result);
            }
         });
      },
      downloadImg(imgName, succ, fail) {
         if (_assetsUrl === '') {
            _assetsUrl = require('global_const').HttpConf.assetsUrl;
         }
         if (G_chSdk.checkString(_assetsUrl) &&
            G_chSdk.checkString(imgName)) {
            let url = _assetsUrl + imgName;
            this.downloadAssets(url, succ, fail);
         }
      },
      /**
       * 创建测试节点
       * @param {*} item 
       * @param {*} spriteFrame 
       */
      createTestNode(item, spriteFrame) {
         let node = new cc.Node('abc');
         node.setPosition(item.x, item.y);
         let spr = node.addComponent(cc.Sprite);
         spr.spriteFrame = spriteFrame;
         spr.sizeMode = cc.Sprite.SizeMode.CUSTOM;
         node.setContentSize(item.width, item.height);
         node.color = this.createRandomColor();
         node.opacity = 100;
         return node;
      },
      /**
       * 显示测试区域
       * @param {cc.Node} node 
       * @param {cc.SpriteFrame} spriteFrame 
       */
      setTestArea(node, spriteFrame) {
         let spr = node.addComponent(cc.Sprite);
         spr.sizeMode = cc.Sprite.SizeMode.CUSTOM;
         spr.spriteFrame = spriteFrame;
         node.color = this.createRandomColor();
      },
      /**
       * 创建随机颜色值
       */
      createRandomColor() {
         return new cc.Color(G_chSdk.randomInt(0, 255), G_chSdk.randomInt(0, 255), G_chSdk.randomInt(0, 255));
      },
      /**
       * 将参数节点中心点位置转换为相对世界坐标系的点
       * @param {cc.Node} node 
       * @param {cc.Vec2} point 不传取中心点
       */
      nodeSpaceToWorld(node, point) {
         if (node instanceof cc.Node) {
            point = point ? point : node.position;
            return node.parent.convertToWorldSpaceAR(point);
         }
         else {
            return cc.v2(0, 0);
         }
      },
      /**
       * 将世界坐标系下点转换为节点空间中的点
       * @param {cc.Node} node 
       * @param {cc.Vec2} world 
       */
      worldToNodeSpace(node, world) {
         if (node instanceof cc.Node && world instanceof cc.Vec2) {
            return node.convertToNodeSpaceAR(world);
         }
         else {
            return cc.v2(0, 0);
         }
      },
      /**
       * 获取节点在父节点坐标系下的四个顶点坐标
       * 返回数组类型的值，参数错误返回空数组
       * @param {cc.Node} node
       */
      getNodeVertex(node) {
         if (!(node instanceof cc.Node)) {
            return [];
         }
         let x = node.x;
         let y = node.y;
         let w = node.width / 2;
         let h = node.height / 2;
         let point = [
            cc.v2(Math.round(x - w), Math.round(y + h)),
            cc.v2(Math.round(x + w), Math.round(y + h)),
            cc.v2(Math.round(x + w), Math.round(y - h)),
            cc.v2(Math.round(x - w), Math.round(y - h))
         ];

         let rot = node.rotation;
         point = point.map(item => {
            let pt = G_chSdk.getRotateAnglePoint(item, cc.v2(x, y), rot);
            return cc.v2(pt.x, pt.y);
         });
         return point;
      },
      /**
       * 检测点是否在指定的节点中
       * @param {cc.Vec2} point 测试点
       * @param {cc.Node} node 节点
       */
      pointInNode(point, node) {
         if (
            !(point instanceof cc.Vec2)
            || !(node instanceof cc.Node)
         ) {
            return false;
         }
         return cc.Intersection.pointInPolygon(point, this.getNodeVertex(node));
      },
      /**
       * 与 cc.Component.EventHandler 类的实例方法 emit 一样执行其他组件中的函数
       * 区别是本方法会返回的 EventHandler 的返回值
       * @param {cc.Component.EventHandler} evHandler 另一个组件中的函数
       */
      emitEventHandler(evHandler) {
         if (evHandler instanceof cc.Component.EventHandler) {
            let cName = G_chSdk.checkString(evHandler._componentName) ? evHandler._componentName : 'abc';
            let self = evHandler.target && evHandler.target.getComponent(cName);
            return self && self[evHandler.handler] && self[evHandler.handler].call(self);
         }
         return null;
      },
      /**
       * 获取参数二节点处于相对参数一节点的位置，
       * @param {cc.Node} baseNode 参照节点
       * @param {cc.Node} otherNode 该节点相对参照节点位置
       * @returns {strign} top right bottom left 参数错误或条件不符合返回空字符
       */
      getNodeRelativeLocation(baseNode, otherNode) {
         let result = '';
         if (
            !(baseNode instanceof cc.Node) ||
            !(otherNode instanceof cc.Node)
         ) return result;
         let baseR = baseNode.getBoundingBoxToWorld();
         let otherR = otherNode.getBoundingBoxToWorld();

         return this.getAabbLocation(baseR, otherR);
      },
      /**
       * 获取参数二矩形处于相对参数一矩形的位置，
       * @param {cc.Rect} baseNode 参照矩形
       * @param {cc.Rect} otherNode 该矩形相对参照节点位置
       * @returns {strign} top right bottom left 参数错误或条件不符合返回空字符
       */
      getAabbLocation(baseAabb, otherAabb) {
         let result = '';
         if (
            !(baseAabb instanceof cc.Rect) ||
            !(otherAabb instanceof cc.Rect)
         ) return result;
         let baseR = baseAabb;
         let otherR = otherAabb;

         if (
            otherR.center.x > baseR.xMax &&
            otherR.yMin < baseR.yMax &&
            otherR.yMax > baseR.yMin
         ) {
            // right
            result = 'right';
         }
         else if (
            otherR.center.x < baseR.xMin &&
            otherR.yMin < baseR.yMax &&
            otherR.yMax > baseR.yMin
         ) {
            result = 'left';
         }
         else if (
            otherR.center.y > baseR.yMax &&
            otherR.xMin < baseR.xMax &&
            otherR.xMax > baseR.xMin
         ) {
            result = 'top';
         }
         else if (
            otherR.center.y < baseR.yMin &&
            otherR.xMin < baseR.xMax &&
            otherR.xMax > baseR.xMin
         ) {
            result = 'bottom';
         }

         return result;
      },

      /**
       * 将场景设置时保存的宽高或xy字符值转为数组
       * 默认转为 [0,0]
       * @param {string} data '10,20'
       * @returns {array} [10,20]
       */
      getNodePtORSz(data) {
         let result = [0, 0];
         if (G_chSdk.checkString(data)) {
            let arr = data.split(',');
            arr = arr.map(it => {
               let val = parseFloat(it);
               return Number.isNaN(val) ? 0 : val;
            });
            if (arr.length > 2) {
               arr.length = 2;
            }
            else if (arr.length === 0) {
               arr = result;
            }
            else if (arr.length === 1) {
               arr[1] = 0;
            }

            result = arr;
         }

         return result;
      }

   };
   return {
      getInstance() {
         return _instance;
      }
   };
})();

module.exports = _CC_Utils;