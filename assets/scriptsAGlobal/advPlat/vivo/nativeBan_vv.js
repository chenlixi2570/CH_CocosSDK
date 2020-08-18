/*
 * @Author: Chen Li Xi
 * @Description: 
 */
let testInfo = {
   adId: "5382e0ad-6652-422f-8dfe-a6fb84773f29",
   clickBtnTxt: "点击查看",
   creativeType: 7,
   desc: "拼多多拼着买才便宜",
   icon: "adv_pic/advicon",
   interactionType: 1,
   logoUrl: "",
   title: "拼多多",
   imgUrlList: [
      "adv_pic/advicon"
   ]
};
cc.Class({
   extends: cc.Component,

   properties: {
      sImg: cc.Sprite, // 广告图片精灵
      lTitle: cc.Label, // 广告标题
      lDesc: cc.Label // 广告描述
   },

   onLoad() {
      this.nativeAd = null; // 原生广告对象
      this.advInfo = {};
      G_chSdk.registerBtnClick(this, 'advImg', this.advClick);
      G_chSdk.registerBtnClick(this, 'closeBtn', this.onClose);
   },
   onEnable() {
      console.log("==尝试显示vivo原生广告");
      this.loadNat();
   },
   loadNat() {
      this.onClose();
      if (G_chInfo.isShowAdvOfVIVO()) {
         this.node.active = false;
         return;
      }
      G_Strategy.doAdvMgr('destroyNative');
      G_Strategy.doAdvMgr('naOnLoad', advInfo => {
         if (G_chSdk.isObject(advInfo)) {
            this.advInfo = advInfo;
            G_Strategy.doAdvMgr('reportAdShow');
            this.updateNode();
         }
      });
   },
   onClose() {
      if (this.sImg) {
         this.sImg.node.active = false;
      }
   },
   onShow() {
      if (this.sImg) {
         this.sImg.node.active = true;
      }
   },
   updateNode() {
      if (this.lTitle instanceof cc.Label) {
         this.lTitle.string = this.advInfo.title ? this.advInfo.title : '';
      }
      if (this.lDesc instanceof cc.Label) {
         this.lDesc.string = this.advInfo.desc ? this.advInfo.desc : '';
      }
      let imgUrl = this.advInfo.imgUrlList[0];
      if (G_chSdk.checkString(imgUrl))
         cc.loader.load(imgUrl, (err, texture) => {
            this.loadImgSucc(err, texture);
         });
   },
   loadImgSucc(err, texture) {
      if (err) {
         console.log('---vivo原生广告图未加载', err);
      } else {
         // 成功时显示广告
         console.log('---vivo原生广告图加载成功', texture);
         let advFrame = new cc.SpriteFrame(texture);
         this.onShow();
         if (this.sImg instanceof cc.Sprite) {
            this.sImg.spriteFrame = advFrame;
         }
      }
   },
   advClick() {
      console.log('---开始上报浮动原生广告');
      //先上报点击 上报成功后再次更新广告对象
      G_Strategy.doAdvMgr('reportAdClick', () => {
         // 再关闭弹窗
         this.onClose();
         // 最后再更新广告数据
         // G_Strategy.doAdvMgr('destroyNative');
         // G_Strategy.doAdvMgr('createNativeAsync');
      });
   },

   // 测试函数
   loadTestNat() {
      if (this.lTitle instanceof cc.Label) {
         this.lTitle.string = testInfo.title;
      }
      if (this.lDesc instanceof cc.Label) {
         this.lDesc.string = testInfo.desc;
      }
      let imgUrl = testInfo.icon;
      cc.loader.loadRes(imgUrl, (err, texture) => {
         this.loadImgSucc(err, texture);
      });
   },
});
