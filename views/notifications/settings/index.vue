<template>
  <div class="--container-width">
    <div v-if="loadingSettings">
      <LoadingLogo />
    </div>

    <div v-else>
    
        <div class="header-notification-settings">
          <div class="ripple" @click="goBack()">
            <img style="width: 35px; border-radius: 100%; object-fit: contain; box-shadow: 0px 4px 4px 0px #00000040;"
              src="@/assets/img/button-float/backwhite.png" alt="">
          </div>

          <div style="color: #2F4B75; font-weight: 600;font-size: 1.25rem ; width: 100%; text-align: center; " class="icon_text">Notifications Settings</div>
        </div>
       
   
      <div>
        <div
          style="padding-top: 5px; overflow: auto"
          class="padre-notiifactions"
        >
          <div
            style="
              width: 100%;
              background-color: white !important;
              padding-left: 22px;
              padding-top: 20px;
              padding-bottom: 20px;
              font-size: 19px;
            "
          >
            Text Notifications
          </div>
          <div
            style="
              background-color: rgb(203 203 203) !important;
              padding-top: 6px;
              padding-bottom: 6px;
              opacity: 0.2;
            "
          ></div>
          <div class="cards-content-all">
            Turn on all Notifications:
            <div>
              <div class="checkboxes__row input-margin-top">
                <div class="checkboxes__item">
                  <label class="checkbox style-e">
                    <input
                      type="checkbox"
                      color="green"
                      @change="(value) => activeAll(value)"
                    />
                    <div class="checkbox__checkmark"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="cards-content1">
            <div>
              <p>Receive who liked your challenge?</p>
              <div>Liked Challenge:</div>
            </div>
            <div>
              <div class="checkboxes__row input-margin-top">
                <div class="checkboxes__item">
                  <label class="checkbox style-e">
                    <input
                      type="checkbox"
                      color="green"
                      v-model="status1"
                      @change="(value) => changeNotify(value, 2)"
                    />
                    <div class="checkbox__checkmark"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="cards-content2">
            <div>
              <p>Receive who invited you to a challenge?</p>
              <div>Accepted Challenge:</div>
            </div>
            <div>
              <div class="checkboxes__row input-margin-top">
                <div class="checkboxes__item">
                  <label class="checkbox style-e">
                    <input type="checkbox" color="green" v-model="status2" />
                    <div class="checkbox__checkmark"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="cards-content1">
            <div>
              <p>Received challenge reward?</p>
              <div>Received a Reward:</div>
            </div>
            <div>
              <div class="checkboxes__row input-margin-top">
                <div class="checkboxes__item">
                  <label class="checkbox style-e">
                    <input
                      type="checkbox"
                      color="green"
                      v-model="status3"
                      @change="(value) => changeNotify(value, 8)"
                    />
                    <div class="checkbox__checkmark"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="cards-content2">
            <div>
              <p>Receive notification from a sponsor?</p>
              <div>Received a message from Sponsor:</div>
            </div>
            <div>
              <div class="checkboxes__row input-margin-top">
                <div class="checkboxes__item">
                  <label class="checkbox style-e">
                    <input
                      type="checkbox"
                      color="green"
                      v-model="status4"
                      @change="(value) => changeNotify(value, 10)"
                    />
                    <div class="checkbox__checkmark"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="cards-content1">
            <div>
              <p>Receive invitations from other people?</p>
              <div>Invitation Received:</div>
            </div>
            <div>
              <div class="checkboxes__row input-margin-top">
                <div class="checkboxes__item">
                  <label class="checkbox style-e">
                    <input type="checkbox" color="green" v-model="status5" />
                    <div class="checkbox__checkmark"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="cards-content2">
            <div>
              <p>Receive messages from someone?</p>
              <div>Chat Messages Received:</div>
            </div>
            <div>
              <div class="checkboxes__row input-margin-top">
                <div class="checkboxes__item">
                  <label class="checkbox style-e">
                    <input type="checkbox" color="green" v-model="status6" />
                    <div class="checkbox__checkmark"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="cards-content1">
            <div>
              <p>Receive messages from Shareity?</p>
              <div>Shareity Messages:</div>
            </div>
            <div class="checkboxes__row input-margin-top">
              <div class="checkboxes__item">
                <label class="checkbox style-e">
                  <input
                    type="checkbox"
                    color="green"
                    v-model="status7"
                    @change="(value) => changeNotify(value, 16)"
                  />
                  <div class="checkbox__checkmark"></div>
                </label>
              </div>
            </div>
          </div>
          <div
            style="
              background-color: rgb(203 203 203) !important;
              padding-top: 6px;
              padding-bottom: 6px;
              opacity: 0.2;
            "
          ></div>

          <div
            class="container-challenge-notify"
            style="
              width: 100%;
              background-color: white !important;
              padding-left: 22px;
              padding-top: 20px;
              padding-bottom: 20px;
              font-size: 19px;
            "
          >
           Challenges Notification
          </div>
          <div
            v-if="challengeNotifications.length > 0"
            style="margin-bottom: 30px"
          >
            <p
              style="
                color: #b3b3b3;
                padding-left: 24px;
                margin-top: 12px;
                margin-bottom: 0;
              "
            >
              Receive notifications from:
            </p>
            <!-- <p>Challenges that I have joined</p> -->
            
            <div
              class="cards-my-challenges"
              v-for="(notification, index) in challengeNotifications"
            >
            
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                "
              >
                <div>
                  <img
                    style="max-width: 57px; object-fit: cover"
                    :src="
                      'https://chgsdev.shareity.com/' +
                      notification.challenge.badge
                    "
                  />
                </div>
                <div
                  style="
                    text-overflow: ellipsis;
                    padding-left: 10px;
                    font-size: 17px;
                  "
                >
                  {{ notification.challenge.name }}
                </div>
              </div>
              <div></div>
              <div class="checkboxes__row input-margin-top">
                <div class="checkboxes__item">
                  <label class="checkbox style-e">
                    <input
                      type="checkbox"
                      v-model="notification.notification"
                      color="green"
                      @change="
                        (value) => changeStatus(value, notification.id, index)
                      "
                    />
                    <div class="checkbox__checkmark"></div>
                  </label>
                </div>
                <!--   <v-switch
                  class="input-margin-top"
                  color="green"
                  :input-value="notification.notification"
                  @change="(value) => changeStatus(value, notification.id)"
                /> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const imgLink = require("@/assets/img/png/footer/icoLogo.png");
