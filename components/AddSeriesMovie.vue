<template>
  <div class="custom-font" style="background-color: rgb(239, 239, 239)">
    <br />
    <br />
    <v-card-text v-if="e1 === 1" class="px-4 pb-0">
      <h3 class="px-3 custom-font">{{ form.title }}</h3>
      <v-card flat class="mx-3 my-4">
        <v-img
          width="100%"
          height="250px"
          :src="isFile(form.image) ? playURL(form.image) : `https://apicenter.laotel.com:9443/tplussocial?img=${form.image || ''}`"
        />
      </v-card>
    </v-card-text>
    <v-card-text class="px-0 py-0" style="padding: 12px">
      <v-stepper
      v-model="e1"
      flat
      class="px-4 py-0"
      style="background-color: transparent"
      >
      <v-stepper-items class="pa-0">
          <br />
          <v-stepper-content step="1" class="pa-0">
            <h3 class="custom-font px-3">ຕອນຂອງຊີລີ່</h3>
            <v-card outlined class="pa-2 custom-margin text-center" min-height="210px" style="background-color: rgb(248, 248, 248);">
              <v-card-text class="pa-2">
                <v-row>
                  <v-col
                    cols="3"
                    v-for="(items, index) in epOfSeries"
                    :key="index"
                    class="px-1 py-2"
                  >
                    <v-card
                      outlined
                      class="custom-btn hover-pointer"
                      height="80px"
                      width="100%"
                      @click="nextStep(3, items)"
                    >
                      <v-img
                        width="100%"
                        height="100%"
                        class="text-center"
                        :src="`https://apicenter.laotel.com:9443/tplussocial?img=${
                          items.img || ''
                        }`"
                        :gradient="items.VideoSeriesQualityInfo.length > 0 ? null : 'to top right, rgba(225,225,225,0.7), rgba(225,225,225,0.7)'"
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        "
                      >
                        <v-icon
                          size="32"
                          color="#ffcc00"
                          style="
                            background-color: rgba(13, 13, 13, 0.8);
                            border-radius: 50%;
                            padding: 0px;
                          "
                        >
                          {{
                            items.VideoSeriesQualityInfo.length > 0
                              ? 'mdi-play'
                              : 'mdi-download'
                          }}
                        </v-icon>
                        <v-card
                          flat
                          class="text-center px-2"
                          style="
                            position: absolute;
                            right: 2px;
                            bottom: 2px;
                            color: #000;
                            border-radius: 2px;
                          "
                        >
                          EP.{{ items.name }}
                        </v-card>
                      </v-img>
                    </v-card>
                  </v-col>
                  <v-col v-if="epOfSeries.length <= 0" cols="3" class="px-1 py-2" style="
                          border-radius: 18px;
                          margin-top: 0px;
                          display: flex;
                          align-items: center;
                        ">
                      <v-card
                        class="custom-btn hover-pointer"
                        height="55"
                        width="55"
                        style="
                          background-color: #ffff;
                          border: 1px solid #ffff;
                          border-radius: 18px;
                          margin-top: 0px;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        "
                        @click="nextStep(2, 0)"
                      >
                        <v-icon color="rgb(128, 128, 128)" size="32">mdi-movie-open-plus</v-icon>
                      </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
              <h2 v-if="epOfSeries.length <= 0" class="custom-font" style="color: #a6a6a6;">ຍັງບໍ່ມີວີດີໂອ</h2>
            </v-card>
            <v-card-actions>
              <v-spacer />
              <v-btn
                v-if="epOfSeries.length > 0"
                class="custom-btn"
                style="background-color: rgb(255, 215, 0); color: #ffff"
                @click="nextStep(2, 0)"
              >
                <v-icon size="18">mdi-plus</v-icon>ເພີ່ມ Ep
              </v-btn>
            </v-card-actions>
          </v-stepper-content>
          <v-stepper-content step="2" class="pa-0">
            <v-card-text class="py-2 px-3">
              <div class="px-0">
                <br />
                <h2 class="custom-font" style="text-decoration: underline">
                  ຊື່ວີດີໂອ ຫຼື ຕອນຂອງຊີລີ່
                </h2>
                <h2>
                  <Input
                    v-model="newForm.name"
                    size="large"
                    placeholder="ຊື່ວີດີໂອ..."
                    clearable
                    class="mt-2 custom-font"
                  />
                </h2>
                <br /><br />
                <h2 class="custom-font" style="text-decoration: underline">
                  ລາຍລະອຽດວີດີໂອ
                </h2>
                <quill-editor
                  v-model="newForm.des"
                  :options="editorOptions"
                  class="mt-2 custom-quill-editor"
                  style="background-color: #ffff"
                ></quill-editor>
              </div>
              <br /><br />
              <h2 class="custom-font" style="text-decoration: underline">
                ໂຫຼດຂໍ້ມູນ
              </h2>
              <v-card outlined class="pa-4 mt-2 colo-with">
                <Upload
                  v-if="newForm.image"
                  action="//jsonplaceholder.typicode.com/posts/"
                  :before-upload="handleImageUpload"
                >
                  <v-card
                    flat
                    style="width: 560px; height: 310px; border-radius: 8px"
                  >
                    <v-img
                      :src="playURL(newForm.image)"
                      style="
                        width: 100%;
                        height: 310px;
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
                  style="
                    background-color: #ffff;
                    width: 100%;
                    border-radius: 8px;
                  "
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
                        <p class="custom-font color-text-load">ໂຫຼດຮູບພາບ</p>
                      </div>
                    </Upload>
                  </div>
                </v-card-text>
              </v-card>
              <br />
              <br />
              <v-card-actions class="px-3">
                <v-spacer></v-spacer>
                <v-btn
                  height="40"
                  text
                  class="custom-font color-text custom-btn"
                  style="background-color: #ff0000"
                  @click="resetValue"
                >
                  <h2>ຍົກເລີກ</h2>
                </v-btn>
                <v-btn
                  height="40"
                  text
                  class="custom-font color-text custom-btn"
                  style="background-color: rgb(255, 215, 0)"
                  @click="addEpOfSeries"
                >
                  <h2>ເພີ່ມ</h2>
                </v-btn>
              </v-card-actions>
              <br />
            </v-card-text>
          </v-stepper-content>
          <v-stepper-content step="3" class="pa-0">
            <v-card-text class="pa-2">
              <h2
                class="px-3 mt-2 custom-font"
                style="text-decoration: underline"
              >
                {{ 'ຊື່ວີດີໂອ' }}
              </h2>
              <v-card outlined class="pa-2 custom-margin">
                <v-card-text class="py-1 px-0">
                  <h3>{{ epSVideoId.name }}</h3>
                </v-card-text>
              </v-card>
              <br />
              <h2 class="px-3 custom-font" style="text-decoration: underline">
                {{ 'ລາຍລະອຽດ' }}
              </h2>
              <v-card outlined class="pa-2 custom-margin" min-height="120px">
                <v-card-text class="pa-0">
                  <div v-html="epSVideoId.description"></div>
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
                      style="
                        background-color: #ffff;
                        width: 100%;
                        border-radius: 8px;
                      "
                    >
                      <div class="pa-4">
                        <Upload
                          type="drag"
                          action="//jsonplaceholder.typicode.com/posts/"
                          style="width: 240px; height: 120px"
                          :before-upload="handleVideoUpload"
                        >
                          <div style="padding: 10px 0px; height: 120px">
                            <Icon
                              type="ios-videocam"
                              size="52"
                              style="color: rgb(255, 215, 0)"
                            />
                            <p class="custom-font color-text-load">
                              ໂຫຼດວີດີໂອ
                            </p>
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
                          class="custom-font mouse-hover-menu"
                          style="width: 150px"
                        >
                          {{ item.quality }}
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
                      style="
                        background-color: #ffff;
                        width: 100%;
                        border-radius: 8px;
                      "
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
                            <p class="custom-font color-text-load">
                              ໂຫຼດຮູບພາບ
                            </p>
                          </div>
                        </Upload>
                      </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card-text>
              <br />
              <v-card-actions class="px-3">
                <v-spacer></v-spacer>
                <v-btn
                  height="40"
                  text
                  class="custom-font color-text custom-btn"
                  style="background-color: #ff0000"
                  @click="resetValue"
                >
                  <h2>ຍົກເລີກ</h2>
                </v-btn>
                <v-btn
                  height="40"
                  text
                  class="custom-font color-text custom-btn"
                  style="background-color: rgb(255, 215, 0)"
                  @click="addVideoSeries"
                >
                  <h2>ເພີ່ມ</h2>
                </v-btn>
              </v-card-actions>
              <br />
            </v-card-text>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card-text>
  </div>
</template>
<script>
export default {
  name: 'ViewPage',
  data() {
    return {
      newForm: { image: null, resolution: 0, video: null },
      e1: 1,
      editorOptions: {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
          ],
        },
      },
      epSVideoId: {},
      epOfSeries: [],
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
    isFile(value) {
      return value instanceof File;
    },
    nextStep(value, SVideoId) {
      if(value === 3){
        if(SVideoId.VideoSeriesQualityInfo.length > 0){
          this.messageModal('success');
        }
        else {
          this.e1 = this.e1 === 3 ? 1 : value
          this.epSVideoId = SVideoId === 0 ? {} : SVideoId
        }
      }
      else {
        this.e1 = this.e1 === 3 ? 1 : value
        this.epSVideoId = SVideoId === 0 ? {} : SVideoId
      }
      console.log('SrID:', this.epSVideoId)
    },
    async getData() {
      // console.log('Video ID', this.form)
      const id = this.form.id
      const apiCalls = [
        this.$axios.post('http://172.28.17.102:2024/video/getallvideoquality'),
        this.$axios.post('http://172.28.17.102:2024/video/getallvideoseries', {
          videoId: id,
        }),
      ]
      try {
        const responses = await Promise.all(apiCalls)
        const [resolution, EPvideo] = responses
        this.resolution = resolution.data.detail || []
        this.epOfSeries = EPvideo.data.detail || []
        console.log(this.epOfSeries)
      } catch (error) {
        if (error.response) {
          console.error('Error response:', error.response.data)
        } else if (error.request) {
          console.error('No response from server:', error.request)
        } else {
          console.error('Error:', error.message)
        }
      }
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
        price: 0,
        type: '',
        bkimage: null,
        image: null,
        reduced: 0,
        category: [],
      }
      this.$store.commit('SET_FORM', updatedForm)
    },
    async addVideoSeries() {
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
        // this.resetValue();
      } catch (error) {
        console.error(
          'Error fetching data:',
          error.response ? error.response.data : error.message
        )
      }
    },
    async addEpOfSeries() {
      console.log('DTA:', this.newForm)
      const { name, des, image } = this.newForm
      console.log('data:', name, des, image)
      const id = this.form.id
      const formData = new FormData()
      if (image) {
        formData.append('img', image)
      }
      const videoData = JSON.stringify({
        videoId: id || '',
        name: name || '',
        description: des || '',
      })
      formData.append('videoData', videoData)
      try {
        const response = await this.$axios.post(
          'http://172.28.17.102:2024/video/addseriesdetail',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        console.log('Data response Series:', response)
        this.messageModal('success')
        this.resetValue()
      } catch (error) {
        console.error(
          'Error fetching data:',
          error.response ? error.response.data : error.message
        )
      }
    },
    resetValue() {
      this.newForm = { image: null, resolution: 0, video: null }
      this.nextStep(1, {})
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
      } else {
        this.getData()
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

.custom-btn:hover {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease;
  outline: 2px solid rgb(179, 179, 0);
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
.update-btn {
  background-color: transparent;
  color: #ffff;
}
.update-btn:hover {
  background-color: rgb(255, 215, 0);
  color: #ffff;
}
.custom-btn:hover {
  outline: 0px solid black;
  box-shadow: 2px 4px 4px rgba(128, 102, 0, 0.5);
}
/* .custom-font-style {
  font-family: 'YourCustomFont', sans-serif;
  font-size: 18px;
  color: #333;
} */
</style>
