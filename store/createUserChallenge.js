export const state = () => ({
  showModalLogin: false,
  login: null,
  phoneNumber: '',
  shownModalSendLogin: false,
  editPhoneNumber: '',
  isOk: {},
  progressBar: null
})
export const actions = {

  createUserChallengeAction({ commit }, getdata) {
    return new Promise((resolve, reject) => {
      let data = new FormData();
      console.log('getdata', getdata)
      data.append("file", getdata.file);
      data.append("idChallenge", getdata.idchallenge);
      data.append("idUser", getdata.idUser);
      data.append("idShare", getdata.idShare);
      console.log('Data Create', data)
      let config = {
        Headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          let bar = Number(0);
          bar = ((progressEvent.loaded * 100) / progressEvent.total) * 0.75
          console.log('bar', bar)
          commit('SET_BAR', bar.toFixed())
        }
      }
      this.$axios.$post('/user-challenge/create', data, config)
        .then(
          response => {
            resolve(response)
          })
        .catch(
          response => {
            resolve(response)
          }
        )
    })
  }
}

export const mutations = {
  SET_BAR(state, resp) {
    console.log('Subida ==> ', `${resp}%`)
    state.progressBar = resp
  },
}

export const getters = {
}




