
export const state = () => ({
    contentView: 2,
})
export const actions = {
    changeContentView({ commit }, view) {
        commit('SET_VIEW', view)
        if(view === 3){
           
        }
    }

}

export const mutations = {
    SET_VIEW(state, resp) {
        state.contentView = resp
    }

}

export const getters = {
    getContentView(state) {
        return state.contentView
    }
}