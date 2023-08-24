<script setup lang="ts">
import MinigameCard from 'components/MinigameCard.vue';
</script>

<template>
  <q-page class="row items-center justify-evenly" style="overflow: hidden">
    <q-card style="width: 350px"
            class="notice"
            :style="{transform: `translateX(${noticePos})`}">
      <q-card-section class="full-width">
        <div class="text-subtitle1 text-left text-bold text-white" style="margin-left: 1rem">{{ noticeTitle }}</div>
        <div class="text-body2 text-left text-white" style="margin-left: 1rem">{{ noticeContent }}</div>
      </q-card-section>
    </q-card>
    <div class="q-pa-md row container">
      <minigame-card ref="rescueCaptainOhm"
                     icon="RescueCaptainOhm.webp"
                     title="拯救向导老板！"
                     caption="挖挖挖扫扫扫..."
                     :style="'min-width:350px;max-width: 350px;transform: scale(' + scaleData + ')'">
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
        <div class="q-pa-md" style="min-width: 350px;max-width: 350px">
          <div class="row container">
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
            <div>
              <audio ref="achievement_sound" preload="auto"
                     src="/minigame-assets/rescue-captain-ohm/sound/Challenge_complete.mp3"></audio>
              <audio ref="sand_sound" preload="auto"
                     src="/minigame-assets/rescue-captain-ohm/sound/Brush_brushing1.mp3"></audio>
              <audio ref="pop_sound" preload="auto"
                     src="/minigame-assets/rescue-captain-ohm/sound/Pop.mp3"></audio>
              <audio ref="dig_sound" preload="auto"
                     src="/minigame-assets/rescue-captain-ohm/sound/gravel_step.mp3"></audio>
              <audio ref="destroy_sound" preload="auto"
                     src="/minigame-assets/rescue-captain-ohm/sound/gravel_dig.mp3"></audio>
            </div>
            <div ref="stat">{{ statMsg }}</div>
            <div class="image-btn-container">
              <div class="image-container">
                <img src="/minigame-assets/rescue-captain-ohm/overlay/destroy_stage_0.png" style="display: none"
                     alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/overlay/destroy_stage_1.png" style="display: none"
                     alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/overlay/destroy_stage_2.png" style="display: none"
                     alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/overlay/destroy_stage_3.png" style="display: none"
                     alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/overlay/destroy_stage_4.png" style="display: none"
                     alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/overlay/destroy_stage_5.png" style="display: none"
                     alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/overlay/destroy_stage_6.png" style="display: none"
                     alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/overlay/destroy_stage_7.png" style="display: none"
                     alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/overlay/destroy_stage_8.png" style="display: none"
                     alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/overlay/destroy_stage_9.png" style="display: none"
                     alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/block/suspicious_gravel_0.png" style="display: none"
                     alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/block/suspicious_gravel_1.png" style="display: none"
                     alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/block/suspicious_gravel_2.png" style="display: none"
                     alt=""/>
                <img src="/minigame-assets/rescue-captain-ohm/block/suspicious_gravel_3.png" style="display: none"
                     alt=""/>
                <img :class="{ 'animated-element': true, 'animate': animate, 'block-img': true, 'mc-img': true }"
                     :src="'/minigame-assets/rescue-captain-ohm/block/' + blockSrc + '.png'"
                     alt=""/>
                <img class="item-img mc-img"
                     v-if="isSuspicious"
                     :src="'/minigame-assets/rescue-captain-ohm/item/' + itemSrc + '.png'"
                     :style="'width: 80%;clip-path: inset(0 0 ' + (pixel+120) + 'px 0);margin-bottom: ' + pixel + 'px;margin-top: 2rem'"
                     alt=""/>
                <img class="overlay-img mc-img"
                     v-if="mode=='break' && timer >= 1"
                     :src="'/minigame-assets/rescue-captain-ohm/overlay/destroy_stage_' + (timer>=1?(timer - 1):0).toString() + '.png'"
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
                     src="/minigame-assets/rescue-captain-ohm/gui/container.png"
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
import {seniorLootTable, simpleLootTable} from 'pages/minigames/rescue-captain-ohm/loot-table';
import {Statistic, findUnlock} from 'pages/minigames/achievement';
import achievements from 'pages/minigames/rescue-captain-ohm/achievements';
import scale from 'pages/minigames/scale';

