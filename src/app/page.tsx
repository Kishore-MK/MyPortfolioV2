import { Portfolio } from "@/components/portfolio/Portfolio";
import {  PortfolioData } from "@/lib/portfolio-data";

async function getPortfolioData(): Promise<PortfolioData> {
  // To use local mock data, return the imported `portfolioData` directly.
  // This is useful for development and avoids the need for a live database.
  const useMockData = false;


  
  const res = await fetch('/api/portfolio', { 
    cache: 'no-store' 
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Failed to fetch portfolio data:", errorText);
    throw new Error('Failed to fetch portfolio data');
  }

  return res.json();
}

export default async function Home() {
  const portfolioData = await getPortfolioData();

  return (
    <main>
      <Portfolio portfolioData={portfolioData} />
    </main>
  );
}
