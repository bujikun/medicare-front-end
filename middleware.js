export { default } from "next-auth/middleware"
export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/public/orders/:path*",
    "/public/account/:path*",
    "/public/cart/checkout",
  ],
};