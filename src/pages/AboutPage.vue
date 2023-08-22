<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md row container">
      <q-card class="col-md" style="background-color: #e6f4ff;min-width: 350px">
        <div class="q-pa-md">
          <b class="text-h5">关于本站</b>
          <div style="height: 1rem"/>
          <p>
            本站致力于让妈粉能 <b>享受</b> 到和梦妈一样的坐牢体验！<br/>
            开发者就有MC_XiaoHei一个uwu <span class="roast">还有个冰火</span>
          </p>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';


export default defineComponent({
  name: 'AboutPage',

  setup() {
    return {}
  }
})
</script>

<style scoped>
.roast {
  background-color: black;
  color: black;
  border-radius: 5px;
  padding: 3px;
}

.roast:hover {
  color: white;
}
</style>
