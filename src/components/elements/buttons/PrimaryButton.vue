<template>
  <button :type="type" :class="buttonClass">
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value),
  },
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value),
  },
})

const sizeClasses = {
  sm: 'rounded px-2.5 py-1.5 text-xs',
  md: 'rounded-md px-3 py-2 text-sm leading-4',
  lg: 'rounded-md px-4 py-2 text-sm',
  xl: 'rounded-md px-6 py-3 text-base',
}

const buttonClass = computed(() =>
  [
    'cursor-pointer inline-flex justify-center items-center border border-transparent bg-primary-600 font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    sizeClasses[props.size] || sizeClasses.md,
  ].join(' '),
)
</script>
