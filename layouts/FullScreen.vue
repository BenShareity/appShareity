<template>
  <div>
    <v-app class="bg-main">
      <Splashscreen v-if="controlSplash" @showSplash="showSplash" />
      <template v-else>
        <v-main style="padding: 0 !important">
          <!-- Content Section -->
          <nuxt />
          <!-- END Content Section -->
        </v-main>
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
