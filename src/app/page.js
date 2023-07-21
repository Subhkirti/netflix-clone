"use client";
import Home from "./components/home/home";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import HomeCarousel from "./components/home/homeCarousel";
import { Suspense } from "react";
import Loading from "./loading";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import { getCurrentUser } from "./services/authService";
import Feed from "./components/feed/feed";
import { Provider } from "react-redux";
import store from "./store/configureStore";

function App() {
  const user = getCurrentUser();
  return (
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            {user?.loginSuccessfully ? (
              <Feed />
            ) : (
              <>
                <Home />
                <HomeCarousel />
              </>
            )}
          </ThemeProvider>
        </StyledEngineProvider>
      </Suspense>
    </Provider>
  );
}
export default dynamic(() => Promise.resolve(App), { ssr: false });
