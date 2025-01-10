<template>
  <v-app dark>
    <div v-if="fname !== '' || token">
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        clipped
        fixed
        width="200"
        style="border: 1px solid #ffc400;"
        app
      >
        <v-card flat height="50px" class="rounded-0 text-center " style="background-color: #ffc400;">
          <br />
          <h2 v-if="!miniVariant">Admin</h2>
          <h4 v-else>Admin</h4>
        </v-card>
        <v-divider style="background-color: #997500; height: 2px;"></v-divider>
        <v-list class="py-0">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            class="py-0"
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
    <v-app-bar flat clipped-left fixed app style="background-color: #ffff; z-index: 100; border-bottom: 1.5px solid #b3b3b3;">
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
      <v-btn v-if="fname !== '' || token" text style="background-color: transparent" color="transparent" @click="logOut">
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
        // {
        //   icon: 'mdi-post-outline',
        //   title: 'Update',
        //   to: '/update',
        // },
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
