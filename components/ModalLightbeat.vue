<template>
  <v-dialog v-model="dialog" max-width="400px" persistent transition="dialog-bottom-transition">
    <v-card class="bg-card">
      <div class="contend-orientations" @click="closeModal">
        <img :src="img" alt="" class="card-img" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog", "img"],
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.dialog = false;
      this.$emit("closeModal");
    },
  },
};
</script>

<style scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}

.bg-card {
  height: 100vh;
  background-color: #e9f1f8;
}

.card-img {
  width: 100%;
}

.btn-back {
  background-color: #33a9f2 !important;
  margin: 10px;
  position: absolute;
  top: 0;
  left: 2%;
  z-index: 300;
}

.contend-orientations {}

.contend-orientations img {
  width: 100vh;
  height: 100vw;
  margin: 0;
  transform: translatex(calc(50vw - 50%)) translatey(calc(50vh - 50%)) rotate(90deg);
  object-fit: fill;
}
</style>
