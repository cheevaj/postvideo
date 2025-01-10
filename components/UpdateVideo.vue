<template>
  <div class="custom-font" style="background-color: rgb(239, 239, 239)">
    <v-card-text class="px-8 py-6">
      <br /><br />
      <h2 class="custom-font" style="text-decoration: underline">ຊື່ວີດີໂອ</h2>
      <h2>
        <Input
          v-model="localFormUpdate.title"
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
        v-model="localFormUpdate.des"
        :options="editorOptions"
        class="mt-2 custom-quill-editor"
        style="background-color: #ffff"
      ></quill-editor>
      <br /><br />
      <h2 class="custom-font" style="text-decoration: underline">ໂຫຼດຂໍ້ມູນ</h2>
      <v-card outlined class="px-8 py-4 mt-2 colo-with">
        <v-card-text
          class="py-7 px-6"
          style="background-color: rgb(248, 248, 248)"
        >
          <v-row>
            <v-col cols="6" class="pa-0">
              <v-card
                class="text-center"
                flat
                style="width: 255px; height: 145px"
              >
                <v-img
                  v-if="active_img"
                  :src="playURL(localFormUpdate.image)"
                  class="text-right"
                  style="
                    width: 245px;
                    height: 145px;
                    border-radius: 8px;
                    border: 1px solid rgb(166, 166, 166);
                  "
                >
                  <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    :before-upload="handleImageUpload"
                  >
                    <v-btn class="close-btn px-1" small>
                      ແກ້ໄຂ<span
                        ><v-icon size="12">mdi-pencil-outline</v-icon></span
                      >
                    </v-btn>
                  </Upload>
                </v-img>
                <v-img
                  v-else
                  :src="`https://apicenter.laotel.com:9443/tplussocial?img=${localFormUpdate.image}`"
                  class="text-right"
                  style="
                    width: 245px;
                    height: 145px;
                    border-radius: 8px;
                    border: 1px solid rgb(166, 166, 166);
                  "
                >
                  <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    :before-upload="handleImageUpload"
                  >
                    <v-btn class="close-btn px-1" small>
                      ແກ້ໄຂ<span
                        ><v-icon size="12">mdi-pencil-outline</v-icon></span
                      >
                    </v-btn>
                  </Upload>
                </v-img>
                <p class="custom-font color-text-load">ຮູບພາບໂປຣໄຟຣ</p>
              </v-card>
              <br />
              <br />
            </v-col>
            <v-col cols="6" class="pa-0">
              <v-card
                flat
                class="text-center"
                style="width: 255px; height: 145px"
              >
                <v-img
                  v-if="active_bkimage"
                  :src="playURL(localFormUpdate.bkimage)"
                  class="text-right"
                  style="
                    width: 245px;
                    height: 145px;
                    border-radius: 8px;
                    border: 1px solid rgb(166, 166, 166);
                  "
                >
                  <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    :before-upload="handleImageUploadBK"
                  >
                    <v-btn class="close-btn px-1" small>
                      ແກ້ໄຂ<span
                        ><v-icon size="12">mdi-pencil-outline</v-icon></span
                      >
                    </v-btn>
                  </Upload>
                </v-img>
                <v-img
                  v-else
                  :src="`https://apicenter.laotel.com:9443/tplussocial?img=${localFormUpdate.bkimage}`"
                  class="text-right"
                  style="
                    width: 245px;
                    height: 145px;
                    border-radius: 8px;
                    border: 1px solid rgb(166, 166, 166);
                  "
                >
                  <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    :before-upload="handleImageUploadBK"
                  >
                    <v-btn class="close-btn px-1" small>
                      ແກ້ໄຂ<span
                        ><v-icon size="12">mdi-pencil-outline</v-icon></span
                      >
                    </v-btn>
                  </Upload>
                </v-img>
                <p class="custom-font color-text-load">ຮູບພາບພືນຫຼັງ</p>
              </v-card>
              <br />
              <br />
            </v-col>
            <v-col cols="12" class="pa-0 mb-1">
              <h4
                class="custom-font color-text-load"
                style="text-decoration: underline"
              >
                ຮູບພາບລີວິວ
              </h4>
            </v-col>
            <v-col cols="12" v-if="imageview.length <= 0">
              <v-card
                flat
                class="d-flex justify-center align-center"
                style="width: 100%; height: 100px"
              >
                <div class="text-center">
                  <h5 style="color: #666666; font-style: italic">Image Null</h5>
                  <div v-if="newimageview.length <= 0">
                    <Upload
                      action="//jsonplaceholder.typicode.com/posts/"
                      :before-upload="handleImageViewNew"
                    >
                      <v-icon class="hover-pointer" color="#999999" size="45"
                        >mdi-plus-circle</v-icon
                      >
                    </Upload>
                  </div>
                </div>
              </v-card>
            </v-col>
            <v-card
              v-else
              flat
              class="rounded-0 pb-1"
              style="overflow-x: auto; display: flex; gap: 10px"
            >
              <div
                v-for="(item, index) in imageview"
                :key="index"
                style="height: 100px; width: 120px"
              >
                <v-img
                  v-if="item.Img"
                  :src="playURL(item.Img)"
                  class="text-right"
                  style="
                    border: 1px solid #a6a6a6;
                    border-radius: 8px;
                    height: 100px;
                    width: 120px;
                    flex: 0 0 auto;
                  "
                >
                  <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    :before-upload="(file) => handleImageView(file, index)"
                  >
                    <v-btn class="close-btn px-1" small>
                      ແກ້ໄຂ
                      <span>
                        <v-icon size="12">mdi-pencil-outline</v-icon>
                      </span>
                    </v-btn>
                  </Upload>
                </v-img>
                <v-img
                  v-else
                  :src="`https://apicenter.laotel.com:9443/tplussocial?img=${item.name}`"
                  class="text-right"
                  style="
                    border: 1px solid rgb(166, 166, 166);
                    border-radius: 8px;
                    height: 100px;
                    width: 120px;
                  "
                >
                  <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    :before-upload="(file) => handleImageView(file, index)"
                  >
                    <v-btn class="close-btn px-1" small>
                      ແກ້ໄຂ
                      <span>
                        <v-icon size="12">mdi-pencil-outline</v-icon>
                      </span>
                    </v-btn>
                  </Upload>
                </v-img>
              </div>
            </v-card>
            <div
              v-if="newimageview.length > 0 || imageview.length > 0"
              style="width: 100%"
            >
              <h4
                class="custom-font color-text-load mb-1"
                style="text-decoration: underline"
              >
                ຮູບພາບລີວິວໃໝ່
              </h4>
              <v-card
                flat
                width="100%"
                style="background-color: rgb(248, 248, 248)"
              >
                <v-card-actions class="pa-0" width="100%">
                  <v-card
                    flat
                    width="100%"
                    class="pa-1"
                    min-height="88"
                    style="overflow-x: auto; display: flex; gap: 10px"
                  >
                    <v-card-actions class="pa-0">
                      <v-card
                        v-for="(item, index) in newimageview"
                        :key="index"
                        flat
                        class="mx-1"
                        style="width: 81px; height: 81px"
                      >
                        <v-card flat style="width: 80px; height: 80px">
                          <v-img
                            :src="playURL(item)"
                            class="text-right"
                            style="
                              width: 100%;
                              height: 100%;
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
                      </v-card>
                    </v-card-actions>
                  </v-card>
                  <v-spacer />
                  <div
                    style="
                      width: 80px;
                      height: 100%;
                      background-color: rgb(248, 248, 248);
                    "
                    class="d-flex justify-center align-center pt-1"
                  >
                    <Upload
                      action="//jsonplaceholder.typicode.com/posts/"
                      :before-upload="handleImageViewNew"
                    >
                      <v-card
                        class="custom-btn hover-pointer"
                        height="55"
                        width="55"
                        style="
                          background-color: #ffff;
                          border: 1px solid #ffff;
                          border-radius: 18px;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        "
                      >
                        <v-icon color="rgb(217, 217, 217)" size="42"
                          >mdi-plus</v-icon
                        >
                      </v-card>
                    </Upload>
                  </div>
                </v-card-actions>
              </v-card>
            </div>
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
              <h3 class="custom-font">ປະເພດ:</h3>
              &nbsp;
              <v-card flat width="200" class="pa-0 border-input">
                <Select
                  v-model="localFormUpdate.type"
                  :placeholder="
                    Array.isArray(localFormUpdate.type) &&
                    localFormUpdate.type.length > 0
                      ? localFormUpdate.type.join(', ')
                      : 'ເລືອກປະເພດວີດີໂອ'
                  "
                  class="custom-font"
                  style="width: 200px"
                >
                  <Option
                    v-for="(item, index) in filteredType"
                    :value="item.typeId"
                    :key="index"
                    class="custom-font mouse-hover-menu"
                    style="width: 150px; text-align: center"
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
          <v-col cols="6" class="pa-0">
            <v-card-actions class="pa-0">
              <v-spacer />
              <h3 class="custom-font">ໝອດໝູ່:</h3>
              &nbsp;
              <v-card flat width="200" class="pa-0 border-input">
                <Select
                  v-model="localFormUpdate.category"
                  multiple
                  allow-create
                  :default-label="localFormUpdate.category"
                  :placeholder="
                    localFormUpdate.category.length > 0
                      ? localFormUpdate.category.join(',')
                      : 'ເລືອກໝອດໝູ່ວີດີໂອ'
                  "
                  class="custom-font"
                  style="width: 200px"
                >
                  <Option
                    v-for="(item, index) in filteredCategory"
                    :value="item.cateId"
                    :key="index"
                    class="custom-font mouse-hover-menu"
                    style="width: 150px; text-align: center"
                    >{{ item.name }}</Option
                  >
                </Select>
              </v-card>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card-text>
      <br />
      <br />
      <v-btn
        width="100%"
        height="50"
        class="custom-font color-text custom-btn"
        style="background-color: rgb(255, 215, 0)"
        @click="updateVideoForm"
      >
        <h2>ອັດເເດດຂໍ້ມູນ</h2>
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
      imageview: [],
      newimageview: [],
      editType: false,
      loading: false,
      isHovered: false,
      itemsType: [],
      localFormUpdate: { ...this.$store.state.form },
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
      typeofID: 0,
    }
  },
  created() {
    const previewImg = this.$store.state.form.previewImg || []
    this.imageview = previewImg.map((img, index) => ({
      name: img || '',
      Img: null,
      index,
    }))
  },
  computed: {
    filteredCategory() {
      return this.category.filter(
        (item) => item.languageId === this.category[1].languageId
      )
    },
    filteredType() {
      return this.itemsType.filter(
        (item) => item.languageId === this.itemsType[1].languageId
      )
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
  },
  mounted() {
    this.localFormUpdate = { ...this.form }
    this.dataResponseAll()
  },
  watch: {
    form: {
      immediate: true,
      handler(newForm) {
        this.localFormUpdate = { ...newForm }
      },
    },
  },
  methods: {
    async dataResponseAll() {
      console.log('Form-Update:', this.form)
      console.log('Update::', this.localFormUpdate.category)
      const apiCalls = [
        this.$axios.post('http://172.28.17.102:2024/video/getallvideotype'),
        this.$axios.post('http://172.28.17.102:2024/video/getallvideocategory'),
      ]
      try {
        const responses = await Promise.all(apiCalls)
        const [videoType, videocategory] = responses
        this.itemsType = videoType.data.detail
        this.category = videocategory.data.detail
        console.log(this.category)
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
    handleMenuItemClick(id, title, image, des, price, type, bkimage) {
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
    handleImageUpload(image) {
      if (image && image.size > 0) {
        const updatedActive = true
        this.$store.commit('SET_ACTIVE_IMG', updatedActive)
        this.localFormUpdate.image = image
      }
      return false
    },
    handleImageUploadBK(image) {
      if (image && image.size > 0) {
        const updatedActive = true
        this.$store.commit('SET_ACTIVE_BKIMG', updatedActive)
        this.localFormUpdate.bkimage = image
      }
      return false
    },
    handleVideoUpload(video) {
      if (video && video.size > 0) {
        const updatedActive = true
        this.$store.commit('SET_ACTIVE_VIDEO', updatedActive)
        this.localFormUpdate.video = video
      }
      return false
    },
    handleImageView(file, index) {
      if (file && index !== undefined && index !== null) {
        this.$set(this.imageview[index], 'Img', file)
      } else {
        console.warn('Invalid file or index:', { file, index })
      }
      return false
    },
    handleImageViewNew(file) {
      this.newimageview.push(file)
      return false
    },
    handleImageUpdateNew(index, file) {
      this.$set(this.newimageview, index, file)
      return false
    },
    deleteImageView(index) {
      const imageUrl = this.newimageview[index]
      URL.revokeObjectURL(imageUrl)
      this.newimageview.splice(index, 1)
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
      this.$store.commit('SET_FORM', updatedForm)
      this.$store.commit('SET_STEP_ADD_VIDEO', this.typeofID)
      this.reSetValue()
    },
    reSetValue() {
      this.localFormUpdate = {
        title: '',
        des: '',
        price: 0,
        type: '',
        bkimage: null,
        image: null,
        reduced: 0,
        category: [],
      }
      this.imageview = []
    },
    async updateVideoForm() {
      console.log('Update - 1 ::', this.localFormUpdate)
      console.log('Form::', this.form)
      console.log('viewVideo::', this.imageview)
      const { id, title, des, type, bkimage, image, category } =
        this.localFormUpdate
      if (
        !id ||
        !title ||
        !des ||
        !type ||
        !bkimage ||
        !image ||
        !Array.isArray(category) ||
        !category.length
      ) {
        return this.messageModal('error')
      }
      const formData = new FormData()
      // if (category.length > 0) {
      //   formData.append('cateId', category)
      // }
      if (id) {
        formData.append('videoId', id)
      }
      if (typeof bkimage === 'string') {
        formData.append('bgImg', '')
      } else {
        formData.append('oldBgImg', this.form.bkimage)
        formData.append('bgImg', bkimage)
      }
      if (typeof image === 'string') {
        formData.append('img', '')
      } else {
        formData.append('oldImg', this.form.image)
        formData.append('img', image)
      }
      if (Array.isArray(this.imageview)) {
        const validImageViews = this.imageview
          .filter((file) => file.Img !== null)
          .map((file) => ({
            oldPreviewImg: file.name,
            previewImg: file.Img,
          }))
        const oldPreviewImgs = validImageViews.map((file) => file.oldPreviewImg)
        formData.append('oldpreviewImg', JSON.stringify(oldPreviewImgs))
        validImageViews.forEach((file) => {
          formData.append('previewImg', file.previewImg)
        })
      }
      const videoData = JSON.stringify({
        name: title || '',
        description: des || '',
        typeId: type || '',
      })
      formData.append('videoData', videoData)
      if (Array.isArray(category)) {
        const categoryAsStrings = category.map((cat) => Number(cat))
        formData.append('cateId', JSON.stringify(categoryAsStrings))
      } else {
        console.error('Category is not an array:', category)
      }
      // if (this.localFormUpdate !== null) {
      //   this.$store.commit('SET_STEP_RightDrawer', false);
      //   return
      // }
      try {
        const response = await this.$axios.post(
          'http://172.28.17.102:2024/video/updatevideo',
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
          image: image || null,
        }
        this.typeofID = type
        if (this.newimageview.length > 0) {
          const formData = new FormData()
          formData.append('videoId', id)
          this.newimageview.forEach((file) => {
            formData.append('previewImg', file)
          })
          const responseView = await this.$axios.post(
            'http://172.28.17.102:2024/video/addMoreDetail',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          )
          console.log('Additional details added successfully:', responseView)
        }
        this.$store.commit('SET_STEP_RightDrawer', false);
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
.custom-btn:hover {
  outline: 0px solid black;
  box-shadow: 2px 4px 4px rgba(128, 102, 0, 0.5);
}
.close-btn {
  border-top-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border: 0px solid rgb(255, 255, 255);
  background-color: #ffff;
}
.close-btn:hover {
  background-color: rgb(255, 200, 0);
  color: #000;
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
