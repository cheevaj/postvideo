<template>
  <div class="custom-font" style="background-color: rgb(239, 239, 239)">
    <v-card-text
      class="px-8 py-6 table-container"
      style="height: 100vh; overflow-y: auto"
    >
      <br /><br />
      <h2 class="custom-font">ຊື່ປະເພດ</h2>
      <h2>
        <Input
          v-model="value"
          size="large"
          placeholder="ຊື່ປະເພດ..."
          clearable
          class="mt-2 custom-font"
        />
      </h2>
      <v-card
        outlined
        class="table-container pa-2"
        style="
          max-height: 450px;
          z-index: 100;
          margin-top: 2px;
          overflow-y: auto;
        "
      >
        <div
          v-for="(item, index) in itemsType"
          :key="index"
          :value="item"
          style="padding: 1px"
        >
          <v-card-actions
            class="my-1 custom-menu"
          >
            <span class="custom-font">{{ item }}</span>
            <v-spacer />
            <v-btn fab x-small outlined class="custom-icon" ><v-icon>mdi-text-box-edit-outline</v-icon></v-btn>
          </v-card-actions>
        </div>
      </v-card>
      <br>
      <v-btn
        width="100%"
        height="48"
        class="custom-font color-text"
        style="background-color: rgb(255, 215, 0)"
        :outlined="!isHovered"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <h2>ເພີ່ມ</h2>
      </v-btn>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: 'PostPage',
  data() {
    return {
      isHovered: false,
      value: '',
      itemsType: ['ໜັງ', 'ຂ່າວສານ', 'ກະຕຸນ', 'ທໍາອາຫານ'],
    }
  },
  methods: {},
}
</script>
<style scoped>
.custom-icon:hover {
  background-color: rgb(255, 215, 0);
  color: #ffff;
}
.custom-menu {
  background-color:#fff7e6;
  border-radius: 8px;
  padding-left: 6px;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-right: 4;
  border: 1.5px solid rgba(0, 0, 0, 0.3);
}

.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}

.shadow-card {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease;
  cursor: pointer;
}

.shadow-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

.hover-pointer {
  cursor: pointer;
  background-color: none;
}

.outlined {
  outline: none;
}

.outlined:hover {
  outline: 2px solid rgb(179, 179, 0);
}

.BK-color {
  background-color: rgb(255, 215, 0);
}

.color-text {
  color: #ffff;
}
.table-container::-webkit-scrollbar {
  width: 4px;
  height: 2px;
}

.table-container::-webkit-scrollbar-thumb {
  background-color: #ffff00;
  border-radius: 4px;
}

.table-container::-webkit-scrollbar-corner {
  background-color: #ffff00;
  border-radius: 4px;
}
.color-hover {
  color: none;
}
.color-hover:hover {
  color: rgb(255, 215, 0);
}
.color-red {
  color: #ed4014;
}
.color-grad {
  background-color: rgb(255, 255, 240);
}
.colo-with {
  background-color: #ffff;
}
.color-post {
  background-color: rgb(250, 250, 250);
}
.color-text-load {
  color: rgb(77, 77, 77);
}
.mouse-hover-menu:hover {
  background-color: rgb(255, 215, 0);
  color: #ffff;
}
</style>
