import React, { useEffect, useState } from "react";
import { fetchWatchList, removeFromWatchList } from "@/app/services/movieService";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "@/app/actions/userAction";
import { getLocalUser } from "@/app/services/authService";
import Loader from "@/app/loader";
import Image from "next/image";
import Header from "@/app/components/header";
import { ellipSize, movieDetailUrl, tabsData } from "@/app/utils/commonUtil";
import { Box, Typography } from "@mui/material";
import { useTablet, useMobile } from "@/app/hooks/mediaHooks";
import classes from "../src/app/styles/myList.module.css";
import NoVideos from "@/app/components/feed/noVideos";
import { Close } from "@mui/icons-material";
import { useRouter } from "next/navigation";

function MyList() {
  const isTablet = useTablet();
  const isMobile = useMobile();
  const user = useSelector((state) => state.user) || getLocalUser();
  const [watchList, setWatchList] = useState([])
  const dispatch = useDispatch();
  const router = useRouter()

  useEffect(() => {
    async function getWatchList() {
      const res = await fetchWatchList({ emailOrMobile: user?.emailOrMobile });
      res.data &&
        dispatch(
          setCurrentUser({
            ...res?.data,
            watchList:
              res?.data?.watchList?.length === 0 ? null : res?.data?.watchList,
          })
        );
      setWatchList(user?.watchList)
    }
    watchList?.length === 0 && getWatchList();
  }, [user?.watchList]);


  async function handleRemoveFromWatchList(item, index) {
    const reqBody = {
      userId: user && user?.userId,
      watchList: item,
    };
    const data = await removeFromWatchList(reqBody);

    if (data.status === "SUCCESS") {
      const filteredWatchList = watchList.filter(
        (item, i) => i !== index
      );
      setWatchList(filteredWatchList?.length === 0 ? null : filteredWatchList)
    } else {
      dispatch(
        setSnackbarMessage(res?.error_message || "Try again after sometime.")
      );
    }
  }
  return (
    <React.Fragment>
      <Header tabsData={tabsData} transparent={false} showBack={true} />
      <Box px={isTablet ? 2 : 9}>
        {watchList === null ? (
          <NoVideos />
        ) : watchList?.length > 0 ? (
          watchList.map((item, index) => {
            return (
              <Box key={index} className={classes.itemWrapper}>
                <Box onClick={() => router.push(movieDetailUrl(item?.id))} >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path
                      }`}
                    alt=""
                    width={isTablet ? 150 : 230}
                    height={isTablet ? 100 : 130}
                    className={classes.itemImage}
                  ></Image>
                </Box>
                <div className={classes.description}>
                  <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography className={classes.descTitle}>
                      {item?.title || item?.original_title}
                    </Typography>
                    <Close className={classes.crossIcon} onClick={() => handleRemoveFromWatchList(item, index)} />
                  </Box>

                  <Typography className={classes.descSubTitle}>
                    {ellipSize(item?.overview, isMobile ? 300 : 1000)}
                  </Typography>
                </div>
              </Box>
            );
          })
        ) : (
          <Loader />
        )}
      </Box>
    </React.Fragment>
  );
}

export default MyList;
