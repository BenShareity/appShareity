<template>
  <v-container :class="[loading ? 'no-overflow' : 'container_communities']">
    <div class="header-comunnities">
      <div class="header_icons">
        <!--  <img @click="$router.push({ path: '/' })" style="width: 35px;  object-fit: cover;"
          src="@/assets/img/button-float/back.png" alt=""> -->
        <div class="ripple" @click="$router.push({ path: '/' })">
          <img style="width: 35px; border-radius: 100%; object-fit: contain; box-shadow: 0px 4px 4px 0px #00000040;"
            src="@/assets/img/button-float/backwhite.png" alt="">
        </div>
        <div style="color: #2F4B75; font-weight: 600; font-size: 1.25rem;" v-show="optionCommunities" class="icon_text">
          My Communities</div>
        <div style="color: #2F4B75; font-weight: 600; font-size: 1.25rem;" v-show="optionLightbeats" class="icon_text">
          LightBeats</div>
        <div style="color: #2F4B75; font-weight: 600; font-size: 1.25rem;" v-show="optionFriends" class="icon_text">
          Friends</div>
        <div style="display: flex; align-items: center">
          <img style="width: 30px; height: 30px; object-fit: cover; " :src="MoreBlue" alt="">
        </div>
      </div>
    </div>
    <div v-if="loading">
      <Skeletor />
    </div>
    <div v-else>
      <div v-show="optionCommunities">
        <div v-show="infogetUserData?.userChallenges">
          <div v-if="infogetUserData?.userChallenges?.length !== 0" class="container-communities">
            <div v-for="(item, index) in infogetUserData?.userChallenges" :key="index" class="content-item-grid">
              <div class="img_Conatiner" :style="{ backgroundImage: 'url(' + imageVideo + ')' }">
                <img class="img_children" :src="item.photoUrl !== ''
    ? urlBucket + item.photoUrl
    : urlBucket + item.url
    " />
                <div @click="noShared(item)" class="bg-drop-black"></div>
                <div class="div__">
                  <img class="img_children__two" :src="urlBucket + item.challenge.badge" />
                  <svg class="head-svg button-effect icon__" @click="shared(item)" xmlns="http://www.w3.org/2000/svg"
                    width="40" height="40" viewBox="0 0 8 8">
                    <path d="M5 0v2C1 2 0 4.05 0 7c.52-1.98 2-3 4-3h1v2l3-3.16L5 0z" />
                  </svg>
                </div>
              </div>
              <div :class="[
    showCommunities ? 'padre-welcome-communities' : 'none',
  ]" @click="closeInfo('communities')">
                <div class="welcome-communities">
                  <div class="welcome-communities_text">
                    Welcome to your communities!
                  </div>
                  <div class="welcome-communities_text-2">
                    All of your challenge communities will show up here
                  </div>
                </div>
              </div>
            </div>
          </div>
          <template v-else>
            <div class="notice-container">
              <div class="notice-text">You have not created any impact yet</div>
              <img src="../../assets/img/png/steve-1.png" alt="" class="notice-img" />
            </div>
          </template>
        </div>
      </div>

      <template v-if="optionLightbeats">
        <div class="container-lightbeat">
          <div v-for="item in infogetUserData.userChallenges" v-if="item.challenge.lightbeat">
            <div class="card-lightbeat" @click="openModal(urlBucket + item.challenge.lightbeat.url)">
              <img :src="urlBucket + item.challenge.lightbeat.url" alt="" class="img-lightbeat" />
              <img :src="urlBucket + item.challenge.badge" alt="" class="icon-lightbeat" />
            </div>
          </div>
        </div>
        <div data-app>
          <ModalLightbeat :dialog="showLightbeat" :img="lightbeatSelected" @closeModal="showLightbeat = false" />
        </div>
      </template>



    </div>
    <ButtonsFloat />
  </v-container>

