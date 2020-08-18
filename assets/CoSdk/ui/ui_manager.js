let UIRegisterInfos = require('ui_registor_cfg');

var _UIManager = (function () {
   var _instance;

   function init() {
      var _UIInfos = {};
      var _UIRoot = null;

      return {
         registerAllUIs(cb) {
            // console.log(`==共注册场景页面${UIRegisterInfos.length}`, UIRegisterInfos);
            let prePathArr = UIRegisterInfos.map(item => {
               return item.prefab;
            });
            cc.loader.loadResArray(prePathArr, cc.Prefab, (err, pref) => {
               if (err) {
                  console.error(err);
               }
               else {
                  let prefObj = {};
                  for (let val of pref) {
                     prefObj[val.name] = val;
                  }
                  UIRegisterInfos.forEach(info => {
                     let preName = info.prefab.split('/');
                     this.registerUI(info.claName, info.zIndex, info.isAutoDestory, prefObj[preName.pop()]);
                  });
                  typeof cb === 'function' && cb();
               }
            });
         },
         // 一般一个场景注册一次，离开场景反注册
         registerUIRoot(root) {
            _UIRoot = root;
         },

         unregisterUIRoot() {
            _UIRoot = null;
         },
         registerUI(clsName, zIndex, isAutoDestory, prefab) {
            // body...
            if (!G_chSdk.checkString(clsName)) {
               console.warn("UIManager.registerUI: clsName must be a type of string and not empty...");
               return;
            }

            if (typeof _UIInfos[clsName] !== "undefined") {
               console.warn(`UIManager.registerUI: ${clsName} has registered before...`);
               return;
            }

            if (!prefab || !(prefab instanceof cc.Prefab)) {
               return console.warn('**注册页面需要预制件');
            }


            _UIInfos[clsName] = {
               clsName: clsName,
               zIndex: zIndex,
               isAutoDestory: isAutoDestory, // 隐藏后是否销毁
               prefab: prefab,
               closeCb: null,
               node: null,
               comp: null
            };
         },

         unregisterUI(clsName) {
            // body...
            let info = this._doCheck(clsName, "unregisterUI");

            if (info) {
               delete _UIInfos[clsName];

            }
         },

         showUI(clsName, ...args) {
            let info = this._doCheck(clsName, "showUI");

            if (info) {
               if (!info.node) {
                  info.node = cc.instantiate(info.prefab);

                  if (info.node) {
                     info.comp = info.node.getComponent(clsName);
                     info.node.active = false;
                     info.node.parent = _UIRoot;
                     info.node.zIndex = info.zIndex;
                  }
               }
               if (typeof args[0] === 'function') {
                  // save
                  info.closeCb = args.shift();
               }
               if (!info.comp) {
                  console.warn(`**弹窗${clsName}未注册成功`);
                  return null;
               }
               // show
               info.comp.showArgs = args;
               info.comp.show(...args);
               return [info.node, info.comp];

            }

            return null;
         },

         hideUI(clsName, ...args) {
            let info = this._doCheck(clsName, "hideUI");

            if (info && info.node) {
               let onHideFinished = function () {
                  // body...
                  info.comp.unregisterCallback("close");

                  if (typeof info.closeCb === "function") {
                     info.closeCb(...args);
                     info.closeCb = null;
                  }

                  if (info.isAutoDestory) {
                     this._destroyUI(info);
                  }
               }.bind(this);

               // hide
               info.comp && info.comp.registerCallback("close", onHideFinished);
               info.comp && info.comp.hide();
            }
         },

         preloadUI(clsNames, cb) {
            // body...
            let nodes = [];

            if (typeof clsNames === "string") {
               let clsName = clsNames;
               nodes.push(this._doPreloadUI(clsName));
            }
            else if (Array.isArray(clsNames)) {
               for (let i = 0; i < clsNames.length; i++) {
                  let clsName = clsNames[i];
                  nodes.push(this._doPreloadUI(clsName));
               }
            }

            G_Scheduler.schedule("UIManager_Preload_UI", function () {
               // body...
               for (let i = 0; i < nodes.length; i++) {
                  let node = nodes[i];
                  node.active = false;
                  node.opacity = 255;
               }

               // cb
               typeof cb === "function" && cb();
            }.bind(this), 0.1, 0);
         },

         _doPreloadUI(clsName) {
            let info = this._doCheck(clsName, "preloadUI");

            if (info) {
               let ret = this.showUI(clsName);
               let node = null;

               if (ret) {
                  node = ret[0];
               }

               if (node) {
                  node.opacity = 0;
                  return node;
               }
            }

            return null;
         },

         _doCheck(clsName, tag) {
            if (!G_chSdk.checkString(clsName)) {
               console.warn(`UIManager.${tag}: clsName must be a type of string and not empty...`);
               return null;
            }

            let info = _UIInfos[clsName];

            if (typeof info === "undefined") {
               console.warn(`UIManager.${tag}: ${clsName} has not registered before...`);
               return null;
            }

            return info;
         },

         _destroyUI(info) {
            if (info && info.node) {
               info.node.destroy();
               info.node = null;
            }
         },
      };
   }

   return {
      getInstance: function () {
         if (!_instance) {
            _instance = init();
         }

         return _instance;
      }
   };
})();

// export
module.exports = _UIManager;