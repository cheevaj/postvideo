<template>
  <div>
    <v-overlay :value="rightDrawer" />
    <v-navigation-drawer
      v-model="rightDrawer"
      right
      fixed
      width="650"
      class="table-container-add scrollbar"
      style="background-color: rgb(242, 242, 242)"
      @click.stop
    >
      <v-card
        outlined
        class="py-0 px-3 rounded-0"
        style="position: fixed; z-index: 100; width: 100%"
      >
        <v-card-actions class="pa-0">
          <v-icon class="color-hover" @click="rightDrawer = false"> mdi-close </v-icon>
          <v-card-title class="custom-font py-1">ເພີ່ມຂໍ້ມູນຊີລີ່</v-card-title>
        </v-card-actions>
      </v-card>
      <UpdateVideo />
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  name: 'ViewPage',
  data() {
    return {
      rightDrawer: true,
    }
  },
}
</script>
