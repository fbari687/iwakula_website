export default defineNuxtRouteMiddleware(async (to) => {
  const { user, fetchUser } = useAuth()

  const isAdminRoute = to.path.startsWith('/admin')
  const isLoginPage = to.path === '/admin/login'

  if (isAdminRoute) {
    // Jika state user belum ada di memori, verifikasi cookie session dengan backend (/api/admin/auth/me)
    if (!user.value) {
      await fetchUser()
    }

    if (isLoginPage) {
      // Jika pengguna sudah terautentikasi dan mencoba mengakses /admin/login,
      // alihkan langsung ke dasbor SEBELUM komponen login sempat di-render
      if (user.value) {
        return navigateTo('/admin')
      }
    } else {
      // Jika pengguna belum terautentikasi dan mencoba mengakses rute admin manapun,
      // alihkan ke halaman login
      if (!user.value) {
        return navigateTo('/admin/login')
      }
    }
  }
})
