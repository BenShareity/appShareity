<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
      dark
    >
      <v-card class="d-flex flex-column align-center justify-center">
        <v-card-title class="text-h5">
          UPS!
        </v-card-title>
        <v-card-text class="text-center">Seems like there was some error</v-card-text>
        <img src="@/assets/img/png/channel/steve_faq.png">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false; reload()"
          >
            Refresh page
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {

  data() {
    return {
      dialog: ''
    }
  },
  methods: {
    reload(){
      location.reload()
    }
  },
  created() {
    this.$nuxt.$on("ErrorRefresh", (option) => {
      this.dialog = option
    });

  },
};
</script>

<style lang="scss" scoped>
.text {
  font-size: 18px;
  font-family: "poppinsregular";
  font-weight: 900;
  color: gray;
  text-shadow: none;
}

.title {
  font-family: "poppinsbold";
  font-weight: 900;
  font-size: 18pt;
  color: black;
}

.caption-mini {
  font-family: poppinsregular;
  color: gray;
  font-size: 6.5px;
  margin: 0;
}

.resend {
  font-family: poppinsbold;
  color: gray;
  font-size: 14px;
}

.input_s{
  font-size: 15px !important;
}
</style>