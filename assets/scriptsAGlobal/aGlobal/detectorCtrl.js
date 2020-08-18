// 头条视频控制
cc.Class({
   extends: cc.Component,
   properties: {
      videoSprite: cc.Sprite,
      _frame: 0,
      _camera: null,
      _video: null,
      _detector: null,
      _videoTexture: {
         type: cc.Texture2D,
         default: null,
      },
   },

   onLoad() {
      if (!G_chSdk.isTT()) return;
      this.startCamera(); // 初始化相机
      this.handleDetectionResult();  //动作触发处理
   },
   update(dt) {
      if (!G_chSdk.isTT()) return;
      this.startDetector();  // 检测人脸
      this.playAudio(); // 更新图片
   },
   // 初始相机
   startCamera() {
      this._camera = tt.createCamera();
      this._detector = tt.createFaceDetector();
      tt.setKeepScreenOn();   // 保持屏幕常亮
      this._camera.start('front', true).then(video => {
         console.log('video', video);

         this._video = video;
         this.initVideo();   // cocos视频映射应该在camera初始完成之后
      }).catch(err => {
         tt.showToast({
            title: '摄像机需要授权'
         });
         console.log('用户不授权摄像机', err);
         G_chSdk.dispatchEvent(G_Const.EventName.CH_NOT_CAMERA, err);
      });
      this._camera.setBeautifyParam(1, 1, 0.1, 0.1);   //设置美白、磨皮、大眼、瘦脸, 范围：[0, 1]
   },

   initVideo() {
      this._videoTexture = new cc.Texture2D();
      this._videoTexture.initWithElement(this._video);
      this._videoTexture.handleLoadedTexture();
      if (this.videoSprite instanceof cc.Sprite) {
         this.videoSprite.spriteFrame = new cc.SpriteFrame(this._videoTexture);
         this.setVideoWidth(cc.view.getVisibleSize().width);  //固定宽度进行视频缩放
         // this.setVideoWidth(this.node.width);
         this.videoSprite.node.width = this._video.width;     //设置在游戏界面画的视频宽度
         this.videoSprite.node.height = this._video.height;   //设置在游戏界面画的视频高度
      }
      else {
         console.warn('**请指定精灵节点');
      }
   },

   startDetector() {
      //每五帧进行一次人脸检测
      this._frame++;
      if (this._frame < 5) return;
      this._frame = 0;

      if (this._detector && this._video) {
         this._detector.detectFaces(this._video).then(res => {
            // console.log('人脸信息（检测数据）', res); // 对应最下方的人脸信息（检测数据）内容说明
            this.testDrawArea(res);
         });
      }
   },

   handleDetectionResult() {
      this.onBlink();
      this.onHeadPitch();
   },
   onBlink() {
      this._detector.onBlink(detectData => {
         console.log('监听眨眼动作', detectData);
         this.showToast('眨眼');
         G_chSdk.dispatchEvent(G_Const.EventName.CH_BLINK, detectData);
      });
   },
   onHeadPitch() {
      this._detector.onHeadPitch(detectData => {
         console.log('监听点头动作', detectData);
         this.showToast('点头');
         G_chSdk.dispatchEvent(G_Const.EventName.CH_HEAD_PITCH, detectData);
      });
   },
   // 监听人脸所有发生的动作事件
   onActions() {
      let actions = {
         blink: '眨眼',
         blink_left: '左眨眼',
         blink_right: '右眨眼',
         mouth_ah: '嘴巴大张',
         head_yaw: '摇头',
         head_yaw_indian: '印度式摇头',
         head_pitch: '点头',
         brow_jump: '眉毛挑动',
         mouth_pout: '嘟嘴'
      };

      this._detector.onActions(detectData => {
         let arr = [];
         for (let act of detectData.actions) {
            console.log(`检测到 ${actions[act]} 动作`);
            arr.push(actions[act]);
         }
         tt.showToast({
            title: arr.join('、'),
            duration: 300
         });
      });
   },
   // 根据屏宽缩放视频高
   setVideoWidth(width) {
      if (this._video) {
         this._video.width = width;
         this._video.height = this._video.videoHeight / this._video.videoWidth * width;
      }
   },
   // 更新照相机图片，每帧更新看起来就跟播放视频一样
   playAudio() {
      if (this._videoTexture && this._video) {
         this._videoTexture.update({
            image: this._video,
            flipY: false
         });
      }
   },
   showToast(title) {
      tt.showToast({
         title: title,
         duration: 300
      });
   },

   // 将人脸检测到的数据绘制到图片上
   testDrawArea(res) {
      return;
      G_GameTest.clearArea();
      Array.isArray(res) && res.forEach(item => {
         if (G_chSdk.isObject(item) && Array.isArray(item.landmarks)) {
            item.landmarks.forEach(it => {
               if (G_chSdk.isObject(it)) {
                  Array.isArray(it.locations) && it.locations.forEach(point => {
                     G_GameTest.drawCricleByWorld(cc.v2(point.x, point.y));
                     // G_GameTest.drawCricleByNodeSpace(cc.v2(point.x, point.y));
                  });
               }
            });
         }
      });
   },

});