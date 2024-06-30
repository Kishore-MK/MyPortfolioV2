"use client";

import {motion} from "framer-motion"
import React, {useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {BsArrowUpRight, BsGithub} from 'react-icons/bs';
import { Tooltip, TooltipContent,TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";


const projects= [
  
  {
    num: '01',
    category: 'Degen AI',
    title: "title #1",
    decription: "AI chatbot which helps users to getrealtime crypto prices and give recommendations to traders with oingecko api. It can also validates transaction address with etherscan api. Used gpt-3.5 turbo and gemini-1.5-pro in this project.",
    stack: [
      {name: "Python"},{name: "GPT-3.5-Turbo"},{name: "Flask"},
    ],
    image:'/projects/degenthumb.png',
    live: 'https://github.com/Kishore-MK/AI-MayhemDegenAnalystAI',
    github:"https://github.com/Kishore-MK/AI-MayhemDegenAnalystAI",
  },
  {
    num: '02',
    category: 'Tokan Raider',
    title: "title #1",
    decription: "A 2d role playing game built on starknet with unity and cairo.",
    stack: [
      {name: "Cairo"},{name: "Unity"},{name: "Dojo engine"},
    ],
    image:'/',
    live: 'https://github.com/Kishore-MK/Nft-hunt',
    github:"https://github.com/Kishore-MK/Nft-hunt",
  },
  {
    num: '03',
    category: 'Notes-App',
    title: "title #1",
    decription: "A web-based notes application built with leveraging the python's Django framework and React.js.",
    stack: [
      {name: "React.js"},{name: "Django"},{name: "PostgreSQL"},
    ],
    image:'/projects/notesapp.png',
    live: 'https://github.com/Kishore-MK/Notes-app',
    github:"https://github.com/Kishore-MK/Notes-app",
  },
  {
    num: '04',
    category: 'Nutriment AI',
    title: "blah blah",
    decription: "It is a calory and meal planner which calculates the food calory with image input, calculates remaining calory intake and more. ",
    stack: [
      {name: "Python"},{name: "Yolo v7"},{name: "Streamlit"},
    ],
    image:'/',
    live: 'https://github.com/Kishore-MK/NutrimentAI',
    github:"https://github.com/Kishore-MK/NutrimentAI",
  },
  {
    num: '05',
    category: 'MatchGram',
    title: "title #1",
    decription: "Built a responsive and interactive Instagram modelled clone called MatchGram with HTML, CSS and JavaScript.",
    stack: [
      {name: "Html 5"},{name: "CSS 3"},{name: "Javascript"},
    ],
    image:'/projects/matchgram.png',
    live: 'https://kishore-mk.github.io/Instagram_clone-Matchgram/',
    github:"https://github.com/Kishore-MK/Instagram_clone-Matchgram",
  },
]

const Work = () => {
  const [project,setProject]=useState(projects[0]);

  const handleSlideChange= (swiper)=>{
    const currentIndex = swiper.activeIndex;

    setProject(projects[currentIndex]);

  }
  return (
    <motion.section initial={{opacity: 0}} 
    animate={{opacity: 1, transition:{delay:2.4, duration:0.4, ease:"easeIn"}}}


    className="min-h-[70vh] flex flex-col justify-center py-12 xl:px-0">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none ">
            <div className="flex flex-col gap-[30px] h-[50%]">
              <div className="text-8xl leading-none">{project.num}</div>
            
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize ">{project.category}</h2>

              <p className="text-white/60 ">{project.decription}
            </p>

              <ul className="flex gap-4">
              {project.stack.map((item,index)=>{
                return <li key={index} className="text-xl text-accent">
                  {item.name}
                  
                  {index !== project.stack.length - 1 && ","}
                  </li>
              })}
            </ul>
            <div className="border border-white/20"></div>
            <div className="flex items-center gap-4 ">
              <Link href={project.live} target="_blank">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                      <BsArrowUpRight className="text-white text-3xl group-hover:text-accent"/>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Live project</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>
              <Link href={project.github} target="_blank">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                      <BsGithub className="text-white text-3xl group-hover:text-accent"/>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Github repo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>
            </div>
          </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper spaceBetween={30} slidesPerView={1} className="xl:h-[520px] mb-12" onSlideChange={handleSlideChange}>
              {projects.map((item,index)=>{
                return <SwiperSlide key={index} className="w-full">
                  <div className=" h-[460px] w-[585px] relative group flex justify-center items-center bg-pink-50/20">
                        <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      <div className="relative w-full h-full ">
                        <Image src={project.image} fill className="object-cover" alt=""/>
                      </div>
                  </div>
                </SwiperSlide>
              })}

              <WorkSliderBtns containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none " btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] rounded-full flex justify-center items-center transition-all"/>
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Work
