"use client";
import { useEffect } from "react";
import Home from "./components/home/home";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import HomeCarousel from "./components/home/homeCarousel";
import { Suspense } from "react";
import Loading from "./loader";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import {
  fetchUserFromDB,
  getIsUserLoggedIn,
  getLocalUser,
} from "./services/authService";
import Feed from "./components/feed/feed";
import { Provider, useSelector, useDispatch } from "react-redux";
import SnackBar from "./components/snackBar";
import store from "./store/configureStore";
import { setCurrentUser } from "./actions/userAction";
import { setSnackbarMessage } from "./actions/snackBarAction";
import Loader from "./loader";

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <Main />
      </Suspense>
    </Provider>
  );
}

function Main() {
  const user = useSelector((state) => state.user);
  const localUser = getLocalUser();
  const isUserLoggedIn = getIsUserLoggedIn();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUser() {
      const res = await fetchUserFromDB({ email: localUser?.emailOrMobile });
      if (res.status === "SUCCESS") {
        dispatch(setCurrentUser(res.user_data));
      } else {
        dispatch(setSnackbarMessage(res?.error_message));
      }
    }
    !user && getUser();
  }, [user]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SnackBar />
        {isUserLoggedIn ? (
          <Feed />
        ) : (
          <>
            <Home />
            <HomeCarousel />
          </>
        )}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
export default dynamic(() => Promise.resolve(App), { ssr: false });
