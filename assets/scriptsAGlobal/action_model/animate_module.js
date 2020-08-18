/**
 * 帧动画控制模块
 * 初始化游戏场景中用到的帧动画
 * 帧动画对象保存在缓存中，以免重复生成
 */
let _Init_With_Clip = (function () {

   let _instance = {
      /**
       * 
       * @param {function} cb 回调函数，返回实参为帧动画实例或 undefined
       * @param {string} tag 动画图片标识
       * @param {number} sample 数字越大动画越快
       * @param {*} loop 是否循环
       */
      _getClip(cb, tag, sample = 10, loop = cc.WrapMode.Normal,) {
         if (!this[tag]) {
            let promise = G_chSdk.getAtlasByName(tag + '1');
            promise && promise.then(atlas => {
               if (atlas instanceof cc.SpriteAtlas) {
                  let spriteFrames = G_chSdk.get_frames(atlas, tag);
                  /**
                   * 使用一组序列帧图片来创建动画剪辑
                   * spriteFrames  [SpriteFrame]
                   * sample Number 数字越大动画越快
                   */
                  this[tag] = cc.AnimationClip.createWithSpriteFrames(spriteFrames, sample);
                  this[tag].name = tag;
                  this[tag].wrapMode = loop;
               }
               typeof cb === 'function' && cb(this[tag]);
            }).catch(err => {
               console.warn('**未取到帧动画需要的图片', err);
               typeof cb === 'function' && cb(this[tag]);
            });

         }
         else {
            typeof cb === 'function' && cb(this[tag]);
         }
      },
      getClipByName(cb, name, speed = 10, loop = cc.WrapMode.Normal) {
         this._getClip(cb, name, speed, loop);
      },

      /**
       * 根据图片数组生成动画clip
       * @param {Array<cc.SpriteFrame>} sfarr 图片数组
       * @param {String} clipName 动画名字
       * @param {Bollon} loop 是否循环播放
       * @param {Number} rate 帧率(可选，默认为图片数量)
       * @param {Number} speed 播放速度(可选，默认为1)
       */
      getAnimClipBySfs({
         sfarr,
         clipName = 'default',
         loop = false,
         rate = 2,
         speed = 1
      } = {}) {
         if (!sfarr || sfarr.length < 1) return;
         var clip = cc.AnimationClip.createWithSpriteFrames(sfarr, rate || sfarr.length);
         clip.name = clipName;
         if (loop) clip.wrapMode = cc.WrapMode.Loop;
         if (speed) clip.speed = speed;
         return clip;
      },

      /**
     * 将一张大图按约定顺序裁切成等大小的小图
     * 一般用于帧动画,目前仅支持先从左往右，再从上往下排列
     * @param {cc.SpriteFrame} spriteframe 
     * @param {cc.size} cellSize 裁切的每张图片尺寸
     * @param {Number} count 裁切的图片数量
     */
      cutSpriteFrame(spriteframe, cellSize, count, initPos) {
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
   };

   return () => {
      return _instance;
   };

})();

module.exports = _Init_With_Clip;