import NextAuth, {CredentialsSignin, DefaultSession} from "next-auth";
import Credentials from "@auth/core/providers/credentials";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            email: string;
            first_name: string;
            last_name: string;
            image: string
            subscription?: {
                plan: string;
                active: boolean;
                expires_at: string;
            };
        } & DefaultSession["user"]
    }
}

export class InvalidLoginError extends CredentialsSignin {
    code = "Invalid identifier or password";

    constructor(message: string) {
        super(message);
        this.message = message;
    }
}

export const {handlers, signIn, signOut, auth} = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            credentials: {
                username: {},
                password: {},
            },
            authorize: async (credentials) => {
                const response = await fetch(`${process.env.BACKEND}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: credentials.username,
                        password: credentials.password,
                        expiresInMins: 60,
                    }),
                });

                if (!response?.ok) {
                    const data = await response.json();

                    throw new InvalidLoginError(data?.message || 'Bad credentials');
                }

                const data = await response.json();

                return {
                    id: data.id,
                    email: data.email,
                    first_name: data.firstName,
                    last_name: data.lastName,
                    image: data.image,
                    subscription: null,
                };
            }
        })
    ],
    callbacks: {
        authorized: async ({auth}) => {
            console.log('auth', auth);
            return !!auth;
        },
        session({session, token}) {
            console.log('session', session, token);
            if (token?.user) {
                // @ts-expect-error ignore session
                session.user = token.user;
            }

            return session;
        },
        jwt({token, trigger, user, session}) {
            console.log('jwt session', session);
            if ("update" === trigger) {
                token.user = Object.assign({}, token.user, session.user);
            }
            if (user && token) {
                token.user = user;
            }
            return token;
        }
    }
});