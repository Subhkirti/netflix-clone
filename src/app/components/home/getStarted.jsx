import React, { useState } from 'react'
import { Typography, Box, Button, TextField, } from '@mui/material'
import { getLanguage, getCurrentUser, setCurrentUser } from '../../services/authService';
import language from '../../languages/langIndex';
import classes from "../../styles/home.module.css";
import { CancelOutlined, KeyboardArrowRight } from '@mui/icons-material';
import styled from 'styled-components';
import dynamic from "next/dynamic";
import { isValidEmail } from '@/app/utils/commonUtil';
import { useMobile } from '@/app/hooks/mediaHooks';
import { useRouter } from 'next/navigation'

function GetStarted() {
  const globalLanguage = getLanguage()
  const languageText = language[globalLanguage || 'en'];
  const user = getCurrentUser()
  const [email, setEmail] = useState((user && user?.emailOrMobile) || '')
  const [errMsg, setErrMsg] = useState("")
  const validEmail = isValidEmail(email);
  const isMobile = useMobile()
  const router = useRouter()

  function handleEmail(e) {
    const value = e?.target?.value
    setEmail(value)

    if (value === "") {
      setErrMsg(languageText?.EMAIL_IS_REQUIRED)
    }
    else {
      errMsg && setErrMsg(validEmail ? "" : value.includes("@") ? "" : `${value + " " + languageText?.IS_MISSING}`);
    }
  }

  function handleOnSubmit() {

    if (validEmail) {
      setErrMsg("")
      const userRequest = { emailOrMobile: email };
      user ? setCurrentUser({ ...user, ...userRequest }) : setCurrentUser(userRequest);
      router.push('/signup/registration')
    }
    else if (!email) {
      setErrMsg(languageText?.EMAIL_IS_REQUIRED)
    }
    else {
      setErrMsg(languageText?.ONLY_EMAIL_VALIDATION_TEXT)
    }
  }

  return (
    <React.Fragment>
      <Typography className='subTitle' mb={2} align='center'>{languageText?.READY_TO_WATCH}</Typography>
      <Box className={classes.inputWrapper} >
        <Box className={classes.alignColumn}>
          <CssTextField validemail={validEmail.toString()} errmsg={errMsg} style={{ width: isMobile ? "300px" : "500px" }} value={email} label={languageText.EMAIL_ADDRESS} onChange={handleEmail} />
          {errMsg &&
            <Typography className={classes.errMessage}><CancelOutlined fontSize="10" />{errMsg}</Typography>}
        </Box>
        <Button variant="contained" onClick={handleOnSubmit} className={classes.startedBtn} endIcon={<KeyboardArrowRight className={classes.rightArrow} />}>
          {languageText?.GET_STARTED}
        </Button>
      </Box>

    </React.Fragment>
  )
}
const CssTextField = styled(TextField)({

  color: 'white',
  '& label': {
    color: 'rgb(201, 201, 201)',
  },
  '& label.Mui-focused': {
    color: 'rgb(201, 201, 201)',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': {
      borderColor: ((props) => props.errmsg ? "#e50815" : props.validemail === "true" ? "rgb(43, 184, 113)" : 'grey'),
      color: 'white',

    },
    '&:hover fieldset': {
      borderColor: ((props) => props.errmsg ? "#e50815" : props.validemail === "true" ? "rgb(43, 184, 113)" : 'grey'),
    },
    '&.Mui-focused fieldset': {
      borderColor: ((props) => props.errmsg ? "#e50815" : props.validemail === "true" ? "rgb(43, 184, 113)" : 'white'),
    },
  },
});
export default dynamic(() => Promise.resolve(GetStarted), { ssr: false });