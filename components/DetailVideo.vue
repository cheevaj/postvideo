<template>
  <div class="custom-font" style="background-color: rgb(239, 239, 239)">
    <v-card-text class="px-4" style="padding: 12px">
      <br />
      <br />
      <br />
      <h2 class="px-3 custom-font" style="text-decoration: underline">
        {{ 'ຊື່ວີດີໂອ' }}
      </h2>
      <v-card outlined class="pa-2 custom-margin">
        <v-card-text class="py-1 px-0">
          <h3>{{ form.title }}</h3>
        </v-card-text>
      </v-card>
      <br />
      <h2 class="px-3 custom-font" style="text-decoration: underline">
        {{ 'ລາຍລະອຽດ' }}
      </h2>
      <v-card outlined class="pa-2 custom-margin" min-height="120px">
        <v-card-text class="pa-0">
          <div v-html="form.des" class="custom-font-style"></div>
        </v-card-text>
      </v-card>
      <br /><br />
      <h2 class="px-3 custom-font" style="text-decoration: underline">
        ໂຫຼດຂໍ້ມູນ
      </h2>
      <v-card-text class="py-0 pl-0 pr-3 custom-margin">
        <v-row>
          <v-col cols="6">
            <Upload
              v-if="newForm.video"
              action="//jsonplaceholder.typicode.com/posts/"
              :before-upload="handleVideoUpload"
            >
              <v-card flat height="155px" width="100%">
                <video
                  :src="playURL(newForm.video)"
                  controls
                  height="155px"
                  style="
                    width: 100%;
                    border-radius: 8px;
                    border: 1px solid rgb(166, 166, 166);
                  "
                ></video>
              </v-card>
            </Upload>
            <v-card-text
              v-else
              height="240"
              class="pa-0"
              style="background-color: #ffff; width: 100%; border-radius: 8px"
            >
              <div class="pa-4">
                <Upload
                  type="drag"
                  action="//jsonplaceholder.typicode.com/posts/"
                  style="width: 100%; height: 120px"
                  :before-upload="handleVideoUpload"
                >
                  <div style="padding: 10px 0px; height: 120px">
                    <Icon
                      type="ios-videocam"
                      size="52"
                      style="color: rgb(255, 215, 0)"
                    />
                    <p class="custom-font color-text-load">ໂຫຼດວີດີໂອ</p>
                  </div>
                </Upload>
              </div>
            </v-card-text>
            <v-card flat width="200" class="pa-0 border-input">
              <Select
                v-model="newForm.resolution"
                :placeholder="
                  newForm.resolution
                    ? String(newForm.resolution)
                    : 'ເລືອກຄວາມລະອຽດ'
                "
                class="custom-font table-container"
                style="width: 200px"
              >
                <Option
                  v-for="(item, index) in resolution"
                  :value="item.qualityId"
                  :key="index"
                  :disabled="item.active"
                  class="custom-font"
                  :class="{ 'mouse-hover-menu': !item.active }"
                  style="width: 150px; text-align: center;"
                >
                  {{ item.quality }}&nbsp;&nbsp;
                  <span>
                    <v-icon :color="item.active ? '#cccccc' : 'transparent'">
                      mdi-play-protected-content
                    </v-icon>
                  </span>
                </Option>
              </Select>
            </v-card>
          </v-col>
          <v-col cols="6" class="pb-0">
            <Upload
              v-if="newForm.image"
              action="//jsonplaceholder.typicode.com/posts/"
              :before-upload="handleImageUpload"
            >
              <v-card
                flat
                style="width: 290px; height: 155px; border-radius: 8px"
              >
                <v-img
                  :src="playURL(newForm.image)"
                  style="
                    width: 290px;
                    height: 155px;
                    border-radius: 8px;
                    border: 1px solid rgb(166, 166, 166);
                  "
                />
              </v-card>
            </Upload>
            <v-card-text
              v-else
              height="240"
              class="pa-0"
              style="background-color: #ffff; width: 100%; border-radius: 8px"
            >
              <div class="pa-4 d-flex align-center justify-center">
                <Upload
                  type="drag"
                  action="//jsonplaceholder.typicode.com/posts/"
                  style="width: 100%; height: 120px"
                  :before-upload="handleImageUpload"
                >
                  <div style="padding: 10px 0">
                    <Icon
                      type="md-images"
                      size="52"
                      style="color: rgb(255, 215, 0)"
                    />
                    <p class="custom-font color-text-load">ໂຫຼດໜ້າປົດວີດີໂອ</p>
                  </div>
                </Upload>
              </div>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card-text>
      <br />
      <br />
      <div class="px-3">
        <v-btn
          width="100%"
          height="50"
          class="custom-font color-text custom-btn"
          style="background-color: rgb(255, 215, 0)"
          @click="addVideoMovie"
        >
          <!-- style="background-color: rgb(255, 215, 0); display: flex; position: fixed; bottom: 20px;" -->
          <h2>ເພີ່ມ</h2>
        </v-btn>
      </div>
      <br />
    </v-card-text>
  </div>
