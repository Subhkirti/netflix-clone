import "../src/app/globals.css";
import { ThemeProvider } from "@mui/material";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import Loading from "@/app/loading";
import { Suspense } from "react";
import theme from "@/app/styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <Suspense fallback={<Loading />}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </StyledEngineProvider>
    </Suspense>
  );
}

export default MyApp;
