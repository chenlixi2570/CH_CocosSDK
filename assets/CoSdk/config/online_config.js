/*
 * @Author: Chen Li Xi
 * @Description: 线上方案配置
 * base 为通用配置
 * custom 为自定义配置，根据自己项目自行添加
 * sense 为分享配置（微信）
 */
let Dft_Cfg = {
   base: {
      // 版本号，excel表格中配置的版本号与此版本号不相等则属于线上状态
      commitVersion: "100000",
      onlineVersion: "100000", // 线上版本号
      commitVersionStatus: "1", // 提审开关，控制误触开关
      /** 线上版本控制误触 **/
      onlineMistakeStatus: "1", // 不使用
      onlineMistakeStatusOfClick: "1", // 狂点
      onlineMistakeStatusOfMove: "1", // 位移
      onlineMistakeStatusOfBtn: "0", // 按钮误触
      onlineMistakeStatusOfExit: "1", // 退出页广告
      onlineMistakeStatusOfStart: '1', // 开局类误触开关
      /** 提审版本控制误触 **/
      commitMistakeStatus: "1",
      commitMistakeStatusOfClick: "1",
      commitMistakeStatusOfMove: "1",
      commitMistakeStatusOfBtn: "0",
      commitMistakeStatusOfExit: "1",
      commitMistakeStatusOfStart: '0',

      adv_times_before_share: "10", // 开启分享前的广告次数
      min_duration_between_share: "3000", // 最小分享所用时间
      percent_of_report_to_ald: "100", // 上报到阿拉丁后台的百分比
      rate_of_share: "100", // 分享概率（100最多）
      reward_times_of_each_day: "20", // 每日领取奖励次数
   },
   custom: {
      disable_export_adv_chids: '||',// 广点通屏蔽导出的渠道
      todayMaxMistakeCounts: '9999', // 当日最大误触触发数 整体配置如: 20，单独配置如: click:20||move:20||btn:999||exit:20)
      invokeMistakeRate: '100', // 误触的触发概率
      intervalOfMistakes: '1', // 误触的触发间隔, 整体配置如: 1，单独配置如: click:1||move:2||btn:1||exit:1)
      "PHYS_LIMIT": "60", // 体力上限
      "PHYS_LEVEL": "5", // 玩一关需要多少体力
      "PHYS_TIME": "60", // 倒计时多长可得1次体力 单位秒 
      "PHYS_VAL": "1", // 倒计时到达时增加多少点体力
      "TASK_PHYS": "5", // 视频广告任务得体力值 
      "TASK_GEM": 2, // 看一次视频广告可获得的钻石值
      "COIN_TO_GEM": 100, // 多少金币可换1个钻石
      "GEM_TO_PHYS": 1,  // 1个钻石可换多少体力
      "GEM_COUNT": 5, // 一次换几个钻石
      "PHYS_COUNT": 5, // 一次换几个体力
      switch_auto: '0', // 头条系的自动分享与自动视频开关
      switch_adv: '1', // vivo 取线上广告ID开关
      TASK_COIN: "500", // 看一次视频广告得金币数
      SHARE_COIN: "500", // 分享录屏得金币数
      BOX_COIN: "500", // 宝箱得金币数
      BOX_INTER: '2', // 宝箱间隔
   },
   sense: {
      ShareList: {
         cfgs: [
            {
               img_url: "http://qygameimg.oss-cn-hangzhou.aliyuncs.com/b05b003b-42e6-4a8a-8598-ccf8aa1f80f9_托尼.jpg",
               tag: "ShareList_1",
               title: "来让托尼老师给你整个发型吧",
               weight: "1"
            }
         ]
      }
   }
};
module.exports = Dft_Cfg;