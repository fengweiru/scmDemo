const getters = {
  isMobile: (state) => state.app.isMobile,
  lang: (state) => state.app.lang,
  theme: (state) => state.app.theme,
  color: (state) => state.app.color,
  multiTab: (state) => state.app.multiTab,
  nickname: (state) => state.user.currentUser.empName,
}

export default getters
