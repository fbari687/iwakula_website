export default defineEventHandler(async (event) => {
  const path = event.path;

  // Proteksi hanya pada route API admin
  if (path.startsWith('/api/admin/')) {
    
    // Whitelist rute login dan logout
    if (path.startsWith('/api/admin/auth/login') || path.startsWith('/api/admin/auth/logout')) {
      return;
    }

    // Ekstrak sesi (fungsi getAdminSession harusnya sudah ada dari Sprint 1A di server/utils/auth.ts)
    const session = await getAdminSession(event);

    // Jika tidak ada data id pada sesi, batalkan request
    if (!session.data.id) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized: Sesi tidak valid atau telah berakhir.',
      });
    }
  }
});
