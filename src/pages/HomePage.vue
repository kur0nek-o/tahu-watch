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
              Selamat datang, {{ username }}!
            </h2>
            <p class="mt-2 text-base text-gray-700">
              Kelola, dan ulas film favorit Anda dengan mudah di Tahu Watch. Nikmati pengalaman
              menonton yang lebih terorganisir dan personal.
            </p>
          </article>

          <Popover class="relative">
            <div class="flex justify-center md:justify-end">
              <PopoverButton
                class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600 cursor-pointer"
              >
                {{ userInitial }}
              </PopoverButton>
            </div>

            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="translate-y-1 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="translate-y-1 opacity-0"
            >
              <PopoverPanel
                class="absolute left-1/2 z-10 mt-3 -translate-x-1/2 transform px-4 sm:px-0"
              >
                <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                  <div class="bg-gray-50 p-4">
                    <button
                      type="button"
                      @click="logout"
                      class="flow-root cursor-pointer rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-red-700 text-primary-700 hover:text-white"
                    >
                      <span class="flex items-center">
                        <span class="text-sm font-medium">Logout</span>
                      </span>
                    </button>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
        </div>
      </header>

      <main class="mt-6">
        <PrimaryButton type="button" @click="showModal = true">Tambah Film</PrimaryButton>

        <div class="flex mt-3 gap-x-3">
          <InputText
            v-model="filter.keyword"
            :autofocus="true"
            id="search"
            placeholder="Cari film yang sudah Anda catat..."
            class="w-full"
          />

          <select
            id="status"
            name="status"
            class="mt-1 block w-fit rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            v-model="filter.status"
          >
            <option value="" selected>Semua Status</option>
            <option value="watched">Selesai Ditonton</option>
            <option value="unwatched">Belum Ditonton</option>
          </select>
        </div>

        <div class="mt-6 pb-10">
          <div class="flex items-center justify-center py-10" v-if="!datas.length && !loading">
            <span class="text-gray-500 text-sm">Tidak ada data yang ditemukan.</span>
          </div>

          <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3" v-else>
            <ReviewCard
              v-for="(data, index) in datas"
              :key="index"
              :username="data.userId.username"
              :slug="data.slug"
              :title="data.title"
              :coverImage="data.coverImage"
              :addedAt="data.createdAt"
              :description="data.description"
              :watchedStatus="data.status ? 'watched' : 'unwatched'"
              :callback="all"
            />
          </div>

          <div v-if="hasMore && !loading && datas.length" ref="sentinel" class="h-10"></div>

          <div v-if="loading" class="flex items-center justify-center mt-6">
            <output>
              <svg
                aria-hidden="true"
                class="inline w-4 h-4 me-2 text-primary animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            </output>

            <span class="text-gray-500 text-xs"> Memuat data, harap tunggu... </span>
          </div>
        </div>
      </main>
    </div>
  </div>

  <ReviewModal v-model:isOpen="showModal" :callback="all" />

  <ConfirmModal
    :is-open="isConfirmOpen"
    :title="confirmTitle"
    :description="message"
    :variant="confirmVariant"
    @update:isOpen="setConfirmOpen"
  />
</template>

<script setup>
import Logo from '@/assets/images/logo.png'
import ReviewCard from '@/components/cards/ReviewCard.vue'
import PrimaryButton from '@/components/elements/buttons/PrimaryButton.vue'
import InputText from '@/components/forms/input-groups/InputText.vue'
import ConfirmModal from '@/components/overlays/modal-dialogs/ConfirmModal.vue'
import ReviewModal from '@/components/overlays/modal-dialogs/ReviewModal.vue'

import { useAuth } from '@/composables/useAuth'
import { useDebounce } from '@/composables/useDebounce'
import { useReview } from '@/composables/useReview'
import { useUserStore } from '@/stores/user'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const { logout } = useAuth()
const { datas, loading, hasMore, all, filter, status, message } = useReview()

const sentinel = ref(null)
const userStore = useUserStore()
const showModal = ref(false)

const debouncedKeyword = useDebounce(() => filter.keyword, 500)
const debouncedStatus = useDebounce(() => filter.status, 300)

const confirmTitle = computed(() => {
  return 'Gagal'
})

const isConfirmOpen = computed(() => {
  return !status.value
})

const confirmVariant = computed(() => {
  return 'error'
})

const userInitial = computed(() => {
  return userStore.username.charAt(0).toUpperCase()
})

const username = computed(() => {
  return userStore.username
})

const setConfirmOpen = () => {
  status.value = true
}

let observer

onMounted(() => {
  all({ reset: true })

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore.value && !loading.value) {
        all()
      }
    },
    { threshold: 1.0 },
  )
})

watch(sentinel, (el) => {
  if (el && observer) {
    observer.observe(el)
  }
})

onBeforeUnmount(() => {
  if (sentinel.value && observer) {
    observer.unobserve(sentinel.value)
  }
  observer?.disconnect()
})

watch([debouncedKeyword, debouncedStatus], () => {
  console.log('Filter changed:', filter.keyword, filter.status)

  all({ reset: true })
})
</script>
