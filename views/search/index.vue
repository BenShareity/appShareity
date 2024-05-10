<template>
    <div>
        <LoadingLogo v-if="skeleton" />
        <template v-else>
            <div class="app">
                <div class="bg-black-new">
                    <div></div>
                </div>
                <div style="padding: 50px 0;">
                    <div style="position: relative; width: 100%;">
                        <input label="Search" placeholder="Search your challenge" class="mx-auto my-6 input-search"
                            v-model="searchText" />
                        <img style=" width: 18px;  position: absolute;top: 7px;right: 30px;z-index: 110;"
                            :src="searchLupa" alt="">
                    </div>
                    <div style="display: flex; padding: 10px;flex-direction: column; gap: 40px">
                        <div v-for="(item, index) in promotional" :key="index">
                            <SearchChallenges :ChallengesFront="item.image" :index="index" :user="user || {}"
                                :getPromotional="promotional" :challenge="item" :key="componentKey" />
                        </div>
                    </div>

                </div>

            </div>
            <div data-app>
                <Loading :active="activeLoading" />
            </div>
            <div v-if="showInfo" class="welcome-notification" @click="closeInfo()">
            </div>
        </template>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import CardImpact from "@/components/cards/CardImpact";
import CardTrending from "@/components/cards/CardTrending";
import SearchChallenges from "@/components/cards/SearchChallenges";
import SearchModal from "@/components/modals/SearchModal.vue";
import Message from "@/components/elements/message/Message.vue";
import SkeletonChallenge from "../../components/loader/SkeletonChallenge.vue";
import LoadingLogo from "../../components/loader/LoadingLogo.vue";
import searchLupa from '../../assets/img/svg/seach-lupa.svg'

export default {
    components: {
        CardImpact,
        CardTrending,
        SearchChallenges,
        SearchModal,
        Message,
        SkeletonChallenge,
        LoadingLogo
    },
    layout(context) {
        return "App";
    },
    data() {
        return {
            searchText: "",
            showInfo: false,
            showAppleInfo: false,
            rotation: false,
            rotation2: false,
            selectedTab: 1,
            callbackView: false,
            windowTop: 0,
            loading: false,
            skeleton: false,
            limitObj: [],
            topObj: 10,
            needLogIn: false,
            page: 1,
            postsTrending: [],
            postsImpact: [],
            activeLoading: false,
            allUserChallenges: [],
            getPromotional: [],
            promotional: [],
            user: null,
            members: 0,
            searchLupa,
            componentKey: 0,
            tabs: [
                {
                    id: "1",
                    text: "Impact",
                    component: CardImpact,
                    position: "center",
                    show: true,
                    icon: "mdi-account-multiple",
                },
                {
                    id: "2",
                    text: "Trending",
                    component: CardTrending,
                    position: "center",
                    show: true,
                    icon: "mdi-fire",
                },
            ],
            control: false,
        };
    },
    watch: {
        searchText(value) {
            value = value.toLowerCase();
            this.promotional = [];

            this.getPromotional.map((item) => {
                if (item.name.toLowerCase().indexOf(value) >= 0)
                    this.promotional.push(item);
            });
        },
    },
    computed: {
        ...mapActions("challenges", [
            "challengesAction",
            "userChallengesAction",
            "userPromotionalAction",
            "promotionalAction",
        ]),
        ...mapGetters("challenges", ["getChallenges", "getUserPromotional"]),
        ...mapGetters("content", ["getContentView"]),
        ...mapState("infiniteScroll", ["userChallenges", "userChallengesPages"]),
    },

    methods: {
        ...mapActions("challenges", [
            "fetchChallengesRelational",
            "fullChallengeAction",
            "searchModalAction",
            "getUserChallenges",
            "getImpacts",
            "userChallengesPreloaded",
            "challengesPreloadedAction",
        ]),
        ...mapActions("user", ["nicknameAction"]),
        ...mapActions("content", ["changeContentView"]),

        challengesRelational() {
            let data = {
                idUsr: this.$auth.$storage.getLocalStorage("user").id,
            };
            this.fetchChallengesRelational(data);
        },
        openModalLogin() {
            this.$nuxt.$emit("openLogin", [true]);
        },
        statusControl(status) {
            this.control = status;
        },
        closeInfo() {
            this.showInfo = false;
            localStorage.setItem("trending", 0);
        },
    },

    unmounted() {
        if (process.client && document.body.clientHeight) {
            window.removeEventListener("scroll", this.handleScroll);
        }
    },
    mounted() {

    },
    created() {
        this.changeContentView(3);
        this.skeleton = true
        this.promotionalAction.then((r) => {
            console.log('r', r)
            this.nicknameAction().then((user) => {
                this.user = user;
                if (user) {
                    r.map(function (entry) { entry.challengeUser = false; return entry; });
                    user.userChallenges.forEach((element) => {
                        r.map(function (promotional) {
                            if (element.challenge.id === promotional.id)
                                promotional.challengeUser = true;
                            return promotional;
                        });
                        this.componentKey += 1;
                    });
                }
            });

            r?.map(function (file) {
                file.typeMedia = file?.url?.split("?")[0]?.split("#")[0]?.split('.')?.pop();
                return file;
            });
            r?.map(function (date) {
                let fechaVieja;
                let fechaNueva;
                fechaNueva = new Date()
                fechaVieja = new Date(date.endDate)
                let result = fechaVieja > fechaNueva
                date.dateNow = result
                return date
            });
            this.callbackView = true;
            this.getPromotional = r;
            this.promotional = r;
            this.skeleton = false
        }).catch((error) => {
            this.skeleton = false
            console.log('error ', error)

        })
        if (process.client) {
            const res = localStorage?.getItem("trending");
            this.showInfo = res == 1 ? true : false;
            this.showAppleInfo = navigator.vendor.includes("Apple");
            document.documentElement.style.overflow = "initial";
        }

    },
};
</script>

