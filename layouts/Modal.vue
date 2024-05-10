<template>
  <div>
    <v-app class="bg-main">
      <template>
      <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          > 
        <v-main style="padding: 0 !important">
          <!-- Content Section -->
          <nuxt />
          <!-- END Content Section -->
        </v-main>
      </v-dialog>

      </template>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      controlSplash: true,
      clipped: false,
      drawer: false,
      fixed: false,
      dialog: true,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  methods: {
    showSplash(option) {
      this.controlSplash = option;
    },
  },
};
</script>
