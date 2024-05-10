<template>
    <div>
        <!--   <SkeletonChallenge v-if="skeleton" /> -->
        <LoadingLogo v-if="skeleton" />
        <template v-else>
            <div class="app">

                <div class="bg-black-new"><div></div></div>
                <div>
                    <div class="card-padre-impact">

                        <div v-for="(item, index) in postsImpact" :key="index">
                            <CardImpact :challenge="item" :page="page" :userData="user" :postsImpact="postsImpact"
                                :index="index" />
                        </div>
                    </div>
                </div>
            </div>
            <div data-app>
                <Loading :active="activeLoading" />
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
            showInfo: false,
            showAppleInfo: false,
            loading: false,
            page: 1,
            postsImpact: [],
            activeLoading: false,
            user: null,
            skeleton: false
        };
    },
    computed: {
        ...mapGetters("content", ["getContentView"]),
    },

    methods: {
        ...mapActions("challenges", ["getImpacts"]),
        ...mapActions("content", ["changeContentView"]),
        ...mapActions("user", ["nicknameAction"]),
        closeInfo() {
            this.showInfo = false;
            localStorage.setItem("trending", 0);
        },
    },
    unmounted() {
        if (process.client && document?.body?.clientHeight) {
            window.removeEventListener("scroll", this.handleScroll);
        }
    },
    created() {
        if(process.client){
            document.documentElement.style.overflow = "initial";
        }
      
        this.skeleton = true
        this.changeContentView(1)
        this.nicknameAction().then((user) => {
            this.user = user;
            this.getImpacts({ page: this.page, items: 10, idUser: user.id }).then(
                (r) => {
                    this.postsImpact.push(...r.page);
                    this.skeleton = false
                }
            );
            if (process.client) {
                const res = localStorage?.getItem("trending");
                this.showInfo = res == 1 ? true : false;
                this.showAppleInfo = navigator.vendor.includes("Apple");
            }
        });
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
    margin-bottom: 6px;
    border: 2px solid #33a9f2;
    border-radius: 5px;
    display: block;
    width: 80%;
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
    background: #000;
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

.card-padre-impact {
    display: flex;
    flex-direction: column;
    gap: 20px;
    /*  background: #000; */
  /*   padding: 10px; */
    /* height: 100dvh; */
    padding-top: 65px;
    padding-bottom: 80px;

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

.welcome-notification__img {
    position: absolute;
    /* background-image: url(../assets/img/png/viewSteve.png) !important;
    background-size: 100%;
    background-repeat: no-repeat; */
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

/* @media all and (orientation:portrait) {
    .mensaje {
      display: none;
    }
  }
  
  @media(min-width:1024px) {
    .mensaje {
      display: none;
    }
  }
  
  :root {
    touch-action: pan-x pan-y;
    height: 100% 
  }
  
  @media all and (orientation:landscape) {
  
    .mensaje {
      position: fixed;
      height: 100vh;
      background: white;
      top: 0;
      rotate: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 9999999999;
      width: 100%;
    }
  } */


@media (max-width: 380px) {
    .h-fit-contend {
        height: auto;
    }
}

@media (max-width: 380px) {}

@media (max-width: 640px) {
    .card-padre-impact {
        padding-left: 10px;
        padding-right: 10px
    }
    .button-home {
        bottom: 170px;
        width: 100%;
    }

    .bg-black-new>div {
        width: 100%;
    }

    .card-padre-trending {
        padding-bottom: 216px;
    }

    .app {
        width: 100%;
    }
}

@media (max-height: 750px) {
    .welcome-notification__container {
        right: 20% !important;
        width: 60% !important;
    }
}
</style>