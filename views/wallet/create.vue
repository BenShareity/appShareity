<template>
  <v-container :style="{ width: windowWidthT + 'px' }" class="containerFather" v-if="ready">
    <v-row class="container-profilee" style="height: 52px">
      <v-btn icon x-large @click="$router.go(-1)">
        <v-icon size="50" color="black" style="position: absolute">
          mdi-chevron-left
        </v-icon>
      </v-btn>
      <v-col cols="9" xs="2"
        ><div align="center" justify="center" class="fonttype">
          Create Wallet
        </div></v-col
      >
    </v-row>
    <v-col class="detail">
      <h1>
        Please keep <br>the secret words.
      </h1>
      <h3>
        {{ walletData.wallet.mnemonic }}
      </h3>
      <v-btn
        style="width: 43%; background-color: #1976d2; color: white; font-family: poppinsbold;"
        depressed
        @click="save"
      >
        save words
      </v-btn>
    </v-col>
    <v-col>
      <v-btn
        style="width: 43%; 
              background-color: #1976d2; 
              color: white; font-family: poppinsbold;
              margin: 15vh 10px;"
        depressed
        to="/wallet"
      >
        Next
      </v-btn>
    </v-col>
     
  </v-container>
</template>
<script>
import { mapActions, mapState} from "vuex";
export default {
  data(){
    return {
      ready: false,
    }
  },
  computed: {
    ...mapState("wallet", ["walletData"]),
    ...mapState("phoneSize", ["windowWidthT", "windowLeftT"]),
    ...mapActions("wallet", ["createWalletAction"]),
  },

  methods: {
    save(){
      const a = document.createElement("a");
      const archivo = new Blob([this.walletData.wallet.mnemonic], { type: 'text/plain' });
      const url = URL.createObjectURL(archivo);
      a.href = url;
      a.download = 'SK';
      a.click();
      URL.revokeObjectURL(url);
    }
    
  },
  created() {
    // this.createWalletAction
    // .then(() => {
    //   this.ready = true
    // })
  },
};
</script>
<style lang="scss" scoped>
.containerFather {
  background: rgb(41, 46, 50);
  background: linear-gradient(
    180deg,
    rgba(41, 46, 50, 0) 50%,
    rgba(154, 154, 154, 0.404) 100%
  ) !important;
  height: 100vh;
}
.detail {
  margin: 10px 10px;
}
.detail h1 {
  font-family: "gotham_htfmedium";
  font-size: 27px;
}
.detail h3 {
  font-family: "gotham_htfmedium";
  font-size: 20px;
  margin: 20px 0;
  padding: 10px;
  border: 0.3px solid rgb(90, 168, 231);
  border-radius: 10px;
}
.fonttype {
  font-family: "gotham_htfmedium";
  color: black;
  font-size: 14px;
  font-weight: bold;
}

.container-profilee {
  text-align: center;
  margin: auto;
    background: linear-gradient(
    90deg,
    rgba(41, 46, 50, 0) 49%,
    rgba(255, 255, 255, 0.40379901960784315) 100%
  );
  display: flex;
  align-items: center;
}
</style>
