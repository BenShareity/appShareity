<template>
    <div>
        <div class="container_animation_bubly">

            <div class="first_text_great_shot">
                <span>Great Shot!</span>
            </div>

            <div class="green_bubbles_container">
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
            </div>


            <div class="circles_logo_entry_animation_container">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>

            <div class="bulby_logo_container">
                <img src="img/svg/bubly_logo_rectangle.svg" alt="">
            </div>

            <div class="second_text_container">
                <span>Doanted <span class="big_text_dollar">$1</span></span>
            </div>

            <div class="second_circles_logo_entry_animation_container">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>

            <div class="red_bubbles_container">
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
            </div>

            <div class="third_text_container">
                <span>Because of <span class="bigText">YOU</span></span>
            </div>

            <div class="orange_bubbles_container">
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
            </div>

            <div class="oh_hi_circle_container">
                <span>oh hi</span>
            </div>

            <div class="all_smiles_text">
                <span>all smiles&trade;</span>
            </div>

            <div class="blue_smiles_container">
                <img class="smile" src="img/svg/smile.svg" alt="">
                <img class="smile" src="img/svg/smile.svg" alt="">
                <img class="smile" src="img/svg/smile.svg" alt="">
                <img class="smile" src="img/svg/smile.svg" alt="">
                <img class="smile" src="img/svg/smile.svg" alt="">
                <img class="smile" src="img/svg/smile.svg" alt="">
                <img class="smile" src="img/svg/smile.svg" alt="">
                <img class="smile" src="img/svg/smile.svg" alt="">
                <img class="smile" src="img/svg/smile.svg" alt="">
                <img class="smile" src="img/svg/smile.svg" alt="">
                <img class="smile" src="img/svg/smile.svg" alt="">
                <img class="smile" src="img/svg/smile.svg" alt="">
                <img class="smile" src="img/svg/smile.svg" alt="">
                <img class="smile" src="img/svg/smile.svg" alt="">
                <img class="smile" src="img/svg/smile.svg" alt="">
            </div>

            <div class="bubly_cans_container">
                <img src="img/svg/canstransparent.svg" alt="">
            </div>

            <div class="third_circles_logo_entry_animation_container">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>

            <div class="last_bulby_logo_container">
                <img src="img/svg/bubly_logo_rectangle.svg" alt="">
            </div>

        </div>
        <div id="m_l_s_content_bar_progress"
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
        </div>
    </div>

</template>
<style scoped>
@keyframes entry_center_text {
    100% {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
}

@keyframes shake_bubbles {

    10%,
    90% {
        transform: translate3d(-1px, -3px, -3px);
    }

    20%,
    80% {
        transform: translate3d(2px, 3px, 3px);
    }

    30%,
    50%,
    70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
        transform: translate3d(4px, 0, 0);
    }
}

@keyframes translate_bubbles {
    100% {
        transform: translateY(calc(-100vh - 100vh));
    }
}

@keyframes background_container {
    0% {
        background-color: #83B84D;
    }

    20% {
        background-color: #FF4735;
    }

    50% {
        background-color: #FF9824;
    }

    100% {
        background-color: #68BFE9;
    }
}

