<template>
  <div class="text-center">
    <v-dialog v-model="activeModalLogin" persistent content-class="ma-0 content-login" width="360px">
      <v-form ref="form" :v-model="valid" lazy-validation>
        <v-card class="rounded-lg mx-auto" style="background-color: #ffffffe6" width="100%">
          <v-card-text class="pa-5">
            <div class="header">
              <div @click="showCode">
                <v-img width="160px" :src="require('~/assets/img/png/login/shareity.png')"></v-img>
              </div>
              <div>
                <v-img @click="openModalCloseLogin()" :src="require('~/assets/img/svg/cancel-gray.svg')"
                  class="close_card_login"></v-img>
              </div>
            </div>
            <div v-show="phoneShow" class="phoneShow">
              <p v-if="createNoLogin === 'succes'" class="text">
                Enter your phone number and we'll send you a login code to take
                credit for your challenge
              </p>
              <p v-else class="text">
                Enter your phone number and we'll send you a login code
              </p>
              <div class="caption">Phone number</div>
              <vue-phone-number-input size="lg" id="importan_input" default-country-code="US" @update="onUpdate"
                v-model="phone" :error="!results.isValid" />
              <v-btn block class="rounded-lg py-4 mt-6 text-capitalize buttomLogin" style="
                  height: 50px;
                  display: flex;
                  margin-top: 10px;
                  background-color: #33a9f2;
                " color="primary" :disabled="!results.isValid" @click="sendPhone()">
                <div style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  " v-show="loadingStatus">
                  <img width="25px" :src="require('~/assets/img/loader.gif')" />
                  Loading...
                </div>
                <p class="continueBottom" style="margin: 0" v-show="!loadingStatus">
                  Continue
                </p>
              </v-btn>
            </div>
            <div v-show="codeShow" class="codeShow">
              <p class="text">
                We've just sent a 6-digit code to your mobile number
              </p>

              <p class="text">
                {{ editPhoneNumber }}
                <v-icon color="#33A9F2" style="cursor: pointer" @click="editNumber()">mdi-pencil</v-icon>
              </p>
              <v-text-field v-show="infoLogin" label="Name" hide-details="auto" v-model="nameUser"></v-text-field>
              <v-text-field class="input_code" label="Code" v-show="code" :rules="codeRules" hide-details="auto"
                v-model="verificationCode" data-form-type="otp" d="p_m_f_t_o_u_code_confirm" type="number"
                max="6"></v-text-field>
              <v-btn block class="sendcode mb-5" style="height: 50px !important; background: #33a9f2" @click="
      sendCode({
        number: infoPhoneNumber,
        code: verificationCode,
        name: nameUser,
      })
      ">
                Continue
              </v-btn>
              <button :disabled="!resendCode" @click="sendPhone()" class="btn-resend">
                <span v-if="!!resendCode">Request code</span>
                <span v-else>Request a new code in... {{ resendSeconds }}</span>
              </button>
            </div>
            <div v-show="inputName" class="codeShow">
              <v-text-field label="Name" hide-details="auto" v-model="nameUser"></v-text-field>
              <v-btn block class="sendcode" style="" @click="updateNameProfile()">
                Continue
              </v-btn>
            </div>
          </v-card-text>
          <v-card-actions class="cardInfo">
            <p class="caption-mini d-flex">
              We do not share phone numbers with anyone. You can delete your
              data at any time.
            </p>

            <v-img class="ml-2" style="width: 30px; height: 30px; align-self: flex-end"
              @click="$nuxt.$emit('UseTerms1', true)" :src="require('~/assets/img/svg/info_icon_blue.svg')"></v-img>
          </v-card-actions>
        </v-card>
      </v-form>
      <LoadingChallenge :active="active" :file="fileSize" :countDown="countDown" :progress="progressBar"
        :itemChallange="item" />
    </v-dialog>
  </div>
</template>

