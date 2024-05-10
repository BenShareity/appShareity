<template>
  <div :class="mostrar && 'container_out'" class="body">
    <SwayscoresHeader />
    <template v-if="challangeUser?.length > 0">
      <div class="padre-container" :style="{ backgroundImage: `url(${arbolThree})` }" id="box" ref="boxscroll">
        <div v-show="challangeUser" class="contend-badget">
          <div v-for="(item, i) in challangeUser" :key="i">
            <img :class="item.id !== activeBadget ? 'active-badget' : 'no-transitions'"
              @click="!loading && openBadget(item, `you-badget`)" :src="urlBucket + item?.challenge?.badge" alt="">
          </div>
        </div>
        <template v-if="loading">
          <div class="sway-header" style="margin-bottom: 30px">
            <div style="
                display: flex;
                flex-direction: column;
                padding-top: 130px;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 20px;
              ">
              <v-skeleton-loader max-height="350px" class="sways-card" max-width="80%" :elevation="5" type="card">
              </v-skeleton-loader>
              <v-skeleton-loader max-height="60px" class="sways-card" style="border-radius: 20px" max-width="80%"
                :elevation="5" type="card"></v-skeleton-loader>
              <div style="
                  display: flex;
                  flex-wrap: nowrap;
                  justify-content: center;
                  overflow: hidden;
                  width: 100%;
                  gap: 20px;
                  padding-left: 40px;
                ">
                <div v-for="item in 5" :key="item">
                  <v-skeleton-loader height="60px" width="60px" class="sways-card" style="border-radius: 50px"
                    :elevation="5" type="card"></v-skeleton-loader>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="conten-fixed-arbol">
            <div class="contend-arbols_container_img">

              <div class="fixed-arbol">
                <button v-if="counter > 0" @click="changePrevious" class="button-previous"
                  v-bind:style="challenge?.challenge?.color ? `background:  ${challenge.challenge.color}` : '#33A9F2'">See
                  Previous level
                </button>
                <div>

                  <img
                    v-bind:style="challenge?.challenge?.color ? `border: 4px solid ${challenge.challenge.color}` : '#33A9F2'"
                    :src="urlBucket + trackbility?.self?.photoUrl" alt="">
                  <p>{{ trackbility?.self?.user.firstName }}</p>
                  <p> Influenced: {{ trackbility?.sonsCount }}</p>
                </div>

              </div>

            </div>
            <div id="container" class="contend-arbols" :style="counter === 2 ? 'width: auto;' : 'width: max-content;'">
              <div class="contend-arbols_container">

                <div :style="getButtonStyle(trackbility?.sons?.length)"
                  style="display: flex; flex-wrap: nowrap; align-items: flex-start; gap: 50px;">
                  <div class="contend-arbols_container-child" v-for="(level2, index2) in trackbility?.sons"
                    :key="index2">

                    <div class="center-colunm-souns">
                      <div class="contend-arbols_container-child_contend">
                        <img
                          v-bind:style="challenge?.challenge?.color ? `border: 3px solid ${challenge.challenge.color}` : '#33A9F2'"
                          @click="changeArbol(level2, index2, trackbility?.self?.id)"
                          :src="urlBucket + level2?.self?.photoUrl" alt="">
                        <div>
                          <p style="font-size: 12px;">{{ level2?.self?.user?.firstName }}</p>
                          <p> Influenced: {{ level2?.sonsCount }}</p>
                        </div>
                      </div>

                      <button v-if="index2 == 4"
                        v-bind:style="challenge?.challenge?.color ? `background:  ${challenge.challenge.color}` : '#33A9F2'"
                        @click="openModal(trackbility?.sons)">+</button>
                    </div>



                    <div style="display: flex; gap: 15px;">
                      <div v-for="(level3, index3) in level2?.sons?.slice(0, 2)" :key="index3"
                        class="contend-arbols_container">
                        <div class="center-colunm-souns">
                          <div class="contend-arbols_container-child-2">
                            <img
                              v-bind:style="challenge?.challenge?.color ? `border: 2px solid ${challenge.challenge.color}` : ''"
                              class="border-level3" @click="changeArbol(level3, index3, trackbility?.self?.id)"
                              :src="urlBucket + level3?.self?.photoUrl" alt="">
                            <div>
                              <p style="font-size: 12px;">{{ level3?.self?.user?.firstName }}</p>
                              <p> Influenced: {{ level3?.sonsCount }}</p>
                            </div>
                          </div>
                          <button v-if="index3 == 1"
                            v-bind:style="challenge?.challenge?.color ? `background:  ${challenge.challenge.color}` : '#33A9F2'"
                            @click="openModal(level2?.sons)">+</button>
                        </div>


                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>


        </template>
      </div>
    </template>

    <template v-else>
      <div class="padre-container"></div>
    </template>
    <v-dialog v-model="modalArbol" max-width="400" persistent content-class="edit-class-list">
      <v-sheet class="text-center height_modal" style="position: relative;">
        <header>
          <div class="header-modal">
            <p>List</p>
            <p @click="modalArbol = false"><v-icon color="#fff">mdi-close</v-icon></p>
          </div>
        </header>
        <div class="modal-body">
          <div class="modal-body_container" v-for="(arbol, index) in arbolValue" :key="index">
            <div class="modal-body_container-child">
              <div class="modal-body_container-child__img">
                <img :src="urlBucket + arbol?.self?.photoUrl" alt="">
              </div>
              <div class="modal-body_container-child__text">
                <p>Maria</p>
                <p>Arbol </p>
              </div>
            </div>
          </div>
        </div>
      </v-sheet>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import noUser from "../../../assets/img/png/user.png";
