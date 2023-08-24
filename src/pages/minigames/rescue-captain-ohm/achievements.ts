import {Achievement, getStageByCount, OnceAchievement, StageAchievement, Statistic} from 'pages/minigames/achievement';

const achievements: Record<string, Achievement> = {
  'first_brush': new OnceAchievement('开启你的考古之旅', '找到一个可疑的方块', (statistic: Statistic) => statistic.brush_block >= 1),
  'break_block': new StageAchievement('考古之路', '挖掘%break_count个方块', [10, 50, 100, 300], (count: Array<number>, statistic: Statistic) => getStageByCount(count, statistic.break_block)),
  'brush_block': new StageAchievement('收藏之路', '清理%brush_count个可疑的方块', [10, 50, 100, 300], (count: Array<number>, statistic: Statistic) => getStageByCount(count, statistic.brush_block))
}

export default achievements
