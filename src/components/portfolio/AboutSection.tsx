import { CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { AboutSectionData } from "@/lib/portfolio-data";

export function AboutSection({ about }: { about: AboutSectionData }) {
  const { paragraphs, avatar } = about;
 

  return (
    <div className="p-6 md:p-8 h-full flex flex-col">
      <CardContent className="p-0 flex-grow flex flex-col md:flex-row items-center gap-8 h-full">
        <div className="w-full md:w-2/3 space-y-4 text-foreground/90">
          {paragraphs.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
        <div className="w-full md:w-1/3 flex justify-center">
          <Avatar className="w-44 h-44 border-4 border-primary/50 shadow-lg">
            <Image
            className=" transform scale-125 translate-y-4"
              src={avatar.src}
              alt={avatar.alt}
              data-ai-hint={avatar.hint}
              width={250}
              height={250} 
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          
        </div>
      </CardContent>
    </div>
  );
}
