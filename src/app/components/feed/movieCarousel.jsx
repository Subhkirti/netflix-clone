import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import classes from "../../styles/feed.module.css";
import Carousel from "react-multi-carousel";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { motion } from "framer-motion";
import MovieCarouselItem from "./movieCarouselItem";
import { responsive } from "@/app/utils/constants";
import { useTablet, useMobile } from "@/app/hooks/mediaHooks";

function MovieCarousel({
  categoryTitle,
  thumbnails,
  currentCarouselIndex,
  watchListMovieIds,
  setWatchListMovieIds,
  categoryName
}) {
  const isTablet = useTablet();
  const isMobile = useMobile();
  const [currentIndex, setCurrentIndex] = useState(-1);

  const CustomLeftArrow = ({ onClick, ...rest }) => {
    return (
      <div onClick={() => onClick()} className={classes.leftScrollIcon}>
        <ChevronLeft fontSize="40px" />
      </div>
    );
  };
  const CustomRightArrow = ({ onClick, ...rest }) => {
    return (
      <div onClick={() => onClick()} className={classes.scrollIcon}>
        <ChevronRight fontSize="40px" />
      </div>
    );
  };

  return (
    <Box
      position="relative"
      zIndex={currentIndex === currentCarouselIndex ? 9 : 1}
      py={0.4}
      height={isMobile ? 170 :isTablet ? 280 : 350}
      id={categoryName}

    >
      <Typography
        variant="h4"
        className={classes.carouselTitle}
        fontWeight={600}
      >
        {categoryTitle}
      </Typography>
      <Box>
        <Carousel
          slidesToSlide={4}
          removeArrowOnDeviceType={["tablet", "mobile", "smallMobile"]}
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
          responsive={responsive}
          containerClass={classes.thumbnailBox}
        >
          {thumbnails &&
            thumbnails?.length > 0 &&
            thumbnails.map((thumbnail, index) => {
              return (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: [1, 1.2, 1],
                  }}
                >
                  <MovieCarouselItem
                    thumbnail={thumbnail}
                    index={index}
                    setCurrentIndex={setCurrentIndex}
                    currentCarouselIndex={currentCarouselIndex}
                    showDescriptionCard={true}
                    width={205}
                    height={230}
                    setWatchListMovieIds={setWatchListMovieIds}
                    watchListMovieIds={watchListMovieIds}
                  />
                </motion.div>
              );
            })}
        </Carousel>
      </Box>
    </Box>
  );
}

export default MovieCarousel;