<script>
/* Vuex Store */
import { mapGetters, mapActions, mapState } from "vuex";
import LoadingChallenge from "@/components/LoadingChallenge.vue";
export default {
  components: {
    LoadingChallenge,
  },
  data() {
    return {
      resendCode: false,
      resendMilliseconds: 25000,
      resendSeconds: 25,
      activeModalLogin: false,
      nameUser: "",
      verificationCode: "",
      isCode: false,
      valid: true,
      validPhone: false,
      phone: null,
      validCode: false,
      phoneShow: true,
      codeShow: false,
      results: { isValid: false },
      formattedNumber: "",
      loadingStatus: false,
      isNew: null,
      createNoLogin: "",
      file: "",
      item: "",
      progress: 0,
      active: false,
      typeOfMedia: 0,
      activeModalBackground: false,
      userId: null,
      from: "",
      resId: null,
      code: true,
      inputName: false,
      sharedLink: "",
      codeRules: [
        (value) => !!value || "Required",
        (value) => (value && value.length == 6) || "6 characters",
      ],
      countDown: null,
      completeAnimation: null,
      completeChallenge: null,
      one: 0,
      codeAlert: null,
      challengeRes: null,
      fileSize: null,
      codeNumber: null
    };
  },
  watch: {
    code() {
      this.validCode = this.userExist
        ? this.code.length === 6
        : this.code.length === 6 && this.name.length > 2;
    },
    name() {
      this.validCode = this.userExist
        ? this.code.length === 6
        : this.code.length === 6 && this.name.length > 2;
    },
    countDown(value) {
      console.log('CONTADOR ANIMATION ==>', value)
      console.log('this.progressBar', this.progressBar)
      this.completeAnimation = value;
      if (this.completeChallenge === "noPromotional" && value <= 0) {
        setTimeout(() => {
          this.$nuxt.$emit("openLoading", false);
          this.active = false;
          this.$router.push({
            path: `/challenges/${this.item.challenge.id}/communities`,
            query: { shared: true, u: this.resId.id, id: this.challengeRes.id, donate: true },
          });
        }, 800);
      }
      if (this.completeChallenge === "Promotional" && value <= 0) {
        setTimeout(() => {
          this.$nuxt.$emit("openLoading", false);
          this.active = false;
          this.$router.push({
            path: `/challenges/${this.item.id}/communities`,
            query: { shared: true, u: this.resId.id, id: this.challengeRes.id, donate: true },
          });
        }, 800);
      }
    },
    completeChallenge(value) {
      this.completeChallenge = value;

      if (value === "noPromotional" && this.completeAnimation <= 0) {
        setTimeout(() => {
          this.active = false;
          this.$router.push({
            path: `/challenges/${this.item.challenge.id}/communities`,
            query: { shared: true, u: this.resId.id, id: this.challengeRes.id, donate: true },
          });
        }, 800);
      }
      if (value === "Promotional" && this.completeAnimation <= 0) {
        setTimeout(() => {
          this.active = false;
          this.$router.push({
            path: `/challenges/${this.item.id}/communities`,
            query: { shared: true, u: this.resId.id, id: this.challengeRes.id, donate: true },
          });
        }, 800);
      }
    },
  },
  computed: {
    ...mapGetters("challenges", ["challengeProcess"]),
    ...mapGetters("login", ["infoLogin", "infoPhoneNumber", "toAccess"]),
    ...mapState("login", ["showModalLogin", "editPhoneNumber"]),
    ...mapState("createUserChallenge", ["progressBar"]),
  },
  methods: {
    ...mapActions("login", [
      "setLoginFrom",
      "setPhoneNumber",
      "setVerifyCode",
      "openCloseLogin",
    ]),
    ...mapActions("createUserChallenge", ["createUserChallengeAction"]),
    ...mapActions("user", ["setUser", "nicknameAction"]),
    onUpdate(payload) {
      this.results = payload;
    },
    openModalCloseLogin() {
      if (this.createNoLogin === "succes") {
        this.$nuxt.$emit("FullScreenLoginChallenge", [false])
        this.$nuxt.$emit("fullScreenDefinitive", { status: false, closetLogn: true });
        this.activeModalLogin = false;

      } else {
        this.activeModalLogin = false;
      }

      document.body.style.overflow = "initial";
    },
    sendPhone() {
      this.setPhoneNumber({ value: this.results.formattedNumber.slice(1) });
      this.loadingStatus = true;
      this.setLoginFrom({
        number: this.infoPhoneNumber,
        idDevice: this.infoPhoneNumber,
      }).then((resp) => {
        console.log('this.infoPhoneNumber', this.infoPhoneNumber)
        console.log('resp.code', resp.code)
        this.codeNumber = resp.code
        this.isNew = resp.isNew;
        this.codeAlert = resp.code;
        this.$axios.$post(`/stats/record`, { id: localStorage.getItem("recordStepId"), step: "SHARE_NAME" });
        this.phoneShow = false;
        this.codeShow = true;

        this.$axios.$post(`/stats/record`, { id: localStorage.getItem("recordStepId"), step: "SHARE_NAME" });

      });

      // contador para reenviar codigo
      this.resendSeconds = 25;
      this.resendCode = false;

      var intervalID = setInterval(() => {
        if (!this.resendCode) this.resendSeconds--;
      }, 1000);

      setTimeout(() => {
        this.resendCode = true;
        clearInterval(intervalID);
      }, this.resendMilliseconds);
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
        return "se termino";
      }
    },
    countProgress() {
      if (this.progress < 90) {
        this.progress += 1.88 * 2.4
      }
      if (this.progress > 0) {
        setTimeout(() => {
          /*  this.progress -= 1 */
          this.countProgress()
        }, 1000)
        return 'se termino'
      }
    },
    showCode() {
      if (this.codeAlert) {
        this.one += 1;
        if (this.one === 3) {
          this.one = 0;
          alert("Code:" + "  " + this.codeAlert);
        }
      }
    },
    sendCode(number, code, name) {
      this.setVerifyCode(number, code, name).then((res) => {
        console.log('res', res)
        this.resId = res;
        if (this.createNoLogin === "succes") {
          this.active = true;
          console.log('entro aqui')
          this.countDownTimer();
          this.countProgress()
          console.log('DURATION ANIMATION ==>', this.countDown)
          if (this.from === "noPromotional") {
            if (this.file.type == "video/mp4" || this.file.type == "video/MOV" || this.file.type == "video/3GP" || this.file.type == "video/AVI" || this.file.type == "video/quicktime") {
              this.createUserChallengeAction({
                userId: this.item.user.id,
                file: this.file,
                idchallenge: this.item.challenge.id,
                idUser: res.id,
                idShare: this.sharedLink || "",
              }).then((res) => {
                this.challengeRes = res
                this.$axios.$post(
                  `/stats/record`,
                  {
                    id: localStorage.getItem("recordStepId"),
                    step: "SHARE_FINISHED",
                  },
                  {
                    Headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );

                if (res) {
                  this.completeChallenge = "noPromotional";
                }
              }).catch((error) => {
                console.log('error', error)
              })
            }
            if (
              this.file.type == "image/jpeg" ||
              this.file.type == "image/jpg" ||
              this.file.type == "image/png" ||
              this.file.type == "image/gif"
            ) {
              this.createUserChallengeAction({
                userId: this.item.user.id,
                file: this.file,
                idchallenge: this.item.challenge.id,
                idUser: res.id,
                idShare: this.sharedLink || "",
              }).then((res) => {
                console.log('res', res)
                if (res) {
                  this.challengeRes = res
                  this.active = true;
                  this.completeChallenge = "noPromotional";
                }
              })
            }
          } else {
            if (
              this.file.type == "video/mp4" ||
              this.file.type == "video/MOV" ||
              this.file.type == "video/3GP" ||
              this.file.type == "video/AVI" ||
              this.file.type == "video/quicktime"
            ) {
              this.createUserChallengeAction({
                file: this.file,
                idchallenge: this.item.id,
                idUser: res.id,
                idShare: this.sharedLink || "",
              }).then((res) => {
                if (res) {
                  this.challengeRes = res
                  this.active = true;
                  this.completeChallenge = "Promotional";
                }
              }).catch((error) => {
                console.log('entro aqui')
                console.log('error', error?.response)
                console.log('error', error?.data)
              })
            }
            if (
              this.file.type == "image/jpeg" ||
              this.file.type == "image/jpg" ||
              this.file.type == "image/png" ||
              this.file.type == "image/gif"
            ) {
              this.createUserChallengeAction({
                file: this.file,
                idchallenge: this.item.id,
                idUser: res.id,
                idShare: this.sharedLink || "",
              }).then((res) => {
                console.log('res', res)
                this.challengeRes = res
                this.active = true;
                this.completeChallenge = "Promotional";
              }).catch((error) => {
                console.log('error', error)
              })
            }
          }
        } else {
          this.activeModalLogin = false;
          this.$nuxt.$emit("renderNotification", "render");
          location.reload();
        }
      });
    },
    editNumber() {
      this.phoneShow = true;
      this.codeShow = false;
      this.loadingStatus = false;
    },

    setPhone(val) {
      this.validPhone = val.isValid;
      this.dataPhone = val;
    },
    resend() {
      this.isCode = false;
    },
    send() {
      if (this.validPhone) {
        let data = {
          idUsr: null,
          idCamp: this.challengeProcess.challenge.id,
          phone:
            this.dataPhone.countryCallingCode + this.dataPhone.nationalNumber,
        };
        this.sendNumber(data).then((res) => {
          this.userExist = res.data_user.user_exist;
          this.dataUser = res.data_user;
          this.isCode = true;
        });
      }
    },
    login() {
      if (this.validCode) {
        let data = {
          idUsr: this.dataUser.user_actual.id,
          code_sms_active: this.code,
          Fname: this.name,
          Lname: "",
        };
        this.confirmCode(data).then((res) => {
          this.setUser(res.data);
          this.view = false;
          this.show = false;
          this.$nuxt.$emit("continueChallenge", true);
        });
      }
    },
    updateNameProfile() {
      this.$axios
        .$post("/user/update", {
          id: this.userId,
          firstName: this.nameUser,
        })
        .then(() => {
          localStorage.setItem('username', this.$route.query.nickname)
          if (this.from == "noPromotional") {
            if (this.file.type == "video/mp4" || this.file.type == "video/MOV" || this.file.type == "video/3GP" || this.file.type == "video/AVI" || this.file.type == "video/quicktime") {
              this.active = true;
              this.createUserChallengeAction({
                userId: this.userId,
                file: this.file,
                idchallenge: this.item.challenge.id,
                idUser: this.userId,
              }).then((res) => {
                setTimeout(() => {
                  this.$nuxt.$emit("openLoading", false);
                  this.active = false;

                  this.$router.push({
                    path: `/challenges/${this.item.challenge.id}/communities`,
                    query: { shared: true, u: res.user.id },
                  });
                }, 3000);
              });
            }
            if (
              this.file.type == "image/jpeg" ||
              this.file.type == "image/jpg" ||
              this.file.type == "image/png" ||
              this.file.type == "image/gif"
            ) {
              this.active = true;
              this.createUserChallengeAction({
                userId: this.userId,
                file: this.file,
                idchallenge: this.item.challenge.id,
                idUser: this.userId,
              }).then((res) => {
                setTimeout(() => {
                  /*   this.$nuxt.$emit("FullScreenLoginChallenge", [false]); */
                  this.$nuxt.$emit("openLoading", false);
                  this.active = false;
                  this.$router.push({
                    path: `/challenges/${this.item.challenge.id}/communities`,
                    query: { shared: true, u: res.user.id },
                  });
                }, 2000);
              });
            }
          } else {
            if (
              this.file.type == "video/mp4" ||
              this.file.type == "video/MOV" ||
              this.file.type == "video/3GP" ||
              this.file.type == "video/AVI" ||
              this.file.type == "video/quicktime"
            ) {
              this.active = true;
              this.createUserChallengeAction({
                file: this.file,
                idchallenge: this.item.id,
                idUser: this.userId,
              }).then((res) => {
                setTimeout(() => {
                  /*   this.$nuxt.$emit("FullScreenLoginChallenge", [false]); */
                  this.$nuxt.$emit("openLoading", false);
                  this.active = false;

                  this.$router.push({
                    path: `/challenges/${this.item.id}/communities`,
                    query: { shared: true, u: res.user.id },
                  });
                }, 3000);
              });
            }
            if (
              this.file.type == "image/jpeg" ||
              this.file.type == "image/jpg" ||
              this.file.type == "image/png" ||
              this.file.type == "image/gif"
            ) {
              this.active = true;
              this.createUserChallengeAction({
                file: this.file,
                idchallenge: this.item.id,
                idUser: this.userId,
              }).then((res) => {
                setTimeout(() => {
                  /*    this.$nuxt.$emit("FullScreenLoginChallenge", [false]); */
                  this.$nuxt.$emit("openLoading", false);
                  this.active = false;
                  this.$router.push({
                    path: `/challenges/${this.item.id}/communities`,
                    query: { shared: true, u: res.user.id },
                  });
                }, 2000);
              });
            }
          }
        });
    },
    openCode() {
      (this.phoneShow = false), (this.codeShow = true);
    },
    closeModalLogin() {
      this.activeModalLogin = false;
    },
  },
  created() {
    this.$nuxt.$on("openLogin", (option) => {
      this.nicknameAction().then((user) => {
        this.userId = user.id;
      });
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
      this.countDown = option[2]?.challenge?.sponsors[0]?.animation?.duration / 1000 || option[2]?.sponsors[0]?.animation?.duration / 1000 || 5;
      this.from = option[4];
      this.activeModalLogin = option[0];
      var sizeInMB = (option[1]?.size / (1024 * 1024)).toFixed(2);
      this.fileSize = sizeInMB
      this.file = option[1]
      this.item = option[2];
      this.typeOfMedia = option[2];
      this.createNoLogin = option[3];
      this.sharedLink = option[5];
      if (this.createNoLogin === "succes") {
        this.activeModalBackground = true;
      }

      if (this.$route.query.nickname && !localStorage.getItem('username')) {
        this.nicknameAction(this.$route.query.nickname).then((response) => {
          if (response.firstName == "null") {
            this.userId = response.id;
            this.phoneShow = false;
            this.codeShow = false;
            this.inputName = true;
          }
        });
      }
      this.$axios.$post(
        `/stats/record`,
        {
          id: localStorage.getItem("recordStepId"),
          step: "SHARE_NUMBER",
        },
        {
          Headers: {
            "Content-Type": "application/json",
          },
        }
      );
      /*   this.phoneShow = option; */
    });
  },
};
</script>

