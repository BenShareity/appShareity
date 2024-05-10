<template>
  <v-container class="contain-notifications">
    <v-card>
      <div class="header-comunnities">
        <div class="header_icons">
          <div class="ripple" @click="goBack()">
            <img style="width: 35px; border-radius: 100%; object-fit: contain; box-shadow: 0px 4px 4px 0px #00000040;"
              src="@/assets/img/button-float/backwhite.png" alt="">
          </div>

          <div style="color: #2F4B75; font-weight: 600;font-size: 1.25rem; " class="icon_text">Notifications</div>
          <div @click="$router.push('/notifications/settings')" class="container_IMG">
            <img class="settings-icon" :src="imgSetting" />
          </div>
        </div>
      </div>
      <div class="padre-notiifactions">
        <div v-if="activeSkeleton">
          <NotificationSkeleton />
        </div>

        <div style="height: 100%" v-else>
          <div v-if="dataNotifications.length !== 0" class="padre-notiifactions__container" id="style-1">
            <!-- <div>
              <button
                @click="deleteAllsnotifications"
                style="
                  float: right;
                  background: #33a9f2;
                  color: white;
                  padding: 11px;
                  font-size: 17px;
                  border-radius: 20px 0px 20px 0px;
                "
              >
                Delete all
              </button>
            </div> -->
            <div v-for="(item, index) in dataNotifications" :key="index">
              <v-card outlined shaped elevation="4" :class="[
            item.id == indexAnimation ? 'bg-delete' : 'bg-red',
            item.id == indexAnimation ? 'bg-aceliue' : '',
          ]" color="#fff" dark max-width="400">
                <v-card-actions class="shadow__">
                  <v-list-item class="grid-container" @click="
            item.responsable.firstName !== 'Steve' &&
              item.notificationType !== 4
              ? openFullScreen(item)
              : item.notificationType == 4
                ? viewProfile(item)
                : ''
            ">
                    <div class="container-avatar">
                      <div class="avatar-notifications" @click="
            item.responsable.username === ''
              ? ''
              : viewProfile(item)
            ">
                        <img v-if="item.responsable !== null" :src="item.responsable.username === ''
            ? require('~/assets/img/png/no_picture_male_3.png')
            : item.responsable.imagen
              ? urlBucket + item.responsable.imagen
              : require('~/assets/img/png/user.png')
            " />
                      </div>
                      <div class="avatar-notifications__2">
                        <v-icon v-if="item.notificationType === 1" size="16" class="mb-2" style="color: white">
                          mdi-bell-ring</v-icon>
                        <v-icon v-if="item.notificationType === 2" size="16" class="mb-2" style="color: red">
                          mdi-heart</v-icon>
                        <v-icon v-if="item.notificationType === 3" size="15" class="mb-2" style="color: white">
                          mdi-comment-processing</v-icon>
                        <v-icon v-if="item.notificationType === 4" size="15" class="mb-2" style="color: white">
                          mdi-account-plus</v-icon>
                      </div>
                    </div>
                    <v-list-item-content class="edit-item-content">
                      <v-list-item-title>
                        <div @click="openNotifications(index, item)" style="
                            display: flex;
                            gap: 5px;
                            flex-direction: column;
                          ">
                          <div v-if="item.responsable !== null" class="text-title">
                            <span>{{ item.responsable.firstName }}</span>
                          </div>
                          <div v-else class="text-title">
                            <span>Shareity</span>
                          </div>
                          <div>
                            <div :class="[
            indexPanel === index
              ? 'text-message-expand'
              : 'text-message',
          ]">
                              {{ item.description }}
                            </div>
                          </div>
                          <div style="color: rgb(138, 138, 138); font-size: 12px">
                            {{ item.datecreate }}
                          </div>
                        </div>
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-row class="none_flex" align="center" justify="end" style="
                        height: 100%;
                        display: flex;
                        align-content: baseline;
                        padding-top: 10px;
                      ">
                      <div>
                        <v-menu bottom left>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn dark icon v-bind="attrs" v-on="on">
                              <v-icon color="black">mdi-dots-vertical</v-icon>
                            </v-btn>
                          </template>

                          <v-list>
                            <v-list-item>
                              <v-list-item-title>
                                <div @click="deleteNotification(item.id, index)">
                                  Delete
                                </div>
                              </v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </div>
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-card>
            </div>
          </div>
          <div v-else class="notice-container">
            <div class="notice-text">
              <span>You have no new notifications</span>
            </div>
            <img src="~/assets/img/png/steve-1.png" alt="" class="notice-img" />
          </div>
        </div>
        <div data-app>
          <Loading :active="activeLoading" />
        </div>
        <div :class="[showInfo ? 'welcome-notification' : 'none']" @click="closeInfo">
          <div class="welcome-notification__img"></div>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script>
