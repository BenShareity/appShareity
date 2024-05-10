<template>
  <div class="text-center containerComponent">
    <v-dialog v-model="active" max-width="400" content-class="no-scroll" :content-class="`${toListenWidth > 1264 && toListenWidth < 1904 ? 'margin_desptop' : ''
      }`">
      <v-sheet class="text-center height_modal" style="position: relative">
        <v-bottom-sheet hide-overlay persistent v-model="QrClicked" max-width="414px" :retain-focus="false">
          <v-sheet class="text-center container-modal-2" style="background-color: #1976d2" height="260px">
            <div class="container-modal__section1">
              <v-btn class="mt-6" text @click="QrClicked = !QrClicked">
                <v-icon color="#fff" size="30"> mdi-arrow-left-circle </v-icon>
              </v-btn>
            </div>
            <div class="py-3 container-modal__section2">
              <div class="container-modal__section2__img">
                <img src="@/assets/img/png/steve_buy_usd.png" alt="" />
              </div>
              <div class="container-modal__section2__item">
                <Qr class="" :textSrc="urlLink" :badgeImage="item?.challenge?.badge"
                  :badgeColor="item?.challenge?.color" />
              </div>
            </div>
          </v-sheet>
        </v-bottom-sheet>
        <v-bottom-sheet hide-overlay persistent v-model="linkCopied" max-width="414px" :retain-focus="false">
          <v-sheet class="text-center container-modal-2" style="background-color: #1976d2" height="260px">
            <div class="container-modal__section1">
              <v-btn class="mt-6" text @click="linkCopied = !linkCopied">
                <v-icon color="#fff" size="30"> mdi-arrow-left-circle </v-icon>
              </v-btn>
            </div>
            <div class="py-3 container-modal__section2">
              <div class="container-modal__section2__img">
                <img src="@/assets/img/png/steve_buy_usd.png" alt="" />
              </div>
              <div class="container-modal__section2__item">
                Now paste your challenge link everywhere! Text, Email, Snapchat,
                WhatsApp...
              </div>
            </div>
          </v-sheet>
        </v-bottom-sheet>
        <v-bottom-sheet persistent hide-overlay v-model="iconCopyLink.status" max-width="414px">
          <v-sheet class="text-center container-modal" style="background-color: #fff">
            <div class="py-3 container-modal__intagram__section2">
              <div class="title-copy-link">
                <v-btn text color="red" @click="iconCopyLink.status = !iconCopyLink.status">
                  <v-icon size="35" style="color: #1976d2">
                    mdi-arrow-left-circle
                  </v-icon>
                </v-btn>
                <h1 class="title__1">Copy your Challenge Link:</h1>
              </div>


            </div>
            <div class="contend-social-is">
              <div class="social-is">
                <div>
                  <img class="img__social" src="@/assets/img/png/social/link.png" />
                </div>
                <div>
                  <p @click="copy('redes', iconCopyLink)" class="text_pp">Copy Your Challenge Link</p>
                </div>


              </div>
              <div class="social-is" style="margin: 0">
                <img class="img__social" src="@/assets/img/png/social/down-arrow.png" />
                <p @click="getDownload(item)" class="text_pp">Download Your Challenge Video</p>
              </div>

              <input ref="url" style="opacity: 0; position: absolute; top: -400px" readonly
                v-on:focus="$event.target.select()" :value="iconCopyLink.from === 0 ? urlIntagram : urlTikTok" />
              <div v-if="iconCopyLink.from === 0" class="description">
                Create a Story and direct friend to accept your challenge by clicking your link. Add Your Challenge Link
                via
                sticker with text like: See My Challenge!
              </div>
              <div v-else class="description">
                Share your challenge video on TikTok and direct friends to accept your challenge by going to Your
                Challenge
                Link url. Paste your challenge link in the comment section of your TikTok video. Encourage viewers to
                copy
                and paste the comment link into their browser to join the challenge.
              </div>
              <div class="container-modal__intagram__section3">
                <div class="container-modal__intagram__section3__item1">
                  <div class="social-item">
                    <div class="img__social-social">
                      <div v-if="item">
                        <a :href="iconCopyLink.from === 0
      ? 'https://www.instagram.com/'
      : 'https://www.tiktok.com/'
      " target="_blank">
                          <img v-if="iconCopyLink.from === 0" class="img__social"
                            src="@/assets/img/png/social/instagram.png" />
                          <img v-else class="img__social" src="@/assets/img/png/social/tiktok.png" />
                        </a>
                      </div>
                      <!-- <p class="text_pp">
                      {{ iconCopyLink.from === 0 ? "Instagram" : "Tik Tok" }}
                    </p> -->
                      <div v-if="iconCopyLink.from === 0" class="description" style="margin-bottom: 10px;">
                        You can also include Your Challenge Link in your bio/swipe up!
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <input ref="urlInsta" style="
                opacity: 0;
                z-index: -1;
                position: absolute;
                bottom: -999999999%;
              " readonly v-on:focus="$event.target.select()" :value="urlIntagram" />
              <input ref="urlTik" style="
                opacity: 0;
                z-index: -1;
                bottom: -999999999%;
                position: absolute;
              " readonly v-on:focus="$event.target.select()" :value="urlTikTok" />
            </div>

          </v-sheet>
        </v-bottom-sheet>
        <div class="class__butoon__">
          <div v-if="item" class="div-img">
            <video v-if="item?.resource?.id === 3" @click="playVideo()" :class="showVideo ? 'no-video' : 'video-show '"
              playsinline preload="auto" ref="videoComminities" muted :poster="urlBucket + item?.watermark"
              :src="urlBucket + item?.url">
            </video>
            <img :class="showVideo || item?.resource?.id !== 3 ? 'imagen-show ' : 'no-image'"
              :src="urlBucket + item?.watermark" alt="">
          </div>
          <div class="share-title">
            <div style="line-height: 27px;">
              Now share <span v-if="idUser?.id === item?.user?.id"> your </span>
              <span v-else> {{ nameEdite }} </span>

              <p class="line-2"> Challenge link to raise more!</p>
            </div>
          </div>
          <div class="groupd_button">
            <div class="center-money">
              <div class="button-mnumber" :style="[active1 && { color: 'white', background: '#00a5ff' }]" medium
                @click="!active1 && isActiveGroups(1)">
                <p class="donation-text" :class="active1 ? 'donation-text-white' : 'donation-text-green'"
                  v-if="item?.challenge?.typeDonation == 'money'"> ${{
      item?.challenge?.amount }}</p>
                <img style="width: 100%; padding: 5px; height: auto;" v-else
                  :src="urlBucket + item?.challenge?.typeDonationIcon" alt="">


              </div>
              <p class="text_pp">Friend 1</p>
            </div>
            <div class="center-money">
              <div class="button-mnumber" :style="[active2 && { color: 'white', background: '#00a5ff' }]" medium
                @click="!active2 && isActiveGroups(2)">
                <p class="donation-text" :class="active2 ? 'donation-text-white' : 'donation-text-green'"
                  v-if="item?.challenge?.typeDonation == 'money'"> ${{
      item?.challenge?.amount }}</p>
                <img style="width: 100%; padding: 5px; height: auto;" v-else
                  :src="urlBucket + item?.challenge?.typeDonationIcon" alt="">

              </div>
              <p class="text_pp">Friend 2</p>
            </div>
            <div class="center-money">
              <div class="button-mnumber" :style="[active3 && { color: 'white', background: '#00a5ff' }]" medium
                @click="!active3 && isActiveGroups(3)">
                <p class="donation-text" :class="active3 ? 'donation-text-white' : 'donation-text-green'"
                  v-if="item?.challenge?.typeDonation == 'money'"> ${{
      item?.challenge?.amount }}</p>
                <img style="width: 100%; padding: 5px; height: auto;" v-else
                  :src="urlBucket + item?.challenge?.typeDonationIcon" alt="">

              </div>
              <p class="text_pp">Friend 3</p>
            </div>

          </div>

        </div>

        <div id="style-item" class="social-items">
          <div v-if="item?.resource?.id === 3" class="social-item">
            <div class="buttonPlay">
              <v-icon class="video-search-play" v-if="!stateVideo" color="white" @click="playVideo()" size="30">
                mdi-play-circle
              </v-icon>
              <v-icon class="video-search-pause" v-else color="white" @click="playVideo()" size="30">
                mdi-pause-circle
              </v-icon>
            </div>
            <p v-if="!this.isPlaying" class="text_pp">Play</p>
            <p v-else class="text_pp">Stop</p>
          </div>
          <div class="social-item" @click="sharedSocial('text')">
            <img @click="counter()" class="img__social" src="@/assets/img/png/social/text.png" />
            <p class="text_pp">Text</p>
          </div>
          <div class="social-item" @click="sharedSocial('facebook')">
            <ShareNetwork network="facebook" :url="urlFaceebok" :title="item?.challenge?.shareMessage || ''"
              hashtags="Shareity">
              <img class="img__social" src="@/assets/img/png/social/facebook.png" />
            </ShareNetwork>
            <p class="text_pp">Facebook</p>
          </div>
          <div class="social-item" @click="sharedSocial('twitter')">
            <ShareNetwork network="twitter" :url="urlTwitter" :title="item?.challenge?.shareMessage || ''"
              hashtags="Shareity">
              <img class="img__social" src="@/assets/img/png/social/x.png" />
            </ShareNetwork>
            <p class="text_pp">X</p>
          </div>

          <div class="social-item" @click="sharedSocial('instagram')">
            <div @click="modalCopyLink('instagram')" class="img__social">
              <img class="img__social" src="@/assets/img/png/social/instagram.png" />
            </div>
            <p class="text_pp">Instagram</p>
          </div>
          <div class="social-item" @click="sharedSocial('tikTok')">
            <div @click="modalCopyLink('tiktok')" class="img__social">
              <img class="img__social" src="@/assets/img/png/social/tiktok.png" />
            </div>
            <p class="text_pp">TikTok</p>
          </div>


          <div class="social-item" @click="sharedSocial('whats')">
            <ShareNetwork network="whatsApp" :url="urlWhatsApp" :title="item?.challenge?.shareMessage || ''"
              hashtags="Shareity">
              <img class="img__social" src="@/assets/img/png/social/whatsapp.png" />
            </ShareNetwork>
            <p class="text_pp">Whatsapp</p>
          </div>
          <div class="social-item" @click="sharedSocial('pinterest')">
            <ShareNetwork network="pinterest" :url="urlPinterest" v-if="item" :media="urlBucket + item.watermark"
              :title="item?.challenge?.shareMessage || ''" hashtags="Shareity">
              <img class="img__social" src="@/assets/img/png/social/pinterest.png" />
            </ShareNetwork>
            <p class="text_pp">Pinterest</p>
          </div>

          <div class="social-item" @click="sharedSocial('email')">
            <div class="img__social">
              <a :href="`mailto:?&body=${item?.challenge?.shareMessage + '  ' + urlEmail
      }`" target="_blank">
                <img class="img__social" src="@/assets/img/png/social/email.png" />
              </a>
            </div>
            <p class="text_pp">Email</p>
          </div>
          <div class="social-item qr-contain">
            <div @click="createQr()" class="img__social">
              <div class="qr-contain__bg">
                <v-icon class="qr-icon" size="20" style="color: #fff">
                  mdi-qrcode-scan
                </v-icon>
              </div>
            </div>
            <p class="text_pp">QR</p>
          </div>
          <template v-if="item">
            <div v-if="idUser.id == item?.user?.id" class="social-item" style="margin: 0">
              <img @click="getDownload(item)" class="img__social" src="@/assets/img/png/social/down-arrow.png" />
              <p class="text_pp">DOWNLOAD</p>
            </div>
          </template>
          <div class="social-item qr-contain">
            <div @click="sharedSocial('link')" class="img__social" style="display: flex; justify-content: center;">
              <div class="qr-contain__bg">
                <v-icon class="qr-icon" size="20" style="color: #fff">
                  mdi-link
                </v-icon>
              </div>
            </div>
            <div style="display: flex; justify-content: center; align-items: center; gap: 2px;">
              <p class="text_pp">Copy</p>
              <p class="text_pp">Link</p>
            </div>

          </div>
          <div data-app>
            <Loading :active="loading" />
          </div>
        </div>
        <div class="footer-shared">
          <!--   <div v-if="idUser.id == item?.user?.id" class="footer-shared-donwload" @click="getDownload(item)">Download</div> -->
          <div class="footer-shared-copy" @click="sharedSocial('link')">
            Copy Link
          </div>
          <div class="footer-shared-done" @click="closeModalShare()">Done</div>
        </div>
        <div v-if="loadingShared" class="loading-social">
          <LoadingIos />
        </div>
      </v-sheet>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import LoadingIos from "./loader/LoadingIos.vue";
import Qr from "./qr/Qr.vue";
export default {
  data() {
    return {
      url: "",
      progress: 0,
      urlShred: "",
      urlFaceebok: "",
      urlTwitter: "",
      urlPinterest: "",
      urlWhatsApp: "",
      urlLinkedin: "",
      urlLink: "",
      urlSms: "",
      urlWhatsApp: "",
      urlIntagram: null,
      urlTikTok: null,
      urlText: "",
      urlEmail: "",
      loadingShared: false,
      linkActive: false,
      active1: false,
      active2: false,
      active3: false,
      iconCopyLink: {},
      counet: 0,
      loading: false,
      active: null,
      item: {},
      display: "none",
      linkCopied: false,
      QrClicked: false,
      text: null,
      shareMessage: "",
      messageSend: "",
      tiktokLink: "",
      InstagramLink: "",
      idUser: "",
      redes: null,
      isPlaying: false,
      stateVideo: false,
      showVideo: false,
      nameEdite: '',
    };
  },
  computed: {
    ...mapState("phoneSize", ["windowLeftT", "windowWidthT"]),
    urlBucket() {
      return process.env.api_assets_url;
    },
  },
  watch: {
    isPlaying(value) {
      if (value) {
        this.stateVideo = true;
      } else {
        this.stateVideo = false;
      }
    },
  },
  methods: {
    ...mapActions("user", ["userDataAction", "nicknameAction"]),
    toListenWidth() {
      return window.innerWidth;
    },
    counter() {
      window.open(
        `sms:?&body=${this.item.challenge.shareMessageShort + "  " + this.urlSms
        }`,
        "_blank",
        "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes"
      );
      this.counet = 0;
    },
    isActiveGroups(value) {
      window.open(
        `sms:?&body=${this.item.challenge.shareMessageShort + "  " + this.urlSms
        }`,
        "_blank",
        "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes"
      );
      if (value === 1) {
        this.active1 = true;

      }
      if (value === 2) {
        this.active2 = true;
      }
      if (value === 3) {
        this.active3 = true;
      }
    },
    getDownload(itemDownload) {
      if (this.item?.resource?.id === 3) {
        this.$refs.videoComminities.pause();
        this.isPlaying = false
        this.showVideo = true
      }
      this.loading = true;
      this.$axios({
        url: "/media/" + itemDownload.url,
        method: "GET",
      }).then((response) => {
        const nameUrl = itemDownload.url.split("/");
        const blob = this.b64toBlob(response.data.data, "video/mp4");
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", nameUrl[1]);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.loading = false;
      });
    },
    b64toBlob(b64Data, contentType = "", sliceSize = 512) {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];
      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    },
    closeModalShare() {
      if (this.item?.resource?.id === 3) {
        this.$refs.videoComminities.pause();
        this.isPlaying = false
        this.showVideo = true
      }
      this.active = false;
      this.urlShred = "";
      this.item = {};
      this.active1 = false
      this.active2 = false
      this.active3 = false
    },
    sharedSocial(string) {
      if (this.item?.resource?.id === 3) {
        this.$refs.videoComminities.pause();
        this.isPlaying = false
        this.showVideo = true
      }
      let sharedRed;
      switch (string) {
        case "email":
          sharedRed = this.redes.Email.id;
          break;
        case "facebook":
          sharedRed = this.redes.Facebook.id;
          break;
        case "instagram":
          sharedRed = this.redes.Instagram.id;
          break;
        case "link":
          var dummy = document.createElement("input");
          document.body.appendChild(dummy);
          dummy.value = this.urlLink;
          dummy.select();
          dummy.setSelectionRange(0, 99999);
          document.execCommand("copy");
          document.body.removeChild(dummy);
          this.linkCopied = true;
          sharedRed = this.redes.Direct.id;
          break;
        case "pinterest":
          sharedRed = this.redes.Pinterest.id;
          break;
        case "text":
          sharedRed = this.redes.Direct.id;
          break;
        case "text":
          sharedRed = this.redes.Direct.id;
          break;
        case "tikTok":
          sharedRed = this.redes.TikTok.id;
          break;
        case "twitter":
          sharedRed = this.redes.Twitter.id;
          break;
        case "whats":
          sharedRed = this.redes.Whatsapp.id;
          break;
        default:
          sharedRed;
          break;
      }
      this.$axios
        .$get("/stats/UserChallenge/IncrementShare/" + sharedRed)
        .then((res) => {
        });
    },
    copy(string, shared) {
      if (string == "redes" && shared) {
        if (shared.from == 0) {
          this.$refs.urlInsta.focus();
          document.execCommand("copy");
          this.linkCopied = true;
        }
        if (shared.from == 1) {
          this.$refs.urlTik.focus();
          document.execCommand("copy");
          this.linkCopied = true;
        }
      }
      /* if (this.idUser.id == this.item?.user?.id) {
        this.getDownload(this.item)

      } */
    },
    copyUrlLink() {
      var dummy = document.createElement("input");
      document.body.appendChild(dummy);
      dummy.value = this.urlLink;
      dummy.select();
      dummy.setSelectionRange(0, 99999);
      document.execCommand("copy");
      document.body.removeChild(dummy);
      this.linkCopied = true;
    },
    createQr() {
      if (this.item?.resource?.id === 3) {
        this.$refs.videoComminities.pause();
        this.isPlaying = false
        this.showVideo = true
      }
      this.QrClicked = true;
    },
    modalCopyLink(from) {
      if (from === "instagram") {
        this.iconCopyLink = { status: true, from: 0 };
      }
      if (from === "tiktok") {
        this.iconCopyLink = { status: true, from: 1 };
      }
    },
    playVideo(item) {
      this.showVideo = false
      if (this.isPlaying) {
        this.isPlaying = false
        this.$refs.videoComminities.pause();
      } else {
        this.isPlaying = true
        this.$refs.videoComminities.play();
      }
    }
  },
  created() {
    this.$nuxt.$off("openModalShareFriends");
    this.$nuxt.$on("openModalShareFriends", (item) => {
      console.log('item', item)
      var name = item[0]?.user?.firstName.split(' ').slice(0, -1).join(' ');
      var string = name;
      if (string?.endsWith("s")) {
        this.nameEdite = `${string.substring(0, string.length - 1)}'s`;
        console.log(`${string}'s`);
      } else {
        this.nameEdite = item[0]?.user?.firstName
      }
      this.nicknameAction().then((user) => {
        this.idUser = user;
      });
      this.loadingShared = true;
      this.shareMessage = item[0]?.challenge?.shareMessage;
      this.$axios
        .$get("/user-challenge/get-by-id/" + item[0]?.id)
        .then((res) => {
          this.item = res;
          this.active = item[1];
          this.$axios
            .$post("/stats/UserChallenge/GetShare", {
              userChallengeId: this.item.id,
              platform: [
                "Twitter",
                "Facebook",
                "Instagram",
                "Email",
                "TikTok",
                "Whatsapp",
                "Pinterest",
                "Direct",
              ],
            })
            .then((resShared) => {
              this.redes = resShared;
              this.messageSend = this.item?.challenge?.shareMessageShortIG;
              this.tiktokLink = `${window.location.origin}/userChallenge/shares/${resShared.TikTok.id}/${item[0]?.id}`;
              this.InstagramLink = `${window.location.origin}/userChallenge/shares/${resShared.Instagram.id}/${item[0]?.id}`;
              this.urlFaceebok = `${window.location.origin}/userChallenge/shares/${resShared.Facebook.id}/${item[0]?.id}`;
              this.urlTwitter = `${window.location.origin}/userChallenge/shares/${resShared.Twitter.id}/${item[0]?.id}`;
              this.urlPinterest = `${window.location.origin}/userChallenge/shares/${resShared.Pinterest.id}/${item[0]?.id}`;
              this.urlWhatsApp = `${window.location.origin}/userChallenge/shares/${resShared.Whatsapp.id}/${item[0]?.id}`;
              this.urlLink = `${window.location.origin}/userChallenge/shares/${resShared.Direct.id}/${item[0]?.id}`;
              this.urlText = `${window.location.origin}/userChallenge/shares/${resShared.Direct.id}/${item[0]?.id}`;
              this.urlEmail = `${window.location.origin}/userChallenge/shares/${resShared.Email.id}/${item[0]?.id}`;
              this.urlIntagram =
                this.item?.challenge?.shareMessageShortIG ? this.item?.challenge?.shareMessageShortIG + " " + `${window.location.origin}/userChallenge/shares/${resShared.Instagram.id}/${item[0]?.id}` : 'Shareity' + "  " + `${window.location.origin}/userChallenge/shares/${resShared.Instagram.id}/${item[0]?.id}`;
              this.urlTikTok =
                this.item?.challenge?.shareMessageShortIG ? this.item?.challenge?.shareMessageShortIG + " " + `${window.location.origin}/userChallenge/shares/${resShared.Instagram.id}/${item[0]?.id}` : 'Shareity' +
                  "  " +
                  `${window.location.origin}/userChallenge/shares/${resShared.TikTok.id}/${item[0]?.id}`;
              this.urlSms = `${window.location.origin}/userChallenge/shares/${resShared.Direct.id}/${item[0]?.id}`;

              setTimeout(() => {
                this.loadingShared = false;
              }, 1000);
            })
            .catch((err) => {
              console.log("err", err);
              this.loadingShared = false;
            });
        });
    });
  },
  components: { LoadingIos, Qr },
};
</script>
<style>
.v-dialog:not(.v-dialog--fullscreen) {
  max-height: inherit !important;
}
</style>
<style scoped>
.containerComponent {
  position: absolute;
}

