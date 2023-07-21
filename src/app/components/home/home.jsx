"use client";
import React from "react";
import Image from "next/image";
import logo from "../../images/logo.png";
import classes from "../../styles/home.module.css";
import { Box, Button, Typography } from "@mui/material";
import { getLanguage } from "../../services/authService";
import language from "../../languages/langIndex";
import GetStarted from "./getStarted";
import LanguageSelection from "./languageSelection";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useMobile } from "@/app/hooks/mediaHooks";

function Home() {
  const isMobile = useMobile()
  const globalLanguage = getLanguage()
  const languageText = language[globalLanguage || 'en'];
  return (
    <Box>
      <Box className='heroImage'>
        <Box className='overlay'>
          <Box className={`${classes.topSection}`} >
            <Image
              src={logo}
              alt=""
              width={isMobile ? "120" : "155"}
              height={isMobile ? "40" : "50"}
              priority="high"
            />

            <Box className={classes.rightSection}>
              <LanguageSelection />
              <Link href="/login">
                <Button variant="contained" className={classes.signInBtn}>{languageText?.SIGN_IN}
                </Button>
              </Link>
            </Box>
          </Box>
          <Box className={`${classes.middleSection} clearFix`}>
            <Typography mb={1} className="title">{languageText?.UNLIMITED_MOVIES}</Typography >
            <Typography mb={3} className="subTitle" >{languageText?.WATCH_ANYWHERE}</Typography>
            <GetStarted />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
