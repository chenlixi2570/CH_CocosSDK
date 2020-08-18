let pjConst = {};

pjConst.EventName = {
   CH_TNT_BOMB: 'CH_TNT_BOMB', // 炸弹开始爆炸
   CH_DIVIDE_DEL: 'CH_DIVIDE_DEL', // 清除一个栏杆节点
   CH_NOT_CAMERA: 'CH_NOT_CAMERA',// 用户没有授权摄像头权限
   CH_HEAD_PITCH: 'CH_HEAD_PITCH',// 用户点头
   CH_BLINK: 'CH_BLINK',// 用户眨眼
};
pjConst.dig_optimize = 2; // 相近的右方与下方的点算做一个点
pjConst.dig_fragment = 18; // 一个圆有几个点组成
pjConst.dig_radius = 50; // 触摸点半径

pjConst.maxMoveCount = 6; // 过滤move次数，move事件触发数大于该值之后才回调一次函数


pjConst.roleIntX = -180; // 角色初始x轴位置
pjConst.roleDisRight = 375 + 160; // 角色距离右边多少时障碍可以出现
pjConst.roleDisLeft = 375 - 240; // 角色距离左边多少时障碍开始离场
pjConst.gridMoveDis = 300; // 小格子运动Y轴距离


module.exports = pjConst;