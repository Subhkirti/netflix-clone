import React, { useEffect, useState } from "react";
import Header from "@/app/components/header";
import dynamic from "next/dynamic";
import MovieCarousel from "./movieCarousel";
import { Box } from "@mui/material";
import { useTablet } from "@/app/hooks/mediaHooks";
import ThumbnailMedia from "./thumbnailMedia";
import { useSelector } from "react-redux";
import { getLocalUser } from "@/app/services/authService";
import Loader from "@/app/loader";
import { tabsData } from "@/app/utils/commonUtil";
import { addMovies } from "@/app/services/feedService";

function Feed() {
  const isTablet = useTablet();
  const user = useSelector((state) => state.user) || getLocalUser();
  const [isScrolled, setScrolled] = useState(false);
  const [banners, setBanners] = useState([]);
  const [homeBanner, setHomeBanner] = useState("");
  const [watchListMovieIds, setWatchListMovieIds] = useState({
    addedIds: [],
    removedIds: [],
  });
  const movies = user?.movies;

  useEffect(() => {
    if (banners.length > 0) {
      const randomIndex = parseInt(Math.random() * (banners.length - 1));
      setHomeBanner(banners[randomIndex]);
    }

    if (movies && movies?.length > 0) {
      movies.map(
        (element) =>
          element.isBannerMovies &&
          banners?.length === 0 &&
          setBanners(element?.movies)
      );
    }

    const handleScroll = () => {
      setScrolled(window.scrollY <= 10 ? false : true);
    };
    window.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banners, movies]);

  return movies && movies?.length > 0 && homeBanner ? (
    <Box px={isTablet ? 2 : 9}>
      <Header tabsData={tabsData} transparent={isScrolled ? false : true} />
      <ThumbnailMedia homeBanner={homeBanner} />
      {movies &&
        movies?.length > 0 &&
        movies.map((movie, i) => {
          return (
            movie?.categoryTitle && (
              <MovieCarousel
                key={i}
                categoryName={movie?.category}
                categoryTitle={movie.categoryTitle}
                thumbnails={movie?.movies}
                currentCarouselIndex={i}
                setWatchListMovieIds={setWatchListMovieIds}
                watchListMovieIds={watchListMovieIds}
              />
            )
          );
        })}
    </Box>
  ) : (
    <Loader />
  );
}
export default dynamic(() => Promise.resolve(Feed), { ssr: false });
