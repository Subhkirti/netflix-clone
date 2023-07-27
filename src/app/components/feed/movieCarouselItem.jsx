import React, { useState } from 'react'
import { Add, Check, PlayCircleFilled, ThumbDownOffAlt, ThumbUpOffAlt } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { ellipSize } from '@/app/utils/commonUtil'
import { useMobile, useTablet } from '@/app/hooks/mediaHooks';
import classes from '../../styles/feed.module.css'
import { addToWatchList } from '@/app/services/movieService'
import { getCurrentUser, setCurrentUser } from '@/app/services/authService'

function MovieCarouselItem({ thumbnail, index, setCurrentIndex, currentCarouselIndex, showDescriptionCard, width, height, categoryId }) {
    const isTablet = useTablet()
    const isMobile = useMobile()
    const user = getCurrentUser()
    const [watchListIndex, setWatchListIndex] = useState(-1)

    async function handleWatchListBtn(thumbnail, index, addToList) {
        const reqBody = {
            userId: user && user?.userId,
            watchList: thumbnail,
            categoryId: categoryId
        }
        if (addToList) {
            const data = await addToWatchList(reqBody)
            if (data.status === 'SUCCESS') {
                setWatchListIndex(index)
                const newUser = data.updatedUser
                setCurrentUser({ ...newUser, loginSuccessfully: true });
            }
        } else {
            // snackbar message

        }

    }
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
                    {watchListIndex === index || thumbnail?.addedToWatchList ? <Check className={classes.icon} onClick={() => handleWatchListBtn(thumbnail, index, false)} /> : <Add className={classes.icon} onClick={() => handleWatchListBtn(thumbnail, index, true)} />}

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