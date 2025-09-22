"use server";

import {signIn} from "@/app/lib/auth";
import {AuthFormState} from "@/app/schemas/AuthDefinition";
import {isRedirectError} from "next/dist/client/components/redirect-error";
import {z} from "zod";

export async function signInAction(state: AuthFormState, formData: FormData): Promise<AuthFormState> {
    const credentials = {
        username: formData.get("username"),
        password: formData.get("password"),
    }

    const parsedCredentials = z
        .object({
            username: z.string().min(2).max(120),
            password: z.string().min(2),
        })
        .safeParse(credentials);

    if (!parsedCredentials.success) {
        return {
            success: false,
            message: "Bad credentials",
            errors: {
                username: parsedCredentials.error.flatten().fieldErrors.username,
                password: parsedCredentials.error.flatten().fieldErrors.password,
            },
        }
    }

    try {
        await signIn("credentials", {
            username: formData.get("username"),
            password: formData.get("password"),
            redirect: false,
            redirectTo: "/dashboard",
        });
    } catch (e: any) {
        console.error(e);
        if (isRedirectError(e)) {
            return {
                success: false,
                message: "Bad credentials",
                errors: {
                    username: [e.message],
                }
            }
        }
        return {
            success: false,
            errors: {
                username: [e.message],
            },
            message: "Invalid credentials",
        }
    }

    return {
        success: true,
    } as AuthFormState;
}