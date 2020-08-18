/*
 * @Author: Chen Li Xi
 * @Description: 游戏流程功能模块
 */

let _instance = null;
let game_over_status = Symbol('game_over_status');

class _Game_Flow {
   constructor() {
      if (!_instance) {
         this.gameLoading = 0; // 加载进度条
         this.gameLoadTotal = 3; // 加载进度条

         // 0 表示游戏中，-1 失败，1 成功，2 暂停
         this[game_over_status] = 2;

         this.coinCount = 0; // 当前局获得金币数
         this.gemCount = 0; // 当前局获得钻石数
         this.starCount = 0; // 当前局获得星星数
         _instance = this;
      }
      return _instance;
   }

   static getInstance() {
      return _instance || (_instance = new this);
   }
   /**
    * 进度条进1
    */
   addLoading() {
      this.gameLoading += 1;
   }
   /**
    * 进度条是否完成
    */
   isLoadSuccess() {
      return this.gameLoading === this.gameLoadTotal;
   }
   /**
    * 进度比例
    */
   getLoadScale() {
      return this.gameLoading / this.gameLoadTotal;
   }
   /**
    * 游戏开始
    */
   gameStart() {
      this.coinCount = 0; // 当前局获得金币数
      this.gemCount = 0; // 当前局获得钻石数
      this.starCount = 0; // 当前局获得星星数
      this.gameing();
   }
   /**
    * 游戏结束
    */
   gameEnd(isSucc) {
      if (isSucc) {
         this.gameSuccess();
         G_chInfo.addLatestLevel();
      }
      else {
         this.gameFail();
      }
   }
   /**
    * 游戏成功
    */
   gameSuccess() {
      this[game_over_status] = 1;
   }

   /**
    * 游戏失败
    */
   gameFail() {
      this[game_over_status] = -1;
   }
   /**
    * 游戏中
    */
   gameing() {
      this[game_over_status] = 0;
   }
   /**
    * 游戏暂停
    */
   gamePause() {
      this[game_over_status] = 2;
   }
   /**
    * 当前游戏状态
    */
   getGameStatus() {
      return this[game_over_status];
   }
   /**
    * 是否在游戏中
    */
   isGameing() {
      return this[game_over_status] === 0;
   }
   /**
    * 游戏是否成功
    */
   isGameSuccess() {
      return this[game_over_status] === 1;
   }
   /**
    * 游戏是否失败
    */
   isGameFail() {
      return this[game_over_status] === -1;
   }
}

module.exports = _Game_Flow;