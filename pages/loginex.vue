<template>
  <div>
    <div>
      <v-img
        height="91vh"
        gradient="to top right, rgba(225,225,0,0.2), rgba(0,0,0,0.2)"
        class="screen"
        :src="require('@/static/login_backgroud.png')"
      >
        <v-card-text
          class="justify-center align-center text-center"
          style="height: 100%"
        >
          <v-card
            class="text-center"
            max-width="380px"
            :class="{ shaking: !active }"
            style="
              background-color: rgb(255, 224, 0);
              border: 1.5px solid #ffcc00;
              border-radius: 20px;
              margin: 0 auto;
              top: 10%;
              box-shadow: 20px 10px 20px rgba(0, 0, 0, 0.5);
            "
          >
            <v-card-actions class="back-BK py-0 pr-0" style="position: relative;">
              <v-avatar class="my-0 pa-4" size="90">
                <img src="~/static/Tpluslogo.png" alt="John" />
              </v-avatar>
              <div class="pa-0" style="position: relative; display: inline-block; height: 100px; width: 280px; border-top-right-radius: 20px; overflow: hidden;">
                <img src="~/static/line-yellow-and-black.jpg" alt="John" style="height: 100%; width: 100%; border-top-right-radius: 20px;">
                <h2 class="text-center custom-font" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); margin: 0; color: #ffff;">
                  ເຂົ້າສູ່ລະບົບ
                </h2>
              </div>
            </v-card-actions>
            <v-divider></v-divider>
            <v-card-actions style="background-color: transparent; color: #000;">
              <v-form
                @submit.prevent="checkrequired"
                style="border-radius: 20px"
                @keydown.enter="checkrequired"
              >
                <v-card-text
                  style="color: #000; padding-right: 12px; padding-top: 24px"
                >
                  <v-row>
                    <v-col cols="12">
                      <v-card-actions class="pa-0">
                        <v-card outlined style="height: 45px; width: 45px; border-radius: 50%; padding-top: 4px; background-color: rgb(242, 242, 242);">
                          <v-icon size="34">mdi-account-tie</v-icon>
                        </v-card>
                        &nbsp;&nbsp;
                        <v-text-field
                          solo
                          class="custom-font shadow-card-login"
                          v-model="email"
                          placeholder="ກະລຸນາປ້ອມຊື່"
                          :rules="[rules.required]"
                          :label="'ຊື່ຜູ້ໃຊ້ (ສະເພາະເອັດມິນ)'"
                          :label-color="'#000'"
                          style="color: #000;"
                          @keydown.enter="checkrequired"
                        />
                      </v-card-actions>
                    </v-col>
                    <v-col cols="12" class="py-0">
                      <br />
                      <v-card-actions class="pa-0">
                        <v-card outlined style="height: 45px; width: 45px; border-radius: 50%; padding-top: 4px; background-color: rgb(242, 242, 242);">
                          <v-icon size="34">{{
                            !showpassword
                            ? 'mdi-lock-open'
                            : 'mdi-lock-open-variant'
                          }}</v-icon>
                        </v-card>
                        &nbsp;&nbsp;
                        <v-text-field
                          solo
                          class="custom-font shadow-card-login"
                          placeholder="ກະລຸນາປ້ອມລະຫັດຜ່ານ"
                          v-model="password"
                          :rules="[rules.required, rules.counter]"
                          :label="'ລະຫັດຜ່ານ'"
                          :append-icon="
                            showpassword ? 'mdi-eye' : 'mdi-eye-off'
                          "
                          :type="showpassword ? 'text' : 'password'"
                          @click:append="showpassword = !showpassword"
                          counter
                          maxlength="20"
                          :label-color="'#000'"
                          style="color: #000;"
                          @keydown.enter="checkrequired"
                        ></v-text-field>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-text class="text-center mt-12">
                  <v-btn
                    outlined
                    class="custom-font"
                    style="
                      background-color: black;
                      min-width: 150px;
                      height: 45px;
                    "
                    :style="{ color: button ? '#ffff' : '#ffff00' }"
                    text
                    @mouseenter="button = false"
                    @mouseleave="button = true"
                    @click="checkrequired"
                  >
                    <h3>ເຂົ້າສູ່ລະບົບ</h3>
                  </v-btn>
                </v-card-text>
              </v-form>
            </v-card-actions>
          </v-card>
        </v-card-text>
      </v-img>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: true,
      button: true,
      showpassword: false,
      email: '',
      password: '',
      rules: {
        required: (value) => !!value || 'Required.',
        counter: (value) => value.length <= 20 || 'Max 20 characters',
      },
    }
  },
  mounted() {
    this.setSheetHeight()
    window.addEventListener('resize', this.setSheetHeight)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setSheetHeight)
  },
  methods: {
    setSheetHeight() {
      const screen = document.querySelector('.screen')
      if (screen) {
        const screenHeight = window.innerHeight + 10
        screen.style.height = screenHeight + 'px'
      }
    },
    toggleActive() {
      this.active = false
      if (!this.active) {
        setTimeout(() => {
          this.active = true
        }, 500)
      }
    },
    async checkrequired() {
      console.log(this.email, this.password)
      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            nameoremail: this.email,
            password: this.password,
          },
        })
        if (response.data) {
          this.$store.commit('setToken', response.data);
          this.$router.push('/')
        } else {
          console.error('Invalid response data')
        }
      } catch (err) {
        this.errorMessage()
      }
    },
    errorMessage() {
      this.$Notice.error({
        title: `<span class="custom-font">${'ບໍ່ພົບຜູ້ໃຊ້ນີ້'}</span>`,
        desc: `<span class="custom-font">${'ກະລຸນາກວດເບິ່ງຊື່,ອີເມວ ຫຼື ລະຫັດຜ່ານຂອງທ່ານ ແລະ ລອງໃໝ່ອີກ.'}</span>`,
      })
      this.toggleActive()
    },
    encryptToken(token) {
      const CryptoJS = require('crypto-js')
      const secretKey = 'yourSecretKey'
      const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString()
      return encryptedToken
    },
  },
}
</script>

<style>
#screen::-webkit-scrollbar {
  display: none;
}
.back-BK {
  background-color: #000;
  color: #ffff00;
}
.hovered {
  background-color: rgba(255, 255, 255, 0.8);
  border-color: rgb(255, 255, 0);
}
.shadow-card-login {
  height: 45px;
  border-radius: 16px;
  background-color: #fff !important;
  box-shadow: inset 2px 4px 4px 2px rgba(0, 0, 0, 0.5) !important;
  outline: 0px solid #f2f2f2 !important;
}
.shadow-card-login .v-input__control .v-input__slot {
  background-color: #fff !important;
  border-radius: 16px;
  box-shadow: inset 0px 4px 4px 2px rgba(0, 0, 0, 0.5) !important;
}
.shaking {
  animation: shake 0.1s ease-in-out infinite alternate;
}
@keyframes shake {
  0% {
    transform: translateX(-3px);
  }

  100% {
    transform: translateX(3px);
  }
}
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}
</style>
