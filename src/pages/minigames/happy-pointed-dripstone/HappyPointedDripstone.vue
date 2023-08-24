<script setup lang="ts">
import MinigameCard from 'components/MinigameCard.vue';
import getBlock from 'pages/minigames/happy-pointed-dripstone/block-id-map';
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md row container">
      <minigame-card ref="happyPointedDripstone"
                     icon="HappyPointedDripstone.png"
                     title="快乐的石笋！"
                     caption="Duang ~ ！"
                     :style="'min-width:350px;max-width: 350px;transform: scale(' + scaleData + ')'">
        <template v-slot:info>
          <b>游戏规则：</b>
          <p>通过控制梦妈飞行的高度帮助梦妈躲避障碍！</p>
          <b>对于所有玩家：</b>
          <p>
            点击开始游戏，点击跳跃按钮帮助梦妈增加高度，<br/>
            点击烟花火箭加速飞行，点击三叉戟掷出三叉戟！
          </p>
          <b>三叉戟没做完捏uwu</b><br/><br/>
<!--          <b>对于电脑玩家：</b>-->
<!--          <p>-->
<!--            空格开始游戏，也可以帮助梦妈增加高度，<br/>-->
<!--            W加速飞行，R掷出三叉戟！-->
<!--          </p>-->
          <b>游戏设定：</b>
          <p>
            梦妈会自己往下掉的（真笨！）<br/>
            三叉戟可以破坏石锥！而且自带忠诚uwu<br/>
            烟花火箭有5秒的CD捏！<br/>
            碰到任何方块梦妈都会失败（好脆）
          </p>
          <span>
            <b>皮肤已经经过梦妈本人授权！</b>
            <q-btn flat color="green" class="text-center" size="10px"
                   :label="showSkinAuthorization?'点击隐藏！':'点击显示！'"
                   @click="showSkinAuthorization = !showSkinAuthorization"/>
          </span>
          <q-img v-if="showSkinAuthorization"
                 src="/minigame-assets/happy-pointed-dripstone/skin/DreamsMa/authorization.png"/>
        </template>
        <div class="q-pa-md" style="min-width: 350px;max-width: 350px;overflow: hidden">
          <q-img v-for="id in 22" :key="id" style="display: none"
                 :src="'/minigame-assets/happy-pointed-dripstone/block/' + getBlock(id) + '.png'"/>
          <div class="text-body1 text-center text-red">此游戏尚未制作完成</div>
          <div class="text-body1 text-center">已帮助梦妈飞行0格 | 最高纪录114514格</div>
          <div :style="{
            width:'350px',
            height: '256px',
            marginLeft: -16 + mapMarginLeft + 'px'}" @click="startTimer">
            <div v-for="row in 8" :key="row" class="row" style="min-width: 384px;">
              <div v-for="col in 12" :key="col" class="col" style="min-width: 32px;min-height: 32px;max-height: 32px">
                <img
                    :src="'/minigame-assets/happy-pointed-dripstone/block/' + getBlock(<number>map.at(col-1).at(row-1)) + '.png'"
                    class="full-width full-height mc-img"
                    alt="Image"/>
              </div>
            </div>
          </div>
<!--          <q-img src="/minigame-assets/happy-pointed-dripstone/skin/DreamsMa/head.png" sizes="32px"/>-->
          <div class="row container item-container" style="margin-top: 1rem">
            <div class="col">
              <q-img src="/minigame-assets/happy-pointed-dripstone/item/jump_boost.png"
                     class="mc-img item"/>
            </div>
            <div class="col" @click="useFireworkRocket">
              <q-img src="/minigame-assets/happy-pointed-dripstone/item/firework_rocket.png"
                     class="mc-img item"/>
            </div>
            <div class="col">
              <q-img src="/minigame-assets/happy-pointed-dripstone/item/trident.png"
                     class="mc-img item"/>
            </div>
          </div>
        </div>
      </minigame-card>
    </div>
  </q-page>
</template>

<script lang="ts">

import {defineComponent} from 'vue';
import scale from 'pages/minigames/scale';

