<template>
  <div class="container">
    <div class="form-box">
      <div class="logo"></div>
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>Belum punya akun? <RouterLink to="/register">Buat akun</RouterLink></p>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
