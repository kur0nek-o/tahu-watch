<template>
  <div :class="alertClasses">
    <div class="flex">
      <div class="flex-shrink-0">
        <component :is="icon" :class="iconClasses" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 :class="titleClasses">{{ title }}</h3>
        <div :class="descClasses">
          <p>
            <slot>{{ description }}</slot>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/vue/20/solid'
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'warning',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

const variants = {
  warning: {
    bg: 'bg-yellow-50',
    icon: ExclamationTriangleIcon,
    iconColor: 'text-yellow-400',
    title: 'text-yellow-800',
    desc: 'text-yellow-700',
  },
  success: {
    bg: 'bg-green-50',
    icon: CheckCircleIcon,
    iconColor: 'text-green-400',
    title: 'text-green-800',
    desc: 'text-green-700',
  },
  error: {
    bg: 'bg-red-50',
    icon: XCircleIcon,
    iconColor: 'text-red-400',
    title: 'text-red-800',
    desc: 'text-red-700',
  },
  info: {
    bg: 'bg-blue-50',
    icon: InformationCircleIcon,
    iconColor: 'text-blue-400',
    title: 'text-blue-800',
    desc: 'text-blue-700',
  },
}

const alertClasses = computed(() => `rounded-md p-4 ${variants[props.variant].bg}`)
const icon = computed(() => variants[props.variant].icon)
const iconClasses = computed(() => `h-5 w-5 ${variants[props.variant].iconColor}`)
const titleClasses = computed(() => `text-sm font-medium ${variants[props.variant].title}`)
const descClasses = computed(() => `mt-2 text-sm ${variants[props.variant].desc}`)
</script>
