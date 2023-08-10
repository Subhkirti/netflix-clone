import "./globals.css";
import { Signika } from "next/font/google";

const signika = Signika({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Netflix",
  description: "Netflix Clone via Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta
        name="google-site-verification"
        content="JFowyBHy2lNJYSuIVtTrjGU8saR9yC8XArQLZYcCUDo"
      />
      <link
        rel="preload"
        as="image"
        href="https://assets.nflxext.com/ffe/siteui/vlv3/d7af077c-af5a-4055-8f9a-740a43588583/95bae10c-9773-4447-af4e-612a244231bd/IN-hi-20230717-popsignuptwoweeks-perspective_alpha_website_large.jpg"
      ></link>
      <body className={signika.className}>{children}</body>
    </html>
  );
}
