/** 
chsdk 主要命名空间
 */
declare namespace G_chInfo {
   /* -------------- cfg_info.js ---------------*/
   /**
    * 更新缓存中的用户信息
    */
   export function updateUserInfo();
   /**
    * 获取是否是新玩家
    */
   export function isNewPlayer();

   /**
    * 获取离线时长（重新登录才会计算）
    */
   export function getOutlineTime();
   export function getSessId();
   export function getOpenId();
   export function getAllCfgs();
   /**
    * 微信分享配置
    */
   export function getShareCfgs();
   /**
    * 根据键名取配置值
    */
   export function getCfgByKey(key: string);
   /**
    * 获取配置属性值，返回值必定是数字，默认返回 0
    * @param {string} key 属性名
    */
   export function getCfgInt(key)
   /**
    * 获取代码包中的版本号，设置在 TBBaseConfig.xlsx 中
    */
   export function getAppVersion();
   /**
    * 当前代码包是线上版本还是提审版本
    * 代码包中的版本号与请求取得的版本号不相等则属于线上状态
    */
   export function isOnline();
   /**
    * 每天最大领奖次数，默认50
    */
   export function getRewardTimesOfEachDay();
   /**
    * 分享概率，默认100
    */
   export function getRateOfShare();
   /**
    * 开启分享前的广告次数，默认10
    */
   export function getAdvTimesBeforeShare();
   /**
    * 获取上报到Ald的百分比，默认100
    */
   export function getPercentOfReportToAld();
   /**
    * 是否上报到阿拉丁
    * 开关要打开，且生命周期内只计算一次概率
    */
   export function isAldReportEnabled();
   /**
    * 是否开启趣游上报
    */
   export function isQyReportEnabled();
   /**
    * 分享成功的最小间隔时间，默认3000
    */
   export function getMinDurationBetweenShare();
   /**
    * 是否正在提审，默认false
    * 线上版本号与代码包版本号相同且后台方案配置的提审开关打开
    * commitVersionStatus 的值为1
    */
   export function isPublishing();
   /**
    * 快速点击误触是否可用
    * */
   export function isClickMistakeEnabled();
   /**
    * 移动误触是否可用
    */
   export function isMoveMistakeEnabled();
   /**
    * 按钮误触是否可用
    */
   export function isBtnMistakeEnabled();
   /**
    * 退出页是否可用
    */
   export function isExitMistakeEnabled();
   /**
   * 开局强制看视频是否可用
   */
   export function isStatusMistakeEnabled()
   /**
    * 当日最大可误触数量
    */
   export function getTodayMaxMistakeCount();
   /**
    * 误触触发概率, 默认100
    */
   export function getInvokeMistakeRate();
   /**
    * 触发关卡间隔，默认1
    */
   export function getIntervalOfMistakes();
   /**
    * 获取需要屏蔽的广点通列表
    */
   export function getExportAdv();
   /**
    * 获取管理后台配置的平台广告数据
    * @param {string} type banner native insert video recommend box
    */
   export function getFlowAd(type = 'banner');

   /**
    * vivo平台是否显示广告
    */

   export function isShowAdvOfVIVO()
   /* -------------- cfg_info.js ---------------*/
   /**
    * 获取玩家金币数 返回类型BigNumber
    */
   export function getCoin();

   /**
    *  获取玩家总金币数 返回类型BigNumber
    */
   export function getTotalCoin();
   /**
    * 增加玩家金币数
    * num必须是number类型或BigNumber类型
    * @param {number or BigNumber} num 
    */
   export function plusCoin(num: BigNumber);

   /**
    * 减少玩家金币数
    * num必须是number类型或BigNumber类型
    * @param {number or BigNumber} num 
    */
   export function minusCoin(num: BigNumber);
   /**
    * 金币是否足够扣除操作
    */
   export function canMinusCoin(num: number);
   /**
    * 获取玩家当前体力
    */
   export function getPhysical();
   /**
    * 增加体力
    * @param {number} num 
    */
   export function plusPhysical(num: number);

   /**
    * 减少体力
    * @param {number} num 
    */
   export function minusPhysical(num: number);
   /**
    * 体力是否足够扣除操作
    */
   export function canMinusPhysical(num: number);
   /****** 钻石 ******/
   /**
    * 获取玩家当前钻石数
    */
   export function getGem();
   /**
    * 增加玩家钻石数
    * @param {number} num 
    */
   export function plusGem(num: number);

