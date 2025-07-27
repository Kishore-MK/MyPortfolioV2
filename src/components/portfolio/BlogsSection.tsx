import { CardContent, Card } from "@/components/ui/card";
import { Blog } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function BlogsSection({ blog }: { blog: Blog }) {
  if (!blog) {
    return null;
  }
  
  return (
    <div className="p-6 md:p-8 h-full flex flex-col">
      <CardContent className="p-0 flex-grow">
         <Card className="group overflow-hidden flex flex-col bg-background/50 border-border/50 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 h-full">
            <div className="relative">
              <Image src={blog.image} alt={blog.title} data-ai-hint={blog.hint} width={600} height={400} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-headline text-2xl mb-2">{blog.title}</h3>
                <p className="text-muted-foreground mb-4 flex-grow">{blog.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                </div>
                <Button variant="link" asChild className="p-0 h-auto self-start mt-auto">
                    <a href={blog.link} 
  target="_blank" >
                        Read More <ArrowUpRight className="w-4 h-4 ml-1"/>
                    </a>
                </Button>
            </div>
          </Card>
      </CardContent>
    </div>
  );
}
