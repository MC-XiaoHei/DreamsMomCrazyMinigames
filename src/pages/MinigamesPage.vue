<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md">
      <div class="row">
        <minigame-card ref="rescueCaptainOhm" title="拯救向导老板！" caption="挖挖挖扫扫扫..." to="RescueCaptainOhm"/>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MinigameCard from 'components/MinigameCard.vue';

export default defineComponent({
  name: 'MinigamesPage',
  components: {MinigameCard},
  setup () {
    return {};
  }
});
</script>
