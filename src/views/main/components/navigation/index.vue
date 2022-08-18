<template>
  <MobileNavigation
    v-if="isMobileTerminal"
    :data="categoryData"
  ></MobileNavigation>
  <PcNavigation v-else></PcNavigation>
</template>

<script setup>
import { ref } from 'vue'
import { getCategory } from '@/api/category'
import { isMobileTerminal } from '@/utils/flexible'
import MobileNavigation from './mobile/index.vue'
import PcNavigation from './pc/index.vue'

const categoryData = ref([])

const getCategoryData = async () => {
  const { categorys } = await getCategory()
  categoryData.value = categorys
}

getCategoryData()
</script>
<style scoped lang="scss"></style>
