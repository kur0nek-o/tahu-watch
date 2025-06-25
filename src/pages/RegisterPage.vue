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
        Daftar ke TahuWatch
      </h2>

      <p class="mt-2 text-center text-sm text-gray-600">
        Sudah punya akun?
        <RouterLink to="/" class="font-medium text-primary-600 hover:text-primary-500">
          Masuk ke akun Anda
        </RouterLink>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="register(form, resetForm)">
          <AlertDesc
            title="Penting!"
            description="Ini hanyalah web demonstrasi. Jangan gunakan data pribadi Anda."
          />

          <AlertDesc
            v-if="generalError"
            variant="error"
            title="Gagal"
            :description="generalError"
          />

          <AlertDesc
            v-if="successMessage"
            variant="success"
            title="Berhasil"
            :description="successMessage"
          />

          <InputText
            id="email"
            label="Email"
            :autofocus="true"
            placeholder="Masukkan email Anda"
            v-model="form.email"
            :error="errors?.email"
            @input="clearError('email')"
          />

          <InputText
            id="username"
            label="Nama Pengguna"
            placeholder="Masukkan nama pengguna Anda"
            v-model="form.username"
            :error="errors?.username"
            @input="clearError('username')"
          />

          <InputPassword
            id="password"
            label="Kata Sandi"
            placeholder="Masukkan kata sandi Anda"
            v-model="form.password"
            :error="errors?.password"
            @input="clearError('password')"
          />

          <InputPassword
            id="confirm-password"
            label="Konfirmasi Kata Sandi"
            placeholder="Konfirmasi kata sandi Anda"
            v-model="form.confirmPassword"
            :error="errors?.confirmPassword"
            @input="clearError('confirmPassword')"
          />

          <div>
            <PrimaryButton :loading="loading" type="submit" class="w-full">Daftar</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRegister } from '@/composables/useRegister'
import { reactive } from 'vue'

import Logo from '@/assets/images/logo.png'
import PrimaryButton from '@/components/elements/buttons/PrimaryButton.vue'
import AlertDesc from '@/components/feedback/alerts/AlertDesc.vue'
import InputPassword from '@/components/forms/input-groups/InputPassword.vue'
import InputText from '@/components/forms/input-groups/InputText.vue'

const { register, clearError, errors, loading, generalError, successMessage } = useRegister()

const form = reactive({
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
})

const resetForm = () => {
  form.email = ''
  form.username = ''
  form.password = ''
  form.confirmPassword = ''
}
</script>
