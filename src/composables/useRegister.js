import api from '@/api'

import { reactive, ref } from 'vue'

export function useRegister() {
  const loading = ref(false)
  const successMessage = ref('')
  const generalError = ref('')
  const errors = reactive({})

  const resetState = () => {
    successMessage.value = ''
    generalError.value = ''
    Object.keys(errors).forEach((key) => {
      errors[key] = ''
    })
  }

  const clearError = (field) => {
    if (errors[field]) {
      errors[field] = ''
    }
  }

  const register = async (payload, onSuccess) => {
    resetState()
    loading.value = true

    try {
      const { data } = await api.post('/auth/register', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!data.status) {
        throw new Error(data.message)
      }

      successMessage.value = data.message

      if (typeof onSuccess === 'function') {
        onSuccess(data)
      }
    } catch (error) {
      const { response } = error

      if (response?.status === 400 && response.data?.errors) {
        Object.entries(response.data.errors).forEach(([field, message]) => {
          errors[field] = message
        })
      } else {
        generalError.value = error.message
      }
    } finally {
      loading.value = false
    }
  }

  return {
    register,
    clearError,
    loading,
    successMessage,
    generalError,
    errors,
  }
}
