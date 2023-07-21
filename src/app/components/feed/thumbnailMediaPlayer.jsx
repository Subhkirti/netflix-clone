import React, { useEffect, useState } from 'react'
import { fetchMovies } from '@/app/services/feedService';
import classes from '../../styles/feed.module.css'
import Image from 'next/image'
import { Box, Typography, Button } from '@mui/material'
import { ellipSize } from '@/app/utils/commonUtil'
import { ErrorOutline, PlayArrow } from '@mui/icons-material';
import { useTablet } from '@/app/hooks/mediaHooks';

function ThumbnailMediaPlayer() {
  const [banners, setBanners] = useState([])
  const [homeBanner, setHomeBanner] = useState("")
  const isTablet = useTablet()
  useEffect(() => {
    async function fetchBannersData() {
      try {
        const res = await fetchMovies();
        res.movies_data && res.movies_data.map((element) =>
          element.isBannerMovies && banners?.length === 0 && setBanners(element?.movies));
      }
      catch {
      }
    }
    banners?.length === 0 && fetchBannersData();

    if (banners.length > 0) {
      const randomIndex = parseInt(Math.random() * (banners.length - 1));
      setHomeBanner(banners[randomIndex])
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banners]);


  return (
    <Box>
      <Box className={classes.bannerBox}>
        {homeBanner && <Image src={`https://image.tmdb.org/t/p/w500${homeBanner.backdrop_path || homeBanner.poster_path
          }`} alt="" width={1000} height={700} style={{ zIndex: -1, width: "100%", position: "absolute", inset: "0px" }}></Image>}
        <Box className={classes.shadowBox}></Box>

        <Box className={classes.bannerDescription}>
          <Typography className={classes.bannerTitle}>{homeBanner?.title || homeBanner?.original_title}</Typography >
          <Typography className={classes.bannerSubTitle}>{ellipSize(homeBanner?.overview, isTablet ? 250 : 400)}</Typography>
          <Box mt={2}>
            <Button className={classes.bannerPlayIcon} variant='contained' startIcon={<PlayArrow style={{ fontSize: "30px" }} />}>Play</Button>
            <Button className={classes.infoIcon} variant='contained' startIcon={<ErrorOutline />}>More Info</Button>
          </Box>
        </Box>


      </Box >
    </Box>

  )
}

export default ThumbnailMediaPlayer
