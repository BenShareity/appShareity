<template>
  <v-dialog v-model="dialog" content-class="container-vdialog" height="100dvh" persistent
    transition="dialog-bottom-transition">
    <template v-if="loading">
      <div
        style="display: flex; position: absolute; top: 0; width: 100%; height: 100vh; overflow: hidden; justify-content: center; align-items: center; width: 100%;">
        <LoadingIos />
      </div>
    </template>
    <templatev v-else>
      <v-card v-if="infoChallenge" height="100dvh">
        <div class="card-body-info">
          <div class="header-info">
            <div class="header-info__container">
              <div class="back-info">
                <div class="ripple" @click="closeModalInfo">
                  <img
                    style="width: 35px; border-radius: 100%; object-fit: contain; box-shadow: 0px 4px 4px 0px #00000040;"
                    src="@/assets/img/button-float/backwhite.png" alt="">
                </div>
              </div>
              <img :src="urlBucket + infoChallenge.badge" alt="" class="header-info__image" />
              <p class="header-info__text">About this challenge</p>
            </div>
          </div>

          <div class="body-conatin">
            <div class="body-info">
              <div>
                <p class="body-info__header">your sponsor </p>
                <p class="body-info__header"> your cause</p>
              </div>

              <div class="body-info__body">
                <div v-if="sponsor" class="body-info__body-container" @click="openModalInfo('sponsor')">
                  <img :src="urlBucket + sponsor[0].sponsor.logo" alt="sponsor" v-if="sponsor.length > 0"
                    class="body-info__body-img" />
                </div>
                <div @click="openModal" class="body-info__body-item1"
                  :style="[infoChallenge.color ? { background: infoChallenge.color } : { background: '#33A9F2' }]">
                  <img src="../assets/img/png/icon_members_4x.png" class="body-info__body-item1__image" />
                  <p class="body-info__body-item1__text">
                    <span class="count_members">{{ membersCount?.length }}</span>
                    MEMBERS
                  </p>
                </div>
                <img @click="openModalInfo('organization')" :src="urlBucket + infoChallenge.organization.logo"
                  alt="organization" v-if="infoChallenge.organization" class="body-info__body-img" />
              </div>
              <div class="line-info">
                <div class="line-info__text">
                  Sponsor donates
                  <span v-if="infoChallenge.typeDonation == 'money'" class="type-donation-money" alt="💲">${{
    infoChallenge.amount }}</span>
                  <img v-else :src="urlBucket + infoChallenge.typeDonationIcon" class="type-donation-object" alt="🌱" />
                </div>
                <div class="line-info__text">for every challenge accepted</div>
              </div>
            </div>

            <div class="video-info">
              <div class="video-info__header">How it works</div>
              <div class="video-info__video">
                <img @click="openModalVideo()" src="../assets/img/png/youtube.png" alt="" />
              </div>

              <div class="button-info">
                <!-- <button class="button-info__green">i'd rather donate $</button> -->
              </div>
            </div>
          </div>
        </div>
        <v-row justify="center">
          <v-dialog v-model="modalInfo" :retain-focus="false" persistent content-class="container-modal-sponsor">
            <v-card style="border-radius: 16px; position: relative;">
              <div v-if="loading" class="spiner-sponsor">
                <LoadingIos />
              </div>
              <template v-else>
                <div v-if="dataSponsor" style="padding: 10px; width:100%;">
                  <img
                    style="width: 100%; border-radius: 16px; object-fit: contain;     box-shadow: 0px 0px 10px -5px black; height: 30vh;"
                    :src="urlBucket + dataSponsor?.sponsor?.logo" alt="">
                  <div style="display:  flex; padding-top: 15px; flex-direction: column; gap: 10px;">
                    <p
                      style="font-size: x-large; text-transform: capitalize; margin: 0;  font-family: sans-serif ; font-weight: 600; ">
                      {{ dataSponsor?.sponsor?.name }}
                    </p>
                    <div
                      style="overflow: auto; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; height: 250px;">
                      <div style="width: 100%; height: 100px;" v-for="(item, index) in dataBaget" :key="index"
                        @click="redirectChallenge(item)">
                        <img style="width: 100%; height: 100%; object-fit: contain;" :src="urlBucket + item?.badge"
                          alt="">
                      </div>
                    </div>


                  </div>
                  <div @click="closetModalInfo"
                    style="width: 100%; margin-top: 5px; border-radius: 16px; text-align: center; padding: 10px 20px; background-color: #33a9f2; color: white; ">
                    Closet
                  </div>
                </div>
                <div v-else style="padding: 10px; width:100%;">
                  <img
                    style="width: 100%; border-radius: 16px; object-fit: contain;     box-shadow: 0px 0px 10px -5px black; height: 30vh;"
                    :src="urlBucket + dataOrganization?.logo" alt="">
                  <div style="display: flex; padding-top: 15px; flex-direction: column; gap: 10px;">
                    <p
                      style="font-size: x-large; text-transform: capitalize; margin: 0;  font-family: sans-serif ; font-weight: 600; ">
                      {{ dataOrganization?.name }}
                    </p>
                    <div
                      style="overflow: auto; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; height: 250px;">
                      <div v-for="(item, index) in dataBaget" :key="index" @click="redirectChallenge(item)">
                        <img style="width: 100%; height: 100%; object-fit: contain;" :src="urlBucket + item?.badge"
                          alt="">
                      </div>
                    </div>
                  </div>
                  <div @click="closetModalInfo"
                    style="width: 100%; margin-top: 5px; border-radius: 16px; text-align: center; padding: 10px 20px; background-color: #33a9f2; color: white; ">
                    Closet
                  </div>
                </div>
              </template>

            </v-card>
          </v-dialog>
        </v-row>
      </v-card>

    </templatev>
    <div v-show="modalMembers" class="modal-members">
      <div style="width: 420px; background-color: white;     height: 100%; overflow: auto;">
        <div style="background-color: #33a9f2; display: flex;     justify-content: space-between; color: white; padding: 20px; box-shadow: 2px 2px 11px -5px #00000087;
    margin-bottom: 20px;">
          <div style="transform: rotate(270deg); " @click="backInfoModal()">
            <v-icon size="30" color="#fff"> mdi-arrow-left-circle </v-icon>
          </div>
        </div>
        <div style="margin: 13px;" v-for="(item, index) in membersCount" :key="index">
          <v-card outlined shaped elevation="4" class="mx-auto" color="#fff" dark max-width="400">
            <v-card-actions class="shadow__">
              <v-list-item class="grow__edit">
                <v-list-item-avatar width="80" height="80" rounded color="rey darken-3g"
                  @click="$router.push({ path: `/profile/${item.username}` })">
                  <v-img class="img__classEdit" alt=""
                    :src="item.ImgUsr !== '' && item.ImgUsr !== '-' && item.ImgUsr !== null ? urlBucket + item.ImgUsr : imgNone"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    <div class="elispsi-name">
                      <p> {{ item.FnameUsr }} </p>
                    </div>
                  </v-list-item-title>
                </v-list-item-content>
                <v-row class="none_flex" align="center" justify="end">
                  <v-btn v-if="item.status === 0" class="color_button" color="#33A9F2" @click="addFriend(item)">
                    Add friend
                  </v-btn>
                  <v-btn v-else-if="item.status === 2" class="color_button" color="#6f6f6f">
                    Pending
                  </v-btn>
                  <v-btn v-else-if="item.status === 3" class="color_button" color="#33A9F2" @click="addFriend(item)">
                    Accept request
                  </v-btn>
                  <v-btn v-else class="color_button" color="#4caf50" @click="addFriend(item)">
                    Chat
                  </v-btn>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </div>
      </div>

    </div>

    <ModalVideoYoutube :dialog="showVideo" @closeModalV="closeModalVideo" />
    <div data-app></div>
  </v-dialog>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import logoS from "../assets/img/png/user.png";
