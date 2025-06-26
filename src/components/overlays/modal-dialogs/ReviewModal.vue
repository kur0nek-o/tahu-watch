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
                Tambahkan Film Baru
              </DialogTitle>

              <form class="space-y-4" @submit.prevent="handleSubmit">
                <InputText
                  id="title"
                  label="Judul"
                  placeholder="Masukkan judul"
                  @input="slugify($event.target.value)"
                  v-model="form.title"
                  :autofocus="true"
                />

                <InputText
                  id="slug"
                  label="Slug"
                  :readonly="true"
                  placeholder="Masukkan judul"
                  v-model="form.slug"
                  helpText="Slug akan otomatis dihasilkan dari judul."
                />

                <InputText
                  id="coverImage"
                  label="Cover Image URL"
                  placeholder="Masukkan cover image URL"
                  v-model="form.coverImage"
                />

                <InputTextarea
                  id="description"
                  label="Deskripsi singkat"
                  placeholder="Tulis deskripsi singkat..."
                  v-model="form.description"
                  helpText="Maksimal untuk deskripsi adalah 150 karakter."
                  :maxlength="150"
                  :rows="2"
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
                  <SecondaryButton @click="emit('update:isOpen', false)" type="button"
                    >Batal</SecondaryButton
                  >
                  <PrimaryButton type="submit">Simpan</PrimaryButton>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import '@vueup/vue-quill/dist/vue-quill.snow.css'

import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { QuillEditor } from '@vueup/vue-quill'
import { nextTick, reactive, ref, watch } from 'vue'

import SecondaryButton from '@/components/elements/buttons/DangerButtom.vue'
import PrimaryButton from '@/components/elements/buttons/PrimaryButton.vue'
import InputText from '@/components/forms/input-groups/InputText.vue'
import InputTextarea from '@/components/forms/textareas/InputArea.vue'

const props = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['update:isOpen'])
const editorReady = ref(false)

const form = reactive({
  title: '',
  slug: '',
  coverImage: '',
  description: '',
  content: '',
})

const slugify = (text) => {
  form.slug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-)|(-$)/g, '')
}

watch(
  () => props.isOpen,
  (val) => {
    if (val) {
      nextTick(() => {
        setTimeout(() => {
          editorReady.value = true
        }, 200)
      })
    } else {
      editorReady.value = false
    }
  },
)

function handleSubmit() {
  console.log('Form data:', form)
}
</script>
