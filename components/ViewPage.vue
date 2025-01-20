<template>
  <div class="custom-font">
    <v-card-text class="px-4" style="padding: 12px">
      <div class="cover-photo">
        <img
          :src="`https://apicenter.laotel.com:9443/tplussocial?img=${
            form.bkimage ? form.bkimage
              : ''
          }`"
          alt="Cover Photo"
        />
      </div>
      <div class="profile-info">
        <div class="avatar">
          <img
          :src="`https://apicenter.laotel.com:9443/tplussocial?img=${
            form.image ? form.image
              : ''
          }`"
            alt="Avatar"
          />
        </div>
        <div class="details">
          <h1>{{ form.title }}</h1>
          <p
            class="px-1"
            style="font-size: 14px; color: #808080; font-weight: bold"
          >
            view
            <span style="color: #4d4d4d; font-size: 14px; font-weight: bold"
              >{{ form.views }}</span
            >
            <span style="color: #4d4d4d; font-size: 14px; font-weight: bold"
              >( {{ form.categoryName }} )</span
            >
          </p>
        </div>
      </div>
      <v-divider color="#e6e6e6" style="padding-top: 1px; margin-bottom: 4px" />
      <v-card-text class="custom-link py-2 px-4 ma-4">
        <div v-html="form.des"></div>
        <!-- <div style="color: #737373">text test</div> -->
      </v-card-text>
      <div>
        <v-card-actions class="pa-0">
          <v-card-title
            class="custom-font pr-1"
            style="text-decoration: underline"
          >
            ຮູບລີວິວ
          </v-card-title>
          <v-divider
            color="#e6e6e6"
            class="mt-2"
            style="padding-top: 1px; margin-bottom: 4px"
        /></v-card-actions>
        <v-card-text class="py-3 px-6">
          <v-card
            v-if="form.previewImg.length > 0"
            flat
            class="rounded-0"
            style="
              overflow-x: auto;
              display: flex;
              gap: 10px;
              scrollbar-width: none;
            "
          >
            <v-img
              v-for="(item, index) in form.previewImg"
              :key="index"
              style="
                border: 1px solid #a6a6a6;
                height: 240px;
                width: 220px;
                flex: 0 0 auto;
              "
              :src="`https://apicenter.laotel.com:9443/tplussocial?img=${item}`"
            />
          </v-card>
          <v-card
            v-else
            height="140"
            outlined
            class="d-flex justify-center align-center"
          >
            <h1 style="color: #666666; font-style: italic">
              view images is Null
            </h1>
          </v-card>
        </v-card-text>
        <v-card-actions class="pa-0">
          <v-card-title
            class="custom-font pr-1"
            style="text-decoration: underline"
          >
            ວີດີໂອ
          </v-card-title>
          <v-divider
            color="#e6e6e6"
            class="mt-2"
            style="padding-top: 1px; margin-bottom: 4px"
          />
        </v-card-actions>
        <v-card-text class="py-3 px-6">
          <div v-if="form.video.length > 0">
            <v-row>
              <v-col
                cols="4"
                v-for="(itemVideo, index) in form.video"
                :key="index"
              >
                <v-card flat class="custom-p px-2 py-1">
                  <span
                    v-if="
                      itemVideo &&
                      itemVideo.videoQualitydata &&
                      itemVideo.videoQualitydata.quality
                    "
                  >
                    {{ itemVideo.videoQualitydata.quality }}p
                  </span>

                  <v-divider color="#FFFF" />
                </v-card>
                <video
                  :src="`https://apicenter.laotel.com:9443/tplussocial/VideoStreaming?v=${
                    form.video.length > 0 ? itemVideo.filename || '' : ''
                  }`"
                  controls
                  style="
                    width: 100%;
                    height: 240px;
                    border: 1px solid #a6a6a6;
                    background-color: #000;
                  "
                ></video>
              </v-col>
            </v-row>
          </div>
          <v-card
            v-else
            height="140"
            outlined
            class="d-flex justify-center align-center"
          >
            <h1 style="color: #666666; font-style: italic">Video is Null</h1>
          </v-card>
        </v-card-text>
      </div>
    </v-card-text>
    <br /><br /><br />
  </div>
</template>

<script>
export default {
  name: 'ViewPage',
  data() {
    return {
      name: 'Breakpoints and media queries Customizing your theme.',
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
    getData() {
      console.log('Form::', this.form)
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
.custom-p {
  width: 90px;
  border-top-right-radius: 50%;
  border-top-left-radius: 50%;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  background-color: #333333;
  color: #ffff;
  text-align: center;
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
.cover-photo img {
  width: 100%;
  height: auto;
  height: 410px;
  border-radius: 2px;
}
.profile-info {
  display: flex;
  align-items: center;
  margin-top: -120px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
}
.avatar img {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  z-index: 20;
  position: relative;
  border: 4px solid #ffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.details {
  padding: 15px;
  padding-right: 85px;
  padding-left: 110px;
  margin-left: -100px;
  margin-right: 50px;
  position: relative;
  z-index: 10;
  background-color: #ffff;
  clip-path: polygon(0 0, calc(100% - 80px) 0, 100% 80px, 100% 100%, 0 100%);
}
.details h1 {
  font-size: 24px;
  margin: 0;
}
.details p {
  color: #777;
  margin-top: 5px;
}
.actions {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.actions button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
.actions button:hover {
  background-color: #0056b3;
}
</style>
