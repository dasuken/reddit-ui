<template>
  <div class="min-h-screen">
    <Header></Header>
    <router-view class="mx-auto max-w-screen-md px-2 overflow-hidden box-border`" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  components: {
    Header
  },
  setup() {
  },
};
</script>