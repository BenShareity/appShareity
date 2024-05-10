
export const state = () => ({
    generateQrData: null,
})
export const actions = {
    generateHashQrAction({ commit }, data) {
        // Create random code
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return new Promise((resolve, reject) => {
            this.$axios
                .$post("/reward/generate-qr", {
                    idRewardUser: data.idUser,
                    qr: result
                })
                .then(response => {
                    resolve(response)
                    commit('SET_QR_DATA', response)
                })
                .catch((err) => console.log("🚧 catch", err));
        })
    },
    userRewardAction({ commit }, data) {
        return new Promise((resolve, reject) => {
            this.$axios
                .$get("/reward/list-rewards/" + data.id)
                .then(response => {
                    resolve(response)
                })
                .catch((err) => console.log("🚧 catch", err));
        })
    },
    redeemUserRewardAction({ commit }, data) {
        return new Promise((resolve, reject) => {
            this.$axios
                .$get("/reward/redeem/" + data.id)
                .then(response => {
                    resolve(response)
                })
                .catch((err) => console.log("🚧 catch", err));
        })
    },
}

export const mutations = {
    SET_QR_DATA(state, resp) {
        state.generateQrData = resp.data
    },
}

export const getters = {
}