import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

// Check if authentication should be bypassed
const bypassAuth = process.env.BYPASS_AUTH === 'true';

const authConfig = {
  providers: [
    // Only include GitHub provider when not in bypass mode
    ...(bypassAuth ? [] : [GithubProvider({})]),
    // Always include Credentials provider
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        // In bypass mode, always authorize with a dummy user
        if (bypassAuth) {
          return {
            id: '1',
            name: 'Development User',
            email: 'dev@example.com'
          };
        }
        
        // Normal authorization logic
        const user = {
          id: '1',
          name: 'John',
          email: credentials?.email as string
        };
        
        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/' //sigin page
  },
  // Use a development secret when in bypass mode
  secret: bypassAuth ? 'development-secret-for-bypass-mode' : process.env.AUTH_SECRET
} satisfies NextAuthConfig;

export default authConfig;
