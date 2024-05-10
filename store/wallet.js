
export const state = () => ({
    walletData: ''
})
export const actions = {
    createWalletAction({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios
                .$post("/user/create-wallet", {
                    id: localStorage.getItem('username')
                })
                .then(response => {
                    resolve(resolve)
                    commit('SET_RESPONSE_CREATEWALLET', response)
                })
                .catch((err) => console.log("🚧 catch", err));
        })
    },
}

export const mutations = {
    SET_RESPONSE_CREATEWALLET(state, resp) {
        state.walletData = resp;
    },
}
