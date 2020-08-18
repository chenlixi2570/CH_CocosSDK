let Cls_BasePopup = require("base_popup");
cc.Class({
   extends: Cls_BasePopup,

   properties: {
      sImg: cc.Sprite,
      closeAd: cc.SpriteFrame,
      clickAd: cc.SpriteFrame,
      btnSprite: cc.Sprite,
      lTitle: cc.Label,
      lDesc: cc.Label,
      _showCount: 0, // 界面显示次数
   },

   onLoad() {
      this.advInfo = {};
      G_chSdk.registerBtnClick(this, 'Close', this.onClose);
      G_chSdk.registerBtnClick(this, 'advBtn', this.btnClick);
      G_chSdk.registerBtnClick(this, 'img', this.advClick);
   },
   onShowFinished(a, b, c) {
   },
   onEnable() {
      console.log("==尝试显示弹窗原生广告");
      // this._showCount += 1;
      // this.toggFrame(); // 切换显示关闭广告与点击广告图片
      this.loadAdvInfo();
   },
   loadAdvInfo() {
      /**
       * loadNative 文件先预先加载原生广告数据，这个弹窗不能异步
       */
      this.advInfo = G_Strategy.doAdvMgr('getNaInfo');
      if (!G_chSdk.isObject(this.advInfo)) {
         // 尝试显示失败则再次请求广告数据
         // 第一次在预加载弹窗时请求
         console.log('---无原生广告数据，关闭原生广告弹窗 nativeAdv');
         this.onClose();
      } else {
         this.updateNode();
         G_Strategy.doAdvMgr('reportAdShow');
         G_Strategy.doAdvMgr('hideBanner');
      }
   },
   onClose() {
      G_UIManager.hideUI('nativeAdv_vv');
   },
   updateNode() {
      if (this.lTitle) {
         this.lTitle.string = this.advInfo.title ? this.advInfo.title : '';
      }
      if (this.lDesc) {
         this.lDesc.string = this.advInfo.desc ? this.advInfo.desc : '';
      }
      let imgUrl = this.advInfo.imgUrlList[0];
      if (G_chSdk.checkString(imgUrl))
         cc.loader.load(imgUrl, (err, texture) => {
            if (err) {
               console.log(err, 'vivo原生广告图');

            } else {
               console.log(texture, 'vivo原生广告图');
               let advFrame = new cc.SpriteFrame(texture);

               if (this.sImg instanceof cc.Sprite) {
                  this.sImg.spriteFrame = advFrame;
               }
            }
         });
   },
   // 按钮被点击
   btnClick() {
      if (this.isClickAd()) {
         this.advClick();
      }
      else {
         this.onClose();
      }
      G_Strategy.doAdvMgr('showBanner','vivo');
   },
   toggFrame() {
      if (this.isClickAd()) {
         if (this.btnSprite && this.clickAd) {
            this.btnSprite.spriteFrame = this.clickAd;
         }
      } else {
         if (this.btnSprite && this.closeAd) {
            this.btnSprite.spriteFrame = this.closeAd;
         }
      }
   },
   /**
    * 是否为点击广告，否则为关闭广告
    */
   isClickAd() {
      return true;
      // 开关是否打开
      let inter = G_chInfo.getCfgByKey('mistake_open_interval');
      inter = Number.isNaN(parseInt(inter)) ? 1 : parseInt(inter);
      let off = G_chInfo.getCfgByKey('mistake_switch') == '1';
      let interOff = this._showCount % (inter + 1) == 0;
      console.log(this._showCount, inter, G_chInfo.getCfgByKey('mistake_switch'), '--线上配置误触开关');

      if (off && interOff) {
         return true;
      }
      else {
         return false;
      }
   },
   advClick() {
      console.log('点击查看广告');
      //先上报点击
      G_Strategy.doAdvMgr('reportAdClick', () => {
         // 再关闭弹窗
         this.onClose();
         // 最后再更新广告数据
         // G_Strategy.doAdvMgr('destroyNative');
         // G_Strategy.doAdvMgr('createNativeAsync');
      });
   }
});
