
export const state = () => ({
    windowLeftT: 0,
    windowWidthT: 0,
})
export const actions = {
    onRezise({ commit }) {
        let windowWidthT = window.innerWidth > 400 ? 400 : window.innerWidth;
        let windowLeftT = window.innerWidth / 2 - windowWidthT / 2;
        commit('SET_SIZE', {windowLeftT, windowWidthT})
    },
}
export const mutations = {
    SET_SIZE(state, resp) {
      state.windowLeftT = resp.windowLeftT
      state.windowWidthT = resp.windowWidthT
    },
}