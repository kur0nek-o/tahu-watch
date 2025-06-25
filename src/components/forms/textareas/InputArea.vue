<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div :class="['mt-1', error ? 'relative rounded-md shadow-sm' : '']">
      <textarea
        :id="id"
        :name="id"
        :readonly="readonly"
        :maxlength="maxlength"
        :rows="rows"
        :placeholder="placeholder"
        :autocomplete="autocomplete ? 'on' : 'off'"
        :autofocus="autofocus"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${id}-error` : null"
        v-bind="$attrs"
        v-model="model"
        :class="[
          'block w-full rounded-md sm:text-sm read-only:cursor-not-allowed read-only:border-gray-200 read-only:bg-gray-100 read-only:text-gray-500',
          error
            ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
            : 'border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500',
        ]"
      ></textarea>

      <div
        v-if="error"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
      </div>
    </div>

    <p v-if="helpText" class="mt-2 text-sm text-gray-500" :id="`${id}-description`">
      {{ helpText }}
    </p>

    <p v-if="error" class="mt-2 text-sm text-red-600" :id="`${id}-error`">{{ error }}</p>
  </div>
</template>

<script setup>
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'

defineProps({
  id: { type: String, required: true },
  label: { type: String },
  helpText: { type: String, default: '' },
  placeholder: { type: String },
  error: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  autocomplete: { type: Boolean },
  autofocus: { type: Boolean },
  maxlength: { type: Number, default: 500 },
  rows: { type: Number, default: 4 },
})

const model = defineModel({
  type: String,
  default: '',
})
</script>
