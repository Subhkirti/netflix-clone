import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { movieApiKey } from "@/app/utils/constants";
import { fetchMovieDetail } from "@/app/services/movieService";
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

function MovieDetail() {
  const router = useRouter();
  const isTablet = useTablet();
  const movieId = router?.query?.movieId && atob(router.query.movieId);
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

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
  }, [movieId]);

  return movie ? (
    <Box px={isTablet ? 4 : 9}>
      <Header tabsData={tabsData} />
      {trailerKey && (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailerKey}`}
          width="100%"
          height={isTablet ? "500px" : "600px"}
          style={{
            margin: "0px auto",
          }}
          playing={false}
        />
      )}

      <Box my={2} className={classes.infoSection}>
        {movie?.genres?.length > 0 && (
          <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
            <Typography variant="h6"> Genre:</Typography>
            {movie?.genres.map((genre, i) => (
              <Button key={i} className={classes.genreBtn} variant="outlined">
                {genre?.name}
              </Button>
            ))}
          </Box>
        )}

        <Box display="flex" alignItems="center">
          {!isTablet && (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path
                }`}
              alt=""
              width="90"
              height="90"
              style={{ borderRadius: "6px" }}
            ></Image>
          )}
          <Box ml={isTablet ? 0 : 2}>
            <Typography className={classes.title}>
              {movie?.title || movie?.original_title}
            </Typography>

            <Typography className={classes.subTitle}>
              {movie?.overview}
            </Typography>
          </Box>
        </Box>
      </Box>

      <BorderLine />

      <Box my={2} style={{ color: "rgb(202, 201, 201)" }}>
        <Typography variant="h6"> Details:</Typography>
        <Box className={classes.desc}>
          <Typography>
            Language:{" "}
            <span className={classes?.descItem}>
              {movie?.original_language}
            </span>
          </Typography>
          <Typography>
            Released On:{" "}
            {movie?.release_date && standardDate(movie?.release_date)}
          </Typography>
          <Typography>
            Votes:{" "}
            {movie?.vote_count}
          </Typography>
          <Typography>
            Budget:{" "}{movie?.budget}
          </Typography>
          <Typography>
            Revenue:{" "} {movie?.revenue}
          </Typography>
        </Box>
      </Box>

      <BorderLine />
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
                      backgroundColor: company?.logo_path
                        ? "transparent"
                        : "#414141",
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
    </Box >
  ) : (
    <Loader />
  );
}

export default MovieDetail;
