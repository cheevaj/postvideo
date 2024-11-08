<template>
  <div class="login-page">
    <div class="login-card">
      <h2 class="login-title">Login</h2>
      <v-text-field
        label="ຊື່ຜູ້ໃຊ້ (ສະເພາະເອັດມິນ)"
        placeholder="ກະລຸນາປ້ອມຊື່"
        single-line
        outlined
        dense
        prepend-inner-icon="mdi-account"
        v-model="email"
        class="login-input custom-font"
      ></v-text-field>
      <v-text-field
        label="ລະຫັດຜ່ານ"
        placeholder="ກະລຸນາປ້ອມລະຫັດຜ່ານ..."
        :type="showPassword ? 'text' : 'password'"
        v-model="password"
        single-line
        outlined
        dense
        prepend-inner-icon="mdi-lock"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        maxlength="20"
        counter
        :rules="[rules.required, rules.counter]"
        @click:append="toggleShowPassword"
        @submit.prevent="checkrequired"
        @keydown.enter="checkrequired"
        class="login-input custom-font"
      ></v-text-field>
      <div class="login-options">
        <v-checkbox
          v-model="rememberMe"
          label="Remember Me"
          class="login-checkbox"
          dense
        ></v-checkbox>
        <a
          href="#"
          class="forgot-password"
          @click="messageModal('error', 'ຍັງບໍ່ໃຫ້ບໍລິການ.')"
          >Forget Password</a
        >
      </div>
      <v-btn
        class="login-button rainbow-button login-card"
        large
        @click="checkrequired"
        >Log in</v-btn
      >
      <p class="register-text" style="color: #4d4d00">
        Don’t have an account?
        <a href="#" @click="messageModal('error', 'ຍັງບໍ່ໄດ້ເປິດໃຫ້ສະມັດ.')"
          >Register</a
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      rememberMe: false,
      showPassword: false,
      email: '',
      password: '',
      rules: {
        required: (value) => !!value || 'Required.',
        counter: (value) => value.length <= 20 || 'Max 20 characters',
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    }
  },
  mounted() {
    const storedEmail = localStorage.getItem('email')
    const storedPassword = localStorage.getItem('password')
    if (storedEmail && storedPassword) {
      this.email = storedEmail
      this.password = storedPassword
      this.rememberMe = true
    }
  },
  methods: {
    toggleShowPassword(){
      this.showPassword = !this.showPassword;
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
          this.$store.commit('setToken', response.data)
          if (this.rememberMe) {
            localStorage.setItem('email', this.email)
            localStorage.setItem('password', this.password)
          } else {
            localStorage.removeItem('email')
            localStorage.removeItem('password')
          }
          this.$router.push('/')
        } else {
          console.error('Invalid response data')
        }
      } catch (err) {
        this.errorMessage(
          'ບໍ່ພົບຜູ້ໃຊ້',
          'ກະລຸນາກວດເບິ່ງຊື່ ຫຼື ລະຫັດຜ່ານຂອງທ່ານ ແລະ ລອງໃໝ່ອີກຄັ້ງ.'
        )
      }
    },
    errorMessage(title, desc) {
      this.$Notice.error({
        title: `<span class="custom-font">${title}</span>`,
        desc: `<span class="custom-font">${desc}</span>`,
      })
    },
    messageModal(type, desc) {
      this.$Message[type]({
        background: true,
        content: `<span class="custom-font">${desc}<span>`,
      })
    },
  },
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(90vh + 2px);
  background: url('~/static/login_backgroud.png') no-repeat center center;
  background-size: cover;
}
.login-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 350px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.login-title {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
  color: #fff;
}
.login-input {
  width: 100%;
  margin-bottom: 15px;
  border-radius: 20px;
}
.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #fff;
}
.login-checkbox {
  color: #fff;
}
.forgot-password {
  color: #fff;
  text-decoration: none;
}
.login-button {
  width: 100%;
  color: #fff;
  margin-top: 20px;
  border-radius: 50px;
  font-weight: bold;
}
.rainbow-button {
  background: linear-gradient(
    12deg,
    #ff704d,
    #ff5c33,
    #ffd633,
    #ffd11a,
    #ffff66,
    #ffff00,
    #ffd633,
    #ffd11a,
    #ffff66,
    #ffff00,
    #ff704d,
    #ffd633,
    #ffd11a,
    #ffff00,
    #ffff66,
    #ffff00
  );
  color: #fff;
  background-size: 200% 200%;
  animation: rainbow-animation 15s linear infinite;
  animation-play-state: running;
}

.rainbow-button:hover {
  animation-play-state: paused;
}

@keyframes rainbow-animation {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}
.register-text {
  margin-top: 20px;
  color: #fff;
}
.register-text a {
  color: #4d4d00;
  font-weight: bold;
  text-decoration: none;
}
</style>
