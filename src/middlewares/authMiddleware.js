import apiRaw from '@/api/raw'
import { useUserStore } from '@/stores/user'

export async function authMiddleware(to, from, next) {
  const requiresAuth = to.meta.requiresAuth
  const requiresGuest = to.meta.requiresGuest
  const userStore = useUserStore()

  const checkAuth = async () => {
    try {
      const { data: response } = await apiRaw.get('/verify/me')

      if (response.data?.username) {
        userStore.username = response.data.username
      } else {
        userStore.username = ''
      }

      return true
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          await apiRaw.post('/auth/refresh-token')
          await apiRaw.get('/verify/me')
          return true
        } catch {
          return false
        }
      }

      return false
    }
  }

  const isAuthenticated = await checkAuth()

  if (requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  if (requiresGuest && isAuthenticated) {
    return next('/')
  }

  return next()
}
