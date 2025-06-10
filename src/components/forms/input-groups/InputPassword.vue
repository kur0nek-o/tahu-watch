<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div :class="['mt-1', error ? 'relative rounded-md shadow-sm' : '']">
      <input
        type="password"
        :name="id"
        :id="id"
        :class="[
          'block w-full rounded-md sm:text-sm',
          error
            ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
            : 'border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500',
        ]"
        :placeholder="placeholder"
        :autocomplete="autocomplete ? 'on' : 'off'"
        :autofocus="autofocus"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${id}-error` : null"
        v-bind="$attrs"
        v-model="model"
      />
      <div
        v-if="error"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
      </div>
    </div>
    <p v-if="error" class="mt-2 text-sm text-red-600" :id="`${id}-error`">{{ error }}</p>
  </div>
</template>

<script setup>
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'

defineProps({
  label: { type: String },
  placeholder: { type: String },
  autocomplete: { type: Boolean },
  autofocus: { type: Boolean },
  error: { type: String, default: '' },
  id: { type: String, required: true },
})

const model = defineModel({
  type: String,
  default: '',
})
</script>
