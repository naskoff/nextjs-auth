import {auth} from "@/auth";

export const GUEST_URLS = [
    '/sign-in',
];

export default auth((req) => {
    if (!req.auth && !GUEST_URLS.includes(req.nextUrl.pathname)) {
        return Response.redirect(new URL('/sign-in', req.nextUrl.origin));
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}