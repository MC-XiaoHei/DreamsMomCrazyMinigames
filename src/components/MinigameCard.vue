<template>
  <q-card class="q-mb-xl col" @click="onClick" style="background-color: #e6f4ff">
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
    <slot></slot>
  </q-card>
</template>

<script lang="ts">
import {defineComponent} from 'vue';


export default defineComponent({
  name: 'MinigameCard',
  props: {
    title: String,
    caption: String,
    to: String
  },
  methods: {
    onClick() {
      if(this.to != undefined){
        this.$router.push(`/minigames/${this.to}`)
      }
    }
  },
  setup() {
    return {}
  }
});
</script>