import arbolThree from '../../../assets/famility-three.svg'
export default {

  computed: {
    ...mapGetters("header", ["getHeaderType"]),
    urlBucket() {
      return process.env.api_assets_url;
    },
  },
  watch: {
    getHeaderType(value) {
      if (value == 1) this.goBack();
    },
  },
  layout(context) {
    return "App";
  },
  data: () => ({
    totals: 0,
    influenced: [],
    influenceds: require("~/assets/img/png/user.png"),
    mostrar: null,
    loading: false,
    challangeUser: null,
    trackbility: null,
    userData: null,
    noUser,
    activeBadget: null,
    modalArbol: false,
    arbolValue: null,
    idLevelPrevius: [],
    previousArray: [],
    counter: 0,
    challenge: null,
    arbolThree

  }),

  methods: {
    ...mapActions("user", ["swayScoreAction", "nicknameAction"]),
    goBack() {
      this.mostrar = true;
      setTimeout(() => {
        document.documentElement.style.overflow = "initial";
        document.documentElement.style.overscrollBehaviorY = 'initial';
        this.$router.push("/");
        localStorage.setItem("effect-Modal", false);
      }, 180);
    },
    openButton(url) {
      if (url == "/swayscores/total") {
        this.$router.push({ path: url, query: { first: false } });
      } else {
        this.$router.push({ path: url });
      }
    },
    opentraceability(item, string) {
      /* this.loading = true; */
      this.$axios
        .$post("/referred/tree-graph", {
          idChallenge: item.challenge.id,
          idUser: item.user.id,
          levels: 10
        })
        .then((res) => {
          console.log('res', res)
          this.trackbility = res;
          this.loading = false;
        })
        .catch((err) => console.log(err));
    },
    getButtonStyle(isSpecialOffer) {
      console.log('isSpecialOffer', isSpecialOffer)
      return {
        gridTemplateColumns: isSpecialOffer == 2 && '1fr 1fr' || isSpecialOffer === 3 && '1fr 1fr 1fr' || isSpecialOffer > 3 && '1fr 1fr 1fr 1fr 1fr' || isSpecialOffer < 2 && '1fr'
      };
    },
    openModal(item) {
      this.arbolValue = item
      this.modalArbol = true
    },
    openBadget(badget, string) {
      this.challenge = badget
      this.activeBadget = badget.id
      this.trackbility = null
      this.loading = true
      this.$axios
        .$post("/referred/tree-graph", {
          idChallenge: badget.challenge.id,
          idUser: this.userData.id,
          levels: 10
        })
        .then((res) => {
          console.log('PEPITOOOOOOOOOOO', res)
          this.trackbility = res;
          this.loading = false;
          setTimeout(() => {
            this.scrollAuto()
          }, 200);
        })
        .catch((err) => console.log(err));
    },
    sermore() {
      console.log('hola')

      this.counter += 1
      if (this.counter == 0) {
        this.arbolValue = this.arbolito
      }

      if (this.counter == 1) {
        this.arbolValue = this.arbolito2
      }
      if (this.counter == 2) {
        this.arbolValue = this.arbolito3
      }
      console.log('this.counter', this.counter)

    },
    subtract() {

      this.counter -= 1
      if (this.counter == 0) {
        this.arbolValue = this.arbolito
      }

      if (this.counter == 1) {
        this.arbolValue = this.arbolito2

      }
      if (this.counter == 2) {
        this.arbolValue = this.arbolito3

      }
    },
    scrollAuto() {
      /* this.loading = true; */
      let widthDinamic = document.getElementById("container").offsetWidth
      console.log('widthDinamic', widthDinamic)
      let content = document.querySelector(".padre-container");
      console.log('content.scrollLeft', content.scrollLeft)
      let res = content.scrollLeft += ((widthDinamic / 2) - 200);
      console.log('res', res)
      if (res == (widthDinamic / 2)) {
        this.loading = false;
      }
    },
    changeArbol(item, index, previous) {
      console.log('item', item)
      this.previousArray = [...this.previousArray, this.trackbility]
      this.idLevelPrevius = [...this.idLevelPrevius, { nivel: this.counter++, id: previous }]
      this.trackbility = item
    },
    changePrevious(item) {
      this.counter--
      this.previousArray.map((previous, index) => {
        this.idLevelPrevius.map((id, index) => {
          if (this.counter == id.nivel) {
            if (previous.self.id === id.id) {
              this.trackbility = previous
              setTimeout(() => {
                this.scrollAuto()
              }, 200);
            }
          }
        })
      })
    }

  },
  created() {
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehaviorY = 'none';
    if (process.client) {
      this.arbolValue = this.arbolito
      this.location = window.location.pathname;
      localStorage.setItem("effect-Modal", true);
      setTimeout(() => {
        this.scrollAuto()
      }, 500);
    }
    this.nicknameAction().then((session) => {
      console.log('session', session)
      this.challenge = session.userChallenges[0]
      this.activeBadget = session.userChallenges[0].id
      this.userData = session
      this.challangeUser = session.userChallenges
      this.$axios
        .$post("/referred/tree-graph", {
          idChallenge: this.challangeUser[0].challenge.id,
          idUser: session.id,
          levels: 10
        })
        .then(res => {
          console.log('trackbility', res)
          this.trackbility = res
        }).catch(err => console.log(err));
      this.swayScoreAction({
        id: session.id,
      }).then((r) => {
        this.totals = r.influenceds.length;
        this.influenced = r.influenceds;
        this.loading = false;
      });
    });
  },
};
</script>

