<template>
  <div>
    <teleport to='body'>

      <!-- 蒙版 -->
      <transition v-if="isOpen" name="fade" @click="isOpen = false">
        <div class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"></div>
      </transition>

      <!-- 內容 -->
      <transition v-if="isOpen" name="popup-down-up">
        <div v-bind="$attrs" class="w-screen dark:bg-zinc-800 bg-white z-50 fixed bottom-0">
          <slot></slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>
<script setup>
import { useScrollLock, useVModel } from '@vueuse/core'
import { ref, watch  } from 'vue'

const props = defineProps({
  modelValue: {
    require: true,
    type:Boolean
  }
})

// 當isVisible 發生變化時，會自動觸發 emits 修改 modelValue
const isOpen = useVModel(props)

// 鎖定滾動
const isLocked = useScrollLock(document.body)
watch(isOpen,(val) => {
    isLocked.value = val
  },
  {
    immediate: true
  }
)

</script>

<style scoped lang="scss">
// 遮罩 動畫
.fade-enter-active,
.fade-leave-active{
  transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to{
  opacity: 0;
}

// popup-down-up 動畫
.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}
.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