.button-mnumber {
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: #f5f5f5;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
}

.qr-contain {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
}

.qr-contain__bg {
  width: 35px;
  height: 35px;
  background-color: #3898ec;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.numbers p {
  width: 50px;
  height: 50px;
  border-radius: 40px;
  margin: 5px 10px;
  border: 1px solid black;
  font-size: 30px;
}

.container-modal {
  display: flex;
  flex-direction: column;
}

.share-title >div {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2F4B75;
  padding: 12px 20px;
  text-align: center;
  line-height: 20px;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 900;
  padding-bottom: 2px;
  display: inline-block;
  width: 280px;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;

}

.line {
  font-size: 15px;
  display: inline-block;
  width: 200px;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
  margin: 0 !important;
  color: #2F4B75;
  font-weight: 900;
  line-height: 12px;
}

.line-2 {
  font-size: 12px;
  white-space: pre;
  color: rgb(68, 154, 217);
  font-weight: 900;
  line-height: 12px;
  margin-left: -5px;
}

.container-modal__section1 {
  height: 15%;
  padding: 10px;
  display: flex;
  position: absolute;
}

.container-modal__section2 {
  height: 85%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
}

.container-modal__section2__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.loading-social {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0000003b;
  position: absolute;
  top: 0;
  height: 100%;
  border-top-left-radius: 40px;
  border-top-right-radius: 20px;
}

