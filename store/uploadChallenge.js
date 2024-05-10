export const state = () => ({
    showModalLogin: false,
    login: null,
    phoneNumber: '',
    shownModalSendLogin: false,
    editPhoneNumber: '',
    isOk: {}
  })
  export const actions = {
    createChallengeAction({ commit }, getdata) {
      let data = new FormData();
      data.append("mediaFile", getdata.file);
      data.append("name", getdata.name);
      data.append("desc", getdata.desc);
      data.append("idUsr", localStorage.getItem('username'));
      data.append("ImgBgCamp", getdata.ImgBgCamp);
      data.append("ImgCamp", getdata.ImgCamp);
  
      let config = {
        header : {
          'Content-Type' : 'multipart/form-data'
        }
      }
  
      this.$axios.$post('/challenge/create', data, config).then(
        response => {
        }
      )
    },
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
        state.id = resp.id || localStorage.getItem('username')
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
  }
  
  export const getters = {
    infoPhoneNumber(state) {
      return state.phoneNumber
    },
    infoLogin(state) {
      return state.login;
    },
    getId(state) {
      return state.id
    }
  }