<template>
  <!-- <div>{{ index }} - {{ source.text }}
    <button @click="send">HOLA</button>
  </div> -->
  <div class="card-component">
    <template>
      <video v-if="source?.resource?.id == 3" class="video-search-video" preload="none" muted playsinline
        :poster="urlBucket + source?.photoUrl" :src="urlBucket + source?.url" ref="videoSearch">
      </video>
      <v-img v-else :style="{ backgroundImage: 'url(' + imageVideo + ')' }" :src="urlBucket + source?.url"
        class="white--text align-end img-componente" height="100%" />
      <div class="card-component__positions">
        <div class="click-events" @click="openFullScreen()"></div>
        <template v-if="source?.resource?.id == 3">
          <v-icon id="icon-none" class="video-search-play" v-if="!stateVideo" color="white" @click="play()" size="40">
            mdi-play-circle
          </v-icon>
          <v-icon id="icon-none" class="video-search-pause" v-else color="white" @click="play()" size="40">
            mdi-pause-circle
          </v-icon>
        </template>
        <div class="d-flex flex-row justify-space-between description" height="5%">
          <div class="d-flex ml-5">
            <div class="d-flex align-center flex-end my-1">
              <img @click="
                $router.push({ path: `/profile/${source?.user?.username}` })
                " class="imagen-no-avatar" :src="source?.user?.imagen !== null &&
    source?.user?.imagen !== '' &&
    source?.user?.imagen !== '-' ? urlBucket + source?.user?.imagen : imgNoUser" />
              <div class="user-compoennte">
                <v-card-title class="user-compoennte__cards" color="#33A9F2">
                  {{
                    source?.user?.firstName == "User" ? "Shareity" : source?.user?.firstName
                  }}
                </v-card-title>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import noAvatar from "../assets/img/png/user.png";
import imageVideo from "../assets/e.gif";
export default {
  name: 'item-component',
  props: {
    index: { // index of current item
      type: Number
    },
    source: { // here is: {uid: 'unique_1', text: 'abc'}
      type: Object,
      default() {
        return {}
      }
    },
    user: {
      type: Object

    },
    array: {
      type: Array

    },
  },
  data() {
    return {
      id: null,
      activeLoading: false,
      imgNoUser: noAvatar,
      isPlaying: false,
      stateVideo: false,
      loading: false,
      imageVideo,
    };
  },
  computed: {
    urlBucket() {
      return process.env.api_assets_url;
    },
  },
  methods: {
    openFullScreen() {
      console.log('this.source', this.source)
      console.log('user', this.user)
    }
  },
}
</script>


<style lang="scss" scoped>
.card-component {
  width: 390px;
  height: 390px;
  padding: 10px 0px !important;
}

.card-component__positions {
  position: relative;
  width: 100%;
  height: 100%;
  top: -100%;
  z-index: 10;
}

.img-componente {
  border-bottom-right-radius: 40px !important;
  background-position: center;
  background-size: auto;
  background-repeat: no-repeat;
}

.user-compoennte {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}

.click-events {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 50;
}

.user-compoennte__cards {
  font-size: 18px;
  padding-left: 8px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px;
  display: block;
}

.description {
  background: rgb(0, 0, 0);
  background: linear-gradient(180deg,
      rgba(0, 0, 0, 0) 1%,
      rgba(0, 0, 0, 1) 100%);
  position: absolute;
  bottom: 0;
  z-index: 100;
  width: 100%;
  border-top-left-radius: 40px;
  border-bottom-right-radius: 40px;
}

.CardTrending-Container {
  -webkit-border-bottom-right-radius: 40px;
  -moz-border-radius-bottomright: 40px;
  border-bottom-right-radius: 40px;
}

.imagen-no-avatar {
  width: 53px;
  height: 53px;
  border-radius: 50%;
  border: 1px solid rgb(255, 255, 255);
  box-shadow: 0px 0px 8px 1px #616161;
  object-fit: cover;
  position: relative;
  z-index: 200;
}

.video-search {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-search-play {
  position: absolute;
  top: 15px;
  z-index: 200;
  right: 15px;
}

.video-search-pause {
  position: absolute;
  top: 15px;
  z-index: 200;
  right: 15px;
}

.video-search-video {
  width: 100%;
  height: 100%;
  border-top-left-radius: 40px;
  border-bottom-right-radius: 40px;
  object-fit: cover;
  background-size: cover;
  background-position: center center;
}

@media (max-width: 640px) {
  .card-component {
    width: 100%;
  }

}
</style>