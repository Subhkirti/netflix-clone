import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import Header from '../src/app/components/header';
import Footer from '@/app/components/footer';
import BorderLine from '@/app/components/borderLine';
import classes from "@/app/styles/login.module.css";
import { getLanguage, loginAuth, setCurrentUser, getCurrentUser } from '@/app/services/authService';
import language from '@/app/languages/langIndex';
import dynamic from 'next/dynamic';
import CommonTextField from '@/app/components/commonTextField';
import { useState } from 'react';
import Link from 'next/link';
import { hasOnlyDigits, isValidEmail } from '../src/app/utils/commonUtil';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation'

function Login() {
    const [hideLeanMore, setHideLearnMore] = useState(false)
    const user = getCurrentUser()
    const [value, setValue] = useState({ email: (user && user?.emailOrMobile) || "", password: "", showEmailErrorMessage: false, showPasswordErrorMessage: false, passwordErrormessage: "", emailErrorMessage: "", showNewAccountModal: false })
    const [showPassword, setShowPassword] = useState(false);

    const [valueCategory, setValueCategory] = useState('')
    const globalLanguage = getLanguage();
    const languageText = language[globalLanguage || "en"];
    const router = useRouter()

    function handleOnChange(type, e) {
        const inputValue = e.target.value
        if (e?.key === "Enter") {
            handleOnSignIn();
        }
        if (type === "email") {
            setValue({ email: inputValue, password: value.password, showErrorMessage: false })

            hasOnlyDigits(inputValue) ? setValueCategory("mobile") : setValueCategory("email");
        }
        else {
            setValue({ email: value.email, password: inputValue, showErrorMessage: false })
        }
    }

    async function handleOnSignIn() {
        if (value.email === "" || value.password === "") {
            setValue({ email: value.email, password: value.password, showErrorMessage: true, showPasswordErrorMessage: true })
        }
        else {
            const validEmail = isValidEmail(value?.email);
            if ((valueCategory === "mobile" && value?.email?.length !== 10 || valueCategory === "email" && !validEmail) && value?.password?.length < 4) {
                setValue({ email: value.email, password: value.password, showEmailErrorMessage: true, showPasswordErrorMessage: true })
            }
            else if (valueCategory === "mobile" && value?.email?.length !== 10) {
                setValue({ email: value.email, password: value.password, showEmailErrorMessage: true })
            }
            else if (valueCategory === "email" && !validEmail) {
                setValue({ email: value.email, password: value.password, showEmailErrorMessage: true })
            }
            else if (value?.password?.length < 4) {
                setValue({ email: value.email, password: value.password, showPasswordErrorMessage: true })
            }

            else {
                const res = await loginAuth({
                    email: String(value.email),
                    loginSource: valueCategory,
                    password: value.password
                });

                if (res.status === "SUCCESS") {
                    if (res.isUserAlreadyExist) {
                        if (res.alreadyExistedUser.password === value.password && res.alreadyExistedUser.emailOrMobile === value.email) {
                            const updatedUser = { ...res.userObject, loginSuccessfully: true }
                            setCurrentUser({ ...user, ...updatedUser });
                            router.push('/')
                        }
                        else if (res.alreadyExistedUser.emailOrMobile !== value.email) {
                            setValue({ ...value, passwordErrormessage: "Email or Mobile no is wrong!" })
                        }
                        else if (res.alreadyExistedUser.password !== value.password) {
                            setValue({ ...value, passwordErrormessage: "Password is Wrong!" })
                        }
                    }
                    else {
                        setValue({ ...value, showNewAccountModal: true })
                    }
                }
                else {
                    setValue({ ...value, passwordErrormessage: res?.error_message })

                }
            }

        }

    }

    return (
        <React.Fragment>
            <Box className='heroImage'>
                <Header transparent={true} />
                <Box className={`${classes.flexBox} overlay`}>
                    <Box className={classes.mainContainer}>
                        <Typography className={classes.signInTitle}> {languageText?.SIGN_IN}</Typography>
                        {value.showNewAccountModal &&
                            <Box p={2} className={classes.signUpErr} >
                                {globalLanguage === "en" ?
                                    <Typography >
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        Sorry, we can't find an account with this email address. Please try again or <Link style={{ color: "black" }} href="/">create a new account.</Link>
                                    </Typography>
                                    : <Typography>
                                        माफ़ करें, हमें इस ईमेल ऐड्रेस से जुड़ा अकाउंट नहीं मिला. कृपया फिर कोशिश करें या <Link style={{ color: "black" }} href="/">नया अकाउंट बनाएं.</Link>
                                    </Typography>}
                            </Box>}
                        {/* Email / Phone textfield */}
                        <CommonTextField value={value.email}
                            type="text"
                            maxLength={valueCategory && valueCategory === "mobile" ? 10 : 3000}

                            handleOnChange={(e) => handleOnChange("email", e)} label={languageText.EMAIL_OR_PHONE_NUMBER} />

                        {
                            value.showEmailErrorMessage && <Typography className={classes.errorMessage}>{languageText?.EMAIL_VALIDATION_TEXT}</Typography>
                        }


                        {/* Password textfield */}
                        <CommonTextField value={value.password}
                            type={showPassword ? "text" : "password"} handleOnChange={(e) => handleOnChange("password", e)} label={languageText.PASSWORD}

                            Icon={showPassword ? <Visibility style={{ color: '#8c8c8c', cursor: "pointer" }} /> : <VisibilityOff style={{ color: '#8c8c8c', cursor: "pointer" }} />}

                            handleIconBtn={() => setShowPassword(!showPassword)}
                        />

                        {value.showPasswordErrorMessage && <Typography className={classes.errorMessage}>{languageText?.PASSWORD_VALIDATION_TEXT}</Typography>
                        }
                        {value.passwordErrormessage && <Typography className={classes.errorMessage}>{value.passwordErrormessage}</Typography>}

                        <Button onClick={handleOnSignIn} variant="contained" className={classes.signInBtn}>{languageText?.SIGN_IN}</Button>

                        <Typography className={classes.newToText}>
                            {languageText.NEW_TO_NETFLIX} <Link href="/" className={classes.signUpText}>   {languageText.SIGN_UP_NOW} </Link>
                        </Typography>

                        <Typography variant='caption' className={classes.captchaText}>
                            {languageText.THIS_PAGE_IS_PROTECTED} {!hideLeanMore && <span onClick={() => setHideLearnMore(true)} className={classes.learnMoreText}>   {languageText.LEARN_MORE} </span>}
                        </Typography>
                        {hideLeanMore && <Typography variant='caption' className={classes.captchaText}>
                            {languageText.THE_INFORMATION_COLLECTED} <Link href="https://policies.google.com/privacy" target="_blank" className={classes.learnMoreText}>{languageText.PRIVACY_POLICY}</Link> {languageText.AND} <Link target="_blank" href="https://policies.google.com/terms" className={classes.learnMoreText}>{languageText.TERMS_OF_SERVICE}</Link>{languageText.IS_USED_FOR_PROVIDING}
                        </Typography>}
                    </Box>
                </Box>
            </Box>
            <BorderLine />
            <Footer />
        </React.Fragment >
    )
}

export default dynamic(() => Promise.resolve(Login), { ssr: false });