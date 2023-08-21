<template>
  <q-card class="q-mb-xl col" @click="onClick" style="background-color: #e6f4ff">
    <q-dialog v-model="info">
      <q-card>
        <q-card-section>
          <div class="text-h6">玩法介绍</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <slot name="info"/>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="明白了！" color="primary" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-item>
      <q-item-section avatar>
        <q-avatar square size="64px">
          <img src="/icons/RescueCaptainOhm.webp" alt="Icon" class="icon">
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-h6">{{ title }}</q-item-label>
        <q-item-label caption>{{ caption }}</q-item-label>
      </q-item-section>
    </q-item>
    <slot/>
    <q-btn v-if="to == undefined"
           class="absolute-top-right"
           label="玩法"
           @click="info = true"
           style="margin-right: 4px;margin-top: 4px"/>
  </q-card>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';


export default defineComponent({
  name: 'MinigameCard',
  props: {
    title: String,
    caption: String,
    to: String
  },
  methods: {
    onClick() {
      if (this.to != undefined) {
        this.$router.push(`/minigames/${this.to}`)
      }
    }
  },
  setup() {
    return {
      info: ref(false)
    }
  }
});
</script>