let scaleData: number
let timerHandler: string | number | NodeJS.Timeout | undefined

export default defineComponent({
  name: 'HappyPointedDripstone',
  methods: {
    handleResize() {
      scaleData = scale()
    },
    generateNext() {
      this.map.shift()
      let floor = 22
      let ceiling = 22
      let newMap = this.generateObstacle()
      newMap.push(floor)
      newMap.unshift(ceiling)
      this.map.push(newMap)
    },
    generateObstacle() {
      let result: number[] = [0, 0, 0, 0, 0, 0]
      if (this.generateCd != 3) {
        this.generateCd++
        return result
      }
      this.generateCd = 0
      let type = Math.floor(Math.random() * 2) + 1
      if (type <= 2) {
        let length = type == 3 ? 6 : Math.floor(Math.random() * 3) + 2
        if (type == 1) { // 钟乳石
          switch (length) {
            case 2: {
              result[0] = 8
              result[1] = 9
              break
            }
            default: {
              result[0] = 6
              for (let i = 1; i <= length - 3; i++) {
                result[i] = 7
              }
              result[length - 2] = 8
              result[length - 1] = 9
              break
            }
          }
        } else { // 石笋
          switch (length) {
            case 2: {
              result[5] = 3
              result[4] = 4
              break
            }
            default: {
              result[5] = 1
              for (let i = 1; i <= length - 3; i++) {
                result[5 - i] = 2
              }
              result[7 - length] = 3
              result[6 - length] = 4
              break
            }
          }
        }
        // } else if (type == 3) {// 石柱 WIP
        // } else if (type == 5) { // 岩石团 - 顶端
        //   let block = Math.floor(Math.random() * 9) + 1
        //   if (block <= 2) {
        //     block += 12
        //   } else {
        //     block += 13
        //   }
      }
      return result
    },
    useFireworkRocket() {
      this.moveInterval = 0.8
      setTimeout(() => {
        this.moveInterval = 0.4
      }, 1000)
    },
    startTimer() {
      if (this.timerRunning) {
        return
      }
      this.timerRunning = true
      timerHandler = setInterval(() => {
        if (this.mapMarginLeft <= -32) {
          this.generateNext()
          this.mapMarginLeft = 0
          this.stopTimer()
          this.startTimer()
        } else {
          this.mapMarginLeft -= this.moveInterval;
        }
      }, 10);
    },
    stopTimer() {
      this.timerRunning = false
      clearInterval(timerHandler);
    }
  },
  created() {
    this.handleResize()
  },
  beforeMount() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  data() {
    return {
      map: [
        [15, 13, 13, 13, 13, 22, 22, 22],
        [15, 13, 0, 0, 22, 22, 22, 22],
        [0, 0, 0, 0, 0, 0, 22, 22],
        [0, 0, 0, 0, 0, 0, 0, 22],
        [0, 0, 0, 0, 0, 0, 0, 22],
        [0, 0, 0, 0, 0, 0, 0, 22],
        [0, 0, 0, 0, 0, 0, 0, 22],
        [0, 0, 0, 0, 0, 0, 0, 22],
        [15, 0, 0, 0, 0, 0, 0, 22],
        [15, 13, 0, 0, 0, 0, 0, 22],
        [13, 13, 0, 0, 0, 0, 0, 22],
        [22, 22, 0, 0, 0, 0, 0, 22],
        [22, 0, 0, 0, 0, 0, 0, 22],
        [22, 0, 0, 0, 0, 0, 0, 22]
      ],
      mapMarginLeft: 0,
      timerRunning: false,
      moveInterval: 0.4,
      showSkinAuthorization: false,
      generateCd: 3
    }
  }
});

</script>

<style scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mc-img {
  image-rendering: pixelated;
  pointer-events: none;
}

.item {
  width: 64px;
  height: 64px;
  margin: 8px;
}

.item-container {
  margin-left: 39px;
  image-rendering: pixelated;
  background-image: url("/minigame-assets/happy-pointed-dripstone/gui/container.png");
  background-size: 240px 80px;
  max-width: 240px;
  min-height: 80px;
}

</style>
