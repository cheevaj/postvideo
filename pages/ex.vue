<template>
  <div class="custom-font" style="background-color: rgb(239, 239, 239)">
    <v-card-text class="px-8 py-6">
      <br /><br />
      <h2 class="custom-font">ຊື່ວີດີໂອ</h2>
      <h2>
        <Input
          v-model="form.title"
          size="large"
          placeholder="ຊື່ວີດີໂອ..."
          clearable
          class="mt-2 custom-font"
        />
      </h2>
      <br /><br />
      <h2 class="custom-font">ລາຍລະອຽດວີດີໂອ</h2>
      <Input
        v-model="form.des"
        type="textarea"
        :rows="4"
        placeholder="ລາຍລະອຽດວີດີໂອ..."
        class="mt-2 custom-font"
      />
      <br /><br /><br />
      <h2 class="custom-font">ໂຫຼດຂໍ້ມູນ</h2>
      <v-card outlined class="px-8 py-4 mt-2 colo-with">
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-btn @click="$refs.fileInput.click()" truncate-length="15">
                ຮູບຖ້າມີບໍ່?
              </v-btn>
              <input
                ref="fileInput"
                type="file"
                @change="handleImageUpload"
                accept="image/*"
                style="display: none"
              />
              <div v-if="form.image">
                image
                <v-img :src="form.image" height="110" />
              </div>
            </v-col>
            <v-col cols="6">
              <Upload
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
                :before-upload="handleImageUploadBK"
              >
                <div style="padding: 10px 0">
                  <Icon
                    type="ios-image-outline"
                    size="52"
                    style="color: rgb(255, 215, 0)"
                  />
                  <p class="custom-font color-text-load">ໂຫຼດຮູບພືນຫຼັງ</p>
                </div>
              </Upload>
              <div v-if="form.bkimage">
                <v-img :src="form.bkimage" height="110" />
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <br />
      <br />
      <h2 class="custom-font">ຂໍ້ມູນຂອງວິດີໂອ</h2>
      <v-card-text class="pa-6 pb-6 mt-2 border-solis">
        <v-row class="">
          <v-col cols="6" class="pa-0">
            <v-card-actions class="pa-0">
              <v-spacer />
              <h3 class="custom-font" style="margin-left: 12px">ລາຄາ:</h3>
              &nbsp;
              <v-card flat width="200" class="pa-0 border-input">
                <Poptip trigger="focus">
                  <Input
                    v-model="form.price"
                    prefix="logo-usd"
                    type="number"
                    placeholder="ລາຄາ"
                    class="custom-font"
                    style="width: 200px"
                  />
                  <template #content>
                    <div class="custom-font">
                      {{ formatNumber(form.price) }}
                    </div>
                  </template>
                </Poptip>
              </v-card>
            </v-card-actions>
          </v-col>
          <v-col cols="6" class="pa-0">
            <v-card-actions class="pa-0">
              <v-spacer />
              <h3 class="custom-font">ປະເພດ:</h3>
              &nbsp;
              <v-card flat width="200" class="pa-0 border-input">
                <Select
                  v-model="form.type"
                  :placeholder="form.type ? form.type : 'ປະເພດວີດີໂອ'"
                  class="custom-font"
                  style="width: 200px"
                >
                  <Option
                    v-for="(item, index) in items"
                    :value="item"
                    :key="index"
                    class="custom-font mouse-hover-menu"
                    style="width: 150px"
                    >{{ item }}</Option
                  >
                  <v-divider style="width: 150px"></v-divider>
                  <v-btn
                    class="custom-font mouse-hover-menu py-1 my-1 px-1"
                    style="width: 150px; height: 100%"
                    @click="addType"
                  >
                    <v-icon>mdi-plus-circle</v-icon>&nbsp;<span
                      class="custom-font"
                      >ເພີ່ມປະເພດໜັງ</span
                    >
                  </v-btn>
                </Select>
              </v-card>
            </v-card-actions>
          </v-col>
          <br /><br />
          <v-col cols="6" class="py-0">
            <Modal v-model="editType" width="340">
              <template #header>
                <p style="color: rgb(255, 215, 0); text-align: center">
                  <v-icon color="rgb(255, 215, 0)"
                    >mdi-clipboard-edit-outline</v-icon
                  >
                  <span class="custom-font">ເພີ່ມປະເພດຂອງໜັງ</span>
                </p>
              </template>
              <div style="text-align: center">
                <div>
                  <Input
                    size="large"
                    placeholder="ຊື່ປະເພດ..."
                    clearable
                    class="mt-2 custom-font"
                  />
                </div>
                <h3 class="custom-font" style="margin-top: 6px">
                  ປະເພດໜັງມີຢູ່ໃນລະບົບ
                </h3>
                <v-card
                  outlined
                  class="pa-0 table-container"
                  style="height: 280px; z-index: 100"
                >
                  <v-card-text
                    v-for="(item, index) in items"
                    :key="index"
                    :value="item"
                    class="custom-font"
                    style="padding: 4px; margin: 0; margin-top: 2px"
                  >
                    {{ item }}
                  </v-card-text>
                </v-card>
              </div>
              <template #footer>
                <Button
                  size="large"
                  long
                  class="custom-font"
                  @click="addType"
                  style="background-color: rgb(255, 215, 0); color: #ffff"
                >
                  ເພີ່ມປະເພດ
                </Button>
              </template>
            </Modal>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="pa-0">
            <v-card-actions class="pa-0">
              <v-spacer />
              <h3 class="custom-font">ສ່ອນຫຼຸດ:</h3>
              &nbsp;
              <v-card flat width="200" class="pa-0 border-input">
                <Poptip trigger="focus">
                  <Input
                    v-model="form.reduced"
                    prefix="logo-usd"
                    type="number"
                    placeholder="ສ່ອນຫຼຸດ"
                    class="custom-font"
                    style="width: 200px"
                  />
                  <template #content>
                    <div class="custom-font">
                      {{ formatNumber(form.reduced) }}
                    </div>
                  </template>
                </Poptip>
              </v-card>
            </v-card-actions>
          </v-col>
          <v-col cols="6" class="pa-0">
            <v-card-actions class="pa-0">
              <v-spacer />
              <h3 class="custom-font">ໝອດໝູ່:</h3>
              &nbsp;
              <v-card flat width="200" class="pa-0 border-input">
                <Select
                  v-model="form.resolution"
                  :placeholder="
                    form.resolution ? form.resolution : 'ໝອດໝູ່ວີດີໂອ'
                  "
                  class="custom-font"
                  style="width: 200px"
                >
                  <Option
                    v-for="(item, index) in resolution"
                    :value="item"
                    :key="index"
                    class="custom-font mouse-hover-menu"
                    style="width: 150px"
                    >{{ item }}</Option
                  >
                  <v-divider style="width: 150px"></v-divider>
                  <v-btn
                    class="custom-font mouse-hover-menu py-1 my-1 px-1"
                    style="width: 150px; height: 100%"
                  >
                    <v-icon>mdi-plus-circle</v-icon>&nbsp;<span
                      class="custom-font"
                      >ເພີ່ມປະເພດໜັງ</span
                    >
                  </v-btn>
                </Select>
              </v-card>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="text-right py-1 px-0">
        <Tooltip
          max-width="200"
          class="custom-font"
          content="ກົດ2ຄັ້ງເພື່ອລ້າງຂໍ້ມູນທັງໝົດໃນຟອນ."
        >
          <v-btn
            text
            small
            class="custom-font color-text pa-0"
            style="color: transparent"
            @dblclick="deleteFrom"
          >
            <h3 style="color: #ed4014">ລ້າງຂໍ້ມູນທັງໝົດ</h3>
          </v-btn>
        </Tooltip>
      </v-card-text>
      <br />
      <br />
      <v-btn
        width="100%"
        height="50"
        class="custom-font color-text"
        style="background-color: rgb(255, 215, 0)"
        :outlined="!isHovered"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
        @click="addVideo"
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
      value_p: 0,
      editType: false,
      loading: false,
      isHovered: false,
      items: ['ໜັງ', 'ຂ່າວສານ', 'ກະຕຸນ', 'ອາຫານ'],
      form: {
        image: null,
      },
      resolution: [
        '144p',
        '240p',
        '360p',
        '480p',
        '720p60',
        '1080p20',
        '1440p60',
      ],
    }
  },
  methods: {
    formatNumber(Number) {
      if (!Number) return 'ກະລຸນາປອມຈໍານວນເງີນ'
      function parseNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
      return parseNumber(Number)
    },
    addType() {
      this.editType = !this.editType
    },
    deleteFrom() {
      this.form = {}
    },
    handleMenuItemClick(id, title, image, des, price, type, bkimage) {
      console.log(this.form)
      const updatedForm = {
        id,
        title,
        image,
        des,
        price,
        type,
        bkimage,
      }
      this.$store.commit('SET_FORM', updatedForm)
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      console.log(file);
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.form.image = e.target.result;
          console.log(this.form.image); 
        };
        reader.readAsDataURL(file);
      }
    },
    handleImageUploadBK(image) {
      this.form.bkimage = image
    },
    handleVideoUpload(video) {
      this.form.video = video
    },
    playURL(file) {
      try {
        return URL.createObjectURL(file)
      } catch (e) {
        console.error('Error creating object URL:', e)
        return ''
      }
    },
    addVideo() {
      const { title, image, des, price, type, bkimage } = this.form
      console.log(des)
      if (title && image && des && price && type && bkimage) {
        console.log('Adding video:', this.form)
        this.messageModal('success')
      } else {
        this.messageModal('error')
      }
    },
    messageModal(type) {
      this.$Message[type]({
        background: true,
        content: `<span class="custom-font">${
          type === 'success'
            ? 'ເພີ່ມຂໍ້ມູນວີດີໂອສໍາເລັດ.'
            : 'ເພີ່ມຂໍ້ມູນວີດີໂອບໍ່ສໍາເລັດ.'
        }<span>`,
      })
    },
  },
}
</script>
<style scoped>
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
  background-color: #ed4014;
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
.border-input {
  border-radius: 4px;
}
.border-solis {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #fff;
}
</style>
