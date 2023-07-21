import React from 'react'
import { Box, Typography } from '@mui/material'
import classes from "../../styles/home.module.css";
import { homeCarouselData } from '../../utils/homeUtil';
import Image from 'next/image';
import Faq from './faq';
import Footer from '../footer';
import dynamic from "next/dynamic";
import { useMobile, useTablet } from '@/app/hooks/mediaHooks';
import BorderLine from '../borderLine';

function HomeCarousel() {
    const isMobile = useMobile()
    const isTablet = useTablet()
    const homeCarousel = homeCarouselData(isMobile, isTablet)
    return (
        <Box className={`${classes.carouselWrapper}`} >
            {homeCarousel.map((carousel, index) => {
                return <Box key={index}>
                    <BorderLine />
                    <Box className={`${classes.carouselItem} clearFix`}
                        style={{ flexDirection: index % 2 === 0 ? "row" : "row-reverse" }}>
                        <Box>
                            <Typography className="title" mb={2}>{carousel.title}</Typography>
                            <Typography style={isTablet ? { margin: "0px auto", maxWidth: "500px" } : {
                                maxWidth: "500px"
                            }} className='subTitle'>{carousel.subTitle}</Typography>
                        </Box>
                        {carousel?.source && <Image src={carousel.source} alt="" width={carousel.width} height={carousel.height} />
                        }
                        {/* 
                        {carousel.videoSource && <video style={carousel.videoStyle} autoPlay muted loop><source src={carousel.videoSource} type="video/mp4"></source></video>} */}

                    </Box>
                </Box>
            })}
            <BorderLine/>
            <Faq />
            <BorderLine/>
            <Footer />

        </Box>
    )
}

export default dynamic(() => Promise.resolve(HomeCarousel), { ssr: false });