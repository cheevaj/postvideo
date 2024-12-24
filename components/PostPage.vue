<template>
  <div class="custom-font" style="background-color: rgb(239, 239, 239)">
    <v-card-text v-if="Add_Next" class="px-8 py-6">
      <br /><br />
      <h2 class="custom-font" style="text-decoration: underline">ຊື່ວີດີໂອ</h2>
      <h2>
        <Input
          v-model="localForm.title"
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
        v-model="localForm.des"
        :options="editorOptions"
        class="mt-2 custom-quill-editor"
        style="background-color: #ffff"
      ></quill-editor>
      <br /><br />
      <h2 class="custom-font" style="text-decoration: underline">ໂຫຼດຂໍ້ມູນ</h2>
      <v-card outlined class="px-8 py-4 mt-2 colo-with">
        <v-card-text style="background-color: rgb(248, 248, 248)">
          <v-row>
            <v-col cols="6" class="pb-0">
              <Upload
                v-if="!localForm.image"
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
                :before-upload="handleImageUpload"
              >
                <div style="padding: 10px 0">
                  <Icon
                    type="md-images"
                    size="52"
                    style="color: rgb(255, 215, 0)"
                  />
                  <p class="custom-font color-text-load">ໂຫຼດຮູບພາບໂປຣໄຟຣ</p>
                </div>
              </Upload>
              <Upload
                v-if="localForm.image"
                action="//jsonplaceholder.typicode.com/posts/"
                :before-upload="handleImageUpload"
              >
                <v-card class="text-center" flat style="width: 255px; height: 118px">
                  <v-img
                    v-if="active_img"
                    :src="playURL(localForm.image)"
                    style="
                      width: 245px;
                      height: 118px;
                      border-radius: 8px;
                      border: 1px solid rgb(166, 166, 166);
                    "
                  />
                  <v-img
                    v-else
                    :src="`https://apicenter.laotel.com:9443/tplussocial?img=${localForm.image}`"
                    style="
                      width: 245px;
                      height: 118px;
                      border-radius: 8px;
                      border: 1px solid rgb(166, 166, 166);
                    "
                  />
                  <p class="custom-font color-text-load">ໂຫຼດຮູບພາບໂປຣໄຟຣ</p>
                </v-card>
              </Upload>
            </v-col>
            <v-col cols="6" class="pb-0">
              <Upload
                v-if="!localForm.bkimage"
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
                  <p class="custom-font color-text-load">ໂຫຼດຮູບພາບພືນຫຼັງ</p>
                </div>
              </Upload>
              <Upload
                v-if="localForm.bkimage"
                action="//jsonplaceholder.typicode.com/posts/"
                :before-upload="handleImageUploadBK"
              >
                <v-card flat class="text-center" style="width: 255px; height: 118px">
                  <v-img
                    v-if="active_bkimage"
                    :src="playURL(localForm.bkimage)"
                    style="
                      width: 245px;
                      height: 118px;
                      border-radius: 8px;
                      border: 1px solid rgb(166, 166, 166);
                    "
                  />
                  <v-img
                    v-else
                    :src="`https://apicenter.laotel.com:9443/tplussocial?img=${localForm.bkimage}`"
                    style="
                      width: 245px;
                      height: 118px;
                      border-radius: 8px;
                      border: 1px solid rgb(166, 166, 166);
                    "
                  />
                  <p class="custom-font color-text-load">ໂຫຼດຮູບພາບພືນຫຼັງ</p>
                </v-card>
              </Upload>
            </v-col>
            <v-col cols="12" class="pa-0 pl-4">
              <p
                class="custom-font color-text-load"
                style="text-decoration: underline"
              >
                ໂຫຼດຮູບພາບລີວິວ
              </p>
            </v-col>
            <v-col
              v-for="(item, index) in imageview"
              :key="index"
              cols="2"
              class="pt-0"
            >
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                :before-upload="(file) => handleImageUpdate(index, file)"
              >
                <v-card flat style="width: 65px; height: 55px">
                  <v-img
                    :src="playURL(item)"
                    class="text-right"
                    style="
                      width: 65px;
                      height: 55px;
                      border-radius: 8px;
                      border: 1px solid rgb(166, 166, 166);
                    "
                  >
                    <div @click="deleteImageView(index)">
                      <v-icon class="custom-btn hover-pointer close-btn"
                        >mdi-close-circle</v-icon
                      >
                    </div>
                  </v-img>
                </v-card>
              </Upload>
            </v-col>
            <v-col cols="2" class="pt-0">
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                :before-upload="handleImageView"
              >
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
                >
                  <v-icon color="rgb(217, 217, 217)" size="42">mdi-plus</v-icon>
                </v-card>
              </Upload>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <br />
      <br />
      <h2 class="custom-font" style="text-decoration: underline">
        ຂໍ້ມູນຂອງວິດີໂອ
      </h2>
      <v-card-text class="pa-6 pb-6 mt-2 border-solis">
        <v-row>
          <v-col cols="6" class="pa-0">
            <v-card-actions class="pa-0">
              <v-spacer />
              <h3 class="custom-font" style="margin-left: 12px">ລາຄາ:</h3>
              &nbsp;
              <v-card flat width="200" class="pa-0 border-input">
                <Poptip trigger="focus">
                  <Input
                    v-model="localForm.price"
                    disabled
                    prefix="logo-usd"
                    type="number"
                    placeholder="ປ້ອມລາຄາ"
                    class="custom-font"
                    style="width: 200px"
                  />
                  <template #content>
                    <div class="custom-font">
                      {{ formatNumber(localForm.price) }}
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
                  v-model="localForm.type"
                  :placeholder="
                    Array.isArray(localForm.type) && localForm.type.length > 0
                      ? localForm.type.join(', ')
                      : 'ເລືອກປະເພດວີດີໂອ'
                  "
                  class="custom-font"
                  style="width: 200px;"
                >
                  <Option
                    v-for="(item, index) in filteredType"
                    :value="item.typeId"
                    :key="index"
                    class="custom-font mouse-hover-menu"
                    style="width: 150px; text-align: center;"
                  >
                    {{ item.name }}
                  </Option>
                  <v-divider style="width: 150px"></v-divider>
                  <v-btn
                    class="custom-font mouse-hover-menu py-1 my-1 px-1"
                    disabled
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
                    v-for="(item, index) in filteredType"
                    :key="index"
                    :value="item.typeId"
                    class="custom-font"
                    style="padding: 4px; margin: 0; margin-top: 2px"
                  >
                    {{ item.name }}
                  </v-card-text>
                </v-card>
              </div>
              <template #footer>
                <Button
                  size="large"
                  long
                  disabled
                  class="custom-font"
                  style="background-color: rgb(255, 215, 0); color: #ffff"
                  @click="addType"
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
                    v-model="localForm.reduced"
                    disabled
                    prefix="logo-usd"
                    type="number"
                    placeholder="ປ້ອມສ່ອນຫຼຸດ"
                    class="custom-font"
                    style="width: 200px"
                  />
                  <template #content>
                    <div class="custom-font">
                      {{ formatNumber(localForm.reduced) }}
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
                  v-model="localForm.category"
                  multiple
                  allow-create
                  :placeholder="
                    localForm.category.length > 0
                      ? localForm.category.join(',')
                      : 'ເລືອກໝອດໝູ່ວີດີໂອ'
                  "
                  class="custom-font"
                  style="width: 200px;"
                >
                  <Option
                    v-for="(item, index) in filteredCategory"
                    :value="item.cateId"
                    :key="index"
                    class="custom-font mouse-hover-menu"
                    style="width: 150px; text-align: center;"
                    >{{ item.name }}</Option
                  >
                  <v-divider style="width: 150px"></v-divider>
                  <v-btn
                    class="custom-font mouse-hover-menu py-1 my-1 px-1"
                    disabled
                    style="width: 150px; height: 100%"
                  >
                    <v-icon>mdi-plus-circle</v-icon>&nbsp;<span
                      class="custom-font"
                      >ເພີ່ມໝອດໝູ່ວີດີໂອ</span
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
      <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        max-width="300"
      >
        <v-card>
          <v-card-text
            class="txt-center d-flex flex-column align-center justify-center"
          >
            <br />
            <v-icon class="mb-2" size="38" color="rgb(255, 215, 0)"
              >mdi-alert-circle</v-icon
            >
            <h4 class="custom-font">ຕ້ອງການເພີ່ມວີດີໂອຕອນນີ້ ຫຼື ບໍ່?</h4>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-spacer></v-spacer>
            <v-btn
              height="30"
              text
              class="custom-font"
              style="color: #ff0000"
              @click="reSetValue"
            >
              <h4>close</h4>
            </v-btn>
            <v-btn
              height="30"
              text
              class="custom-font color-text custom-btn"
              style="background-color: rgb(255, 215, 0)"
              @click="AddValueVideo"
            >
              <h4>Next</h4>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn
        width="100%"
        height="50"
        class="custom-font color-text custom-btn"
        style="background-color: rgb(255, 215, 0)"
        @click="addVideo"
      > 
        <h2>ເພີ່ມ</h2>
      </v-btn>


      <v-btn
        width="100%"
        height="50"
        class="custom-font color-text custom-btn"
        style="background-color: rgb(255, 215, 0)"
        @click="dialog = true"
      > 
        <h2>Video</h2>
      </v-btn>

    </v-card-text>
    <v-card-text v-else class="px-3 py-0">
      <AddSeriesMovie v-if="(setStep === '504405213') || (setStep === 504405213)"/>
      <DetailVideo v-else/>
    </v-card-text>
  </div>
