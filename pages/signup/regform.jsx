import React, { useState } from 'react';
import classes from "@/app/styles/signUp.module.css";
import Header from '@/app/components/header';
import { Box, Typography, Button, } from '@mui/material';
import { getCurrentUser, getLanguage, signUpAuth, setCurrentUser } from '@/app/services/authService';
import language from '@/app/languages/langIndex';
import Footer from '@/app/components/footer';
import dynamic from 'next/dynamic';
import CommonTextField from '@/app/components/commonTextField';
import { CancelOutlined, Visibility, VisibilityOff, Warning } from '@mui/icons-material';
import { isValidEmail } from '@/app/utils/commonUtil';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Regform() {
    const user = getCurrentUser();
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState({ email: (user && user?.emailOrMobile) || "", password: "", passwordErrormessage: "", emailErrorMessage: "", showSignInModal: false })
    const globalLanguage = getLanguage();
    const languageText = language[globalLanguage || "en"];
    const validEmail = isValidEmail(value?.email);
    const router = useRouter()
    function handleOnChange(type, e) {
        const inputValue = e.target.value
        if (e?.key === "Enter") {
            handleOnSignIn();
        }
        type === "email" ? setValue({ ...value, email: inputValue, }) : setValue({ ...value, password: inputValue, })
    }

    async function handleOnSignIn() {
        if (value.email === "" && value.password === "") {
            setValue({ ...value, emailErrorMessage: languageText?.EMAIL_IS_REQUIRED, passwordErrormessage: languageText.PASSWORD_IS_REQUIRED })
        }
        else if (value?.emailErrorMessage && value.email) {
            setValue({ ...value, emailErrorMessage: validEmail ? "" : !value.email.includes("@") && `${value.email + " " + languageText?.IS_MISSING}` });
        }
        else if (!validEmail && value.email.includes("@")) {
            setValue({ ...value, emailErrorMessage: languageText?.ONLY_EMAIL_VALIDATION_TEXT, })
        }
        else if (!validEmail && value?.password?.length < 4) {
            setValue({ ...value, emailErrorMessage: languageText?.ONLY_EMAIL_VALIDATION_TEXT, passwordErrormessage: languageText.PASSWORD_VALIDATION_TEXT })
        }

        else if (value?.password?.length < 4) {
            setValue({ ...value, passwordErrormessage: languageText.PASSWORD_VALIDATION_TEXT, })
        }
        else {
            setValue({ ...value, passwordErrormessage: "", emailErrorMessage: "" })

            const res = await signUpAuth({
                email: String(value.email),
                loginSource: "email",
                password: value.password
            });

            if (res.status === "SUCCESS") {
                if (res.isUserAlreadyExist) {
                    setValue({ ...value, showSignInModal: true })
                } else {
                    const updatedUser = { ...res.userObject, loginSuccessfully: true }
                    setCurrentUser({ ...user, ...updatedUser });
                    router.push('/')
                }
            }
            else {
                if (res.code === 11000) {
                    setValue({ ...value, showSignInModal: true })
                }
                else {
                    setValue({ ...value, passwordErrormessage: res.error_message })
                }
            }
        }

    }
    return (
        <React.Fragment>
            <Header signUp={true} />
            <Box className={`${classes.deviceBox} displayFlexColumn`}>
                <Box className={classes.leftWidthClass}>
                    {value.showSignInModal &&
                        <Box mt={5} p={2} className={classes.signInErr} >
                            <Warning />
                            {globalLanguage === "en" ?
                                <Typography >
                                    Looks like that account already exists.<Link className={classes.colorBlack} href="/login">Sign into that account</Link> or try using a different email.
                                </Typography>
                                : <Typography>
                                    ऐसा लगता है कि अकाउंट पहले से मौजूद है. <Link className={classes.colorBlack} href="/login">अपने मौजूदा अकाउंट में साइन इन करें</Link> या कोई दूसरा ईमेल एड्रेस उपयोग करके देखें.
                                </Typography>}
                        </Box>}

                    <Typography mt={5} fontWeight={300}>{languageText?.STEP} 2/2</Typography>
                    <Typography className={classes.settingAccount}>{languageText?.CREATE_A_PASSWORD} </Typography>
                    <Typography className={classes.netflixPersonalised}>{languageText?.JUST_FEW_MORE_PAPERWORK} </Typography>

                    <Box className="displayFlexColumn" gap={1} mt={3}>
                        {/* Email textfield */}
                        <CommonTextField whiteBG={true} value={value.email}
                            type="text"
                            handleOnChange={(e) => handleOnChange("email", e)} label={languageText.EMAIL_ADDRESS} />
                        {
                            value.emailErrorMessage &&
                            <Button startIcon={<CancelOutlined />} className={classes.errorMessage}>{value.emailErrorMessage}</Button>
                        }

                        {/* Password textfield */}
                        <CommonTextField whiteBG={true} value={value.password}
                            type={showPassword ? "text" : "password"} handleOnChange={(e) => handleOnChange("password", e)} label={languageText.PASSWORD}
                            Icon={showPassword ? <Visibility style={{ color: '#8c8c8c', cursor: "pointer" }} /> : <VisibilityOff style={{ color: '#8c8c8c', cursor: "pointer" }} />}
                            handleIconBtn={() => setShowPassword(!showPassword)}
                        />
                        {
                            value.passwordErrormessage && <Button
                                startIcon={<CancelOutlined />} className={classes.errorMessage}>{value.passwordErrormessage}</Button>
                        }

                    </Box>

                    <Button style={{ marginTop: "30px" }} variant="contained" fullWidth className={classes.nextButton} onClick={handleOnSignIn}>{languageText?.NEXT}</Button>
                </Box>

            </Box>
            <Footer />
        </React.Fragment>
    )
}

export default dynamic(() => Promise.resolve(Regform), { ssr: false });