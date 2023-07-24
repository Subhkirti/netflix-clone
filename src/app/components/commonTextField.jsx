import React from 'react'
import styled from 'styled-components';
import { InputAdornment, TextField } from '@mui/material'
import { useMobile } from '../hooks/mediaHooks';

function CommonTextField({ helperText, label, Icon, handleOnChange, value, maxLength, type, handleIconBtn, whiteBG }) {

  const isMobile = useMobile()
  return (
    <CssTextField ismobile={isMobile ? "true" : "false"} whitebg={whiteBG ? "true" : "false"} autoComplete="off" type={type || "text"} helperText={helperText || ""} inputProps={{ maxLength: maxLength || undefined }} onChange={handleOnChange} label={label} value={value} variant="filled" InputProps={{
      endAdornment: (
        Icon && <InputAdornment position="end" onClick={handleIconBtn && handleIconBtn}>
          {Icon}
        </InputAdornment>
      ),
    }}>
    </CssTextField>
  )
}
const CssTextField = styled(TextField)({
  flexWrap: 'wrap',
  width:'100%',
  backgroundColor: ((props) => props.whitebg === "true" ? "transparent" : "#333"),
  border: '1px solid black',
  borderRadius: "6px",
  caretColor: ((props) => props.whitebg === "true" ? "black" : "white"),

  '& input': {
    color: ((props) => props.whitebg === "true" ? "black !important" : 'white'),
  },
  '& ::before': {
    border: "none",
  },

  "& :hover:not(.Mui-disabled, .Mui-error):before": {
    border: "none",
  },
  ".css-1gctnaj-MuiInputBase-input-MuiFilledInput-input": {
    color: 'white',
  },
  ".css-anqg2g-MuiInputBase-root-MuiFilledInput-root": {
    backgroundColor: ((props) => props.whitebg === "true" ? "transparent" : "#333"),
    width: ((props) => props.ismobile === "true" ? "250px" : "400px"),
    borderRadius: "6px !important",
  },
  ".css-12kqr50-MuiInputBase-root-MuiFilledInput-root": {
    backgroundColor: ((props) => props.whitebg === "true" ? "transparent" : "#333"),
    width: ((props) => props.ismobile === "true" ? "250px" : "400px"),
    borderRadius: "6px !important",
  },
  ".css-10botns-MuiInputBase-input-MuiFilledInput-input": {
    color: 'white',
  },
  '.css-anqg2g-MuiInputBase-root-MuiFilledInput-root:after': {
    border: 'none',
  },
  ".css-12kqr50-MuiInputBase-root-MuiFilledInput-root:after": {
    border: 'none',
  },
  '& label': {
    color: '#8c8c8c',
  },
  '& label.Mui-focused': {
    color: '#8c8c8c',
  },
});
export default CommonTextField