<template>
    <div class="text-center" style="display: flex; justify-content: center; ">
        <v-dialog v-model="active" persistent content-class="ma-0" width="400">
            <v-card class="rounded-lg mx-auto modal-top" style="background-color: #ffffffe6" width="100%">
                <v-card-text class="pa-5">
                    <div class="header">
                        <div>
                            <v-img width="160px" :src="require('~/assets/img/png/login/shareity.png')"></v-img>
                        </div>
                        <p @click="closetModal">
                            x
                        </p>
                    </div>
                    <p class="text">
                        Enter your name
                    </p>
                    <div>
                        <v-text-field v-model="nameUser" :rules="[required]" class="mb-2" clearable
                            label="Name"></v-text-field>
                        <v-btn @click="updateName()" block class="sendcode mb-5" :loading="loading"
                            style="height: 50px !important; background: #33a9f2">

                            Continue
                        </v-btn>
                    </div>
                </v-card-text>
                <v-card-actions class="cardInfo">
                    <p class="caption-mini d-flex">
                        We do not share phone numbers with anyone. You can delete your
                        data at any time.
                    </p>
                    <v-img class="ml-2" style="width: 30px; cursor: pointer; height: 30px; align-self: flex-end"
                        @click="$nuxt.$emit('UseTerms1', true)" :src="require('~/assets/img/svg/info_icon_blue.svg')">
                    </v-img>
                </v-card-actions>
            </v-card>
            <div v-if="fileMedia" class="overlays">
                <div class="text-center" style="background: #27a1fd; position: relative; width: 100%; height: 100%; ">
                    <video v-if="typeMedia == 3" autoplay loop playsinline="false" class="video-fullScreen"
                        id="video-background" muted>
                        <source :src="fileMedia">
                        <source :src="fileMedia">
                    </video>
                    <img v-else style="width: 100%; height: 100%; object-fit: cover;" :src="fileMedia" alt="">
                </div>
            </div>
        </v-dialog>
        <LoadingChallenge :active="progressLaoding" :file="fileTo" :countDown="countDown" :itemChallange='item'
            :progress="progressBar" />
    </div>
