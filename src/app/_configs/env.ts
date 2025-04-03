const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
  frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL ?? '',
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
};

export default env;