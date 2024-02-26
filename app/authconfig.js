export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = auth?.user;
      const isOffline = !isLoggedIn;

      if (isOffline) {
        const isTryingToAccessLogin = request.nextUrl.pathname === "/login";
        return isTryingToAccessLogin;
      }

      if (isLoggedIn && request.nextUrl.pathname === "/login") {
        return Response.redirect(new URL("/painel", request.nextUrl));
      }

      const isOnAllowedPages = [
        "/painel",
        "/transacoes",
        "/clientes",
        "/usuarios",
      ].some((allowedPage) => request.nextUrl.pathname.startsWith(allowedPage));

      return isOnAllowedPages;
    },
  },
};
