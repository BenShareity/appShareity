

<template>
  <LoadingLogo v-if="activeLoading" />
  <v-container v-else class="container__communities">
    <div v-if="view === 1" class="bg-black-new">
      <div></div>
    </div>
    <div :class="{ 'is-hidden': !showHeader }" class="header_options">
      <div class="options_subHeader">
        <div class="ripple" @click="backRoute">
          <img style="width: 35px; border-radius: 100%; object-fit: contain; box-shadow: 0px 4px 4px 0px #00000040;"
            src="@/assets/img/button-float/backwhite.png" alt="">
        </div>
        <div class="subHeader_tex">{{ dataChallenge?.name }}</div>
        <div></div>
      </div>
      <div class="options_img">
        <div class="padre-bg-img" style="justify-content: flex-end;">
          <div v-if="dataChallenge?.sponsors?.length > 0"
            style="height: 70px;width: 40%;display: flex;justify-content: center;align-items: center;">
            <div class="img-Back"
              :style="{ backgroundImage: `url(${urlBucket + dataChallenge?.sponsors[0]?.sponsor.logo})` }"></div>
          </div>
        </div>

        <div @click="infoCommnities(dataChallenge)" class="padre-bg-img">
          <img class="options_img_img" :src="urlBucket + dataChallenge?.badge" alt="" />
        </div>

        <div v-if="dataChallenge?.organization" class="padre-bg-img" style="justify-content: flex-start;">
          <div class="img-Back" style="    width: 40%;" :style="{
    backgroundImage: `url(${urlBucket + dataChallenge?.organization?.logo
      })`,
  }"></div>
        </div>
      </div>
    </div>
    <div v-show="view === 1" class="containerOne">
      <div v-if="dataCommunities.length > 0" class="container-communities2 scroll-paddng">
        <virtual-list :page-mode="true" @tobottom="onScroll" make :bottomThreshold="1000" :keeps="4" list scrollable
          :data-key="'id'" :data-sources="dataCommunities" :data-component="itemComponent" :estimate-size="390"
          :item-class="'list-item-page'" :extra-props="{
    userData: session,
    array: dataCommunities,
    page: page,
  }" />
        <div v-if="loading" class="loading-on">
          <v-progress-circular size="40" indeterminate color="black"></v-progress-circular>
        </div>
        <div v-if="stopScroll">
          <p class="loading-off">there are no more challenges to show</p>
        </div>
        <Comments data-app />
      </div>
      <div class="no-comunnities" v-else>
        <p>there is no community</p>
      </div>
    </div>

    <div v-show="view === 2" class="containerTwo">
      <div v-if="communityMembers.length > 1" class="container-members">
        <template v-for="(member, i) in communityMembers">
          <Members :item="member" :session="session" v-if="member.id !== session.id && member.status !== 1" :key="i" />
        </template>
      </div>
      <div v-else class="notice-container">
        <div class="notice-text">
          There are still no members, you are the first!
        </div>
        <img src="../../../assets/img/png/steve-1.png" alt="" class="notice-img" />
      </div>
    </div>
    <div v-show="view === 3" class="containerTwo">
      <div v-if="friendsCount > 0" class="container-members">
        <template v-for="(friend, i) in communityMembers">
          <Members :item="friend" :session="session" v-if="friend.status == 1" :key="i" />
        </template>
      </div>
      <div v-else class="notice-container">
        <div class="notice-text">
          Make friends by connecting with people in your communities
        </div>
        <img src="../../../assets/img/png/steve-1.png" alt="" class="notice-img" />
      </div>
    </div>
    <div class="button__groups">
      <div :class="[view === 1 ? ' activeSeccion' : ' deleteRadius']" @click="stepsView(1)"
        style="display: flex; flex-direction: column;  align-items: center;">
        <img style="width: 35px;" v-if="view === 1" src="@/assets/img/button-float/communitie-active.png" alt="">
        <img style="width: 35px;" v-else src="@/assets/img/button-float/communitie.png" alt="">
        <p class="button__groups-span">Group Feed</p>
      </div>
      <div :class="[view === 2 ? ' activeSeccion' : ' deleteRadius']" @click="stepsView(2)"
        style="display: flex; flex-direction: column;   align-items: center; margin-top: 10px;">
        <img style="width: 35px;" v-if="view === 2" src="@/assets/img/button-float/member-active.png" alt="">
        <img style="width: 35px;" v-else src="@/assets/img/button-float/member.png" alt="">
        <p class=" button__groups-span">Members</p>
      </div>
      <div :class="[view === 3 ? ' activeSeccion' : ' deleteRadius']" @click="stepsView(3)"
        style="display: flex; flex-direction: column;   align-items: center; margin-top: 10px;">
        <img style="width: 35px;" v-if="view === 3" src="@/assets/img/button-float/chat-active.png" alt="">
        <img style="width: 35px;" v-else src="@/assets/img/button-float/chat.png" alt="">
        <p class=" button__groups-span">Friends</p>
      </div>
    </div>
    <fullScreen />
    <div data-app>
      <ModalAlertMessage />
    </div>
    <ModalInfoChallenge :dialog="showInfo" :infoChallenge="dataChallenge" :membersCount="communityMembers"
      @closeModalI="closeModalInfo" />
    <SharedCommunities :activeShared="activeShared" @clickedShared="closeShared" />
    <div data-app>
      <div v-if="!activeShared">
        <ShareFriends />
      </div>
    </div>
  </v-container>
