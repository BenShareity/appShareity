<template>
    <div>
        <div class="container_animation_unsponsored">
            <div class="cloud_40 left_tiny_cloud"></div>
            <div class="first_cloud_container">
                <img class="moving_hand" src="@/assets/animations/Hand-3_Boy.svg" alt="">
                <img id="first_kids" class="kids" src="@/assets/animations/3_Kids.svg" alt="">
                <div class="cloud_600 first_cloud">
                </div>
            </div>
            <div class="cloud_400 left_big_cloud">
            </div>
            <div class="first_balloon_animation">
                <img class="first_balloon" src="@/assets/animations/balloon_small1-01.svg" alt="">
                <img class="shareity_icon_first_balloon" src="@/assets/animations/icon.png" alt="">
            </div>
            <div class="ballon_badge_dinamic_container">
                <div class="balloon_badge_dinamic_animation">
                    <img class="balloon" src="@/assets/animations/balloon_SponsorCause-01.svg" alt="">
                    <div class="badge_icon_dinamic_balloon2">
                        <span class="sign">500 </span>
                        <span class="sign-pts">pts </span>
                    </div>
                </div>
            </div>
            <div class="right_tiny_cloud">
            </div>
            <div class="right_tiny_cloud2">
            </div>

            <div class="bubbles_accept_entry_animation_container">
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
            </div>

            <div class="raised">
                <span class="dollar">$0 </span>
                <span class="raised-text">raised </span>
            </div>

            <div class="right_big_cloud">
                <img class="moving_hand2" src="@/assets/animations/Hand-2_Girl.svg" alt="">
                <img class="kids" id="second_kids" src="@/assets/animations/2_Kids.svg" alt="">
            </div>
            <span class="final_text">
                <img class="sponsor" :src="urlBucket + logoSponsor" alt="">
            </span>

        </div>
        <!--  <div id="m_l_s_content_bar_progress"
            class="row no-gutter content_flex flex_direction_row justify_content_center align_items_center">
            <div class="col-10"></div>
            <div class="col-80">
                <div id="m_l_s_bar_progress">
                    <div id="m_l_s_bar_progress_por"
                        class="content_flex flex_direction_row justify_content_center align_items_center m_l_s_bar_progress_por">
                        <div id="m_l_s_content_por" class="col-100 m_l_s_content_por">0%</div>
                    </div>
                </div>
            </div>
            <div class="col-10"></div>

        </div> -->
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
@keyframes first_cloud {
    100% {
        transform: translate(-50%, calc(30vh + 80vw));
    }
}

@keyframes first_balloon_animation {
    100% {
        transform: translate(0, calc(-100vh - 50vh));
    }
}

@keyframes left_tiny_cloud_animation {
    100% {
        transform: translate(0, calc(-100vh - 8vh));
    }
}

@keyframes right_big_cloud_animation {
    100% {
        transform: translate(0, calc(-100vh - 8vh));
    }
}

@keyframes right_tiny_cloud_animation {
    100% {
        transform: translate(0, calc(-100vh - 100vh));
    }
}

@keyframes left_big_cloud_animation {
    100% {
        transform: translate(0, calc(100vh + 25vh));
    }
}

@keyframes balloon_badge_dinamic_animation {
    100% {
        transform: translate(0, calc(100vh + 90vh));
    }
}

@keyframes disappear {
    100% {
        opacity: 0;
    }
}

@keyframes bubbles_accept_entry_animation_left_up {
    0% {
        opacity: 1;
    }

    40% {
        width: 6vw;
        height: 6vw;
    }

    100% {
        width: 8vw;
        height: 8vw;
        left: 0;
        top: 0;
        opacity: 0;
    }
}

@keyframes bubbles_accept_entry_animation_right_up {
    0% {
        opacity: 1;
    }

    40% {
        width: 6vw;
        height: 6vw;
    }

    100% {
        width: 8vw;
        height: 8vw;
        left: 100%;
        top: 0;
        opacity: 0;
    }
}

