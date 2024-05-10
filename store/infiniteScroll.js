
export const state = () => ({
    pageInfiniteScroll: 1,
    itemsInfiniteScroll: [],
    userChallengesPages: 0,
    userChallenges: [],
    type: '',
})
export const actions = {
    async getNetxPage({ commit, state }, data) {
        switch (data.from) {
            case 'communities':
                console.log('holacommunities',)
                return await this.$axios
                    .$post("/user-challenge/get", {
                        items: 10,
                        idChallenge: data.idChallenge,
                        idUser: data.idUser,
                        idProfile: data.idProfile
                    })
                    .then(response => {
                        if (data.page > state.userChallengesPages) {
                            commit('SET_USER_CHALLENGES_PAGE', data.page)
                            let array = []
                            response.page.forEach(element => {
                                if (element.url.slice(0, 5) !== 'badge' || element.photoUrl.slice(0, 5) !== 'badge')
                                    array.push(element)
                            });


                            commit('SET_USER_CHALLENGES', array)


                        }
                        return state.userChallenges
                    })
            case 'Trending':
                return await this.$axios
                    .$post("/user-challenge/trending", {
                        items: data.items,
                        page: data.page,
                        idChallenge: data.idChallenge,
                        idUser: data.idUser,
                        idProfile: data.idProfile
                    })
                    .then(response => {
                        if (data.page > state.userChallengesPages) {
                            commit('SET_USER_CHALLENGES_PAGE', data.page)
                            let array = []
                            response.page.forEach(element => {
                                if (element.url.slice(0, 5) !== 'badge/' || element.photoUrl.slice(0, 5) !== 'badge/')
                                    array.push(element)
                            });
                            /*  let digit = (array.length / 2)
 
                             for (let index = 0; index < digit; index++) {
                                 array.splice(index, 1)
                             } */
                            commit('SET_USER_CHALLENGES', array)
                        }
                        return state.userChallenges
                    })
            default:
                break;
        }


    },

    setUserChallenges({ commit }, data) {
        commit('SET_USER_CHALLENGES', data.array)
        commit('SET_USER_CHALLENGES_PAGE', data.page)
    },

    infiniteScrollAction({ commit }, data) {
        return new Promise((resolve, reject) => {
            this.$axios
                .$post("/user-challenge/get", {
                    page: data.page,
                    items: data.items,
                })
                .then(response => {
                    let array = []
                    response.page.forEach(element => {
                        if (element.url.slice(0, 5) !== 'badge' || element.photoUrl.slice(0, 5) !== 'badge') array.push(element)

                    });
                    commit('SET_TEN_ITEMS', array)
                    resolve(array)
                })
        })
    },
    changePageAction({ commit }, page) {
        commit('SET_PAGE', page)
    }
}

export const mutations = {
    SET_TEN_ITEMS(state, resp) {
        state.itemsInfiniteScroll = resp
    },
    SET_PAGE(state, resp) {
        state.pageInfiniteScroll = resp
    },
    SET_USER_CHALLENGES(state, resp) {
        state.userChallenges = [...state.userChallenges, ...resp]
    },

    SET_USER_CHALLENGES_PAGE(state, resp) {
        state.userChallengesPages = resp
    }
}

export const getters = {

}