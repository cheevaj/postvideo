<template>
  <div style="background-color: rgb(239, 239, 239)">
    <v-overlay :value="rightDrawer" />
    <v-navigation-drawer
      v-model="rightDrawer"
      right
      fixed
      width="650"
      class="table-container"
      style="background-color: rgb(242, 242, 242)"
      @click.stop
    >
      <v-card
        outlined
        class="py-0 px-3 rounded-0"
        style="position: fixed; z-index: 100; width: 100%"
      >
        <v-card-actions class="pa-0">
          <v-icon class="color-hover" @click="closePost"> mdi-close </v-icon>
          <v-card-title
            v-if="SeriesMovie === 504405213"
            class="custom-font py-1"
            >ເພີ່ມຂໍ້ມູນຊີລີ່</v-card-title
          >
          <v-card-title v-else class="custom-font py-1">{{
            active
              ? 'ເພີ່ມຂໍ້ມູນວີດີໂອ'
              : dialogPage === 0
              ? 'ເພີ່ມວີດີໂອ'
              : 'ເເກ້ໄຂ້ຂໍ້ມູນ'
          }}</v-card-title>
        </v-card-actions>
      </v-card>
      <AddSeriesMovie v-if="dialogPage === 0 && SeriesMovie === 504405213" />
      <DetailVideo v-else-if="dialogPage === 0 && !SeriesMovie !== 504405213" />
      <PostPage v-else />
    </v-navigation-drawer>
    <v-dialog
      v-model="select"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card class="rounded-0">
        <v-card-actions class="py-1 px-2 BK-color">
          <v-spacer></v-spacer>
          <h2 class="custom-font">ລາຍລະອຽດວີດີໂອ</h2>
          <v-spacer></v-spacer>
          <v-btn fab outlined x-small @click="closePost"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-actions>
        <v-card-text class="pa-0">
          <!-- <DetailVideo v-if="dialogPage === 0" /> -->
          <ViewPage v-if="dialogPage === 9" />
        </v-card-text>
      </v-card>
    </v-dialog>
    <Modal
      v-model="modal"
      draggable
      scrollable
      :mask-closable="false"
      width="340"
      style="padding: 0px"
    >
      <template #header>
        <v-card-actions
          style="color: rgb(255, 215, 0); text-align: center; padding: 2px"
        >
          <v-spacer />
          <h3 class="custom-font">
            {{
              modalactive
                ? 'ທ່ານຕ້ອງການປິດຂາຍວີດີໂອນີ້ ຫຼື ບໍ?'
                : 'ທ່ານຕ້ອງການລົບວີດີໂອນີ້ ຫຼື ບໍ?'
            }}
          </h3>
          <v-spacer />
        </v-card-actions>
      </template>
      <div>
        <div style="text-align: center">
          <v-card
            flat
            class="table-container"
            style="
              height: 50px;
              z-index: 100;
              margin-top: 2px;
              overflow-y: auto;
            "
          >
            <p v-if="modalactive" class="custom-font">
              ຖ້າທ່ານປິດວີດີໂອ, ຜູ້ໃຊ້ງານຄົນອື່ນໆຈະບໍ່ເຫັນ ເເລະ
              ບໍ່ສາມາດຊື່ວີດີໂອນີ້ໄດ້. ທ່ານຕ້ອງການປິດຂາຍ ຫຼື ບໍ?
            </p>
            <p v-else class="custom-font">
              ຖ້າທ່ານລົບວີດີໂອ,
              ຂໍ້ມູນທັງໝົດຂອງວີດີໂອນີ້ຈະຖືກລົບອອກຈາກຖານຂໍ້ມູນ<span
                style="color: #ff3300"
                >!</span
              >. ທ່ານຕ້ອງການລົບວີດີໂອນີ້ ຫຼື ບໍ?
            </p>
          </v-card>
        </div>
      </div>
      <template #footer>
        <Button
          v-if="modalactive"
          size="large"
          long
          style="background-color: #ff3300; color: #ffff"
          @click="activeVideo(idVideo)"
        >
          <v-icon color="#ffff">{{ 'mdi-play-box-lock-outline' }}</v-icon
          >&nbsp;
          <span class="custom-font">{{ 'ປິດຂາຍວີດີໂອ' }}</span>
        </Button>
        <Button
          v-else
          size="large"
          long
          style="background-color: #ff3300; color: #ffff"
          @click="deleteVideo(idVideo)"
        >
          <v-icon color="#ffff">mdi-delete-empty</v-icon>&nbsp;
          <span class="custom-font">ລົບວີດີໂອ</span>
        </Button>
      </template>
    </Modal>
    <v-card-text class="ma-0 py-8 px-12">
      <h1 class="custom-font my-4">ໂພດ</h1>
      <v-row>
        <v-col>
          <v-card flat class="pa-4" style="border-radius: 15px">
            <v-card-actions>
              <div style="display: flex">
                <form>
                  <Input
                    class="custom-font"
                    v-model="search"
                    size="large"
                    suffix="ios-search"
                    placeholder="ກະລຸນາປ້ອມຊື່"
                    style="width: 350px; height: 35px; margin-top: 1px"
                  />
                </form>
                <v-btn
                  :loading="loading"
                  small
                  text
                  class="BK-color"
                  style="
                    height: 40px;
                    color: #000;
                    margin-top: 1px;
                    margin-left: 1px;
                    padding-left: 4px;
                    padding-right: 4px;
                  "
                >
                  <h3 class="custom-font color-text">{{ 'ຄົ້ນຫາ' }}</h3>
                </v-btn>
              </div>
              <v-spacer />
              <v-btn
                class="custom-font BK-color color-text"
                :outlined="!isHovered"
                style="background-color: rgb(255, 215, 0)"
                @mouseover="isHovered = true"
                @mouseleave="isHovered = false"
                @click.stop="addVideo"
              >
                <v-icon>mdi-plus</v-icon>
                ເພີ່ມວີດີໂອ
              </v-btn>
            </v-card-actions>
            <div style="margin: 8px; height: 620px">
              <Tabs type="card" v-model="tabItem" class="custom-font">
                <TabPane
                  v-for="(itemType, id) in filteredType"
                  :key="id"
                  :label="itemType.name"
                  class="custom-font"
                >
                  <div class="pt-2">
                    <div
                      v-for="(item_video, index) in paginatedVideos"
                      :key="index"
                    >
                      <div v-if="tabItem === id">
                        <v-card-text class="pt-2 pb-2 pl-0 pr-3">
                          <v-row>
                            <v-col cols="2">
                              <v-card
                                flat
                                height="85"
                                class="hover-pointer"
                                @click="
                                  selectMenu(false, 9, {
                                    id: item_video.videoId,
                                    title: item_video.name,
                                    image: item_video.img,
                                    des: item_video.description,
                                    price: item_video.price,
                                    type: item_video.typeId,
                                    bkimage: item_video.bgImg,
                                    video:
                                      item_video.videoQualityinfodata ||
                                      videoSeriesData,
                                    time: item_video.time,
                                    resolution: item_video.resolution,
                                  })
                                "
                              >
                                <v-img
                                  width="100%"
                                  height="100%"
                                  class="text-center"
                                  :src="`https://apicenter.laotel.com:9443/tplussocial?img=${
                                    item_video.videoQualityinfodata.length > 0
                                      ? item_video.videoQualityinfodata[0]
                                          ?.thumbnail
                                      : item_video.img
                                  }`"
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
                                      item_video.videoQualityinfodata?.length >
                                        0 ||
                                      item_video.videoSeriesData?.length > 0
                                        ? 'mdi-play'
                                        : 'mdi-download'
                                    }}
                                  </v-icon>
                                  <span
                                    class="pr-2"
                                    style="
                                      position: absolute;
                                      right: 2px;
                                      bottom: 2px;
                                      color: #fff;
                                    "
                                  >
                                    {{ item_video.time }}
                                  </span>
                                </v-img>
                              </v-card>
                            </v-col>
                            <v-col cols="8" class="px-1">
                              <v-card flat height="85" class="rounded-0">
                                <h3 class="py-1 px-0">
                                  <span
                                    class="custom-font hover-pointer"
                                    @click="
                                      selectMenu(false, 9, {
                                        id: item_video.videoId,
                                        title: item_video.name,
                                        image: item_video.img,
                                        des: item_video.description,
                                        price: item_video.price,
                                        type: item_video.typeId,
                                        bkimage: item_video.bgImg,
                                        video:
                                          item_video.videoQualityinfodata ||
                                          videoSeriesData,
                                        time: item_video.time,
                                        resolution: item_video.resolution,
                                      })
                                    "
                                  >
                                    {{ item_video.name }}
                                  </span>
                                </h3>
                                <v-card-text class="pa-0 custom-font">
                                  <span
                                    class="custom-font hover-pointer"
                                    @click="
                                      selectMenu(false, 9, {
                                        id: item_video.videoId,
                                        title: item_video.name,
                                        image: item_video.img,
                                        des: item_video.description,
                                        price: item_video.price,
                                        type: item_video.typeId,
                                        bkimage: item_video.bgImg,
                                        video:
                                          item_video.videoQualityinfodata ||
                                          item_video.videoSeriesData,
                                        time: item_video.time,
                                        resolution: item_video.resolution,
                                      })
                                    "
                                  >
                                  <div v-html="truncatedDescription(item_video.description)"></div>
                                  </span>
                                </v-card-text>
                              </v-card>
                            </v-col>
                            <!-- <v-col cols="1"   class="pl-0">
                              <v-card flat height="85" style="align-items: center; justify-content: center; padding-top: 25px;">
                                <v-btn text style="background-color: rgb(51, 204, 51); color: #ffff; border-radius: 10px;">Active</v-btn>
                              </v-card>
                            </v-col> -->
                            <v-col cols="2" class="py-0 pr-0">
                              <v-card
                                flat
                                height="85"
                                class="text-right mt-2 p"
                              >
                                <v-menu
                                  v-model="menu[index]"
                                  :close-on-content-click="false"
                                  offset-y
                                  nudge-right="45"
                                  @click:outside="menu[index] = false"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      fab
                                      small
                                      text
                                      class="pa-0"
                                      v-bind="attrs"
                                      v-on="on"
                                    >
                                      <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                  </template>
                                  <v-card
                                    width="150"
                                    class="outlined-border color-grad-background"
                                  >
                                    <h4
                                      class="custom-font text-left pa-2 color-grad-background"
                                    >
                                      ຈັດການ
                                    </h4>
                                    <v-list
                                      class="pa-0 text-center"
                                      style="border-radius: 8px"
                                    >
                                      <v-list-item
                                        v-for="(
                                          item_menu, item_index
                                        ) in itemsMenu"
                                        :key="item_index"
                                        @click="
                                          selectMenu(false, item_index, {
                                            id: item_video.videoId,
                                            title: item_video.name,
                                            image: item_video.img,
                                            des: item_video.description,
                                            price: item_video.price,
                                            type: item_video.typeId,
                                            bkimage: item_video.bgImg,
                                            video:
                                              item_video.videoQualityinfodata ||
                                              videoSeriesData,
                                            time: item_video.time,
                                            resolution: item_video.resolution,
                                          })
                                          menu[index] = false
                                        "
                                        class="custom-font mouse-hover-menu"
                                      >
                                        <v-list-item-content>
                                          <v-card-actions class="pa-0">
                                            <v-icon>{{ item_menu.icon }}</v-icon
                                            >&nbsp;&nbsp;{{ item_menu.title }}
                                          </v-card-actions>
                                        </v-list-item-content>
                                      </v-list-item>
                                    </v-list>
                                  </v-card>
                                </v-menu>
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                      </div>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
              <v-card-actions
                class="pa-0"
                style="position: absolute; bottom: 18px; right: 25px"
              >
                <ShowPage :total="NumberPage" @updatePage="handlePageUpdate" />
                <v-icon outlined class="custom-button" size="32" @click="() => { NumberPage <= 125 ? NumberPage += 5 : NumberPage }">mdi-plus</v-icon>
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  Currency: 'DefaultLayout',
  name: 'IndexPage',
  data() {
    return {
      currentPage: 1,
      tabItem: 0,
      NumberPage:25,
      modal: false,
      modalactive: false,
      select: false,
      dialogPage: -1,
      loading: false,
      SeriesMovie: 0,
      search: '',
      idVideo: '',
      name: '',
      rightDrawer: false,
      isHovered: false,
      video: [],
      tabs: [],
      menu: [false, false, false],
      itemsMenu: [
        { title: 'ລາຍລະອຽດ', icon: 'mdi-movie-open-plus' },
        { title: 'ເເກ້ໄຂ', icon: 'mdi-movie-edit' },
        { title: 'ປິດຂາຍ', icon: 'mdi-movie-off' },
        { title: 'ລົບວີດີໂອ', icon: 'mdi-delete' },
        // { title: 'ເພີ່ມວີດີໂອ', icon: 'mdi-movie-open-plus' },
      ],
      videoGroupedByType: {},
      pageVideo: [],
    }
  },
  computed: {
    active() {
      return this.$store.state.active
    },
    filteredType() {
      return this.tabs.filter((item) => item.languageId === '1002')
    },
    paginatedVideos() {
      const endIndex = (this.currentPage * 5);
      const startIndex = endIndex - 5;
      console.log('Start:',startIndex ,'End:',endIndex);
      return this.video[this.tabItem]?.videos?.videoData.slice(startIndex, endIndex) || [];
    },
    truncatedDescription() {
      return (description) => description.length > 25 
        ? `${description.slice(0, 25)}...` 
        : description;
    }
  },
  mounted() {
    this.filterMoviesByType()
  },
  methods: {
    addVideo() {
      this.handleMenuItemClick(true)
      this.rightDrawer = true
    },
    // openAdd(){
    //   this.select = false;
    //   this.rightDrawer = true;
    //   this.dialogPage = 0;
    //   this.SeriesMovie = 504405213;
    // },
    selectMenu(active, menu, videoDetails) {
      const {
        id,
        title,
        image,
        des,
        price,
        type,
        bkimage,
        video,
        time,
        resolution,
      } = videoDetails
      if (menu === 0) {
        this.SeriesMovie = type
        this.name = title
        console.log(type)
        this.handleMenuItemClick(
          active,
          id,
          title,
          image,
          des,
          price,
          type,
          bkimage,
          video,
          time,
          resolution
        )
        this.select = false
        this.rightDrawer = true
      } else if (menu === 1) {
        this.handleMenuItemClick(
          active,
          id,
          title,
          image,
          des,
          price,
          type,
          bkimage,
          video,
          time,
          resolution
        )
        this.rightDrawer = true
      } else if (menu === 2) {
        this.idVideo = id
        this.modalactive = true
        this.modal = true
        // console.log(id);
        this.rightDrawer = false
      } else if (menu === 3) {
        this.idVideo = id
        this.modalactive = false
        this.modal = true
        this.rightDrawer = false
      } else if (menu === 9) {
        if(menu === 9){
          return this.messageModal('error', 'ຍັງບໍ່ສາມາດເບີ່ງວີດີໂອໄດ້.');
        }
        else {
          this.handleMenuItemClick(
            active,
            id,
            title,
            image,
            des,
            price,
            type,
            bkimage,
            video,
            time,
            resolution
          )
          this.select = true
          this.rightDrawer = false
        }
      } else {
        this.closePost()
      }
      this.dialogPage = this.dialogPage === menu ? -1 : menu
    },
    closePost() {
      this.handleMenuItemClick(true)
      this.filterMoviesByType()
      this.dialogPage = -1
      this.select = false
      this.rightDrawer = false
      this.$store.commit('SET_STEP_ADD_VIDEO', 0)
    },
    handleMenuItemClick(
      active,
      id,
      title,
      image,
      des,
      price,
      type,
      bkimage,
      video,
      time,
      resolution
    ) {
      const updatedForm = {
        id,
        title,
        time,
        image,
        des,
        price,
        type,
        bkimage,
        video,
        resolution,
      }
      const updatedActive = active
      this.$store.commit('SET_FORM', updatedForm)
      this.$store.commit('SET_ACTIVE', updatedActive)
      this.$store.commit('SET_ACTIVE_IMG', updatedActive)
      this.$store.commit('SET_ACTIVE_BKIMG', updatedActive)
      this.$store.commit('SET_ACTIVE_VIDEO', updatedActive)
    },
    deleteVideo(id) {
      this.modal = false
      id === '54984' ? this.messageModal('success' ,false) : this.messageModal('error', false)
    },
    activeVideo(id) {
      this.modal = false
      id === '1234' ? this.messageModal('success' ,false) : this.messageModal('error', false)
    },
    handlePageUpdate(page) {
      this.currentPage = page
      this.pageVideo.forEach((item) => {
        item.limit = (5 * page);
      })
      this.handleSearch()
    },
    async filterMoviesByType() {
      try {
        const response = await this.$axios.post(
          'http://172.28.17.102:2024/video/getallvideotype'
        )
        this.tabs = response.data.detail || []
        this.pageVideo = this.filteredType.map((item) => ({
          typeId: item.typeId,
          limit: 5,
        }))
        await this.handleSearch()
      } catch (error) {
        console.error('Error fetching video types:', error)
      }
    },
    async handleSearch() {
      console.log('f',this.pageVideo)
      try {
        const response = await this.$axios.post(
          'http://172.28.17.102:2024/video/getAllVideoWithFileVideoFromType',
          {
            typeLimits: this.pageVideo,
          }
        )
        this.video = response.data.detail?.data || []
        console.log('Fetched videos:', this.video)
      } catch (error) {
        console.error('Error fetching videos by type:', error)
      }
    },
    messageModal(type, value) {
      const getMessageContent = () => {
        const successMessage = this.modalactive ? 'ປິດວີດີໂອສໍາເລັດ.' : 'ລົບວີດີໂອສໍາເລັດ.';
        const errorMessage = this.modalactive ? 'ປິດວີດີໂອບໍ່ສໍາເລັດ.' : 'ລົບວີດີໂອບໍ່ສໍາເລັດ.';
        
        if (type === 'success') {
          return value || successMessage;
        } else {
          return value || errorMessage;
        }
      };
      this.$Message[type]({
        background: true,
        content: `<span class="custom-font">${getMessageContent()}</span>`,
      });
    },
  },
}
</script>
<style scoped>
.custom-button {
  background-color: rgb(255, 215, 0);
  color: #ffff;
  border-radius: 4px;
  padding: 0px;
  margin: 0px;
  cursor: pointer;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
}
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
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
.table-container ::-webkit-scrollbar {
  width: 4px;
  height: 2px;
}

.table-container ::-webkit-scrollbar-thumb {
  background-color: rgb(255, 215, 0);
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

.color-post {
  background-color: rgb(250, 250, 250);
}
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}
.outlined-border {
  border-radius: 8px;
  padding: 2px;
}
.color-grad-background {
  background-color: rgb(248, 248, 248);
}
.mouse-hover-menu:hover {
  background-color: rgb(255, 215, 0);
  color: #ffff;
}
</style>
