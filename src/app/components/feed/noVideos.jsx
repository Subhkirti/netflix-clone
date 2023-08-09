import React from "react";
import sadFace from "../../images/no-videos.png";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useMobile, useTablet } from "@/app/hooks/mediaHooks";
import { getLanguage } from "@/app/services/authService";
import language from "@/app/languages/langIndex";

function NoVideos() {
    const isTablet = useTablet()
    const isMobile = useMobile()
    const globalLanguage = getLanguage();
    const languageText = language[globalLanguage || "en"];
    return (
        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <Image
                src={sadFace}
                alt=""
                width={isMobile ? "230" : isTablet ? "350" : "520"}
                height={isMobile ? "200" : isTablet ? "300" : "450"}
                priority="high"
            />
            <Typography className="title">
                {languageText?.YOUR_WATCHLIST_IS_EMPTY}
            </Typography>
        </Box>
    );
}

export default NoVideos;
