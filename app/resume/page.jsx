"use client";
import {FaHtml5, FaCss3, FaJs, FaReact, FaNodeJs ,FaPython, FaGitAlt, FaDocker, FaLinux, } from 'react-icons/fa';

import { DiDjango } from "react-icons/di";

import { SiFlask,SiTailwindcss, SiNextdotjs,SiPostman} from "react-icons/si";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent,TooltipProvider,TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { delay, motion } from 'framer-motion';

const about ={
  title: "About me",
  description: "I am a second year student and a self-taught programmer from Coimbatore. I began my coding journey with C and Python and honed my skills and transitioned into the world of web development. With a strong foundation in data structures and algorithms, I thrive on solving complex problems efficiently. I am constantly seeking opportunities to enhance my skills and contribute meaningfully to innovative projects.",
  info:[
    {
      fieldname:"Name",
      fieldvalue:"Kishore Murugesan"
    },
    {
      fieldname:"Phone",
      fieldvalue:"+91 90255 74460"
    },
    {
      fieldname:"Email",
      fieldvalue:"thisismk@gmail.com"
    },
    {
      fieldname:"Languages",
      fieldvalue:"English, Tamil"
    },
    {
      fieldname:"City",
      fieldvalue:"Coimbatore, India"
    },
   
  ]
}

const education ={
  icon: "/cap.svg",
  title: "My education",
  description: "desc",
  items: [
    {
      institute:"Karpagam College of Engineering",
      degree:"B.Tech Information Technology",
      duration:"2022-2026"
    },
    {
      institute:"Cheran Higher Secondary School",
      degree:"Higher Secondary",
      duration:"2021-2022"
    },
  ]
}

const skills ={
  title:"My skills",
  description: "",
  skillList: [
    {
      icon: <FaHtml5/>,
      name: "Html 5"
    },
    {
      icon: <FaCss3/>,
      name: "CSS 3"
    },
    {
      icon: <FaJs/>,
      name: "Javascript"
    },
    {
      icon: <FaReact/>,
      name: "React.js"
    },
    {
      icon: <FaNodeJs/>,
      name: "Node.js",
    },
    {
      icon: <FaPython/>,
      name: "Python"
    },
    {
      icon: <FaGitAlt/>,
      name: "Git"
    },
    {
      icon: <FaDocker/>,
      name: "Docker"
    },
    {
      icon: <FaLinux/>,
      name: "Linux"
    },
    {
      icon: <DiDjango/>,
      name: "Django"
    },{
      icon: <SiFlask/>,
      name: "Flask"
    },

    {
      icon: <SiTailwindcss/>,
      name: "TailwindCss"
    },
    {
      icon: <SiPostman/>,
      name: "Postman",
    },
    {
      icon: <SiNextdotjs/>,
      name: "Next.js"
    },
  ]
}

const resume = () => {
  return (
    <motion.div initial={{opacity: 0}} 
    animate={{
      opacity:1, 
      transition:{delay:2.4, duration:0.4, ease:"easeIn"}}}>
        
        <div className="min-h-[70vh] flex items-center justify-center py-12 xl:py-0">

          <div className="container mx-auto">
            <Tabs defaultValue="about"  className='flex flex-col xl:flex-row gap-[60px]'>
              <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">

                <TabsTrigger value="about">About me</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>

              </TabsList>


            <div className='min-h-[40vh] xl:min-h-[70vh] w-full'>
              <TabsContent value="about" className="w-full text-center xl:text-left ">
                  <div className='flex flex-col gap-[30px]'>
                    <h3 className='text-4xl font-bold'>{about.title}</h3>
                    <p className='max-w-[600px] text-white/60 mx-auto xl:mx-0'>{about.description}</p>
                    <ul className='grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0'>
                      {about.info.map((item,index)=>{
                        return <li key={index} className='flex items-center justify-center xl:justify-start gap-4'>
                          <span className='text-white/60'>{item.fieldname}</span>
                          <span className='text-xl'>{item.fieldvalue}</span>
                        </li>
                      })}
                    </ul>
                  </div>


              </TabsContent>



              <TabsContent value="education" className="w-full">
              <div className='flex flex-col gap-[30px] text-center xl:text-left '>
                    <h3 className='text-4xl font-bold'>{education.title}</h3>
                    <p className='max-w-[600px] text-white/60 mx-auto xl:mx-0'>
                    {education.description}
                    </p>
                    <ScrollArea className="h-[400px]">
                    <ul className='grid grid-cols-1 lg:grid-cols-2 gap-[30px]'>
                      {education.items.map((item,index)=>
                      {
                        return <li key={index} className='bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1'>
                          <span className='text-accent'>{item.duration}</span>
                          <h3 className='text-xl max-w-[260px] min-h-[60px] text-center lg:text-left'>{item.degree}</h3>
                          <div className='flex items-center gap-3'>
                            <span className='w-[6px] h-[6px] rounded-full bg-accent'></span>
                            <p className='text-white/60'>{item.institute}</p>
                          </div>
                        </li>
                      })}
                    </ul>
                    </ScrollArea>

                  </div>
              </TabsContent>


              <TabsContent value="skills" className="h-full">
              <div className='flex flex-col gap-[30px]'>
              <div className='flex flex-col gap-[30px] text-center xl:text-left '>
                    <h3 className='text-4xl font-bold'>{skills.title}</h3>
                    <p className='max-w-[600px] text-white/60 mx-auto xl:mx-0'>
                    {skills.description}
                    </p>
                  </div>
                    
                    <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  xl:grid-cols-5 gap-4 xl:gap-[30px] '>
                      {skills.skillList.map((item,index)=>
                      {
                        return <li key={index}>
                          <TooltipProvider delayDuration={100}>
                            <Tooltip>
                              <TooltipTrigger className='w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group'>
                                <div className='text-6xl group-hover:text-accent  transition-all duration-300'>
                                {item.icon}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <h3>{item.name}</h3>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          
                        </li>
                      })}
                    </ul>

                  </div>
              </TabsContent>
              
            </div>

            </Tabs>
          </div>
        </div>
    </motion.div>
  )
}

export default resume
