<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-6 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-3xl transform overflow-visible rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="text-2xl font-semibold text-gray-900 mb-4">
                {{ isEdit ? 'Edit Film' : 'Tambahkan Film Baru' }}
              </DialogTitle>

              <form
                class="space-y-4"
                @submit.prevent="isEdit ? edit(form, reviewId) : create(form)"
              >
                <InputText
                  id="title"
                  label="Judul"
                  placeholder="Masukkan judul"
                  @input="slugify($event.target.value)"
                  v-model="form.title"
                  :autofocus="true"
                  :error="errors?.title"
                />

                <InputText
                  id="slug"
                  label="Slug"
                  :readonly="true"
                  placeholder="Masukkan judul"
                  v-model="form.slug"
                  helpText="Slug akan otomatis dihasilkan dari judul."
                  :error="errors?.slug"
                />

                <div>
                  <span class="text-base font-medium text-gray-900">Status</span>
                  <p class="text-sm leading-5 text-gray-500">
                    Status dari film yang akan ditambahkan.
                  </p>

                  <fieldset class="mt-4">
                    <legend class="sr-only">Status Film</legend>

                    <div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                      <div v-for="status in statusFilm" :key="status.id" class="flex items-center">
                        <input
                          :id="status.id"
                          name="status"
                          type="radio"
                          :value="status.value"
                          v-model="form.status"
                          class="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <label
                          :for="status.id"
                          class="ml-3 block text-sm font-medium text-gray-700"
                          >{{ status.title }}</label
                        >
                      </div>
                    </div>
                  </fieldset>
                </div>

                <InputText
                  id="coverImage"
                  label="Cover Image URL"
                  placeholder="Masukkan cover image URL"
                  v-model="form.coverImage"
                  :error="errors?.coverImage"
                  @input="clearError('coverImage')"
                />

                <InputTextarea
                  id="description"
                  label="Deskripsi singkat"
                  placeholder="Tulis deskripsi singkat..."
                  v-model="form.description"
                  helpText="Maksimal untuk deskripsi adalah 150 karakter."
                  :maxlength="150"
                  :rows="2"
                  :error="errors?.description"
                  @input="clearError('description')"
                />

                <div class="relative z-10">
                  <QuillEditor
                    v-if="editorReady"
                    ref="editorRef"
                    v-model:content="form.content"
                    theme="snow"
                    toolbar="essential"
                    contentType="html"
                    class="bg-white min-h-[200px]"
                  />
                </div>

                <div class="mt-6 flex justify-end space-x-3">
                  <SecondaryButton
                    :disabled="loading"
                    @click="emit('update:isOpen', false)"
                    type="button"
                    >Batal</SecondaryButton
                  >
                  <PrimaryButton :loading="loading" type="submit">Simpan</PrimaryButton>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

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
import '@vueup/vue-quill/dist/vue-quill.snow.css'

import { useReview } from '@/composables/useReview'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { QuillEditor } from '@vueup/vue-quill'
import { computed, nextTick, reactive, ref, watch } from 'vue'

import SecondaryButton from '@/components/elements/buttons/DangerButtom.vue'
import PrimaryButton from '@/components/elements/buttons/PrimaryButton.vue'
import InputText from '@/components/forms/input-groups/InputText.vue'
import InputTextarea from '@/components/forms/textareas/InputArea.vue'
import ConfirmModal from '@/components/overlays/modal-dialogs/ConfirmModal.vue'
import LoadingModal from '@/components/overlays/modal-dialogs/LoadingModal.vue'

const props = defineProps({
  isOpen: Boolean,
  callback: Function,
  slug: {
    type: String,
    default: '',
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
})

const { clearError, create, edit, resetState, getBySlug, errors, loading, message, status, data } =
  useReview()

const editorReady = ref(false)
const isAllowedConfirm = ref(false)
const isInitialMount = ref(true)

const confirmTitle = computed(() => {
  return status.value ? 'Berhasil' : 'Gagal'
})

const isConfirmOpen = computed(() => {
  return !!message.value && isAllowedConfirm.value
})

const confirmVariant = computed(() => {
  return status.value ? 'success' : 'error'
})

const statusFilm = [
  { id: 'watched', title: 'Selesai Ditonton', value: true },
  { id: 'unwatched', title: 'Belum Ditonton', value: false },
]

const emit = defineEmits(['update:isOpen'])

const reviewId = ref('')
const form = reactive({
  title: '',
  slug: '',
  status: false,
  coverImage: '',
  description: '',
  content: '',
})

const resetForm = () => {
  reviewId.value = ''

  form.title = ''
  form.slug = ''
  form.status = false
  form.coverImage = ''
  form.description = ''
  form.content = ''
}

const slugify = (text) => {
  form.slug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-)|(-$)/g, '')

  clearError('title')
  clearError('slug')
}

const setConfirmOpen = (val) => {
  message.value = ''

  if (status.value) {
    emit('update:isOpen', val)
    props.callback?.({ reset: true })
  }

  if (!status.value && isInitialMount.value) {
    emit('update:isOpen', val)
  }
}

watch(
  () => props.isOpen,
  async (val) => {
    if (val) {
      isInitialMount.value = true
      isAllowedConfirm.value = false

      nextTick(() => {
        setTimeout(() => {
          editorReady.value = true
        }, 200)
      })

      if (props.isEdit) {
        await getBySlug(props.slug)

        if (status.value) {
          const response = data.value

          reviewId.value = response?._id || ''

          form.title = response?.title || ''
          form.slug = response?.slug || ''
          form.status = response?.status || false
          form.coverImage = response?.coverImage || ''
          form.description = response?.description || ''
          form.content = response?.content || ''

          slugify(response?.title || '')
          resetState()

          isInitialMount.value = false
        }

        setTimeout(() => {
          isAllowedConfirm.value = true
        }, 500)
      } else {
        resetState()
        resetForm()

        isAllowedConfirm.value = true
        isInitialMount.value = false
      }
    } else {
      editorReady.value = false
    }
  },
)
</script>