@keyframes circle_logo_entry_animation_left_up {
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

@keyframes circle_logo_entry_animation_right_up {
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

@keyframes circle_logo_entry_animation_left_down {
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

@keyframes circle_logo_entry_animation_right_down {
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

@keyframes bulby_logo_animation_entry {
    100% {
        opacity: 1;
    }
}

@keyframes donated_to_animation {
    30% {
        transform: translate(-50%, -50%);
    }

    100% {
        transform: translate(-50%, -100vh);
        opacity: 1;
    }
}

@keyframes because_you_animation {
    100% {
        transform: translate(-50%, -50vh);
    }
}

@keyframes oh_hi_circle_animation {
    30% {
        width: 25vw;
        height: 25vw;
    }

    80% {}

    99% {
        width: 100vw;
        height: 100vw;
        visibility: hidden;
    }

    100% {
        transform: translate(-50%, -100vh);
    }
}

@keyframes oh_hi_text_hide_animation {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@keyframes all_smiles_text_animation {
    100% {
        opacity: 1;
    }
}

@keyframes bubly_cans_animation {
    100% {
        bottom: -0.5vh;
    }
}

@keyframes blue_smiles_animation {
    100% {
        transform: translate(0, calc(-100vh - 100vh));
    }
}


.container_animation_bubly {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #83B84D;
    overflow: hidden;
    animation: background_container 9s steps(1, end) forwards;
    animation-delay: 0s;
    z-index: 999999;
    width: 400px;
}

.first_text_great_shot {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 90%;
    text-align: center;
    transform: translate(-50%, 50%);
    opacity: 0;
    animation: entry_center_text 2s;
}

.first_text_great_shot span {
    font-family: 'Lemon/Milk';
    font-size: 10vw;
    color: white;
}

.green_bubbles_container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 100vh;
    animation: translate_bubbles 6s;
    animation-delay: 0s;

}

.green_bubbles_container .bubble {
    position: absolute;
    background-color: #009945;
    border-radius: 50%;
    opacity: 0.6;

    animation: shake_bubbles 0.82s cubic-bezier(.36, .07, .19, .97) both infinite;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;

}

.green_bubbles_container .bubble:nth-child(1) {
    width: 15vw;
    height: 15vw;
    top: 30%;
    left: 2%;
}

.green_bubbles_container .bubble:nth-child(2) {
    width: 11vw;
    height: 11vw;
    top: 40%;
    left: 20%;
}

.green_bubbles_container .bubble:nth-child(3) {
    width: 5vw;
    height: 5vw;
    top: 50%;
    left: 2%;
}

.green_bubbles_container .bubble:nth-child(4) {
    width: 9vw;
    height: 9vw;
    top: 70%;
    left: 26%;
}

.green_bubbles_container .bubble:nth-child(5) {
    width: 7vw;
    height: 7vw;
    top: 80%;
    left: 50%;
}

.green_bubbles_container .bubble:nth-child(6) {
    width: 15vw;
    height: 15vw;
    top: 70%;
    left: 9%;
}

.green_bubbles_container .bubble:nth-child(7) {
    width: 30vw;
    height: 30vw;
    top: 85%;
    left: 30%;
}

.green_bubbles_container .bubble:nth-child(8) {
    width: 10vw;
    height: 10vw;
    top: 75%;
    left: 80%;
}

.green_bubbles_container .bubble:nth-child(9) {
    width: 10vw;
    height: 10vw;
    top: 60%;
    left: 50%;
}

.green_bubbles_container .bubble:nth-child(10) {
    width: 20vw;
    height: 20vw;
    top: 65%;
    left: 80%;
}

.green_bubbles_container .bubble:nth-child(11) {
    width: 10vw;
    height: 10vw;
    top: 90%;
    left: 20%;
}

.green_bubbles_container .bubble:nth-child(12) {
    width: 10vw;
    height: 10vw;
    top: 80%;
    left: 10%;
}

.green_bubbles_container .bubble:nth-child(13) {
    width: 10vw;
    height: 10vw;
    top: 20%;
    left: 60%;
}

.green_bubbles_container .bubble:nth-child(14) {
    width: 20vw;
    height: 20vw;
    top: 28%;
    left: 30%;
}

.green_bubbles_container .bubble:nth-child(15) {
    width: 15vw;
    height: 15vw;
    top: 30%;
    left: 70%;
}

.circles_logo_entry_animation_container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50vw;
    height: 50vw;
    -webkit-transform: translateX(-50%);
    transform: translate(-50%, -50%);
    opacity: 0.75;
}

.circles_logo_entry_animation_container .circle {
    position: absolute;
    width: 5vw;
    height: 5vw;
    background-color: #c5c5c594;
    border-radius: 50%;
    animation-fill-mode: forwards;
    animation-delay: 3s;
    opacity: 0;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.circles_logo_entry_animation_container .circle:nth-child(1) {
    left: 50%;
    top: 45%;
    animation: circle_logo_entry_animation_left_up 1.5s;
    animation-delay: 2s;
}

.circles_logo_entry_animation_container .circle:nth-child(2) {
    left: 50%;
    top: 45%;
    animation: circle_logo_entry_animation_right_up 1.5s;
    animation-delay: 2s;
}

.circles_logo_entry_animation_container .circle:nth-child(3) {
    left: 50%;
    top: 45%;
    animation: circle_logo_entry_animation_left_down 1.5s;
    animation-delay: 2s;
}

.circles_logo_entry_animation_container .circle:nth-child(4) {
    left: 50%;
    top: 45%;
    animation: circle_logo_entry_animation_right_down 1.5s;
    animation-delay: 2s;
}

.bulby_logo_container {
    width: 90%;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    animation: bulby_logo_animation_entry 2s;
    animation-delay: 2s;
    opacity: 0;
}

.bulby_logo_container img {}

.second_text_container {
    width: 70%;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    animation: donated_to_animation 4s;
    animation-delay: 4s;
    opacity: 0;
    display: block;
}

.second_text_container span {
    font-family: 'Lemon/Milk';
    font-size: 10vw;
    color: white;
}

.second_circles_logo_entry_animation_container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50vw;
    height: 50vw;
    -webkit-transform: translateX(-50%);
    transform: translate(-50%, -50%);
    opacity: 0.75;
}

.second_circles_logo_entry_animation_container .circle {
    position: absolute;
    width: 5vw;
    height: 5vw;
    background-color: #c5c5c594;
    border-radius: 50%;
    animation-fill-mode: forwards;
    animation-delay: 3s;
    opacity: 0;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.second_circles_logo_entry_animation_container .circle:nth-child(1) {
    left: 50%;
    top: 45%;
    animation: circle_logo_entry_animation_left_up 1.5s;
    animation-delay: 4s;
}

.second_circles_logo_entry_animation_container .circle:nth-child(2) {
    left: 50%;
    top: 45%;
    animation: circle_logo_entry_animation_right_up 1.5s;
    animation-delay: 4s;
}

.second_circles_logo_entry_animation_container .circle:nth-child(3) {
    left: 50%;
    top: 45%;
    animation: circle_logo_entry_animation_left_down 1.5s;
    animation-delay: 4s;
}

.second_circles_logo_entry_animation_container .circle:nth-child(4) {
    left: 50%;
    top: 45%;
    animation: circle_logo_entry_animation_right_down 1.5s;
    animation-delay: 4s;
}

.red_bubbles_container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 100vh;
    animation: translate_bubbles 4s;
    animation-delay: 3s;

}

.red_bubbles_container .bubble {
    position: absolute;
    background-color: #CE392D;
    border-radius: 50%;
    opacity: 0.6;

    animation: shake_bubbles 0.82s cubic-bezier(.36, .07, .19, .97) both infinite;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;

}

.red_bubbles_container .bubble:nth-child(1) {
    width: 15vw;
    height: 15vw;
    top: 30%;
    left: 2%;
}

.red_bubbles_container .bubble:nth-child(2) {
    width: 11vw;
    height: 11vw;
    top: 40%;
    left: 20%;
}

.red_bubbles_container .bubble:nth-child(3) {
    width: 5vw;
    height: 5vw;
    top: 50%;
    left: 2%;
}

.red_bubbles_container .bubble:nth-child(4) {
    width: 9vw;
    height: 9vw;
    top: 70%;
    left: 26%;
}

.red_bubbles_container .bubble:nth-child(5) {
    width: 7vw;
    height: 7vw;
    top: 80%;
    left: 50%;
}

.red_bubbles_container .bubble:nth-child(6) {
    width: 15vw;
    height: 15vw;
    top: 70%;
    left: 9%;
}

.red_bubbles_container .bubble:nth-child(7) {
    width: 30vw;
    height: 30vw;
    top: 85%;
    left: 30%;
}

.red_bubbles_container .bubble:nth-child(8) {
    width: 10vw;
    height: 10vw;
    top: 75%;
    left: 80%;
}

.red_bubbles_container .bubble:nth-child(9) {
    width: 10vw;
    height: 10vw;
    top: 60%;
    left: 50%;
}

.red_bubbles_container .bubble:nth-child(10) {
    width: 20vw;
    height: 20vw;
    top: 65%;
    left: 80%;
}

.red_bubbles_container .bubble:nth-child(11) {
    width: 10vw;
    height: 10vw;
    top: 90%;
    left: 20%;
}

.red_bubbles_container .bubble:nth-child(12) {
    width: 10vw;
    height: 10vw;
    top: 80%;
    left: 10%;
}

.red_bubbles_container .bubble:nth-child(13) {
    width: 10vw;
    height: 10vw;
    top: 20%;
    left: 60%;
}

.red_bubbles_container .bubble:nth-child(14) {
    width: 20vw;
    height: 20vw;
    top: 28%;
    left: 30%;
}

.red_bubbles_container .bubble:nth-child(15) {
    width: 15vw;
    height: 15vw;
    top: 30%;
    left: 70%;
}

.third_text_container {
    width: 90%;
    height: auto;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0);
    text-align: center;
    animation: because_you_animation 4s;
    animation-delay: 5s;
}

.third_text_container span {
    font-family: 'Lemon/Milk';
    font-size: 10vw;
    color: white;
}

.bigText {
    font-size: 25vw !important;
}

.oh_hi_circle_container {
    width: 25vw;
    height: 25vw;
    background-color: #68BFE9;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    top: 100vh;
    text-align: center;
    border-radius: 50%;
    animation: oh_hi_circle_animation 2s;
    animation-delay: 7.5s;
}

.oh_hi_circle_container span {
    font-family: 'Lemon/Milk';
    font-size: 6vw;
    color: white;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: oh_hi_text_hide_animation 0.6s steps(1, end) forwards;
    animation-delay: 7.5s;
}

.all_smiles_text {
    width: 90%;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    transform: translate(-50%, -50%);
    animation: all_smiles_text_animation 2s;
    animation-delay: 8s;
    text-align: center;
}

.all_smiles_text span {
    font-family: 'Lemon/Milk';
    font-size: 6vw;
    color: white;
}

.blue_smiles_container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 100vh;
    animation: blue_smiles_animation 3s infinite;
    animation-delay: 7.5s;
}

.blue_smiles_container .smile {
    position: absolute;
}

.blue_smiles_container .smile:nth-child(1) {
    width: 5vw;
    height: 5vw;
    top: 40%;
    left: 20%;
}

.blue_smiles_container .smile:nth-child(2) {
    width: 10vw;
    height: 10vw;
    top: 20%;
    left: 40%;
}

.blue_smiles_container .smile:nth-child(3) {
    width: 15vw;
    height: 15vw;
    top: 49%;
    left: 60%;
}

.blue_smiles_container .smile:nth-child(4) {
    width: 20vw;
    height: 20vw;
    top: 10%;
    left: 20%;
}

.blue_smiles_container .smile:nth-child(5) {
    width: 17vw;
    height: 17vw;
    top: 60%;
    left: 16%;
}

.blue_smiles_container .smile:nth-child(6) {
    width: 20vw;
    height: 20vw;
    top: 60%;
    left: 30%;
}

.blue_smiles_container .smile:nth-child(7) {
    width: 7vw;
    height: 7vw;
    top: 50%;
    left: 40%;
}

.blue_smiles_container .smile:nth-child(8) {
    width: 8vw;
    height: 8vw;
    top: 80%;
    left: 80%;
}

.blue_smiles_container .smile:nth-child(9) {
    width: 9vw;
    height: 9vw;
    top: 59%;
    left: 60%;
}

.blue_smiles_container .smile:nth-child(10) {
    width: 10vw;
    height: 10vw;
    top: 85%;
    left: 20%;
}

.blue_smiles_container .smile:nth-child(11) {
    width: 11vw;
    height: 11vw;
    top: 35%;
    left: 50%;
}

.blue_smiles_container .smile:nth-child(12) {
    width: 12vw;
    height: 12vw;
    top: 70%;
    left: 20%;
}

.blue_smiles_container .smile:nth-child(13) {
    width: 13vw;
    height: 13vw;
    top: 90%;
    left: 30%;
}

.blue_smiles_container .smile:nth-child(14) {
    width: 14vw;
    height: 14vw;
    top: 650%;
    left: 30%;
}

.blue_smiles_container .smile:nth-child(15) {
    width: 16vw;
    height: 16vw;
    top: 20%;
    left: 70%;
}

.bubly_cans_container {
    width: 100%;
    height: auto;
    position: absolute;
    bottom: -20vh;
    opacity: 1;
    animation: bubly_cans_animation 3s forwards;
    animation-delay: 8s;
}

.bubly_cans_container img {
    width: 100vw;
    height: 34vw;
    object-fit: cover;
}

.third_circles_logo_entry_animation_container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50vw;
    height: 50vw;
    -webkit-transform: translateX(-50%);
    transform: translate(-50%, -50%);
    opacity: 0.75;
}

