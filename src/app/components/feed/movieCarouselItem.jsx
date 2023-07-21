import React from 'react'
import { Add, PlayCircleFilled, ThumbDownOffAlt, ThumbUpOffAlt } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { ellipSize } from '@/app/utils/commonUtil'
import { useMobile, useTablet } from '@/app/hooks/mediaHooks';
import classes from '../../styles/feed.module.css'

function MovieCarouselItem({ thumbnail, index, setCurrentIndex, currentCarouselIndex, showDescriptionCard,width,height }) {
    const isTablet = useTablet()
    const isMobile = useMobile()
    return (
        <div
            onMouseOver={() => setCurrentIndex && setCurrentIndex(currentCarouselIndex)}
            onMouseLeave={() => setCurrentIndex && setCurrentIndex(-1)}
            key={index} className={classes.thumbnailItem}>
            <Image className={classes.thumbnailImage} src={`https://image.tmdb.org/t/p/w500${thumbnail.backdrop_path || thumbnail.poster_path
                }`} alt="" width={width} height={height}></Image>
            {!isMobile && showDescriptionCard && <Box className={classes.descriptionBox}>
                <Box className={classes.descriptionIcons}>
                    <PlayCircleFilled className={classes.playIcon} />
                    <Add className={classes.icon} />
                    <ThumbUpOffAlt className={classes.icon} />
                    <ThumbDownOffAlt className={classes.icon} />
                </Box>
                <Typography className={classes.descTitle} mt={1} >{thumbnail?.title || thumbnail?.original_title}</Typography>

                <Typography mb={1} className={classes.descSubTitle} >{ellipSize(thumbnail?.overview, isTablet ? 80 : 120)}</Typography>
            </Box>}
        </div>
    )
}

export default MovieCarouselItem