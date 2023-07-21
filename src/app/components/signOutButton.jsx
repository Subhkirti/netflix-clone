import React from 'react'
import { Button } from '@mui/material'
import classes from "../styles/signUp.module.css"
import dynamic from "next/dynamic";
import { getLanguage } from '../services/authService';
import language from '../languages/langIndex';
import Link from 'next/link';

function SignOutButton() {
    const globalLanguage = getLanguage()
    const languageText = language[globalLanguage || 'en'];

    function handleSignOut() {
        if (typeof window !== "undefined") {
            localStorage.clear();
        }
    }

    return (
        <Link href="/"><Button onClick={handleSignOut} variant='contained' className={classes.signOutBtn}>{languageText.SIGN_OUT}</Button></Link>
    )
}
export default dynamic(() => Promise.resolve(SignOutButton), { ssr: false });
