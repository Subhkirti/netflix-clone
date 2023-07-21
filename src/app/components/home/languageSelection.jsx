import React, { useState } from 'react'
import classes from "../../styles/home.module.css";
import { Box, MenuItem, Select } from '@mui/material';
import { Language } from '@mui/icons-material';
import { getLanguage, setLanguage } from '../../services/authService';
import dynamic from "next/dynamic";
import { useMobile } from '../../hooks/mediaHooks';

function LanguageSelection() {
    const isMobile = useMobile()
    const globalLanguage = getLanguage()
    const languages = ["English", "हिंदी"];
    const [webLanguage, setWebLanguage] = useState(globalLanguage === "hi" ? "हिंदी" : "English")

    function handleLanguageChange(e) {
        const index = e?.target?.value
        setWebLanguage(languages[index])
        setLanguage(index === 0 ? "en" : "hi")
        window.location.reload()

    }

    return (
        <Select
            className={classes.languageSelection}
            displayEmpty
            onChange={handleLanguageChange}
            value={languages.indexOf(webLanguage)}
            renderValue={() => {
                return (
                    <Box className={classes.langIcon} >
                        <Language /> {isMobile ? "" : webLanguage}
                    </Box>
                );
            }}
        >
            {languages.map((lang, index) =>
                <MenuItem key={index} value={index} className={classes.languageSelectionOption}>
                    <span style={{ marginRight: webLanguage === lang ? "4px" : "18px" }}>{webLanguage === lang ? "✓" : " "}</span>
                    {lang}
                </MenuItem>
            )}
        </Select>
    )
}

export default dynamic(() => Promise.resolve(LanguageSelection), { ssr: false });