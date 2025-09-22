export type AuthFormState =
    | {
        errors?: {
            username?: string[];
            password?: string[];
        }
        message?: string;
    } | undefined;