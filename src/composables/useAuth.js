import api from '@/api'

import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export function useAuth() {
  const router = useRouter()

  const loading = ref(false)
  const generalError = ref('')
  const errors = reactive({})

  const resetErrors = () => {
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

  const login = async (email, password) => {
    resetErrors()
    loading.value = true

    try {
      const { data } = await api.post(
        '/auth/login',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!data.status) {
        throw new Error(data.message)
      }

      router.push('/')
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

  const logout = async () => {
    try {
      await api.post('/auth/logout')

      router.push('/login')
    } catch (err) {
      console.error('Gagal logout:', err)
    }
  }

  return {
    login,
    logout,
    clearError,
    loading,
    generalError,
    errors,
  }
}
