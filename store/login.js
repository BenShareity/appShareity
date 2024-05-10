
export const state = () => ({
  showModalLogin: false,
  login: null,
  phoneNumber: '',
  shownModalSendLogin: false,
  editPhoneNumber: '',
  isOk: {},
})
export const actions = {
  setLoginFrom({ commit }, { number, idDevice }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post("/user/send-message", {
          phoneNumber: number
        })
        .then(response => {
          resolve(response)
          commit('SET_FROM', { data: response.isNew, number: number })
        })
        .catch((err) => console.log("🚧 catch", err));
    })
  },
  setVerifyCode({ commit }, { number, code, name }) {
    console.log('number', number,code,name)
    return new Promise((resolve, reject) => {
      this.$axios
        .$post("/user/verify-code", {
          phoneNumber: number,
          code: code,
          name: name
        })
        .then(response => {
          resolve(response)
          localStorage.setItem('username', response.nickname)
          /*  this.$cookies.set('username', response.nickname, {
             path: '/',
             expires: new Date(new Date().getTime() + 1000 * 3600 * 24 * 30),
           }) */
          commit('TO_ACCESS', response)
        })
        .catch((err) => console.log("🚧 catch", err));
    })
  },
  setPhoneNumber({ commit }, { value }) {
    commit('SET_NUMBER', value)
  },
  openCloseLogin({ commit }, value) {
    commit('OPEN_CLOSE_LOGIN', value)
  },
  openModalSendLogin({ commit }, value) {
    if (!value) {
      commit('CLOSE_SENDLOGIN', value)
    } if (value) {
      commit('OPEN_SENDLOGIN', value)
    }
  },
  idAction({ commit }, value) {
    commit('SET_ID', value)
  }
}

export const mutations = {
  SET_FROM(state, resp) {
    state.login = resp.data;
    state.editPhoneNumber = resp.number
  },
  TO_ACCESS(state, resp) {
    if (resp) {
      state.showModalLogin = false
      state.isOk = resp
      state.user = resp
      state.id = resp.id
    }
  },
  SET_NUMBER(state, resp) {
    state.phoneNumber = resp
  },
  OPEN_CLOSE_LOGIN(state, value) {
    state.showModalLogin = value;
  },
  OPEN_SENDLOGIN(state, value) {
    state.shownModalSendLogin = value
  },
  CLOSE_SENDLOGIN(state, value) {
    state.shownModalSendLogin = value
    state.showModalLogin = true
  },
  SET_ID(state, value) {
    state.id = value
  }
}

export const getters = {
  infoPhoneNumber(state) {
    return state.phoneNumber
  },
  infoLogin(state) {
    return state.login;
  },
}