.third_circles_logo_entry_animation_container .circle {
    position: absolute;
    width: 5vw;
    height: 5vw;
    background-color: #c5c5c594;
    border-radius: 50%;
    animation-fill-mode: forwards;
    animation-delay: 3s;
    opacity: 0;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.third_circles_logo_entry_animation_container .circle:nth-child(1) {
    left: 50%;
    top: 45%;
    animation: circle_logo_entry_animation_left_up 1.5s;
    animation-delay: 9.4s;
}

.third_circles_logo_entry_animation_container .circle:nth-child(2) {
    left: 50%;
    top: 45%;
    animation: circle_logo_entry_animation_right_up 1.5s;
    animation-delay: 9.4s;
}

.third_circles_logo_entry_animation_container .circle:nth-child(3) {
    left: 50%;
    top: 45%;
    animation: circle_logo_entry_animation_left_down 1.5s;
    animation-delay: 9.4s;
}

.third_circles_logo_entry_animation_container .circle:nth-child(4) {
    left: 50%;
    top: 45%;
    animation: circle_logo_entry_animation_right_down 1.5s;
    animation-delay: 9.4s;
}

.last_bulby_logo_container {
    width: 90%;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    animation: bulby_logo_animation_entry 2s forwards;
    animation-delay: 9.4s;
    opacity: 0;
}

.bulby_logo_container img {}

.big_text_dollar {
    font-size: 45vw !important;
}


.orange_bubbles_container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 100vh;
    animation: translate_bubbles 4s;
    animation-delay: 5s;

}

