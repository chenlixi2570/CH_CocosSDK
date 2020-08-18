// format method for String
String.prototype.format = function (args) {
   var result = this;

   if (arguments.length < 1) {
      return result;
   }

   //如果模板参数是数组
   var data = arguments;

   if (arguments.length == 1 && typeof (args) == "object") {
      //如果模板参数是对象
      data = args;
   }

   for (var key of Object.keys(data)) {
      var value = data[key];
      if (undefined != value) {
         result = result.replace("{" + key + "}", value);
      }
   }

   return result;
};


let { IS_TEST } = require('global_const');
let _log = console.log;
console.log = function () {
   // let bool = (typeof arguments[0] === 'string' && arguments[0][0] !== '=');
   let bool = true;
   if (IS_TEST && bool) {
      _log.apply(null, arguments);
   }
};