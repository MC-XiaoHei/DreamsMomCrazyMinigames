<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md">
      <div class="row q-col-gutter-lg flex-center">
        <div class="col-md" style="min-width: 300px;max-width: 300px">
          <minigame-card ref="rescueCaptainOhm" icon="RescueCaptainOhm.webp" title="拯救向导老板！" caption="挖挖挖扫扫扫..." to="RescueCaptainOhm"/>
        </div>
<!--        <div class="col-md" style="min-width: 300px;max-width: 300px">-->
<!--          <minigame-card ref="rescueCaptainOhm" title="快乐的石笋！" caption="Duang ~ !" to="RescueCaptainOhm"/>-->
<!--        </div>-->
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import MinigameCard from 'components/MinigameCard.vue';

export default defineComponent({
  name: 'MinigamesPage',
  components: {MinigameCard},
  setup() {
    return {};
  }
});
</script>