</template>
<script>
export default {
  name: 'ViewPage',
  data() {
    return {
      newForm: { image: null, video: null, resolution: 0 },
      resolution: [],
    }
  },
  computed: {
    form() {
      return this.$store.state.form
    },
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const apiCalls = [
        this.$axios.post('http://172.28.17.102:2024/video/getallvideoquality'),
      ]
      try {
        const responses = await Promise.all(apiCalls)
        const [resolution] = responses
        this.resolution = resolution.data.detail.map((item) => {
          return {
            ...item,
            active: this.form.resolution.includes(item.quality),
          }
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
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
      this.newForm = {}
    },
    handleImageUpload(image) {
      if (image && image.size > 0) {
        this.newForm.image = image
      }
    },
    handleVideoUpload(video) {
      if (video && video.size > 0) {
        this.newForm.video = video
      }
    },
    playURL(file) {
      try {
        return URL.createObjectURL(file)
      } catch (e) {
        console.error('Error creating object URL:', e)
        return ''
      }
    },
    reSetValue() {
      const updatedForm = {
        title: '',
        des: '',
        type: '',
        bkimage: null,
        image: null,
        reduced: 0,
        category: [],
      }
      this.$store.commit('SET_FORM', updatedForm)
    },
    async addVideoMovie() {
      const { image, video, resolution } = this.newForm
      if (!video || !image || !resolution) {
        this.messageModal('error')
        return
      }
      const id = this.form.id
      const formData = new FormData()
      if (video) {
        formData.append('name', video)
      }
      if (image) {
        formData.append('thumbnail', image)
      }
      const videoData = JSON.stringify({
        qualityId: resolution || '',
        videoId: id || '',
      })
      formData.append('videoData', videoData)
      try {
        const response = await this.$axios.post(
          'http://172.28.17.102:2024/video/addvideoqualityinfo',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        console.log('Data response:', response)
        this.messageModal('success')
        this.$store.commit('SET_STEP_ADD_VIDEO', 0)
        this.resetValue()
        this.newForm = { image: null, video: null, resolution: 0 }
      } catch (error) {
        console.error(
          'Error fetching data:',
          error.response ? error.response.data : error.message
        )
      }
    },
    messageModal(type) {
      this.$Message[type]({
        background: true,
        content: `<span class="custom-font">${
          type === 'success' ? 'ເພີ່ມວີດີໂອສໍາເລັດ.' : 'ເພີ່ມວີດີໂອບໍ່ສໍາເລັດ.'
        }<span>`,
      })
      if (type === 'error') {
        this.errorMessage()
      }
    },
    errorMessage() {
      this.$Notice.error({
        title: `<span class="custom-font">${'ຂໍ້ມູນວ່າງ'}</span>`,
        desc: `<span class="custom-font">${'ກະລຸນາກວດເບິ່ງລາຍລະອຽດຂໍ້ມູນທັງໝົດແລະລອງໃໝ່ອີກຄັ້ງ.'}</span>`,
      })
    },
  },
}
</script>
<style scoped>
.card-image {
  width: 250px;
  height: 150px;
  position: absolute;
  bottom: 5px;
  padding: 2px;
  right: 5px;
  z-index: 100;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(77, 77, 77, 0.5);
}
.custom-link {
  border-radius: 14px;
  background-color: rgb(242, 242, 242);
}
.custom-font-global {
  font-family: 'Noto Sans Lao', sans-serif;
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

.BK-color {
  background-color: rgb(255, 215, 0);
}

.color-text {
  color: #ffff;
}
.table-container ::-webkit-scrollbar {
  width: 1px;
  height: 2px;
}

.table-container ::-webkit-scrollbar-thumb {
  background-color: #ffff00;
  border-radius: 4px;
}

.table-container ::-webkit-scrollbar-corner {
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

.color-text-load {
  color: rgb(77, 77, 77);
}
.outlined-border {
  border-radius: 8px;
  padding: 2px;
}
.color-grad-background {
  background-color: rgb(248, 248, 248);
}
.custom-margin {
  margin-top: 8px;
  margin-left: 10px;
  margin-bottom: 8px;
  margin-right: 8px;
}
.mouse-hover-menu:hover {
  background-color: rgb(255, 215, 0);
  color: #ffff;
}
.custom-btn {
  outline: 0px solid black;
  transition: outline 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0 0px 0px rgba(128, 102, 0, 0.5);
}
.close-btn:hover {
  background-color: rgb(255, 215, 0);
  color: #ed4014;
}
.custom-btn:hover {
  outline: 0px solid black;
  box-shadow: 2px 4px 4px rgba(128, 102, 0, 0.5);
}
.custom-font-style {
  font-family: 'YourCustomFont', sans-serif;
  font-size: 18px;
  color: #333;
}
</style>
