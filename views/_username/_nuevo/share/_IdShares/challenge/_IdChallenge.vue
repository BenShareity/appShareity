<template>
    <LoadingLogo v-if="loading" />
    <!-- <div v-else>
        <v-container class="padre">
            <div class="contend-challenge">
                <video v-if="challenge?.resource?.id === 3" autoplay loop muted :src="urlBucket + challenge?.url"></video>
                <img v-else :src="urlBucket + challenge?.url" alt="">
            </div>
            <ModalUserName data-app />
        </v-container>
    </div> -->
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
import LoadingLogo from "@/components/loader/LoadingLogo.vue";
export default {
    components: {
        LoadingLogo,
    },
    computed: {
        urlBucket() {
            return process.env.api_assets_url;
        },
        ...mapState("user", ["userData"]),
    },
    async asyncData({ params, $axios }) {
        let dataInfo = await $axios.$get("/challenge/get-by-id/" + params.IdChallenge)
        console.log('dataInfo', dataInfo)
        return { dataInfo };
    },
    head(vm) {
        return {
            title: vm.dataInfo.shareMessage,
            meta: [
                {
                    hid: "og-title",
                    property: "og:title",
                    content: vm.dataInfo.shareMessage,
                },
                { hid: "og-type", property: "og:type", content: "website" },
                {
                    hid: "og-desc",
                    property: "og:description",
                    content: `${vm.dataInfo.description}`,
                },
                {
                    hid: "twitter:image",
                    name: "twitter:image",
                    href: this.urlBucket + vm.dataInfo.photoUrl, 
                    content: this.urlBucket + vm.dataInfo.photoUrl,
                },
                {
                    hid: "twitter:image:alt",
                    name: "twitter:image:alt",
                    content: this.urlBucket + vm.dataInfo.photoUrl,
                },
                {
                    hid: "og-image",
                    property: "og:image",
                    itemprop: "image",
                    content: this.urlBucket + vm.dataInfo.photoUrl,
                },
                {
                    property: "og:site_name",
                    content: "Accept the gtesr challenge",
                },
                {
                    property: "og:type",
                    content: "article",
                },
                {
                    property: "og:updated_time",
                    content: "1440432930",
                },
                {
                    property: "og:url",
                    content: "https://chgsdev.shareity.com",
                },
                {
                    hid: "twitter:card",
                    name: "twitter:card",
                    content: "summary_large_image",
                },
                {
                    hid: "twitter:site",
                    name: "twitter:site",
                    content: "@shareityapp",
                },
                {
                    hid: "twitter:creator",
                    name: "twitter:creator",
                    content: "@shareityapp",
                },
                {
                    hid: "twitter:type",
                    name: "twitter:type",
                    content: "website",
                },
                {
                    hid: "twitter:title",
                    name: "twitter:title",
                    content: `Accept the ${vm.dataInfo.name} challenge`,
                },
                {
                    hid: "twitter:description",
                    name: "twitter:description",
                    content: `${vm.dataInfo.description}`,
                },
            ],
        };
    },
    data() {
        return {
            challenge: null,
            loading: false
        }
    },
    methods: {
        ...mapActions("user", ["nicknameAction"]),
    },
    created() {
        if (process.client) {
            localStorage.setItem('username', this.$route.params.username)
        }

    },
    mounted() {
        this.loading = true
        this.nicknameAction().then((newuser) => {
            if (this.$route.params.nuevo == "true") {
                this.$axios
                    .$get("/challenge/get-by-id/" + this.$route.params.IdChallenge)
                    .then((res) => {
                        this.challenge = res
                        this.$axios
                            .$post(`/stats/record`, {
                                step: "TWILIO_VIEW",
                                challengeId: res.id
                            })
                            .then((twilioSteps) => {
                                const idStep = twilioSteps.id;
                                localStorage.setItem("recordTwilio", idStep);
                            })
                            .catch((err) => {
                                console.error("🚧 catch", err);
                            });
                        this.loading = false
                        this.$router.push({ path: `/challenge/shares/${this.$route.params.IdShares}/${this.$route.params.IdChallenge}`, query: { twilio: newuser.id } })
                    })
            } else {
                this.loading = false
                this.$router.push({ path: `/challenge/shares/${this.$route.params.IdShares}/${this.$route.params.IdChallenge}` })
            }
        })
    }
}
</script>
<style>
.padre {
    padding: 0;
    background: #000000b5;
    height: 100dvh;
    width: 400px;
    overflow: hidden;
}

.contend-challenge {
    width: 400px;
    height: 100%;
}

.contend-challenge img,
video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>