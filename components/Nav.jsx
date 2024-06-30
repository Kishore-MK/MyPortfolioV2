"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links =[
    {    
        name: 'Home',
        path: "/"
    },    
    // {    
    //     name: 'services',
    //     path: "/services"
    // },    
    {    
        name: 'resume',
        path: "/resume"
    },    
    {    

        name: 'Projects',
        path: "/project"
    },  
    {    
        name: 'contact',
        path: "/contact"
    },   
    
]

const Nav = () => {
    const pathname= usePathname();
  return (
    <nav className="flex gap-8 capitalize">
      {links.map((link,index)=> {
        return <Link href={link.path} key={index} className={`${link.path === pathname && "text-accent border-b-2 border-accent "} font-medium hover:text-accent transition-all`} >{link.name}</Link>
      })}
    </nav>
  )
}

export default Nav
