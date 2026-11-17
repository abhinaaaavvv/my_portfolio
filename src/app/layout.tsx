import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
});

export const metadata: Metadata = {
  title: "abhinav",
  description: "my portfolio",
};

// Runs before first paint so the saved / system theme is applied without a
// flash of the light theme. Kept in sync with THEME_STORAGE_KEY in
// "@/components/theme-provider".
const themeInit = `(function(){try{var t=localStorage.getItem("portfolio-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}var r=document.documentElement;r.style.setProperty("--light",t==="dark"?"#141414":"#f1ece9");r.style.setProperty("--dark",t==="dark"?"#f1ece9":"#141414");r.style.colorScheme=t;}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: themeInit }}
        />
        {children}
      </body>
    </html>
  );
}
