<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-50">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <div>
                <div
                  v-if="variant === 'success'"
                  class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
                >
                  <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>

                <div
                  v-if="variant === 'error'"
                  class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100"
                >
                  <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>

                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">{{
                    title
                  }}</DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      {{ description }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6">
                <PrimaryButton
                  v-if="variant === 'success'"
                  class="w-full"
                  type="button"
                  @click="emit('update:isOpen', false)"
                >
                  Oke
                </PrimaryButton>

                <DangerButtom
                  v-if="variant === 'error'"
                  class="w-full"
                  type="button"
                  @click="emit('update:isOpen', false)"
                >
                  Oke
                </DangerButtom>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

import DangerButtom from '@/components/elements/buttons/DangerButtom.vue'
import PrimaryButton from '@/components/elements/buttons/PrimaryButton.vue'

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    validator: (value) => ['success', 'error'].includes(value),
    default: 'success',
  },
})

const emit = defineEmits(['update:isOpen'])
</script>
