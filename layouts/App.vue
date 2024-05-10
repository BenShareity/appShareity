<template>
  <v-app class="app-mobil" :style="`width: ${windowWidthT}px; left: ${windowLeftT}px; `">
    <Splashscreen v-if="controlSplash" @showSplash="showSplash" />
    <div v-else class="bg-degra">
      <Header />
      <Nuxt />
      <full-screen />
      <ButtonsFloat />
      <UseTerms1 />
      <UseTerms2 />
      <UseTerms3 />
      <UseTerms4 />
      <UseTermsVideo />
      <ErrorRefresh />
      <!--   <MenuFooter /> -->
      <!-- <CameraModal /> -->
      <NotificationsModal />
      <ModalAlertMessage />
      <CreateChallengeModal />
      <CreatingModalChallenge />
      <SendLogin />
      <Loading />
      <FullScreenLoginChallenge />
      <Login />
      <LoginTwilio />
      <ModalInfoChallenge />
      <ShareFriends />
      <ModalUserName />
    </div>
    <div class="mensaje">
      <Message />
    </div>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Message from "../components/elements/message/Message.vue";

export default {
  data() {
    return {
      scrollState: "scroll",
      clipped: false,
      controlSplash: true,
      drawer: false,
      fixed: false,
      height: "100vh",
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  methods: {
    ...mapActions("login", ["setLoginFrom"]),
    ...mapActions("phoneSize", ["onRezise"]),
    ...mapActions("login", ["idAction"]),
    ...mapActions("user", ["nicknameAction"]),
    showSplash(option) {
      this.controlSplash = option;
    },
  },
  computed: {
    ...mapState("phoneSize", ["windowLeftT", "windowWidthT"]),
  },
  created() {



    this.nicknameAction().then((res) => {
      if (res.id) {
        if (res.id) {
          if (!localStorage.getItem("effect-Modal")) {
            localStorage.setItem("effect-Modal", false);
          }
          if (!localStorage.getItem("communities")) {
            localStorage.setItem("communities", 1);
          }
          if (!localStorage.getItem("rewards")) {
            localStorage.setItem("rewards", 1);
          }
          if (!localStorage.getItem("notifications")) {
            localStorage.setItem("notifications", 1);
          }
          if (!localStorage.getItem("friends")) {
            localStorage.setItem("friends", 1);
          }
          if (!localStorage.getItem("sway")) {
            localStorage.setItem("sway", 1);
          }
          if (!localStorage.getItem("profile")) {
            localStorage.setItem("profile", 1);
          }
          if (!localStorage.getItem("trending")) {
            localStorage.setItem("trending", 1);
          }
          if (!localStorage.getItem("messages")) {
            localStorage.setItem("messages", 0);
          }
        }
      }
    });
    this.$nuxt.$on("scrollState", (option) => {
      this.scrollState = option;
    });
  },
  mounted() {
    this.onRezise();
    window.addEventListener("resize", () => {
      this.onRezise();
    });

    console.log('APP::: COOKIES: ', this.$cookies)
    console.log('APP::: COOKIES GET ALL: ', this.$cookies.getAll())
    console.log('APP::: NOMBRE DE USUARIO ALMACENADO: ', this.$cookies.get("username"))

    this.idAction(localStorage.getItem("username"));
  },
  components: { Message },
};
</script>

<style>
body {
  font-family: -apple-system, SF UI Text, Helvetica Neue, Helvetica, Arial,
    sans-serif !important;
  /*  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain; */
}

/* html {
  overflow: hidden;
  overscroll-behavior: none;
} */

*::-webkit-scrollbar-track {
  border: 1px solid #f6f6f6;
  background-color: #f6f6f6;
}

*::-webkit-scrollbar {
  width: 10px;
  background-color: #f6f6f6;
}

*::-webkit-scrollbar-thumb {
  border-radius: 50px;
  background-color: #cdcbcc;
}

/* html,
body {
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
}
 */
/* .bg-degra {
  overflow-x: hidden;
  overflow-y: hidden;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0);
  background: linear-gradient(180deg,
      rgba(30, 30, 30, 0.2) 0%,
      rgba(0, 0, 0, 0) 12%,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0) 75%,
      rgba(0, 0, 0, 0.6) 100%);
  z-index: 2;
} */
.card-avatar-png {
  background: white;
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0px 5px 9px -6px rgba(0, 0, 0, 0.54118);
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-avatar-png img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.card-avatar-user-png {
  background: white;
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0px 5px 9px -6px rgba(0, 0, 0, 0.54118);
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-avatar-user-png img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover !important;
}


@media all and (orientation: portrait) {
  .mensaje {
    display: none;
  }
}

@media (min-width: 1024px) {
  .mensaje {
    display: none;
  }

  .bg-degra {
    display: block !important;
  }
}

@media all and (orientation: landscape) {
  .bg-degra {
    display: none;
  }

  .mensaje {
    position: fixed;
    height: 100vh;
    background: white;
    top: 0;
    rotate: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 9999999999;
    width: 100%;
  }
}

@media (max-width: 640px) {
  .v-application--wrap {
    min-height: -webkit-fill-available;
    width: 100%;
  }

  .v-dialog {
    box-shadow: none !important;
  }

  .app-mobil {
    min-height: 100% !important;
    width: 100% !important;
    left: auto !important;
  }
}
</style>
