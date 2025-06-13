<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-4xl">
      <header class="flex flex-col gap-8">
        <div class="flex gap-3 items-center justify-center p-8">
          <img class="h-12" :src="Logo" alt="Tahu Watch" />
          <h1 class="font-bold text-3xl text-gray-900">
            Tahu<span class="italic font-medium">Watch</span>
          </h1>
        </div>

        <div class="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-6">
          <article>
            <h2 class="text-3xl font-extrabold tracking-tight text-gray-900">
              Selamat datang, User!
            </h2>
            <p class="mt-2 text-base text-gray-700">
              Kelola, dan ulas film favorit Anda dengan mudah di Tahu Watch. Nikmati pengalaman
              menonton yang lebih terorganisir dan personal.
            </p>
          </article>

          <div class="flex justify-center md:justify-end">
            <div
              class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600"
            >
              U
            </div>
          </div>
        </div>
      </header>

      <main class="mt-6">
        <PrimaryButton>Tambah Film</PrimaryButton>

        <div class="flex mt-3 gap-x-3">
          <InputText id="search" placeholder="Cari film yang sudah Anda catat..." class="w-full" />

          <select
            id="status"
            name="status"
            class="mt-1 block w-fit rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          >
            <option selected="">Semua Status</option>
            <option>Selesai Ditonton</option>
            <option>Belum Ditonton</option>
          </select>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-3">
          <div class="overflow-hidden rounded-lg bg-white shadow cursor-pointer">
            <div class="relative">
              <img
                src="https://statik.tempo.co/data/2023/07/16/id_1220101/1220101_720.jpg"
                alt="Poster Film"
                class="w-full h-64 object-cover"
              />
              <span
                class="absolute top-2 right-2 bg-primary-500 text-white text-xs font-semibold px-2 py-1 rounded"
              >
                Selesai Ditonton
              </span>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-bold text-gray-900">JUDUL FILM</h3>
              <p class="text-xs text-gray-500 mb-2">Ditambahkan pada 12 Juni 2024</p>
              <p class="text-sm text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe similique adipisci
                dolorem eum, obcaecati facere iure culpa delectus velit labore!
              </p>
            </div>
          </div>

          <div class="overflow-hidden rounded-lg bg-white shadow cursor-pointer">
            <div class="relative">
              <img
                src="https://images8.alphacoders.com/136/1365588.jpeg"
                alt="Poster Film"
                class="w-full h-64 object-cover"
              />
              <span
                class="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded"
              >
                Belum Ditonton
              </span>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-bold text-gray-900">JUDUL FILM</h3>
              <p class="text-xs text-gray-500 mb-2">Ditambahkan pada 12 Juni 2024</p>
              <p class="text-sm text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe similique adipisci
                dolorem eum, obcaecati facere iure culpa delectus velit labore!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Logo from '@/assets/images/logo.png'
import PrimaryButton from '@/components/elements/buttons/PrimaryButton.vue'
import InputText from '@/components/forms/input-groups/InputText.vue'
</script>
