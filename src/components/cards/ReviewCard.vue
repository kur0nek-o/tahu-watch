<template>
  <div
    class="overflow-hidden rounded-lg bg-white shadow cursor-pointer h-[420px] flex flex-col"
    @click="redirectToDetail"
  >
    <div class="relative w-full h-64">
      <img
        v-if="!imageError"
        :src="coverImage"
        :alt="`Poster ${title}`"
        class="w-full h-full object-cover absolute inset-0"
        @error="imageError = true"
      />

      <div
        v-else
        class="w-full h-full flex items-center justify-center bg-gray-200 absolute inset-0 text-gray-500 text-sm font-semibold"
      >
        No Image
      </div>

      <span
        class="absolute top-2 right-2 text-white text-xs font-semibold px-2 py-1 rounded"
        :class="{
          'bg-primary-500': watchedStatus === 'watched',
          'bg-red-500': watchedStatus === 'unwatched',
        }"
      >
        {{ watchedStatus === 'watched' ? 'Selesai Ditonton' : 'Belum Ditonton' }}
      </span>
    </div>

    <div class="px-4 py-5 sm:p-6 flex-1 flex flex-col">
      <h3 class="text-lg font-bold text-gray-900">{{ title }}</h3>
      <p class="text-xs text-gray-500 mb-2">Ditambahkan pada {{ formattedAddedAt }}</p>
      <p class="text-sm text-gray-700 line-clamp-5">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup>
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
})

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
