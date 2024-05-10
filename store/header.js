export const state = () => ({
  headerType: 1,
});
export const actions = {
  changeHeaderType({ commit }, view) {
    commit("SET_TYPE", view);
  },
};

export const mutations = {
  SET_TYPE(state, resp) {
    state.headerType = resp;
  },
};

export const getters = {
  getHeaderType(state) {
    return state.headerType;
  },
};
