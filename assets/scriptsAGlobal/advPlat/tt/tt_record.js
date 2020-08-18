/**
 * 头条的录屏分享管理
 */
let _instance = null;
let _recorderManager = null;
let clipIndexList = []; // 剪辑索引列表
let _shareVideoPath = '';
let _isStop = false;
let _isAuto = false;

class Record_Mgr {
   constructor() {
      if (!_instance) {
         this._init();
         _instance = this;
      }
      return _instance;
   }
   static getInstance() {
      return _instance || (_instance = new this);
   }
   _init() {
      if (window.tt && typeof tt.getGameRecorderManager === 'function') {
         _recorderManager = tt.getGameRecorderManager();
         if (!_recorderManager) return;
         _recorderManager.onStart(res => {
            console.log("录屏开始回调", res);
         });
         this.onStop();
      }
   }
   onStop() {
      if (!_recorderManager) return;
      _recorderManager.onStop(res => {
         console.log('停止录屏', res);
         _shareVideoPath = res.videoPath;
         _isStop = true;
         // if (_isAuto) {
         //    this.share();
         // }
         // _recorderManager.clipVideo({
         //    path: res.videoPath,
         //    timeRange: [15, 0],
         //    success(r) {
         //       // console.log('合成视频成功',r.videoPath);
         //       _shareVideoPath = r.videoPath;
         //    }
         // });
      });
   }
   isStop() {
      return _isStop;
   }
   setAutoShare(bool = false) {
      _isAuto = bool;
   }
   start(n = 60) {
      if (!Number.isInteger(n)) {
         n = 60;
      }
      if (!_recorderManager) return;
      _shareVideoPath = '';
      _isStop = false;
      _isAuto = false;
      _recorderManager.start({
         duration: n
      });
      console.log('开始录屏');
   }


   clip(arr = [3, 2]) {
      if (!_recorderManager || !Array.isArray(arr)) return;
      // 假设录制第15秒时，执行第一次 recordClip
      _recorderManager.recordClip({
         timeRange: arr,
         success(r) {
            // console.log('高光时候',r.index); // 裁剪唯一索引
            clipIndexList.push(r.index);
         }
      });
   }
   stop() {
      console.log('调用停止录屏接口');
      _recorderManager && _recorderManager.stop();
   }
   pause() {
      console.log('调用录屏暂停接口');
      _recorderManager && _recorderManager.pause();
   }
   resume() {
      console.log('调用继续录屏接口');
      _recorderManager && _recorderManager.resume();
   }
   share(succ, fail) {
      console.log('分享视频', _shareVideoPath);
      if (!window.tt || _shareVideoPath === '') {
         typeof succ === 'function' && succ();
         return;
      }
      tt.shareAppMessage({
         channel: "video",
         title: "跟随音乐挥舞手中的枪吧!",
         desc: "跟随音乐挥舞手中的枪吧!",
         imageUrl: "",
         templateId: "", // 替换成通过审核的分享ID
         query: "",
         extra: {
            videoPath: _shareVideoPath, // 可替换成录屏得到的视频地址
            videoTopics: ["跟随音乐挥舞手中的枪吧!"]
         },
         success() {
            console.log("分享视频成功");
            // _shareVideoPath = '';
            typeof succ === 'function' && succ();
         },
         fail(e) {
            console.log("分享视频失败", JSON.stringify(e));
            typeof fail === 'function' && fail();
         }
      });
   }


}

module.exports = Record_Mgr;