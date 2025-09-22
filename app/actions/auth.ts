"use server";

import {signIn} from "@/app/lib/auth";
import {AuthFormState} from "@/app/schemas/AuthSchema";

export async function signInAction(state: any, formData: FormData): Promise<AuthFormState> {
    try {
        await signIn("credentials", formData);
    } catch (e) {
        console.error(e);
        return {
            errors: {
                username: [e.message],
            },
            message: "Invalid credentials",
        }
    }

    return {};
}