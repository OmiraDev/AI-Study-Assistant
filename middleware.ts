export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard", "/history", "/quiz", "/summarizer", "/settings"],
};