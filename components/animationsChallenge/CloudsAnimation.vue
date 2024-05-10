<template>
    <div>
        <div class="div-bg" style="background-image: url('https://chgs.shareity.me/animation/nubes.gif');">
            <div class="challenge-text-container">
                <div class="challenge">
                    <img src="https://chgs.shareity.me/animation/challenge.png">
                </div>

                <img :src="urlBucket + 'organization/1715281125259.jpg'" class="brand_img"> <img
                    src="https://chgs.shareity.me/animation/donated.png" class="donated_img">
                <div class="to_img-cause_img"><img src="https://chgs.shareity.me/animation/to.png" class="to_img">
                    <img :src="urlBucket + 'organization/1715281125259.jpg'" class="cause_img">
                </div> <img src="https://chgs.shareity.me/animation/because.png" class="because_img">
                <div class="text1_png_text2_png"><img src="https://chgs.shareity.me/animation/text1.png"
                        class="text1_png">
                    <img src="https://chgs.shareity.me/animation/text2.png" class="text2_png">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        logoSponsor: String,
    },
    computed: {
        urlBucket() {
            return process.env.api_assets_url;
        },
    },
}
</script>
<style scoped>
.div-bg {
    position: absolute;
    background-size: cover;
    width: 400px;
    margin: 0 auto;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 400;
    overflow: hidden;
}

.challenge-text-container {
    position: relative;
}

.challenge-text-container>.challenge {
    position: absolute;
    top: 360px;
    animation-duration: 0.5s;
    animation-name: challenge_png;
    opacity: 0;
}

.challenge-text-container>.brand_img {
    position: absolute;
    opacity: 0;
    width: 50%;
    left: 100px;
    right: 0;
    top: 300px;
}

.challenge-text-container>.donated_img {
    position: absolute;
    opacity: 0;
    width: 80%;
    left: 45px;
    right: 0;
    top: 300px;
}

.challenge-text-container>.to_img {
    position: absolute;
    opacity: 0;
    width: 40%;
    left: 300px;
    right: 250px;
    top: 500px;
}

.challenge-text-container>.cause_img {
    position: absolute;
    opacity: 0;
    width: 30%;

}

.challenge {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.challenge img {
    width: 60%;

}

.brand_img {
    animation-name: brand_img_png;
    animation-duration: 1s;
    animation-delay: 1s;
}

.donated_img {
    animation-name: donated_img_png;
    animation-duration: 2.1s;
    animation-delay: 2.1s;
}

.to_img-cause_img>.to_img>.cause_img {
    position: relative;
}

.text1_png_text2_png {
    position: relative;
}

.to_img {
    opacity: 0;
    position: absolute;
    left: 130px;
    top: 250px;
    width: 30%;
    animation-name: to_img_cause_img;
    animation-duration: 3.1s;
    animation-delay: 4.2s;
}

.cause_img {
    opacity: 0;
    position: absolute;
    width: 50%;
    left: 100px;
    top: 400px;
    animation-name: to_img_cause_img;
    animation-duration: 3.1s;
    animation-delay: 4.2s;
}

.because_img {
    opacity: 0;
    position: absolute;
    width: 80%;
    left: 45px;
    top: 350px;
    animation-name: because_img;
    animation-duration: 1s;
    animation-delay: 7.4s;
}

.text1_png {
    opacity: 0;
    width: 100%;
    animation: animation_text_png 5s infinite;
    animation-duration: 2s;
    animation-delay: 8.5s;
}

.text2_png {
    opacity: 0;
    width: 100%;
    transform: translate(10px, -87px);
    animation: animation_text_png 5s infinite;
    animation-duration: 2s;
    animation-delay: 8.5s;
}


@keyframes challenge_png {
    0% {
        margin-top: -100%;
        width: 100%;
        opacity: 1;
    }

    50% {
        margin-top: 0%;
        width: 100%;
    }

    100% {
        opacity: 1;
    }
}

@keyframes brand_img_png {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 1;
    }
}

@keyframes donated_img_png {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 1;
    }
}


@keyframes to_img_cause_img {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 1;
    }
}

@keyframes because_img {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 1;
    }
}

@keyframes animation_text_png {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 1;
    }
}

@media (max-width: 640px) {
    .div-bg {
        width: 100%;
    }

}
</style>