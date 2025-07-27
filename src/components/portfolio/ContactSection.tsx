import React from 'react';
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ContactSectionData } from "@/lib/portfolio-data";

export function ContactSection({ contact }: { contact: ContactSectionData }) {
  const { socialLinks } = contact;
  return (
    <div className="p-6 md:p-8 h-full flex flex-col">
      <CardContent className="p-0 flex-grow">
         
        <p className="text-center text-foreground/90">
            Find me on {' '}
            {socialLinks.map((link, index) => (
                <React.Fragment key={link.name}>
                    <a href={link.url} className="text-primary hover:underline">{link.name}</a>
                    {index < socialLinks.length - 1 && ' or '}
                </React.Fragment>
            ))}
            .
        </p>
      </CardContent>
    </div>
  );
}
