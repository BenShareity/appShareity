<template>
  <div :class="mostrar && 'container_out'" class="body">
    <SwayscoresHeader />
    <div class="padre-loves">
      <template v-if="loading">
        <div class="sway-header" style="margin-bottom: 30px">
          <v-skeleton-loader max-height="80px" class="sways-card" max-width="80px" :elevation="5"
            type="card"></v-skeleton-loader>
        </div>

        <div class="sway-header">
          <v-skeleton-loader max-height="300px" class="sways-card" max-width="90%" :elevation="5"
            type="card"></v-skeleton-loader>
        </div>
      </template>
      <template v-else>
        <div class="padre-loves_center">
          <div class="padre-loves_center-border">
            <span class="padre-loves_center-border_text">{{ totals }}</span>
          </div>
        </div>
        <div v-for="(item, index) in card" :key="index" class="padre-loves__item2">
          <div class="padre-loves__item2-card">
            <div class="padre-loves__item2-card-padre-img">
              <img :src="urlBucket + item.photoUrl" class="padre-loves__item2-card-padre-img-img" />
            </div>
            <div class="padre-loves__item2-card-padre-footer">
              <div class="padre-loves__item2-card-padre-footer-like">
                {{ item.likeCount }}
              </div>
              <div><v-icon color="#47a4e7" size="40"> mdi-heart </v-icon></div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
  created() {
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehaviorY = 'none';
    this.loading = true;
    if (process.client) {
      this.location = window.location.pathname;
      localStorage.setItem("effect-Modal", true);
    }
    this.nicknameAction().then((session) => {
      this.swayScoreAction({
        id: session.id,
      }).then((r) => {
        this.card = r.userChallenges;
        this.totals = r.userChallenges.length;
        this.loading = false;
      });
    });
  },

  layout(context) {
    return "App";
  },
  data: () => ({
    card: [],
    totals: null,
    mostrar: null,
    loading: false,
  }),

  methods: {
    ...mapActions("user", ["swayScoreAction", "nicknameAction"]),
    goBack() {
      document.documentElement.style.overflow = "initial";
      document.documentElement.style.overscrollBehaviorY = 'initial';
      this.mostrar = true;
      setTimeout(() => {
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
  },
};
</script>

<style lang="css" scoped>
.padre-loves {
  height: 100%;
  background-color: #e9f1f8;
  padding: 20px 20px 130px 20px;
  gap: 20px;
  overflow: auto;
}

.padre-loves_center {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  padding-top: 20px;
}

.padre-loves_center-border {
  width: 80px;
  box-shadow: 0px 0px 6px -1px #00000066;
  height: 80px;
  border: 2px solid #01386E;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.padre-loves_center-border_text {
  font-size: x-large;
  color: #01386E;
  font-weight: 500;
}

.padre-loves__item2 {
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.padre-loves__item2-card {
  background-color: white;
  padding: 20px;
  box-shadow: 0px 0px 16px -9px black;
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  gap: 20px;
}

.padre-loves__item2-card-padre-img {
  width: 100%;
  height: 250px;
}

.padre-loves__item2-card-padre-img-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.padre-loves__item2-card-padre-footer {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}

.padre-loves__item2-card-padre-footer-like {
  color: #47a4e7;
  font-size: 30 px;
}

.group-card {
  width: 70px;
  height: 70px;
  box-shadow: none !important;
  border-width: 2px;
  border-style: solid;
  border-color: #01386E;
}

.group-title {
  color: #01386E;
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
