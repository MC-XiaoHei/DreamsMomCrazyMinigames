<script setup lang="ts">
import MinigameCard from 'components/MinigameCard.vue';
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md row container">
      <minigame-card ref="happyPointedDripstone"
                     icon="HappyPointedDripstone.png"
                     title="快乐的石笋！"
                     caption="Duang ~ ！"
                     style="min-width:350px;max-width: 350px">
        <template v-slot:info>
        </template>
        <div class="q-pa-md" style="min-width: 350px;max-width: 350px;">
          <div class="text-body1 text-center">已帮助梦妈飞行0格 | 最高纪录114514格</div>
          <div style="width:350px;height: 200px;background-color: black;margin-left:-16px">

          </div>
          <div class="row container item-container">
            <div class="col">
              <q-img src="/minigame-assets/happy-pointed-dripstone/item/jump_boost.png"
                     class="mc-img item"/>
            </div>
            <div class="col">
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

export default defineComponent({
  name: 'HappyPointedDripstone',
  methods: {},
  data() {
    return {}
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
