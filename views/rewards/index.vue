<template>
    <v-container class="contain-notifications">
        <v-card>

            <div class="father-rewards">
                <div class="center">
                    <!-- <h1>Rewards</h1> -->
                    <div style="height: 100%; width: 100%;  background: #f3f4f6 !important;"
                        class="generalContainerRewards">
                        <div class="header-comunnities">
                            <div class="header_icons">
                                <div class="ripple" @click="closeModal">
                                    <img style="width: 35px; border-radius: 100%; object-fit: contain; box-shadow: 0px 4px 4px 0px #00000040;"
                                        src="@/assets/img/button-float/backwhite.png" alt="">
                                </div>
                                <div style="color: #2F4B75; font-weight: 600;font-size: 1.25rem; " class="icon_text">
                                    Rewards</div>
                                <div style="display: flex; align-items: center; visibility: hidden;">
                                    <img style="width: 30px; height: 30px; object-fit: cover; " :src="MoreBlue" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="rewards-container-header">
                            <div class="rewards-container-header-bg-white">
                                <div class="rewards-container-titles-information">

                                    <div class="rewards-container-header-titles">
                                        <div class="reward-with-container-titles">
                                            <div @click="obtainedMode(0)"
                                                :class="obtained === 0 ? 'rewards-titles-color' : ''">PENDING</div>
                                        </div>
                                        <div <div class="reward-with-container-titles">
                                            <div @click="obtainedMode(1)"
                                                :class="obtained === 1 ? 'rewards-titles-color' : ''">REDEEMED</div>
                                        </div>
                                    </div>

                                    <div v-if="obtained === 0" class="rewards-container-information">
                                        <div class="rewards-informatios-scroll">
                                           
                                            <div class="iconsContainer" >
                                
                                                <div  v-for="(item, i) in  itemsNotObtained?.length  < 12 ? 12 : itemsNotObtained "  :class=" itemsNotObtained[i] ? 'card-rewards' : 'card-rewards-empty'"
                                                    :key="i">
                                                    <div class="rewards-container-information-image " v-if="itemsNotObtained[i]" >
                                                        <button @click="OpenRedeem(itemsNotObtained[i] || item)">
                                                            <img :src="urlBucket + itemsNotObtained[i].reward?.imgBadReward || item.reward?.imgBadReward"
                                                                class="rewards-container-information-button-image">
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="obtained === 1" class="rewards-container-information">
                                        <div class="rewards-informatios-scroll">
                                            <div class="iconsContainer" >
                                                <div v-for="(item, i) in  itemsObtained?.length  < 12 ? 12 : itemsObtained "
                                                    @click="warningStatus = true" :class=" itemsObtained[i] ? 'card-rewards' : 'card-rewards-empty'">
                                                    <div class="rewards-container-information-image"  v-if="itemsObtained[i]" >
                                                        <img :src="urlBucket + itemsObtained[i].reward?.imgBadReward || item.reward?.imgBadReward"
                                                            class="rewards-container-information-button-image">
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div style="margin-top: 65px;" class="itemsRewardsContainer" cols="6">
                            <div class="itemsRewards" @click="obtainedMode(0)">
                                <div style="background-color: white; border-radius: 8px;     box-shadow: 0px 1px 6px -2px black;"
                                    class="imageContainerRewards">
                                    <img :src="require('~/assets/img/png/channel/nwsteve/1.png')"
                                        style=" border-radius:8px">
                                </div>
                                <h1>CLAIMED ({{ itemsObtained.length }})</h1>
                                <div class="imageContainerRewards">
                                    <v-icon color="#449AD9" large
                                        :class="{ arrow: true, arrowAnimation: arrowAnimation1 }">
                                        mdi-play</v-icon>
                                </div>
                            </div>
                            <div v-show="obtained" class="iconsContainer">
                                <div v-for="(item, i) in itemsObtained" class="card-rewards" :key="i"
                                    @click="warningStatus = true">
                                    <img :src="urlBucket + item.reward.imgBadReward" style="width:80px">
                                </div>
                            </div>
                        </div>
                        <div class="itemsRewardsContainer" cols="6" style=" overflow: hidden;">
                            <div class="itemsRewards" cols="6" @click="obtainedMode(1)">
                                <div style="background-color: white; border-radius: 8px;     box-shadow: 0px 1px 6px -2px black;"
                                    class="imageContainerRewards">
                                    <img :src="require('~/assets/img/png/channel/nwsteve/2.png')"
                                        style=" border-radius:8px">
                                </div>
                                <h1>PENDING ({{ itemsNotObtained.length }})</h1>
                                <div class="imageContainerRewards">
                                    <v-icon color="#449AD9" large
                                        :class="{ arrow: true, arrowAnimation: arrowAnimation2 }">
                                        mdi-play</v-icon>
                                </div>
                            </div>
                            <div v-show="obtained2" class="iconsContainer">
                                <div v-for="(item, i) in itemsNotObtained" class="card-rewards" :key="i">
                                    <button @click="OpenRedeem(item)">
                                        <img :src="urlBucket + item.reward.imgBadReward" style="width:80px">
                                    </button>

                                </div>
                            </div>
                        </div>
                        <div style=" position: absolute; bottom: 60px;">
                            <img src="~/assets/img/png/channel/s.png" style="margin-top:10vh; width: 80px;">
                        </div> -->
                    </div>
                </div>
            </div>

            <div class="text-center" v-if="showModal">
                <v-dialog v-model="showModal" width="350">
                    <v-card>
                        <v-card-actions>
                            <div style="display:flex; flex-direction:column">
                                <div>
                                    <h2>Do you want to claim the reward?</h2>
                                </div>
                                <div style="padding:20px;position: relative;display: flex;justify-content:center;">
                                    <div style="margin: 0px 10px;">
                                        <div style="font-size: 18px;">
                                            {{ RewardData.name }}
                                        </div>
                                        <div style="font-size: 15px;">
                                            {{ RewardData.description }}
                                        </div>
                                    </div>
                                    <div>
                                        holaaaa
                                        <img :src="urlBucket + RewardData.imgBgReward" style="width:80px">
                                    </div>
                                </div>
                                <div style="padding:20px;display:flex;justify-content:center;">
                                    <div style="margin: 0px 7px;">
                                        <v-btn depressed color="primary"
                                            @click="updateRedeem(RewardData.id), qrStatus = true, warningStatus = false">
                                            Redeem
                                        </v-btn>
                                    </div>
                                    <div style="margin: 0px 7px;">
                                        <v-btn depressed color="error"
                                            @click="warningStatus = false, showModal = false">
                                            Close
                                        </v-btn>
                                    </div>
                                </div>
                            </div>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
            <div class="text-center">
                <v-dialog v-model="qrStatus" width="285">
                    <v-card>
                        <v-card-actions>
                            <div
                                style="display:flex; justify-content: center; align-items: center; flex-direction:column">
                                <qr-code text="http://appdev.shareity.com/"></qr-code>
                                <v-btn color="primary" text @click="qrStatus = false">
                                    Close
                                </v-btn>
                            </div>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>

            <div :class="[showInfo ? 'welcome_rewards' : 'none']" @click="closeInfo">
                <div class="welcome_rewards-img"></div>
            </div>
        </v-card>
    </v-container>
