// import NextAuth, { CredentialsSignin, DefaultSession } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { NextResponse } from 'next/server';
// import { JWT } from 'next-auth/jwt';
// import cookie from 'cookie';
// import { cookies } from 'next/headers';

// declare module 'next-auth' {
//   export interface Session {
//     user: {
//       uid?: string | undefined | null;
//       test?: string | undefined | null;
//       message?: string | undefined | null;
//     } & DefaultSession['user'];
//   }

//   export interface User {
//     uid?: string | undefined | null;
//     test?: string | undefined | null;
//     message?: string | undefined | null;
//   }
// }

// declare module 'next-auth/jwt' {
//   interface JWT {
//     uid?: string | undefined | null;
//     test?: string | undefined | null;
//     message?: string | undefined | null;
//   }
// }

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
// } = NextAuth({
//   pages: {
//     signIn: '/i/flow/login',
//     newUser: '/i/flow/signup',
//   },
//   // callbacks: {
//   //   // async authorized({request, auth}) {
//   //   //   if(!auth) {
//   //   //     // 로그인이 유지되고 있지 않으면 로그인
//   //   //     return NextResponse.redirect('http://localhost:3000/i/flow/login');
//   //   //   }
//   //   //   // 로그인 되고 있다면 그냥 유지
//   //   //   return true
//   //   // },
//   //   jwt({ token, user }) {
//   //     console.log('auth.ts jwt', token);
//   //     console.log('auth.ts jwt', user);
//   //     if (user) {
//   //       token.uid = user.uid;
//   //       token.test = user.test;
//   //       (token as any).message = (user as any).message;
//   //     }
//   //     return token;
//   //   },
//   //   async session({ session, token, newSession, user }) {
//   //     if (token) {
//   //       session.user.uid = token.uid;
//   //       session.user.test = token.test; // 토큰에서 세션으로 test 값을 전달
//   //       (session as any).message = (token as any).message;
//   //     }
//   //     return session;
//   //   },
//   // },
//   // events: {
//   //   signOut(data) {
//   //     // console.log('auth.ts events signout', 'session' in data && data.session, 'token' in data && data.token);
//   //     // if ('session' in data) {
//   //     //   data.session = null;
//   //     // }
//   //     // if ('token' in data) {
//   //     //   data.token = null;
//   //     // }
//   //   },
//   //   session(data) {
//   //     console.log(
//   //       'auth.ts events session',
//   //       'session' in data && data.session,
//   //       'token' in data && data.token
//   //     );
//   //   },
//   // },
//   providers: [
//     CredentialsProvider({
//       name: 'credentials',
//       async authorize(credentials) {
//         const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             id: credentials.username,
//             password: credentials.password,
//           }),
//         });

//         // 여기 주목!!! 서버에서 에러가 발생할 때 그 에러 내용이 서버에 담겨 있을 겁니다.
//         // console.log('next-auth : ', authResponse.status, authResponse.statusText);

//         // 오류 처리
//         if (!authResponse.ok) {
//           return null;
//           // // 서버
//           // const credentialsSignin = new CredentialsSignin();

//           // console.log(authResponse.status);
//           // if (authResponse.status === 404) {
//           //   credentialsSignin.message = 'no_user';
//           // } else if (authResponse.status === 401) {
//           //   credentialsSignin.message = 'wrong_password';
//           // }
//           // throw credentialsSignin;
//         }

//         // let setCookie = authResponse.headers.get('Set-Cookie');
//         // if (setCookie) {
//         //   const parsed = cookie.parse(setCookie);
//         //   cookies().set('connect.sid', parsed['connect.sid'], parsed); // 브라우저에 쿠키를 심어주는 것
//         // }

//         const user = await authResponse.json();

//         return {
//           uid: user.id,
//           name: user.nickname,
//           image: user.image,
//           test: '123',
//         };
//       },
//     }),
//   ],
// });

import NextAuth, { DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import cookie from 'cookie';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  export interface Session {
    user: {
      content?: { code: number; data: string; success: boolean } | undefined | null;
    } & DefaultSession['user'];
  }

  export interface User {
    content?: { code: number; data: string; success: boolean } | undefined | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
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
      console.log('auth.ts jwt', token);
      if (user) {
        token.content = user.content;
      }
      return token;
    },
    async session({ session, token, newSession, user }) {
      console.log('session callback', session);
      console.log('token callback', token);
      // console.log('newSession callback', newSession);
      console.log('user callback', user);

      if (token.content) {
        session.user.content = token.content;
      }

      return session;
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
        // if (!authResponse.ok) {
        //   return {null};
        // }

        const user = await authResponse.json();
        console.log('CredentialsProvider user', user);
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          content: user,
        };
      },
    }),
  ],
});
