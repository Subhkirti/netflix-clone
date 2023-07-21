import { useMediaQuery } from "@mui/material";

function useMobile() {
  return useMediaQuery("(max-width:450px)");
}

function useTablet() {
  return useMediaQuery("(max-width:950px)");
}
export {useMobile,useTablet}
