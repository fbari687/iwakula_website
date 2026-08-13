import mysql from "mysql2/promise";

export default defineEventHandler(async () => {
  // Aktifkan hanya di production saat debugging
  if (process.env.NODE_ENV !== "production") {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
    });
  }

  try {
    const url = process.env.DATABASE_URL;

    if (!url) {
      return {
        success: false,
        error: "DATABASE_URL is not defined",
      };
    }

    const parsed = new URL(url);

    const connection = await mysql.createConnection(url);

    const [rows] = await connection.query("SELECT DATABASE() as db, NOW() as serverTime");

    await connection.end();

    return {
      success: true,
      host: parsed.hostname,
      port: parsed.port || "3306",
      database: parsed.pathname.replace(/^\//, ""),
      user: parsed.username,
      server: Array.isArray(rows) ? rows[0] : rows,
    };
  } catch (err: any) {
    let host = null;
    let database = null;
    let user = null;

    try {
      const parsed = new URL(process.env.DATABASE_URL || "");
      host = parsed.hostname;
      database: parsed.pathname.replace(/^\//, ""),
      user = parsed.username;
    } catch {}

    return {
      success: false,
      code: err.code || null,
      errno: err.errno || null,
      sqlState: err.sqlState || null,
      message: err.message,
      host,
      database,
      user,
    };
  }
});