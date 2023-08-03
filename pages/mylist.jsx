import React, { useEffect } from "react";
import { fetchWatchList } from "@/app/services/movieService";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "@/app/actions/userAction";
import { getLocalUser } from "@/app/services/authService";
import Loader from "@/app/loader";
import Image from "next/image";
import Header from "@/app/components/header";
import { ellipSize, tabsData } from "@/app/utils/commonUtil";
import { Box, Typography } from "@mui/material";
import { useTablet } from "@/app/hooks/mediaHooks";
import classes from '../src/app/styles/myList.module.css'
import { motion } from "framer-motion";

function MyList() {
  const isTablet = useTablet()
  const user = useSelector((state) => state.user) || getLocalUser();
  const dispatch = useDispatch();
  useEffect(() => {
    async function getWatchList() {
      const res = await fetchWatchList({ emailOrMobile: user?.emailOrMobile });
      res.data && dispatch(setCurrentUser({ ...res.data }));
    }
    getWatchList();
  }, []);
  return (
    <React.Fragment>
      <Header tabsData={tabsData} transparent={false} />
      <Box px={isTablet ? 2 : 9}>

        {user?.watchList?.length > 0 ? (
          user?.watchList.map((item, index) => {
            return (

              <div className={classes.itemWrapper}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path
                    }`}
                  alt=""
                  width={250}
                  height={120}
                  className={classes.itemImage}

                ></Image>
                <div className={classes.description}>
                  <Typography className={classes.descTitle} >
                    {item?.title || item?.original_title}
                  </Typography>

                  <Typography mt={1} className={classes.descSubTitle}>
                    {ellipSize(item?.overview, isTablet ? 80 : 1000)}
                  </Typography>
                </div>
              </div>
            );
          })
        ) : (
          <Loader />
        )}
      </Box>
    </React.Fragment >
  );
}

export default MyList;