.orange_bubbles_container .bubble {
    position: absolute;
    background-color: #FFB01B;
    border-radius: 50%;
    opacity: 0.6;

    animation: shake_bubbles 0.82s cubic-bezier(.36, .07, .19, .97) both infinite;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;

}

.orange_bubbles_container .bubble:nth-child(1) {
    width: 15vw;
    height: 15vw;
    top: 30%;
    left: 2%;
}

.orange_bubbles_container .bubble:nth-child(2) {
    width: 11vw;
    height: 11vw;
    top: 40%;
    left: 20%;
}

.orange_bubbles_container .bubble:nth-child(3) {
    width: 5vw;
    height: 5vw;
    top: 50%;
    left: 2%;
}

.orange_bubbles_container .bubble:nth-child(4) {
    width: 9vw;
    height: 9vw;
    top: 70%;
    left: 26%;
}

.orange_bubbles_container .bubble:nth-child(5) {
    width: 7vw;
    height: 7vw;
    top: 80%;
    left: 50%;
}

.orange_bubbles_container .bubble:nth-child(6) {
    width: 15vw;
    height: 15vw;
    top: 70%;
    left: 9%;
}

.orange_bubbles_container .bubble:nth-child(7) {
    width: 30vw;
    height: 30vw;
    top: 85%;
    left: 30%;
}

.orange_bubbles_container .bubble:nth-child(8) {
    width: 10vw;
    height: 10vw;
    top: 75%;
    left: 80%;
}

.orange_bubbles_container .bubble:nth-child(9) {
    width: 10vw;
    height: 10vw;
    top: 60%;
    left: 50%;
}

.orange_bubbles_container .bubble:nth-child(10) {
    width: 20vw;
    height: 20vw;
    top: 65%;
    left: 80%;
}

.orange_bubbles_container .bubble:nth-child(11) {
    width: 10vw;
    height: 10vw;
    top: 90%;
    left: 20%;
}

.orange_bubbles_container .bubble:nth-child(12) {
    width: 10vw;
    height: 10vw;
    top: 80%;
    left: 10%;
}

.orange_bubbles_container .bubble:nth-child(13) {
    width: 10vw;
    height: 10vw;
    top: 20%;
    left: 60%;
}

.orange_bubbles_container .bubble:nth-child(14) {
    width: 20vw;
    height: 20vw;
    top: 28%;
    left: 30%;
}

.orange_bubbles_container .bubble:nth-child(15) {
    width: 15vw;
    height: 15vw;
    top: 30%;
    left: 70%;
}
</style>
