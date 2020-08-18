// 需要用到的页面

var _UIRegisterInfos = [
   // {
   //   // 管理类名，需继承自base_popup 同时也是关键字，全局唯一
   //   claName: "Tips",
   //   // z方向排序顺序，view：10-100，弹出窗：101-799, 广告窗800-999
   //   zIndex: 999,
   //   // 隐藏后是否销毁
   //   isAutoDestory: false,
   //   // 预制体位置
   //   prefab: "prefab/tipsView.json"
   // }
   {
      claName: "indexPage", // 组件类名，需继承自base_popup
      zIndex: 1, // z方向排序顺序，
      isAutoDestory: false, // 隐藏后是否销毁
      prefab: "prefab/indexPage" // 预制体位置
   },
  
   {
      claName: "gameScene", // 组件类名，需继承自base_popup
      zIndex: 2, // z方向排序顺序，
      isAutoDestory: false, // 隐藏后是否销毁
      prefab: "prefab/gameScene" // 预制体位置
   },
   {
      claName: "gameOver", // 组件类名，需继承自base_popup
      zIndex: 3, // z方向排序顺序，
      isAutoDestory: false, // 隐藏后是否销毁
      prefab: "prefab/gameOver" // 预制体位置
   },
   {
      claName: "gameEnd", // 组件类名，需继承自base_popup
      zIndex: 4, // z方向排序顺序，
      isAutoDestory: false, // 隐藏后是否销毁
      prefab: "prefab/gameEnd" // 预制体位置
   },
   {
      claName: "showToast", // 组件类名，需继承自base_popup
      zIndex: 999, // z方向排序顺序，
      isAutoDestory: false, // 隐藏后是否销毁
      prefab: "prefab/showToast" // 预制体位置
   },
    
   {
      claName: "sign", // 组件类名，需继承自base_popup
      zIndex: 9, // z方向排序顺序，
      isAutoDestory: false, // 隐藏后是否销毁
      prefab: "preCover/sign" // 预制体位置
   },
   {
      claName: "setting", // 组件类名，需继承自base_popup
      zIndex: 9, // z方向排序顺序，
      isAutoDestory: false, // 隐藏后是否销毁
      prefab: "preCover/setting" // 预制体位置
   },
   {
      claName: "skin", // 组件类名，需继承自base_popup
      zIndex: 9, // z方向排序顺序，
      isAutoDestory: false, // 隐藏后是否销毁
      prefab: "preCover/skin" // 预制体位置
   },
   {
      claName: "gainPhys", // 组件类名，需继承自base_popup
      zIndex: 30, // z方向排序顺序，
      isAutoDestory: false, // 隐藏后是否销毁
      prefab: "preCover/gainPhys" // 预制体位置
   },
   {
      claName: "gainGem", // 组件类名，需继承自base_popup
      zIndex: 30, // z方向排序顺序，
      isAutoDestory: false, // 隐藏后是否销毁
      prefab: "preCover/gainGem" // 预制体位置
   },
   {
      claName: "gainCoin", // 组件类名，需继承自base_popup
      zIndex: 30, // z方向排序顺序，
      isAutoDestory: false, // 隐藏后是否销毁
      prefab: "preCover/gainCoin" // 预制体位置
   },
   
   {
      claName: "fullAdv", // 组件类名，需继承自base_popup
      zIndex: 60, // z方向排序顺序，
      isAutoDestory: false, // 隐藏后是否销毁
      prefab: "preAdv/houyiPre/fullAdv" // 预制体位置
   },
   {
      claName: "exitAdv", // 组件类名，需继承自base_popup
      zIndex: 60, // z方向排序顺序，
      isAutoDestory: false, // 隐藏后是否销毁
      prefab: "preAdv/houyiPre/exitAdv" // 预制体位置
   },
   {
      claName: "sidebarAdv", // 组件类名，需继承自base_popup
      zIndex: 60, // z方向排序顺序，
      isAutoDestory: false, // 隐藏后是否销毁
      prefab: "preAdv/houyiPre/sidebarAdv" // 预制体位置
   },
   {
      claName: "likeWxBanner", // 组件类名，需继承自base_popup
      zIndex: 61, // z方向排序顺序，
      isAutoDestory: false, // 隐藏后是否销毁
      prefab: "preAdv/houyiPre/likeWxBanner" // 预制体位置
   },
   {
      claName: "nativeAdv", // 组件类名，需继承自base_popup
      zIndex: 60, // z方向排序顺序，
      isAutoDestory: false, // 隐藏后是否销毁
      prefab: "preAdv/nativePre/nativeAdv" // 预制体位置
   },
   {
      claName: "nativeAdv_vv", // 组件类名，需继承自base_popup
      zIndex: 60, // z方向排序顺序，
      isAutoDestory: false, // 隐藏后是否销毁
      prefab: "preAdv/nativePre/nativeAdv_vv" // 预制体位置
   },
   {
      claName: "GemCase", // 组件类名，需继承自base_popup
      zIndex: 60, // z方向排序顺序，
      isAutoDestory: false, // 隐藏后是否销毁
      prefab: "preAdv/qqPre/GemCase" // 预制体位置
   },
   {
      claName: "fastClick", // 组件类名，需继承自base_popup
      zIndex: 60, // z方向排序顺序，
      isAutoDestory: false, // 隐藏后是否销毁
      prefab: "preAdv/qqPre/fastClick" // 预制体位置
   },
   
   {
      claName: "levelSelect", // 组件类名，需继承自base_popup
      zIndex: 1, // z方向排序顺序，
      isAutoDestory: false, // 隐藏后是否销毁
      prefab: "prefab/levelSelect" // 预制体位置
   },
   
];

module.exports = _UIRegisterInfos;