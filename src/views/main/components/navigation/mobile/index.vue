<template>
  <div class="bg-white dark:bg-zinc-900 sticky top-0 left-0 z-10">   
    <ul
      ref="ulTarget"
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
    > 
       <!-- <div>{{ulScrollLeft}}</div> -->
       <!-- 漢堡按鈕 -->
      <li 
        @click="onShowPopup" 
        class="z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white dark:bg-zinc-900 shadow-l-white dark:shadow-l-zinc">
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
      </li>

      <!-- 滑塊-->
      <li ref="sliderTarget" :style="sliderStyle" class="absolute h-[22px] bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-200"></li>
     
      <!-- category item -->
      <li
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{'text-zinc-100': currentCategoryIndex===index}"
        :ref="setItemRef"
        @click="onItemClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>
    <m-popup v-model="isVisible">
      	<menu-vue  @onItemClick="onItemClick"></menu-vue>
    </m-popup>
  </div>
</template>


<script setup>
// 在 vite 建構中,可以直接使用 defineProps, 不須導入
import { ref, onBeforeUpdate, watch  } from 'vue'
import { useScroll } from '@vueuse/core'
import MenuVue from '@/views/main/components/menu/index.vue'


// 滑塊樣式
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px'  
})

// 選中 item index
const currentCategoryIndex = ref(0)

// 獲取所有 item 元素
let itemRefs = []
const setItemRef = (el) => {
  // console.log('el', el)
  if(el){
    itemRefs.push(el)
  }
}

// 數據改變後，DOM 變化前被處發＿
onBeforeUpdate(() => {
  itemRefs = []
})

// 獲取 ul ref
const ulTarget = ref(null)
// 從 @vueuse/core 中獲取元素 scroll 的距離
const { x: ulScrollLeft } = useScroll(ulTarget)

watch(currentCategoryIndex,(val) => {
  const { left, width } = itemRefs[val].getBoundingClientRect()
  console.log('....',left, width)
  sliderStyle.value = {
    // 滑塊的位子 =  ul 横向滚动位置 + 當前元素的 left  - ul 的 padding
    transform: `translateX(${ulScrollLeft.value + left - 10 + 'px'})`,
    width: width + 'px'
  }
})

// item 點擊
const onItemClick = (index) => {
  currentCategoryIndex.value = index
  isVisible.value = false
}

// popup
const isVisible = ref(false)
const onShowPopup = () => {
  isVisible.value = true
}
</script>
<style scoped lang="scss"></style>
