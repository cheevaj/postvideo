import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    titleTemplate: '%s Video',
    title: 'Post',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Your app description here' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/Tpluslogo.png' }],
  },

  css: [
    'view-design/dist/styles/iview.css'
  ],

  plugins: [
    '~/plugins/iview.js',
    '~/plugins/chartjs.js',
    { src: '~/plugins/vue-quill-editor.js', ssr: false }
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa',
    '@nuxtjs/google-fonts',
  ],

  axios: {
    baseURL: '/',
    // You can also add a timeout or other settings here
  },
  pwa: {
    manifest: {
      lang: 'en',
    },
  },
  googleFonts: {
    families: {
      'Noto+Sans+Lao': true,
    },
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
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

  build: {},
}