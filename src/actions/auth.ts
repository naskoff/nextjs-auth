"use server";

import {signIn, signOut} from "@/auth";
import {AuthError} from "next-auth";
import {redirect} from "next/navigation";

export type SignInActionState = {
    errors?: {
        message?: string,
        fields?: {
            email?: string,
            password?: string,
        }
    }
};

export async function signInAction(prevState: SignInActionState, formData: FormData): Promise<SignInActionState> {
    try {
        await signIn('credentials', {
            username: formData.get('username'),
            password: formData.get('password'),
            redirect: false,
            redirectTo: "/dashboard"
        });
    } catch (error) {
        return {
            errors: {
                message: (error as AuthError).message || "Bad credentials",
            }
        }
    }

    return redirect('/dashboard');
}

export async function signOutAction() {
    await signOut();
}