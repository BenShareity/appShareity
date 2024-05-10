<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      hide-overlay
      transition="dialog-bottom-transition"
      :width="windowWidthT + 15"
      :content-class="`${
        toListenWidth > 1264 && toListenWidth < 1904 ? 'margin_desptop' : ''
      }`"
    >
      <v-container
      class="edit-mdl">
        <v-row no-gutters align="center" class="aligment">
          <v-col col-md-3>
            <v-row no-gutters>
              <div class="tube" v-for="(quizOptions, index) in getQuizList.quizOptions" :key="index">
                <div class="pos-num">#{{quizOptions.id}}</div>
                <v-progress-linear class="rotate" height="22px" v-model="quizOptions.percentage"></v-progress-linear>
                <div class="por-num">{{quizOptions.percentage}}%</div>
              </div>
            </v-row>
          </v-col>
        </v-row>
        <v-container
        class="px-0"
        >
        <div v-for="(quizOptions, index) in getQuizList.quizOptions" :key="index">
          <v-row
          no-gutters 
          class="pt-3 pb-4 px-4 mb-3"
          :style="index % 2 === 0 ? 'background: white;' : 'background: #D9DCE1;'">
            <v-col class="col-1 num-item">
              #{{quizOptions.id}}
            </v-col>
            <v-col class="col-10 fonts-chall">
              {{quizOptions.name}} <br> 
              <p>{{quizOptions.description}}</p> 
            </v-col> 
            <v-col class="col-1 justify-end">
                <v-img 
                v-if="isShow(quizOptions.selected)"
                max-width="36"
                class="ml-auto"
                @click="!isQuizVote ? setVote(index) : null"
                :src="quizOptions.selected ? require('~/assets/img/svg/channel/challenge/heart-blue.svg') : require('~/assets/img/svg/channel/challenge/heart-gray.svg')"
                ></v-img>
            </v-col>
          </v-row>
          </div>
          <v-row v-if="isVote && !isQuizVote" no-gutters justify="center" style="margin: 20px 0px 40px">
            <elements-buttons-buttonsvotationact
            @click="vote()"
            text='vote' /> 
            <span class="buttonvote" id="buttonvote"></span>
          </v-row>
        </v-container>
      </v-container>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  layout (context) {
    return 'App'
  },
  data() {
    return {
      votable: true,
      quizList: [],
      show: false,
      toListenWidth: window.innerWidth,
    };
  },
  computed: {
    ...mapGetters('quizIdeas', ['getQuizList', 'isQuizVote']),
    ...mapState("phoneSize", ["windowWidthT"]),
    ...mapGetters("login", ["$cookies.get('username')"]),
    isVote() {
      return this.getQuizList.quizOptions.findIndex( v => v.selected === true ) > -1
    }
  },
  methods: {
    ...mapActions('quizIdeas', ['setVote', 'quizVoteUser']),
    isShow(selected) {
      return !selected && this.isQuizVote ? false : true
    },
    vote() {
      let quiz = this.getQuizList.quizOptions.filter( v => v.selected === true )
      let data = {
        "idUsr": "14180",
       "idQuizOption": quiz[0].id
      }
      this.quizVoteUser(data)
    },
    loadData() {
      this.quizList = Object.assign({} , this.getQuizList.quizOptions)
    },    
  },
  created(){
      this.$nuxt.$on("nci", (option) => {
      this.show = option
    });
  },
  mounted() {
    // this.verifySelected();
    this.loadData();
  },
}
</script>
<style lang="scss" scoped>
.edit-mdl{
  position: relative;
  width: 100%;
  height: 87%!important;
  padding: 19% 0px 0% 0px;
}
.aligment{
  margin: auto  !important;
  position: relative;
  width: 77%;
  height: 18%;
  left: 2%;
}
.tube {
  width: 23px;
  height: 66px;
  position: relative;
  border: 1.5px solid #B2B3B3;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  background-color: white;
  margin: auto;
}
.pos-num{
  font-family: 'gotham_htfmedium';
  color: #353535;
  position: absolute;
  top: 0;
  left: -36px;
  width: 30px;
  text-align: right;
}
.range {
  background: rgb(33, 125, 204);
  background: linear-gradient(0deg, rgba(33, 125, 204, 1) 0%, rgba(7, 175, 239, 1) 100%);
  width: 100%;
  position: absolute;
  bottom: 0;
}
.por-num {
  position: absolute;
  bottom: 0;
  left: -36px;
  width: 30px;
  text-align: right;
  color: #01B5F0;
  font-size: 0.7em;
}
.num-item {
  color: #01B5F0;
  font-family: 'gotham_htfmedium';
  font-size: 1.1em;
}
.fonts-chall{
  font-family: 'gotham_htfmedium';
  color: #353535;
  font-size: 1.1em;
}
.fonts-chall p{
  color: #01B5F0;
  font-family: 'gotham_htfmedium';
  font-size: 0.7em;
}
.rotate {
  width:332%;
  height: 22px;
  transform: rotateZ(-90deg);
  position: absolute;
  top: 33%;
  left: -23.5px;
}
.v-application .primary {
  background:  linear-gradient( 0deg, rgba(33, 125, 204, 1) 0%, rgba(7, 175, 239, 1) 100%) !important;
  border-color: #1976d2 !important;
}
.v-progress-linear__background{
  opacity: 0!important;
}
</style>