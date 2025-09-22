export type AuthFormState =
    | {
        success: boolean;
        message?: string;
        errors?: {
            username?: string[];
            password?: string[];
        };
    } | undefined;