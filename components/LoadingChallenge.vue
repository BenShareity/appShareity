<template>
  <div class="text-center">
    <v-bottom-sheet v-model="active" persistent width="500" :content-class="`${toListenWidth > 1264 && toListenWidth < 1904 ? 'margin_desptop' : ''
      }`">
      <v-sheet class="text-center" style="background: azure; position: relative;" height="100dvh">
        <!--  <img v-if="item.id === 270" class="loadin__img" src="@/assets/unsponsored.gif" /> -->
        <img class="loadin__img fade-in" v-if="countDown < 1" src="../assets/img/jpg/loading2.jpg" alt="">
        <template v-else>
          <template
            v-if="itemChallange?.animation?.format == 'gif' || itemChallange?.challenge?.animation?.format == 'gif'">
            <template v-if="itemChallange?.animation">
              <img class="loadin__img" :src="urlBucket + itemChallange?.animation?.recource" alt="animation-gifs">
            </template>
            <template v-else>
              <img class="loadin__img" :src="urlBucket + itemChallange?.challenge?.animation?.recource"
                alt="animation-gifs">
            </template>

          </template>
          <template v-else>
            <div
              v-if="itemChallange?.animation?.name == 'unsponsored' || itemChallange?.challenge?.animation?.name == 'unsponsored'">
              <Unsponsored
                :logoSponsor="itemChallange?.sponsors[0]?.sponsor?.logo || itemChallange?.challenge?.sponsors[0]?.sponsor?.logo" />
            </div>
            <div
              v-if="itemChallange?.animation?.name == 'clouds' || itemChallange?.challenge?.animation?.name == 'clouds'">
              <CloudsAnimation
                :logoSponsor="itemChallange?.sponsors[0]?.sponsor?.logo || itemChallange?.challenge?.sponsors[0]?.sponsor?.logo" />
            </div>
          </template>
          <!--   <template
            v-if="itemChallange?.sponsors[0]?.animation?.recource || itemChallange?.challenge?.sponsors[0]?.animation?.recource">
            <template v-if="itemChallange?.sponsors?.length > 0">
              <img class="loadin__img" :src="urlBucket + itemChallange?.sponsors[0]?.animation?.recource"
                alt="animation-gifs">
            </template>
            <template v-else>
              <img class="loadin__img" :src="urlBucket + itemChallange?.challenge?.sponsors[0]?.animation?.recource"
                alt="animation-gifs">
            </template>
          </template>
          <template v-else>
            <Unsponsored
              :logoSponsor="itemChallange?.sponsors[0]?.sponsor?.logo || itemChallange?.challenge?.sponsors[0]?.sponsor?.logo" />
          </template> -->
        </template>
        <div class="bottom-progress">
          <v-progress-linear rounded background-color="white" height="25" v-model="newProgres" striped
            :style="colorState ? 'color: #fff ' : 'color: #000 '"
            style=" color: #fff ;  background: linear-gradient(0deg, #33A9F2, #13A7DE);  text-shadow: 2px 0 4px rgb(102 102 102 / 91%);  width: 90%; border-radius: 20px; ;    box-shadow: 0px 0px 9px -1px #777777;">
            <span>{{ Math.ceil(newProgres) }}%</span>
          </v-progress-linear>
          <div class="bottom-progress_text">
            <div class="parpadea text-loadin"> {{ text }} </div>
          </div>
          <div v-if="file" class="bottom-progress__size">
            <div class="parpadea2 text-loadin"> Size File: {{ file }}Mb </div>
          </div>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Unsponsored from '@/components/animationsChallenge/Unsponsored.vue'
import CloudsAnimation from '@/components/animationsChallenge/CloudsAnimation.vue'
export default {
  components: {
    CloudsAnimation,
    Unsponsored,
  },
  data() {
    return {
      text: 'Uploading your challenge',
      colorState: false,
      newProgres: 0,
      isProgres: false,
      animation: null,
    }
  },
  watch: {
    progress(value, oldValue) {
      console.log('PROGRESS', value)
      this.newProgres = value
      if (value > 52) this.colorState = true
      if (value > 30) {
        this.text = 'Authenticating your challenge'
      }
      if (value > 60) {
        this.text = 'Building your challenge'
      }
      if (value >= 75) {
        this.countDownTimer()
      }

    },
  },
  props: {
    active: Boolean,
    progress: Number,
    response: Object,
    itemChallange: Object,
    countDown: Number,
    file: String

  },

  computed: {
    ...mapState("phoneSize", ["windowLeftT", "windowWidthT"]),
    urlBucket() {
      return process.env.api_assets_url;
    },
  },
  methods: {
    ...mapActions('createUserChallenge', ['createUserChallengeAction']),
    toListenWidth() {
      return window.innerWidth
    },

    countDownTimer() {
      if (this.newProgres > 74 && this.newProgres < 98) {
        if (this.countDown > 0 && this.countDown < 98) {
          var intval = setInterval(() => {
            if (this.newProgres < 98) {
              this.newProgres++;
            } else {
              clearInterval(intval);
            }
          }, this.countDown * 1000 / 25);
        } else {
          var intval = setInterval(() => {
            if (this.newProgres < 98) {
              this.newProgres++;
            } else {
              clearInterval(intval);

            }
          }, 200);
        }
      }
    }
  },
  destroyed() {
    this.newProgres = 0
  },

}

</script>
<style scoped>
.loadin__img {
  height: 100vh !important;
  width: 100% !important;
  object-fit: cover;
  object-position: center center;
}

.fade-in {
  animation: fadeIn ease 1s;
}


@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.bottom-progress {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  z-index: 5000;
}

.text-loadin {
  font-size: 16px;
  font-family: "poppinsregular";
  font-weight: 600;
  color: white !important;
  text-shadow: none;
  white-space: nowrap;
}

.bottom-progress_text {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.bottom-progress__size {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.parpadea2 {
  text-shadow: 2px 0 4px rgb(102 102 102 / 91%);
}

.parpadea {
  animation-name: parpadeo;
  animation-duration: 0.3s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  text-shadow: 2px 0 4px rgb(102 102 102 / 91%);
  -webkit-animation-name: parpadeo;
  -webkit-animation-duration: 1s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}

@-moz-keyframes parpadeo {
  0% {
    opacity: 1.0;
  }

  50% {
    opacity: 0.0;
  }

  100% {
    opacity: 1.0;
  }
}

@-webkit-keyframes parpadeo {
  0% {
    opacity: 1.0;
  }

  50% {
    opacity: 0.0;
  }

  100% {
    opacity: 1.0;
  }
}

@keyframes parpadeo {
  0% {
    opacity: 1.0;
  }

  50% {
    opacity: 0.0;
  }

  100% {
    opacity: 1.0;
  }
}

@media(max-width: 640px) {
  .text-center {
    width: 100% !important;
  }
}
</style>