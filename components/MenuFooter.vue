<template>
  <div style="position: fixed; bottom: 0"
    :style="` width: ${windowWidthT}px; padding: 0 0;  z-index: 100 !important; height:75px`">
    <v-item-group class="jax_F" style="width: 100%; position: relative; height: 100%">
      <v-row v-if="getContentView != 3" no-gutters align="center">
        <v-col cols="2.4" v-for="(item, index) in items" :key="index">
          <v-item v-slot="{ active, toggle }">
            <v-card class="d-flex align-center justify-center" light height="40px" @click="openModalFooter(item.id)"
              style="
                background: rgba(0, 0, 0, 0) !important;
                color: rgba(0, 0, 0, 0) !important;
              " flat>
              <v-btn  v-if="item.id == 3" fab dark color="white" outlined width="65px" height="65px"
                class="border_Edit-Button">
                <div style="width: 65px !important;">
                  <img class="button-effect" :src="item.icon" alt="" />
                </div>
              </v-btn>
              <div v-else :style="`width: ${item.iconSize};`">
                <div class="badget" v-show="userData">
                  <span v-if="index === 3 && lengthNotification > 0" class="count-notification">
                    {{ lengthNotification }}
                  </span>
                  <span v-if="item.name == 'My Groups' && countMessages > 0" class="count-notification">{{ countMessages
                  }}</span>
                  <img class="button-effect" :src="item.icon" alt="" />
                </div>
              </div>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import collage from "../assets/img/collage.png";
import rewar from "../assets/img/rewar.png";
import search from "../assets/img/lupa2.png";
import notificacion from "../assets/img/NotificaciónIcons.png";
import people from "../assets/img/People.png";

export default {
  data: (vm) => ({
    items: [
      {
        id: 1,
        name: "Communities",
        to: "item1",
        click: true,
        icon: collage,
        iconSize: "35px",
      },
      {
        id: 2,
        name: "Rewards",
        to: "/base",
        icon: rewar,
        iconSize: "35px",
      },
      {
        id: 3,
        name: "Create Challenge",
        to: "/base",
        icon: search,
        iconSize: "40px",
      },
      {
        id: 4,
        name: "Notifications",
        to: "/base",
        icon: notificacion,
        iconSize: "35px",
      },
      {
        id: 5,
        name: "My Groups",
        to: "/base",
        icon: people,
        iconSize: "35px",
      },
    ],
    user: {},
    lengthNotification: 0,
    render: 1,
    countMessages: 0,
  }),

  components: {},
  computed: {
    ...mapState("phoneSize", ["windowLeftT", "windowWidthT"]),
    ...mapMutations("phoneSize", ["onRezise"]),
    ...mapGetters("login", ["$cookies.get('username')"]),
    ...mapGetters("content", ["getContentView"]),
    ...mapState("user", ["userData"]),
  },

  watch: {},
  methods: {
    ...mapActions("login", ["openModalSendLogin"]),
    ...mapActions("user", ["nicknameAction", "messagesCountAction"]),
    ...mapActions("content", ["changeContentView"]),
    openModalFooter(id) {
      if (id === 3) {
        this.$router.push({ path: "/search" });
      }
      if (localStorage.getItem('username')) {
        if (id === 1) {
          this.$router.push({
            path: "/mycommunities",
            query: { tab: "communities" },
          });
        }
        if (id === 2) {
          this.$router.push({ path: "/rewards" });
        }
        if (id === 4) {
          this.$router.push({ path: "/notifications" });
        }
        if (id === 5) {
          this.$router.push({
            path: "/mycommunities",
            query: { tab: "friends" },
          });
        }
      }
    },
    actionMenu(go) {
      switch (go) {
        case "item1":
          break;
      }
    },
    updateCountMessages() {
      // Contador de mensajes por leer
      this.messagesCountAction(this.user.id).then((res) => {
        localStorage.setItem("messages", res);
        this.countMessages = res > 99 ? "+99" : res;
      });
    },
  },
  mounted() {
    this.nicknameAction().then((user) => {
      if (user) {
        this.user = user;

        this.$axios
          .$get("/user-notification/" + user.id)
          .then((res) => {
            let array = [];
            res.forEach((element) => {
              if (element.isread === 0) array.push(element);
            });
            this.lengthNotification = array.length;
          })
          .catch((err) => {
            console.log("🚧 catch", err);
          });

        this.$socket.on("newMessageResived", () => {
          if (this.$route.path == `/`) {
            this.updateCountMessages();
          }
        });

        this.updateCountMessages();
      }
    });
  },
  created() {
    this.nicknameAction().then((user) => {
      if (user) {
        this.$nuxt.$on("renderNotification", (option) => {
          this.$axios
            .$get("/user-notification/" + user.id)
            .then((res) => {
              let array = [];
              res.forEach((element) => {
                if (element.isread === 0) array.push(element);
              });
              this.lengthNotification = array.length;
            })
            .catch((err) => {
              console.log("🚧 catch", err);
            });
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.button-effect {
  cursor: pointer;
  outline: none;
  color: #fff;
  border: none;
  transition: all 0.5s ease-out;
  width: 100%;
}

.button-effect:active {
  transform: translateY(10px);
  color: rgba(0, 0, 0, 0.295);
}

.icon {
  width: 26px !important;
}

.active::after {
  width: 48px;
  height: 48px;
  background-color: white;
}

.border_Edit-Button {
  border: none !important;
  position: relative;
}

.badget {
  position: relative;
}

.jax_F {
  // background: rgb(0,0,0);
  // background: linear-gradient(180deg, rgba(0, 0, 0, 0.055) 0%, rgb(0, 0, 0) 90%);
  padding-top: 15px;
}

.theme--light.v-card {
  background: none;
}

.count-notification {
  background-color: red;
  color: white;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  min-width: 20px;
  font-size: 10px;
  position: absolute;
  top: -10px;
  right: -10px;
}

@media (max-width: 640px) {
  .button-effect {
  width: 80%;
}
}
</style>
