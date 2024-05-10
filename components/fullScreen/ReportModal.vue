<template>
    <v-row justify="center">
        <v-dialog v-model="showModalReport" content-class="contend-comment" con hide-overlay
            transition="dialog-bottom-transition">
            <v-card style="background-color: #ffffffcc">
                <div class="container_all_report_">
                    <div class="container_report_header">
                        <div v-if='!stepNext' @click="closeModalReport()" style="    position: absolute;
                            left: 14px; cursor: pointer;">
                            <img style="width: 35px; border-radius: 100%; object-fit: contain;     box-shadow: rgba(0, 0, 0, 0.25) -2px 0px 4px 0px;"
                                src="@/assets/img/button-float/backwhite.png" alt="">
                        </div>
                        <div v-else @click="stepSendReport(false)" style="    position: absolute;
                        left: 14px; cursor: pointer;">
                            <img style="width: 35px;  border-radius: 100%; object-fit: contain;     box-shadow: rgba(0, 0, 0, 0.25) -2px 0px 4px 0px;"
                                src="@/assets/img/button-float/backwhite.png" alt="">
                        </div>
                        <p>Report</p>
                    </div>
                    <div class="report_information_container">
                        <div class="report_information_container_flex">
                            <div class="report_information_container_bg_white">
                                <div class="container_title_report"> <span>Report what bothers you</span> <img
                                        style="width: 100px;" src="@/assets/img/button-float/alertBlue.png" alt="">
                                </div>

                                <div v-if="!stepNext" class="container_report_type_information animations_type-report">
                                    <div v-for="(item, index) in typeReport" :key="index" @click="getTypeReport(item)"
                                        :class="reportData?.type === item.type ? 'container_report_bg-gradient' : 'container_report_bg-gray'">
                                        <p> {{ item.value }} </p>
                                    </div>

                                </div>
                                <div v-else style="height: 400px;">
                                    <div class="container_report_bg-gradient animations_type-report">
                                        <p> {{ reportData?.value }} </p>
                                    </div>
                                    <div class="container_report_input_gradient animations_type-report"> <textarea
                                            class="description_input_report"
                                            placeholder="Tell us what the problem is..."
                                            v-model="descriptionReport"></textarea> </div>
                                </div>
                                <button :class="validButton ? 'opacity_button' : 'button_report'"
                                    @click=" !stepNext ? stepSendReport(true, dataChallenge.id) : setDataReport(dataChallenge.id)"
                                    :disabled="validButton ? true : false"> {{ !stepNext ? 'Send' : 'Report' }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </v-card>
        </v-dialog>
    </v-row>

</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import noUser from "../../assets/img/png/userfeed.png";
import LoadingChallenge from "@/components/LoadingChallenge.vue";
import { onFile } from "../../stub/functions";

export default {

    data() {
        return {
            showModalReport: false,
            userData: {},
            reportData: {},
            stoppedShow: false,
            dataChallenge: {},
            descriptionReport: '',
            stepNext: false,
            animatioSlide: false,
            typeReport: [
                {
                    id: 1,
                    type: 'Racist Content',
                    value: 'This challenge contains racist, sexist or discrimination content'
                },
                {
                    id: 2,
                    type: 'Pornographic Content',
                    value: 'This challenge contains insults, pornographic or violent content'
                },
                {
                    id: 3,
                    type: 'Violent Content',
                    value: 'This challenge shares private, non-consensual information content'
                },
                {
                    id: 4,
                    type: 'Potentially Content',
                    value: 'This challenge contains fake information, that potentially may be a scam'
                },
                {
                    id: 5,
                    type: 'Other',
                    value: 'Other'
                },
            ]
        };
    },

    methods: {
        ...mapActions("user", ["nicknameAction"]),
        getTypeReport(item) {

            this.reportData = item

            console.log("yasta", item);
        },
        stepSendReport(boolean, id) {
            if (this.reportData?.type === 'Other') {
                this.stepNext = boolean
            } else {
                let description = this.reportData?.type != 'Other' ? this.reportData?.value : this?.descriptionReport
                let dataItem = {
                    description: description,
                    fromUser: this?.userData.id,
                    type: this?.reportData.type
                }
                console.log(dataItem);
                this.$axios.$post(`/dashboard/challenge/report/${id}`, dataItem).then((result) => {
                    if (result) {
                        this.showModalReport = false
                        this.stepNext = false
                        this.descriptionReport = ''
                        this.reportData = {}
                        return
                    }
                    console.log("Holaaa", result);

                }).catch((err) => {
                    console.log("CHAOOO", err);
                });
            }
        },
        setDataReport(id) {
            console.log(id);
            let dataItem = {
                description: this?.descriptionReport,
                fromUser: this?.userData.id,
                type: this?.reportData.type
            }
            console.log(dataItem);
            this.$axios.$post(`/dashboard/challenge/report/${id}`, dataItem).then((result) => {
                if (result) {
                    this.showModalReport = false
                    this.stepNext = false
                    this.descriptionReport = ''
                    this.reportData = {}
                    return
                }
                console.log("Holaaa", result);

            }).catch((err) => {
                console.log("CHAOOO", err);
            });
        },
        closeModalReport() {
            this.showModalReport = false
            this.stepNext = false

            return this.reportData = {}
        }
    },
    computed: {
        validButton: function () {
            if (!this.stepNext && !this.reportData?.id) return true
            if (this.stepNext && !this.descriptionReport) return true
        }
    },
    mounted() {
        this.$nuxt.$off("openModalReport");
        this.$nuxt.$on("openModalReport", (option) => {
            console.log("option", option);
            this.dataChallenge = option.data.challenge
            this.showModalReport = option.status
            this.userData = option.user
            console.log(this.validButton);

        });
    }
};
</script>
<style scoped>
.container_all_report_ {
    width: 100%;
    height: 100dvh;
    background: rgba(227, 227, 227, 0.94118);
    display: flex;
    flex-direction: column;
}

.container_report_ {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}



.container_report_header {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 60px;
    background: white;
    border-radius: 0px 0px 32px;
}

.container_report_header p {
    color: #2F4B75;
    font-size: 22px;
    font-weight: 700;
}

.report_information_container {
    position: relative;
    height: 100%;
    width: 100%;
}

.report_information_container_flex {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.report_information_container_bg_white {
    background: white;
    padding: 24px;
    border-radius: 11px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.container_report_input_gradient {
    width: 100%;
    height: 100px;
    margin-top: 15px;
    border: 3px solid transparent;
    border-radius: 10px;
    background-image: linear-gradient(white, white),
        linear-gradient(to right, #12A4DB, #044F85);
    background-origin: border-box;
    background-clip: content-box, border-box;
}

textarea {
    resize: none;
}

.description_input_report {
    padding: 8px;
    text-align: justify;
    font-size: 17px;
    width: 100%;
    height: 94%;
    font-weight: 700;
    color: #bfbaba;
    outline: none;
}

.container_report_type_information {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
    font-weight: 700;
    color: rgb(196, 196, 196);
}

.container_report_bg-gradient {
    padding: 12px;
    cursor: pointer;
    border-radius: 10px;
    background: rgb(208, 208, 208);
    color: white;
    width: 330px;
    background: rgb(18, 164, 219);
    background: linear-gradient(63deg, rgba(18, 164, 219, 1) 10%, rgba(4, 79, 133, 1) 93%);
}

.container_report_bg-gradient p {
    font-size: 17px;
    font-weight: 600;
    text-shadow: 0px 1px 6px #3b3b3b;
}

.container_report_bg-gray p {
    font-size: 17px;
    font-weight: 600;
}

.container_report_bg-gray {
    padding: 12px;
    cursor: pointer;
    border-radius: 10px;
    width: 330px;
    background: rgb(208, 208, 208);
    color: white;
}

.container_title_report {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.container_title_report span {
    color: #2F4B75;
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 20px;
}

.opacity_button {
    opacity: 0.7;
    padding: 10px;
    color: white;
    width: 141px;
    border-radius: 12px;
    background: rgb(198, 199, 199);

}

.button_report {
    padding: 10px;
    color: white;
    width: 141px;
    border-radius: 12px;
    background: rgb(18, 164, 219);
    font-weight: 700;
    background: linear-gradient(63deg, rgba(18, 164, 219, 1) 10%, rgba(4, 79, 133, 1) 93%);
}

.animations_type-report {
    animation: typeReport_X 1s ease-in-out;
}

@keyframes typeReport_X {
    0% {
        transform: translateX(100%);
    }

    50% {
        transform: translateX(-8%);
    }

    65% {
        transform: translateX(4%);
    }

    80% {
        transform: translateX(-4%);
    }

    95% {
        transform: translateX(2%);
    }

    100% {
        transform: translateX(0%);
    }
}
</style>