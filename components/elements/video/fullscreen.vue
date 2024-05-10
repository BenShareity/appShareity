<template>
  <div 
    @click="playPauseVideo()">
    <video-background 
      ref="challengeFullScreenVideo"
      :src="src"
      :poster="challengeImgPoster"
      :autoplay="false"
      style="position: initial;"
      >
        <v-img
        v-if="!isPlaying"
        class="play-button"
        width="100"
        height="100"
        :src="require('~/assets/img/svg/challenge/play.svg')"
        ></v-img>
    </video-background>
  </div> 
</template>

<script>
  export default {
    props:{
      challenge:{ 
        type: Object,
        default(){
          return {};
        }
      },
      src:{
        type: String,
        default(){
          return '';
        }
      }
    },
    data(){
      return{
        isPlaying: false
      }
    },
    computed:{
      challengeImgPoster: function () {
        return this.getAssetLink(this.challenge.RecouUrlJPG);
      },
    },
    methods:{
      
      playPauseVideo(){
        if (this.isPlaying) {
          this.$refs.challengeFullScreenVideo.player.pause();
        } else {
          this.$refs.challengeFullScreenVideo.player.play();
        }
        this.isPlaying = !this.isPlaying;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .play-button{
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin: auto;
  }
</style>