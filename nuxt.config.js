import colors from "vuetify/es5/util/colors";

export default {
  loading: false,

  env: {
    api_url: process.env.API_URL,
    api_assets_url: process.env.API_ASSETS_URL,
  },
  server: {
    port: 8000, // default: 3000
    host: "0", // default: localhost
  },
  router: {
    base: "/",
  },
  dir: {
    pages: "views",
  },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  target: "server",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "Shareity - %s",
    title: "Shareity",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height",
      },
      {
        name: "viewport",
        content:
          "user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height",
      },
      {
        name: "mobile-web-app-capable",
        content:
          "user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height",
      },
      {
        name: "apple-mobile-web-app-capable",
        content:
          "user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height",
      },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content:
          "user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height",
      },
      {
        name: "apple-mobile-web-app-title",
        content:
          "user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height",
      },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { content: "/icon-180.png", property: "og:image" },
      { content: "Shareity", property: "og:title" },
      /*   { hid: "description", name: "description", content: "Shareity Web App" },
        { hid: 'og:image', property: 'og:image', content: 'https://media-exp1.licdn.com/dms/image/C4D0BAQEeywB6HybUCA/company-logo_200_200/0/1616462856767?e=2147483647&v=beta&t=O_3hnXIRRMWNIHtIvR_jqjXK-SNUOzUwUVyfy_flM9g' } */
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
    ],
    script: [
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/css/main.scss",
    // '@/assets/css/fonts/poppins/stylesheet.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/helpers.js",
    "~/plugins/errors.js",
    "~/plugins/axios.js",
    "~/plugins/chart.js",
    "~/plugins/barChart.js",
    "~/plugins/doughnutChart.js",
    "~/plugins/lineChart.js",
    "~/plugins/websocket.js",
    { src: "~/plugins/social-meta.js" },
    { src: "~/plugins/vueSession.js", mode: "client" },
    { src: "~/plugins/infiniteloading", ssr: false },
    { src: "~/plugins/qrcode", ssr: false },
    {
      src: "~/plugins/vue-video-background",
      ssr: false,
    },
    { src: "~/plugins/vue-phone" },
    { src: "~/plugins/vue-qr", ssr: false },
    { src: "~/plugins/virtualList",ssr: true },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "vue-social-sharing/nuxt",
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxtjs/auth-next",
    "cookie-universal-nuxt",
  ],
  auth: {
    strategies: {
      local: {
        token: {
          property: "token",
          // required: true,
          // type: 'Bearer'
          type: "",
        },
        user: {
          property: "",
          // autoFetch: true
        },
        endpoints: {
          login: { url: process.env.API_URL + "/login", method: "post" },
          logout: { url: process.env.API_URL + "/logout", method: "get" },
          user: { url: process.env.API_URL + "/user", method: "get" },
        },
      },
    },
    redirect: {
      login: "/login",
      logout: "/login",
      callback: "/login",
      home: "/",
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.API_URL,
    },
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.API_URL,
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      source: "/icon.png",
      fileName: "icon.png",
      sizes: [64, 120, 144, 152, 192, 384, 512],
    },
    manifest: {
      lang: "en",
      name: "Shareity",
      short_name: "Shareity",
      title: "Shareity",
      background_color: "#f3f4f5",
      theme_color: "#f3f4f5",
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vue-qr", "@diadal/vue3-qr-code-styling", 'swiper'],
  },
};
