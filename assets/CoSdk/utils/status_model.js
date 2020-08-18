/**
 * 状态模型类用法：
 * 如果有一个事物有两个以上的状态，需要进行状态管理，则实例化一个该类的对象
 * 用 key 来保存要管理的各个事物的状态
 * 检查/设定事件的状态都传入 key 来管理
 * 默认该事物不存在设定的任何状态
 */

let _map = {};
const CUR_STATUS = Symbol('cur_status');
let pow = 0;
function checkString(str) {
   if (typeof str === 'string' && str !== 0) {
      return true;
   }
   return false;
}

function isNumber(n) {
   return n === +n;
}
class Status_Model {
   constructor() {
      this[CUR_STATUS] = 0; //当前状态 1 2 3 4 5 6 7 8
   }
   /**
    * 给某事物设定一个状态值，之后都使用该标识操作该事物状态
    * 状态值的以数字递增编码表示，该码值为 2 的幂 1，2，4，8
    * @param {string} key 状态的唯一标识
    */
   setStatus(key) {
      if (!checkString(key) || isNumber(_map[key])) {
         return console.warn(`传入的参数key: ${key} 存在错误`);
      }

      _map[key] = 2 ** pow;
      pow += 1;
   }
   /**
    * 查看一个事物是否存在某状态
    * @param {string} key 状态标识
    */
   isOpen(key) {
      if (!checkString(key) || !isNumber(_map[key])) {
         console.warn(`传入的参数key: ${key} 存在错误`);
         return false;
      }
      let result = this[CUR_STATUS] & _map[key];
      result = result > 0;
      return result;
   }
   /**
    * 设置一个事物的某个状态为打开
    * @param {string} key 状态标识
    */
   setOpen(key) {
      if (!checkString(key) || !isNumber(_map[key])) {
         return console.warn(`传入的参数key: ${key} 存在错误`);
      }
      this[CUR_STATUS] = this[CUR_STATUS] | _map[key];
   }
   /**
    * 设置一个事物的某个状态为关闭
    * @param {string} key 状态标识
    */
   setClose(key) {
      if (!checkString(key) || !isNumber(_map[key])) {
         return console.warn(`传入的参数key: ${key} 存在错误`);
      }
      this[CUR_STATUS] = this[CUR_STATUS] & ~_map[key];
   }

   getCurStatus() {
      return this[CUR_STATUS];
   }
}


module.exports = Status_Model;
