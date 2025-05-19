
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

interface Developer {
  name: string;
  role: string;
  bio: string;
  imagePath?: string;
  initials: string;
  skills: string[];
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const developers: Developer[] = [
  {
    name: "Rishi",
    role: "Visionary Founder & Team Leader",
    bio: "Founder and leader of Aveion AI India. Full-stack developer specializing in creating innovative solutions and leading teams to build cutting-edge applications.",
    imagePath: "/lovable-uploads/79043d60-aea9-43c5-aef2-14fa4631dd63.png",
    initials: "R",
    skills: ["React", "TypeScript", "Node.js", "AI Integration", "Team Leadership"],
    social: {
      github: "https://github.com/rishiaveion",
      linkedin: "https://linkedin.com/in/rishiaveion",
      twitter: "https://twitter.com/rishiaveion",
      email: "rishi@aveion.ai"
    }
  },
  {
    name: "Ankita Sharma",
    role: "Head of Creative Department & Senior UI/UX Designer",
    bio: "Leading the creative vision with innovative design thinking. Creates beautiful, intuitive user experiences that blend artistry with functionality.",
    imagePath: "/lovable-uploads/ea548d8a-3c4a-4cfa-9afe-8e2773b50db8.png",
    initials: "AS",
    skills: ["UI Design", "UX Research", "Visual Design", "Prototyping", "Design Systems"],
    social: {
      github: "https://github.com/ankitasharma",
      linkedin: "https://linkedin.com/in/ankitasharma",
      email: "ankita@aveion.ai"
    }
  },
  {
    name: "Tanmay Parmar",
    role: "Head of Security Department & Cyber Security Expert",
    bio: "Security specialist with extensive knowledge in protecting digital assets. Combines security expertise with full-stack development skills to build robust applications.",
    imagePath: "/lovable-uploads/db6c2a68-dcb9-4a9f-8eaa-87a2f7e4c9c9.png",
    initials: "TP",
    skills: ["Cybersecurity", "Penetration Testing", "Ethical Hacking", "Security Architecture", "Risk Assessment"],
    social: {
      github: "https://github.com/tanmayparmar",
      linkedin: "https://linkedin.com/in/tanmayparmar",
      twitter: "https://twitter.com/tanmayparmar",
      email: "tanmay@aveion.ai"
    }
  }
];

export default function Developers() {
  const isMobile = useIsMobile();
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={cardVariants}>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight purple-gradient-text">Meet Our Team</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          The talented individuals behind Aveion AI India, creating powerful tools and innovative solutions for digital transformation.
        </p>
      </motion.div>

      {/* Developer profiles grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {developers.map((developer, index) => (
          <motion.div
            key={developer.name}
            variants={cardVariants}
            custom={index}
            className="h-full"
          >
            <Card className="h-full hover-scale border-border/40 shadow-soft flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex flex-col items-center">
                  <Avatar className="h-40 w-40 mb-6 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                    {developer.imagePath ? (
                      <AvatarImage 
                        src={developer.imagePath} 
                        alt={developer.name} 
                        className="object-cover"
                      />
                    ) : null}
                    <AvatarFallback className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-4xl">
                      {developer.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <CardTitle className="text-2xl">{developer.name}</CardTitle>
                    <CardDescription className="text-md mt-1">{developer.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow text-center px-6">
                <p className="text-muted-foreground mb-6">{developer.bio}</p>
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  {developer.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="font-normal">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center gap-3 border-t pt-4">
                {developer.social.github && (
                  <Button variant="ghost" size="icon" asChild className="h-10 w-10">
                    <a href={developer.social.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5" />
                    </a>
                  </Button>
                )}
                {developer.social.linkedin && (
                  <Button variant="ghost" size="icon" asChild className="h-10 w-10">
                    <a href={developer.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                )}
                {developer.social.twitter && (
                  <Button variant="ghost" size="icon" asChild className="h-10 w-10">
                    <a href={developer.social.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-5 w-5" />
                    </a>
                  </Button>
                )}
                {developer.social.email && (
                  <Button variant="ghost" size="icon" asChild className="h-10 w-10">
                    <a href={`mailto:${developer.social.email}`}>
                      <Mail className="h-5 w-5" />
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* About our team section */}
      <motion.div variants={cardVariants} className="mt-12">
        <Card className="border-border/40 shadow-soft">
          <CardHeader>
            <CardTitle>About Our Team</CardTitle>
            <CardDescription>How we collaborate to build Aveion AI</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our team combines technical expertise, creative design thinking, and security knowledge to build 
              powerful AI-driven solutions. With Rishi's leadership, Ankita's design vision, and Tanmay's security expertise, 
              we create applications that are not only functional and beautiful but also secure and reliable. We believe in 
              user-centered design, rapid prototyping, and continuous improvement to create tools that truly serve your needs.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
