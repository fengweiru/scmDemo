// 用户信息从本地存储中获取
function getUserInfo() {
  let userInfo = localStorage.getItem('auth-info')
  try {
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
    }
  } catch (e) {
    userInfo = userInfo
  }
  return userInfo
}

const user = {
  state: {
    currentUser: getUserInfo() || {} // 当前用户信息
  },
  mutations: {
    // 更新当前的用户信息
    saveCurrentUser(state, payload) {
      state.currentUser = payload
    },
    // 清理当前的用户信息
    cleanCurrentUser() {
      localStorage.setItem('auth-info', '')
      state.currentUser = {}
    }
  }
}

export default user
