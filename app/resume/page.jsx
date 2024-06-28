"use client";
import {FaHtml5, FaCss3, FaJs, FaReact, FaNodeJs ,FaPython, FaGitAlt, FaDocker, FaLinux, } from 'react-icons/fa';

import { DiDjango } from "react-icons/di";

import { SiFlask,SiTailwindcss, SiNextdotjs} from "react-icons/si";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent,TooltipProvider,TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { delay, motion } from 'framer-motion';

const about ={
  title: "About me",
  description: "",
  info:[
    {
      fieldname:"Name",
      fieldvaluee:"Kishore Murugesan"
    },
    {
      fieldname:"Phone",
      fieldvaluee:"+91 90255 74460"
    },
    {
      fieldname:"Email",
      fieldvaluee:"Kishore Murugesan"
    },
    {
      fieldname:"Languages",
      fieldvaluee:"English, Tamil"
    },
    {
      fieldname:"Name",
      fieldvaluee:"Kishore Murugesan"
    },
    {
      fieldname:"Name",
      fieldvaluee:"Kishore Murugesan"
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
      trasnition:{delay:2.4, duration:0.4, ease:"easeIn"}}}>
        
        <div className="min-h-[70vh] flex items-center justify-center py-12 xl:py-0">

          <div className="container mx-auto">
            <Tabs defaultValue='experience' className='flex flex-col xl:flex-row gap-[60px]'>
              <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">

                <TabsTrigger value="about">About me</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>

              </TabsList>


            <div className='min-h-[40vh] xl:min-h-[70vh] w-full'>
              <TabsContent value="about" className="w-full">
                  <div>
                    <h3>{about.title}</h3>
                    <p>{about.description}</p>
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
                            <p>{item.institute}</p>
                          </div>
                        </li>
                      })}
                    </ul>
                    </ScrollArea>

                  </div>
              </TabsContent>


              <TabsContent value="skills" className="w-full">
                
              </TabsContent>
              
            </div>

            </Tabs>
          </div>
        </div>
    </motion.div>
  )
}

export default resume
