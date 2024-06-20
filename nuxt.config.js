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
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
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
      { src: 'https://cdn.jsdelivr.net/npm/chart.js' }
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
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios"
  ],

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
