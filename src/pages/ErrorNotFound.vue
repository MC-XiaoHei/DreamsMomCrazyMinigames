<template>
  <div class="fullscreen bg-green text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        呜呜呜，找不到什么东西
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="green"
        unelevated
        to="/"
        label="去玩小游戏！"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorNotFound'
});
</script>
