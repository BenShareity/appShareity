<template>
  <v-container class="container">
    <div class="faq-data">
      <v-expansion-panels flat>
        <v-expansion-panel v-for="(item, i) in items" :key="i">
          <v-expansion-panel-header v-text="item.question">
          </v-expansion-panel-header>
          <v-expansion-panel-content v-text="item.answer">
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-btn
        class="mx-2 button-close"
        width="45px"
        height="45px"
        fab
        dark
        color="#33a9f2b3"
        @click="$router.push('/channel')"
      >
        <v-icon size="25px" dark> mdi-arrow-left </v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  layout(context) {
    return "App";
  },
  data: () => ({
    show: false,
    items: [
  
    ],
  }),
created(){
  this.$axios.$get("/dashboard/faq").then((res)=>{
console.log(res);
this.items = res
  })
}
};
</script>

<style lang="scss" scoped>
.theme--light.v-expansion-panels .v-expansion-panel {
  background-color: transparent;
  font-family: "Lemon/milk", sans-serif;
  font-weight: 600;
  color: #dbdbdb;
}
.v-expansion-panel-content{
  color: #f3eaea !important;
}
.v-expansion-panel-header {
  text-transform: uppercase;
  font-size: 20px;
  box-sizing: content-box;
  justify-content: center;
  padding: 0px;
  text-align: center;
  min-height: 60px;
  width: 75%;
  margin: auto;
  transition:  all 0.4s ease-out;
}

.v-expansion-panel-content {
  text-align: center;
  margin: auto 5px;
}

.faq-data {
  width: 100%;
  padding-top: 15%;
  padding-bottom: 15%;
  overflow-y: scroll;
  height: 100dvh;
}

.v-expansion-panel--active > .v-expansion-panel-header, .v-expansion-panel-header:hover {
  color: #ffffff;
}

.container {
  position: relative;
  z-index: 150;
  background: #2384f2;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  padding-top: 50px;
}

.button-close {
  position: fixed;
  bottom: 2%;
  z-index: 200;
}

@media (max-width: 640px) {
  .faq-data {
    padding-bottom: 100px;
    padding-top: 0px;
  }
}
</style>
