<script setup lang="ts">
import MinigameCard from 'components/MinigameCard.vue';
import {vAutoAnimate} from '@formkit/auto-animate';
</script>


<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md row container">
      <minigame-card ref="rescueCaptainOhm"
                     icon="RescueCaptainOhm.webp"
                     title="拯救向导老板！"
                     caption="挖挖挖扫扫扫..."
                     style="max-width: 350px">
        <template v-slot:info>
          <b>对于所有玩家：</b>
          <p>长按沙砾可以挖掘当前沙砾，长按刷子可以清扫当前沙砾！</p>
          <b>对于电脑玩家：</b>
          <p>还可以右键长按沙砾以清扫当前沙砾哦！</p>
          <b>对于部分长按会识别图像或弹出跳转窗口的移动端玩家：</b>
          <p>
            可以试试双指按压！实在不行，换个浏览器吧（<br/>
            目前移动端已经测试过的支持Edge，Firefox，百度浏览器<br/>
            不支持华为原生浏览器等大多数原生浏览器uwu<br/>
            如果你有能让原生浏览器不弹出以上窗口的办法，教教我吧（哭
          </p>
        </template>
        <div class="q-pa-md">
          <div class="row container"
               oncontextmenu="return false">
            <q-dialog v-model="item">
              <q-card>
                <q-card-section>
                  <div class="text-h6">恭喜！</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  你挖到了{{ lastItem }}！
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="知道啦" color="primary" v-close-popup/>
                </q-card-actions>
              </q-card>
            </q-dialog>
            <q-dialog v-model="wayFinder">
              <q-card>
                <q-card-section>
                  <div class="text-h6">芜湖！</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  向导老板被你解救了！
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="好哦！" color="primary" v-close-popup/>
                </q-card-actions>
              </q-card>
            </q-dialog>
            <div class="image-btn-container">
              <div class="image-container">
                <img src="/minigame-assets/rescue-captain-ohm/destroy_stage_0.png" style="display: none" alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/destroy_stage_1.png" style="display: none" alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/destroy_stage_2.png" style="display: none" alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/destroy_stage_3.png" style="display: none" alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/destroy_stage_4.png" style="display: none" alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/destroy_stage_5.png" style="display: none" alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/destroy_stage_6.png" style="display: none" alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/destroy_stage_7.png" style="display: none" alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/destroy_stage_8.png" style="display: none" alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/destroy_stage_9.png" style="display: none" alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/suspicious_gravel_0.png" style="display: none" alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/suspicious_gravel_1.png" style="display: none" alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/suspicious_gravel_2.png" style="display: none" alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/suspicious_gravel_3.png" style="display: none" alt=""/>
                <img :class="{ 'animated-element': true, 'animate': animate, 'block-img': true, 'mc-img': true }"
                     :src="'/minigame-assets/rescue-captain-ohm/' + blockSrc + '.png'"
                     alt=""/>
                <img class="item-img mc-img"
                     v-if="isSuspicious"
                     :src="'/minigame-assets/rescue-captain-ohm/item/' + itemSrc + '.png'"
                     :style="'width: 80%;clip-path: inset(0 0 ' + (pixel+120) + 'px 0);margin-bottom: ' + pixel + 'px;margin-top: 2rem'"
                     alt=""/>
                <img class="overlay-img mc-img"
                     v-if="mode=='break' && timer >= 1"
                     :src="'/minigame-assets/rescue-captain-ohm/destroy_stage_' + (timer>=1?(timer - 1):0).toString() + '.png'"
                     alt=""/>
              </div>
              <div class="overlay-div"
                   @mousedown="startBreak"
                   @mouseleave="stopPress"
                   @mouseup="stopPress"
                   @touchstart="startBreak"
                   @touchcancel="stopPress"
                   @touchend="stopPress"/>
            </div>
            <div class="image-btn-container">
              <q-img ref="container"
                     src="/minigame-assets/rescue-captain-ohm/container.png"
                     alt=""
                     class="col-12 mc-img"
                     width="80px"
                     height="80px"
                     style="margin-top: 2rem"/>
              <div class="overlay-div"
                   @mousedown="startCheck"
                   @mouseleave="stopPress"
                   @mouseup="stopPress"
                   @touchstart="startCheck"
                   @touchcancel="stopPress"
                   @touchend="stopPress"/>
            </div>
          </div>
        </div>
      </minigame-card>
    </div>
  </q-page>
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue';
import {seniorLootTable, simpleLootTable} from 'pages/minigames/loot-table';

