<template>
  <div class="container">
    <div class="form-box">
      <div class="logo"></div>
      <h2>Register</h2>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Daftar</button>
      </form>
      <p>Sudah punya akun? <RouterLink to="/">Login</RouterLink></p>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
