/**
 * 音频播放
 */

let _SoundMgr = (function () {
   let { StorageKey } = require('global_const');

   let _isSoundOn = true; // 是否播放音频
   let _bgmAudioClip = null; // 背景音频
   let _bgmAudioID = 0; // 背景音频播放ID

   let _save = function () {
      if (_isSoundOn) {
         G_chSdk.setStorage(StorageKey.SK_SOUND_SETTING, "1");
      }
      else {
         G_chSdk.setStorage(StorageKey.SK_SOUND_SETTING, "0");
      }
   };

   let _instance = {
      initSoundMgr() {
         let sound_setting_str = G_chSdk.getStorage(StorageKey.SK_SOUND_SETTING);

         if (sound_setting_str && sound_setting_str === "0") {
            _isSoundOn = false;
         }
         else {
            _isSoundOn = true;
         }
      },
      /**
       * 播放背景音频，音频必需放在 oss 下项目资源文件夹下的 audio 文件中
       * @param {string} bgmName 背景音频名
       * @param {number} volume 背景音量
       */
      playBgm(bgmName, volume) {
         if (_bgmAudioClip instanceof cc.AudioClip) {
            this.playMusic(_bgmAudioClip, volume);
         }
         else {
            G_chSdk.loadRemoteAudio(`audio/${bgmName}`, clip => {
               if (clip instanceof cc.AudioClip) {
                  this.playMusic(clip, volume);
               }
            });
         }
      },
      /**
       * 循环播放背景音乐
       * @param {cc.AudioClip} bgmClip 
       * @param {number} volume 音量
       */
      playMusic(bgmClip, volume = 0.1) {
         if (!(bgmClip instanceof cc.AudioClip)) {
            return;
         }
         this.stopMusic();

         // save
         _bgmAudioClip = bgmClip;

         if (_isSoundOn) {
            // allow play
            _bgmAudioID = cc.audioEngine.play(bgmClip, true, volume);
         }
      },
      /**
       * 停止播放背景音频
       * @param {boolean} isClean 是否清除背景音频
       */
      stopMusic(isClean) {
         // body...
         if (typeof isClean === "undefined" || isClean === null) {
            isClean = true;
         }

         if (_bgmAudioClip !== null) {
            cc.audioEngine.stop(_bgmAudioID);
            _bgmAudioID = 0;

            if (isClean) {
               _bgmAudioClip = null;
            }
         }
      },
      /**
       * 播放线上音效
       * @param {string} name
       * @param {number} volume
       */
      playOssAudio(name, volume) {
         G_chSdk.loadRemoteAudio(`audio/${name}`, clip => {
            if (clip instanceof cc.AudioClip) {
               this.playEffect(clip, volume);
            }
         });
      },
      /**
       * 播放音效
       * @param {cc.AudioClip} effectClip 
       * @param {number} volume 
       */
      playEffect(effectClip, volume = 1) {
         // body...
         if (_isSoundOn && effectClip instanceof cc.AudioClip) {
            cc.audioEngine.play(effectClip, false, volume);
         }
      },
      /**
       * 是否播放音频
       * @param {boolean} isOn 
       */
      setSoundState(isOn) {
         // body...
         _isSoundOn = isOn;

         if (!isOn) {
            this.stopMusic(false);
         }
         else if (_bgmAudioClip !== null && _bgmAudioID === 0) {
            this.playMusic(_bgmAudioClip);
         }

         // save
         _save();

         // event
         G_chSdk.dispatchEvent(G_Const.EventName.EN_SOUND_SETTING_CHANGED);
      },
      /**
       * 获得用户是否选择播放音频状态
       */
      isSoundOn() {
         return _isSoundOn;
      }
   };

   return () => {
      return _instance;
   };
})();
// global
module.exports = _SoundMgr;