</template>
<script>

export default {
  name: 'PostPage',
  data() {
    return {
      value_p: 0,
      dialog: false,
      imageview: [],
      editType: false,
      loading: false,
      isHovered: false,
      itemsType: [],
      localForm: { ...this.$store.state.form, category: [], image:null, bkimage: null },
      category: [],
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
      dataVideo: {},
      typeofID:0,
    }
  },
  computed: {
    filteredCategory() {
      return this.category.filter((item) => item.languageId === this.category[1].languageId)
    },
    filteredType() {
      return this.itemsType.filter((item) => item.languageId === this.itemsType[1].languageId)
    },
    form() {
      return this.$store.state.form
    },
    active_img() {
      return this.$store.state.active_img
    },
    active_bkimage() {
      return this.$store.state.active_bkimage
    },
    active_video() {
      return this.$store.state.active_video
    },
    setStep() {
      return this.$store.state.stepAddVideo
    },
    Add_Next() {
    return this.setStep === 0;
  }
  },
  mounted() {
    this.localForm = { ...this.form, category: [], image:null, bkimage:null,  }
    this.dataResponseAll()
  },
  watch: {
    form: {
      immediate: true,
      handler(newForm) {
        this.localForm = { ...newForm, category: [], image:null, bkimage:null, }
      },
    },
  },
  methods: {
    async dataResponseAll() {
      const apiCalls = [
        this.$axios.post('http://172.28.17.102:2024/video/getallvideotype'),
        this.$axios.post('http://172.28.17.102:2024/video/getallvideocategory'),
      ]
      try {
        const responses = await Promise.all(apiCalls)
        const [videoType, videocategory] = responses
        this.itemsType = videoType.data.detail
        this.category = videocategory.data.detail
        // console.log(this.itemsType)
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
      this.localForm = { category: [], resolution:[] }
    },
    // handleMenuItemClick(id, title, image, des, price, type, bkimage) {
    //   // console.log(this.localForm)
    //   const updatedForm = {
    //     id,
    //     title,
    //     image,
    //     des,
    //     price,
    //     type,
    //     bkimage,
    //   }
    //   this.$store.commit('SET_FORM', updatedForm)
    // },
    handleImageUpload(image) {
      if (image && image.size > 0) {
        const updatedActive = true
        this.$store.commit('SET_ACTIVE_IMG', updatedActive)
        this.localForm.image = image
      }
      return false
    },
    handleImageUploadBK(image) {
      if (image && image.size > 0) {
        const updatedActive = true
        this.$store.commit('SET_ACTIVE_BKIMG', updatedActive)
        this.localForm.bkimage = image
      }
      return false
    },
    handleVideoUpload(video) {
      if (video && video.size > 0) {
        const updatedActive = true
        this.$store.commit('SET_ACTIVE_VIDEO', updatedActive)
        this.localForm.video = video
      }
      return false
    },
    handleImageView(file) {
      this.imageview.push(file);
      return false
    },
    handleImageUpdate(index, file) {
      this.$set(this.imageview, index, file)
      return false
    },
    deleteImageView(index) {
      const imageUrl = this.imageview[index]
      URL.revokeObjectURL(imageUrl)
      this.imageview.splice(index, 1)
    },
    playURL(file) {
      try {
        return URL.createObjectURL(file)
      } catch (e) {
        console.error('Error creating object URL:', e)
        return ''
      }
    },
    AddValueVideo() {
      const updatedForm = this.dataVideo
      console.log('Data-video::', updatedForm)
      this.$store.commit('SET_FORM', updatedForm);
      this.$store.commit('SET_STEP_ADD_VIDEO', this.typeofID);
      this.reSetValue();
      this.dialog = false
    },
    reSetValue() {
      this.localForm = {
        title: '',
        des: '',
        price: 0,
        type: '',
        bkimage: null,
        image: null,
        reduced: 0,
        resolution:[],
        category: [],
      }
      this.imageview = []
      this.dialog = false
    },
    async addVideo() {
      const { title, des, price, type, bkimage, image, reduced, category } =
        this.localForm;
        console.log(price , reduced)
      if (
        !title ||
        !des ||
        // !price ||
        !type ||
        !bkimage ||
        !image ||
        // !reduced ||
        !Array.isArray(category) ||
        !category.length
      ) {
        this.messageModal('error')
        return
      }
      const formData = new FormData()
      if (bkimage) {
        formData.append('bgImg', bkimage)
      }
      if (image) {
        formData.append('img', image)
      }
      if (this.imageview.length) {
        this.imageview.forEach((file) => {
          formData.append('previewImg', file)
        })
      }
      const videoData = JSON.stringify({
        name: title || '',
        description: des || '',
        // price: price || "",
        typeId: type || '',
        // reduced: reduced || "" 
      })
      formData.append('videoData', videoData)
      if (Array.isArray(category)) {
        const categoryAsStrings = category.map((cat) => String(cat))
        formData.append('videoCategoryInfo', JSON.stringify(categoryAsStrings))
      } else {
        console.error('Category is not an array:', category)
      }
      try {
        const response = await this.$axios.post(
          'http://172.28.17.102:2024/video/addvideo',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        const videoDetail = response.data.detail
        this.dataVideo = {
          id: videoDetail.videoId || '',
          title: videoDetail.videoName || '',
          des: des || '',
          type: type || '',
          image:image || null,

        }
        // console.log('valueE:', this.dataVideo);
        // console.log('valueE:', typeof(this.dataVideo.image));
        this.typeofID = type;
        this.deleteFrom();
        this.messageModal('success');
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
          type === 'success'
            ? 'ເພີ່ມຂໍ້ມູນວີດີໂອສໍາເລັດ.'
            : 'ເພີ່ມຂໍ້ມູນວີດີໂອບໍ່ສໍາເລັດ.'
        }<span>`,
      })
      if (type === 'error') {
        this.errorMessage()
      } else {
        this.dialog = true;
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
.custom-font-style {
  font-family: 'YourCustomFont', sans-serif;
  font-size: 18px;
  color: #333;
}

.custom-quill-editor .ql-container {
  font-family: 'YourCustomFont', sans-serif;
  font-size: 16px;
}

.custom-quill-editor .ql-toolbar {
  background-color: #f4f4f4;
}

.custom-quill-editor .ql-container.ql-snow {
  border: 1px solid #dcdcdc;
}

.custom-quill-editor .ql-editor {
  min-height: 200px;
  padding: 10px;
  background-color: #ffff;
}

.custom-quill-editor .ql-editor p {
  line-height: 1.6;
}
</style>
