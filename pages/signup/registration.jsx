import React from 'react'
import Header from '@/app/components/header'
import { Box, Typography, Button } from "@mui/material"
import Footer from '@/app/components/footer'
import Image from 'next/image'
import dynamic from 'next/dynamic';
import { getLanguage } from '@/app/services/authService'
import language from '@/app/languages/langIndex'
import classes from "@/app/styles/signUp.module.css"
import { useRouter } from 'next/router'

function Registration() {
    const globalLanguage = getLanguage();
    const languageText = language[globalLanguage || "en"];
    const router = useRouter()
    return (
        <React.Fragment>
            <Header signUp={true} />
            <Box  className={`${classes.deviceBox} displayFlexColumn`}>
                <Box mt={14} className={classes.widthClass}>
                    <Image src="https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Devices.png" alt="" width={250} height={70} />
                    <Typography mt={5} fontWeight={300}>{languageText?.STEP} 1/2</Typography>
                    <Typography className={classes.settingAccount}>{languageText?.FINISH_SETTING_UP_YOUR_ACCOUNT} </Typography>
                    <Typography style={{ padding: "3% 15%" }} className={classes.netflixPersonalised}>{languageText?.NETFLIX_IS_PERSONALIZED} </Typography>
                    <Button variant="contained" fullWidth className={classes.nextButton} onClick={() => router.push('/signup/regform')}>{languageText?.NEXT}</Button>
                </Box>

            </Box>

            <Footer />
        </React.Fragment >
    )
}

export default dynamic(() => Promise.resolve(Registration), { ssr: false });