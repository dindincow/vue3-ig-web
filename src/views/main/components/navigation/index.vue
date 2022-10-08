<template>
  <MobileNavigation v-if="isMobileTerminal"></MobileNavigation>
  <PcNavigation v-else></PcNavigation>
</template>

<script setup>

import { isMobileTerminal } from '@/utils/flexible'
import MobileNavigation from './mobile/index.vue'
import PcNavigation from './pc/index.vue'
import { useStore } from 'vuex'

const store = useStore();
store.dispatch('category/useCategoryData')


</script>
<style scoped lang="scss"></style>
