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
        </template>
        <div class="q-pa-md" style="min-width: 350px;max-width: 350px;overflow: hidden">
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
      let floor = 13
      let ceiling = 14
      this.map.push([ceiling, 0, 0, 0, 0, 0, 1, floor])
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
      this.generateNext()
      this.timerRunning = true
      timerHandler = setInterval(() => {
        if (this.mapMarginLeft <= -32) {
          this.generateNext()
          this.mapMarginLeft = 0
        } else {
          this.mapMarginLeft -= this.moveInterval;
        }
      }, 10);
    },
    stopTimer() {
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
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 2],
        [0, 0, 0, 0, 0, 0, 0, 3],
        [0, 0, 0, 0, 0, 0, 0, 4],
        [0, 0, 0, 0, 0, 0, 0, 5],
        [0, 0, 0, 0, 0, 0, 0, 6],
        [0, 0, 0, 0, 0, 0, 0, 7],
        [0, 0, 0, 0, 0, 0, 0, 8],
        [0, 0, 0, 0, 0, 0, 0, 9],
        [0, 0, 0, 0, 0, 0, 0, 10],
        [0, 0, 0, 0, 0, 0, 0, 11],
        [0, 0, 0, 0, 0, 0, 0, 12]
      ],
      mapMarginLeft: 0,
      timerRunning: false,
      moveInterval: 0.4
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