<style>
.edit-class-list {
  max-width: 90% !important;
}
</style>

<style lang="css" scoped>
.group-card {
  width: 70px;
  height: 70px;
  box-shadow: none !important;
  border-width: 2px;
  border-style: solid;
  border-color: #01386e;
}

.contend-badget {
  display: flex;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 12px;
  padding: 10px;
  box-shadow: inset 1px 0px 13px 1px #00000052;
  background-color: white;
  position: fixed;
  width: 400px;
  z-index: 1000;
}

/* .border-level2::after {
  content: '';
  width: 100px;
  height: 1px;
  background-color: #c7c7c78a;
  position: absolute;
  top: 49px;
} */

.contend-badget::-webkit-scrollbar {
  width: 20px;
  height: 5px;
}

.contend-badget::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(255, 255, 255);
  border-radius: 10px;
}

.contend-badget::-webkit-scrollbar-thumb {
  background: #01386e;
  border-radius: 10px;
}

.active-badget {
  filter: grayscale(100%) brightness(100%) contrast(100%);

  transition: filter 0.3s, box-shadow 0.3s;
}

.contend-badget div {
  height: 70px;
  width: 70px;
}

.contend-badget div img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
}

.contend-arbols {
  /*   width: max-content; */
  margin: 0 auto;
  /*   padding-bottom: 45%; */
  /*   padding-top: 120px; */
  justify-content: flex-start;
  display: flex;
  padding-left: 10px;
  padding-right: 10px;

}

