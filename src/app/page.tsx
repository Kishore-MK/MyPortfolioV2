import { Portfolio } from "@/components/portfolio/Portfolio";
import {  PortfolioData } from "@/lib/portfolio-data";

async function getPortfolioData(): Promise<PortfolioData> {
  // To use local mock data, return the imported `portfolioData` directly.
  // This is useful for development and avoids the need for a live database.
  const useMockData = false;


  // To fetch from Supabase, set useMockData to false and ensure your
  // .env.local file is configured with your Supabase credentials.
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3001';
  
  const res = await fetch(`${baseUrl}/api/portfolio`, { 
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
