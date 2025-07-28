import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Kishore Murugesan | Portfolio',
  description: 'The personal portfolio of Kishore Murugesan — Web3 and AI developer crafting innovative digital experiences.',
  keywords: ['Kishore Murugesan', 'Portfolio of Kishore Murugesan', 'Web3 Developer', 'AI Developer', 'Full Stack Developer', 'StarkNet', 'Next.js', 'Cairo'],
  authors: [{ name: 'Kishore Murugesan', url: 'https://kishoremurugesan.xyz' }],
  creator: 'Kishore Murugesan',
  openGraph: {
    title: 'Kishore Murugesan | Portfolio',
    description: 'Explore the projects and skills of Kishore Murugesan – a Web3 and AI developer.',
    url: 'https://kishoremurugesan.xyz',
    siteName: 'Kishore Murugesan Portfolio',
    images: [
      {
        url: 'https://kishoremurugesan.xyz/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'Kishore Murugesan Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kishore Murugesan | Portfolio',
    description: 'Discover the portfolio and works of Web3 & AI builder Kishore Murugesan.',
    creator: '@0xkeyaru',
    images: ['https://kishoremurugesan.xyz/og-image.jpg'], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet" />
         
        <link rel="canonical" href="https://kishoremurugesan.xyz" />
 
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Kishore Murugesan",
              "url": "https://kishoremurugesan.xyz",
              "image": "https://kishoremurugesan.xyz/avatar.jpg", // Replace with your profile image URL
              "sameAs": [
                "https://twitter.com/0xkeyaru",
                "https://github.com/kishore-mk",
                "http://www.linkedin.com/in/kishore-murugesan"
              ],
              "jobTitle": "Web3 & AI Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Independent Developer"
              }
            }),
          }}
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
