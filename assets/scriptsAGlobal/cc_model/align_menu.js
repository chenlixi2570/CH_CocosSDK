/*
 * @Author: Chen Li Xi
 * @Description: 同步胶囊按钮高度
 */
let _menuRect = null;
let _isLog = true;
cc.Class({
   extends: cc.Component,
   properties: {
      isParallel: {
         default: true,
         tooltip: '与胶囊按钮平行'
      },
      downDir: {
         default: 0,
         tooltip: '当不平行时距离胶囊下边沿距离'
      },
   },
   editor: CC_EDITOR && {
      requireComponent: cc.Widget,
   },
   onLoad() {
      let widget = this.node.getComponent(cc.Widget);
      widget.isAlignTop = true;
      let rect = this.getMenuBtnRect();
      if (!rect || typeof rect !== 'object') return;

      _isLog && console.log('==胶囊按钮位置', rect);
      _isLog = false;

      if (this.isParallel) {
         let top = rect.top * 2;
         top = top - (this.node.height / 2 - rect.height);
         widget.top = top;
      } else {
         let top = (rect.top + rect.height) * 2 + this.downDir;
         widget.top = top;
      }
   },
   getMenuBtnRect() {
      if (_menuRect !== null) return _menuRect;
      // 默认值
      _menuRect = {
         bottom: 40,
         height: 32,
         left: 278,
         right: 365,
         top: 8,
         width: 87
      };
      let _plat = G_chSdk.getPlat();
      if (_plat && typeof _plat.getMenuButtonBoundingClientRect === 'function') {
         _menuRect = _plat.getMenuButtonBoundingClientRect();
      }
      return _menuRect;
   }

});