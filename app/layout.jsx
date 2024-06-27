import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import Header from "@/components/Header";
import Staireffect from "@/components/Staireffect";
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] , weight: ["100","200","300","400","600","700","800"],
  variable: '--font-jetbrainsMono'
});

export const metadata = {
  title: "MK's Portfolio",
  description: "Dive in!!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.variable}> 
        <Header />
    <Staireffect/>
        <PageTransition>
        {children}

        </PageTransition>
        </body>
    </html>
  );
}
