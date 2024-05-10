<template>
  <div class="text-center">
    <v-bottom-sheet v-model="searchModal" persistent :width="windowWidthT + 14" :content-class="`${toListenWidth > 1264 && toListenWidth < 1904 ? 'margin_desptop' : ''
      }`">
      <v-sheet style="background: azure; position: relative; overflow-y: scroll;" height="100vh">
        <header class="d-flex justify-space-between align-center header">
          <v-icon color="blue" @click="searchModalAction(false)" large>
            mdi-keyboard-backspace
          </v-icon>
          <img src="@/assets/img/png/icon_shareity_channel.png" width="30px">
          <p style="color:blue">V2.0.1.3</p>
        </header>
        <div class=" search-container">
          <v-text-field label="Search for a Challenge" outlined dense style="margin:0 10px"
            v-model="search"></v-text-field>
          <div class="search-icons-container">
            <div :class="'search-icons-item-l ' + listMode" @click="viewMode(1)">
              <v-icon>mdi-menu</v-icon>
            </div>
            <div :class="'search-icons-item-r ' + gridMode" @click="viewMode(2)">
              <v-icon>mdi-view-grid</v-icon>
            </div>
          </div>
        </div>
        <div :style="gridMode == 'select-background' ? gridStyle : ''" class="container-items">
          <div v-for="(item, index) in items" :key="index"
            :class="gridMode == 'select-background' ? 'content-item-grid' : 'd-flex content-item'"
            @click="fullChallengeAction({ state: true, challenge: item })">
            <img :src="urlBucket + item.ImgCamp" width="75px">
            <p>{{ item.NameBad }}</p>
          </div>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    sheet: false,
    gridMode: '',
    listMode: 'select-background',
    select: 1,
    search: ''
  }),
  props: {
    challenge: Object
  },
  computed: {
    ...mapState("challenges", ["searchModal"]),
    ...mapState("phoneSize", ["windowLeftT", "windowWidthT"]),

    items() {
      /*  return this.challenge.filter(item => {
         return item.NameBad.toLowerCase().includes(this.search.toLowerCase());
       }); */
    },
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(3, minmax(100px, 1fr))`
      }
    },
  },
  computed: {
   
    urlBucket() {
      return process.env.api_assets_url;
    },
  },
  methods: {
    ...mapActions("challenges", ["searchModalAction", "fullChallengeAction"]),
    toListenWidth() {
      return window.innerWidth
    },
    viewMode(res) {
      if (res === 1) {
        this.listMode = 'select-background';
        this.gridMode = ''
      } else {
        this.gridMode = 'select-background';
        this.listMode = ''
      }
    }
  },
  mounted() { }
};
</script>
<style scoped>
.header {
  padding: 10px 10px;
}

.search-container {
  height: 40px;
  display: flex;
  justify-content: space-between;
}

.search-icons-container {
  display: flex;
  width: 18%;
  margin: 0 5px;
}

.search-icons-container div {
  border: 1.2px solid rgba(0, 0, 0, 0.38);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
}

.search-icons-item-l {
  -webkit-border-top-left-radius: 10px;
  -webkit-border-bottom-left-radius: 10px;
  -moz-border-radius-topleft: 10px;
  -moz-border-radius-bottomleft: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.select-background {
  background: rgba(0, 0, 0, 0.223);
}

.search-icons-item-r {
  -webkit-border-top-right-radius: 10px;
  -webkit-border-bottom-right-radius: 10px;
  -moz-border-radius-topright: 10px;
  -moz-border-radius-bottomright: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.container-items {
  display: grid;
  color: #26a2e9;
}

.content-item-grid {
  margin: 10px 10px;
}

.content-item {
  margin: 10px 10px;
}

.content-item p {
  display: flex;
  align-items: center;
  margin-left: 10px;
  color: #26a2e9;
}
</style>