<style>
.header {
  justify-content: space-between;
  display: flex;
}

.country-selector.lg.has-value .country-selector__input {
  padding-top: 0px !important;
}

.country-selector__input {
  background: transparent !important;
}

.vue-phone-number-input.lg .select-country-container {
  flex: 0 0 98px !important;
  min-width: 98px !important;
  max-width: 98px !important;
}

.country-selector__country-flag {
  top: 20px !important;
}

.country-selector__label {
  visibility: hidden;
  display: none;
}

.theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
  background-color: #33a9f2 !important;
  opacity: 0.5 !important;
  font-size: 12pt;
  color: white !important;
}

.v-application .primary {
  background-color: #33a9f2 !important;
  opacity: 1 !important;
  font-size: 12pt;
  color: white !important;
}

.text {
  font-size: 17px;
  font-family: "poppinsregular";
  font-weight: 900;
  color: gray;
  text-shadow: none;
  margin-bottom: 10px;
}

.continueBottom {
  font-size: 16px;
  font-family: "Arial";
}

.caption {
  font-size: 13.3333px;
  font-family: "poppinsregular";
  font-weight: 900;
  color: gray;
  text-shadow: none;
  margin-bottom: 10px;
}

.close_card_login {
  position: relative;
  width: 16px;
}

.title {
  font-family: "poppinsbold";
  font-weight: 900;
  font-size: 18pt;
  color: black;
}

.caption-mini {
  font-family: poppinsregular;
  color: gray;
  font-size: 9px;
  margin: 0;
}

.ver_fonSizw {
  font-size: 21px !important;
}

.resend {
  font-family: poppinsbold;
  color: gray;
  font-size: 14px;
}

.sendcode {
  font-family: "Roboto", sans-serif;
  margin: 10px 0;
  height: 90px !important;
  color: white !important;
  background: #1976d2;
}

.cardInfo {
  padding: 0 20px 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

input.input-tel__input {
  font-size: 20px !important;
  background: transparent !important;
}

.importan_input {
  div {
    div {
      div {
        input {
          .input-tel__input {
            font-size: 50px !important;
          }
        }
      }
    }
  }
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}

.input_code {
  font-size: 20px !important;
}

.btn-resend {
  display: block;
  width: 100%;
  text-align: center;
  color: #33a9f2;
}

.btn-resend:hover {
  color: #0a84e8;
}

.btn-resend:disabled {
  color: gray;
}

@media (max-width: 640px) {
  .content-login.v-dialog {
    width: 90% !important;
  }
}
</style>
