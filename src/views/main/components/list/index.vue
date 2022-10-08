<template>
  <div>
    <itemVue v-for="item in pexelsList" :key="item.id" :data="item" :width="width" />
    <!-- <m-infinite-list
      v-model="isLoading"
      :isFinished="isFinished"
      @onLoad="getPexelsData">
      <m-waterfall
        class="px-1 w-full"
        :data="pexelsList" 
        nodeKey="id" 
        :column="isMobileTerminal ? 2 : 5" 
        :picturePreReading="false"
      >
        <template v-slot="{ item, width }">
          <itemVue :data="item" :width="width" />
        </template>
      </m-waterfall>
    </m-infinite-list> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getPexelsList } from '@/api/pexels'
import itemVue from './item.vue'
import { isMobileTerminal } from '@/utils/flexible'

let query = {
  page: 1,
  size: 20
}

// // 数据是否在加载中
// const isLoading = ref(false)
// // 数据是否全部加载完成
// const isFinished = ref(false)

// 或取瀑布流資料
const pexelsList = ref([])
const getPexelsData = async () => {
  const res = await getPexelsList(query)
  console.log('res',res)
  pexelsList.value = res.list
}
getPexelsData()
</script>
