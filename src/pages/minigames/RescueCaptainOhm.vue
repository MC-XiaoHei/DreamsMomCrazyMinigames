<script setup lang="ts">
import MinigameCard from 'components/MinigameCard.vue';
import {vAutoAnimate} from '@formkit/auto-animate';
</script>


<template>
  <div class="q-pa-md row container full-height full-width">
    <minigame-card v-auto-animate ref="rescueCaptainOhm" title="拯救向导老板！" caption="挖挖挖扫扫扫..."
                   style="max-width: 350px">
      <div class="q-pa-md">
        <div class="row container"
             oncontextmenu="return false">
          <div class="image-container"
               @mousedown="startBreak"
               @mouseleave="stopPress"
               @mouseup="stopPress"
               @touchstart="startBreak"
               @touchcancel="stopPress"
               @touchend="stopPress">
            <img class="block-img mc-img"
                 :src="'/minigame-assets/rescue-captain-ohm/' + blockSrc + '.png'"
                 alt=""/>
            <img class="item-img mc-img"
                 v-if="isSuspicious"
                 :src="'/minigame-assets/rescue-captain-ohm/item/' + itemSrc + '.png'"
                 :style="'width: 100%;clip-path: inset(0 0 ' + (pixel+150) + 'px 0);margin-bottom: ' + pixel + 'px;margin-top: 2rem'"
                 alt=""/>
            <img class="overlay-img mc-img"
                 v-if="timer!=0 && mode=='break'"
                 :src="'/minigame-assets/rescue-captain-ohm/destroy_stage_' + (this.timer-1).toString() + '.png'"
                 alt=""/>
          </div>
          <q-img @mousedown="startCheck"
                 @mouseleave="stopPress"
                 @mouseup="stopPress"
                 @touchstart="startCheck"
                 @touchcancel="stopPress"
                 @touchend="stopPress"
                 ref="container"
                 src="/minigame-assets/rescue-captain-ohm/container.png"
                 alt=""
                 class="col-12 mc-img"
                 width="80px"
                 height="80px"
                 style="margin-top: 2rem"/>
        </div>
      </div>
    </minigame-card>
  </div>
</template>

<script lang="ts">

import {defineComponent} from 'vue';
import {seniorLootTable, simpleLootTable} from 'pages/minigames/loot-table';

let timerHandler: string | number | NodeJS.Timeout | undefined
let checkTimerHandler: string | number | NodeJS.Timeout | undefined
let pixel = 150
let timer = 0

export default defineComponent({
  name: 'RescueCaptainOhm',
  methods: {
    setProgress(progress: number) {
      switch (progress) {
        case 0:
          pixel = 150
          break
        case 1:
          pixel = 102
          break
        case 2:
          pixel = 56
          break
        case 3:
          pixel = 12
          break
      }
      this.blockSrc = `suspicious_gravel_${progress}`
    },
    randomItem() {
      const random = Math.floor(Math.random() * 57) + 1
      if (random < 46) {
        this.itemSrc = simpleLootTable.get(random)
      } else {
        this.itemSrc = seniorLootTable.get(random - 45)
      }
    },
    refresh() {
      if (Math.floor(Math.random() * 100) <= 90) {
        this.isSuspicious = true
        this.setProgress(0)
        this.randomItem()
      } else {
        this.isSuspicious = false
        this.blockSrc = 'gravel'
      }
    },
    onUpdateTimer() {
      if (this.mode == 'break') {
        if (this.timer >= 10) {
          this.timer = 0
          this.refresh()
          this.stopTimer()
          this.startTimer()
        }
      } else if (this.isSuspicious) {
        this.checkTimer = Math.round(this.timer / 14)
        this.setProgress(this.checkTimer)
        if (this.checkTimer == 4) {
          this.checkTimer = 0
          this.stopTimer()
          this.refresh()
        }
      }
    },
    startCheck() {
      this.mode = 'check'
      this.startPress()
    },
    startBreak(event: MouseEvent) {
      if (event.button == 2) {
        this.mode = 'check'
        this.startPress()
        return
      }
      this.mode = 'break'
      this.startPress()
    },
    startPress() {
      if (this.pressing) {
        return
      }
      this.startTimer()
      this.pressing = true
    },
    startTimer() {
      timerHandler = setInterval(() => {
        this.timer++
        this.onUpdateTimer()
      }, 100)
    },
    stopPress() {
      this.stopTimer()
      if (!this.pressing) {
        return
      }
      this.pressing = false
    },
    stopTimer() {
      clearInterval(timerHandler)
      if (!this.checkTimerRunning) {
        this.checkTimerRunning = true
        checkTimerHandler = setInterval(() => {
          if (this.checkTimer > 0) {
            this.checkTimer--
            this.setProgress(this.checkTimer)
          }
          if (this.checkTimer == 0) {
            clearInterval(checkTimerHandler)
            this.checkTimerRunning = false
          }
        }, 500)
      }
      this.timer = 0
    }
  },
  data() {
    return {
      blockSrc: 'gravel',
      itemSrc: '',
      isSuspicious: false,
      mode: 'break',
      pressing: false,
      timer: timer,
      checkTimer: 0,
      checkTimerRunning: false
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
}

.image-container {
  position: relative;
  width: 300px;
  height: 300px;
  overflow: hidden;
}

.block-img {
  width: 100%;
  height: 100%;
}

.item-img {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: transform 0.3s ease-in-out;
}

.overlay-img {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
</style>
