export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, fetchUser } = useAuth()

  // Jika state user kosong, coba fetch data ke server (/api/admin/auth/me)
  if (!user.value) {
    await fetchUser()
  }

  // Jika data user tetap kosong setelah proses verifikasi, berarti sesi tidak valid / tamu
  if (!user.value) {
    return navigateTo('/admin/login')
  }
})