.contain-skeleton {
  display: flex;
  flex-direction: column;
  padding-top: 130px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.card-father {
  padding-top: 10px;
  height: 350px;
  width: clamp(90%, 5vw, 100%);
  margin: 0 auto;
}

.padre-loading {
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  width: 100%;
  gap: 20px;
  padding-left: 40px;
}

.card-father img {
  width: 100%;
  padding: 10px;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0px 3px 15px 1px rgb(0 0 0 / 46%);
}

.card-self {
  display: flex;
  background-color: #1976d2;
  padding: 5px;
  border-radius: 40px;
  box-shadow: 0px 3px 15px 1px rgb(0 0 0 / 46%);
  margin: 0 auto;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  width: clamp(90%, 5vw, 100%);
  margin-top: 15px;
}

.card-self div {
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-self img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
}

.card-self p {
  font-size: 15px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 150px;
  text-transform: uppercase;
}

.card-children {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
}

.card-children-title-header {
  font-size: 20px;
  color: rgb(148, 148, 148);
  text-transform: uppercase;
}

.card-children-title {
  font-size: 10px;
  color: rgb(148, 148, 148);
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80px;
  text-align: center;
}

.button-previous {
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 8px;
  color: rgb(255, 255, 255);
  background: rgb(89, 199, 249);
  position: fixed;
  left: 2%;
  top: 32%;
}

.text-raised {
  font-size: 10px;
  color: rgb(148, 148, 148);
  text-transform: uppercase;
  text-align: center;
}

.card-children-grid {
  display: flex;
  white-space: nowrap;
  overflow: auto;
  padding: 10px 0px 20px 10px;
  gap: 20px;
}

/* width */
.card-children-grid::-webkit-scrollbar {
  width: 20px;
  height: 5px;
}

.card-children-grid::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(255, 255, 255);
  border-radius: 10px;
}

.card-children-grid::-webkit-scrollbar-thumb {
  background: #01386e;
  border-radius: 10px;
}

.card-children-grid img {
  width: 55px;
  height: 55px;
  box-shadow: 1px 1px 8px -2px black;
  border-radius: 100%;
}

.card-children-name {
  font-size: 11px !important;
  text-align: center;
  text-transform: uppercase;
  color: rgb(148, 148, 148);
  display: flex;
  gap: 3px;
}

.card-children-name p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 50px;
}

.name-father {
  font-size: 20px;
  color: rgb(148, 148, 148);
  text-transform: uppercase;
}

.fadeInUp {
  animation: fadeInUp 1s ease backwards;
}

@keyframes fadeInUp {
  0% {
    transform: translate(0px, 100px);
    opacity: 0;
  }

  100% {
    transform: translate(0px, 0);
    opacity: 1;
  }
}

.padre-container {
  height: 100%;
  background-color: #e9f1f8;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scroll-snap-align: center;
  /*   background-image: url('../../../assets/famility-three.png'); */
  background-size: cover;
  background-position: center center;
}

.padre-container_item-1 {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  flex-direction: column;
  gap: 12px;
}

