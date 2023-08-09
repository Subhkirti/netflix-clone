import React,{useEffect} from 'react';
import "../src/app/globals.css";
import { ThemeProvider } from "@mui/material";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { Suspense } from "react";
import theme from "@/app/styles/theme";
import store from "@/app/store/configureStore";
import { Provider, useDispatch, useSelector } from "react-redux";
import SnackBar from "@/app/components/snackBar";
import Loader from "@/app/loader";
import { useRouter } from "next/router";
import { getLocalUser,getIsUserLoggedIn, fetchUserFromDB } from "@/app/services/authService";
import { setCurrentUser } from '@/app/actions/userAction';
import { setSnackbarMessage } from '@/app/actions/snackBarAction';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <Main Component={Component} pageProps={pageProps} />
      </Suspense>
    </Provider>
  );
}

function Main({ Component, pageProps }) {
  const user = useSelector((state) => state.user);
  const localUser = getLocalUser();
  const isUserLoggedIn = getIsUserLoggedIn();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const res = await fetchUserFromDB({ email: localUser?.emailOrMobile });
      if (res.status === "SUCCESS") {
        if (res.user_data) {
          dispatch(setCurrentUser(res.user_data));
        } else {
          localStorage.clear();
          window.location.reload();
        }
      } else {
        dispatch(setSnackbarMessage(res?.error_message));
        router.push("/logout");
      }
    }
    !user && isUserLoggedIn && getUser();
  }, [user]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SnackBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
export default MyApp;