</template>
<script>
import { onFile } from '../stub/functions'
import { mapActions, mapState } from "vuex";
import LoadingChallenge from "@/components/LoadingChallenge.vue";
export default {
    components: {
        LoadingChallenge
    },
    data() {
        return {
            active: false,
            file: null,
            item: null,
            userProps: null,
            loading: false,
            fileMedia: null,
            typeMedia: null,
            progress: 0,
            isShared: null,
            from: null,
            countDown: null,
            completeAnimation: null,
            completeChallenge: null,
            challangeRes: null,
            fileTo: null,
            nameUser: '',
            progressLaoding: false,
        }
    },
    watch: {
        countDown(value) {
            console.log('CONTADO ANIMATION ==>', value)
            this.completeAnimation = value
            if (this.completeChallenge === 'from generic' && value <= 0) {
                if (localStorage.getItem("recordTwilio")) {
                    localStorage.removeItem("recordTwilio")
                }
                this.$router.push({ path: `/challenges/${this.item.challenge.id}/communities`, query: { shared: true, u: this.userProps.id, id: this.challangeRes.id, donate: true } })
                this.active = false;
            }
            if (this.completeChallenge === 'from promotional' && value <= 0) {
                if (localStorage.getItem("recordTwilio")) {
                    localStorage.removeItem("recordTwilio")
                }
                this.$router.push({ path: `/challenges/${this.item.id}/communities`, query: { shared: true, u: this.userProps.id, id: this.challangeRes.id, donate: true } })
                this.active = false;
            }
        },
        completeChallenge(value) {
            console.log('Subida Challenge ==>', value)
            this.completeChallenge = value
            if (value === 'from generic' && this.completeAnimation <= 0) {
                if (localStorage.getItem("recordTwilio")) {
                    localStorage.removeItem("recordTwilio")
                }
                this.$router.push({ path: `/challenges/${this.item.challenge.id}/communities`, query: { shared: true, u: this.userProps.id, id: this.challangeRes.id, donate: true } })
                this.active = false;
            }
            if (value === 'from promotional' && this.completeAnimation <= 0) {

                if (localStorage.getItem("recordTwilio")) {
                    localStorage.removeItem("recordTwilio")
                }
                this.$router.push({ path: `/challenges/${this.item.id}/communities`, query: { shared: true, u: this.userProps.id, id: this.challangeRes.id, donate: true } })
                this.active = false;
            }
        }

    },
    computed: {
        ...mapState("createUserChallenge", ["progressBar"]),
    },
    methods: {
        ...mapActions("createUserChallenge", ["createUserChallengeAction"]),
        async onFileSelect(e,) {


        },
        async countDownTimer() {
            if (this.countDown > 0) {
                setTimeout(() => {
                    this.countDown -= 1
                    this.countDownTimer()
                }, 1000)
                return 'se termino'
            }
        },
        updateName() {
            if (!this.nameUser) {
                return
            } else {
                /* this.loading = true */
                this.$axios
                    .$post("/user/update", {
                        id: this.$route.query.twilio,
                        firstName: this.nameUser,
                    }).then(res => {
                        console.log('res', res)
                        this.$axios.$post(`/stats/record`, {
                            id: localStorage.getItem("recordTwilio"), step: "TWILIO_NAME"
                        }).then(async (twilioName) => {
                            if (localStorage.getItem('recordTwilio')) {
                                this.$axios
                                    .$post(`/stats/record`, { id: localStorage.getItem("recordTwilio"), step: "TWILIO_UPLOAD" })
                                    .then((resUpload) => {
                                        console.log('Twilio Upload', resUpload)
                                    })
                            }
                            this.progress = 0
                            var sizeInMB = (this.file.target.files[0].size / (1024 * 1024)).toFixed(2)
                            this.fileTo = sizeInMB
                            let file = this.file.target.files[0];
                            this.countDown = this.item?.challenge?.sponsors[0]?.animation?.duration / 1000 || this.item?.sponsors[0]?.animation?.duration / 1000
                            console.log('ANIMATION ====>', this.countDown)
                            if (file.type == 'video/mp4' || file.type == 'video/MOV' || file.type == 'video/3GP' || file.type == 'video/AVI' || file.type == 'video/quicktime') {
                                if (this.userProps) this.progressLaoding = true
                            }
                            if (file.type == "image/jpg" || file.type == "image/jpeg" || file.type == "image/png" || file.type == "image/gif") {
                                if (this.userProps) this.progressLaoding = true
                            }
                            if (this.userProps.id) {
                                this.countDownTimer()
                            }
                            let result = await onFile(this.userProps, this.file, this.item, this.createUserChallengeAction, this.from, this.isShared)
                            console.log('RES CREATE ===>', result)
                            if (result?.data) {
                                if (result?.data?.id) {
                                    this.challangeRes = result?.data
                                    this.completeChallenge = result?.fromRes
                                    if (!result?.fromRes) {
                                        this.$nuxt.$emit("modalDownload", [true, 'Unsupported file type', '', 'MP4 MOV 3GP AVI QUICKTIME']);
                                    }
                                    this.loading = false
                                } else {
                                    alert(result?.data?.response?.data?.message)
                                    this.progressLaoding = false;
                                    this.countDown = 0;
                                    result = null;
                                    this.loading = false
                                }
                            }
                        })
                    })
                    .catch((err) => console.log("🚧 catch", err));
            }
        },
        required(v) {
            return !!v || 'Field is required'
        },
        closetModal() {
            this.active = false
            this.file = null
            this.item = null
            this.userProps = null
            this.loading = false
            this.fileMedia = null
            this.typeMedia = null
            this.progress = 0
            this.isShared = null
            this.from = null
            this.countDown = null
            this.completeAnimation = null
            this.completeChallenge = null
            this.challangeRes = null
            this.fileTo = null
            this.nameUser = ''
        }
    },
    created() {
        this.$nuxt.$on("openUserName", (option) => {
            console.log('option', option)
            this.active = option[0]
            this.file = option[1]
            this.item = option[2]
            this.isShared = option[3].idShare
            this.userProps = option[4]
            this.from = option[5]
            if (option[1]) {
                this.fileMedia = URL.createObjectURL(option[1].target.files[0])
                this.typeMedia = this.item.resource.id
            }
            /* if (this.nameRoute === "challenge") {
                this.$router.push({ path: `/challenge/shares/${this.parameters.IdShares}/${this.dataChallenge.id}`,query: { twilio: 'private' } })
            } else {
                this.$router.push({ path: `/userChallenge/shares/${this.parameters.IdShares}/${this.dataChallenge.id}`,query: { twilio: 'private' } })
            } */
        })
    },
}
</script>
<style>
/* .modal-top {
    width: 400px !important;
    margin: 0 auto !important;
} */

@media (max-width: 640px) {
    .modal-top {
        width: 90% !important;
        margin: 0 auto !important;
    }
}
</style>
<style scoped>
.header {
    justify-content: space-between;
    display: flex;
    align-items: center;
}

.header p {
    font-size: 20px;
    font-weight: 600;
}

.overlays {
    padding: 0;
    background: #000000b5;
    height: 100%;
    width: 400px;
    overflow: hidden;
    position: absolute;
    top: 0;
    z-index: -1;
}

.sendcode {
    font-family: "Roboto", sans-serif;
    margin: 10px 0;
    height: 90px !important;
    color: white !important;
    background: #1976d2;
}

.video-fullScreen {
    width: 100%;
    height: 100%;
    object-fit: contain;
    position: relative;
    z-index: 0;
    object-fit: cover;
    /* position: absolute; */

}

.caption-mini {
    font-family: poppinsregular;
    color: gray;
    font-size: 9px;
    margin: 0;
}

.cardInfo {
    padding: 0 20px 20px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 17px;
    font-family: "poppinsregular";
    font-weight: 900;
    color: gray;
    text-shadow: none;
    margin-bottom: 10px;
}

@media (max-width: 640px) {
    .overlays {
        width: 100%;
    }
}
</style>