<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { inject } from '@vercel/analytics';

inject();
export default defineComponent({
  name: 'App'
});
</script>
