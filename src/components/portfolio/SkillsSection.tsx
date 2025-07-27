import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as LucideIcons from 'lucide-react';
import { SkillsSectionData } from "@/lib/portfolio-data";

const iconMap = LucideIcons as unknown as { [key: string]: React.FC<LucideIcons.LucideProps> };

export function SkillsSection({ skills }: { skills: SkillsSectionData }) {
  
  return (
    <div className="p-6 md:p-8 h-full">
      <CardContent className="p-0 space-y-8">
        {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
                <h3 className="font-headline text-2xl mb-4 text-primary">{category}</h3>
                <div className="flex flex-wrap gap-3">
                    {items.map(skill => {
                      const IconComponent = iconMap[skill.icon];
                      return (
                        <Badge key={skill.name} variant="secondary" className="text-base px-4 py-2 rounded-lg flex items-center gap-2 bg-primary/10 border border-primary/20 hover:bg-primary/20">
                            {IconComponent && <IconComponent />}
                            {skill.name}
                        </Badge>
                      );
                    })}
                </div>
            </div>
        ))}
      </CardContent>
    </div>
  );
}
