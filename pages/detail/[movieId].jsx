import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { movieApiKey } from "@/app/utils/constants";
import {
  addToWatchList,
  fetchMovieDetail,
  removeFromWatchList,
} from "@/app/services/movieService";
import ReactPlayer from "react-player";
import Header from "@/app/components/header";
import { standardDate, tabsData } from "@/app/utils/commonUtil";
import { Avatar, Box, Button, Typography } from "@mui/material";
import Loader from "@/app/loader";
import classes from "../../src/app/styles/movieDetail.module.css";
import { useTablet } from "@/app/hooks/mediaHooks";
import Image from "next/image";
import BorderLine from "@/app/components/borderLine";
import { motion } from "framer-motion";
import { Check, Add } from "@mui/icons-material";
import { getLanguage, getLocalUser } from "@/app/services/authService";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbarMessage } from "@/app/actions/snackBarAction";
import { ThreeDots } from "react-loader-spinner";
import language from "@/app/languages/langIndex";

function MovieDetail() {
  const globalLanguage = getLanguage();
  const languageText = language[globalLanguage || "en"];
  const router = useRouter();
  const isTablet = useTablet();
  const movieId = router?.query?.movieId && atob(router.query.movieId);
  const [movie, setMovie] = useState(null);
  const user = useSelector((state) => state.user) || getLocalUser();
  const dispatch = useDispatch();
  const [trailerKey, setTrailerKey] = useState(null);
  const [isAddedToWatchList, setAddedToWatchList] = useState(false);
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchTrailer() {
      const detailUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${movieApiKey}&language=en-US&append_to_response=videos`;

      const movieData = await fetchMovieDetail(detailUrl);
      movieData && setMovie(movieData);
      if (movieData?.videos) {
        const index = movieData.videos.results.findIndex(
          (element) => element.type === "Trailer"
        );
        setTrailerKey(movieData.videos?.results[index]?.key);
      }
    }
    movieId && !trailerKey && fetchTrailer();

    movie &&
      user &&
      user?.watchList?.length > 0 &&
      user?.watchList.map((item) => {
        item?.id === movie?.id && setAddedToWatchList(true);
      });
  }, [movieId, trailerKey, movie, user]);

  const languageKey =
    movie?.original_language === "en"
      ? "English"
      : movie?.original_language === "hi"
        ? "Hindi"
        : movie?.original_language;

  async function handleWatchListBtn(addToList) {
    setLoading(true)

    const reqBody = {
      userId: user && user?.userId,
      watchList: movie,
    };
    if (addToList) {
      const data = await addToWatchList(reqBody);
      data && setLoading(false)
      if (data.status === "SUCCESS") {
        setAddedToWatchList(addToList);
      } else {
        dispatch(
          setSnackbarMessage(res?.error_message || "Try again after sometime.")
        );
      }
    } else {
      const data = await removeFromWatchList(reqBody);
      data && setLoading(false)
      if (data.status === "SUCCESS") {
        setAddedToWatchList(addToList);
      } else {
        dispatch(
          setSnackbarMessage(res?.error_message || "Try again after sometime.")
        );
      }
    }
  }

  return movie ? (
    <Box px={isTablet ? 4 : 9}>
      <Header tabsData={tabsData} />
      {/* player-section */}
      <Box my={2}>
        {trailerKey ? (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailerKey}`}
            width="100%"
            height={isTablet ? "500px" : "600px"}
            style={{
              margin: "0px auto",
            }}
            playing={false}
            controls={true}
          />
        ) : (
          <Typography align="center" className={classes.title}>
            {languageText?.THIS_VIDEO_IS_NOT_AVAILABLE}
          </Typography>
        )}
      </Box>
      <BorderLine />

      <Box my={2} className={classes.infoSection}>
        {/* description-section */}
        <Box display="flex" alignItems="center">
          {!isTablet && (movie.poster_path || movie.backdrop_path) && (
            <div>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path
                  }`}
                alt=""
                width="90"
                height="100"
                style={{ borderRadius: "6px" }}
              ></Image>
            </div>
          )}
          <Box
            ml={
              isTablet || (!movie.poster_path && !movie.backdrop_path) ? 0 : 2
            }
          >
            <Typography className={classes.title}>
              {movie?.title || movie?.original_title}
            </Typography>

            <Typography className={classes.subTitle}>
              {movie?.overview}
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* genre-section */}
      <Box mb={2}>
        {movie?.genres?.length > 0 && (
          <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
            <Typography variant="h6" style={{ color: "rgb(202, 201, 201)" }}>
              {languageText?.GENRE}
            </Typography>
            {movie?.genres.map((genre, i) => (
              <Button key={i} className={classes.genreBtn} variant="outlined">
                {genre?.name}
              </Button>
            ))}
          </Box>
        )}
      </Box>

      {/* watch-list-button */}
      <Box mb={2.5}>
        {isAddedToWatchList ? (
          <Button
            onClick={() => handleWatchListBtn(false)}
            startIcon={isLoading ? <ThreeDots
              height="30"
              width="40"
              radius="4"
              color="#fff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            /> : <Check />}
            className={classes.watchListBtn}
            variant="contained"
          >
            {isLoading ? "" : languageText?.REMOVE_FROM_WATCHLIST}
          </Button>
        ) : (
          <Button
            onClick={() => handleWatchListBtn(true)}
            startIcon={isLoading ? <ThreeDots
              height="30"
              width="40"
              radius="4"
              color="#fff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            /> : <Add />}
            className={classes.watchListBtn}
            variant="contained"
          >
            {isLoading ? "" : languageText?.ADD_TO_WATCHLIST}

          </Button>
        )}
      </Box>
      <BorderLine />

      {/* details-section */}
      <Box my={2} style={{ color: "rgb(202, 201, 201)" }}>
        <Typography variant="h6" mb={1}>
          {languageText?.DETAILS}
        </Typography>
        <Box className={classes.desc}>
          <Typography>
            {languageText?.LANGUAGE} <span className={classes?.descItem}>{languageKey}</span>
          </Typography>
          {movie?.release_date && (
            <Typography>
              {languageText.RELEASED_ON} {standardDate(movie?.release_date)}
            </Typography>
          )}
          {movie?.vote_count && (
            <Typography>{languageText?.VOTES} {movie?.vote_count}</Typography>
          )}
          {movie?.budget && <Typography>{languageText?.BUDGET} {movie?.budget}</Typography>}
          {movie?.revenue && <Typography>{languageText?.REVENUE} {movie?.revenue}</Typography>}
        </Box>
      </Box>
      <BorderLine />

      {/* production-companies-section */}
      <Box my={2} style={{ color: "rgb(202, 201, 201)" }}>
        <Typography variant="h6">Production Companies:</Typography>
        <Box className={classes.companiesBox}>
          {movie?.production_companies?.length > 0 &&
            movie?.production_companies.map((company, index) => (
              <Box className={classes.avatarBox} key={index}>
                <motion.div
                  whileHover={{
                    scale: [1, 1.4, 1],
                  }}
                >
                  <Avatar
                    style={{
                      backgroundColor: company?.logo_path ? "white" : "#414141",
                    }}
                    className={classes.avatar}
                    src={`https://image.tmdb.org/t/p/w500${company?.logo_path}`}
                  >
                    {!company?.logo_path && company?.name[0]}
                  </Avatar>
                </motion.div>
                <Typography className={classes.avatarText}>
                  {company?.name}
                </Typography>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  ) : (
    <Loader />
  );
}

export default MovieDetail;
