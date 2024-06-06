import NextAuth, { DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import cookie from 'cookie';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  export interface Session {
    uid?: string | undefined | null;
    user: {
      content?: { code: number; data: string; success: boolean } | undefined | null;
    } & DefaultSession['user'];
  }

  export interface User {
    uid?: string | undefined | null;
    content?: { code: number; data: string; success: boolean } | undefined | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    uid?: string | undefined | null;
    content?: { code: number; data: string; success: boolean } | undefined | null;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: '/i/flow/login',
    newUser: '/i/flow/signup',
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log('auth.ts jwt', token);
      if (user) {
        token.uid = user.uid;
        token.content = user.content;
      }
      return token;
    },
    async session({ session, token, newSession, user }) {
      // console.log('session callback', session);
      // console.log('token callback', token);
      // console.log('newSession callback', newSession);
      // console.log('user callback', user);

      if (token.content) {
        session.user.uid = token.uid;
        session.user.content = token.content;
      }

      return session;
    },
  },
  events: {
    signOut(data) {
      console.log(
        'auth.ts events signout',
        'session' in data && data.session,
        'token' in data && data.token
      );
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    },
    session(data) {
      console.log(
        'auth.ts events session',
        'session' in data && data.session,
        'token' in data && data.token
      );
    },
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: credentials.username,
            password: credentials.password,
          }),
        });

        let setCookie = authResponse.headers.get('Set-Cookie');
        if (setCookie) {
          const parsed = cookie.parse(setCookie);
          cookies().set('connect.sid', parsed['connect.sid'], parsed); // 브라우저에 쿠키를 심어주는 것
        }
        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();
        console.log('CredentialsProvider user', user);

        return {
          uid: user.id,
          email: user.id,
          name: user.nickname,
          image: user.image,
          content: user,
        };
      },
    }),
  ],
});