.padre-container_item-1__center {
  width: 80px;
  height: 80px;
  box-shadow: 0px 0px 6px -1px #00000066;
  height: 80px;
  border: 2px solid #01386e;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.padre-container_item-1__center img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

.padre-container_item-1__center-text {
  font-size: x-large;
  color: #01386e;
  font-weight: 500;
}

.avatar-profile {
  border: 2px solid gray;
  margin-bottom: 5px;
}

.padre-container_item-2 {
  background-color: #f8f8f8;
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  padding: 5px;
}

.padre-container_item-2_center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.padre-container_item-2_center-img {
  width: 70px;
  height: 70px;
  padding: 5px;
}

.padre-container_item-2_center-text1 {
  font-size: x-large;
  color: #01386e;
  font-weight: 500;
}

.padre-container_item-2_center-text2 {
  font-size: x-large;
  color: #c7c7c7;
  font-weight: 500;
}

.padre-container_item-3 {
  background-color: #f8f8f8;
  margin-top: 20px;
  width: 100%;
  height: 70px;
}

.padre-container_item-3-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.padre-container_item-3-center-img {
  width: 70px;
  height: 70px;
  padding: 5px;
}

.padre-container_item-3-center-text1 {
  font-size: x-large;
  color: #01386e;
  font-weight: 500;
}

.padre-container_item-3-center-text2 {
  font-size: x-large;
  color: #c7c7c7;
  font-weight: 500;
}

.group-title {
  color: #01386e;
  font-size: 20px;
  padding-left: 10px;
}

.v-space {
  display: flex;
  justify-content: center !important;
  contain: inline-size;
  padding-top: 50px;
}

.v-title-impressions {
  color: white;
  padding-left: 20px;
  font-size: 20px;
}

/* .v-title-card {
    color: white;
    position: absolute;
    padding-top: 55px;
    padding-left: 5px;
} */

.v-col {
  justify-content: center;
  padding: 0px !important;
}

.header {
  position: relative;
  z-index: 150;
  background: rgb(71, 164, 231);
  background: linear-gradient(90deg,
      rgba(71, 164, 231, 1) 100%,
      rgba(47, 75, 117, 1) 100%);
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
}

.v-row {
  padding-top: 15px;
  padding-left: 20px;
}

.body {
  position: relative;
  z-index: 150;
  background: rgb(71, 164, 231);
  background: linear-gradient(90deg,
      rgba(71, 164, 231, 1) 100%,
      rgba(47, 75, 117, 1) 100%);
  width: 100%;
  overflow: hidden;
  height: 100dvh;
  padding: 15% 0px 0px 0px !important;
  touch-action: none;
}

.button-close {
  margin-left: 20px;
  display: block;
  position: fixed;
  bottom: 2%;
  z-index: 200;
}

.container_out {
  overflow: hidden;
  animation: out_cold 0.3s forwards;
}

@keyframes out_cold {
  from {
    height: 100dvh;
  }

  to {
    height: 0;
    opacity: 0;
  }
}

.sway-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sways-card {
  border-radius: 10px;
  width: 100%;
  width: 55px;
  height: 55px;
  border-radius: 100%;
}

.no-transitions {
  transition: 0.3s ease-in-out all;
}

.sway-header__list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.list-item {
  height: 64px;
}

.v-application p {
  margin-bottom: 0px;
}

.card-children-grid div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

@media (max-width: 640px) {
  .contend-badget {
    width: 100%;
  }

  /*   .card-self img {
    width: 40px;
    height: 40px;
  } */

  .card-self p {
    font-size: 12px;
    color: white;
  }

  .padre-container_item-1 {
    gap: 7px;
    padding-top: 0;
  }

  .padre-container_item-1__center {
    width: 70px;
    height: 70px;
  }

  .card-father[data-v-143f26b6] {
    padding-top: 10px;
    height: 260px;

    margin: 0 auto;
  }

  .card-father img {
    padding: 0px;
  }

  /*  .contend-arbols {
    padding-top: 88px;
  } */

  /* .card-children p {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 15px;
  }
 */
  .card-children-title {
    width: 50px;

    font-size: 10px;
  }

  .card-children-title-header {
    font-size: 15px;
  }

  /*  .card-children-grid {
    padding: 5px 0px 10px 10px;
    gap: 10px;
  } */

  /*   .card-children-grid img {
    width: 40px;
    height: 40px;
  } */


}
</style>

<style scoped>
.contend-arbols_container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  position: relative;
}

