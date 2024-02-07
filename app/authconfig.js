export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callback: {
    authorized({ auth, request }) {
      const isLoggedIn = auth?.user;
      const isOnPainel = request.nextUrl.pathname.startsWith("/painel");
      if (isOnPainel) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/painel", request.nextUrl));
      }
      return true
    },
  },
};
