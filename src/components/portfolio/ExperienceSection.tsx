import { CardContent } from "@/components/ui/card";
import { Experience } from "@/lib/portfolio-data";

export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <div className="p-6 md:p-8 h-full flex flex-col">
      <CardContent className="p-0 flex-grow relative">
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-primary/20" />
        <div className="space-y-8">
            {experiences.map((exp) => (
                <div key={exp.company} className="relative pl-12">
                    <div className="absolute left-4 top-1.5 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2 border-4 border-background" />
                    <p className="text-muted-foreground">{exp.period}</p>
                    <h3 className="font-headline text-2xl mt-1">{exp.role}</h3>
                    <p className="text-primary font-semibold">{exp.company}</p>
                    <p className="mt-2 text-foreground/80">{exp.description}</p>
                </div>
            ))}
        </div>
      </CardContent>
    </div>
  );
}