.center-colunm-souns {
  display: flex;
  align-items: center;
  position: relative;
}

.conten-fixed-arbol {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-top: 4%
}

.center-colunm-souns button {
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  background-color: #33A9F2;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  color: #ffffff;
  display: flex;
  justify-content: center;
  position: absolute;
  align-items: center;
  bottom: 26px;
  right: -32px;
}

.contend-arbols_container_img {
  width: 100%;
  /*   height: 20%; */
  margin-top: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
}

.fixed-arbol {
  /*  position: fixed;
  right: 34%; */
  /*   margin-top: 20%; */

  height: 200px;

}

.fixed-arbol>div {
  position: fixed;
}

.contend-arbols_container_img .fixed-arbol {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.fixed-arbol img {
  width: 130px;
  height: 130px;
  object-fit: cover;
  border-radius: 100%;
}

.contend-arbols_container_img p:nth-child(2) {
  color: #000;
  font-weight: 600;
  font-size: 15px;
  text-align: center;
  
  white-space: pre;
}

.contend-arbols_container_img p:nth-child(3) {
  color: #000;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
  
  white-space: pre;
}

.contend-arbols_container-child p:nth-child(1) {
  color: #000;
  font-weight: 600;
  font-size: 9px;
  text-align: center;
  
  white-space: pre;
}

.contend-arbols_container-child p:nth-child(2) {
  color: #000;
  font-weight: 600;
  font-size: 10px;
  text-align: center;
  
  white-space: pre;
}

.contend-arbols_container-child {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  /*  background: #ffffff; */
  /*   padding: 11px 22px; */
  border-radius: 16px;
  /*   box-shadow: 0px 0px 7px 3px #9e9e9e30; */
}

.contend-arbols_container-child_contend {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: column;
}

.contend-arbols_container-child_contend img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 100%;
  box-shadow: 0px 0px 7px 3px #9e9e9e;
}



.contend-arbols_container-child_contend p {
  color: rgb(0, 0, 0);
  font-weight: 600;
  font-size: .6rem;
  text-align: center;
}

.contend-arbols_container-child-2 {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-direction: column;
  position: relative;
}

.contend-arbols_container-child-2 img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 100%;
  box-shadow: 0px 0px 7px 3px #9e9e9e;
}

.contend-arbols_container-child-2 button {
  text-align: center;
  font-size: 15px;
  width: 25px;
  height: 25px;
  font-weight: 600;
  background-color: #33A9F2;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  /*   position: absolute;
  right: -30px; */
}

.header-modal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: start;
  padding: 10px;
  background-color: #33A9F2;
}

.header-modal p:nth-child(1) {
  font-size: 1.2rem;
  color: white;
  font-weight: 600;
}

.modal-body {
  overflow: auto;
  height: max-content;
}

.modal-body_container {
  display: flex;
  justify-content: flex-start;
}

.modal-body_container-child {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e5e5e5;
  gap: 20px;
}

.modal-body_container-child__img img {
  border-radius: 100%;
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.modal-body_container-child__text {}

@media (max-width: 640px) {
  .contend-arbols_container_img div img {
    width: 100px;
    height: 100px;
  }

  .contend-arbols_container-child_contend img {
    width: 90px;
    height: 90px;
  }

  .contend-arbols_container-child-2 img {
    width: 65px;
    height: 65px;
  }
}

@media (max-height: 800px) {
  .contend-arbols_container_img div img {
    width: 90px;
    height: 90px;
  }

  .contend-arbols_container-child_contend img {
    width: 75px;
    height: 75px;
  }

/*   .contend-arbols_container-child-2 img {
    width: 55px;
    height: 55px;
  } */

  .contend-badget div {
    height: 50px;
    width: 50px;
  }

  .contend-arbols_container_img {
    margin-top: 45px;
  }

  .conten-fixed-arbol {
    gap: 0;
  }

  .contend-arbols {
    margin-top: -20px;
  }

  .center-colunm-souns button {
    position: relative;
    right: -6px;
  }

  .button-previous {
    top: 37%;
    font-size: 12px;
  }
}
</style>