@keyframes bubbles_accept_entry_animation_left_down {
    0% {
        opacity: 1;
    }

    40% {
        width: 6vw;
        height: 6vw;
    }

    100% {
        width: 8vw;
        height: 8vw;
        left: 0;
        top: 100%;
        opacity: 0;
    }
}

@keyframes bubbles_accept_entry_animation_right_down {
    0% {
        opacity: 1;
    }

    40% {
        width: 6vw;
        height: 6vw;
    }

    100% {
        width: 8vw;
        height: 8vw;
        left: 100%;
        top: 100%;
        opacity: 0;
    }
}

@keyframes right_slop_balloon_animation {
    100% {
        top: -55vh;
    }
}

@keyframes right_rotate_ballon_animation {
    0% {
        transform: rotate(5deg);
    }

    50% {
        transform: rotate(-5deg);
    }

    100% {
        transform: rotate(5deg);
    }
}

@keyframes appear_raised {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 1;
        transform: translate(-50%, calc(-100vh - 30vh));
    }
}

@keyframes appear_final_text {
    100% {
        opacity: 1;
        transform: translate(-50%, calc(-100vh - 30vh));
    }
}

@keyframes moving_hand {
    0% {
        transform: rotate(-15deg);
    }

    50% {
        transform: rotate(5deg);
    }

    100% {
        transform: rotate(-15deg);
    }
}





.first_cloud_container {
    width: 100%;
    position: absolute;
    top: 20vh;
    animation: first_cloud 3s;
    animation-fill-mode: forwards;
}

.first_cloud {
    position: relative;
    margin-left: auto;
    margin-right: auto;
}

.left_tiny_cloud {
    position: absolute;
    right: -2.2vw;
    top: 46vh;
    -webkit-animation-name: left_tiny_cloud_animation;
    -webkit-animation-duration: 16s;
    animation: left_tiny_cloud_animation 16s;
    animation-fill-mode: forwards;
}

.right_tiny_cloud {
    position: absolute;
    left: -1.2vw;
    top: 100vh;
    width: 7vw;
    height: 13vw;
    border-radius: 100px;
    background: #ffffff;
    -webkit-animation-name: right_tiny_cloud_animation;
    -webkit-animation-duration: 9s;
    animation: right_tiny_cloud_animation 9s;
    animation-delay: 0s;
    animation-fill-mode: none;
    animation-fill-mode: forwards;
    animation-delay: 4.2s;
}

.right_tiny_cloud:before,
.right_tiny_cloud:after {
    content: '';
    border-radius: 50%;
    position: absolute;
    background: #ffffff;
}

.right_tiny_cloud:after {
    width: 8vw;
    height: 8vw;
    top: 2.5vw;
    right: -4vw;
}

/*Second tiny cloud*/

.right_tiny_cloud2 {
    position: absolute;
    left: -1.2vw;
    top: 100vh;
    width: 7vw;
    height: 13vw;
    border-radius: 100px;
    background: #ffffff;
    -webkit-animation-name: right_tiny_cloud_animation;
    -webkit-animation-duration: 9s;
    animation: right_tiny_cloud_animation 9s;
    animation-fill-mode: none;
    animation-fill-mode: forwards;
    animation-delay: 6.2s;
}

.right_tiny_cloud2:before,
.right_tiny_cloud2:after {
    content: '';
    border-radius: 50%;
    position: absolute;
    background: #ffffff;
}

.right_tiny_cloud2:after {
    width: 8vw;
    height: 8vw;
    top: 2.5vw;
    right: -4vw;
}

.right_big_cloud {
    position: absolute;
    right: -2.2vw;
    top: 110vh;
    width: 37vw;
    height: 17vw;
    border-radius: 100px;
    background: #ffffff;
    -webkit-animation-name: right_big_cloud_animation;
    -webkit-animation-duration: 5s;
    animation: right_big_cloud_animation 5s;
    animation-fill-mode: none;
    animation-fill-mode: forwards;
    animation-delay: 6s;
}

