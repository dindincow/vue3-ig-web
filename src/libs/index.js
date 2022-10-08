
// import { defineAsyncComponent } from 'vue'


// export default {
//   install(app) {
//     // 获取当前路径任意文件夹下的 index.vue 文件
//     const components = import.meta.glob('./*/index.vue')
//     // 遍历获取到的组件模块
//     for (const [key, value] of Object.entries(components)) {
//       // 拼接组件注册的 name
//       const componentName = 'm-' + key.replace('./', '').split('/')[0]
//       // 通过 defineAsyncComponent 异步导入指定路径下的组件
//       app.component(componentName, defineAsyncComponent(value))
//     }
//   }
// }



import { defineAsyncComponent } from 'vue'
export default {
  install(app) {
    // 1. 獲取當前文件夾下所有文件(獲取當前文件匣下的index.vue)
    const components = import.meta.glob('./*/index.vue')
    //console.log('components',components)

    // 2. 遍利獲取到的組件模塊
    for(const obj of Object.entries(components)){
      //console.log('obj',obj)
      const [key, value] = obj
      const componentName = 'm-' + key.replace('./', '').split('/')[0]

      // 3. 利用app.component 進行注冊 
      app.component(componentName, defineAsyncComponent(value))
    } 
  }
}

// // 一個一個手動加載(舊方法)
// import svgIcon from './svg-icon/index.vue'
// import popup from './popup/index.vue'

// export default {
//   install(app) {
//     app.component('m-svg-icon', svgIcon)
//     app.component('m-popup', popup)
//   }
// }