import LoadingIos from "./loader/LoadingIos.vue";
export default {
  props: {
    infoChallenge: Object,
    dialog: Boolean,
    membersCount: Object
  },
  components: {
    LoadingIos
  },
  data() {
    return {
      showVideo: false,
      sponsor: null,
      members: 0,
      closetApp: "",
      imgNone: logoS,
      modalMembers: false,
      loading: false,
      membersCount: null,
      modalInfo: false,
      dataSponsor: null,
      dataOrganization: null,
      dataBaget: [],
    };
  },
  computed: {
    urlBucket() {
      return process.env.api_assets_url;
    },
    ...mapGetters("user", ["getUserData"]),
  },
  methods: {
    closeModalInfo() {
      this.dialog = false;
      this.$emit("closeModalI");
    },
    openModalInfo(option) {
      this.modalInfo = true
      this.loading = true
      if (option == 'sponsor') {
        this.dataSponsor = this.infoChallenge.sponsors[0]
        this.$axios.$get('/challenge/sponsors/challenge')
          .then((response) => {
            console.log('challenge/sponsors/challenge', response.value)
            this.dataBaget = response.value;
            this.loading = false
          })
          .catch((err) => {
            this.loading = false
            console.log("🚧 catch", err);
          });
      }
      if (option == 'organization') {
        this.dataOrganization = this.infoChallenge.organization
        this.$axios
          .$get(`/challenge/organization`)
          .then((response) => {
            console.log('/challenge/organization', response.value)
            this.dataBaget = response.value;
            this.loading = false
          })
          .catch((err) => {
            this.loading = false
            console.log("🚧 catch", err);
          });

      }


      console.log('this.infoChallenge', this.infoChallenge)
    },
    closetModalInfo() {
      this.modalInfo = false
      this.dataSponsor = null
      this.dataOrganization = null
    },
    backInfoModal() {
      this.modalMembers = false
    },
    openModal() {
      this.modalMembers = true
    },
    openModalVideo() {
      this.showVideo = true;
    },
    closeModalVideo() {
      this.showVideo = false;
    },
    addFriend(item) {
      if (item.status == 0) {
        this.$axios
          .$post("/user/friendship-request", {
            userId: Number(this.getUserData.id),
            userFriendship: [Number(item.id)],
          })
          .then((res) => {
            this.requestSent = true;
            item.status = 2;
          })
          .catch((err) => {
            this.requestSent = true;
            console.log("🚧 catch", err);
          });
      } else if (item.status == 1) {
        this.$router.push({ path: `/chat/${item.username}` });
      } else if (item.status == 3) {
        this.$axios
          .$post("/user/friendship-request", {
            userId: Number(this.session.id),
            userFriendship: [Number(item.id)],
          })
          .then((res) => {
            this.requestSent = true;
            item.status = 1;
          })
          .catch((err) => {
            this.requestSent = true;
            console.log("🚧 catch", err);
          });
      }
    },
    redirectChallenge(item) {
      console.log('item', item)
      this.$router.push({
        path: `/challenges/${item.id}`,
      });


    }
  },
  created() {
    if (this.infoChallenge) {
      this.sponsor = this.infoChallenge?.sponsors?.filter((sponsor) => {
        if (sponsor.status == 1) {
          return true;
        }
      });
    }
    this.$nuxt.$on("openModalInfoCommunities", (option) => {
      console.log('modal INFO', option)
      this.members = option[2];
      this.dialog = option[0];
      /*  this.infoChallenge = option[1]; */
      this.closetApp = option[3];

      this.infoChallenge = null
      this.loading = true
      this.$axios
        .$get("/challenge/get-by-id/" + option[1].id)
        .then((res) => {
          console.log('/challenge/get-by-id/', res)
          this.infoChallenge = res
          this.sponsor = this.infoChallenge?.sponsors?.filter((sponsor) => {
            if (sponsor.status == 1) {
              return true;
            }
          });
          this.$axios
            .$get(
              `/user/get-friends/${this.getUserData.id}/${option[1].id}`
            )
            .then((response) => {
              console.log('response', response)
              this.membersCount = response;
              this.membersCount?.map((member) => {
                if (member.status == 1) {
                  this.friendsCount++;
                }
              });
              this.loading = false
            })
            .catch((err) => {
              this.loading = false
              console.log("🚧 catch", err);
            });
        })
    });
  },
};
</script>
<style>
.container-modal-sponsor {
  width: 400px !important;
}

