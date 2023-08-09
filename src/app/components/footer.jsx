import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import classes from "../styles/home.module.css";
import Link from "next/link";
import { footerData } from "../utils/homeUtil";
import { getLanguage } from "../services/authService";
import language from "../languages/langIndex";
import LanguageSelection from "./home/languageSelection";
import dynamic from "next/dynamic";

function Footer() {
    const globalLanguage = getLanguage();
    const languageText = language[globalLanguage || "en"];

    return (
        <Box className={`${classes.footerContainer}`} >
            <Box display="flex" gap={0.6}>
                <Typography>
                    {languageText.FOOTER_TITLE + " "}
                </Typography>

                <Link className={classes.linkStyle} href="/">
                    <Typography>
                        000-800-919-1694
                    </Typography>
                </Link>
            </Box>
            <Grid container className={classes.gridWrapper} my={5}>
                {footerData.map((footer, i) => {
                    return (
                        <Grid item key={i}>
                            <Link className={classes.linkStyle} href={footer.url}>
                                <Typography>
                                    {footer.text}
                                </Typography>
                            </Link>
                        </Grid>
                    );
                })}
            </Grid>
            <LanguageSelection />
            <Typography mt={3} className={classes.linkStyle}>{languageText.NETFLIX_INDIA}</Typography>
        </Box>
    );
}

export default dynamic(() => Promise.resolve(Footer), { ssr: false });
