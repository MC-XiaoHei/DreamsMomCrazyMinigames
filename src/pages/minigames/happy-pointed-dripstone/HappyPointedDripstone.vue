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
                     style="max-width: 350px">
        <template v-slot:info>
        </template>
        <div class="q-pa-md" style="min-width: 350px;max-width: 350px">

        </div>
      </minigame-card>
    </div>
  </q-page>
</template>

<script lang="ts">

import {defineComponent} from 'vue';

export default defineComponent({
  name: 'HappyPointedDripstone',
  methods: {

  },
  data() {
    return {
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

</style>
