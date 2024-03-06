import NextAuth from "next-auth";

import authConfig from "../auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "../routes";

const { auth } = NextAuth(authConfig);

export default auth((req: { auth?: any; nextUrl: any }) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // Verifique o papel do usuário e redirecione para a página apropriada
      const userRole = req.auth.role; // Supondo que o papel do usuário esteja disponível em req.auth.role
      let redirectUrl;
      switch (userRole) {
        case "admin":
          redirectUrl = "/admin";
          break;
        case "moderator":
          redirectUrl = "/moderator";
          break;
        case "manager":
          redirectUrl = "/manager";
          break;
        default:
          redirectUrl = DEFAULT_LOGIN_REDIRECT;
      }
      return Response.redirect(new URL(redirectUrl, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
