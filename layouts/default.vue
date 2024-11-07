<template>
  <v-app dark>
    <div v-if="fname !== '' || token">
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        clipped
        fixed
        app
      >
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="custom-font">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
    <v-app-bar clipped-left fixed app style="background-color: #ffff">
      <div>
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon size="30">mdi-menu</v-icon>
        </v-btn>
        &nbsp;&nbsp;
        <v-avatar height="48" width="48" class="pa-0 black">
          <img src="Tpluslogo.png" alt="John" />
        </v-avatar>
      </div>
      <v-spacer></v-spacer>
      <v-btn text style="background-color: transparent" color="transparent" @click="logOut">
        <v-icon color="#000">mdi-location-exit</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'ໜ້າຫຼັກ',
          to: '/',
        },
        {
          icon: 'mdi-post-outline',
          title: 'ໂພດ',
          to: '/post',
        },
      ],
      miniVariant: false,
    }
  },
  computed: {
    token() {
      if (this.$route.path === ('/login') || this.$route.path === ('/loginex')) {
        return false
      } else {
        return true
      }
    },
    tokenShow() {
      return this.$store.state.tokenShow
    },
    fname() {
      return this.$auth.user && this.$auth.user.name ? this.$auth.user.name : ''
    },
  },
  methods: {
    logOut() {
      this.$auth.strategy.token.reset()
      this.$store.commit('setToken', false)
      this.$router.push('/login')
      this.$auth.logout()
    },
  },
}
</script>
<style scoped>
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}
/* .custom-btn:hover {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease;
  outline: 0px solid rgb(255, 204, 0);
} */
</style>
