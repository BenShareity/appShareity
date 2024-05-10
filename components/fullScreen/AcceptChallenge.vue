<template>
    <div style="text-align: center; ">
        <div v-if="(
            item?.challengeUser && from === 'Challenge') ||
            (from !== 'Challenge' && from !== 'Profile' && item?.user?.id === userProps?.id) ||
            (from == 'Trending' && item?.challengeUser)
            " class="btn-c">Challenge Completed!</div>
        <v-btn v-else class="btn-challenge" :class="!iconPlay ? 'btn-opacity' : ''">
            <v-icon size="26" left> mdi-camera </v-icon>
            <span v-if="from == 'Challenge' || from == 'shared'">Accept the Challenge!</span>
            <span v-else> Accept My Challenge! </span>
            <div v-if="item?.resource?.id === 3">
                <input class="ocultar-button" type="file" ref="imageUploader" @click="resetImageUploader"
                    @change="onFileSelect($event, item)" accept="video/*" />
            </div>
            <div v-else>
                <input class="ocultar-button" type="file" ref="imageUploader" @click="resetImageUploader"
                    @change="onFileSelect($event, item)" accept="image/*" />
            </div>
        </v-btn>
        <LoadingChallenge :active="active" :file="fileTo" :countDown="countDown" :itemChallange='item'
            :progress="progressBar" />
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import LoadingChallenge from "@/components/LoadingChallenge.vue";
import { onFile } from "../../stub/functions.js";
export default {
    components: {
        LoadingChallenge
    },
    props: {
        item: Object,
        from: String,
        userProps: Object,
        index: Number,
        isShared: Object,
        iconPlay: Boolean,
    },
    computed: {
        ...mapState("createUserChallenge", ["progressBar"]),
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
    data() {
        return {
            optionInfo: false,
            progress: 0,
            active: false,
            userId: null,
            newArray: [],
            countDown: null,
            completeAnimation: null,
            completeChallenge: null,
            challangeRes: null,
            fileTo: null
        }
    },
    methods: {
        ...mapActions("createUserChallenge", ["createUserChallengeAction"]),
        ...mapActions("user", ["nicknameAction"]),
        acceptMyChallenge(p1, id, item) {
            if (p1 === 1) {
                this.optionInfo = true;
            }
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
        /* async countProgress() {
            if (this.progress < 90) {
                this.progress += 1.88 * 2.4
            }
            if (this.progress > 0) {
                setTimeout(() => {
                    this.countProgress()
                }, 1000)
                return 'se termino'
            }
        }, */
        resetImageUploader() {
            this.$refs.imageUploader.value = '';
        },
        async onFileSelect(e, item) {
            console.log('e , item', e, item)
            if (localStorage.getItem('recordTwilio')) {
                this.$axios
                    .$post(`/stats/record`, { id: localStorage.getItem("recordTwilio"), step: "TWILIO_UPLOAD" })
                    .then((resUpload) => {
                        console.log('Twilio Upload', resUpload)
                    })
            }
            this.progress = 0
            var sizeInMB = (e.target.files[0].size / (1024 * 1024)).toFixed(2);
            this.fileTo = sizeInMB
            let file = e.target.files[0];
            this.countDown = item?.challenge?.animation?.duration / 1000 || item?.animation?.duration / 1000
            console.log('ANIMATION ====>', this.countDown)
            if (file.type == 'video/mp4' || file.type == 'video/MOV' || file.type == 'video/3GP' || file.type == 'video/AVI' || file.type == 'video/quicktime') {
                this.$emit('evetPause', this.index);
                if (this.userProps) this.active = true
            }
            if (file.type == "image/jpg" || file.type == "image/jpeg" || file.type == "image/png" || file.type == "image/gif") {
                if (this.userProps) this.active = true
            }
            console.log('this.userProps', this.userProps)
            if (this.userProps.id) {
                /*   this.countProgress() */
                this.countDownTimer()
            }
            let result = await onFile(this.userProps, e, item, this.createUserChallengeAction, this.from, this.isShared?.idShare)
            console.log('RES CREATE ===>', result)
            if (result?.data) {
                if (result?.data?.id) {
                    this.challangeRes = result?.data
                    this.completeChallenge = result?.fromRes

                    if (!result?.fromRes) {
                        this.$nuxt.$emit("modalDownload", [true, 'Unsupported file type', '', 'MP4 MOV 3GP AVI QUICKTIME']);
                    }
                } else {
                    alert(result?.data?.response?.data?.message)
                    this.active = false;
                    this.countDown = 0;
                    result = null;
                }
            } else {
                if (result?.fromRes === 'noUserChallenge') {
                    this.active = false
                    this.$nuxt.$emit("FullScreenLoginChallenge", [true, file, item, '', this.isShared?.idShare])
                }
                if (result?.fromRes === 'noUser') {
                    this.active = false
                    this.$nuxt.$emit("FullScreenLoginChallenge", [true, file, item, 'noPromotional', this.isShared?.idShare]);
                }
            }

        },
    },
    mounted() {
        console.log('this.from', this.from)
    },
}

</script>
<style scoped>
.btn-challenge {
    color: white;
    height: 45px !important;
    border-radius: 10px;
    text-transform: uppercase;
    font-weight: 700;
    background: linear-gradient(90deg, #12A4DB 0%, #044F85 100%);
    font-family: sans-serif;
}

.btn-c {
    color: #fdfdfd;
    border-radius: 10px;
    text-transform: uppercase;
    font-weight: 700;
    background: #aeaeae !important;
    font-family: sans-serif;
    padding: 12px;
    font-size: 0.875rem;
    margin-left: 15px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.btn-opacity {
    opacity: 0.5;
    transition: all linear 0.5;
}

.ocultar-button {
    width: 242px;
    height: 43px;
    opacity: 0;
    position: absolute;
    left: -15px;
    top: -12px;
    background: aqua;
}
</style>