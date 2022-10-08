import { PC_DEVICE_WIDTH } from '@/constants'
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

// 獲取響應式銀幕寬
const { width } = useWindowSize()
/**
 * 判斷當前是否為移動端設備，判斷依據銀幕是否小於1280px
 */
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
  // 更好寫法
  // return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
})

/**
 * 初始化 rem 基准值，最大为 40px
 */
export const useREM = () => {
  // 定義最大 fontSize
  const MAX_FONT_SIZE = 40

  // 監聽 html 文檔被解析完成的事件
  document.addEventListener('DOMContentLoaded', () => {
    // 獲取 html 標籤
    const html = document.querySelector('html')
    //  fontSize 標準，螢幕寬度 / 10。（以 Iphone 為例 Iphone 6 螢幕寬 375，則標準 fontSize 為 37.5）
    let fontSize = window.innerWidth / 10
    // 獲取到的 fontSize 不允许超過最大值
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    // 定義根元素（html）fontSize 的大小 （rem）
    html.style.fontSize = fontSize + 'px'
  })
}
