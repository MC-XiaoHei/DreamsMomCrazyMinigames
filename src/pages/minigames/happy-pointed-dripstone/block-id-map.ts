const BlockIdMap = new Map([
    [0, 'air'],
    [1, 'pointed_dripstone/up_base'],
    [2, 'pointed_dripstone/up_middle'],
    [3, 'pointed_dripstone/up_frustum'],
    [4, 'pointed_dripstone/up_tip'],
    [5, 'pointed_dripstone/up_tip_merge'],
    [6, 'pointed_dripstone/down_base'],
    [7, 'pointed_dripstone/down_middle'],
    [8, 'pointed_dripstone/down_frustum'],
    [9, 'pointed_dripstone/down_tip'],
    [10, 'pointed_dripstone/down_tip_merge'],
    [11, 'lava/flow'],
    [12, 'lava/still'],
    [13, 'stone'],
    [14, 'dripstone_block'],
    [15, 'grass_block_side'],
    [16, 'coal_ore'],
    [17, 'deepslate_coal_ore'],
    [18, 'diorite'],
    [19, 'granite'],
    [20, 'andesite'],
    [21, 'toff'],
    [22, 'deepslate']
])

export default function getBlock(id: number) {
    let res = BlockIdMap.get(id)
    if (res == undefined) {
        res = 'air';
    }
    return res
}
