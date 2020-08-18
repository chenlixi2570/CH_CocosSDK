/*
 * @Author: Chen Li Xi
 * @Description: 需要依赖第三方js库的工具类
 */

let _Rely_Utils = (function () {

   let _instance = {
      /**
       * 16进制字符转进制数组
       * @returns {Uint8Array}
       */
      HexString2Uint8Array(string) {
         // body...
         if (string === '' || string.length % 2 != 0) {
            return (new Uint8Array());
         }

         let numArr = [];

         for (let i = 0; i < string.length; i = i + 2) {
            numArr[numArr.length] = parseInt(string[i] + string[i + 1], 16);
         }

         return (new Uint8Array(numArr));
      },

      /**
       * 进制数组转16进制字符
       * @returns {Hex String}
       */
      Uint8Array2HexString(uint8Arr) {
         // body...
         let str = '';

         for (let i = 0; i < uint8Arr.length; i++) {
            let hex = uint8Arr[i].toString(16).toUpperCase();
            str += hex.length == 1 ? ('0' + hex) : hex;
         }

         return str;
      },

      /**
       * 将大数字转换为字符数字
       * k = 3个0, m = 6个0, b = 9个0, t = 12个0, 
       * aa = 15个0, bb = 18个0, cc = 21个0 ... zz = 246个0
       * bigNum 需要转换的数字
       * roundNum 转换后数据的有效位数
       */
      bigNumber2StrNumber(bigNum, roundNum) {
         if (!bigNum) {
            return "";
         }
         else {
            if (typeof bigNum === "number") {
               bigNum = BigNumber(bigNum);
            }

            if (!(bigNum instanceof BigNumber)) {
               return "";
            }

            if (bigNum.e <= 4) {
               return bigNum.toFixed();
            }

            let unit = "k";

            if (bigNum.e >= 6) {
               for (let bit = 6; bit <= 246; bit = bit + 3) {
                  if (bigNum.e >= bit && bigNum.e < (bit + 3)) {
                     if (bit === 6) {
                        unit = "m";
                     }
                     else if (bit === 9) {
                        unit = "b";
                     }
                     else if (bit === 12) {
                        unit = 't';
                     }
                     else {
                        unit = String.fromCharCode("a".charCodeAt() + (bit - 15) / 3);
                        unit += unit;
                     }

                     break;
                  }
               }
            }

            // roundNum default 3
            if (typeof roundNum !== "number") {
               roundNum = 3;
            }
            let exp = bigNum.toExponential(roundNum - 1);
            let valid = BigNumber(exp.substring(0, exp.indexOf("e"))).times(Math.pow(10, bigNum.e % 3));
            return valid.toString() + unit;
         }
      }
   };
   return {
      getInstance() {
         return _instance;
      }
   };
})();
module.exports = _Rely_Utils;