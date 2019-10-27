import { logout, getInfo } from '@/api/user'
import { login } from '@/api/reallogin'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  role: '',
  username: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    // console.log('set_token')
    state.token = token
  },
  SET_NAME: (state, name) => {
    // console.log('set_name')
    state.name = name
  },
  SET_USERNAME: (state, username) => {
    // console.log('set_username')
    state.username = username
  },
  SET_AVATAR: (state, avatar) => {
    // console.log('set_avatar')
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
    // console.log('set_role')
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    console.log(userInfo)
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        console.log('login', response)
        const { data } = response
        data.token = 'admin-token'
        commit('SET_TOKEN', data.token)
        commit('SET_ROLE', data.data.authority)
        commit('SET_USERNAME', data.data.name)
        console.log('setusername', data.data.name)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        console.log('getInfo', response)
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLE', '')
        commit('SET_USERNAME', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

