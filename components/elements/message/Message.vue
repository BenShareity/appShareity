<template >
        <div class="con">
            <div class="wrapper"><span>flip the phone to view the app </span></div>
            <img class="img" src="../../../assets/img/png/steve-create_challenge.png" alt="">
        </div>
   

</template>
<script>
/* let quoteWrapper = document.querySelector(".quote");

let quote = quoteWrapper.textContent.trim();
let words = quote.split(" ");

words = words.map((word) => {
    let letters = word.split("");

    letters = letters.map((letter) => `<span class="letter">${letter}</span>`);
    word = letters.join("");
    return `<div>${word}</div>`;
});

words = words.join("<span class='empty'></span>");

quoteWrapper.innerHTML = words;

let letters = document.querySelectorAll(".letter");

letters.forEach((letter, index) => {
    letter.style.animationDelay = 50 * index + "ms";
}); */

</script>
<style scoped>
/* @import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap"); */

.con {
    width: 100%;
    position: fixed;
    right: 0;
    padding: 0;
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    z-index: 99999999;
    align-items: center;
    background: linear-gradient(0deg, #33A9F2, #13A7DE);
    overflow: hidden;
}


.wrapper {
    display: flex;
    perspective: 450px;
}

span {
    display: inline-block;
    position: relative;
    font-size: 2vw;
    font-family: "roboto", cursive;
    color: #ffffff;
    transition: all 0.5s;
    animation: rotate 5s ease-in infinite;
    animation-direction: alternate;
    letter-spacing: 0.5vw;
    -webkit-text-stroke: 1.5px #ffffff;
    text-transform: uppercase;
}

@keyframes rotate {
    0% {
        transform: rotateY(60deg);
        text-shadow: 0 0 0 #f6ff6b;
    }

    100% {
        transform: rotateY(0deg);
        text-shadow: 0.1em 0.1em .05em #f6ff6b;
    }
}

.container {
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    background: #ffffff;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
}

.container>div {
    animation: shake 0.5s infinite;
    font-size: 2rem;
    color: black;
}

.img {
    width: 146px;
   /*  padding-left: 50px; */
}

.text {
    text-transform: uppercase;
    font-weight: 800;
}

@keyframes shake {
    0% {
        transform: translate(1px, -2px) rotate(-1deg);
    }

    10% {
        transform: translate(-1px, 2px) rotate(-1deg);
    }

    20% {
        transform: translate(1px, 2px) rotate(0deg);
    }

    30% {
        transform: translate(3px, 2px) rotate(0deg);
    }

    40% {
        transform: translate(1px, -1px) rotate(1deg);
    }

    50% {
        transform: translate(-1px, -2px) rotate(-1deg);
    }

    60% {
        transform: translate(-3px, 1px) rotate(0deg);
    }

    70% {
        transform: translate(3px, 1px) rotate(-1deg);
    }

    80% {
        transform: translate(-1px, -1px) rotate(1deg);
    }

    90% {
        transform: translate(-3px, 0px) rotate(1deg);
    }

    100% {
        transform: translate(1px, 1px) rotate(0deg);
    }
}
</style>