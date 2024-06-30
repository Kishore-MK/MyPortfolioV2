"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Select, 
  SelectContent, 
  SelectGroup,
  SelectItem, 
  SelectLabel,
  SelectTrigger, 
  SelectValue } from "@/components/ui/select";

import {FaPhoneAlt, FaEnvelope, FaMapMarkerAlt} from 'react-icons/fa';
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import { useRef } from "react";

const info =[ 
  
  {
    icon: <FaEnvelope/>,
    title: 'Email',
    description: 'thisismkoffcl@gmail.com'
  }
]


const Contact = () => {
  const form = useRef();
    
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_03s1ri7', 'template_fhj2j4f', form.current, {
        publicKey: 'kvGUYzvudAdCsN0Ws',
      })
      .then(
        () => {
          e.target.reset();
        }
      );
  };
  return (
    <motion.section initial={{opacity:0}} 
    animate={{opacity: 1, transition:{delay:2.4, duration:0.4, ease:"easeIn"}}}
    className="py-6  ">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px] ">
          <div className="xl:h-[54p%] order-2 xl:order-none">
            <form ref={form} 
            className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl" onSubmit={sendEmail}>
              <h3 className="text-4xl text-accent">Let's work together</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input name="first-name" type="firstname" placeholder="Firstname"/>
                <Input name="second-name" type="lastname" placeholder="Lastname"/>
                <Input name="mail" type="email" placeholder="Email address"/>
                <Input name="phone-number" type="phone" placeholder="Phone number"/>
              </div>
              <Textarea name="message" className="h-[200px]" placeholder="Type your message here."/>
              <Button size="md" className="max-w-40 h-[50px]">Send message</Button>
            </form>
          </div>
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item,index)=>{
                return <li key={index} className="flex items-center
                gap-6">
                    <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                      <div className="text-[28px]">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60">{item.title}</p>
                      <h3 className="text-xl">{item.description}</h3>
                    </div>
                </li>
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact
