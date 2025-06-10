<template>
  <div class="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex gap-3 items-center justify-center">
        <img class="h-12" :src="Logo" alt="Tahu Watch" />
        <h1 class="font-bold text-3xl text-gray-900">
          Tahu<span class="italic font-medium">Watch</span>
        </h1>
      </div>

      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Masuk ke akun Anda
      </h2>

      <p class="mt-2 text-center text-sm text-gray-600">
        Belum punya akun?
        <RouterLink to="/register" class="font-medium text-primary-600 hover:text-primary-500">
          Buat akun baru
        </RouterLink>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="submitHandler">
          <InputText
            id="email"
            label="Email"
            :autofocus="true"
            placeholder="Masukkan email Anda"
            v-model="email"
          />

          <InputPassword
            id="password"
            label="Kata Sandi"
            placeholder="Masukkan kata sandi Anda"
            v-model="password"
          />

          <div>
            <PrimaryButton type="submit" class="w-full">Masuk</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import PrimaryButton from '@/components/elements/buttons/PrimaryButton.vue'
import InputText from '@/components/forms/input-groups/InputText.vue'
import InputPassword from '@/components/forms/input-groups/InputPassword.vue'
import Logo from '@/assets/images/logo.png'

const email = ref('')
const password = ref('')

const submitHandler = () => {
  console.log('Email:', email.value)
  console.log('Password:', password.value)

  console.log('Form submitted')
}
</script>
