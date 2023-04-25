import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export default handleAuth({
  async login(req, res) {
    await handleLogin(req, res, {
      // Fix login bug - missing subpath of custom locale
      getLoginState: (r) => {
        const to = r.query.returnTo;
        const locale = r.cookies["NEXT_LOCALE"];
        return { returnTo: `/${locale}${to}` };
      },
    });
  },
});
