import React from 'react'
import { AppBar, Box, Typography } from '@mui/material'
import logo from "../images/logo.png"
import Image from 'next/image'
import dynamic from "next/dynamic";
import Link from 'next/link';
import { useMobile, useTablet } from '../hooks/mediaHooks';
import { getLanguage, getIsUserLoggedIn } from '../services/authService';
import language from '../languages/langIndex';
import { usePathname } from 'next/navigation';
import SignOutButton from './signOutButton';
import { Menu } from '@mui/icons-material';

function Header({ transparent, tabsData, signUp }) {
    const isMobile = useMobile()
    const isTablet = useTablet()
    const globalLanguage = getLanguage()
    const languageText = language[globalLanguage || 'en'];
    const location = usePathname()
    const isUserLoggedIn = getIsUserLoggedIn()
    const isFeed = location === "/" && isUserLoggedIn
    console.log('location:', location, tabsData)


    return (
        <React.Fragment>
            <AppBar style={{
                position: transparent || signUp ? "absolute" : "fixed",
                borderBottom: signUp ?
                    '1px solid #e6e6e6' : "none", backgroundColor: transparent ? "transparent" : signUp ? "white" : "black", padding: isTablet ? "20px 30px" : "20px 70px", boxShadow: "none",
                display: 'flex', flexDirection: "row", justifyContent: "space-between", alignItems: "center",
            }}>
                <Box style={{
                    display: 'flex', flexDirection: "row",
                    gap: tabsData ? isTablet ? "20px" : "40px" : "0px",
                    justifyContent: "space-between", alignItems: "center",
                }}>
                    {isFeed && isTablet && <Menu />}
                    <Link href="/">
                        <Image
                            style={{ marginTop: "6px" }}
                            src={logo}
                            alt=""
                            width={transparent ? isMobile ? "100" : "200" : "100"}
                            height={transparent ? isMobile ? "30" : "50" : "30"}
                            priority="high"
                        />
                    </Link>

                    {!isTablet && tabsData && <Box className='displayFlex' width="600px">
                        {tabsData.map((tab, i) => {
                            return <a href={tab.url} style={{ color: 'white',textDecoration:"none" }} key={i} ><Typography className={location === tab.url ? "underline" : 'animatedUnderLine'}>{tab.title}</Typography></a>
                        })}
                    </Box>}

                </Box>
                {tabsData && isUserLoggedIn && <SignOutButton />}

                {signUp && <Link href="/login" style={{ color: "black" }}><Typography className="removeLinkStyle" variant='h6'>{languageText.SIGN_IN}</Typography></Link>}
            </AppBar>

            <Box mb={10}></Box>
        </React.Fragment>
    )
}

export default dynamic(() => Promise.resolve(Header), { ssr: false });
