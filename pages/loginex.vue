<template>
    <div class="login-page">
      <div class="login-card">
        <h2 class="login-title">Login</h2>
        <v-text-field
          label="Email"
          outlined
          dense
          class="login-input"
        ></v-text-field>
        <v-text-field
          label="Password"
          type="password"
          outlined
          dense
          class="login-input"
        ></v-text-field>
        <div class="login-options">
          <v-checkbox
            label="Remember Me"
            class="login-checkbox"
            dense
          ></v-checkbox>
          <a href="#" class="forgot-password">Forget Password</a>
        </div>
        <v-btn class="login-button rainbow-button login-card" large>Log in</v-btn>
        <p class="register-text">
          Don’t have an account? <a href="#">Register</a>
        </p>
      </div>
    </div>
  </template>
  <script>
  export default {
    layout: 'default',
  }
  </script>
  
  <style scoped>
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    background: url('https://cdn.ghostmarket.io/ext-full/arweave_net_BaK-Ro09sMyPHwNtEZ-AJP61kriOqKbnvdDsKhuCwnw')
      no-repeat center center;
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
      #ff80bf,
      #ff66b3,
      #ff704d,
      #ff5c33,
      #ffd633,
      #ffd11a,
      #ffff66,
      #ffff00,
      #4dff4d,
      #1aff1a,
      #6666ff,
      #4d4dff,
      #4da6ff,
      #66b3ff,
      #66ffff,
      #4dffff,
      #ffccff,
      #ff99ff,
      #ff80bf,
      #ff66b3,
      #ff704d,
      #ffd633,
      #ffd11a,
      #ffff66,
      #ffff00,
      #4dff4d,
      #1aff1a,
      #66b3ff,
      #4dffff
    );
    color: #fff;
    background-size: 200% 200%;
    animation: rainbow-animation 18s linear infinite;
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
    color: #fff;
    font-weight: bold;
    text-decoration: none;
  }
  </style>
