<template>
 <div>
   <!-- 內容 -->
   <slot />
   <div ref="loadingTarget" class="h-6 py-4" >
      <!-- 加載更多 -->
      <m-svg-icon  
        v-show="loading" 
        class="w-4 h-4 mx-auto animate-spin"
        name="infinite-load">
      </m-svg-icon>
      <!-- 沒有更多數據 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        已经沒有更多數據!
      </p>
   </div>
 </div>

</template>
<script setup>
import { ref } from 'vue'
import { useVModel, useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  // 是否处于加载状态
  modelValue: {
    type: Boolean,
    required: true
  },
  // 数据是否全部加载完成
  isFinished: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['onLoad', 'update:modelValue'])
const loading = useVModel(props)

// 滚动的元素
const laodingTarget = ref(null)
// 记录当前是否在底部（是否交叉）
const targetIsIntersecting = ref(false)
useIntersectionObserver(
  laodingTarget,
  ([{ isIntersecting }], observerElement) => {
    // 获取当前交叉状态
    targetIsIntersecting.value = isIntersecting
    // 触发 load
    emitLoad()
  }
)


</script>



<style scoped>

</style>
