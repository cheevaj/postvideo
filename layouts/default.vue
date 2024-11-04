<template>
  <v-app dark>
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
      drawer: false,
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
        {
          icon: 'mdi-movie-open-plus',
          title: 'ເພີ່ມວີດີໂອ',
          to: '/addvideo',
        },
      ],
      miniVariant: false,
    }
  },
  methods: {},
}
</script>
<style scoped>
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}
</style>