.right_big_cloud:before,
.right_big_cloud:after {
    content: '';
    border-radius: 50%;
    position: absolute;
    background: #ffffff;
}

.right_big_cloud:after {
    width: 20vw;
    height: 18vw;
    top: -5.5vw;
    right: 11vw;
}

.right_big_cloud:before {
    width: 16vw;
    height: 13vw;
    top: -4.5vw;
    right: 16px;
}

.left_big_cloud {
    position: absolute;
    left: -15%;
    top: -10%;
    -webkit-animation-name: left_big_cloud_animation;
    -webkit-animation-duration: 6s;
    animation: left_big_cloud_animation 6s;
    animation-fill-mode: forwards;
}

.first_balloon_animation {
    width: 15vw;
    position: absolute;
    top: 100vh;
    left: 65%;
    -webkit-animation-name: first_balloon_animation;
    -webkit-animation-duration: 4.5s;
    animation: first_balloon_animation 4.5s;
    animation-fill-mode: forwards;
    animation-delay: 1s;
    overflow: hidden;
}

.first_balloon_animation .first_balloon {
    width: 15vw;
}

.shareity_icon_first_balloon {
    position: relative;
    width: 13vw;
    top: -6vh;
}

.ballon_badge_dinamic_container {
    position: absolute;
    width: 100%;
    top: -115vh;
    z-index: 2;
    -webkit-animation-name: balloon_badge_dinamic_animation, disappear;
    -webkit-animation-duration: 7s, 100ms;
    animation: balloon_badge_dinamic_animation, disappear;
    animation-duration: 7s, 1ms;
    animation-fill-mode: forwards;
    animation-delay: 1s, 4.5s;
}

.balloon_badge_dinamic_animation {
    width: 60vw;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    height: 85vh;
    overflow: hidden;
}

.balloon_badge_dinamic_animation .balloon {
    width: 60vw;
}

.badge_icon_dinamic_balloon2 {
    position: absolute;
    background: #0085E5;
    width: 100%;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    height: 35vw;
    text-align: center;
}

.sign {
    font-size: 22vw;
    top: 35%;
    position: absolute;
    transform: translate(-50%, -50%);
    color: white;
}

.sign1 {
    font-size: 7.5vw;
    top: 35%;
    transform: translate(-50%, -50%);
    color: white;
}

.sign-pts {
    text-transform: uppercase;
    bottom: 0;
    font-size: 7vw;
    color: black;
    position: absolute;
    transform: translateX(-50%);
}

.bubbles_accept_entry_animation_container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50vw;
    height: 50vw;
    -webkit-transform: translateX(-50%);
    transform: translate(-50%, -50%);
    opacity: 0.75;
}

.bubble {
    width: 5vw;
    height: 5vw;
    background-color: #c5c5c594;
    border-radius: 50%;
}

.bubble:nth-child(1) {
    position: absolute;
    left: 50%;
    top: 45%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    opacity: 0;
    animation: bubbles_accept_entry_animation_left_up 1s;
    animation-fill-mode: forwards;
    animation-delay: 4.5s;
}

.bubble:nth-child(2) {
    position: absolute;
    left: 50%;
    top: 45%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    opacity: 0;
    animation: bubbles_accept_entry_animation_right_up 1s;
    animation-fill-mode: forwards;
    animation-delay: 4.5s;
}

.bubble:nth-child(3) {
    position: absolute;
    left: 50%;
    top: 45%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    opacity: 0;
    animation: bubbles_accept_entry_animation_left_down 1s;
    animation-fill-mode: forwards;
    animation-delay: 4.5s;
}

.bubble:nth-child(4) {
    position: absolute;
    left: 50%;
    top: 45%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    opacity: 0;
    animation: bubbles_accept_entry_animation_right_down 1s;
    animation-fill-mode: forwards;
    animation-delay: 4.5s;
}

.right_slop_balloon_animation {
    width: 25vw;
    position: absolute;
    top: 100vh;
    left: 65%;
    -webkit-animation: right_slop_balloon_animation 5s 1, right_rotate_ballon_animation 1s infinite;
    animation: right_slop_balloon_animation 5s 1, right_rotate_ballon_animation 1s infinite;
    animation-delay: 5.5s;
}

