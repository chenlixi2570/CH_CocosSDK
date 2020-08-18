/*
 * @Author: Chen Li Xi
 * @Description: 各平台广告ID
 */
let _Adv_Const = {};
_Adv_Const.WX = {
   bannerID: '',
   bannerIDs: [],
   videoID: '',
   videoIDs: [],
   insertID: '',
   insertIDs: [],
};

_Adv_Const.QQ = {
   bannerID: '5fa9f0777143e70a0c53d85cdfeaf376',
   bannerIDs: [
      '5fa9f0777143e70a0c53d85cdfeaf376',
      'ae34fb03d4cfb4e253368b35155ea35f',
      '17ab9379684aab37b7765b9a1d4e549e',
      '5d453ea7ef94c766728f94b7931a5978',
      '7d0dd1bb8fbec56ffcf46ed698780d23',
      'aaba12a295814e04fc26d77459e67128',
      'c2f2e30c6bfb297601658873133137bf',
      'f7a0f5e610e04c1732acf63966a77c7f',
      '00ad11476a96c4861374dbc6f95d463a',
      '89486f7bb40370feb708faf164b9dc26',
   ],
   videoID: 'e464588851d2b3936c3cef39f983e543',
   videoIDs: ['e464588851d2b3936c3cef39f983e543'],
   insertID: '7479f2baef817630f8313e2901e0ad45',
   insertIDs: ['7479f2baef817630f8313e2901e0ad45'],
   boxID: 'ac0af00c0f64fa8d095c79859cb0f050',
};

_Adv_Const.OPPO = {
   bannerID: '186723',
   bannerIDs: [
      '186723'
   ],
   videoID: '186725',
   videoIDs: [
      '186725'
   ],
   insertID: '',
   insertIDs: [
      ''
   ],
   nativeID: '186728',
   nativeIDs: ['186728'],
};

_Adv_Const.VIVO = {
   bannerID: 'a2dd8ffdb911424883d15bbdac1dc51a',
   videoID: '9f6bc2afef1f4e58922e4f8efcd04cdb',
   insertID: '',
   nativeID: '8e274ea0b50b45f5b078c2a3fd9f8d7b'
};

_Adv_Const.TT = {
   bannerID: 'etd1lhiuxff5355gnk',
   bannerIDs: [
      'etd1lhiuxff5355gnk',
      '16h2a37398759otcqf',
      'h4gi53a6ddfb49l7qm',
      'k5n5233de3m56vtocc',
      '34fmj2410111f9807b',
      'ppuah09aghhbbl9h6s',
      '3sg15dco591507c2bs',
      '1a9ha147908n733msb',
      '104m56df078mk93lh9',
      '7b73c5i853357hd7hi',
   ],
   videoID: '1jbae755f8318bjjo8',
   videoIDs: [
      '1jbae755f8318bjjo8'
   ],
   insertID: 'im5i4d2fj3g1eb7a95',
   insertIDs: [
      'im5i4d2fj3g1eb7a95'
   ],
};
// 后羿系统广告
_Adv_Const.QY = {
   // A版
   locatA: [
      'da29e38331a16ba3461159fd536519bf',  // 首页下滚动
      'df5314be19883ce6f0335d50466aefc3', // 结束页导出
      '18a4e322da752cf16a51cd256b9f52bc', // 全屏导出
      'da29e38331a16ba3461159fd536519bf', // 模拟banner
      'df5314be19883ce6f0335d50466aefc3', // 复活
      'b4cd75c9145394b8d9197b9016e7025b', // 首页浮标
      '349011c2506f1b659732ca23d9dd4f41', // 退出页
   ],
   locatEnum: cc.Enum({
      index: 0,
      gameEnd: 1,
      full: 2,
      banner: 3,
      easter: 4,
      indexFloat: 5,
      exit: 6,
   })
};

_Adv_Const.QY_OPPO = {
   locatA: [
      '4ec4a342749a2a0b3775306cf24babb7',
      '4ec4a342749a2a0b3775306cf24babb7',
      '4ec4a342749a2a0b3775306cf24babb7',
      '4ec4a342749a2a0b3775306cf24babb7',
      '4ec4a342749a2a0b3775306cf24babb7'
   ],
   locatEnum: _Adv_Const.QY.locatEnum
};
_Adv_Const.QY_TT = {
   locatA: [
      '7118ecfad448b34a7e55de7518a92432',
      '7118ecfad448b34a7e55de7518a92432',
      '7118ecfad448b34a7e55de7518a92432',
      '7118ecfad448b34a7e55de7518a92432',
      '7118ecfad448b34a7e55de7518a92432'
   ],
   locatEnum: _Adv_Const.QY.locatEnum
};

module.exports = _Adv_Const;