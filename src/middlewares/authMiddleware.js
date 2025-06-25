import apiRaw from '@/api/raw'

export async function authMiddleware(to, from, next) {
  const requiresAuth = to.meta.requiresAuth
  const requiresGuest = to.meta.requiresGuest

  try {
    await apiRaw.get('/verify/me')

    if (requiresGuest) {
      return next('/')
    }

    return next()
  } catch {
    if (requiresAuth) {
      return next('/login')
    }

    return next()
  }
}
