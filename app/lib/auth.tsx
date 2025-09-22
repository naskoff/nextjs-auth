// @ts-ignore
// @ts-ignore
// @ts-ignore

import NextAuth, {DefaultSession, Session, User} from "next-auth"
import Credentials from "@auth/core/providers/credentials";
import {JWT} from "@auth/core/jwt";
import axiosInstance from "@/app/lib/axios";
import {NextRequest} from "next/server";

declare module "next-auth" {
    interface User {
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        image: string;
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
    jwt: {
        maxAge: 3600,
    },
    session: {
        strategy: "jwt",
        maxAge: 3600,
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            credentials: {
                username: {label: "Username", type: "text", placeholder: "jsmith"},
                password: {label: "Password", type: "password", placeholder: "********"}
            }
        }),
    ],
    callbacks: {
        async authorized(params: {request: NextRequest, auth: Session | null}): Promise<boolean> {
            console.log('authorized', params.request, params.auth);
            return true;
        }
    }
})