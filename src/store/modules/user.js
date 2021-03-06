// import { login, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

// const getDefaultState = () => {
//   return {
//     token: getToken(),
//     name: '',
//     avatar: ''
//   }
// }

// const state = getDefaultState()

// const mutations = {
//   RESET_STATE: (state) => {
//     Object.assign(state, getDefaultState())
//   },
//   SET_TOKEN: (state, token) => {
//     state.token = token
//   },
//   SET_NAME: (state, name) => {
//     state.name = name
//   },
//   SET_AVATAR: (state, avatar) => {
//     state.avatar = avatar
//   }
// }

// const actions = {
//   // user login
//   login({ commit }, userInfo) {
//     const { username, password } = userInfo
//     return new Promise((resolve, reject) => {
//       login({ username: username.trim(), password: password }).then(response => {
//         const { data } = response
//         commit('SET_TOKEN', data.token)
//         setToken(data.token)
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // get user info
//   getInfo({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       getInfo(state.token).then(response => {
//         const { data } = response

//         if (!data) {
//           return reject('Verification failed, please Login again.')
//         }

//         const { name, avatar } = data

//         commit('SET_NAME', name)
//         commit('SET_AVATAR', avatar)
//         resolve(data)
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // user logout
//   logout({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       logout(state.token).then(() => {
//         removeToken() // must remove  token  first
//         resetRouter()
//         commit('RESET_STATE')
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // remove token
//   resetToken({ commit }) {
//     return new Promise(resolve => {
//       removeToken() // must remove  token  first
//       commit('RESET_STATE')
//       resolve()
//     })
//   }
// }
import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
// ??????????????????
import { login, getUserInfo, getUserDetailById } from '@/api/user'
// ??????
const state = {
  // ??????token
  token: getToken(),
  userInfo: {}
}
// ????????????
const mutations = {
  setToken(state, token) {
    state.token = token // ??????vuex??????token
    setToken(token) // ??????????????????token
  },
  removeToken(state) {
    state.token = null // ??????vuex??????token
    removeToken() // ??????????????????token
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
// ????????????axios??????
const actions = {
  async login(context, data) {
    // ????????????
    const result = await login(data)
    // axios??????????????????data
    context.commit('setToken', result)
    setTimeStamp()
  },
  async getUserInfo(context) {
    const userInfo = await getUserInfo()
    const imgInfo = await getUserDetailById(userInfo.userId)
    const baseResult = { ...userInfo, ...imgInfo } // ???????????????????????????
    context.commit('setUserInfo', baseResult)
  },
  // ?????????action
  logout(context) {
    // ??????token
    context.commit('removeToken') // ??????????????????vuex?????? ????????????????????????
    // ??????????????????
    context.commit('removeUserInfo') // ??????????????????
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
