export interface Statistic {
    brush_block: number,
    break_block: number
}

interface Achievement {
    name: string,
    content: string,
    type: 'once' | 'stage'
}

class OnceAchievement implements Achievement {
    name: string
    content: string
    type: 'once' | 'stage'
    judge: (statistic: Statistic) => boolean

    constructor(name: string, content: string, judge: (statistic: Statistic) => boolean) {
        this.name = name
        this.content = content
        this.type = 'once'
        this.judge = judge
    }
}

class StageAchievement implements Achievement {
    name: string
    content: string
    type: 'once' | 'stage'
    count: Array<number>
    judge: (statistic: Statistic) => number

    constructor(name: string, content: string, count: Array<number>, judge: (count: Array<number>, statistic: Statistic) => number) {
        this.name = name
        this.content = content
        this.type = 'stage'
        this.count = count
        this.judge = (statistic: Statistic) => judge(this.count, statistic)
    }
}

const getStageByCount = (array: Array<number>, num: number) => array.reduce((p, c) => c > num ? p : c, -1);

export const achievements: Record<string, Achievement> = {
    'first_brush': new OnceAchievement('开启你的考古之旅', '找到一个可疑的方块', (statistic: Statistic) => statistic.brush_block >= 1),
    'break_block': new StageAchievement('考古之路', '挖掘%count个方块', [10, 50, 100, 300], (count: Array<number>, statistic: Statistic) => getStageByCount(count, statistic.break_block)),
    'brush_block': new StageAchievement('收藏之路', '清理%count个可疑的方块', [10, 50, 100, 300], (count: Array<number>, statistic: Statistic) => getStageByCount(count, statistic.brush_block))
}

export const findUnlock = (statistic: Statistic, previous: Record<string, number | boolean>): Record<string, number | boolean> => {
    const result: Record<string, number | boolean> = {}
    Object.keys(achievements).forEach(id => {
        if (achievements[id].type == 'once') {
            const oa = <OnceAchievement>achievements[id]
            if (oa.judge(statistic) && !previous.hasOwnProperty(id))
                result[id] = previous[id] = true
        } else {
            const sa = <StageAchievement>achievements[id]
            const newValue = sa.judge(statistic)
            if (newValue >= 0 && !previous.hasOwnProperty(id) || newValue > previous[id])
                result[id] = previous[id] = newValue
        }
    })
    return result
}
