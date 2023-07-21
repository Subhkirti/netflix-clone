import { Signika } from "next/font/google";
import { ThemeProvider, createTheme } from "@mui/material";

const signika = Signika({
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: `${signika.style.fontFamily}, Arial`,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [
          {
            fontFamily: `Signika, ${signika.style.fontFamily}`,
            fontStyle: "normal",
            fontDisplay: "swap",
          },
        ],
      },
    },
  },
});

export default theme;
