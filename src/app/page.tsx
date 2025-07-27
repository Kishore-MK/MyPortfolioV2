'use client';
import { useEffect, useState } from 'react';
import { Portfolio } from "@/components/portfolio/Portfolio";
import { PortfolioData } from "@/lib/portfolio-data";
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
useEffect(() => {
    async function fetchPortfolioData() {
      try {
        const res = await fetch('/api/portfolio', {
          cache: 'no-store'
        });
        
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Failed to fetch portfolio data:", errorText);
          throw new Error('Failed to fetch portfolio data');
        }
        
        const data = await res.json();
        setPortfolioData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching portfolio data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolioData();
  }, []);
   const loaderVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.7 } },
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.3 } },
  };

   if (error || !portfolioData) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <AnimatePresence>
        <motion.div
          key="loader"
          variants={loaderVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full h-screen flex items-center justify-center bg-background"
        >
          <motion.h1
            variants={textVariants}
            className="font-headline text-6xl md:text-8xl font-bold text-primary"
          >
            Hello.
          </motion.h1>
        </motion.div>
      </AnimatePresence>
      </main>
    );
  }
  return (
    <main>
      <Portfolio portfolioData={portfolioData} />
    </main>
  );
}
