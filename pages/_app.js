import "../src/app/globals.css";
import { ThemeProvider } from "@mui/material";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import Loading from "@/app/loading";
import { Suspense } from "react";
import theme from "@/app/styles/theme";
import store from "@/app/store/configureStore";
import { Provider } from "react-redux";
import SnackBar from "@/app/components/snackBar";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <SnackBar />
            <Component {...pageProps} />
          </ThemeProvider>
        </StyledEngineProvider>
      </Suspense>
    </Provider>
  );
}

export default MyApp;
