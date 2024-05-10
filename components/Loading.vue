

<template>
  <v-row justify="center">
    <v-dialog content-class="edit_loading" close-delay="1" v-model="active" persistent>
      <div class="loading-padre">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>

      <!--  <div class="loadingio-spinner-spinner-hnqjd8n8xnq">
        <div class="ldio-1f321ej2hpy">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div> -->
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    active: Boolean
  },
  data() {
    return {
      dialog: false,
    };
  },
  created() {
    this.$nuxt.$on("openLoading", (option) => {
      this.dialog = option;
    });
  },
};
</script>

<style scoped>

.loading-padre{
  display: flex;
    justify-content: center;
    align-items: center;
}
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-ripple div {
  position: absolute;
  border: 4px solid #cef;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }

  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }

  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }

  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>
<style type="text/css">
.edit_loading {
  box-shadow: none !important;
  overflow: visible !important;
}

@keyframes ldio-1f321ej2hpy {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.ldio-1f321ej2hpy div {
  left: 92.82000000000001px;
  top: 55.08px;
  position: absolute;
  animation: ldio-1f321ej2hpy linear 1.282051282051282s infinite;
  /* background: #ffffff; */
  width: 18.36px;
  height: 16.32px;
  border-radius: 9.18px / 8.16px;
  transform-origin: 9.18px 46.92px;
}

.ldio-1f321ej2hpy div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.2564102564102564s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(2) {
  transform: rotate(7.2deg);
  animation-delay: -1.2307692307692308s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(3) {
  transform: rotate(14.4deg);
  animation-delay: -1.205128205128205s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(4) {
  transform: rotate(21.6deg);
  animation-delay: -1.1794871794871795s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(5) {
  transform: rotate(28.8deg);
  animation-delay: -1.1538461538461537s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(6) {
  transform: rotate(36deg);
  animation-delay: -1.1282051282051282s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(7) {
  transform: rotate(43.2deg);
  animation-delay: -1.1025641025641026s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(8) {
  transform: rotate(50.4deg);
  animation-delay: -1.0769230769230769s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(9) {
  transform: rotate(57.6deg);
  animation-delay: -1.0512820512820513s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(10) {
  transform: rotate(64.8deg);
  animation-delay: -1.0256410256410255s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(11) {
  transform: rotate(72deg);
  animation-delay: -1s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(12) {
  transform: rotate(79.2deg);
  animation-delay: -0.9743589743589743s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(13) {
  transform: rotate(86.4deg);
  animation-delay: -0.9487179487179487s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(14) {
  transform: rotate(93.6deg);
  animation-delay: -0.9230769230769231s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(15) {
  transform: rotate(100.8deg);
  animation-delay: -0.8974358974358975s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(16) {
  transform: rotate(108deg);
  animation-delay: -0.8717948717948718s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(17) {
  transform: rotate(115.2deg);
  animation-delay: -0.8461538461538461s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(18) {
  transform: rotate(122.4deg);
  animation-delay: -0.8205128205128205s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(19) {
  transform: rotate(129.6deg);
  animation-delay: -0.7948717948717948s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(20) {
  transform: rotate(136.8deg);
  animation-delay: -0.7692307692307693s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(21) {
  transform: rotate(144deg);
  animation-delay: -0.7435897435897436s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(22) {
  transform: rotate(151.2deg);
  animation-delay: -0.717948717948718s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(23) {
  transform: rotate(158.4deg);
  animation-delay: -0.6923076923076923s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(24) {
  transform: rotate(165.6deg);
  animation-delay: -0.6666666666666666s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(25) {
  transform: rotate(172.8deg);
  animation-delay: -0.6410256410256411s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(26) {
  transform: rotate(180deg);
  animation-delay: -0.6153846153846154s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(27) {
  transform: rotate(187.2deg);
  animation-delay: -0.5897435897435898s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(28) {
  transform: rotate(194.4deg);
  animation-delay: -0.5641025641025641s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(29) {
  transform: rotate(201.6deg);
  animation-delay: -0.5384615384615384s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(30) {
  transform: rotate(208.8deg);
  animation-delay: -0.5128205128205128s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(31) {
  transform: rotate(216deg);
  animation-delay: -0.48717948717948717s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(32) {
  transform: rotate(223.2deg);
  animation-delay: -0.46153846153846156s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(33) {
  transform: rotate(230.4deg);
  animation-delay: -0.4358974358974359s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(34) {
  transform: rotate(237.6deg);
  animation-delay: -0.41025641025641024s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(35) {
  transform: rotate(244.8deg);
  animation-delay: -0.38461538461538464s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(36) {
  transform: rotate(252deg);
  animation-delay: -0.358974358974359s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(37) {
  transform: rotate(259.2deg);
  animation-delay: -0.3333333333333333s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(38) {
  transform: rotate(266.4deg);
  animation-delay: -0.3076923076923077s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(39) {
  transform: rotate(273.6deg);
  animation-delay: -0.28205128205128205s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(40) {
  transform: rotate(280.8deg);
  animation-delay: -0.2564102564102564s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(41) {
  transform: rotate(288deg);
  animation-delay: -0.23076923076923078s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(42) {
  transform: rotate(295.2deg);
  animation-delay: -0.20512820512820512s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(43) {
  transform: rotate(302.4deg);
  animation-delay: -0.1794871794871795s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(44) {
  transform: rotate(309.6deg);
  animation-delay: -0.15384615384615385s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(45) {
  transform: rotate(316.8deg);
  animation-delay: -0.1282051282051282s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(46) {
  transform: rotate(324deg);
  animation-delay: -0.10256410256410256s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(47) {
  transform: rotate(331.2deg);
  animation-delay: -0.07692307692307693s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(48) {
  transform: rotate(338.4deg);
  animation-delay: -0.05128205128205128s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(49) {
  transform: rotate(345.6deg);
  animation-delay: -0.02564102564102564s;
  background: #ffffff;
}

.ldio-1f321ej2hpy div:nth-child(50) {
  transform: rotate(352.8deg);
  animation-delay: 0s;
  background: #ffffff;
}

.loadingio-spinner-spinner-hnqjd8n8xnq {
  width: 204px;
  height: 204px;
  display: inline-block;
  overflow: hidden;
  /*   background: #f1f2f3; */
}

.ldio-1f321ej2hpy {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
  /* see note above */
}

.ldio-1f321ej2hpy div {
  box-sizing: content-box;
}

/* generated by https://loading.io/ */
</style>