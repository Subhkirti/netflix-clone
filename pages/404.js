"use client";
import React from "react";
import Header from "@/app/components/header";
import classes from "@/app/styles/404.module.css";
import { Typography, Box, Button } from "@mui/material";
import "../src/app/globals.css";
import Link from "next/link";
import Image from "next/image";
import NotFoundLogo from "../src/app/images/not-found.png";
import { getLanguage } from "@/app/services/authService";
import language from "@/app/languages/langIndex";
import dynamic from "next/dynamic";

function PageNotFound() {
  const globalLanguage = getLanguage();
  const languageText = language[globalLanguage || "en"];
  return (
    <>
      <Header />
      <Box className={classes.mainWrapper} mt={10} px={6}>
        <Box className={classes.flexItem} mb={4}>
          <Typography mb={1} className="title">
            {languageText?.LOST_YOUR_WAY}
          </Typography>
          <Typography className="subTitle">
            {languageText?.SORRY_TEXT}
          </Typography>

          <Typography className={`${classes.errCodeText} subTitle`}>
            {languageText?.ERROR_CODE} <strong>NSES-404</strong>
          </Typography>
          <Link href="/">
            <Button variant="contained" className={classes.homeBtn}>
              Netflix {languageText?.HOME}
            </Button>
          </Link>
        </Box>
        <Image
          src={NotFoundLogo}
          alt=""
          width="740"
          height="600"
          className={classes.flexItem}
        />
      </Box>
    </>
  );
}

export default dynamic(() => Promise.resolve(PageNotFound), { ssr: false });