.container-modal__section2__item {
  font-size: 25px;
  font-weight: 500;
  color: #fff;
  text-align: center;
  font-family: system-ui;
}

.container-modal__intagram__section1 {
  height: 20;
  padding: 10px;
}

.container-modal__intagram__section2 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.center-money {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.donation-text {
  font-size: 22px;
  padding-top: 2px;
  margin-bottom: 0 !important;

}

.donation-text-green {
  color: #3ab648;
}

.donation-text-white {
  color: white;
}

.title-copy-link {
  display: flex;
  align-items: center;
  margin-top: 15px;
}

.contend-social-is {
  display: flex;
  flex-direction: column;
  padding: 0px 30px;
  gap: 12px;
  margin-top: 10px;
}

.contend-social-is .text_pp {
  text-decoration: underline;
}

.title__1 {
  color: black;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  font-family: "gotham_htfmedium";
}

.description {
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  /* padding: 0 35px; */
  font-family: "poppinsregular";
  line-height: 24px;
}


.container-modal__intagram__section3 {}

.container-modal__intagram__section3__item1 {
  display: flex;
  justify-content: space-evenly;
  /*  padding: 10px;
  padding-top: 8px; */
}

.container-modal__intagram__section3__item1 .social-item {
  margin: 0;
}

.container-modal__intagram__section3__item2 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.social-items {
  display: flex;
  margin: 20px;
  overflow-x: auto;
  height: 30%;
  gap: 10px;
  overflow-y: hidden;
  padding: 20px;
  border-top: 1px solid #33a9f2;
}

.social-item {
  margin: 0 7px;
  text-align: center;
}

.img__social {
  width: 100%;
  text-align: center;
  border-radius: 10px;
}

.img__social-social {
  display: flex;
  gap: 8px;
  /*  padding: 0 35px; */
}

.img__social-social .description {
  padding: 0;
}

.social-item img {
  width: 35px;
  cursor: pointer;
}

.div-img {
  height: 30vh;
  width: 80%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0px 0px 13px 2px #00000075;
  border-radius: 20px;
}

/* 
  .v-overlay {
      display: none !important;
  } */

.class__butoon__ {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 13px 0px 13px;
  flex-direction: column;
}

.share-title {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #414141;
  padding: 12px 20px;
  text-align: center;
  line-height: 29px;
  font-weight: 300;
  font-size: 15px;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: bold;
  padding-bottom: 2px;
}

.edit__img_class {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 17px;
  box-shadow: 0px 0px 18px -5px black;
}

.groupd_button {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  color: rgb(54, 54, 54);
  font-family: "poppinsbold";
  margin-bottom: 8px;
}

#style-item::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

#style-item::-webkit-scrollbar {
  width: 2px;
  background-color: #f5f5f5;
  height: 10px;
}

