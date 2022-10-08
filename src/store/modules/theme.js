import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM} from '@/constants'
export default {
  namespaced: true,
  state:() => {
    return {
      themeType: THEME_LIGHT
    }
  },
  mutations: {
    changeThemeType(state, newTheme){
      state.themeType = newTheme
    }
  },
  actions: {
    // async useCategoryData(context){
    //   const { categorys } = await getCategory();
    //   context.commit('setCategorys', categorys);
    // }
  }
}
