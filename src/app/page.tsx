'use client';
import { useEffect, useState } from 'react';
import { Portfolio } from "@/components/portfolio/Portfolio";
import { PortfolioData } from "@/lib/portfolio-data";

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

   if (error || !portfolioData) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">
          {error || 'Failed to load portfolio data'}
        </div>
      </main>
    );
  }
  return (
    <main>
      <Portfolio portfolioData={portfolioData} />
    </main>
  );
}
