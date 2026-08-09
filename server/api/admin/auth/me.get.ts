import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const session = await getAdminSession(event);
  
  if (!session.data.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Sesi tidak valid atau telah berakhir',
    });
  }

  try {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.id, session.data.id),
      columns: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Pengguna tidak ditemukan',
      });
    }

    return {
      success: true,
      message: 'Data sesi admin divalidasi',
      data: user
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
    });
  }
});
