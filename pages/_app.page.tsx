import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import { theme } from "dh-marvel/styles/material-theme";
import { useRouter } from "next/router";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isCheckoutPage = router.pathname === "/checkout";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isCheckoutPage ? (
        <LayoutCheckout>
          <Component {...pageProps} />
        </LayoutCheckout>
      ) : (
        <LayoutGeneral>
          <Component {...pageProps} />
        </LayoutGeneral>
      )}
      <style jsx global>{`
        /* Other global styles such as 'html, body' etc... */

        #__next {
          height: 100%;
        }
      `}</style>
    </ThemeProvider>
  );
}

export default MyApp;
