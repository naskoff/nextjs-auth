"use client";

import {useActionState} from "react";
import {signInAction} from "@/app/actions/auth";

export default function LoginComponent() {
    const [state, action, loading] = useActionState(signInAction, {success: false});

    console.log(state, action, loading);

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                     alt="Your Company" className="mx-auto h-10 w-auto"/>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight ">Sign in to your
                    account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action={action} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm/6 font-medium">Username
                            address</label>
                        <div className="mt-2">
                            <input id="username" type="text" name="username" required
                                   className="block w-full rounded-md px-3 py-1.5 text-base  outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"/>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password"
                                   className="block text-sm/6 font-medium">Password</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold">Forgot
                                    password?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input id="password" type="password" name="password" required
                                   className="block w-full rounded-md px-3 py-1.5 text-base  outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"/>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold  hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign
                            in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-400">
                    Not a member?
                    <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">Start a 14 day free
                        trial</a>
                </p>
            </div>
        </div>

    )
};