.container-vdialog.v-dialog {
  width: 400px;
}

@media (max-width: 640px) {
  .container-modal-sponsor {
    width: 90% !important;
  }

  .container-vdialog.v-dialog {
    width: 100% !important;
    margin: 0px !important;
  }
}
</style>
<style scoped>
.modal-members {
  height: 100vh;
  width: 100%;
  margin: 0px auto;
  position: absolute;
  top: 0px;
  overflow: auto;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}

.header-info {
  border-bottom-left-radius: 50px;
  background: azure;
  border-bottom-right-radius: 50px;
  box-shadow: 0px 4px 13px -4px #b4b4b4;
  font-size: 1em;
  text-transform: uppercase;
}

.c_card {
  display: grid;
}

.shadow__ {
  box-shadow: 0px 0px 15px -9px #000000e6;
}

.grow__edit {
  display: flex;
  gap: 15px;
  padding: 0 !important;
}

.color_button {
  padding-left: 6px !important;
  padding-right: 6px !important;
  font-size: 12px !important;
}

.elispsi-name p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 150px;
  text-transform: uppercase;
  font-size: 1rem;
  color: rgb(47, 47, 47);
  font-weight: 600;
}

.editTextUser {
  color: #2f2f2f;
  font-size: 15px;
  font-weight: 600;
}

