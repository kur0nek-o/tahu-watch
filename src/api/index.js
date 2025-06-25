import router from '@/router'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, tokenRefreshed = true) => {
  failedQueue.forEach((promise) => {
    if (tokenRefreshed) {
      promise.resolve()
    } else {
      promise.reject(error)
    }
  })

  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        console.log('Sedang menunggu token baru...')

        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err))
      }

      isRefreshing = true

      try {
        console.log('Mencoba refresh token...')

        const test = await api.post('/auth/refresh-token')

        console.log('Token berhasil di-refresh:', test.data)

        console.log('Token berhasil di-refresh')

        processQueue(null, true)
        return api(originalRequest)
      } catch (refreshError) {
        console.log('Gagal refresh token:', refreshError.message)
        processQueue(refreshError, false)
        router.push('/login')
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    if (error.response && error.response.status === 403) {
      console.warn('403 Forbidden refresh token tidak valid')
      router.push('/login')
    }

    return Promise.reject(error)
  },
)

export default api
