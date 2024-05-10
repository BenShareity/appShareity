<template>
    <LoadingLogo v-if="loading" />
    
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
import LoadingLogo from "@/components/loader/LoadingLogo.vue";
export default {

    computed: {
        urlBucket() {
            return process.env.api_assets_url;
        },
    },
    async asyncData({ params, $axios }) {
        console.log('params', params)
        let dataInfo = await $axios.$get("/user-challenge/get-by-id/" + params.IdUserChallenge)
        console.log('dataInfo', dataInfo)
        return { dataInfo };
    },
    components: {
        LoadingLogo,
    },
    head(vm) {
        console.log('vm', vm)
        return {
            title: vm.dataInfo.challenge.shareMessage,
            meta: [
                {
                    hid: "og-title",
                    property: "og:title",
                    content: vm.dataInfo.challenge.shareMessage,
                },
                { hid: "og-type", property: "og:type", content: "website" },
                {
                    hid: "og-desc",
                    property: "og:description",
                    content: `Join me in doing Good! Accept my ${vm.dataInfo.challenge.name} challenge and share with friends!`,
                },
                {
                    hid: "twitter:image",
                    name: "twitter:image",
                    href: this.urlBucket + vm.dataInfo.watermark,
                    content: this.urlBucket + vm.dataInfo.watermark,
                },
                {
                    hid: "twitter:image:alt",
                    name: "twitter:image:alt",
                    content: this.urlBucket + vm.dataInfo.watermark,
                },
                {
                    hid: "og-image",
                    property: "og:image",
                    itemprop: "image",
                    content: this.urlBucket + vm.dataInfo.watermark,
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
                    content: `Accept the ${vm.dataInfo.challenge.name} challenge`,
                },
                {
                    hid: "twitter:description",
                    name: "twitter:description",
                    content: `Join me in doing Good! Accept my ${vm.dataInfo.challenge.name} challenge and share with friends!`,
                },
            ],
        };
    },

    data() {
        return {
            challenge: null,
            user: null,
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
                    .$get("/user-challenge/get-by-id/" + this.$route.params.IdUserChallenge)
                    .then((res) => {
                        this.challenge = res
                        this.$axios
                            .$post(`/stats/record`, {
                                step: "TWILIO_VIEW",
                                challengeId: res.challenge.id
                            })
                            .then((twilioSteps) => {
                                const idStep = twilioSteps.id;
                                localStorage.setItem("recordTwilio", idStep);
                            })
                            .catch((err) => {
                                console.error("🚧 catch", err);
                            });
                        this.loading = false
                        this.$router.push({ path: `/userChallenge/shares/${this.$route.params.IdShares}/${this.$route.params.IdUserChallenge}`, query: { twilio: newuser.id } })
                    })
            } else {
                this.loading = false
                this.$router.push({ path: `/userChallenge/shares/${this.$route.params.IdShares}/${this.$route.params.IdUserChallenge}` })
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