#style-item::-webkit-scrollbar-thumb {
  background-color: #696868;
}

.v-dialog__content {
  z-index: 300 !important;
}

.text_pp {
  font-weight: 400;
  text-decoration: none;
  font-size: 11px;
  color: rgb(54, 54, 54);
  font-family: "poppinsbold";
  margin: 0;
  text-align: center;
  padding-top: 5px;
}

.social-is {
  display: flex;
  gap: 10px;
  align-items: center;
}

.social-is div:nth-child(1) {
  width: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.social-is div:nth-child(2) {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.social-is img {
  width: 35px;
  cursor: pointer;
}

.v-overlay__scrim {
  background-color: none !important;
}

#dummy_id {
  opacity: 0;
  width: 0;
}

/* 
.height_modal {
  height: 260px;
  border-top-left-radius: 40px;
  border-top-right-radius: 20px;
} */

.footer-shared {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.footer-shared-copy {
  padding: 15px 20px;
  border-top: 1px solid #d8d8d8;
  width: 100%;
  text-align: center;
  margin-top: 20px;
  border-bottom: 1px solid #d8d8d8;
  font-weight: 700;
  font-size: 1.3rem;
  color: #404961;
}

.footer-shared-done {
  padding: 15px 20px;
  width: 100%;
  text-align: center;
  font-weight: 700;
  font-size: 1.3rem;
  color: #4a9ace;
}

.video-search-play {
  color: white !important;
}

.video-search-pause {
  color: white !important;
}

.no-video {
  display: none;
}

.video-show {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}

.imagen-show {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}

.no-image {
  display: none;
}

.dispaly-button {
  padding: 15px 20px;
  font-weight: 700;
  font-size: 1.3rem;
  color: #404961;
  border-bottom: 1px solid #d8d8d8;
  width: 100%;
  text-align: center;
}

.buttonPlay {
  width: 35px;
  height: 35px;
  background-color: #3898ec;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 5px;
}

@media (max-width: 640px) {

  .buttonPlay {
    width: 45px;
    height: 45px;
  }

  .height_modal {
    height: 100%;
    display: flex;
  /*   margin: 0px 25px; */
    flex-direction: column;
    inline-size: auto;
    border-radius: 20px;
  }

  .qr-contain__bg {
    width: 46px;
    height: 46px;
    border-radius: 9px;
  }

  .qr-icon {
    font-size: 28px !important;
  }

  .social-items {
    padding: 0px;
    margin: 0;
    padding-top: 20px;
    padding-left: 20px;
  }

  .container-modal {
    height: 100% !important;
  }

  .container-modal-2 {
    height: 320px !important;
  }

  .div-img {
    height: 35vh;
    width: 90%;
  }

  .footer-shared-copy {
    padding: 12px 12px;
  }

  .footer-shared-done {
    padding: 12px 12px;
  }

  .container-modal__section2 {
    width: 100%;
    height: 100%;
    /*   place-items: center; */
  }

  .img__social-social img {
    width: 35px !important;
  }

  .social-item img {
    width: 45px;
    cursor: pointer;
  }

  #style-item::-webkit-scrollbar {
    display: none;
  }
}
</style>
