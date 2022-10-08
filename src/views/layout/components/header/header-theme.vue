<template>
  <m-popover placement="bottom-left">
    <!-- 具名插槽: icon 顯示--->
    <template #reference>
     <m-svg-icon
        :name="svgIconName"
        class="guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
      ></m-svg-icon>
    </template>
    <!-- 匿名插槽: 內容顯示--->
    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in themeArr"
        :key="item.id"
        @click="onItemClick(item)"
      >
         <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-800 dark:text-zinc-300 text-sm">{{
          item.name
        }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM} from '@/constants'
import { useStore } from 'vuex'
import { computed } from 'vue'
const themeArr = [
  {
    id: 0,
    type: THEME_LIGHT,
    icon: 'theme-light',
    name: '極簡白'
  },
  {
    id: 1,
    type: THEME_DARK,
    icon: 'theme-dark',
    name: '極夜黑'
  },
  {
    id: 2,
    type: THEME_SYSTEM,
    icon: 'theme-system',
    name: '跟隨系統'
  }
]

const store = useStore()
console.log('...',store.getters.theme)

const onItemClick = (theme) => {
  store.commit('theme/changeThemeType', theme.type)
}

// 展示對應圖示
const svgIconName = computed(() => {
 console.log('11111111111',store.getters.themeType)
  const findTheme = themeArr.find((theme) => {
    return theme.type === store.getters.themeType
  })
  return findTheme?.icon || themeArr[0].type
})
</script>
