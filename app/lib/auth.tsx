import NextAuth, {DefaultSession, Session, User} from "next-auth"
import Credentials from "@auth/core/providers/credentials";
import {JWT} from "@auth/core/jwt";
import axiosInstance from "@/app/lib/axios";
import {NextRequest} from "next/server";
import {z} from "zod";

declare module "next-auth" {
    interface User {
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        image: string;
        accessToken: string;
        refreshToken: string;
        refreshTokenExpires: number;
    }

    interface Session {
        user: User & DefaultSession['user'];
        tokens: JWT;
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        access_token: string;
        refresh_token: string;
        refresh_token_expires: number;
    }
}

export const {handlers, signIn, signOut, auth} = NextAuth({
    secret: process.env.NEXT_AUTH_SECRET,
    jwt: {
        maxAge: 3600,
    },
    session: {
        strategy: "jwt",
        maxAge: 3600,
    },
    providers: [
        Credentials({
            credentials: {
                username: {label: "Username", type: "text", placeholder: "jsmith"},
                password: {label: "Password", type: "password", placeholder: "********"}
            },
            async authorize(credentials: Partial<Record<"username" | "password", unknown>>): Promise<User | null> {
                const {username, password} = credentials;

                try {
                    const {data} = await axiosInstance.post('/auth/login', {
                        username,
                        password,
                        expiresInMins: 60
                    });

                    return {
                        id: data.id,
                        username: data.username,
                        firstName: data.first_name,
                        lastName: data.last_name,
                        email: data.email,
                        image: data.image,
                        accessToken: data.access_token,
                        refreshToken: data.refresh_token,
                        refreshTokenExpires: (new Date()).setMinutes((new Date()).getMinutes() + 60),
                    } as User;
                } catch (e: any) {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async authorized(params: { request: NextRequest, auth: Session | null }): Promise<boolean> {
            console.log('authorized', params.request, params.auth);
            return true;
        }
    }
})