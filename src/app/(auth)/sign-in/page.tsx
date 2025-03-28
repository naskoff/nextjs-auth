"use client";

import {useActionState, useState} from "react";
import {signInAction, SignInActionState} from "@/actions/auth";

export default function SignInPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [state, action, pending] = useActionState<SignInActionState, FormData>(signInAction, {});

    return (
        <div>
            <form action={action}>
                {state?.errors?.message && <div>{state.errors.message}</div>}
                <input type="text"
                       name="username"
                       placeholder="Username"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                />
                {state?.errors?.fields?.email && <p>{state.errors.fields.email}</p>}
                <input type="password"
                       name="password"
                       placeholder="Password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />
                {state?.errors?.fields?.password && <p>{state.errors.fields.password}</p>}
                <button type="submit" disabled={pending}>Login</button>
            </form>
        </div>
    );
}