</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Skeletor from "@/components/loader/skeletor.vue";
import FriendshipItem from "@/components/FriendshipItem.vue";
import imageVideo from "../../assets/e.gif";
import NotificationSkeleton from "~/components/loader/NotificationSkeleton.vue";
import ButtonsFloat from "../../components/ButtonsFloat.vue";
import MoreBlue from '../../assets/img/svg/MoreBlue.svg'
import blueBack from '../../assets/img/svg/BlueBack.svg'
export default {
  components: {
    Skeletor,
    FriendshipItem,
    NotificationSkeleton,
    ButtonsFloat
  },
  data() {
    return {
      showLightbeat: false,
      lightbeatSelected: "",
      loading: true,
      infogetUserData: "",
      showCommunities: false,
      welcomeFriends: false,
      optionCommunities: false,
      optionLightbeats: false,
      optionFriends: false,
      friends: [],
      loadingFriends: false,
      imageVideo,
      MoreBlue,
      blueBack,
      items: [
        {
          title: "Pedro",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("user", ["getUserData"]),
    ...mapState("phoneSize", ["windowWidthT"]),
    urlBucket() {
      return process.env.api_assets_url;
    },
  },

  methods: {
    ...mapActions("user", ["nicknameAction"]),
    openModal(img) {
      this.showLightbeat = true;
      this.lightbeatSelected = img;
    },
    noShared(item) {
      this.$router.push({
        path: `/challenges/${item.challenge.id}/communities`,
      });
    },
    shared(item) {
      this.$router.push({
        path: `/challenges/${item.challenge.id}/communities`,
        query: { shared: true, u: this.infogetUserData.id, id: item.id },
      });
    },
    pushMenu(option) {
      // Cambiar menu al clickear la opcion del nav inferior
      if (option === "communities") {
        this.$router.push({ query: { tab: "communities" } });
        (this.optionCommunities = true),
          (this.optionLightbeats = false),
          (this.optionFriends = false);
      }
      if (option === "lightbeats") {
        this.$router.push({ query: { tab: "lightbeats" } });
        (this.optionCommunities = false),
          (this.optionLightbeats = true),
          (this.optionFriends = false);
      }
      if (option === "friends") {
        this.$router.push({ query: { tab: "friends" } });
        this.getFriends();
        (this.optionCommunities = false),
          (this.optionLightbeats = false),
          (this.optionFriends = true);
      }
    },
    closeInfo(options) {
      // no mostrar tutorial de nuevo
      if (options === "communities") {
        const res = localStorage.getItem("communities");
        if (res == 1) {
          this.showCommunities = false;
          localStorage.setItem("communities", 0);
        }
      }
      // if (options === "lightbeat") {
      //   const res = localStorage.getItem("lightbeat");
      //   if (res == 1) {
      //     this.welcomeFriends = false;
      //     localStorage.setItem("lightbeat", 0);
      //   }
      // }
      if (options === "friends") {
        const res = localStorage.getItem("friends");
        if (res == 1) {
          this.welcomeFriends = false;
          localStorage.setItem("friends", 0);
        }
      }
    },
    getFriends() {
      this.loadingFriends = true;
      this.friends = [];
      this.$axios
        .$get(`/user/get-friends/${this.infogetUserData.username}`)
        .then((response) => {
          this.friends = response;
          this.loadingFriends = false;
          this.loading = false;
        })
        .catch((err) => {
          console.log("🚧 catch", err);
        });
    },
  },
  mounted() {
    this.nicknameAction(localStorage.getItem('username'))
      .then((user) => {
        this.infogetUserData = user;
      })
      .then((res) => {
        if (this.$route.query.tab === "friends") {
          this.getFriends();
        } else {
          this.loading = false;
        }
      });
  },
  created() {
    if (process.client) {
      // Mostrar menu al cargar la vista, segun los parametros de ruta
      if (this.$route.query.tab === "communities") {
        this.optionCommunities = true;
        this.showCommunities = true;
      }
      if (this.$route.query.tab === "lightbeats") {
        this.optionLightbeats = true;
      }
      if (this.$route.query.tab === "friends") {
        this.optionFriends = true;
        this.welcomeFriends = true;
        this.loading = false
      }
      // mostrar aviso tutorial solo 1 vez
      const rescommunities = localStorage.getItem("communities");
      if (rescommunities == 1) {
        this.showCommunities = true;
      } else {
        this.showCommunities = false;
      }
      const resFriends = localStorage.getItem("friends");
      if (resFriends == 1) {
        this.welcomeFriends = true;
      } else {
        this.welcomeFriends = false;
      }
    }
  },
};
</script>

<style scoped>
.container-lightbeat {
  display: flex;
  flex-direction: column;
  padding: 65px 20px;
}

.bg-drop-black {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(360deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 56%);
  left: 0;
  top: 0;
  border-radius: 12px;
  box-shadow: 0px 0px 5px 0px #3d3535;
}

.card-lightbeat {
  box-shadow: 0px 0px 6px 2px #9f9f9f;
  margin: 3px 0;
  padding: 0 !important;
  position: relative;
}

.img-lightbeat {
  width: 100%;
}

.icon-lightbeat {
  width: 15%;
  position: absolute;
  bottom: 10px;
  left: 10px;
}

.img_Conatiner {
  position: relative;
  max-width: 360px;
  height: 35vh;
  margin: 0 auto;
  background-color: black;
  background-position: center;
  border-radius: 12px;
}

.img_children {
  width: 100%;
  object-fit: cover;
  height: 100%;
  object-position: center;
  border-radius: 12px;
}

.img_children__two {
  width: 56px;
  height: 56px;
  position: absolute;
  z-index: 9;
  top: 0;
  left: 36%;
  padding: 5px;
  z-index: 3;
  object-fit: contain;
}

.footer-options {
  position: fixed;
  bottom: 0;
  width: 400px;
  z-index: 10;
}

.footer-options__row {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
}

.row-item {
  background-color: #fff;
  color: #6f6f6f;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: din_mediumregular;
  text-transform: capitalize;
  font-size: 18px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.row-item_active {
  background: #33a9f2;
  color: white;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: din_blackregular;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  box-shadow: 0px 5px 5px rgb(0, 0, 0, 0.3) inset;
}

.ripple {
  position: relative;
}

.ripple:active::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: #0b75ab;
  pointer-events: none;
  left: 50%;
  top: 50%;
  animation: ripple 0.3s linear forwards;
}

@keyframes ripple {

  0% {
    width: 0;
    height: 0;
    opacity: 0.2;
  }

  100% {
    width: 120px;
    height: 120px;
    opacity: 0;
  }
}

.icon__ {
  position: absolute;
  z-index: 3;
  bottom: 1%;
  right: 1%;
  padding: 5px;
  cursor: pointer;
}

.div__ {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.button-effect {
  cursor: pointer;
  outline: none;
  color: #fff;
  border: none;
  border-radius: 15px;
  transition: all 0.5s ease-out;
}

.button-effect:active {
  transform: translateY(7px);
  color: rgba(0, 0, 0, 0.295);
}

@media (max-width: 640px) {
  .footer-options {
    width: 100%;
  }
}
</style>

<style>
.head-svg {
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 1.4));
  fill: white !important;
}

.container_communities {
  position: relative;
  width: 400px;
  height: 100dvh;
  overflow-x: auto;
  padding: 0px;
  background: #f3f4f6;
  box-shadow: -2px 2px 20px #0000007a;
}

.no-overflow {
  position: relative;
  width: 400px;
  height: 100vh;
  padding: 0px;
  background-color: #e9f1f8;
  box-shadow: -2px 2px 20px #0000007a;
}

/* .content-item-grid {
  box-shadow: 0px 0px 6px 2px #a3a3a3;
} */

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

.icon_text {
  font-size: 1.25rem;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
  font-family: sans-serif;
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

.none {
  display: none;
}

.notice-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
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

.padre-welcome-communities {
  position: absolute;
  background-color: #0000001f;
  z-index: 99999999 !important;
  bottom: 0%;
  width: 100%;
  height: 100%;
  left: 0;
}

.welcome-communities {
  position: absolute;
  background-image: url(../../assets/img/png/app_view.png) !important;
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

.welcome-communities_text {
  padding-top: 37%;
  padding-left: 15%;
  padding-right: 22%;
  font-family: "Lemon/Milk";
  text-align: center;
  font-size: 1rem;
  font-weight: 900;
}

.welcome-communities_text-2 {
  padding-left: 16%;
  padding-right: 24%;
  padding-top: 2%;
  text-align: center;
  font-family: "Lemon/Milk";
  font-size: 1rem;
  font-weight: 900;
}

.welcome-friends__img {
  position: absolute;
  background-image: url(../../assets/img/png/friends.png) !important;
  background-size: 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 81%;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  /* z-index: 999; */
  margin-left: auto;
  margin-right: auto;
}

.welcome-friends {
  position: absolute;
  background-color: #0000001f;
  z-index: 99999999 !important;
  bottom: 0%;
  left: 0;
  width: 100%;
  height: 100%;
}

.header_icon {
  height: 100%;
  display: flex;
  align-items: center;
  padding-right: 15px;
}

.container-communities {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  margin-top: 15%;
  padding: 10px;
}

.container-friends {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15%;
  padding: 10px;
}

.container_communities::-webkit-scrollbar {
  -webkit-appearance: none;
}

.container_communities::-webkit-scrollbar:vertical {
  width: 10px;
}

.container_communities::-webkit-scrollbar-button:increment,
.container_communities::-webkit-scrollbar-button {
  display: none;
}

.container_communities::-webkit-scrollbar:horizontal {
  height: 10px;
}

.container_communities::-webkit-scrollbar-thumb {
  background-color: #797979;
  border-radius: 20px;
  border: 2px solid #f1f2f3;
}

.container_communities::-webkit-scrollbar-track {
  border-radius: 10px;
}

@media (max-width: 640px) {
  .container-items__iphone {
    height: calc(100vh - 180px);
  }

  .header-comunnities {
    width: 100%;
  }

  .container_communities {
    width: 100%;
  }

  .container-communities {
    width: 100%;
    padding-bottom: 50px;
  }
}
</style>
