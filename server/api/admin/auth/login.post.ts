import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email dan password diperlukan',
    });
  }

  try {
    // Cari user berdasarkan email
    const user = await db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Email atau password salah',
      });
    }

    // Verifikasi password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Email atau password salah',
      });
    }

    // Buat session cookie (sealSession)
    const session = await getAdminSession(event);
    await session.update({ id: user.id });

    return {
      success: true,
      message: 'Berhasil login',
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
    });
  }
});
