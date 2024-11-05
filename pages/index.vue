<template>
  <div style="background-color: rgb(235, 235, 235)">
    <v-overlay :value="addTypeVideo || modalSell || allvideo" />
    <v-navigation-drawer
      v-model="addTypeVideo"
      right
      fixed
      width="450"
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
          <v-icon class="color-hover" @click="addTypeVideo = !addTypeVideo">
            mdi-close
          </v-icon>
          <v-card-title class="py-1"
            ><h3 class="custom-font">ເພີ່ມປະເພດຂອງວີດີໂອ</h3></v-card-title
          >
        </v-card-actions>
      </v-card>
      <TypeVideo />
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="modalSell"
      fixed
      right
      width="64vw"
      height="100vh"
      class="table-container py-0"
      style="background-color: #ffff"
      @click.stop
    >
      <v-card
        outlined
        class="rounded-0"
        style="
          position: fixed;
          height: 42px;
          z-index: 100;
          width: 100%;
          background-color: rgb(235, 235, 235);
        "
      >
        <v-card-actions class="pa-0">
          <v-spacer></v-spacer>
          <v-card-title class="py-1"
            ><h3 class="custom-font">ຂໍ້ມູນການຂາຍວີດີໂອ</h3></v-card-title
          >
          <v-spacer></v-spacer>
          <Button class="custom-arrow" @click="modalSell = !modalSell">
            <v-icon class="custom-arrow"> mdi-arrow-right-bold </v-icon>
          </Button>
        </v-card-actions>
      </v-card>
      <SellVideo />
    </v-navigation-drawer>
    <v-card-text>
      <v-row>
        <v-col cols="4" class="pr-2">
          <v-dialog
            v-model="allvideo"
            scrollable
            max-width="670px"
            style="max-width: 84vw;"
          >
            <v-card style="height: 75vh; width: 84vw;">
              <ViewVideo v-if="allvideo" />
            </v-card>
          </v-dialog>
          <v-card
            class="shadow-card"
            style="border-radius: 15px; height: 110px; color: transparent"
            :style="{ backgroundColor: modalVideo ? 'transparent' : 'white' }"
            @click="allvideo = !allvideo"
          >
            <v-card-actions
              class="pa-0"
              style="border-radius: 15px; height: 110px"
            >
              <v-card flat height="95" width="100%" class="ml-1 px-4 py-2">
                <span class="custom-font">ວີດີໂອ ທັງໝົດ</span>
                <br />
                <br />
                <h2 class="custom-font">12 ວີດີໂອ</h2>
              </v-card>
              <v-spacer />
              <v-card
                flat
                class="my-2 mx-4"
                height="95"
                width="95"
                :style="{
                  backgroundColor: modalVideo ? 'transparent' : 'white',
                }"
              >
                <v-img :src="require('~/static/movieicon.jpg')" />
              </v-card>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="4" class="pr-2">
          <v-card
            class="shadow-card"
            style="border-radius: 15px; height: 110px; color: transparent"
            :style="{ backgroundColor: modalSell ? 'transparent' : 'white' }"
            @click="modalSell = !modalSell"
          >
            <v-card-actions
              class="pa-0"
              style="border-radius: 15px; height: 110px"
            >
              <v-card flat height="95" width="100%" class="ml-1 px-4 py-2">
                <span class="custom-font">ຂາຍ ວີດີໂອ</span>
                <br />
                <br />
                <h2 class="custom-font">1203 ວີດີໂອ</h2>
              </v-card>
              <v-spacer />
              <div>
                <v-avatar
                  flat
                  class="my-2 mx-4"
                  height="85"
                  width="85"
                  style="background-color: #4d88ff"
                >
                  <v-img
                    width="85"
                    height="85"
                    :src="require('~/static/video_oder.jpg')"
                  />
                </v-avatar>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="4" class="pr-2">
          <v-card
            class="shadow-card"
            style="border-radius: 15px; height: 110px; color: transparent"
            :style="{ backgroundColor: modalTyple ? 'transparent' : 'white' }"
            @click="modalTyple = true"
          >
            <v-card-actions
              class="pa-0"
              style="border-radius: 15px; height: 110px"
            >
              <v-card
                flat
                height="95"
                width="100%"
                class="ml-1 px-4 py-2"
                style="border-radius: 15px"
              >
                <span class="custom-font">ປະເພດ ວີດີໂອ</span>
                <br />
                <br />
                <h2 class="custom-font">{{ itemsType.length }} ປະເພດ</h2>
              </v-card>
              <v-spacer />
              <div class="ml-1 px-4 py-2">
                <v-avatar color="BK-color">
                  <v-icon dark> mdi-menu </v-icon>
                </v-avatar>
              </div>
            </v-card-actions>
          </v-card>
          <Modal
            v-model="modalTyple"
            draggable
            scrollable
            :mask="false"
            width="340"
            style="padding: 0px"
          >
            <template #header>
              <div style="color: rgb(255, 215, 0); text-align: center">
                <v-icon color="rgb(255, 215, 0)"
                  >mdi-format-list-checkbox</v-icon
                >
                <span class="custom-font">ປະເພດຂອງວີດີໂອ</span>
              </div>
            </template>
            <div>
              <div style="text-align: center">
                <div>
                  <Input
                    v-model="value"
                    search
                    placeholder="ຊື່ປະເພດ..."
                    clearable
                    class="mt-2 custom-font"
                    style="color: #ff9900"
                  />
                </div>
                <v-card
                  outlined
                  class="table-container"
                  style="
                    max-height: 240px;
                    z-index: 100;
                    margin-top: 2px;
                    overflow-y: auto;
                  "
                >
                  <div
                    v-for="(item, index) in itemsType"
                    :key="index"
                    :value="item"
                    style="max-height: 100%; padding: 2px"
                  >
                    <v-card-text
                      class="custom-font"
                      :style="{
                        backgroundColor:
                          index % 2 === 0 ? '#ffeecc' : '#f2f2f2',
                        padding: '2px',
                        margin: '0',
                      }"
                    >
                      {{ item.name }}
                    </v-card-text>
                    <v-divider></v-divider>
                  </div>
                </v-card>
              </div>
            </div>
            <template #footer>
              <Button
                size="large"
                long
                disabled
                style="background-color: #ff9900; color: #ffff"
                @click="isShowType()"
              >
                <v-icon color="#ffff">mdi-plus-circle</v-icon>&nbsp;<span
                  class="custom-font"
                  >ເພີ່ມປະເພດໜັງ</span
                >
              </Button>
            </template>
          </Modal>
        </v-col>
        <v-col cols="6" class="py-1 pr-2">
          <v-card
            class="shadow-card"
            style="
              border-radius: 15px;
              height: 280px;
              background-color: #ffff;
              color: transparent;
            "
            :style="{
              backgroundColor:
                page === 'chart-doughnut' ? 'transparent' : 'white',
            }"
            @click="viewMenu('chart-doughnut')"
          >
            <ChartDoughnut />
          </v-card>
        </v-col>
        <v-col cols="6" class="py-1 pl-2">
          <v-card
            class="shadow-card"
            style="border-radius: 15px; height: 280px; color: transparent"
            :style="{
              backgroundColor: page === 'chart-bar' ? 'transparent' : 'white',
            }"
            @click="viewMenu('chart-bar')"
          >
            <ChartBar style="height: 100%; width: 100%" />
          </v-card>
        </v-col>
        <v-col>
          <v-card
            style="
              border-radius: 15px;
              min-height: 450px;
              box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
              transition: box-shadow 0.3s ease;
            "
          >
            <v-card-text>
              <v-row>
                <v-col v-for="(items, index) in video" :key="index" cols="3">
                  <v-card
                    class="custom-video"
                    outlined
                    style="background-color: rgb(236, 236, 236)"
                    @click="
                      handleMenuItemClick(
                        false,
                        items.id,
                        items.title,
                        items.image,
                        items.des,
                        items.price,
                        items.type,
                        items.bkimage,
                        items.video
                      )
                    "
                  >
                    <v-card
                      flat
                      height="120"
                      width="100%"
                      style="
                        border-bottom-left-radius: 0;
                        border-bottom-right-radius: 0;
                        padding: 2px;
                      "
                    >
                      <v-img
                        width="100%"
                        height="100%"
                        class="text-center"
                        :src="items.image"
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        "
                      >
                        <v-icon size="42" color="rgba(13, 13, 13, 0.8)"
                          >mdi-play-circle</v-icon
                        >
                        <span
                          class="pr-2"
                          style="
                            position: absolute;
                            right: 2px;
                            bottom: 2px;
                            color: #fff;
                          "
                        >
                          {{ items.time }}
                        </span>
                      </v-img>
                    </v-card>
                    <v-card-text>
                      <v-row>
                        <v-col cols="6">
                          <v-card-actions class="custom-link px-2 py-1">
                            <v-icon>mdi-cart</v-icon>&nbsp;&nbsp;<span
                              >4.5k</span
                            >
                          </v-card-actions>
                        </v-col>
                        <v-col cols="6">
                          <v-card-actions
                            class="custom-link text-center px-2 py-1"
                          >
                            <v-icon>mdi-thumb-up</v-icon>&nbsp;&nbsp;<span
                              >4.5k</span
                            >
                          </v-card-actions>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="3" class="pa-0"></v-col>
                        <v-col cols="6" class="pa-0">
                          <v-card-actions
                            class="custom-link text-center px-2 py-1"
                          >
                            <v-icon>mdi-cash-100</v-icon>
                            <span>45.000Kip</span>
                          </v-card-actions>
                          <v-col cols="3" class="pa-0"></v-col>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-dialog
      v-model="select"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card class="rounded-0">
        <v-card-actions class="py-1 pl-1 pr-2 BK-color">
          <v-btn
            text
            x-small
            style="background-color: transparent; color: transparent"
            @click="closeSelect"
          >
            <v-icon size="30" color="#ffff">mdi-arrow-left-bold</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <h2 class="custom-font">ລາຍລະອຽດວີດີໂອ</h2>
          <v-spacer></v-spacer>
          <v-btn fab outlined x-small @click="closeSelect">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-text class="px-0" style="padding-top: 3px; padding-bottom: 4px">
          <ViewPage v-if="page === 'view'" />
          <viewIndexBar v-else-if="page === 'chart-bar'" />
          <viewIndexDoughnut v-else-if="page === 'chart-doughnut'" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import viewIndexBar from './viewChartBar'
