import { db } from "~~/server/utils/db";

export default defineEventHandler(async () => {
  try {
    const data = await db.query.achievements.findMany({
      orderBy: (achievements, { desc }) => [desc(achievements.createdAt)],
    });

    return {
      success: true,
      message: "Berhasil mengambil data pencapaian",
      data,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal mengambil data pencapaian dari server",
    });
  }
});
