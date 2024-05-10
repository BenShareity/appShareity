<template>
  <div :class="mostrar && 'container_out'" class="body">
    <SwayscoresHeader />

    <div class="padre-container">
      <template v-if="loading">
        <div class="sway-header">
          <v-skeleton-loader max-height="80px" class="sways-card" max-width="80px" :elevation="5"
            type="card"></v-skeleton-loader>
        </div>
        <div class="sway-header__list">
          <v-skeleton-loader class="list-item" color="secondary" :elevation="5" type="paragraph"></v-skeleton-loader>
          <v-skeleton-loader class="list-item" color="secondary" :elevation="5" type="paragraph"></v-skeleton-loader>
        </div>
      </template>
      <template v-else>
        <div class="padre-container_item-1">
          <div class="padre-container_item-1__center">
            <span v-if="money != null" class="padre-container_item-1__center-text">${{ money }}</span>
            <span v-else class="padre-container_item-1__center-text">$0</span>
          </div>
        </div>
        <div>
          <div class="padre-container_item-2">
            <div class="padre-container_item-2_center">
              <img class="padre-container_item-2_center-img" :src="require('~/assets/img/money.png')" alt="" />
            </div>
            <div class="padre-container_item-2_center-text1">Money</div>
            <div v-if="money != null" class="padre-container_item-2_center-text2">
              ${{ money }}
            </div>
            <div v-else class="padre-container_item-2_center-text2">$0</div>
          </div>
        </div>
        <div>
          <div class="padre-container_item-3">
            <div class="padre-container_item-3-center">
              <img class="padre-container_item-3-center-img" :src="require('~/assets/img/influenced.png')" alt="" />
            </div>
            <div class="padre-container_item-3-center-text1">Others</div>
            <div v-if="object != null" class="padre-container_item-3-center-text2">
              {{ object }}
            </div>
            <div v-else class="padre-container_item-3-center-text2">0</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  created() {
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehaviorY = 'none';
    this.loading = true;
    this.nicknameAction().then((session) => {
      this.loading = true;
      this.swayScoreAction({
        id: session.id,
      }).then((r) => {
        setTimeout(() => {
          this.loading = false;
          if (r.raised.money !== undefined) {
            this.money = r.raised.money;
            this.object = r.raised.object;
          }
        }, 1000);
      });
    });
  },

  layout(context) {
    return "App";
  },
  data: () => ({
    money: null,
    object: null,
    mostrar: null,
    loading: false,
  }),
  computed: {
    ...mapGetters("header", ["getHeaderType"]),
  },
  watch: {
    getHeaderType(value) {
      if (value == 1) this.goBack();
    },
  },
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
  },
};
</script>

<style lang="css" scoped>
.padre-container {
  height: 100%;
  background-color: #e9f1f8;
  padding: 20px;
}

.padre-container_item-1 {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
}

.padre-container_item-1__center {
  width: 80px;
  box-shadow: 1px 2px 6px -2px #00000047;
  height: 80px;
  border: 2px solid #01386e;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.padre-container_item-1__center-text {
  font-size: x-large;
  color: #01386e;
  font-weight: 500;
}

.padre-container_item-2 {
  background-color: #ffffff;
  display: flex;
  margin-top: 20px;
  justify-content: space-around;
  align-items: center;
  box-shadow: 1px 2px 6px -2px #00000047;
  border-radius: 10px;
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
  background-color: #fff;
  display: flex;
  margin-top: 20px;
  justify-content: space-around;
  align-items: center;
  box-shadow: 1px 2px 6px -2px #00000047;
  border-radius: 10px;
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

.group-card {
  width: 70px;
  height: 70px;
  box-shadow: none !important;
  border-width: 2px;
  border-style: solid;
  border-color: #01386e;
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
  height: 100dvh;
  overflow: hidden;
  padding: 15% 0px 0px 0px !important;
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
</style>
