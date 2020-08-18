// 摄相机跟随角色

cc.Class({
   extends: cc.Component,
   properties: {
      roleCamera: cc.Camera,
   },

   onLoad() {
      this._roleIntX = require('project_const').roleIntX;
      if (!this.roleCamera) return;
      this._initX = this.roleCamera.node.x;
      G_chSdk.addEventListener(
         'role_camera_update', // 角色每次改变x轴时候触发这个事件，则摄相机跟随角色
         this.updateCameraPosition,
         this
      );
      G_chSdk.addEventListener(
         'set_camera_boundary', // 设置跟随边界，超出出边界不再跟随
         this.setBoundary,
         this
      );

      G_chSdk.addEventListener(
         'role_camera_init', // 摄相机回到原始位置，用于新关卡重新开始时
         this.cameraInit,
         this
      );

      G_chSdk.addEventListener(
         G_Const.EventName.GAME_AGAIN,
         this.gameAgain,
         this
      );
      G_chSdk.addEventListener(
         G_Const.EventName.GAME_DIE,
         this.gameDie,
         this
      );
   },

   gameDie() {
      this.roleCamera.depth = 1;
   },
   gameAgain() {
      this.roleCamera.depth = 3;
   },

   cameraInit() {
      if (this.roleCamera instanceof cc.Camera) {
         this.roleCamera.node.x = this._initX;
         this.roleCamera.depth = 3;
      }
   },

   setBoundary(targetNode) {
      this._cameraMaxX = targetNode.width / 2 - cc.winSize.width / 2;
      // y轴不跟随
      // this._cameraMaxY = targetNode.height / 2 - cc.winSize.height / 2;
   },

   updateCameraPosition(targetNode) {
      if (!(targetNode instanceof cc.Node)) return;

      let target = targetNode.position;
      if (G_chSdk.isNumber(this._cameraMaxX) && target.x > this._cameraMaxX) {
         target.x = this._cameraMaxX;
      }
      if (G_chSdk.isNumber(this._cameraMaxX) && target.x < -this._cameraMaxX) {
         target.x = -this._cameraMaxX;
      }
      // if (target.y > this._cameraMaxY) {
      //    target.y = this._cameraMaxY;
      // }
      // if (target.y < -this._cameraMaxY) {
      //    target.y = -this._cameraMaxY;
      // }

      this.roleCamera.node.x = target.x - this._roleIntX;
   },

   onDestroy() {
      G_chSdk.removeEventListener(
         'role_camera_update',
         this.updateCameraPosition,
         this
      );
      G_chSdk.removeEventListener(
         'set_camera_boundary',
         this.setBoundary,
         this
      );

      G_chSdk.removeEventListener(
         'role_camera_init',
         this.cameraInit,
         this
      );

      G_chSdk.removeEventListener(
         G_Const.EventName.GAME_AGAIN,
         this.gameAgain,
         this
      );
      G_chSdk.removeEventListener(
         G_Const.EventName.GAME_DIE,
         this.gameDie,
         this
      );
   },
});