.right_slop_balloon_animation .slop_balloon {
    width: 23vw;
}

.right_slop_balloon_animation .shareity_icon {
    position: absolute;
    width: 20vw;
    left: 40%;
    top: 55vw;
    background: white;
    border-radius: 7px;
    transform: translateX(-50%);
}

.cloud_600 {
    width: 55%;
    height: 15vw;
    border-radius: 100px;
    background: #ffffff;
}

.cloud_600:before,
.cloud_600:after {
    content: '';
    border-radius: 50%;
    position: absolute;
    background: #ffffff;
}

.cloud_600:before {
    width: 25vw;
    height: 25vw;
    bottom: 38%;
    right: 14%;
    position: absolute;
}

.cloud_600:after {
    width: 15vw;
    height: 15vw;
    bottom: 53%;
    left: 19%;
}

.cloud_400 {
    width: 60vw;
    height: 21vw;
    border-radius: 100px;
    background: #ffffff;
    ;
}

.cloud_400:before,
.cloud_400:after {
    content: '';
    border-radius: 50%;
    position: absolute;
    background: #ffffff;
}

.cloud_400:before {
    width: 24vw;
    height: 28vw;
    top: -8vw;
    left: 9vw;
}

.cloud_400:after {
    width: 27vw;
    height: 27vw;
    top: -13vw;
    right: 7vw;
}

.cloud_40 {
    width: 4vh;
    height: 8vh;
    border-radius: 100px;
    background: #ffffff;
}

.cloud_40:before {
    content: '';
    border-radius: 50%;
    position: absolute;
    background: #ffffff;
}

.cloud_40:before {
    width: 5vh;
    height: 5vh;
    top: 1.5vh;
    right: 1.5vh;
}

.raised {
    position: absolute;
    top: 35%;
    width: 70vw;
    transform: translateX(-50%);
    text-align: center;
    left: 50%;
    text-transform: uppercase;
    opacity: 0;
    -webkit-animation-name: appear_raised;
    -webkit-animation-duration: 10s;
    animation: appear_raised;
    animation-duration: 10s;
    animation-fill-mode: forwards;
    animation-delay: 4.5s;

}

.final_text {
    position: absolute;
    top: 135vh;
    width: 100%;
    transform: translate(-50%, -50%);
    text-align: center;
    left: 50%;
    text-transform: uppercase;
    -webkit-animation-name: appear_final_text;
    -webkit-animation-duration: 5s;
    animation: appear_final_text;
    animation-duration: 5s;
    animation-fill-mode: forwards;
    animation-delay: 5.2s;

}

.dollar {
    display: block;
    font-size: 20vw;
    color: #6EC201;
    font-weight: bold;
}

.raised-text {
    font-size: 12vw;
    color: white;
    font-weight: bold;
}

.sponsor {
    width: 45vw;
    display: block;
    margin: auto;
    margin-bottom: -10%;
}

#first_kids {
    z-index: 900000000;
    position: relative;
    width: 56vw;
    top: 11vw;
    left: 20vw;
}

#second_kids {
    z-index: 900000000;
    position: relative;
    width: 31vw;
    top: -6vw;
    left: 3vw;
}

.moving_hand {
    position: absolute;
    top: 24.1vw;
    right: 21.5vw;
    width: 9vw;
    z-index: -1;
    animation: moving_hand 1s infinite;
}

.moving_hand2 {
    position: absolute;
    top: -3.5vw;
    left: 0.3vw;
    width: 5vw;
    z-index: -1;
    animation: moving_hand 1s infinite;
}

.container_animation_unsponsored {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 400px;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    z-index: 400;
    background-color: #777 !important;

}

.thnks-big {
    font-size: 4em;
    line-height: 2em;
}

@media (max-width: 640px) {
    .container_animation_unsponsored {
        width: 100%;

    }

}
</style>