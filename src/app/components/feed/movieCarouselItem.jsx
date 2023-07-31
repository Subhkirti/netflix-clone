import React from "react";
import {
  Add,
  Check,
  PlayCircleFilled,
  ThumbDownOffAlt,
  ThumbUpOffAlt,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { ellipSize } from "@/app/utils/commonUtil";
import { useMobile, useTablet } from "@/app/hooks/mediaHooks";
import classes from "../../styles/feed.module.css";
import {
  addToWatchList,
  removeFromWatchList,
} from "@/app/services/movieService";
import { setSnackbarMessage } from "@/app/actions/snackBarAction";
import { useDispatch, useSelector } from "react-redux";
import { getLocalUser } from "@/app/services/authService";

function MovieCarouselItem({
  thumbnail,
  index,
  setCurrentIndex,
  currentCarouselIndex,
  showDescriptionCard,
  width,
  height,
  watchListMovieIds,
  setWatchListMovieIds,
}) {

  const isTablet = useTablet();
  const isMobile = useMobile();
  const user = useSelector((state) => state.user) || getLocalUser();
  const dispatch = useDispatch();

  async function handleWatchListBtn(thumbnail, movieId, addToList) {
    const reqBody = {
      userId: user && user?.userId,
      watchList: thumbnail,
    };
    if (addToList) {
      const data = await addToWatchList(reqBody);
      if (data.status === "SUCCESS") {

        setWatchListMovieIds((prev) => ({
          addedIds: prev.addedIds ? [...prev.addedIds, movieId] : [movieId],
          removedIds: prev.removedIds,
        }));
      } else {
        dispatch(
          setSnackbarMessage(res?.error_message || "Try again after sometime.")
        );
      }
    } else {
      const data = await removeFromWatchList(reqBody);
      if (data.status === "SUCCESS") {
        setWatchListMovieIds((prev) => ({
          addedIds: prev.addedIds,
          removedIds: prev.removedIds ? [...prev.removedIds, movieId] : [movieId],
        }));
      } else {
        dispatch(
          setSnackbarMessage(res?.error_message || "Try again after sometime.")
        );
      }
    }
  }

  return (
    <div
      onMouseOver={() =>
        setCurrentIndex && setCurrentIndex(currentCarouselIndex)
      }
      onMouseLeave={() => setCurrentIndex && setCurrentIndex(-1)}
      key={index}
      className={classes.thumbnailItem}
    >
      <Image
        className={classes.thumbnailImage}
        src={`https://image.tmdb.org/t/p/w500${thumbnail.backdrop_path || thumbnail.poster_path
          }`}
        alt=""
        width={width}
        height={height}
      ></Image>
      {!isMobile && showDescriptionCard && (
        <Box className={classes.descriptionBox}>
          <Box className={classes.descriptionIcons}>
            <PlayCircleFilled className={classes.playIcon} />
            {(!watchListMovieIds.removedIds.includes(thumbnail?.id) &&
              watchListMovieIds.addedIds.includes(thumbnail?.id)) ||
              (thumbnail?.addedToWatchList && !watchListMovieIds.removedIds.includes(thumbnail?.id)) ? (
              <Check
                className={classes.icon}
                onClick={() =>
                  handleWatchListBtn(thumbnail, thumbnail?.id, false)
                }
              />
            ) : (
              <Add
                className={classes.icon}
                onClick={() =>
                  handleWatchListBtn(thumbnail, thumbnail?.id, true)
                }
              />
            )}
            <ThumbUpOffAlt className={classes.icon} />
            <ThumbDownOffAlt className={classes.icon} />
          </Box>
          <Typography className={classes.descTitle} mt={1}>
            {thumbnail?.title || thumbnail?.original_title}
          </Typography>

          <Typography mb={1} className={classes.descSubTitle}>
            {ellipSize(thumbnail?.overview, isTablet ? 80 : 120)}
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default MovieCarouselItem;
