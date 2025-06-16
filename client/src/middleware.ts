// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

import NextAuth from 'next-auth';
import authConfig from '@/lib/auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // Check if authentication should be bypassed
  const bypassAuth = process.env.BYPASS_AUTH === 'true';
  
  // If bypass is enabled, allow access without authentication
  if (bypassAuth) {
    return;
  }
  
  // Otherwise, enforce authentication
  if (!req.auth) {
    const url = req.url.replace(req.nextUrl.pathname, '/');
    return Response.redirect(url);
  }
});

export const config = { matcher: ['/dashboard/:path*'] };
