export const state = () => ({
  userData: "",
  comments: 0,
});
export const actions = {
  

  notificationConfigAction({ commit }, data) {
    console.log("que trearas", data);
    return new Promise((resolve, reject) => {
      this.$axios
        .$get("/user-notification-config/" + data.id)
        .then((response) => {
          resolve(response);
         console.log("Aquiiiiiiii", response);
         console.log("Aquii´2", response.notificationConfig);
        })
        .catch((err) => console.log("🚧 catch", err));
    });
  },
  notificationConfigStatusAction({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(
          "/user-notification-config/update/user-challenge/" +
            data.id +
            "/" +
            data.status
        )
        .then((response) => {
          resolve(response);
          console.log("aquii", response);
        })
        .catch((err) => console.log("🚧 catch", err));
    });
  },
  swayScoreAction({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get("/user/sway-stats/" + data.id)
        .then((response) => {
          console.log('response', response)
          resolve(response);
    
        })
        .catch((err) => console.log("🚧 catch", err));
    });
  },
  areFriendsAction({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post("/user/are-friends", {
          userId: data.user,
          userFriendshipId: data.otherUser,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => console.log("🚧 catch", err));
    });
  },
  userDataAction({ commit }, id) {
    console.log('aqui')
    return new Promise((resolve, reject) => {
      this.$axios
        .$get("/user/get-by-id/" + id)
        .then((response) => {
          resolve(resolve);
          commit("SET_USER_DATA", response);
          console.log("veremos que onda",response)
          if (!response && localStorage.removeItem("id")) {
            localStorage.removeItem("id");
            localStorage.removeItem("pointsTotal");
            window.location.reload();
          }
        })
        .catch((err) => console.log("🚧 catch", err));
    });
  },
   nicknameAction({ commit }, nickname) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(
          `/user/get-by-nickname/${
            nickname ? nickname : localStorage?.getItem('username')
          }`
        )
        .then((response) => {
          resolve(response);
          commit("SET_USER_DATA", response);
          return response;
        })
        .catch((err) => console.log("🚧 catch", err));
    });
  },
  usernameAction({ commit }, username) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`/user/get-by-username/${username}`)
        .then((response) => {
          
          resolve(response);
          return response;
        })
        .catch((err) => console.log("🚧 catch", err));
    });
  },
  messagesCountAction({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`/user/messages-count/${id}`)
        .then((response) => {
          resolve(response);
          return response;
        })
        .catch((err) => console.log("🚧 catch", err));
    });
  },
  deleteAccountAction({ commit }, id) {
    this.$axios
      .$delete("/user/" + id)
      .then((response) => {
        localStorage.removeItem('username');
        window.location.reload();
      })
      .catch((err) => console.log("🚧 catch", err));
  },
  sumaComments({ commit }, number) {
    console.log("number", number);
    commit("SET_COMENTS", number);
  },
};

export const mutations = {
  SET_USER_DATA(state, resp) {
    state.userData = resp;
  },
  SET_COMENTS(state, resp) {
    state.comments = resp;
  },
};

export const getters = {
  getUserData(state) {
    return state.userData;
  },
  getAccountComents(state) {
    return state.comments;
  },
};
