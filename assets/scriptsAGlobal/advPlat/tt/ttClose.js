// 头条领取奖励按钮按钮
cc.Class({
   extends: cc.Component,
   properties: {
      toggIcon: cc.Node, // 选中状态
      normalClose: cc.Node, // 正常关闭
      videoClose: cc.Node, // 看广告关闭
      autoVideo: cc.Node,
      _isVideo: true, // 关闭按钮是否自动为看视频按钮
   },
   onLoad() { },
   onEnable() {
      if (G_Const.IssuePlat !== 'tt') return;
      let isSwitch = G_chInfo.getCfgByKey('switch_auto');
      if (isSwitch != '1') {
         // 后端关闭选择框
         this._isVideo = false;
         this.hideThatNode(this.autoVideo);
      } else {
         this._isVideo = true;
         this.toggleIcon();
      }
      this.toggleCloseBtn();
   },
   toggleCloseBtn() {
      if (this._isVideo) {
         this.hideThatNode(this.normalClose);
         this.showThatNode(this.videoClose);
      }
      else {
         this.showThatNode(this.normalClose);
         this.hideThatNode(this.videoClose);
      }
   },
   toggleVideo() {
      this._isVideo = !this._isVideo;
      this.toggleCloseBtn();
      this.toggleIcon();
   },
   toggleIcon() {
      if (this._isVideo) {
         this.showThatNode(this.toggIcon);
      }
      else {
         this.hideThatNode(this.toggIcon);
      }
   },
   showThatNode(node) {
      if (node instanceof cc.Node && !node.active) {
         node.active = true;
      }
   },
   hideThatNode(node) {
      if (node instanceof cc.Node && node.active) {
         node.active = false;
      }
   },
});