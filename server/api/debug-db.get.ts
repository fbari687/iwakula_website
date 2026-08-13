export default defineEventHandler(() => {
  const url = process.env.DATABASE_URL;

  if (!url) {
    return { success: false, error: "DATABASE_URL is not defined" };
  }

  const parsed = new URL(url);

  return {
    success: true,
    host: parsed.hostname,
    port: parsed.port,
    database: parsed.pathname.replace(/^\//, ""),
    user: parsed.username,
    passwordLength: parsed.password.length,
    rawStartsWith: url.substring(0, 30),
  };
});