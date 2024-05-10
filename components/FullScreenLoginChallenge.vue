<template>
    <div class="full-Screen">
        <v-bottom-sheet v-model="modalLogin" persistent hide-overlay>
            <div v-if="fileMedia && typeMedia" class="overlays">
                <div class="width-video">
                    <v-sheet class="text-center" style="background: #27a1fd; position: relative;" height="100vh">
                        <video
                            v-if="typeMedia == 'video/mp4' || typeMedia == 'video/MOV' || typeMedia == 'video/3GP' || typeMedia == 'video/AVI' || typeMedia == 'video/quicktime'"
                            autoplay loop playsinline="false" class="video-fullScreen" id="video-background" muted>
                            <source :src="fileMedia">
                            <source :src="fileMedia">

                        </video>
                        <img v-if="typeMedia === 'image/jpeg' || typeMedia === 'image/png'"
                            style="    width: 100%; height: 100%; object-fit: cover;" :src="fileMedia" alt="">

                    </v-sheet>
                </div>

            </div>

        </v-bottom-sheet>

    </div>
</template>
<script>

import { mapState, mapActions } from "vuex";
export default {
    computed: {
        ...mapState("phoneSize", ["windowWidthT"]),
    },
    data() {
        return {
            modalLogin: false,
            fileMedia: '',
            typeMedia: 0,
            format: ''
        }
    },
    methods: {
        ...mapActions("login", ["openCloseLogin"]),
        toListenWidth() {
            return window.innerWidth
        },
        closet() {
            this.modalLogin = false
        }
    },
    created() {
        this.$nuxt.$on("FullScreenLoginChallenge", option => {
            document.documentElement.style.touchAction = "auto";
            this.fileMedia = null
            this.$axios
                .$post(`/stats/record`,
                    {
                        id: localStorage.getItem("recordStepId"),
                        step: "SHARE_UPLOAD",
                    },
                    {
                        Headers: {
                            'Content-Type': 'application/json'
                        },
                    }
                )
            document.getElementsByTagName("body")[0].style.overflow = "hidden";
            this.modalLogin = option[0]
            if (option[1]) {
                this.fileMedia = URL.createObjectURL(option[1])
                this.typeMedia = option[1].type
            }
            this.$nuxt.$emit("openLogin", [true, option[1], option[2], 'succes', option[3], option[4]]);
        })
    },
}
</script>
<style scoped>
.full-Screen {
    /*  height: 22vh; */
    overflow: hidden;
    width: 400px !important;

}

.button-closet {
    position: absolute;
    z-index: 9999;
    padding-left: 1%;
    top: 1%;
}

.video-fullScreen {
    width: 100%;
    height: 100%;
    object-fit: contain;
    position: relative;
    z-index: 0;
    object-fit: cover;

}

.width-video {
    width: 420px;
}

.overlays {
    display: flex;
    justify-content: center;
}

@media(max-width: 640px) {

    .width-video {
        width: 100%;
    }
}
</style>