import { mapGetters, mapState, mapActions } from "vuex";
import LoadingLogo from "../../../components/loader/LoadingLogo.vue";
export default {
  components: {
    LoadingLogo,
  },
  layout(context) {
    return "Modal";
  },

  data() {
    return {
      imgLink,
      challengeNotifications: [],
      textNotifications: [],
      status1: false,
      status2: false,
      status3: false,
      status4: false,
      status5: false,
      status6: false,
      status7: false,
      all: false,
      /* configtype: {
          like: 2,
          friends: 6,
          accepted: null,
          received: 8,
          sponsored: 10,
          invitation: 6,
          shaMessage: 12,

      }, */
      selected: [],
      loadingSettings: false,
      userData: null,
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
    ...mapActions("user", [
      "userDataAction",
      "nicknameAction",
      "notificationConfigAction",
      "notificationConfigStatusAction",
    ]),
    toListenWidth() {
      return window.innerWidth;
    },
    goBack() {
      this.$router.push("/notifications");
      localStorage.setItem("effect-Modal", false);
    },
    activeAll(value) {
      console.log("value", value);
      if (value.target.checked) {
        this.status1 = true;
        this.status2 = true;
        this.status3 = true;
        this.status4 = true;
        this.status5 = true;
        this.status6 = true;
        this.status7 = true;

      } else {
        this.status1 = false;
        this.status2 = false;
        this.status3 = false;
        this.status4 = false;
        this.status5 = false;
        this.status6 = false;
        this.status7 = false;
      }
    },
    // activeAllNotifyChallenge(value){
    //   let status
    //   if (value.target.checked) {
        
    //   status = true
    //   }else{
    //     status = false
    //   }
    // },
    changeNotify(value, mode) {
      /*  console.log('mode', mode); */
      let status;

      if (value.target.checked) {
        this.nicknameAction().then((user) => {
          status = 1;
          console.log("Enviando");
          this.$axios
            .$put("/user-notification-config", {
              userId: user.id,
              configtype: mode,
              status: status,
            })
            .then((resPut) => {
              console.log("Recibido");
              console.log("resPut", resPut);
            });
          this.notificationConfigAction({
            id: user.id,
          }).then((res) => {
            console.log("resuesta coerr", res);
          });
        });
      } else {
        status = 0;
        console.log("cerrado");
      }
    },

    changeStatus(value, idUserChallenge, index) {
      let status;
      if (value.target.checked) {
        status = 1;
        console.log("on", status);
      } else {
        status = 0;
        console.log("off", status);
      }
      this.notificationConfigStatusAction({
        id: idUserChallenge,
        status: status,
      }).then((r) => {
        console.log("Hola", r);
      });
    },
  },
  created() {
    
    this.loadingSettings = true;
    setTimeout(() => {
      this.loadingSettings = false;
    }, 1550);

    /* this.nicknameAction().then((user) =>{
      this.$axios.$get("/user/" + user.id).then((res)=> {
        console.log("ressss", res);
      })
    }) */

    this.nicknameAction().then((session) => {
      if (session) {
        this.userData = session;
        console.log("sadad", session);
        this.notificationConfigAction({
          id: session.id,
        }).then((r) => {
          console.log("r", r.notificationConfig);
          console.log("en donde estara", r.notificationUserChallenge);
          this.textNotifications = r.notificationConfig;
          this.challengeNotifications = r.notificationUserChallenge;
        });
      }
    });
  },
};
</script>

<style scoped>
.cards-content-all {
  background: white !important;
  font-size: 18px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.checkboxes {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.checkboxes__row {
  display: flex;
}
.checkboxes__row:not(:last-child) {
  border-bottom: 1px solid #eee;
}
.checkboxes__item {
  padding: 15px;
  width: 50%;
}

/* STYLE E */

.checkbox.style-e {
  display: inline-block;
  position: relative;
  padding-left: 50px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.checkbox.style-e input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.header-notification-settings{
  display: flex;
    background: white;
    padding: 6px;
    align-items: center;
    box-shadow: 1px 1px 10px 0px #c7c7c7;
    border-radius: 0px 0px 32px 0px;
    position: relative;
    z-index: 0;
}
.checkbox.style-e input:checked ~ .checkbox__checkmark {
  background-color: #4caf50;
}
.checkbox.style-e input:checked ~ .checkbox__checkmark:after {
  left: 24px;
}
.checkbox.style-e:hover input ~ .checkbox__checkmark {
  background-color: #eee;
}
.checkbox.style-e:hover input:checked ~ .checkbox__checkmark {
  background-color: #4caf50;
}
.checkbox.style-e .checkbox__checkmark {
  position: absolute;
  top: -28px;
  left: 0;
  height: 24px;
  width: 47px;
  background-color: #dddbdb;
  transition: background-color 0.25s ease;
  border-radius: 11px;
  box-shadow: 1px 1px 4px 1px #5d5d5d;
}
.checkbox.style-e .checkbox__checkmark:after {
  content: "";
  position: absolute;
  left: -2px;
  top: 0px;
  width: 23px;
  height: 23px;
  display: block;
  background-color: #fff;
  border-radius: 50%;
  transition: left 0.25s ease;
}
.checkbox.style-e .checkbox__body {
  color: #333;
  line-height: 1.4;
  font-size: 16px;
  transition: color 0.25s ease;
}
.cards-my-challenges {
  padding: 25px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 11px;
}
.padre-notiifactions {
  width: 100%;
  height: 100dvh;
}
.padre-notiifactions::-webkit-scrollbar {
  width: 8px;
}
.padre-notiifactions::-webkit-scrollbar-track {
  border-radius: 30px;
}
.padre-notiifactions::-webkit-scrollbar-thumb {
  background: #d2d2d2;
  border-radius: 30px;
  height: 10px;
}
.cards-content1 {
  background-color: aliceblue !important;
  padding: 20px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cards-content-challenge {
  background-color: white !important;
  padding: 0px 25px 0px 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cards-content2 {
  background-color: white !important;
  padding: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cards-content1 p {
  font-size: 13px;
  color: #9d9898;
}
.cards-content2 p {
  font-size: 13px;
  color: #9d9898;
}
.grid-container {
  display: grid;
  grid-template-columns: 20% 65% auto;
  gap: 5px;
  min-height: auto;
  padding: 0px 15px 0px 0px !important;
  align-items: flex-start;
}
.input-margin-top {
  margin-top: 20px !important;
}
.v-input {
  margin-top: 0;
  padding: 0;
}
.padre-notiifactions__container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
  height: 100vh;
  overflow-y: auto;
  padding: 10px;
  padding-top: 70px;
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
}

.T_img {
  width: 36px;
  height: 41px;
}
.--container-width {
  width: 400px;
  padding: 0px !important;
  margin-left: auto;
  margin-right: auto;
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
.box-my-challenge {
  height: 38vh;
  position: relative;
  overflow: hidden;
}

@media (max-width: 640px) {
  .padre-notiifactions__container {
    height: calc(100vh - 180px);
  }
  .--container-width {
    width: 100%;
    padding: 0px !important;
    margin-left: auto;
    margin-right: auto;
  }
  /*   .cards-content1 {
    background-color: aliceblue !important;
    padding: 19px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cards-content2 {
    padding: 19px;
    background-color: white !important;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  } */
}
</style>
