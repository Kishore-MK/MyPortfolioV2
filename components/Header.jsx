
import Link from 'next/link';
import Head from 'next/head';
import { Button } from './ui/button';
import Nav from './Nav';
import MobileNav from './MobileNav';

const Header = () => {
  return (
   
      <header className='py-8 xl:py-12 text-white w-screen'>
        <div className="container mx-auto flex justify-between items-center">
            <Link href="/">
            
            <img className="w-[105px] h-[105px] rotate-3" src="./logo.png" alt="hii" />
            
            </Link>

            <div className="hidden xl:flex items-center gap-8">
    
                <Nav /> 
                <Link href="/contact">
                <Button>Hire Me</Button>
                </Link>
            </div>

            <div className="xl:hidden"><MobileNav /></div>

        </div>
      </header>
    
  );
};

export default Header;
