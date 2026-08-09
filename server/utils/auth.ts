import bcrypt from 'bcrypt';
import type { H3Event } from 'h3';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

const getSessionConfig = () => {
  const config = useRuntimeConfig();
  return {
    name: 'iwakula_admin_session',
    password: config.sessionSecret as string,
    cookie: {
      maxAge: 60 * 60 * 24, // 1 Day
      sameSite: 'lax' as const,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      path: '/'
    }
  };
};

// Abstrak pengelolaan sesi admin menggunakan H3 useSession
export const getAdminSession = async (event: H3Event) => {
  return await useSession<{ id?: number }>(event, getSessionConfig());
};
