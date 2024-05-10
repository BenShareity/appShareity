<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <v-card dark>
      <iframe
        ref="videoInfo"
        class="card-video"
        src="https://www.youtube.com/embed/3hOyYPZTmTI"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <v-card-actions>
        <v-btn
          class="m-2 back-info__btn"
          @click="closeModal()"
          fab
          small
          color="primary"
        >
          <v-icon> mdi-arrow-left-circle </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
  },
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.dialog = false;
      this.$emit("closeModalV");
    },
  },
};
</script>

<style scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
.card {
  height: 90%;
}
.card-video {
  width: 100%;
  height: 90vh;
}
.back-info__btn {
  background-color: #33A9F2 !important;
}
</style>
