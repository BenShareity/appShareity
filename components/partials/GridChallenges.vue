<template>

  <div class="content-item-grid">
    <div @click="openFullScreen(index)" class="over-card"></div>
    <!--  <div class="badget-perfil">
      <img :src="urlBucket + item?.challenge?.badge" alt="">
    </div> -->
    <!--  <v-icon v-if="deleteUser" @click="deleteModal(item)" class="style-close" color="white"
      size="25">mdi-close-circle-outline</v-icon> -->
    <svg class="style-close" v-if="deleteUser" @click="deleteModal(item)" width="30" height="31" viewBox="0 0 13 15"
      fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="path-1-outside-1_970_156" maskUnits="userSpaceOnUse" x="-1" y="0" width="30" height="31" fill="black">
        <rect fill="white" x="-1" width="30" height="31" />
        <path
          d="M4.17578 0.78125L6.5 5.50781L8.82422 0.78125H12.7305L8.76562 7.83203L12.8379 15H8.89258L6.5 10.1855L4.10742 15H0.152344L4.23438 7.83203L0.259766 0.78125H4.17578Z" />
      </mask>
      <path
        d="M4.17578 0.78125L6.5 5.50781L8.82422 0.78125H12.7305L8.76562 7.83203L12.8379 15H8.89258L6.5 10.1855L4.10742 15H0.152344L4.23438 7.83203L0.259766 0.78125H4.17578Z"
        fill="white" />
      <path
        d="M4.17578 0.78125L4.62447 0.560615L4.48709 0.28125H4.17578V0.78125ZM6.5 5.50781L6.05131 5.72845L6.5 6.6409L6.94869 5.72845L6.5 5.50781ZM8.82422 0.78125V0.28125H8.51291L8.37553 0.560615L8.82422 0.78125ZM12.7305 0.78125L13.1663 1.02632L13.5853 0.28125H12.7305V0.78125ZM8.76562 7.83203L8.3298 7.58696L8.19128 7.83329L8.33088 8.07902L8.76562 7.83203ZM12.8379 15V15.5H13.697L13.2726 14.753L12.8379 15ZM8.89258 15L8.44482 15.2225L8.58272 15.5H8.89258V15ZM6.5 10.1855L6.94776 9.96303L6.5 9.06203L6.05224 9.96303L6.5 10.1855ZM4.10742 15V15.5H4.41728L4.55518 15.2225L4.10742 15ZM0.152344 15L-0.282142 14.7526L-0.707791 15.5H0.152344V15ZM4.23438 7.83203L4.66886 8.07946L4.80905 7.83329L4.66994 7.5865L4.23438 7.83203ZM0.259766 0.78125V0.28125H-0.596061L-0.175796 1.02678L0.259766 0.78125ZM3.72709 1.00189L6.05131 5.72845L6.94869 5.28718L4.62447 0.560615L3.72709 1.00189ZM6.94869 5.72845L9.27291 1.00189L8.37553 0.560615L6.05131 5.28718L6.94869 5.72845ZM8.82422 1.28125H12.7305V0.28125H8.82422V1.28125ZM12.2946 0.536177L8.3298 7.58696L9.20144 8.0771L13.1663 1.02632L12.2946 0.536177ZM8.33088 8.07902L12.4032 15.247L13.2726 14.753L9.20037 7.58505L8.33088 8.07902ZM12.8379 14.5H8.89258V15.5H12.8379V14.5ZM9.34033 14.7775L6.94776 9.96303L6.05224 10.4081L8.44482 15.2225L9.34033 14.7775ZM6.05224 9.96303L3.65966 14.7775L4.55518 15.2225L6.94776 10.4081L6.05224 9.96303ZM4.10742 14.5H0.152344V15.5H4.10742V14.5ZM0.586829 15.2474L4.66886 8.07946L3.79989 7.5846L-0.282142 14.7526L0.586829 15.2474ZM4.66994 7.5865L0.695328 0.535718L-0.175796 1.02678L3.79881 8.07756L4.66994 7.5865ZM0.259766 1.28125H4.17578V0.28125H0.259766V1.28125Z"
        fill="#E0E1E1" mask="url(#path-1-outside-1_970_156)" />
    </svg>

    <img v-if="item?.photoUrl" :src="urlBucket + item?.photoUrl" width="90px"
      style="height: 100%; width: 100%;    border-radius: 15px;border: 1px solid white; object-fit: cover" />
    <img v-else :src="urlBucket + item.url" width="90px"
      style="height: 100%; width: 100%;    border-radius: 15px;border: 1px solid white; object-fit: cover" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";


export default {
  data() {
    return {
      challenges: [],
    };
  },
  props: {
    item: Object,
    arrayChallenge: Object,
    deleteUser: Boolean,
    componentKey: Number,
    index: Number,
    loading: Boolean,
    dialog: Boolean,
    message: Boolean,
    deleteModal: Function,
    closeDelete: Function,
    userData: Object
  },
  computed: {
    urlBucket() {
      return process.env.api_assets_url;
    },
  },
  methods: {
    ...mapActions("challenges", ["getUserChallenges"]),
    openFullScreen(index) {
      this.$nuxt.$emit("fullScreenDefinitive", {
        status: true,
        content: this.arrayChallenge,
        index,
        from: "Profile",
        user: this.userData
      });
    },


  },

};
</script>
<style>
@media (max-width: 640px) {
  .content-message.v-dialog {
    max-width: 90% !important;
  }
}
</style>
<style scoped>
.container-items {
  display: grid;
  color: #26a2e9;
  margin-top: 10px;
  height: 250px;
}


.over-card {
  background: linear-gradient(180deg, rgb(0 0 0 / 18%) 0%, rgba(0, 0, 0, 0.25) 100%);
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 15px;
}

.content-item-grid {
  flex: 1 1 calc(50% - 1em);
  position: relative;
  height: 300px;
  border-radius: 15px;
}

.style-close {
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 5px;
}

.badget-perfil {
  position: absolute;
  width: 40px;
  height: 40px;
  left: 35%;
  top: 0%;
}

.badget-perfil img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media (max-width: 640px) {
  .container-items {
    height: 290px;
    ;
  }
}

@media (max-width: 400px) {
  .container-items {
    height: 250px;
  }
}
</style>
