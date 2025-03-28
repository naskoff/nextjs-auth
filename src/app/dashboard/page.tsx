"use client";

import {useSession} from "next-auth/react";
import {signOutAction} from "@/actions/auth";
import Link from "next/link";

export default function Dashboard() {
    const {data: session, status, update} = useSession();

    const subscription = {
        plan: "Standard",
        expires_at: new Date(),
        active: true,
    }

    async function updateSession() {
        await update({
            user: {
                subscription
            }
        })
    }

    if (status === "authenticated") {
        return (
            <div>
                <div>{JSON.stringify(session)}</div>
                <div>You are logged as {session?.user?.email}</div>
                <div>You are logged as {session?.user?.subscription?.active ? 'Active' : 'Inactive'}</div>
                <div>
                    <button onClick={() => updateSession()}>
                        Update Session
                    </button>
                </div>
                <div>
                    <form action={signOutAction}>
                        <button>Sign out</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Link href={"/sign-in"}>Sign in</Link>
    );
}