<template>
  <div class="custom-font">
    <v-card-text class="px-4" style="padding: 12px">
      <v-row>
        <v-col class="pa-0">
          <v-card-text height="480" class="pa-0">
            <video
              :src="`https://apicenter.laotel.com:9443/tplussocial/VideoStreaming?v=${
                form.video[0].thumbnail || ''
              }`"
              controls
              style="width: 100%; height: 540px"
            ></video>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8" class="pl-0 pr-1">
          <v-card-text class="px-0">
            <v-card flat>
              <v-card-title class="py-1 px-4">
                <h3>{{ form.title }}</h3>
              </v-card-title>
            </v-card>
          </v-card-text>
          <v-card-text class="px-4 py-0">
            <v-card-text class="custom-link pa-2">
              {{ form.des }}
            </v-card-text>
          </v-card-text>
          <v-card-text height="420" class="pa-4">
            <v-img :src="form.bkimage" height="360" width="100%">
              <v-card class="card-image">
                <v-img
                  :src="form.image"
                  height="146"
                  class="text-center"
                  white="246"
                  style="align-items: center; justify-content: center"
                >
                  <v-icon size="52" color="rgba(13, 13, 13, 0.8)"
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
                    {{ form.time }}
                  </span>
                </v-img>
              </v-card>
            </v-img>
          </v-card-text>
        </v-col>
        <v-col cols="4" class="pr-0 pl-1">
          <v-card-text class="py-5">
            <v-card-actions class="pa-0">
              <v-spacer></v-spacer>
              <v-card-actions class="custom-link px-2 py-1">
                <v-icon>mdi-cash-100</v-icon>
                <span>45.000Kip</span>
              </v-card-actions>
              <v-spacer></v-spacer>
              <v-card-actions class="custom-link px-2 py-1">
                <v-icon>mdi-thumb-up</v-icon>&nbsp;&nbsp;<span>4.5k</span>
              </v-card-actions>
              &nbsp;&nbsp;
              <v-card-actions class="custom-link px-2 py-1">
                <v-icon>mdi-cart</v-icon>&nbsp;&nbsp;<span>4.5k</span>
              </v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card-text>
          <v-card-title class="custom-font pa-1 color-text-load">
            ວິດິໂອນີ້ຍົມຊື້
          </v-card-title>
          <v-card-text class="py-2 px-1">
            <v-card flat width="100%" height="200">
              <div v-for="(item_video, index) in video" :key="index">
                <v-card-text
                  class="pt-2 pb-2 pl-0 pr-3 hover-pointer"
                  @click="
                    handleMenuItemClick(
                      false,
                      item_video.id,
                      item_video.title,
                      item_video.image,
                      item_video.des,
                      item_video.price,
                      item_video.type,
                      item_video.bkimage,
                      item_video.video,
                      item_video.time
                    )
                  "
                >
                  <v-row>
                    <v-col cols="4">
                      <v-card flat height="85">
                        <v-img
                          width="100%"
                          height="100%"
                          class="text-center"
                          :src="item_video.image"
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
                            {{ item_video.time }}
                          </span>
                        </v-img>
                      </v-card>
                    </v-col>
                    <v-col cols="8" class="px-1">
                      <v-card flat height="85" class="rounded-0">
                        <h3 class="py-1 px-0 custom-font">
                          {{ item_video.title }}
                        </h3>
                        <v-card-text class="pa-0 custom-font">{{
                          item_video.des
                        }}</v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-divider></v-divider>
              </div>
            </v-card>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: 'ViewPage',
  data() {
    return {
      video: [
        {
          id: '1234',
          time: '2:34:06',
          image: 'https://wallpaperaccess.com/full/1356284.jpg',
          bkimage:
            'http://blended-html.com/background-images/bi-background-black.png',
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
            'https://samples-files.com/samples/Images/jpg/1920-1080-sample.jpg',
          bkimage:
            'http://blended-html.com/background-images/bi-background-black.png',
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
            'http://blended-html.com/background-images/bi-background-black.png',
          video:
            'https://www.youtube.com/watch?v=MB3JQQy_QLM&list=RDMB3JQQy_QLM&start_radio=1',
          title: 'ภาพเคลื่อนไหว - TAIY AKARD Feat. OLA Blackeyes 「Official MV',
          price: 34000,
          des: 'ເພງ: #ພາບເຄື່ອນໄຫວ ສິລະປີນ: ຕ່າຍ ອາກາດ & ໂອລ້າ ແບຣັກອາຍເນື້ອຮ້ອງ ທຳນອງ: ຕ່າຍ ອາກາດ',
          type: 'ໜັງບູ້',
        },
      ],
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
      this.$nextTick(() => {
        console.log('form::', this.$store.state.form)
      })
    },
    getData() {
      console.log(this.form)
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
</style>
