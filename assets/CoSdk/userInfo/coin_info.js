/*
 * @Author: Chen Li Xi
 * @Description: 金币与体力管理模块
 */
let userInfo = require('user_info').getInstance();

let _playerInfo = null;
let _coinBigNumber = null;
let _totalCoinBigNumber = null;

let _loadCoin = function () {
   // body...
   if (_playerInfo && !_coinBigNumber) {
      // 防止出现NaN
      if (Number.isNaN(parseFloat(_playerInfo.coin))) {
         _playerInfo.coin = "0";
      } else {
         _playerInfo.coin = parseFloat(_playerInfo.coin) + "";
      }
      _coinBigNumber = BigNumber(_playerInfo.coin);
   }
};

let _saveCoin = function () {
   // body...
   if (_playerInfo && _coinBigNumber) {
      _playerInfo.coin = _coinBigNumber.toFixed(0);
      userInfo.updateUserInfo();
   }
   // event
   G_chSdk.dispatchEvent(G_Const.EventName.CH_COIN_CHANGED, _playerInfo.coin);
};

let _loadTotalCoin = function () {
   // body...
   if (_playerInfo && !_totalCoinBigNumber) {
      _totalCoinBigNumber = BigNumber(_playerInfo.totalCoin);
   }
};

let _saveTotalCoin = function () {
   // body...
   if (_playerInfo && _totalCoinBigNumber) {
      _playerInfo.totalCoin = _totalCoinBigNumber.toFixed(0);
   }
};
function initUserInfo() {
   userInfo.onLoad(playerInfo => {
      _playerInfo = playerInfo;
      _loadCoin();
      _loadTotalCoin();
   });
}

let _Coin_Info = (function () {
   let _instance = {

      /**
       * 获取玩家金币数 返回类型BigNumber
       */
      getCoin() {
         // body...
         return _coinBigNumber;
      },

      /**
       *  获取玩家总金币数 返回类型BigNumber
       */
      getTotalCoin() {
         // body...
         return _totalCoinBigNumber;
      },
      /**
       * 增加玩家金币数
       * num必须是number类型或BigNumber类型
       * @param {number or BigNumber} num 
       */
      plusCoin(num) {
         // body...
         if (!_coinBigNumber || !_totalCoinBigNumber) {
            console.warn("PlayerInfo.plusCoin: can not operation coin data before login...");
            return;
         }

         if (typeof num !== "number" && !BigNumber.isBigNumber(num)) {
            console.warn("PlayerInfo.plusCoin: param num must be a type of number or BigNumber...");
            return;
         }

         _coinBigNumber = _coinBigNumber.plus(num);
         _totalCoinBigNumber = _totalCoinBigNumber.plus(num);
         _saveTotalCoin();
         _saveCoin();
      },

      /**
       * 减少玩家金币数
       * num必须是number类型或BigNumber类型
       * @param {number or BigNumber} num 
       */
      minusCoin(num) {
         // body...
         if (!_coinBigNumber) {
            console.warn("PlayerInfo.minusCoin: can not operation coin data before login...");
            return;
         }

         if (typeof num !== "number" && !BigNumber.isBigNumber(num)) {
            console.warn("PlayerInfo.minusCoin: param num must be a type of number or BigNumber...");
            return;
         }

         _coinBigNumber = _coinBigNumber.minus(num);
         _saveCoin();
      },
      /**
       * 金币是否足够扣除操作
       */
      canMinusCoin(num) {
         num = +num;
         if (Number.isNaN(num)) {
            return false;
         } else {
            let bigNum = BigNumber(num);
            let status = _coinBigNumber.comparedTo(bigNum);
            return status === 1 || status === 0;
         }
      },
      /***************体力*******************************/
      /**
       * 获取玩家当前体力
       */
      getPhysical() {
         if (_playerInfo) {

            return _playerInfo.physical;
         } else {
            return 0;
         }
      },
      /**
       * 增加体力
       * @param {number} num 
       */
      plusPhysical(num) {
         // body...
         num = +num;
         if (_playerInfo && !Number.isNaN(num)) {
            _playerInfo.physical += num;
            userInfo.updateUserInfo();
            G_chSdk.dispatchEvent(G_Const.EventName.CH_PHYS_CHANGED, _playerInfo.physical);
         }
      },

      /**
       * 减少体力
       * @param {number} num 
       */
      minusPhysical(num) {
         // body...
         num = +num;

         if (_playerInfo && this.canMinusPhysical(num)) {
            _playerInfo.physical -= num;
            userInfo.updateUserInfo();
            G_chSdk.dispatchEvent(G_Const.EventName.CH_PHYS_CHANGED, _playerInfo.physical);
         }
      },
      /**
       * 体力是否足够扣除操作
       */
      canMinusPhysical(num) {
         num = +num;
         if (Number.isNaN(num)) {
            return false;
         } else {
            return _playerInfo.physical >= num;
         }
      },
      /****** 钻石 ******/
      /**
       * 获取玩家当前钻石数
       */
      getGem() {
         if (_playerInfo) {
            return _playerInfo.gem;
         } else {
            return 0;
         }
      },
      /**
       * 增加玩家钻石数
       * @param {number} num 
       */
      plusGem(num) {
         // body...
         num = +num;

         if (_playerInfo && !Number.isNaN(num)) {
            _playerInfo.gem += num;
            userInfo.updateUserInfo();
            G_chSdk.dispatchEvent(G_Const.EventName.EN_GEM_CHANGE, _playerInfo.gem);
         }
      },

      /**
       * 减少玩家钻石数
       * @param {number} num 
       */
      minusGem(num) {
         // body...
         num = +num;

         if (_playerInfo && this.canMinusGem(num)) {
            _playerInfo.gem -= num;
            userInfo.updateUserInfo();
            G_chSdk.dispatchEvent(G_Const.EventName.EN_GEM_CHANGE, _playerInfo.gem);
            return true;
         } else {
            return false;
         }
      },
      /**
       * 钻石是否足够扣除操作
       */
      canMinusGem(num) {
         num = +num;
         if (Number.isNaN(num)) {
            return false;
         } else {
            return _playerInfo.gem >= num;
         }
      }
   };
   initUserInfo();
   return {
      getInstance() {
         return _instance;
      }
   };
})();

module.exports = _Coin_Info;