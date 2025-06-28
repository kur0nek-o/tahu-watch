<template>
  <div class="rounded-lg bg-white shadow h-[420px] flex flex-col">
    <div class="relative w-full h-64">
      <img
        v-if="!imageError"
        :src="coverImage"
        :alt="`Poster ${title}`"
        class="w-full h-full object-cover absolute inset-0 rounded-t-lg"
        @error="imageError = true"
      />

      <div
        v-else
        class="w-full h-full flex items-center justify-center bg-gray-200 absolute inset-0 text-gray-500 text-sm font-semibold rounded-t-lg"
      >
        No Image
      </div>

      <div class="absolute top-2 right-2 flex gap-2 items-start">
        <div
          class="text-white text-xs font-semibold px-2 py-1 rounded"
          :class="{
            'bg-primary-500': watchedStatus === 'watched',
            'bg-red-500': watchedStatus === 'unwatched',
          }"
        >
          {{ watchedStatus === 'watched' ? 'Selesai Ditonton' : 'Belum Ditonton' }}
        </div>

        <Popover class="relative">
          <div class="flex justify-center md:justify-end">
            <PopoverButton
              class="rounded-full h-6 w-6 p-1 bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600 cursor-pointer"
            >
              <Cog6ToothIcon />
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
                <div class="bg-gray-50 p-2 space-y-1">
                  <button
                    type="button"
                    @click="emit('open:edit', slug)"
                    class="flow-root cursor-pointer w-full rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-blue-700 text-primary-700 hover:text-white"
                  >
                    <span class="flex items-center">
                      <PencilSquareIcon class="w-4 h-4 mr-1" />

                      <span class="text-xs font-medium">Edit</span>
                    </span>
                  </button>

                  <button
                    type="button"
                    @click="deleteReview(slug)"
                    class="flow-root cursor-pointer w-full rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-red-700 text-primary-700 hover:text-white"
                  >
                    <span class="flex items-center">
                      <TrashIcon class="w-4 h-4 mr-1" />

                      <span class="text-xs font-medium">Hapus</span>
                    </span>
                  </button>
                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
      </div>
    </div>

    <div class="px-4 py-5 sm:p-6 flex-1 flex flex-col cursor-pointer" @click="redirectToDetail">
      <h3 class="text-lg font-bold text-gray-900">{{ title }}</h3>
      <p class="text-xs text-gray-500 mb-2">Ditambahkan pada {{ formattedAddedAt }}</p>
      <p class="text-sm text-gray-700 line-clamp-5">
        {{ description }}
      </p>
    </div>
  </div>

  <LoadingModal :is-open="loading" />

  <ConfirmModal
    :is-open="isConfirmOpen"
    :title="confirmTitle"
    :description="message"
    :variant="confirmVariant"
    @update:isOpen="setConfirmOpen"
  />
</template>

<script setup>
import ConfirmModal from '@/components/overlays/modal-dialogs/ConfirmModal.vue'
import LoadingModal from '@/components/overlays/modal-dialogs/LoadingModal.vue'

import { useReview } from '@/composables/useReview'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { Cog6ToothIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  addedAt: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  watchedStatus: {
    type: String,
    default: 'unwatched',
  },
  callback: {
    type: Function,
    default: null,
  },
})

const emit = defineEmits(['open:edit'])

const { deleteReview, loading, status, message } = useReview()

const confirmTitle = computed(() => {
  return status.value ? 'Berhasil' : 'Gagal'
})

const isConfirmOpen = computed(() => {
  return !!message.value
})

const confirmVariant = computed(() => {
  return status.value ? 'success' : 'error'
})

const setConfirmOpen = () => {
  message.value = ''

  if (status.value) {
    props.callback?.({ reset: true })
  }
}

const formattedAddedAt = computed(() => {
  const date = new Date(props.addedAt)

  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

const router = useRouter()
const imageError = ref(false)

const redirectToDetail = () => {
  const { slug, username } = props

  router.push({
    name: 'detail',
    params: { username },
    query: { slug },
  })
}
</script>
