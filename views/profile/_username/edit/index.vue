<template>
  <v-container :style="{ width: windowWidthT + 'px' }" class="containerFather">
    <div class="header">
      <!--  <div class="overlay"></div> -->
      <div class="header_back">
        <!--  <v-btn class="button-close" width="35px" height="35px" fab dark color="#33a9f2b3" @click="$router.back()">
          <v-icon size="25px" dark> mdi-arrow-left </v-icon>
        </v-btn> -->
        <div class="ripple">
          <img @click="$router.back()"
            style="width: 35px; border-radius: 100%; object-fit: contain; box-shadow: 0px 4px 4px 0px #00000040;"
            src="@/assets/img/button-float/backwhite.png" alt="">
        </div>
      </div>
      <p class="header_title">Edit Profile</p>
      <div class="header_menu">
        <template>
          <div class="text-center">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="white" v-bind="attrs" v-on="on" large>
                  mdi-menu
                </v-icon>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in items" :key="index" link @click="menuClick(item.option)">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </template>
      </div>
    </div>
    <div class="text-center">
      <v-dialog v-model="verificationNumberEmail" persistent content-class="ma-0 content-login" width="360px">
        <div class="container-code-verify">
          <div class="header-modal-verify">
            <div>
              <v-img width="160px" :src="require('~/assets/img/png/login/shareity.png')"></v-img>
            </div>
            <div>
              <v-img @click="openModalCloseVerifyEmail()" :src="require('~/assets/img/svg/cancel-gray.svg')"
                class="close_card_login"></v-img>
            </div>
          </div>
          <div class="codeShow">
            <p style="
                font-size: 15px;
                margin: 0;
                color: gray;
                font-family: 'poppinsregular';
                font-weight: 900;
              ">
              Email verification
            </p>
            <p class="text">
              We've just sent a 6-digit code to your mobile number
            </p>

            <p class="text">
              {{ userData?.phone }}
              <!-- <v-icon color="#33A9F2" style="cursor: pointer" @click="editNumber()">mdi-pencil</v-icon> -->
            </p>
            <!-- <v-text-field v-show="infoLogin" label="Name" hide-details="auto" v-model="nameUser"></v-text-field> -->
            <p v-show="error.code" style="
                color: red;
                font-family: 'poppinsregular';
                font-weight: 900;
              ">
              {{ error.code }}
            </p>
            <v-text-field class="input_code" label="Code" hide-details="auto" data-form-type="otp"
              d="p_m_f_t_o_u_code_confirm" type="number" max="6" v-model="sendCodeMesage"></v-text-field>
            <v-btn @click="sendcode" block class="sendcode mb-5" style="height: 50px !important; background: #33a9f2">
              Continue
            </v-btn>
            <!-- <button :disabled="!resendCode" @click="sendPhone()" class="btn-resend">
              <span v-if="!!resendCode">Request code</span>
              <span>Request a new code in...</span>
            </button> -->
          </div>
        </div>s
      </v-dialog>
    </div>
    <div class="contend-input-data">
      <div class="avatar">
        <div class="avatar-profile">
          <div v-if="preview" :class="!preview ? 'card-avatar-png' : 'card-avatar-user-png'" style="width: 115px; height: 100px;">
            <img :src="preview" type="file" @click="$refs.fileInput.click() "  style="cursor: pointer;">
            <input ref="fileInput" style="display: none" type="file" @change="changeImage" @input="changedInputs" accept="image/*" />
            </img>
          </div>

          <div v-if="!preview":class="!userData.image ? 'card-avatar-png' : 'card-avatar-user-png'" style="width: 115px; height: 100px;">
            <img :src="!userData.image ? require('~/assets/img/png/userfeed-2.png') : urlBucket + userData.image
    " type="file" @click="$refs.fileInput.click()"  style="cursor: pointer;">
            <input ref="fileInput" style="display: none" type="file" @change="changeImage" accept="image/*" @input="changedInputs" />
            </img>
          </div>

        </div>
        <button @click="$refs.fileInput.click()" class="button-edit-photo">
          New Photo
        </button>
        <!-- <elements-buttons-buttonsprofile @click="$refs.fileInput.click()" text="New photo" class=" bg-save" /> -->
        <!-- <elements-buttons-buttonsprofile text="Edit" class="bg-save" /> -->
      </div>
      <div class="contend-divder">
        <div class="input-divder">
          <div class="input-divder__name" style="    border-right: 1px solid #c3c3c3;">Firts Name</div>
          <input class="input-divder__input" ref="firstName" name="firstName" v-model="userData.firstName" type="text"
            v-on:input="changedInputs" />
        </div>
        <div class="input-divder">
          <div class="input-divder__name" style="    border-right: 1px solid #c3c3c3;">Last Name</div>
          <input class="input-divder__input" ref="lastName" v-model="userData.lastName" type="text"
            v-on:input="changedInputs" />
        </div>
        <div class="input-divder">
          <div class="input-divder__name" style="    border-right: 1px solid #c3c3c3;">User Name</div>
          <input class="input-divder__input" ref="username" type="text" v-model="userData.username"
            v-on:input="changedInputs" />
        </div>
        <div class="input-divder">
          <div class="input-divder__name" style="    border-right: 1px solid #c3c3c3;">About me</div>
          <input class="input-divder__input" ref="bio" v-model="userData.bio" type="text" v-on:input="changedInputs" />
        </div>
      </div>
      <div class="contend-info">
        <p>Contact info</p>
        <div class="contend-divder">
          <div>
            <div class="input-divder">
              <div class="input-divder__name" style="    border-right: 1px solid #c3c3c3;">Email</div>
              <input class="input-divder__input" :style="error.email ? ' border:1px solid red' : ''" ref="email"
                v-model="userData.email" type="email" v-on:input="verifyEmailAndPhone" />
            </div>
            <p style="color: red; font-size: 12px; padding: 0; margin: 0">
              {{ error.email }}
            </p>
          </div>

          <div class="input-divder">
            <div class="input-divder__name" style="    border-right: 1px solid #c3c3c3;">Phone</div>
            <input class="input-divder__input" ref="phone" v-model="userData.phone" type="text"
              v-on:input="changedInputs" disabled style="color: rgb(166, 166, 166)" />
          </div>
          <div class="input-divder cutsom-gender">
            <v-select label="Gender" style="width: 80%; height: 47px" outlined dense ref="gener"
              v-model="userData.gender" :items="options" v-on:input="changedInputs">
            </v-select>
          </div>
        </div>
      </div>
      <div class="contend-info">
        <p>Profile</p>
        <div class="input-divder">
          <div class="input-divder__name" style="    border-right: 1px solid #c3c3c3;">URL</div>
          <input class="input-divder__input" type="text" :value="urlApp + '/profile/' + userData.username" ref="url"
            v-on:focus="$event.target.select()" />
        </div>

        <button @click="copy(), (sheet = !sheet)" class="button-edit-copy">
          Copy
        </button>
      </div>
      <!-- <v-btn @click="save" color="blue" background="blue" text > Save </v-btn> -->
      <button @click="save" class="button-edit" v-if="isFocus">Save</button>
    </div>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Shareity </v-card-title>
        <v-card-text>
          Are you sure you want to delete your account it will erase all
          progress and any money raised. If you would not like to be part of
          specific campaigns anymore then click here to opt out of individual
          campaigns
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="deleteAccountAction(userData.id)">
            Delete
          </v-btn>
          <v-btn color="blue" text @click="dialog = false"> Cancel </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <template v-if="loading">
      <div data-app>
        <Loading :active="loading" />
      </div>
    </template>
  </v-container>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  layout(context) {
    return "Modal";
  },

  data() {
    return {
      rules: {
        required: (value) => !!value || "Required.",
      },
      isFocus: false,
      sheet: false,
      enlace: "https://my.shareity.com/?",
      selected: "",
      img: "",
      dialog: false,
      options: [
        { text: "F", value: "F" },
        { text: "M", value: "M" },
        {
          text: "N/A",
          value: "N/A",
        },
      ],
      items: [
        { title: "Log Out", option: 1 },
        { title: "Delete Account", option: 2 },
      ],
      userData: {
        id: "",
        firstName: "",
        lastName: "",
        username: "",
        bio: "",
        email: "",
        phone: "",
        gender: "",
        image: "",
      },
      valorEmail: "",

      image: "",
      preview: "",
      id: "",
      loading: false,
      verificationNumberEmail: false,
      sendCodeMesage: "",
      codeMessage: null,
      error: {
        email: null,
        code: null,
      },
      emailForm: null,
    };
  },
  head() {
    return {
      meta: [
        {
          hid: "og:image",
          property: "og:image",
          content: this.urlBucket + this.userData.imagen,
        },
      ],
    };
  },
  computed: {
    ...mapState("phoneSize", ["windowWidthT", "windowLeftT"]),
    ...mapGetters("login", ["$cookies.get('username')"]),
    ...mapGetters("user", ["getUserData"]),
    urlBucket() {
      return process.env.api_assets_url;
    },
    urlApp() {
      return process.client && window.location.origin;
    },
  },

  methods: {
    ...mapActions("user", ["userDataAction"]),
    ...mapActions("phoneSize", ["onRezise"]),
    ...mapActions("user", ["deleteAccountAction", "nicknameAction"]),
    ...mapActions("login", ["setLoginFrom", "setPhoneNumber", "setVerifyCode"]),

    onFileSelect(e) {
      const file = e.target.files[0];
      this.img = URL.createObjectURL(file);
    },
    changeImage(e) {
      this.image = e.target.files[0];
      this.preview = URL.createObjectURL(this.image);
    },
    sendcode(name, code, number) {
      console.log("this.codeMessage", this.codeMessage);

      if (!this.sendCodeMesage) {
        console.log("No pasa");
      } else if (this.codeMessage) {
        console.log("this.userData.phone", this.userData.phone);
        console.log("this.userData.phone", this.codeMessage);
        let number = this.userData.phone;
        let code = this.codeMessage;
        let name = null;
        this.setVerifyCode({ number, code, name })
          .then((res) => {
            this.$axios
              .$post("/user/update", {
                id: this.userData.id,
                email: this.emailForm,
              })
              .then((res) => {
                if (this.sendCodeMesage != res.code) {
                  this.error.code = "Invalid Code";
                } else {
                  console.log("Codigo", res.code);
                  this.loading = true;
                  console.log("rlo que envio", res.imagen);
                  setTimeout(() => {
                    this.loading = false;
                    this.userData = this.getUserData;
                    this.$router.back();
                  }, 2000);
                  return;
                }
              })
              .catch((err) => console.log("🚧 catch", err));
          })
          .catch((error) => {
            alert("Error");
            this.$router.back();
          });
      }
    },
    save(e) {
      e.preventDefault();
      let regexEmail =
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      console.log("this.$refs.email?.value", this.valor);
      if (this.valorEmail) {
        if (!regexEmail.test(this.$refs.email?.value)) {
          this.error.email = "Please enter a valid email address";
        } else {
          this.verificationNumberEmail = true;
          this.emailForm = this.$refs.email.value;

          this.setLoginFrom({
            number: this.userData.phone,
            idDevice: this.userData.phone,
          }).then((res) => {
            console.log("res", res);
            this.codeMessage = res.code;
          });
          return;
        }
      } else {
        this.verificationNumberEmail = false;
        this.$axios
          .$post("/user/update", {
            id: this.userData.id,
            firstName: this.userData.firstName,
            lastName: this.userData.lastName,
            username: this.userData.username,
            bio: this.userData.bio,
            gender: this.userData.gender,
          })
          .then((res) => {
            this.loading = true;
            console.log("rlo que envio", res.imagen);
            setTimeout(() => {
              this.loading = false;
              this.userData = this.getUserData;
              console.log("que me traes aca que tengo duda", this.getUserData);
              this.$router.back();
            }, 2000);
          })
          .catch((err) => console.log("🚧 catch", err));
        let data = new FormData();
        data.append("file", this.image);
        data.append("id", this.id);

        let config = {
          header: {
            "Content-Type": "multipart/form-data",
          },
        };
        console.log("AYUDASDASASD", this.image);
        this.$axios
          .$post("/user/update-photo", data, config)
          .then((response) => {
            this.userDataAction.then((res) => {
              console.log("imagen que envio", response);
              this.loading = false;
              this.$router.back();
            });
          });
      }
    },
    openModalCloseVerifyEmail() {
      this.verificationNumberEmail = false;
    },
    verifyEmailAndPhone(e) {
      this.isFocus = true;
      this.valorEmail = e.target.value;
      /* this.verificationNumberEmail = true
 
      console.log('this.user', this.userData.phone)
      this.setLoginFrom({
        number: this.userData.phone,
        idDevice: this.userData.phone,
      }).then((res) => {
        this.codeMessage = res.code
        console.log('setLoginFrom', res)
      })
      console.log("TRUE TRUE TRUE TRUE TRUE ", this.verificationNumberEmail); */
      /*  if (this.$refs.email?.value) {
         return
       }
       if (this.$refs.email?.value === null) {
         this.verificationNumberEmail = false
         return
       } */
    },
    changedInputs(e) {
      // if (e.target.value) {
      //   console.log("probanod",e.target.value);
      // }
      this.isFocus = true;
      // this.valor = e.target.value

      console.log("eSIIIIIIIII");
    },

    copy() {
      this.$refs.url.focus();
      document.execCommand("copy");
    },
    menuClick(option) {
      if (option === 1) {
        /*  this.$cookies.removeAll(); */
        localStorage.clear();
        window.location.reload();
      } else {
        this.dialog = true;
      }
    },
  },

  created() {
    this.nicknameAction().then((user) => {
      this.id = user.id;
      if (!user.id) {
        this.$router.push("/");
      }
      this.user = this.$auth.$storage.getLocalStorage("user");
      this.checkDataUrl();
      if (!user.id) {
        /*   this.$cookies.removeAll(); */
        localStorage.clear();
        this.$router.push("/");
      }
      console.log("viendo", user);
      this.userData.id = user.id;
      this.userData.firstName = user.firstName;
      this.userData.lastName = user.lastName;
      this.userData.username = user.username;
      this.userData.bio = user.bio;
      this.userData.email = user.email;
      this.userData.phone = user.phone;
      this.userData.gender = user.gender;
      this.userData.image = user.imagen;
    });
  },
  mounted() {
    this.onRezise();
  },
};
</script>
<style>
.cutsom-gender>.v-input>.v-input__control>.v-input__slot>fieldset {
  border: none !important;
}
</style>
<style scoped>
.contend-divder {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.container-code-verify {
  padding: 20px;
  background-color: white;
}

.header-modal-verify {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.phoneShow {
  position: absolute;
}

.contend-info p {
  color: #2f4b75;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
}

.bg-save {
  color: white !important;
  background: rgb(2, 62, 116);
  background: linear-gradient(0deg, rgba(2, 62, 116, 1) 19%, rgba(19, 166, 221, 1) 100%);
  border: 0px !important;
  font-size: 18px !important;
  padding: 5px !important;
  border-radius: 9px !important;
  width: 110px;
  margin: 0 auto;
}



.button-edit {
  color: white !important;
  background: rgb(2, 62, 116);
  background: linear-gradient(0deg, rgba(2, 62, 116, 1) 19%, rgba(19, 166, 221, 1) 100%);
  border: 0px !important;
  font-size: 15px !important;
  padding: 5px !important;
  border-radius: 9px !important;
  width: 110px;
  margin: 0 auto;
}

.button-edit-photo {
  color: white !important;
  background: rgb(2, 62, 116);
  background: linear-gradient(0deg, rgba(2, 62, 116, 1) 19%, rgba(19, 166, 221, 1) 100%);
  border: 0px !important;
  font-size: 14px !important;
  padding: 5px !important;
  border-radius: 9px !important;
  width: 98px;
  margin: 0 auto;
}

.button-edit-copy {
  color: white !important;
  background: rgb(2, 62, 116);
  background: linear-gradient(0deg, rgba(2, 62, 116, 1) 19%, rgba(19, 166, 221, 1) 100%);
  border: 0px !important;
  font-size: 14px !important;
  padding: 5px !important;
  border-radius: 9px !important;
  width: 85px;
  margin-top: 7px;
}

.contend-input-data {
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  gap: 14px;
  padding: 26px;
}

.header {
  display: flex;
  justify-content: space-between;
  box-shadow: black 0px 0px 9px -6px;
  align-items: center;
  padding: 15px 20px;
  background-color: white;
  border-radius: 0px 0px 30px;
}

.header-code-verify {
  justify-content: space-between;
  display: flex;
}

.text {
  font-size: 17px;
  font-family: "poppinsregular";
  font-weight: 900;
  color: gray;
  text-shadow: none;
  margin-bottom: 10px;
}

/* .header_back,
.header_menu {
  padding: 10px;
}
 */
.avatar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.contend-info .bg-save {
  margin-top: 20px;
}

.overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
  background: linear-gradient(360deg, #fff 37.73%, #47a4e7 104.8%);
}

.header_title {
  color: #2f4b75;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  margin: 0px !important;
}

.contend-save {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.contend-save button {
  width: 30%;
}

.bg-save-gray {
  background-color: #e0e1e1 !important;
}

.input-divder {
  display: flex;
  background-color: white;
}

.input-divder__name {
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  width: 30%;

  text-align: center;
  padding: 5px;
  color: #bdbdbd;
}

.input-divder__input {
  width: 70%;
  text-align: left;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  padding: 5px;
  color: #2f4b75;
  font-weight: 600;
  padding-left: 13px;
}
</style>
<style lang="scss" scoped>
.containerFather {
  background-color: #f3f4f6;
  height: 100dvh;
  overflow-x: hidden;
  overflow-y: scroll;
}

.container {
  padding: 0 !important;
}

.v-input__control {
  color: rgb(0, 0, 0) !important;
  caret-color: rgb(2, 0, 0) !important;
}

.v-text-field--outlined>>>fieldset {
  border-color: black;
}

.v-label--active>>>fieldset {
  border-color: black !important;
}

.v-label>>>fieldset {
  border-color: black !important;
}

.v-label--active {
  border-color: black !important;
}

.v-label {
  border-color: black !important;
}

.contact {
  padding: 0 8%;
  margin: 0;
}

.profileur {
  margin-top: 10px;
}

.formtextatex {
  border-bottom: 2px solid #b5b6b757 !important;
  width: 100%;
  height: 80px;
  color: black !important;
}

.treepoint {
  padding-left: 0 !important;
  margin-right: -7px;
}

.col-3 {
  flex: 0 0 25%;
  max-width: 25%;
  line-height: 31px;
  padding: 8px;
  text-align: left;
  padding: 0;
}

.fonttype {
  font-family: "gotham_htfmedium" !important;
  color: black;
  font-size: 14px;
  font-weight: bold;
}

.data-for {
  border: none;
  color: white;
  font-size: 15px;
  width: 100%;
  background-color: transparent;
  outline: none;
}

.data-option {
  border-bottom: 2px solid #b5b6b757 !important;
  width: 95%;
  height: 30px;
  color: black !important;
}

.container-profilee {
  text-align: center;
  margin: auto;
  background: linear-gradient(90deg,
      rgba(41, 46, 50, 0) 49%,
      rgba(255, 255, 255, 0.40379901960784315) 100%) !important;
  display: flex;
  align-items: center;
}

.btn-saveprofile {
  text-align: left;
  margin: 0px 0px 0px;
}

.btn-copy {
  margin-left: -17px;
  margin-top: 12px;
}

.avatar-profile {

  margin-bottom: 5px;
}

.container-profile-phot {
  margin-bottom: 9px;
  margin-top: 9px;
}

.linea {
  border-top: 1px solid lightgray;
  width: 100%;
  padding-top: 10px;
}

.fondo {
  background-color: #04355f;
}

.typefontt {
  font-family: "Lemon/Milk";
  font-size: 0.93em;
  color: white !important;
  text-align: justify;
  padding-top: 31px;
  margin-left: -39px;
}

.steven {
  width: 35%;
  padding-left: 79px;
  padding-block: revert;
}

.button-close {
  background-color: #33a9f2 !important;
}

@media (max-width: 640px) {
  .contend-input-data {
    padding: 20px;
  }

  .containerFather {
    width: 100% !important;
  }

  .avatar {
    position: relative;
    z-index: 10;
  }

  .header {
    height: 80px;
  }

  .overlay {
    height: 250px;
    background: linear-gradient(360deg, #fff 20.73%, #47a4e7 104.8%);
  }
}
</style>