   /**
    * 减少玩家钻石数
    * @param {number} num 
    */
   export function minusGem(num: number);
   /**
    * 钻石是否足够扣除操作
    */
   export function canMinusGem(num: number);
   /**
    * 获取玩家所有的签到信息
    * @returns Array
    */
   export function getSignInfo();
   /**
    * 记录今日已签到
    */
   export function setSignInfo();
   /**
    * 今日是否已签到
    * 返回 true 表示已经签到 false 未签到
    */
   export function todayIsSign();
   /**
    * 七日签到情况
    * 从0开始计数，该数字内的项都是已经签到状态
    */
   export function getSevenLen();
   /**
    * 是否为第一周签到，true 为第一周
    */
   export function isFirstWeek();
   /**
    * 设置所有皮肤数据
    * @param {Array} allSkin 
    */
   export function setAllSkin(allSkin);
   /**
    * 得到当前正在使用的皮肤编号
    */
   export function getCurrSkin();
   /**
    * 得到当前正在使用的皮肤数据
    */
   export function getCurrSkinData();
   /**
    * 更新当前正在使用的皮肤编号
    * @param {number} skinId 
    */
   export function setCurrSkin(skinId);
   /**
    * 获取所有已解锁的皮肤索引数组
    */
   export function getUnlockSkin();
   /**
    * 加入新解锁的皮肤索引
    * @param {*} skinId 
    */
   export function setUnlockSkin(skinId);
   /**
    * 获取所有未解锁的皮肤索引数组
    */
   export function getLockSkin();

   /**
    * 当前皮肤索引是否已经解锁
    * @param {number} skinId 
    */
   export function includeSkin(skinId);
   /**
   * 获取玩家已经能玩的最大关卡，
   * 该关卡用户可以玩，但没通关
   * 该关之前都已通关，该关之后都未解锁
   * 第一关是 0
   */
   export function getLatestLevel();
   /**
   * 获得所有皮肤长度
   */
   export function getAllSkinLen();
   /**
   * 获得指定索引的皮肤数据
   * 不指定索引返回当前正在使用的皮肤数据
   * @param {number} idx 
   */
   export function getSkinDataByIndex(idx)
   /**
   * 获得标识对应皮肤已看广告任务次数
   * @param {string} skinFlag 皮肤标识字符串
   */

   export function getSkinTaskCount(skinFlag);
   /**
    * 保存标识对应皮肤已看广告任务次数 累加1
    * @param {string} skinFlag 皮肤标识字符串
    */
   export function saveSkinTaskCount(skinFlag)

   /**
    * 玩家过关之后将玩家的最新关卡加 1
    */
   export function addLatestLevel();

   /**
    * 设置所有关卡数据
    * 初始会将用户关卡数据更新到最新关卡
    * @param {array} arr 
    */
   export function setAllLevelData(arr);
   /**
    * 获取所有关卡数据
    */
   export function getAllLevelData();
   /**
    * 定向为最新关卡
    * 到最后一关时从第一关继续
    */
   export function setCurrLevelToLatest();
   /**
    * 定向为下一关
    */
   export function setCurrLevelToNext();
   /**
    * 定向为任意一关卡
    * @param {number} index 
    */
   export function setCurrLevelToIndex(index);
   /**
    * 设置当前在玩的关卡
    * @param {number} index 
    */
   export function setCurrLevel(index);
   /**
    * 设置当前关卡的数据
    */
   export function setLevelData();
   /**
    * 游戏中得到当前关卡ID
    * 从0开始计数
    */
   export function getCurrLevel();
   /**
    * 当前关是否为最后一关
    */
   export function isEndLevel();
   /**
    * 当前关卡数据
    */
   export function getLevelData();
   /**
    * 取任意索引关卡的数据
    * 返回null则未取到
    * @param {number} index 
    */
   export function getLevelDataToIndex(index);
   /**
    * 返回关卡总长度
    */
   export function getLevelLength();
   /**
    * 返回小游戏生命周期内已过关次数
    */
   export function getTodayCount();
   /**
    * 记录小游戏生命周期内已过关次数
    */
   export function addTodayCount();
   // 是否有关卡数据
   export function hasAllLevel();
   /**
    * 得到用户购买关卡的所有信息
    */
   export function getBuySing();
   /**
    * 设置购买关卡购买
    * 保存格式，键名关卡标志字符，键值 '0,1' 0 未购买，1 已购买
    */
   export function setBuySing(flag, buyStatus);
   /**
    * 当前关卡是否已购买
    * 先判断完是否需要购买再来判断是否已购买
    */
   export function getCurBuySing(flag);

   /**
    * 得到用户所有关卡解锁星星的信息
    */
   export function getLevelStar();
   /**
    * 设置过关后解锁星星的数量
    * 保存格式，键名关卡标志，键值 '1' 
    */
   export function setLevelStar(level, star);
   /**
    * 当前关卡星星数量
    * 用关卡标志取当前这首歌已得到的星星
    */
   export function getCurLevelStar(level);
   /**
    * 已取得的星星总数
    */
   export function getTotalStar();

   /**
    * 得到用户所有关卡完成进度
    */
   export function getStarScale();
   /**
    * 设置过关后关卡完成进度
    * 保存格式，键名关卡标志，键值 '0-100' 
    */
   export function setStarScale(level, star);
   /**
    * 当前关卡完成进度
    * 用关卡标志取当前这首歌的完成进度
    */
   export function getCurStarScale(level);
}

