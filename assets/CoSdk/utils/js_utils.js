/**
 * js语言层面的工具函数，
 * 不依赖任何环境
 * 需要支持ES6
 */
let _JS_Utils = (function () {

   let _instance = {
      /**
       * 返回数据类型字符串
       * null undefined string number array boolean
       * symbol set map date regexp weakmap weakset promise
       * @param {any} value 
       */
      dataType(value) {
         return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
      },
      isString(data) {
         return this.dataType(data) === 'string';
      },
      isObject(data) {
         return this.dataType(data) === 'object';
      },
      /**
       * 是否为数字值
       * @param {any} data 
       */
      isNumber(data) {
         return this.dataType(data) === 'number' && !Number.isNaN(data);
      },
      /**
       * 是否为整数
       * @param {any} data 
       */
      isInt(data) {
         if (!this.isNumber(data)) return false;
         return Math.ceil(data) === data;
      },

      /**
       * 检测参数是否为字符类型且不是空字符
       * @param {any} str 
       */
      checkString(str) {
         return this.isString(str) && str !== '';
      },
      /**
       * 生成随机整数
       * Math.randow 生成一个大于等于0.0并小于1.0的伪随机数
       * @param {number} min 
       * @param {number} max 
       */
      randomInt(min, max) {
         if (!this.isNumber(min) || !this.isNumber(max)) {
            return 0;
         }
         switch (arguments.length) {
            case 1:
               return Math.floor(Math.random() * min + 1);
            case 2:
               return Math.floor(Math.random() * (max - min + 1) + min);
            default:
               return 0;
         }
      },
      random(min, max) {
         return this.randomInt(min, max);
      },

      /**
       * 生成随机浮点数
       * 参数必需为 Number 类型的值，参数错误默认返回 0
       * @param {number} min 
       * @param {number} max 
       */
      randomDouble(min, max) {
         if (!this.isNumber(min) || !this.isNumber(max)) {
            return 0;
         }
         return Math.random() * (max - min) + min;;
      },

      /**
       * 生成指定位数的随机字符串
       */
      generateString(count = 32) {
         // body...
         let str = '';

         if (this.isNumber(count)) {
            for (let i = 0; i < count; i++) {
               if (Math.random() < 0.5) {
                  str += String.fromCharCode(this.randomInt('0'.charCodeAt(), '0'.charCodeAt() + 9));
               }
               else {
                  str += String.fromCharCode(this.randomInt('a'.charCodeAt(), 'a'.charCodeAt() + 25));
               }
            }
         }

         return str;
      },


      /**
       * 递归删除对象下的某个属性
       * @param {object or array} object 对象或数组
       * @param {string} prop 属性名
       */
      deleteProperty(object, prop) {
         if (!this.checkString(prop)) return;

         let delObjProp = (obj, prop) => {
            let keys = Object.keys(obj);
            for (const key of keys) {
               if (key == prop) {
                  delete obj[prop];
               } else if (Array.isArray(obj[key]) || this.isObject(obj[key])) {
                  this.deleteProperty(obj[key], prop);
               }
            }
         };

         Array.isArray(object) && object.forEach(it => {
            if (this.isObject(it)) {
               delObjProp(it, prop);
            } else if (Array.isArray(it)) {
               this.deleteProperty(it, prop);
            }
         });

         if (this.isObject(object)) {
            delObjProp(object, prop);
         }
         return object;
      },
      
      /**
       * 比较版本号
       * @param {string} v1  '1.11.2'
       * @param {string} v2  '1.9.9'
       * @retrun : 1 v1 > v2 | 0 v1 == v2 | -1 v1 < v2
       */
      compareVersion(v1, v2) {
         v1 = v1.split('.');
         v2 = v2.split('.');
         var len = Math.max(v1.length, v2.length);

         while (v1.length < len) {
            v1.push('0');
         }
         while (v2.length < len) {
            v2.push('0');
         }

         for (var i = 0; i < len; i++) {
            var num1 = parseInt(v1[i]);
            var num2 = parseInt(v2[i]);

            if (num1 > num2) {
               return 1;
            } else if (num1 < num2) {
               return -1;
            }
         }
         return 0;
      },
   };
   return {
      getInstance() {
         return _instance;
      }
   };
})();
module.exports = _JS_Utils;

