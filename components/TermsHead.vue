<template>
  <v-app-bar
    fixed
    app
    elevation="0"
    color="transparent"
    class="control-css-header xtra"
    style=""
  >
    <v-row no-gutters align="center">
      <v-col cols="1.5"> 
        <v-img
          class="mx-auto"
          width="20px"
          @click="$router.push('/channel')"
          :src="require('~/assets/img/png/icon_shareity_channel.png')"
        ></v-img>      
      </v-col>
      <v-col cols="9" class="text-center">
        <div 
        clase="old-text"
        >
        SHAREITY
        </div>
      </v-col>
      <v-col cols="1.5" class="text-center">
        <v-img
          class="mx-auto"
          width="25px"
          :src="require('~/assets/img/png/channel/icon_header.png')"
        ></v-img>  
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  data: (vm) => ({
    value: 40,
  }),
  components: {},
  methods: {},
  created() {},
};
</script>

<style lang="scss" scoped>
.xtra{
  background-color: rgba(30, 30, 30, 0.7)!important;
  font-family: "robotobold_condensed";
  font-size: 1em;
  color: white!important
}
</style>