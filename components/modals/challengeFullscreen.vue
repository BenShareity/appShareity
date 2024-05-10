<template>
  <v-dialog
      v-model="dialog"
      class="pa-0"
      fullscreen
      hide-overlay
      persistent
      transition="dialog-bottom-transition"
      @click="playPauseVideo()"
      
    >  
  <v-img
    class="img-challenge-full"
    v-if="challengeType == 'image'"
    :src="challengeImgUser"
  ></v-img>
    <div v-else>
    <elements-video-fullscreen 
      :challenge="challenge"
      :src="challengeImgUser"
      />
    </div> 

    <container-fullscreen-buttons
    :challenge="challenge"/>

    <div class="close-button-container">
      <v-fab-transition>
        <v-btn
          fab
          large
          dark
          bottom
          left
          color="#2727275c"
        @click="closeDialog()"
        >
          <v-icon
          size="50"
          color="white"
          >
            mdi-chevron-left
          </v-icon>
        </v-btn>
      </v-fab-transition>
    </div>
  </v-dialog>
</template>

<script>

export default {
  props: {
    challenge:{ 
      type: Object,
      default(){
        return {};
      }
    },
    dialog:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      isPlaying: true,
    }
  },
  computed:{
    challengeType: function () {
      return this.assetDataType(this.challenge.RecouUrl);
    },
    challengeImgUser: function () {
      return this.getAssetLink(this.challenge.RecouUrl);
    },
  },
  methods:{
    closeDialog(){
      this.$emit('close', false);
    },

  }
}
</script>

<style lang="scss" scoped>
.img-challenge-full{
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: white;
  object-fit: cover;
}

.close-button-container{
  height: 100vh; 
  position: fixed; 
  top: 87%;
  margin-left: 15px;
}
</style>