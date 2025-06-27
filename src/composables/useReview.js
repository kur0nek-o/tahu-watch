import api from '@/api'

import { reactive, ref } from 'vue'

export function useReview() {
  const loading = ref(false)
  const message = ref('')
  const status = ref(true)
  const datas = ref([])
  const data = ref(null)
  const hasMore = ref(true)
  const currentPage = ref(1)

  const filter = reactive({
    keyword: '',
    status: '',
  })

  const errors = reactive({})

  const resetState = () => {
    message.value = ''

    Object.keys(errors).forEach((key) => {
      errors[key] = ''
    })
  }

  const clearError = (field) => {
    if (errors[field]) {
      errors[field] = ''
    }
  }

  const all = async ({ reset = false } = {}) => {
    try {
      if (reset) {
        datas.value = []
        currentPage.value = 1
        hasMore.value = true
      }

      if (loading.value || !hasMore.value) return

      loading.value = true

      const { data: response } = await api.get('/reviews', {
        params: {
          page: currentPage.value,
          keyword: filter.keyword,
          status: filter.status,
        },
      })

      if (!response.status) throw new Error(response.message)

      if (reset) {
        datas.value = response.data
      } else {
        datas.value.push(...response.data)
      }

      hasMore.value = response.data.length > 0
      if (response.data.length > 0) currentPage.value++

      message.value = response.message
      status.value = response.status
    } catch (error) {
      message.value = error.message
      status.value = false
    } finally {
      loading.value = false
    }
  }

  const getBySlug = async (slug) => {
    resetState()
    loading.value = true

    try {
      const { data: response } = await api.get('/review', {
        params: { slug },
      })

      if (!response.status) {
        throw new Error(response.message)
      }

      data.value = response.data
      message.value = response.message
      status.value = response.status
    } catch (error) {
      message.value = error.message
      status.value = false
    } finally {
      loading.value = false
    }
  }

  const create = async (payload) => {
    resetState()
    loading.value = true

    try {
      const { data } = await api.post('/review', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!data.status) {
        throw new Error(data.message)
      }

      message.value = data.message
      status.value = data.status
    } catch (error) {
      const { response } = error

      if (response?.status === 400 && response.data?.errors) {
        Object.entries(response.data.errors).forEach(([field, message]) => {
          errors[field] = message
        })
      } else {
        message.value = error.message
        status.value = false
      }
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    message,
    errors,
    status,
    datas,
    data,
    hasMore,
    currentPage,
    filter,
    all,
    getBySlug,
    clearError,
    create,
    resetState,
  }
}
