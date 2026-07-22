export default defineEventHandler(async () => {
  try {
    // Ambil seluruh data kontak dari tabel contacts
    const contactsList = await db.query.contacts.findMany();

    // Kembalikan respon sukses beserta data kontak
    return {
      success: true,
      message: "Data kontak berhasil diambil",
      data: contactsList,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal mengambil data kontak dari server",
    });
  }
});
