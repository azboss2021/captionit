export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/credits",
    "/account",
    "/support",
    "/images",
    "/create",
    "/caption",
  ],
};
