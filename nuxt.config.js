export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'track-ads',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css' },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/7.4.47/css/materialdesignicons.min.css',
        integrity: 'sha512-/k658G6UsCvbkGRB3vPXpsPHgWeduJwiWGPCGS14IQw3xpr63AEMdA8nMYG2gmYkXitQxDTn6iiK/2fD4T87qA==',
        crossorigin: 'anonymous',
        referrerpolicy: 'no-referrer'
      }    ],
    script: [
      { src: 'https://d3js.org/d3.v7.min.js' },
      { src: 'https://code.highcharts.com/highcharts.js' },
      { src: 'https://code.highcharts.com/modules/exporting.js' },
      { src: 'https://code.highcharts.com/modules/export-data.js' },
      { src: 'https://code.highcharts.com/modules/accessibility.js' },
      {
        src: 'https://unpkg.com/@mapbox/leaflet-pip@latest/leaflet-pip.js',
        body: true, 
        async: true, 
      },
      { src: 'https://cdn.jsdelivr.net/npm/chart.js' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/static/global.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: './plugins/leaflet.js', ssr:false},
    { src: "~/plugins/axios", ssr: true },
    { src: '~/plugins/datePicker.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  axios: {
    baseURL: process.env.API_URL
      ? process.env.API_URL
      : "https://example.com",
    credentials: true,
  },
  
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  modules: ["@nuxtjs/axios",
    '@nuxtjs/auth-next'
  ],
  auth: {
    strategies: {
      // google: {
      //   clientId: '832506559394-o0idocv8q43d1ri50oq0artf064cr5k3.apps.googleusercontent.com', // Replace with your Google Client ID
      //   codeChallengeMethod: '', // Optional, defaults to 'S256'
      //   responseType: 'token id_token', // Optional, defaults to 'token id_token'
      //   redirectUri: 'http://localhost:3000/login', // Replace with your redirect URI
      //   params: {
      //     prompt: 'select_account' // This forces the Google login page to show the account selection screen
      //   },
      //   endpoints: {
      //     userInfo: 'https://www.googleapis.com/oauth2/v3/userinfo'
      //   },
      //   scope: ['openid', 'profile', 'email'],
      // }
    },
    redirect: {
      login: '/login', // Redirect user to this path if login is required
      logout: '/', // Redirect user to this path after logout
      home: '/overview' // Redirect user to this path after login
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      // Add a rule for loading GeoJSON files
      config.module.rules.push({
        test: /\.geojson$/,
        loader: 'json-loader', // or 'json5-loader' depending on your needs
      });
    }
  }
}