const imgLink = require("@/assets/img/png/footer/icoLogo.png");
const imgSetting = require("@/assets/img/png/tuerca-blue.png");
import { mapGetters, mapState, mapActions } from "vuex";
import NotificationSkeleton from "~/components/loader/NotificationSkeleton.vue";
import imgS from "~/assets/img/png/icon_shareity_channel.png";

export default {
  components: {
    NotificationSkeleton,
  },

  layout(context) {
    return "Modal";
  },
  data() {
    return {
      imgLink,
      imgSetting,
      indexPanel: null,
      viewPanelNotifications: true,
      viewDetails: false,
      dataNotifications: [],
      user: {},
      listenerNotifications: "",
      activeLoading: false,
      activeSkeleton: false,
      indexAnimation: null,
      dtoday: "",
      imgShareity: imgS,
      showInfo: false,
    };
  },

  computed: {
    ...mapState("phoneSize", ["windowWidthT"]),
    ...mapGetters("login", ["$cookies.get('username')"]),
    urlBucket() {
      return process.env.api_assets_url;
    },
  },

  watch: {},
  methods: {
    ...mapActions("user", ["userDataAction", "nicknameAction"]),
    toListenWidth() {
      return window.innerWidth;
    },
    openDetailsNotifications() {
      this.viewPanelNotifications = !this.viewPanelNotifications;
      this.viewDetails = !this.viewDetails;
    },
    backNotifications() {
      this.viewPanelNotifications = !this.viewPanelNotifications;
      this.viewDetails = !this.viewDetails;
    },
    openNotifications(index, item) {
      this.indexPanel = index;
    },
    viewProfile(item) {
      this.$router.push({ path: `/profile/${item.responsable.username}` });
    },
    openFullScreen(item) {
      this.$router.push({ path: `${item.url}` });
      // this.$nuxt.$emit("fullScreenDefinitive", {
      //   status: true,
      //   content: item,
      //   index: 0,
      //   from: "Notifications",
      //   notificationType: item.notificationType,
      // });
    },
    closeInfo() {
      this.showInfo = false;
      localStorage.setItem("notifications", 0);
    },
    goBack() {
      this.effectModal = false;
      this.mostrar = false;
      this.$router.push(`profile/${this.user.username}`)

      setTimeout(() => {
        localStorage.setItem("effect-Modal", false);
      }, 150);
    },
    deleteAllsnotifications() {
      this.nicknameAction().then((user) => {
        console.log("yuswer", user);
    
        this.$axios.$get("/user-notification/" + user.id)
          .then((res) => {
            this.dataNotifications = res
            this.dataNotifications = []
          });
      });
    },
    deleteNotification(id, index) {
      this.indexAnimation = id;
      setTimeout(() => {
        this.dataNotifications.splice(index, 1);
      }, 500);

      this.activeLoading = true;
      this.$axios
        .$delete("/user-notification/" + id)
        .then((res) => {
          this.activeLoading = false;
        })
        .catch((err) => {
          this.activeLoading = false;
          console.log("🚧 catch", err);
        });
    },
  },
  created() {
    /*    let es =  this.$axios.$get("/user-notification/" + user.id).then((res) => console.log(res))
       console.log("es",es); */
    this.activeSkeleton = true;
    this.nicknameAction().then((user) => {
      console.log("yuswer", user);
          this.user = user
      this.$axios
        .$get("/user-notification/" + user.id)
        .then((res) => {
          let respuesta = (this.dataNotifications = res);
          console.log("respuesta", respuesta);

          console.log("respuesta notify", res);
          res.forEach((element) => {
            if (element.isread === 0) {
              this.$axios.$get("/user-notification/read/" + element.id);
              console.log("e;le", element);
            }
          });
          let newToday;
          res.forEach((element) => {
            newToday = new Date(element.datecreate);
            element.datecreate = newToday.toUTCString().slice(4, -4);
          });
          setTimeout(() => {
            this.dataNotifications = res.reverse();
            console.log("res", this.dataNotifications);
            this.activeSkeleton = false;
          }, 1000);

          /*   setTimeout(() => {
                          const res = localStorage.getItem("notifications");
                          if (res == 1) {
                              this.showInfo = true;
                          } else {
                              this.showInfo = false;
                          }
                      }, 1100); */
        })
        .catch((err) => {
          console.log("🚧 catch", err);
          this.activeSkeleton = false;
        });
    });
  },
};
</script>

