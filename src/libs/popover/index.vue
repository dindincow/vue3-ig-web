<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <!-- 彈出層顯示內容:具名 slot-->
    <div ref="referenceTarget">
      <slot name="reference"></slot>
    </div>
    <!-- 汽泡斬式 -->
    <transition name="slide">
      <div 
        ref="contentTarget" 
        v-show="isVisable" 
        :style="contentStyle" 
        class="absolute p-1 z-20 bg-white dark:bg-zinc-900 border rounded-md dark:border-zinc-700">
        <!-- 彈出層顯示內容:匿名 slot -->
        <slot></slot>
      </div>
    </transition>
    </div>
</template>
<script>
// 延遲關閉時間
const DELAY_TIME = 500
// 控制彈出方向
const PROP_TOP_LEFT = 'top-left'
const PROP_TOP_RIGHT = 'top-right'
const PROP_BOTTOM_LEFT = 'bottom-left'
const PROP_BOTTOM_RIGHT = 'bottom-right'
const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]
</script>
<script setup>
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
  placement:{
    type:String,
    default: 'bottom-left',
    validator(val){
      const result = placementEnum.includes(val)
      if(!result){
        throw new Error('你傳進來的值不存在')
      }
      return result
    }
  }
})

const isVisable = ref(false)

// 滑鼠移入移出
let timeout = null

const onMouseenter = () => {
  console.log('isVisable.value===>', isVisable.value)
  isVisable.value = true
  if (timeout) {
    clearTimeout(timeout)
  }
}

const onMouseleave = () => {
  console.log('isVisable.value===>', isVisable.value)
  timeout = setTimeout(() => {
    isVisable.value = false
    timeout = null
  }, DELAY_TIME)
}

// 計算元素尺寸
const referenceTarget = ref(null)
const contentTarget = ref(null)
const useElementSize = (target) => {
  if(!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}

// 氣泡樣式
const contentStyle = ref({
  top: 0,
  left: 0
})

watch(isVisable,(val)=>{
  if(!val) return
  // vue 在數遽改變後，需等一段時間，DOM才會變化
  nextTick(()=>{
    // console.log(useElementSize(contentTarget.value))
    switch(props.placement){
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0
        contentStyle.value.left = -useElementSize(contentTarget.value).width + 'px'
        break
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0
        contentStyle.value.left = useElementSize(referenceTarget.value).width + 'px'
        break
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top = useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left = -useElementSize(contentTarget.value).width + 'px'
        break
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top = useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left = useElementSize(referenceTarget.value).width + 'px'
        break
    }
  })
})
</script>


<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translatet(20px);
  opacity: 0;
}
</style>

