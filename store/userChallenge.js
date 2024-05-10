
export const state = () => ({
    userChallengeInfo: ''
})
export const actions = {
    userChallengeAction({ commit }, idBad, idUsr) {
        return new Promise((resolve, reject) => {
            this.$axios
                .$post("/user-challenge/get", {
                    idUsr: idUsr,
                    idBad: idBad
                })
                .then(response => {
                    resolve(resolve)
                    commit('SET_DATA_USERCHALLENGE', response.challenges[0])
                })
                .catch((err) => console.log("🚧 catch", err));
        })
    },
}

export const mutations = {
    SET_DATA_USERCHALLENGE(state, resp) {
        state.userChallengeInfo = resp;
    },
}

export const getters = {
    getUserChallengeInfo(state) {
        return state.userChallengeInfo
    },

}