<style scoped>
.padre-notiifactions {
  width: 100%;
  height: 100vh;
  background-color: aliceblue !important;
}

.contain-notifications {
  width: 400px;
  padding: 0px !important;
}

.header-comunnities {
  display: flex;
  position: fixed;
  justify-content: space-between;
  background-color: #ffffff;
  height: 55px;
  width: 400px;
  border-bottom-right-radius: 30px;
  z-index: 10;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
}

.grid-container {
  display: grid;
  grid-template-columns: 20% 65% auto;
  gap: 5px;
  min-height: auto;
  padding: 0px 15px 0px 0px !important;
  align-items: flex-start;
}

.padre-notiifactions__container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
  height: calc(100vh - 6%);
  overflow-y: auto;
  padding: 15px 10px;
  padding-top: 70px
}

.welcome-notification {
  position: absolute;
  background-color: #0000001f;
  z-index: 99999999 !important;
  bottom: 0%;
  width: 100%;
  height: 100%;
  left: 0;
}

.none {
  display: none;
}

.welcome-notification__img {
  position: absolute;
  background-image: url(~/assets/img/png/notificacionsInfo.png) !important;
  background-size: 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 82%;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  /* z-index: 999; */
  margin-left: auto;
  margin-right: auto;
}

.bg-aceliue {
  background-color: #f0f8ff !important;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    1px 0px 0px -4px rgb(0 0 0 / 14%), 3px 6px 15px 0px rgb(226 241 255) !important;
  border-color: rgb(255, 255, 255) !important;
}

.bg-red {
  opacity: 1;
  transform: translateX(0%);
  transform: translateY(0%);
}

.bg-delete {
  transform: translateX(-100%);
  opacity: 0;
  transition: 0.5s all;
}

.container-avatar {
  width: 60px;
  height: 60px;
  position: relative;
}

.avatar-notifications {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  padding: 5px;
  box-shadow: 0px 0px 4px 2px #20202045;
}

.avatar-notifications img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-notifications__2 {
  border-radius: 50%;
  width: 25px;
  padding: 5px;
  background-color: #13a7de;
  height: 25px;
  position: absolute;
  right: 0;
  bottom: 0;
  box-shadow: 0px 0px 4px 2px #20202045;
}

.avatar-notifications__2 img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.edit-item-content {
  padding: 0px !important;
}

#style-1::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

#style-1::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}

#style-1::-webkit-scrollbar-thumb {
  background-color: #696868;
}

.text-title {
  color: black;
  text-transform: capitalize;
  font-size: 1rem;
  font-weight: 700;
}

.text-message {
  color: #8a8a8a;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: 20px;

  max-height: 20px;
  transition: max-height 0.3s ease-out;
}

.text-message-expand {
  color: #8a8a8a;
  white-space: normal;
  max-height: 500px;
  transition: max-height 0.5s ease-in;
}

.container-rigth {
  display: flex;
}

.container-rigth__number {
  width: 25px;
  height: 25px;
  background-color: #2ec96e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 4px 2px #20202045;
}

.notice-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  animation-name: fadeInUp;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.notice-img {
  position: absolute;
  width: 200px;
  bottom: 0;
}

.notice-text {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 700;
  color: #525252;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 75%;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.container-rigth__number div {
  font-weight: 600;
  font-size: 10px;
}

.container_IMG {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

.settings-icon {
  width: 25px;
  height: 25px;
}

.container-details {
  display: flex;
  gap: 20px;
  padding: 10px;
  align-items: center;
}

.container-details__options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.container-details__options-text {
  text-align: left;
  width: 60%;
  font-weight: 700;
  text-transform: capitalize;
}

.container-message {
  width: 100%;
  height: auto;
  box-shadow: 1px 1px 12px -2px #bbbbbb;
  padding: 20px;
  margin: 20px;
  inline-size: auto;
}

.header_icons {
  width: 100%;
  display: flex;
  height: 100%;
  align-items: center;
  gap: 20px;
  padding: 5px;
  justify-content: space-between;

}

@media (max-width: 640px) {
  .contain-notifications {
    width: 100%;
  }

  .header-comunnities {
    width: 100%;
  }
}
</style>
