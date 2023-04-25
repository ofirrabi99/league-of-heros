import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export default handleAuth({
  async login(req, res) {
    await handleLogin(req, res, {
      getLoginState: (r, o) => {
        const to = r.query.returnTo;
        const locale = r.cookies["NEXT_LOCALE"];
        return { returnTo: `/${locale}${to}` };
      },
    });
  },
});
