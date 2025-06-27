<template>
  <div class="mx-auto max-w-3xl px-4 py-12" v-if="!loading">
    <!-- Title -->
    <h1 class="text-4xl font-bold mb-4 leading-tight">
      {{ data?.title }}
    </h1>
    <!-- Meta Info -->
    <div class="flex items-center text-gray-500 text-sm mb-8">
      <span>{{ formattedDate }}</span>
      <span class="mx-2">·</span>
      <span>oleh {{ data?.userId.username }}</span>
      <span class="mx-2">·</span>
      <span>{{ estimatedReadTime }}</span>
    </div>
    <!-- Cover Image -->
    <img
      v-if="!imageError"
      :src="data?.coverImage"
      alt="Cover"
      class="w-full h-96 object-cover rounded-lg mb-8 shadow"
      @error="imageError = true"
    />
    <div
      v-else
      class="w-full h-96 flex items-center justify-center bg-gray-200 rounded-lg mb-8 text-gray-500 text-sm font-semibold"
    >
      No Image Available
    </div>
    <!-- Content -->
    <article class="prose prose-lg max-w-none">
      <p class="mb-5">{{ data?.description }}</p>

      <div v-html="data?.content"></div>
    </article>
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
import { useReview } from '@/composables/useReview'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ConfirmModal from '@/components/overlays/modal-dialogs/ConfirmModal.vue'
import LoadingModal from '@/components/overlays/modal-dialogs/LoadingModal.vue'

const route = useRoute()
const router = useRouter()

const { data, loading, status, message, getBySlug } = useReview()

const imageError = ref(false)

const confirmTitle = computed(() => {
  return 'Gagal'
})

const isConfirmOpen = computed(() => {
  return !status.value
})

const confirmVariant = computed(() => {
  return 'error'
})

const setConfirmOpen = () => {
  status.value = true
  router.push('/')
}

const countWords = (html) => {
  const text = html
    ? html
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim()
    : ''
  return text.split(' ').filter(Boolean).length
}

const estimatedReadTime = computed(() => {
  const content = data.value?.content || ''
  const description = data.value?.description || ''
  const totalText = content + ' ' + description

  const wordCount = countWords(totalText)
  const minutes = Math.ceil(wordCount / 200)

  return `${minutes || 1} menit membaca`
})

const formattedDate = computed(() => {
  if (!data.value || !data.value.createdAt) return ''

  const date = new Date(data.value.createdAt)

  const month = date.toLocaleString('id-ID', { month: 'long' })
  const day = date.getDate()
  const year = date.getFullYear()

  return `${month} ${day}, ${year}`
})

onMounted(async () => {
  const slug = route.query.slug

  await getBySlug(slug)
})
</script>
