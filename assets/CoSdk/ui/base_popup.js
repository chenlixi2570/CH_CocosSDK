var OpenType = cc.Enum({
   None: 0,
   Scale: 1,
   Opacity: 2,
});

var CloseType = cc.Enum({
   None: 0,
   Scale: 1,
   Opacity: 2,
});

var cls = cc.Class({
   extends: cc.Component,

   properties: {
      rootNode: {
         default: null,
         type: cc.Node,
         tooltip: "根节点，一般为打开关闭动画的根节点"
      },
      _callbacks: {
         default: {},
         visible: false
      },
      openType: {
         type: cc.Enum(OpenType),
         default: OpenType.None,
         tooltip: "弹窗打开方式"
      },
      startOpenScale: {
         default: 0.8,
         tooltip: "打开时，缩放初始值，当openType为Scale值时有效"
      },
      closeType: {
         type: cc.Enum(CloseType),
         default: CloseType.None,
         tooltip: "弹窗关闭方式"
      },
      endCloseScale: {
         default: 0.1,
         tooltip: "关闭时，缩放最终值，当closeType为Scale值时有效"
      },
   },

   show(...args) {
      this.node.active = true;

      if (this.openType === OpenType.None) {
         this.onShowFinished(...args);
      }
      // 缩放动画
      else if (this.openType === OpenType.Scale) {
         this._runScaleOpenAction(() => {
            // body...
            this.onShowFinished(...args);
         });
      }
      // 淡入动画
      else if (this.openType === OpenType.Opacity) {
         this._runOpacityOpenAction(() => {
            this.onShowFinished(...args);
         });
      }
   },

   onShowFinished() { },

   hide() {
      let afterHide = function () {
         // body...
         this.onHideFinished();
         this.node.active = false;
         this.invokeCallback("close");

      }.bind(this);

      if (this.closeType === CloseType.None) {
         afterHide();
      }
      else if (this.closeType === CloseType.Scale) {
         this._runScaleCloseAction(function () {
            // body...
            afterHide();
         });
      }
      else if (this.closeType === CloseType.Opacity) {
         this._runOpacityCloseAction(function () {
            // body...
            afterHide();
         });
      }
   },

   onHideFinished() { },

   _runScaleOpenAction(cb) {
      if (this.rootNode) {
         this.rootNode.stopAllActions();

         // init scale
         this.rootNode.setScale(this.startOpenScale);

         // action
         this.rootNode.runAction(
            cc.sequence(
               cc.scaleTo(0.5, 1.0, 1.0).easing(cc.easeElasticOut(0.5)),
               cc.callFunc(() => {
                  // body...
                  typeof cb === "function" && cb();
               })));
      }
   },
   _runScaleCloseAction(cb) {
      if (this.rootNode) {
         this.rootNode.stopAllActions();

         // init scale
         this.rootNode.setScale(1.0);

         // action
         this.rootNode.runAction(
            cc.sequence(
               cc.scaleTo(0.5, this.endCloseScale, this.endCloseScale).easing(cc.easeElasticIn(0.5)),
               cc.callFunc(function () {
                  // body...
                  typeof cb === "function" && cb();
               })));
      }
   },

   registerCallback: function (key, cb) {
      // body...
      if (!this._checkString(key)) {
         return;
      }

      if (typeof this._callbacks[key] === "undefined") {
         this._callbacks[key] = [];
      }

      // add cb
      this._callbacks[key].push(cb);
   },

   unregisterCallback: function (key, cb) {
      // body...
      if (!this._checkString(key)) {
         return;
      }

      if (typeof this._callbacks[key] !== "undefined") {
         if (!cb) {
            this._callbacks[key] = [];
         }
         else {
            let cbs = this._callbacks[key];

            let targetIndex = cbs.indexOf(cb);
            if (targetIndex > -1) {
               cbs.splice(targetIndex, 1);
            }
         }
      }
   },

   invokeCallback: function (key) {
      // body...
      if (!this._checkString(key)) {
         return;
      }

      if (typeof this._callbacks[key] !== "undefined") {
         let cbs = [].concat(this._callbacks[key]);

         // arguments
         let args = Array.prototype.slice.call(arguments);
         args.shift();

         // callback
         for (let i = 0; i < cbs.length; i++) {
            let cb = cbs[i];
            typeof cb === 'function' && cb.apply(null, args);
         }
      }
   },

   _checkString: function (string) {
      // body...
      if (typeof string !== "string" || string === "") {
         return false;
      }

      return true;
   },

   /** CHEN  增加淡入动画**/
   _runOpacityOpenAction(cb) {
      if (this.rootNode) {
         this.rootNode.stopAllActions();

         // init scale
         this.rootNode.opacity = 0;

         // action
         this.rootNode.runAction(
            cc.sequence(
               cc.fadeIn(0.4),
               cc.callFunc(() => {
                  // body...
                  typeof cb === "function" && cb();
               })
            )
         );
      }
   },
   _runOpacityCloseAction(cb) {
      if (this.rootNode) {
         this.rootNode.stopAllActions();

         // init scale
         this.rootNode.opacity = 255;

         // action
         this.rootNode.runAction(
            cc.sequence(
               cc.fadeOut(0.4),
               cc.callFunc(function () {
                  // body...
                  typeof cb === "function" && cb();
               })
            )
         );
      }
   },
   /**  CHEN **/
});

// export
module.exports = cls;