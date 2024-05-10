<template >
  <div class="text-center">
    <v-bottom-sheet  v-model="sheet" persistent>
      <v-sheet
        class="text-center fondo"
        height="200px"
      >
        <v-btn
          class="mt-6"
          text
          color="blue"
          @click="sheet = !sheet"
          
        >
          Done
        </v-btn>
        <div class="py-3 ">
          <v-row>
          <v-col class="steven" cols="6"><v-img
              width="65px"
              
              :src="require('~/assets/img/png/steve_buy_usd.png')"
          ></v-img></v-col>
            <v-col cols="6"><p class="typefontt" >Copied Profile link</p> </v-col>
            </v-row>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
  export default {
    data: () => ({
      sheet: false,
    }),
    methods:{
      copy(){
        var copytext=this.$refs.input;
         copytext.select();
         document.execCommand('copy')
         
      }
      
    }
  }
</script>
<style lang="scss" scoped>
.colorba{
  background-color: rgb(255 255 255 / 12%);
}
.fondo{
  background-color: #04355f;
}
.typefontt{
  font-family: "Lemon/Milk";
  font-size: 0.93em;
  color: white !important;
  text-align: justify;
  padding-top: 31px;
  margin-left: -39px;
}
.steven{
  width: 35% ;
  padding-left: 79px;
  padding-block: revert;
}
  
</style>