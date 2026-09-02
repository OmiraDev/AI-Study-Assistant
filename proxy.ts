import middleware from "next-auth/middleware";

export function proxy(req: any) {
  return middleware(req);
}

export const config = {
  matcher: ["/dashboard", "/history", "/quiz", "/summarizer", "/settings"],
};