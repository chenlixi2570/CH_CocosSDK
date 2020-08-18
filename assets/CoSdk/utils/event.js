
/**
 * 实现订阅发布模式
 * addEventListener 方法添加订阅者
 * removeEventListener 方法删除订阅者
 * dispatchEvent 方法发布事件
 * hasEventListener 方法查询事件名是否被占用
 */

let _Event_Listener = (function () {
   let _listeners = {}; // 保存注册的事件函数
   let _onceEvents = { // 保存全局只执行一次事件的状态
      // 'eventName':{ // 属性名为注册事件名
      //    isEmit: false, // 该事件是否已经触发了
      //    params: [], // 该事件触发时传入的参数数组
      // }
   };
   function _checkString(data) {
      return typeof data === 'string' && data !== '';
   }
   function _checkFunc(data) {
      return typeof data === 'function';
   }
   function _checkObject(data) {
      return Object.prototype.toString.call(data).slice(8, -1).toLowerCase() === 'object';
   }

   let _instance = {
      /**
       * 添加自定义事件函数 addEventListener 方法的别名
       * @param {string} event_name 自定义事件名
       * @param {function} listener 监听函数
       * @param {object} call_target 绑定域
       */
      on(event_name, listener, call_target = null) {
         this.addEventListener(event_name, listener, call_target);
      },
      /**
       * 删除自定义事件监听函数，如第二、三参未传值，则删除该事件所有监听函数
       * removeEventListener 方法的别名
       * @param {string} event_name 自定义事件名
       * @param {function} listener 监听函数
       * @param {object} call_target 绑定域 
       */
      off(event_name, listener, call_target = null) {
         this.removeEventListener(event_name, listener, call_target);
      },
      /**
       * 添加自定义事件函数
       * @param {string} event_name 自定义事件名
       * @param {function} listener 监听函数
       * @param {object} call_target 绑定域
       */
      addEventListener(event_name, listener, call_target = null) {
         if (
            !_checkString(event_name) ||
            !_checkFunc(listener)
         ) {
            console.warn('** addEventListener 参数错误', event_name);
            return;
         }

         if (!Array.isArray(_listeners[event_name])) {
            _listeners[event_name] = [];
         }

         _listeners[event_name].push({
            listener: listener,
            currentTarget: call_target
         });

      },
      /**
       * 删除自定义事件监听函数，如第二、三参未传值，则删除该事件所有监听函数
       * @param {string} event_name 自定义事件名
       * @param {function} listener 监听函数
       * @param {object} call_target 绑定域 
       */
      removeEventListener(event_name, listener, call_target = null) {
         if (!_checkString(event_name)) return;

         if (listener !== null && listener !== undefined && !_checkFunc(listener)) return;

         if (Array.isArray(_listeners[event_name])) {
            if (
               listener === null ||
               listener === undefined
            ) {
               _listeners[event_name] = [];
            }
            else {
               for (const [i, key] of _listeners[event_name].entries()) {
                  if (key.listener === listener &&
                     key.currentTarget === call_target) {
                     _listeners[event_name].splice(i, 1);
                     break;
                  }
               }
            }
         }
      },
      /**
       * 发布事件
       * @param {string} event_name 自定义事件名
       * @param  {...any} args 需要传递给监听函数的参数
       */
      dispatchEvent(event_name, ...args) {
         if (!_checkString(event_name)) return null;
         let result = [];
         if (Array.isArray(_listeners[event_name])) {
            for (const key of _listeners[event_name]) {
               if (_checkObject(key.currentTarget)) {
                  let res = key.listener.call(key.currentTarget, ...args);
                  result.push(res);
               }
               else {
                  let res = key.listener(...args);
                  result.push(res);
               }
            }
         }
         return result;
      },
      /**
       * 事件名是否已经有监听函数了
       * @param {string} event_name 自定义事件名
       */
      hasEventListener(event_name) {
         if (!_checkString(event_name)) return false;
         return Array.isArray(_listeners[event_name]);
      },
      /**
       * 监听一个只触发一次的事件
       * 该事件全局只触发一次，事件触发前或触发后监听函数都会调用一次
       * 如果监听时，事件已经触发，则监听函数立即执行
       * 如果监听时，事件没有触发，则保存监听函数，等待事件触发后执行监听函数，
       * 监听函数执行完后会立刻销毁保存的监听函数
       */
      addEventOnce(event_name, listener, call_target = null) {
         if (
            !_checkString(event_name) ||
            !_checkFunc(listener)
         ) {
            console.warn('** addEventOnce 参数错误', event_name);
            return;
         }

         if (!_checkObject(_onceEvents[event_name])) {
            /**
             * 还没记录事件触发状态
             * 新增一条记录，然后将事件监听函数保存起来
             */
            _onceEvents[event_name] = {
               isEmit: false,
               params: []
            };

            this.addEventListener(event_name, listener, call_target);
         }
         else {
            /**
             * 已经有记录事件触发状态
             * 检查事件是否已经触发，
             * 已触发执行监听函数，未触发保存监听函数
             */
            let status = _onceEvents[event_name];
            if (status.isEmit) {
               // 执行监听函数
               if (_checkObject(call_target)) {
                  listener.call(call_target, ...status.params);
               }
               else {
                  listener(...status.params);
               }
            }
            else {
               // 保存监听函数
               this.addEventListener(event_name, listener, call_target);
            }
         }
      },
      /**
       * 触发全局只能触发一次的事件
       */
      dispatchOnce(event_name, ...args) {
         if (!_checkString(event_name)) return;
         console.log(`==全局只触发一次事件${event_name} 派发`);
         if (!_checkObject(_onceEvents[event_name])) {
            /**
             * 没有记录事件触发状态对象
             * 此时该事件还没被监听过
             * 新增一条记录，然后将触发状态保存起来
             */
            _onceEvents[event_name] = {
               isEmit: true,
               params: args
            };
         }
         else {
            /**
             * 已经有记录事件触发状态对象
             * 检查事件是否已经触发，
             * 已触发不再重复触发，未触发执行监听函数然后删除保存的监听函数
             */
            let status = _onceEvents[event_name];

            if (!status.isEmit) {
               status.isEmit = true;
               status.params = args;
               // console.log('==事件监听函数', _listeners[event_name].length);

               // 执行监听函数
               this.dispatchEvent(event_name, ...args);
               // 然后删除保存的监听函数
               this.removeEventListener(event_name);
            }
            else {
               // 不重复触发事件
            }
         }
      }
   };

   return () => {
      return _instance;
   };
})();

module.exports = _Event_Listener;