<style scoped>
.button-close {
    position: absolute;
    right: 10px;
    top: 10px;
    color: white;
}

.input-search {

    padding: 4px 2px;
    margin-top: 10px;
    border-radius: 5px;
    display: block;
    width: 390px;
    position: relative;
    z-index: 100;
    background: white;
}

.input-search::placeholder {
    color: #E0E1E1;
    padding-left: 10px
}

.container {
    position: absolute;
    top: -380px;
    left: 0;
    background: rgba(0, 0, 0, 0.793);
    width: 75px;
    border-radius: 0 10px 10px 0;
    font-size: 14px;
}

.card-padre-trending {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding-bottom: 130px;
    padding-top: 100px;
}

.bg-gray {
    background: linear-gradient(#dddddd, #00000047);
}

.card-padre-impact {
    display: flex;
    flex-direction: column;
    gap: 40px;
    background: linear-gradient(#dddddd, #00000047);
    padding-bottom: 130px;
    padding-top: 100px;
    height: 100dvh;
}

.bg-active::before {
    background: linear-gradient(90deg,
            rgba(41, 46, 50, 0) 49%,
            rgba(255, 255, 255, 0.40379901960784315) 100%) !important;
    border-radius: 22px !important;
    opacity: 1 !important;
}

.button-home {
    text-align: center;
    position: relative;
    bottom: 80px;
    width: 100%;
}

.btn-challenge {
    color: white;
    height: 45px !important;
    border-radius: 10px;
    text-transform: uppercase;
    font-weight: 700;
    background: linear-gradient(90deg, #12A4DB 0%, #044F85 100%);
    font-family: sans-serif;
}

.moreContent {
    text-align: center;
}

.welcome-notification {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9999 !important;
    top: 0;
    width: 100%;
    height: 100%;
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

.welcome-notification__img {
    position: absolute;
    height: 35%;
    right: 0;
    z-index: -10;
    bottom: 0;
}

.welcome-notification__container {
    position: absolute;
    right: 15%;
    width: 70%;
    margin-top: 5%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 15px #33a9f2;
    border-radius: 20px;
    font-size: 1.2rem;
    line-height: 23px;
    font-weight: bold;
    text-align: center;
}

.welcome-notification__gif {
    width: 100%;
}



@media (max-width: 640px) {
    .button-home {
        bottom: 170px;
        width: 100%;
    }

    .card-padre-trending {
        padding-bottom: 216px;
    }

    .bg-black-new>div {
        width: 100%;
    }

    .app {
        width: 100%;
    }

    .input-search {
        width: 90%;
        margin: 0 auto;
    }
}

@media (max-height: 750px) {
    .welcome-notification__container {
        right: 20% !important;
        width: 60% !important;
    }
}
</style>