</template>

<script>
const imgLink = require("~/assets/img/png/footer/icoLogo.png");
const blueBack = require("~/assets/img/svg/BlueBack.svg");
import { mapState, mapActions } from "vuex";
// import VueQr from 'vue-qr'

export default {
    // components: {VueQr},
    layout(context) {
        return "Modal";
    },
    data() {
        return {
            qrStatus: false,
            show: false,
            image: imgLink,
            obtained: 0,
            arrowAnimation1: true,
            arrowAnimation2: true,
            warningStatus: false,
            showInfo: false,
            showModal: false,
            itemsObtained: [],
            
            itemsNotObtained: [],
            RewardData: {},
        };
    },
    methods: {
        ...mapActions("reward", ["generateHashQrAction", "userRewardAction", "redeemUserRewardAction"]),
        ...mapActions("user", ["nicknameAction"]),
        toListenWidth() {
            return window.innerWidth
        },
        generateQr() {
            this.generateHashQrAction({ idUser: localStorage.getItem('username') })
                .then(() => {
                    this.qrStatus = true
                })
        },
        async updateRedeem(id) {
            this.redeemUserRewardAction({ id: id })
            let index = this.itemsNotObtained.findIndex(item => item.id === id);
            this.itemsNotObtained[index].isRead = 1
            this.itemsObtained.push(this.itemsNotObtained[index])
            this.itemsNotObtained.splice(index, 1)
            this.showModal = false;
        },
        OpenRedeem(data) {
            this.showModal = true;
            this.RewardData = {
                id: data.id,
                name: data.reward.Name,
                description: data.reward.Description,
                imgBadReward: data.reward.imgBadReward,
                imgBgReward: data.reward.imgBgReward,
            }
        },
        obtainedMode(status) {
            if (status == 0) {
                if (this.obtained) {
                    this.arrowAnimation1 = true
                    this.obtained = status
                } else {
                    this.arrowAnimation1 = false
                    this.obtained = true
                }
            }
            if (status === 1) {
                this.obtained = status
                this.arrowAnimation2 = true
            } else {
                this.arrowAnimation2 = false
                this.obtained = status
            }
        },
        closeModal() {
            this.$router.back()
            document.documentElement.style.touchAction = "auto"
        },
        closeInfo() {
            const res = localStorage.getItem('rewards')
            if (res == 1) {
                this.showInfo = false
                localStorage.setItem("rewards", 0);
            }
        },
    },
    created() {
        if (process.client) {
            const res = localStorage.getItem('rewards')
            if (res == 1) {
                this.showInfo = true
            } else {
                this.showInfo = false
            }

            this.nicknameAction().then((session) => {
                this.userRewardAction({
                    id: session.id,
                }).then((r) => {
                    
                    this.itemsObtained = []
                    this.itemsNotObtained = []
                    if (r.length > 0) {
                        r.forEach(element => {
                            if (element.isRead == 1) {
                                this.itemsObtained.push(element)
                            } else {
                                this.itemsNotObtained.push(element)
                            
                        }
                    });
                }
            })
            })
        }


    },
    computed: {
        urlBucket() {
            return process.env.api_assets_url;
        },
        ...mapState("phoneSize", ["windowWidthT"]),
    }
};
</script>

