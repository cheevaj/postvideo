<!-- <template>
  <div class="pt-2">
    <div v-for="(item_video, index) in video" :key="item_video.id">
      <v-card-text class="pt-2 pb-2 pl-0 pr-3">
        <v-row>
          <v-col cols="2">
            <v-card flat>
              <v-img
                width="100%"
                height="100%"
                class="text-center"
                :src="item_video.image"
                style="display: flex; align-items: center; justify-content: center;"
              >
                <v-icon size="42" color="rgba(13, 13, 13, 0.8)">mdi-play-circle</v-icon>
                <span class="pr-2" style="position: absolute; right: 2px; bottom: 2px; color: #fff;">
                  {{ item_video.time }}
                </span>
              </v-img>
            </v-card>
          </v-col>
          <v-col cols="8" class="px-1">
            <v-card flat class="rounded-0">
              <h3 class="py-1 px-0 custom-font">{{ item_video.title }}</h3>
              <v-card-text class="pa-0 custom-font">{{ item_video.des }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="2" class="pa-0">
            <v-card flat class="text-right mt-2">
              <v-menu
                v-model="menu[index]"
                :close-on-content-click="false"
                offset-y
                nudge-right="45"
                @click:outside="menu[index] = false"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn fab small text class="pa-0" v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-card width="150" class="outlined-border color-grad-background">
                  <h4 class="custom-font text-left pa-2 color-grad-background">ຈັດການ</h4>
                  <v-list class="pa-0 text-center" style="border-radius: 8px">
                    <v-list-item
                      v-for="(item_menu, item_index) in itemsMenu"
                      :key="item_index"
                      @click="handleMenuItemClick(item_video.id, item_menu.title); menu[index] = false;"
                      class="custom-font mouse-hover-menu"
                    >
                      <v-list-item-content>
                        <v-card-actions class="pa-0">
                          <v-icon>{{ item_menu.icon }}</v-icon>&nbsp;&nbsp;{{ item_menu.title }}
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
</template>

<script>
export default {
  name: 'CenteredIcon',
  data() {
    return {
      video: [
        {
          id: '1234',
          time: '2:34:06',
          image: 'https://tse2.mm.bing.net/th?id=OIP.CiVqxYA8I0CoSVZIYRmyXwHaEK&pid=Api&P=0&h=220',
          title: 'ภาพเคลื่อนไหว - TAIY AKARD Feat. OLA Blackeyes 「Official MV',
          des: 'ເພງ: #ພາບເຄື່ອນໄຫວ ສິລະປີນ: ຕ່າຍ ອາກາດ & ໂອລ້າ ແບຣັກອາຍເນື້ອຮ້ອງ ທຳນອງ: ຕ່າຍ ອາກາດ',
        },
        {
          id: '3456',
          time: '1:04:23',
          image: 'https://tse2.mm.bing.net/th?id=OIP.CiVqxYA8I0CoSVZIYRmyXwHaEK&pid=Api&P=0&h=220',
          title: 'ภาพเคลื่อนไหว - TAIY AKARD Feat. OLA Blackeyes 「Official MV',
          des: 'ເພງ: #ພາບເຄື່ອນໄຫວ ສິລະປີນ: ຕ່າຍ ອາກາດ & ໂອລ້າ ແບຣັກອາຍເນື້ອຮ້ອງ ທຳນອງ: ຕ່າຍ ອາກາດ',
        },
        {
          id: '7654',
          time: '2:34:06',
          image: 'https://tse2.mm.bing.net/th?id=OIP.CiVqxYA8I0CoSVZIYRmyXwHaEK&pid=Api&P=0&h=220',
          title: 'ภาพเคลื่อนไหว - TAIY AKARD Feat. OLA Blackeyes 「Official MV',
          des: 'ເພງ: #ພາບເຄື່ອນໄຫວ ສິລະປີນ: ຕ່າຍ ອາກາດ & ໂອລ້າ ແບຣັກອາຍເນື້ອຮ້ອງ ທຳນອງ: ຕ່າຍ ອາກາດ',
        },
        {
          id: '5489',
          time: '2:34:06',
          image: 'https://tse2.mm.bing.net/th?id=OIP.CiVqxYA8I0CoSVZIYRmyXwHaEK&pid=Api&P=0&h=220',
          title: 'ภาพเคลื่อนไหว - TAIY AKARD Feat. OLA Blackeyes 「Official MV',
          des: 'ເພງ: #ພາບເຄື່ອນໄຫວ ສິລະປີນ: ຕ່າຍ ອາກາດ & ໂອລ້າ ແບຣັກອາຍເນື້ອຮ້ອງ ທຳນອງ: ຕ່າຍ ອາກາດ',
        },
        {
          id: '49768',
          time: '2:34:06',
          image: 'https://tse2.mm.bing.net/th?id=OIP.CiVqxYA8I0CoSVZIYRmyXwHaEK&pid=Api&P=0&h=220',
          title: 'ภาพเคลื่อนไหว - TAIY AKARD Feat. OLA Blackeyes 「Official MV',
          des: 'ເພງ: #ພາບເຄື່ອນໄຫວ ສິລະປີນ: ຕ່າຍ ອາກາດ & ໂອລ້າ ແບຣັກອາຍເນື້ອຮ້ອງ ທຳນອງ: ຕ່າຍ ອາກາດ',
        },
        {
          id: '30859',
          time: '2:34:06',
          image: 'https://tse2.mm.bing.net/th?id=OIP.CiVqxYA8I0CoSVZIYRmyXwHaEK&pid=Api&P=0&h=220',
          title: 'ภาพเคลื่อนไหว - TAIY AKARD Feat. OLA Blackeyes 「Official MV',
          des: 'ເພງ: #ພາບເຄື່ອນໄຫວ ສິລະປີນ: ຕ່າຍ ອາກາດ & ໂອລ້າ ແບຣັກອາຍເນື້ອຮ້ອງ ທຳນອງ: ຕ່າຍ ອາກາດ',
        },
      ],
      itemsMenu: [
        { title: 'ລາຍລະອຽດ', icon: 'mdi-book-open-page-variant' },
        { title: 'ເເກ້ໄຂ', icon: 'mdi-movie-edit' },
        { title: 'ປິດຂາຍ', icon: 'mdi-altimeter' },
        { title: 'ລົບວີດີໂອ', icon: 'mdi-delete' },
      ],
      menu: [],
    };
  },
  created() {
    // Populate the menu array based on the number of video items
    this.menu = Array(this.video.length).fill(false);
  },
  methods: {
    handleMenuItemClick(id, itemTitle) {
      console.log(`Row ID: ${id}, Menu Item: ${itemTitle}`);
      this.$set(this.menu, id, false);
    },
  },
};
</script>

<style scoped>
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
</style> -->




