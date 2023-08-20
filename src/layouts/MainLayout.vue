<template>
  <q-layout view="lHh lpr lFf">
    <q-header bordered class="text-green" style="background-color: #b5f5ec">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <q-avatar square>
            <img src="/icons/favicon-128x128.png" alt="">
          </q-avatar>
          梦 妈 坐 牢 小 游 戏 ~
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer bordered class="text-green" style="background-color: #b5f5ec">
      <q-tabs no-caps active-color="green" indicator-color="transparent" class="text-dark" v-model="tab">
        <q-route-tab name="minigames" label="小游戏列表" to="/"/>
        <q-route-tab name="about" label="关于本站" to="/about"/>
      </q-tabs>
    </q-footer>

    <q-page-container style="height: 100vh;">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';


export default defineComponent({
  name: 'MainLayout',

  setup() {
    return {
      tab: ref('minigames')
    }
  }
});
</script>