.editTextG {
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  padding: 2px;
  font-family: sans-serif;
}

.grid__Template[data-v-2c8e74c2] {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  gap: 18px;
  overflow-y: auto;
  padding: 10px;
  background: #f3f4f5;
}

.img__classEdit {
  border: solid #dadada99 3px;
  border-radius: 100px;
}

.none_flex {
  flex: none !important;
  font-family: "Roboto", sans-serif;
}

.header-info__container {
  display: flex;
  row-gap: 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.header-info__text {
  color: #33a9f2;
  padding-top: 5px;
}

.body-info__body {
  padding: 20px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
  align-items: center;
}

.body-info__body-container {
  display: flex;
  flex-direction: column;
  grid-gap: 15px;
  grid-gap: 15px;
  gap: 15px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
}

.spiner-sponsor {
  background: #0000006e;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
}

.body-info__header {
  text-shadow: 0px 0px 6px #d3d3d3;
}

.body-info__body-link {
  position: relative;
  top: 9px;
  color: #33a9f2;
  text-decoration: underline;
  white-space: nowrap;
}

.video-info {
  height: 100%;
  padding: 20px 0;
}

.video-info__video {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-info__header {
  font-size: 12px;
  margin-bottom: 12px;
  color: black;
}

.body-info__body-item1__image {
  width: 80px;
}

.button-info {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-info__green {
  background-color: green;
  border: none;
  color: white;
  padding: 7px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px #0000006b;
}

.back-info {
  position: absolute;
  top: 5%;
  left: 5%;
}

.back-info__btn {
  background-color: #33a9f2 !important;
}

.body-info__body-item1 {
  color: white;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 0px 10px 0px #0000006b;
}

.body-info__body-item1__text {
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.count_members {
  font-size: 25px;
}

.body-info__body-img {
  width: 100%;
    height: 100px;
    object-fit: contain;
}

.line-info {
  display: flex;
  justify-content: center;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
}

.line-info__text {
  display: flex;
  align-items: center;
  font-size: 11px;
  color: black;
  white-space: nowrap;
}

.type-donation-money {
  margin: 0 6px;
  color: white;
  background-color: #0cd20c;
  /* border: 3px solid #0cd20c; */
  padding: 3px;
  border-radius: 100%;
  display: flex;
  width: 35px;
  height: 35px;
  font-size: 1.4em;
  justify-content: center;
  align-items: center;
}

.type-donation-object {
  margin: 0 6px;
  width: 35px;
  height: 35px;
}

.header-info__image {
  width: 75px;
  object-fit: contain;
  box-shadow: 0 0 8px 3px rgb(161 161 161 / 36%);
  border-radius: 10px;
}

.card-body-info {
  text-align: center;
  font-family: "Lemon/Milk";
}

.body-info {
  padding: 40px 20px;
  border-bottom: solid 2px #e4e4e4;
}

.body-info>div:nth-child(1) {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

@media (max-height: 700px) {
  .header-info {
    margin-bottom: 0;
    height: 20% !important;
  }
}

@media (max-width: 640px) {
  .card-body-info {
    height: 100%;
  }

  .body-info {
    height: 100%;
    height: 100%;
    display: grid;
    place-content: space-around;
    place-items: center;
  }

  .header-info {
    position: relative;
    /*  height: 20%; */
  }

  .body-conatin {
    position: relative;
    height: 80%;
    display: flex;
    flex-direction: column;
    place-content: space-around;
  }

  .video-info {
    height: 100%;
    display: grid;
    place-content: space-around;
    place-items: center;
  }


}

@media (max-width: 390px) {
  .color_button {
    font-size: 8px !important;
  }
}
</style>