<style>
.not-rewards{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
    color: gainsboro;
}
.father-rewards {
    width: 100%;
    height: 100vh;
    background-color: #e9f1f8 !important;
}

.rewards-container-header {
    height: 100dvh;
    width: 100%;
    display: flex;
    padding-top: 18%;
}

.rewards-container-header-bg-white {
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 7px;
}

.rewards-container-information {
    height: 100%;
    overflow: hidden;

}

.rewards-container-header-titles {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 9px;
}

.rewards-container-header-titles {
    font-size: 17px;
    color: #BDBDBD;
    cursor: pointer;
}

.rewards-titles-color {
    color: #449AD9 !important;
    width: 100%;
    text-align: center;
    box-shadow: inset 0px 7px 7px -6px gray;
    padding: 4px;
    border-radius: 4px;

}

.reward-with-container-titles {
    width: 50%;
    text-align: center;
}

.generalContainerRewards {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    height: 100%;
}

.itemsRewardsContainer {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 8px;
    border-bottom-right-radius: 30px;
    margin: 5px 0;
    box-shadow: 0px 0px 5px 2px rgb(0 0 0 / 9%);

}

.rewards-container-titles-information {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.welcome_rewards {
    position: absolute;
    background-color: #00000070;
    z-index: 99999999 !important;
    bottom: 0%;
    width: 100%;
    height: 100%;
}

.header-comunnities {
    display: flex;
    position: fixed;
    justify-content: space-between;
    background-color: #ffffff;
    height: 55px;
    width: 400px;
    border-bottom-right-radius: 30px;
    z-index: 10;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
        0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
}

.card-rewards {
    margin: 8px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    height: 123px;
    box-shadow: 0px 0px 6px 2px #d3d3d3;
}
.card-rewards-empty{
    margin: 8px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: rgb(255 255 255 / 0%);
    height: 123px;
    border: 1px solid rgb(225 225 225 / 44%)
}

.contain-notifications {
    width: 400px;
    padding: 0px !important;
}

.welcome_rewards-img {
    position: absolute;
    background-image: url(../../assets/img/png/rewardspow.png) !important;
    background-size: 100%;
    background-repeat: no-repeat;
    width: 100%;
    height: 75%;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    /* z-index: 999; */
    margin-left: auto;
    margin-right: auto;
}

.none {
    display: none;
}

.itemsRewards {
    display: flex;

}

.itemsRewards h1 {
    font-size: 15px;
    color: #449AD9;
    width: 80%;
    display: flex;
    align-items: center;
    padding-left: 10px;
}

.imageContainerRewards {
    display: flex;
    justify-content: center;
    align-items: center;

}

.imageContainerRewards img {
    width: 60px;
}

.rewards-informatios-scroll {
    overflow: auto;
    height: 100%;
}

.rewards-container-information-image {
    width: 87px;
    height: 86px;
}

.rewards-container-information-image>button {
    width: 100%;
    height: 100%;
}

.rewards-container-information-button-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}


.iconsContainer {
    display: grid;
    margin-top: 10px;
    grid-template-columns: repeat(auto-fill, minmax(127px, 0fr));

}

.arrow {
    margin-right: 10px;
    animation: all 1s ease;
}

.arrowAnimation {
    transform: rotate(0.251turn);
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.container_IMG {
    display: flex;
    justify-content: center;
    align-items: center;
}

.T_img {
    width: 25px;
    height: 25px;
}



.v-dialog {
    margin: 0;
    overflow: hidden;
}

.rewards {
    letter-spacing: 0.1px;
    line-height: 30px;
    margin: 15px 0px;
}

.header_icons {
    width: 100%;
    display: flex;
    height: 100%;
    align-items: center;
    gap: 20px;
    padding: 5px;
    justify-content: space-between;

}

@media (max-width: 640px) {
    .contain-notifications {
        width: 100%;
    }

    .header-comunnities {
        width: 100%;
    }
}
</style>