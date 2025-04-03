import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    port: 3335, // default: 3000
    host: '0.0.0.0', // default: localhost serverIP: 172.28.17.102
  },
  ssr: false,
  head: {
    titleTemplate: '%s Video',
    title: 'Admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Your app description here',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/Tpluslogo.png' }],
  },

  css: ['view-design/dist/styles/iview.css'],

  plugins: [
    '~/plugins/iview.js',
    '~/plugins/chartjs.js',
    { src: '~/plugins/vue-quill-editor.js', ssr: false },
  ],
  components: true,
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa',
    '@nuxtjs/google-fonts',
    '@nuxtjs/auth-next',
  ],
  auth: {
    store: '~/store',
    redirect: {
      login: '/login',
      home: '/',
    },
    strategies: {
      local: {
        token: {
          property: 'user.token',
          global: true,
          name: 'authorization',
          type: '',
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: {
            url: 'http://172.28.26.23:3100/users/loginAdminVideo',
            method: 'post',
          },
          logout: {
            url: 'http://172.28.17.102:3600/users/logout',
            method: 'delete',
          },
          user: {
            url: 'http://172.28.26.23:3100/users/marketdetail',
            method: 'get',
          },
        },
      },
    },
  },
  proxy: {
    '/users/': {
      target: 'http://172.28.17.102:3600',
      pathRewrite: { '^/users/': '/users/' },
      changeOrigin: true,
      secure: false,
    },
  },

  axios: {
    baseURL: 'http://172.28.17.102:3600',
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
