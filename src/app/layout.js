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
      <body className={signika.className}>{children}</body>
    </html>
  );
}
