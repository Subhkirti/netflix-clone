import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import classes from '../../styles/feed.module.css'
import Carousel from "react-multi-carousel";
import { ChevronRight, ChevronLeft, } from '@mui/icons-material'
import { motion } from "framer-motion"
import MovieCarouselItem from './movieCarouselItem';
import { responsive } from '@/app/utils/constants';

function MovieCarousel({
    categoryTitle, thumbnails,
    currentCarouselIndex
}) {
    const [currentIndex, setCurrentIndex] = useState(-1)
    const movie_api = `https://api.themoviedb.org/3/movie/447365?api_key=4f5ca790025ea4baf6f9d72988810577&language=en-US&append_to_response=videos`

    const CustomLeftArrow = ({ onClick, ...rest }) => {
        return <div onClick={() => onClick()} className={classes.leftScrollIcon}>
            <ChevronLeft fontSize="40px" />
        </div>
    }
    const CustomRightArrow = ({ onClick, ...rest }) => {
        return <div onClick={() => onClick()} className={classes.scrollIcon}>
            <ChevronRight fontSize="40px" />
        </div>
    }

    return (
        <Box position="relative" zIndex={currentIndex === currentCarouselIndex ? 9 : 1} py={0.4} height={250} >
            <Typography variant='h4' fontWeight={600}>{categoryTitle}</Typography>
            <Box mt={1}>
                <Carousel
                    slidesToSlide={4}
                    removeArrowOnDeviceType={["tablet", "mobile"]} customRightArrow={<CustomRightArrow />}
                    customLeftArrow={<CustomLeftArrow />}
                    responsive={responsive}
                    containerClass={classes.thumbnailBox}>
                    {thumbnails && thumbnails?.length > 0 && thumbnails.map((thumbnail, index) => {
                        return <motion.div
                            key={index}
                            whileHover={{
                                scale: [1, 1.2, 1],
                            }}
                        >
                            <MovieCarouselItem thumbnail={thumbnail} index={index} setCurrentIndex={setCurrentIndex} currentCarouselIndex={currentCarouselIndex} showDescriptionCard={true} width={250} height={150} />
                        </motion.div>
                    })}
                </Carousel>
            </Box>
        </Box>
    )
}

export default MovieCarousel