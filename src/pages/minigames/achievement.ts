export interface Statistic {
    brush_block: number,
    break_block: number
}

export interface Achievement {
    name: string,
    content: string,
    type: 'once' | 'stage'
}

export class OnceAchievement implements Achievement {
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

export class StageAchievement implements Achievement {
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

export const getStageByCount = (array: Array<number>, num: number) => array.reduce((p, c) => c > num ? p : c, -1);

export const findUnlock = (achievement:Record<string, Achievement>,statistic: Statistic, previous: Record<string, number | boolean>): Record<string, number | boolean> => {
    const result: Record<string, number | boolean> = {}
    Object.keys(achievement).forEach(id => {
        if (achievement[id].type == 'once') {
            const oa = <OnceAchievement>achievement[id]
            if (oa.judge(statistic) && !previous.hasOwnProperty(id))
                result[id] = previous[id] = true
        } else {
            const sa = <StageAchievement>achievement[id]
            const newValue = sa.judge(statistic)
            if (newValue >= 0 && !previous.hasOwnProperty(id) || newValue > previous[id])
                result[id] = previous[id] = newValue
        }
    })
    return result
}
