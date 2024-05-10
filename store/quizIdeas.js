export const state = () => ({
  quiz_list: [],
})
export const actions = {
  fetchQuizList({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios.setHeader("Content-Type", "application/json");
      this.$axios.$post('/badge/quiz-list-active', data)
        .then(response => {
          commit('SET_QUIZ_LIST', response);
        });
    });
  },
  quizVoteUser({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      this.$axios.setHeader("Content-Type", "application/json");
      this.$axios.$post('/badge/quiz-vote-user', data)
        .then(response => {
          dispatch('fetchQuizList', data);
        });
    });
  },
  setVote({ commit }, index) {
    return new Promise((resolve, reject) => {
      commit('SET_VOTE', index);
    });
  }
}

export const mutations = {
  SET_QUIZ_LIST(state, quiz) {
    state.quiz_list = quiz;
  },
  SET_VOTE(state, index) {
    state.quiz_list.data.quizOptions.forEach(element => {
      element.selected = false
    });
    state.quiz_list.data.quizOptions[index].selected = true;
  }
}

export const getters = {
  getQuizList(state) {
    return state.quiz_list.data;
  },
  isQuizVote(state) {
    return state.quiz_list.data_vote == 'false' ? false : true 
  }
}