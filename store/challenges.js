
export const state = () => ({
  challenges: [],
  userChallenges: [],
  promotional: [],
  userPromotional: [],
  fullChallengeActive: false,
  challenge: '',
  searchModal: false,
  AllUserChallenge: [],
  indexContentData: [],
  impactsItems: [],
  userChallengesPreloaded: [],
  challengesPreloaded: []
})
export const actions = {
  challengesAction({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post("/challenge/get-challenges", {})
        .then(response => {
          resolve(response)
          commit('SET_CHALLENGES', response.challenges)
        })
        .catch((err) => console.log("🚧 catch", err));
    })
  },
  userChallengesAction({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post("/challenge/get-user-challenges", {})
        .then(response => {
          resolve(response)
          commit('SET_USER_CHALLENGES', response)
        })
        .catch((err) => console.log("🚧 catch", err));
    })
  },
  userPromotionalAction({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post("/challenge/get-promotional-by-challenge", {})
        .then(response => {
          resolve(response)
          commit('SET_USER_PROMOTIONAL', response)
        })
        .catch((err) => console.log("🚧 catch", err));
    })
  },
  fullChallengeAction({ commit }, value) {
    commit('SET_FULLCHALLENGE', value.state)
    commit('SET_CHALLENGE', value.challenge)
  },
  searchModalAction({ commit }, value) {
    commit('SET_SEARCHMODAL', value)
  },
  promotionalAction({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get("/challenge/get-promotional", {})
        .then(response => {
          resolve(response)
          commit('SET_PROMOTIONAL', response)
        })
        .catch((err) => console.log("🚧 catch", err));
    })
  },
  getUserChallenges({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post("/user-challenge/get", {
          items: 10,
          page:data.page,
          idChallenge: data.idChallenge,
          idUser: data.idUser,
          idProfile: data.idProfile
        })
        .then(response => {
          resolve(response)
          let array = []
          response.page.forEach(element => {
            if (element.url.slice(0, 5) !== 'badge' || element.photoUrl.slice(0, 5) !== 'badge') array.push(element)
          });
          commit('SET_USER_CHALLENGES', array)
        })
        .catch((error) => {
          reject(error)
          resolve(error)
          if (error.response && error.response.status === 404) {
            console.clear();
          }
        })
    })
  },

  getImpacts({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post("/user-challenge/get-impacts", {
          page: data.page,
          items: data.items,
          idUser: data.idUser,

        })
        .then(response => {
          resolve(response);
          commit('IMPACTS', response.page);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            console.clear();
          }
        })
    })
  },

  getAllUserChallenges({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post("/user-challenge/get", {
          page: data.page,
          items: data.items
        })
        .then(response => {
          resolve(response);
          commit('ALL_USER_CHALLENGES', response.page);
        })
        .catch((err) => console.log("🚧 catch", err));
    })
  },

  challengesPreloadedAction({ commit }, data) {
    commit('SET_CHALLENGES_PRELOADED', data);
  },

  indexContentAction({ commit }, data) {
    commit('INDEX_CONTENT', data);
  },

  changeIndexContentAction({ commit }, data) {
    commit('CHANGE_INDEX', data);
  },

  userChallengesPreloaded({ commit }, data) {
    commit('PUSH_USERCHALLENGE', data)
  }

}

export const mutations = {
  SET_CHALLENGES_PRELOADED(state, resp) {
    // state.challengesPreloaded = resp
    this._vm.$set(state, 'challengesPreloaded', [...resp])
  },
  PUSH_USERCHALLENGE(state, resp) {
    state.userChallengesPreloaded.push(...resp)
  },
  IMPACTS(state, resp) {
    state.impactsItems = resp
  },
  INDEX_CONTENT(state, resp) {
    state.indexContentData = resp
  },
  CHANGE_INDEX(state, resp) {
    state.indexContentData[resp + 1].status = true
  },
  SET_CHALLENGES(state, resp) {
    state.challenges = resp;
  },
  SET_USER_CHALLENGES(state, resp) {
    state.userChallenges = resp;
  },
  SET_PROMOTIONAL(state, resp) {
    state.promotional = resp
  },
  SET_USER_PROMOTIONAL(state, resp) {
    state.userPromotional = resp
  },
  SET_FULLCHALLENGE(state, resp) {
    state.fullChallengeActive = resp
  },
  SET_CHALLENGE(state, resp) {
    state.challenge = resp
  },
  SET_SEARCHMODAL(state, resp) {
    state.searchModal = resp
  }
}

export const getters = {
  getChallengeById(state) {
    return state.challengeById
  },
  getChallenges(state) {
    return state.challenges
  },
  getChallenge(state) {
    return state.challenge
  },
  getUserChallenges(state) {
    return state.userChallenges
  },
  getPromotional(state) {
    return state.promotional
  },
  getUserPromotional(state) {
    return state.userPromotional
  }
}