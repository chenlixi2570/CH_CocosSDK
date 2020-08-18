let _instance = {
   /**
     * 将一张大图按约定顺序裁切成等大小的小图(一般用于帧动画,目前仅支持先从左往右，再从上往下排列)
     * @param {cc.SpriteFrame} spriteframe 
     * @param {cc.size} cellSize 裁切的每张图片尺寸
     * @param {Number} count 裁切的图片数量
     */
   cutSpriteFrame: function (spriteframe, cellSize, count, initPos) {
      initPos = initPos || cc.v2(0, 0);
      let size = spriteframe.getOriginalSize();
      let texture = spriteframe.getTexture();
      let colNum = Math.round(size.width / cellSize.width);//列数
      let rowNum = Math.round(size.height / cellSize.height);//行数
      let arr = [];
      let st = 0;
      for (let i = 0; i < rowNum; i++) {
         for (let j = 0; j < colNum; j++) {
            let newSf = new cc.SpriteFrame(texture, cc.Rect(0, 0, texture.width, texture.height));
            newSf.setRect(new cc.Rect(j * cellSize.width + initPos.x, i * cellSize.height + initPos.y, cellSize.width, cellSize.height));
            arr.push(newSf);
            st++;
            if (st >= count) {
               return arr;
            }
         }
      }
      return arr;
   },

   /**
    * 裁切出一张图上的rect区域，返回sf
    * @param {cc.SpriteFrame} spriteframe 
    * @param {cc.Rect} rect 
    */
   cutSpriteFrameByRect: function (spriteframe, rect) {
      let texture = spriteframe.getTexture();
      let newSf = new cc.SpriteFrame(texture, cc.Rect(0, 0, texture.width, texture.height));
      newSf.setRect(rect);
      return newSf;
      
   },

   /**
    * 根据图片数组生成动画clip
    * @param {Array<cc.SpriteFrame>} sfarr 图片数组
    * @param {String} clipName 动画名字
    * @param {Bollon} loop 是否循环播放
    * @param {Number} rate 帧率(可选，默认为图片数量)
    * @param {Number} speed 播放速度(可选，默认为1)
    */
   getAnimClipBySfs: function (sfarr, clipName, loop, rate, speed) {
      if (!sfarr || sfarr.length < 1) return;
      var clip = cc.AnimationClip.createWithSpriteFrames(sfarr, rate || sfarr.length);
      clip.name = clipName;
      if (loop) clip.wrapMode = cc.WrapMode.Loop;
      if (speed) clip.speed = speed;
      return clip;
   },
   /**
  * 将图集打包的大图通过json裁剪成小图放到this.__sfObj对象中
  * @param {Object} obj 加载到的json数据
  * @param {spriteFrame} sf 大图
  */
   handLevelJson: function (obj, sf) {
      let arr = obj.frames;
      for (let i = 0; i < arr.length; i++) {
         const info = arr[i];
         // let osize = sf.getOriginalSize();
         let name = info.filename.split(".")[0];
         let frame = info.frame;
         let rect = cc.rect(frame.x, frame.y, frame.w, frame.h);
         this._sfObj[name] = {};
         this._sfObj[name].sf = this.cutSpriteFrameByRect(sf, rect);
         this._sfObj[name].frame = frame;
      }
   },
}