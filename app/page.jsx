import { Button } from "@/components/ui/button"
import {FiDownload} from 'react-icons/fi'
import Socials from "@/components/Socials"
import Photo from "@/components/Photo"

const resumelink ="https://drive.google.com/file/d/1XcFvQQ-uBfWB6xUNcfnDCPGiKCQsZJqS/view?usp=sharing";
const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">Full Stack Developer</span>
            <h1 className="h1">Hey I'm<br/><span className="text-accent">Kishore</span></h1>
            <p className="max-w-[500px] mb-6 text-white/80">I am a proficient full stack developer with expertise in Python and JavaScript. My drive lies in creating impactful technological solutions by combining my skills and creativity to deliver value in the ever-evolving tech industry.</p>

            <div className="flex flex-col xl:flex-row items-center gap-8">
            <a href={resumelink} target="_blank">
              <Button variant="outline"  size="lg" className="uppercase flex items-center gap-2">
                <span className="text-xl">Download CV</span>
                <FiDownload className="text-xl"/>
              </Button>
              </a>
              <div className="mb-8 xl:mb-0 ">
                <Socials />
              </div>
            </div>
          </div>
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