</template>
<script>
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { mapActions, mapState } from "vuex";
import noUser from "@/assets/img/png/user.png";
import SkeletorCommunities from "@/components/loader/skeletorCommunities.vue";
import LoadingLogo from "@/components/loader/LoadingLogo.vue";
import fullScreen from "@/components/fullScreen";
import ModalInfoChallenge from "@/components/ModalInfoChallenge.vue";
import SharedCommunities from "../../../components/modals/SharedCommunities.vue";
import CardCommunities from "../../../components/cards/CardCommunities.vue";
import VirtualList from "vue-virtual-scroll-list";
export default {
  computed: {
    ...mapState("infiniteScroll", ["userChallenges", "userChallengesPages"]),
    urlBucket() {
      return process.env.api_assets_url;
    },
    items() {
      let end = this.itemsPerPage;
      end = this.itemsPerPage * this.page;

      return this.dataCommunities.slice(0, end);
    },
  },
  components: {
    SkeletorCommunities,
    fullScreen,
    ModalInfoChallenge,
    SharedCommunities,
    LoadingLogo,
    "virtual-list": VirtualList,
  },
  data() {
    return {
      dataCommunities: [],
      communityMembers: [],
      friendsCount: 0,
      activeLoading: false,
      dataChallenge: {},
      noUser,
      view: 1,
      activeShared: false,
      oneChallengeInfo: null,
      showHeader: true,
      lastScrollPosition: 0,
      scrollOffset: 100,
      mermber: 0,
      showInfo: false,
      session: {},
      isVisible: true,
      friendLength: 0,
      loading: false,
      page: 1,
      itemsPerPage: 10,
      readyModal: false,
      limitedChallenge: false,
      itemComponent: CardCommunities,
      stopScroll: false,
    };
  },

  methods: {
    ...mapActions("challenges", ["getUserChallenges"]),
    ...mapActions("user", ["nicknameAction", "areFriendsAction"]),
    ...mapActions("infiniteScroll", ["getNetxPage"]),
    stepsView(id) {
      if (id === 1) {
        this.view = 1;
        if (this.$route.query.shared) {
          this.activeShared = false;
        }
        /* document.documentElement.style.overflow = "hidden"; */
      }
      if (id === 2) {
        this.view = 2;
        this.activeShared = false;
        document.documentElement.style.overflow = "initial";
      }
      if (id === 3) {
        this.view = 3;
        this.activeShared = false;
        document.documentElement.style.overflow = "initial";
      }
    },
    closeModalInfo() {
      this.showInfo = false;
    },
    closeShared(value) {
      this.activeShared = value;
    },
    infoCommnities(info) {
      this.showInfo = true;
    },
    loadMoreComunnities(e) {
      console.log("ok");
      let { scrollTop, clientHeight, scrollHeight } = e.target;
      if (!this.loading && scrollTop + clientHeight >= (scrollHeight * 4) / 5) {
        console.log("hola");
        this.loading = true;
        setTimeout(() => {
          this.page++;
          this.loading = false;
        }, 1000);
      }
    },
    onScroll() {
      if (!this.loading) {
        console.log("this.page", this.page);
        if (!this.stopScroll) {
          this.page += 1;
          this.loading = true;
          this.getUserChallenges({
            page: this.page,
            idChallenge: this.$route.params.idChallenge,
          })
            .then((res) => {
              console.log("res", res);
              setTimeout(() => {
                this.dataCommunities = [...this.dataCommunities, ...res.page];
                this.loading = false;
              }, 1100);
            })
            .catch((error) => {
              console.log("error", error?.response.data.message);
              if (
                error?.response?.data.message ==
                "BAD_REQUEST: Page number is offset"
              ) {
                this.stopScroll = true;
                this.loading = false;
                this.limitedChallenge = true;
              }
            });
        } else {
          this.loading = false;
        }
      }
    },
    loadMore(e) {
      let { scrollTop, clientHeight, scrollHeight } = e.target;
      if (!this.loading && scrollTop + clientHeight >= (scrollHeight * 4) / 5) {
      }
    },
    getMembers() {
      this.$axios
        .$get(
          `/user/get-friends/${this.session.id}/${this.$route.params.idChallenge}`
        )
        .then((response) => {
          console.log('response', response)
          this.communityMembers = response;
          this.communityMembers.map((member) => {
            if (member.status == 1) {
              this.friendsCount++;
            }
          });
        })
        .catch((err) => {
          console.log("🚧 catch", err);
        });
    },
    backRoute() {
      this.$router.push({
        path: "/mycommunities",
        query: { tab: "communities" },
      });
      /* document.documentElement.style.overflow = "initial"; */
    },
    handleScroll() {
      const scrollY = document.documentElement.scrollTop;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      if (window.pageYOffset < 0) {
        return;
      }
      if (
        Math.abs(window.pageYOffset - this.lastScrollPosition) <
        this.scrollOffset
      ) {
        return;
      }
      this.showHeader = window.pageYOffset < this.lastScrollPosition;
      this.lastScrollPosition = window.pageYOffset;
    },
  },

  created() {
    // let resp = $axios.$get(`/community/community-message/${id}`).then((resId) => {
    //   console.log(resId);
    // })
    if (process.client) {
      document.documentElement.style.touchAction = "auto";
      document.documentElement.style.overflowX = "hidden";
    }


    this.nicknameAction().then((user) => {
      this.session = user;
      this.getMembers();
    });
    this.activeLoading = true;
    this.getUserChallenges({
      page: 1,
      idChallenge: this.$route.params.idChallenge,
    })
      .then((res) => {
        console.log("res", res);
        this.mermber = res.page.length;
        const result = res.page[0].challenge;


        this.dataChallenge = result;
        this.dataCommunities.push(...res.page);
        let id = this.dataChallenge.id
        console.log("aqi", id)
        // resp = this.$axios.$get(`/community/community-message/${id}`).then((message) => {
        //     console.log(message[29].messageCommunity)
        //   })

      })
      .then((res) => {
        setTimeout(() => {
          this.activeLoading = false;
          if (this.$route.query.shared) {
            this.activeShared = true;
          }
        }, 500);
      })
      .catch((err) => (this.activeLoading = false));
  },
  mounted() {
    this.lastScrollPosition = window.pageYOffset;
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
<style></style>
<style lang="css" scoped>
.scroller {
  height: 100dvh;
  padding-top: 150px;
  padding-bottom: 150px;
}

.list-page {
  width: 100%;
  border: 2px solid;
  border-radius: 3px;
  overflow-y: auto;
  border-color: dimgray;
}

.scroll-paddng {
  padding-top: 150px !important;

  position: relative;
}

.p-bottom-lg {
  padding-bottom: 150px !important;
}

.p-bottom-xs {
  padding-bottom: 80px !important;
}

.list-item-page {
  display: flex;
  align-items: center;
  padding: 1em;
  border-bottom: 1px solid;
  border-color: lightgray;
}

.bottom {
  padding: 2em 0;
}

.header_options {
  height: 150px;
  padding: 10px;
  background: #f3f4f5;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  margin-bottom: 10px;
  transform: translateY(0);
  transition: transform 300ms linear;
  width: 400px;
  z-index: 200;
  position: fixed;
}

.header_options.is-hidden {
  transform: translateY(-100%);
}

.header_content {
  position: relative;
}

.no-comunnities {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-comunnities p {
  font-size: 1.3rem;
  font-weight: 700;
  color: #525252;
  text-transform: uppercase;
}

.content_container-img {
  width: 100%;
}

.img-Back {
  background-repeat: no-repeat;
  width: 100%;
  height: 50px;
  background-size: contain;
  background-position-y: center;
  background-position-x: center;
  object-fit: fill;
}

.container-img_img {
  width: 100%;
  box-shadow: 1px 1px 5px 2px #b1b1b1;
  height: 350px;
  object-fit: cover;
  border-radius: 24px 4px;
}

.loading-on {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 60px;
  width: 400px;
}

.v-application.white--text.loading-on {
  color: black !important;
}

.loading-off {
  text-transform: uppercase;
  padding: 20px;
  font-weight: 800;
  /*   color: #5e5e5e; */
  color: #fff;
  padding: 15px;
  text-align: center;
  font-family: sans-serif;
  font-size: 12px;
  white-space: pre;
}

.padre-bg-img {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  padding: 20px;
  gap: 10px;
  align-items: center;
}

.footer-img_img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid white;
}

.footer-text {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.text-lg {
  font-size: 15px;
  color: #fff;
  font-family: sans-serif;
  font-weight: 600;
  text-shadow: 0px 0px 2px black;
}

.text-md {
  font-size: 10px;
  color: #fff;
  font-family: sans-serif;
  font-weight: 500;
  text-shadow: 0px 0px 2px black;
}

.container__communities {
  width: 400px;
  /*  height: 100dvh; */
  padding: 0px;
  overflow: hidden;
  /*  overflow: auto; */
  /*   background: #f3f4f5;
    box-shadow: -2px 2px 20px rgb(0 0 0 / 48%); */
}

.no-overflow {
  overflow: hidden !important;
}

.container-communities2::-webkit-scrollbar {
  -webkit-appearance: none;
}

.container-communities2::-webkit-scrollbar:vertical {
  width: 10px;
}

.container-communities2::-webkit-scrollbar-button:increment,
.container-communities2::-webkit-scrollbar-button {
  display: none;
}

.container-communities2::-webkit-scrollbar:horizontal {
  height: 10px;
}

.container-communities2::-webkit-scrollbar-thumb {
  background-color: #797979;
  border-radius: 20px;
  border: 2px solid #f1f2f3;
}

.container-communities2::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* .containerOne {
  position: relative;
  top: calc(150px);
  width: 400px;
  height: 100%;
}
 */
.container-communities2 {
  display: flex;
  flex-direction: column;
  /*   background: linear-gradient(#818181, rgba(0, 0, 0, 0.27843)); */
  /* background-color: #000; */
  /* padding-bottom: 50px; */
}

.options_subHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.bg-black-new {

  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.bg-black-new>div {
  background: #f3f4f6;
  width: 400px;
  height: 100%;
}

.subHeader_button {
  background-color: #33a9f2 !important;
}

.subHeader_tex {
  text-align: center;
  font-size: 1.3rem;
  font-weight: 700;
  color: #2F4B75;
  font-family: sans-serif;
  text-transform: uppercase;
}

.options_img {
  display: grid;
  grid-template-columns: 1fr 30% 1fr;
  place-content: center;
  place-items: flex-start;
  height: 50%;
}

.options_img_img {
  width: 65px;
  height: 65px;
  border-radius: 10px;
  object-fit: contain;
  box-shadow: 0 0 8px 3px #a1a1a15c;
}

.button__groups {
  position: fixed;
  display: flex;
  flex-direction: column;
  right: 10px;
  width: 60px;
  bottom: 50px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.25098);
  box-shadow: 0px 2px 11px 2px rgba(0, 0, 0, 0.30196);
  padding: 10px 0px;
}

.button__groups button {
  /*  border-radius: 0px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px; */
}

.button__groups-span {
  font-size: 10px;
  font-family: din_mediumregular;
  text-transform: capitalize;
}

.activeSeccion {
  /* background-color: #33a9f2 !important; */
  color: #00aef0;
  /*  box-shadow: 0px 5px 5px rgb(0, 0, 0, 0.3) inset; */
  font-family: din_blackregular;
}

.deleteRadius {
  /*  background-color: #ffffff !important; */
  color: #ffffff;
}

.view_3 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
}

.container-members {
  /*  height: 100vh; */
  display: flex;
  gap: 10px;
  flex-direction: column;
  padding: 0px 5px;
  overflow-x: auto;
}

.containerTwo {
  position: relative;
  top: calc(165px);
  /* width: 400px; */
  min-height: 80vh;
}

.container-members::-webkit-scrollbar {
  -webkit-appearance: none;
}

.container-members::-webkit-scrollbar:vertical {
  width: 10px;
}

.container-members::-webkit-scrollbar-button:increment,
.container-members::-webkit-scrollbar-button {
  display: none;
}

.container-members::-webkit-scrollbar:horizontal {
  height: 10px;
}

.container-members::-webkit-scrollbar-thumb {
  background-color: #797979;
  border-radius: 20px;
  border: 2px solid #f1f2f3;
}

.container-members::-webkit-scrollbar-track {
  border-radius: 10px;
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
  padding-top: 55%;
}

@media (max-width: 640px) {
  .loading-on {
    width: 100%;
  }

  .container__communities {
    width: 100%;
  }

  /*  .button__groups {
    width: 100%;
  } */

  .container-communities2 {
    /*   overflow: auto; */
    padding: 10px;
    padding-bottom: 40px;
  }

  .containerOne {
    width: 100%;
  }

  .header_options {
    /*  position: fixed; */
    /*  z-index: 5; */
    width: 100%;
  }

  .container-members {
    padding-bottom: 50px;
  }

  .bg-black-new>div {
    width: 100%;
  }
}
</style>