let timerHandler: string | number | NodeJS.Timeout | undefined
let checkTimerHandler: string | number | NodeJS.Timeout | undefined
let pixel: number
let scaleData = 1.0
let statistic: Statistic, achievement: Record<string, number | boolean>

export default defineComponent({
  name: 'RescueCaptainOhm',
  mounted() {
    if (window.localStorage.getItem('statistic') == null || window.localStorage.getItem('statistic') == '')
      window.localStorage.setItem('statistic', JSON.stringify({brush_block: 0, break_block: 0}))
    statistic = JSON.parse(window.localStorage.getItem('statistic') ?? '')
    if (window.localStorage.getItem('achievement') == null || window.localStorage.getItem('achievement') == '')
      window.localStorage.setItem('achievement', JSON.stringify({}))
    achievement = JSON.parse(window.localStorage.getItem('achievement') ?? '')
    this.saveStatistic()
    this.handleResize()
  },
  created(){
    this.handleResize()
  },
  beforeMount() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
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
    saveStatistic() {
      window.localStorage.setItem('statistic', JSON.stringify(statistic))
      this.statMsg = `挖掘方块：${statistic.break_block} | 清理方块：${statistic.brush_block}`
      this.checkAchievement()
    },
    checkAchievement() {
      const res = findUnlock(achievements, statistic, achievement)
      const achievementSoundElement = this.$refs.achievement_sound as HTMLAudioElement
      if (Object.keys(res).length > 0) {
        Object.keys(res).forEach(id => achievement[id] = res[id])
        window.localStorage.setItem('achievement', JSON.stringify(achievement))
        this.noticePos = '-320px'
        this.noticeTitle = '达成成就！ ' + achievements[Object.keys(res)[0]].name
        this.noticeContent = achievements[Object.keys(res)[0]].content
            .replace('%brush_count', statistic.brush_block.toString())
            .replace('%break_count', statistic.break_block.toString())
        achievementSoundElement.currentTime = 0
        achievementSoundElement.play()
        setTimeout(() => this.noticePos = '10px', 6000)
      }
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
        if (this.timer >= 11) {
          const destroySoundElement = this.$refs.destroy_sound as HTMLAudioElement
          this.timer = 0
          statistic.break_block++
          this.saveStatistic()
          destroySoundElement.currentTime = 0
          destroySoundElement.play()
          this.refresh()
        } else if ([2, 5, 8].indexOf(this.timer) != -1) {
          const digSoundElement = this.$refs.dig_sound as HTMLAudioElement
          digSoundElement.currentTime = 0
          digSoundElement.play()
        }
      } else if (this.isSuspicious) {
        this.checkTimer = Math.round(this.timer / 14)
        this.setProgress(this.checkTimer)
        if (this.checkTimer == 4) {
          this.checkTimer = 0
          this.currentBrushTime = 0
          statistic.brush_block++
          this.saveStatistic()
          this.lastItem = this.thisItem
          if (this.itemSrc == 'wayfinder_armor_trim_smithing_template') {
            this.wayFinder = true
          } else {
            this.item = true
          }
          setTimeout(() => {
            const popSoundElement = this.$refs.pop_sound as HTMLAudioElement
            popSoundElement.currentTime = 0
            popSoundElement.play()
          }, 500)
          this.stopTimer()
          this.refresh()
        } else if (this.checkTimer != this.currentBrushTime) {
          this.currentBrushTime = this.checkTimer
          const sandSoundElement = this.$refs.sand_sound as HTMLAudioElement
          sandSoundElement.currentTime = 0
          sandSoundElement.play()
        }
      }
    },
    startCheck() {
      if (this.$q.platform.is.mobile) {
        this.mobileFlag = 0
      }
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
      if (this.$q.platform.is.mobile && this.mode == 'check') {
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
      if (this.$q.platform.is.mobile && this.mobileFlag < 2 && this.mode == 'check') {
        this.mobileFlag++
        return;
      }
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
    },
    handleResize() {
      scaleData = scale()
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
      animate: false,
      mobileFlag: 0,
      currentBrushTime: 0,
      statMsg: '挖掘方块：0 | 清理方块：0',
      noticePos: '10px',
      noticeTitle: '',
      noticeContent: ''
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

.notice {
  z-index: 4;
  image-rendering: pixelated;
  position: absolute;
  background-image: url('/minigame-assets/rescue-captain-ohm/gui/toasts.png');
  background-size: 320px 64px;
  max-width: 320px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s ease;
  top: 0;
  right: -320px;
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
  z-index: 3;
}
</style>
