import { PC_DEVICE_WIDTH } from '@/constants';
import { computed } from 'vue';
import { useWindowSize } from '@vueuse/core'

// 獲取響應式銀幕寬
const { width } = useWindowSize()
/**
 * 判斷當前是否為移動端設備，判斷依據銀幕是否小於1280px
 */
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH;
  // 更好寫法
  // return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
})

