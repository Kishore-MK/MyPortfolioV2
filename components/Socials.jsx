import Link from 'next/link';

import {FaGithub, FaLinkedinIn, FaTwitter} from 'react-icons/fa';

const social=[
    {icon: <FaGithub/> ,path:'https://github.com/Kishore-MK'},

{icon: <FaLinkedinIn/> ,path:'http://www.linkedin.com/in/kishore-murugesan'},

{icon: <FaTwitter/> ,path:'https://twitter.com/Ayitskixxo'},

]
const Socials = () => {
  return (
    <div className="flex gap-6">
        {social.map((item,index)=>{
            return <Link key={index} href={item.path} target = "_blank" className="w-9 h-9 border-2 border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500">{item.icon}</Link>
        })}
      
    </div>
  )
}

export default Socials