import viewIndexDoughnut from './viewChartDouhnut'
export default {
  middleware: 'auth',
  Currency: 'DefaultLayout',
  name: 'IndexPage',
  components: {
    viewIndexBar,
    viewIndexDoughnut,
  },
  data() {
    return {
      addTypeVideo: false,
      allvideo: false,
      value: '',
      page: '',
      modalVideo: false,
      modalSell: false,
      modalTyple: false,
      select: false,
      right: true,
      itemsType:[],
      video: [
        {
          id: '1234',
          time: '2:34:06',
          image: 'https://wallpaperaccess.com/full/1356284.jpg',
          bkimage:
            'https://tse2.mm.bing.net/th?id=OIP.CiVqxYA8I0CoSVZIYRmyXwHaEK&pid=Api&P=0&h=220',
          video:
            'https://www.youtube.com/watch?v=MB3JQQy_QLM&list=RDMB3JQQy_QLM&start_radio=1',
          title: 'ภาพเคลื่อนไหว - TAIY AKARD Feat. OLA Blackeyes 「Official MV',
          des: 'ເພງ: #ພາບເຄື່ອນໄຫວ ສິລະປີນ: ຕ່າຍ ອາກາດ & ໂອລ້າ ແບຣັກອາຍເນື້ອຮ້ອງ ທຳນອງ: ຕ່າຍ ອາກາດ',
          price: 34000,
          type: 'ກະຕຸນ',
        },
        {
          id: '3456',
          time: '1:04:23',
          image:
            'https://deep-image.ai/blog/content/images/size/w1600/2022/08/magic-g1db898374_1920.jpg',
          bkimage:
            'https://tse2.mm.bing.net/th?id=OIP.CiVqxYA8I0CoSVZIYRmyXwHaEK&pid=Api&P=0&h=220',
          video:
            'https://www.youtube.com/watch?v=MB3JQQy_QLM&list=RDMB3JQQy_QLM&start_radio=1',
          title: 'ภาพเคลื่อนไหว - TAIY AKARD Feat. OLA Blackeyes 「Official MV',
          price: 34000,
          des: 'ເພງ: #ພາບເຄື່ອນໄຫວ ສິລະປີນ: ຕ່າຍ ອາກາດ & ໂອລ້າ ແບຣັກອາຍເນື້ອຮ້ອງ ທຳນອງ: ຕ່າຍ ອາກາດ',
          type: 'ໜັງ',
        },
        {
          id: '4567',
          time: '2:04:23',
          image:
            'https://deep-image.ai/blog/content/images/size/w1600/2022/08/magic-g1db898374_1920.jpg',
          bkimage:
            'https://tse2.mm.bing.net/th?id=OIP.CiVqxYA8I0CoSVZIYRmyXwHaEK&pid=Api&P=0&h=220',
          video:
            'https://www.youtube.com/watch?v=MB3JQQy_QLM&list=RDMB3JQQy_QLM&start_radio=1',
          title: 'ภาพเคลื่อนไหว - TAIY AKARD Feat. OLA Blackeyes 「Official MV',
          price: 34000,
          des: 'ເພງ: #ພາບເຄື່ອນໄຫວ ສິລະປີນ: ຕ່າຍ ອາກາດ & ໂອລ້າ ແບຣັກອາຍເນື້ອຮ້ອງ ທຳນອງ: ຕ່າຍ ອາກາດ',
          type: 'ໜັງບູ້',
        },
        {
          id: '1234',
          time: '2:34:06',
          image: 'https://wallpaperaccess.com/full/1356284.jpg',
          bkimage:
            'https://tse2.mm.bing.net/th?id=OIP.CiVqxYA8I0CoSVZIYRmyXwHaEK&pid=Api&P=0&h=220',
          video:
            'https://www.youtube.com/watch?v=MB3JQQy_QLM&list=RDMB3JQQy_QLM&start_radio=1',
          title: 'ภาพเคลื่อนไหว - TAIY AKARD Feat. OLA Blackeyes 「Official MV',
          des: 'ເພງ: #ພາບເຄື່ອນໄຫວ ສິລະປີນ: ຕ່າຍ ອາກາດ & ໂອລ້າ ແບຣັກອາຍເນື້ອຮ້ອງ ທຳນອງ: ຕ່າຍ ອາກາດ',
          price: 34000,
          type: 'ກະຕຸນ',
        },
        {
          id: '3456',
          time: '1:04:23',
          image:
            'https://deep-image.ai/blog/content/images/size/w1600/2022/08/magic-g1db898374_1920.jpg',
          bkimage:
            'https://tse2.mm.bing.net/th?id=OIP.CiVqxYA8I0CoSVZIYRmyXwHaEK&pid=Api&P=0&h=220',
          video:
            'https://www.youtube.com/watch?v=MB3JQQy_QLM&list=RDMB3JQQy_QLM&start_radio=1',
          title: 'ภาพเคลื่อนไหว - TAIY AKARD Feat. OLA Blackeyes 「Official MV',
          price: 34000,
          des: 'ເພງ: #ພາບເຄື່ອນໄຫວ ສິລະປີນ: ຕ່າຍ ອາກາດ & ໂອລ້າ ແບຣັກອາຍເນື້ອຮ້ອງ ທຳນອງ: ຕ່າຍ ອາກາດ',
          type: 'ໜັງ',
        },
      ],
    }
  },
  mounted() {
    this.dataResponseAll();
  },
  methods: {
    async dataResponseAll() {
      const apiCalls = [
        this.$axios.post('http://172.28.17.102:2024/video/getallvideotype'),
        this.$axios.post('http://172.28.17.102:2024/video/getallvideocategory'),
      ];
      try {
        const responses = await Promise.all(apiCalls);
        const [
          videoType,
          videocategory,
        ] = responses;
        this.itemsType = videoType.data.detail;
        console.log("type:",videocategory.data.detail)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    isShowType() {
      this.addTypeVideo = !this.addTypeVideo
      this.modalTyple = false
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
      time
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
      }
      const updatedActive = active
      this.$store.commit('SET_FORM', updatedForm)
      this.$store.commit('SET_ACTIVE', updatedActive)
      this.$store.commit('SET_ACTIVE_IMG', updatedActive)
      this.$store.commit('SET_ACTIVE_BKIMG', updatedActive)
      this.$store.commit('SET_ACTIVE_VIDEO', updatedActive)
      // this.$nextTick(() => {
      //   console.log('form::', this.$store.state.form);
      // });
      this.page = 'view'
      this.select = true
    },
    viewMenu(page) {
      this.page = page
      this.select = true
    },
    closeSelect() {
      this.select = false
      this.page = ''
    },
  },
}
</script>

<style scoped>
.custom-arrow {
  height: 40px;
  width: 40px;
  border-radius: 0px;
  border: 0px solid #fff;
  color: black;
  background-color: transparent;
  padding: 0px;
}
.custom-arrow:hover {
  background-color: rgb(255, 215, 0);
  color: #fff;
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
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}

.shadow-card {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease;
  cursor: pointer;
}
.custom-card:hover {
  cursor: not-allowed;
}
.shadow-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}
.hover-pointer {
  cursor: pointer;
  background-color: none;
}
.custom-link {
  border-radius: 14px;
  background-color: rgb(255, 255, 255);
}
.BK-color {
  background-color: rgb(255, 215, 0);
}
.color-hover {
  color: none;
}
.color-hover:hover {
  color: rgb(255, 215, 0);
}

.custom-video:hover {
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}
</style>