let timerHandler: string | number | NodeJS.Timeout | undefined
let checkTimerHandler: string | number | NodeJS.Timeout | undefined
let pixel: number

export default defineComponent({
  name: 'RescueCaptainOhm',
  methods: {
    setProgress(progress: number) {
      switch (progress) {
        case 0:
          pixel = 120
          break
        case 1:
          pixel = 81
          break
        case 2:
          pixel = 44
          break
        case 3:
          pixel = 9
          break
      }
      this.blockSrc = `suspicious_gravel_${progress}`
    },
    randomItem() {
      const random = Math.floor(Math.random() * 57) + 1
      if (random < 46) {
        this.itemSrc = simpleLootTable.get(random)[0]
        this.thisItem = simpleLootTable.get(random)[1]
      } else {
        this.itemSrc = seniorLootTable.get(random - 45)[0]
        this.thisItem = seniorLootTable.get(random - 45)[1]
      }
    },
    refresh() {
      this.startAnimation()
      if (Math.floor(Math.random() * 100) <= 30) {
        this.isSuspicious = true
        this.setProgress(0)
        this.randomItem()
      } else {
        this.isSuspicious = false
        this.blockSrc = 'gravel'
      }
    },
    startAnimation() {
      this.animate = true;
      setTimeout(() => {
        this.animate = false;
      }, 250);
    },
    onUpdateTimer() {
      if (this.mode == 'break') {
        if (this.timer >= 10) {
          this.timer = 0
          this.refresh()
        } else {
          // this.playAudio('Suspicious_gravel_break')
        }
      } else if (this.isSuspicious) {
        this.checkTimer = Math.round(this.timer / 14)
        this.setProgress(this.checkTimer)
        if (this.checkTimer == 4) {
          this.checkTimer = 0
          this.lastItem = this.thisItem
          if (this.itemSrc == 'wayfinder_armor_trim_smithing_template') {
            this.wayFinder = true
          } else {
            this.item = true
          }
          this.stopTimer()
          this.refresh()
        }
      }
    },
    startCheck() {
      alert("AAA")
      this.mode = 'check'
      this.startPress()
    },
    startBreak(event: MouseEvent) {
      if (event.button == 2) {
        this.startCheck()
        return
      }
      this.mode = 'break'
      this.startPress()
    },
    startPress() {
      if (this.$q.platform.is.mobile) {
        this.stopPress()
      }
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
    pixel = 150
    return {
      blockSrc: 'gravel',
      itemSrc: '',
      isSuspicious: false,
      mode: 'break',
      pressing: false,
      timer: 0,
      checkTimer: 0,
      checkTimerRunning: false,
      audioName: 'Suspicious_gravel_break',
      item: ref(false),
      wayFinder: ref(false),
      thisItem: '',
      lastItem: '',
      animate: false
    }
  }
});

</script>

<style scoped>
.animated-element {
  width: 100px;
  height: 100px;
  opacity: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.animate {
  animation: appear 0.25s ease forwards;
}

@keyframes appear {
  0% {
    opacity: 0.75;
    transform: translate(-50%, -50%) scale(0.75);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mc-img {
  image-rendering: pixelated;
  pointer-events: none;
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

.image-btn-container {
  position: relative;
  display: inline-block;
}

.overlay-div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  pointer-events: auto;
  z-index: 4;
}
</style>
