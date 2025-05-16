
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    name: "Smit",
    role: "Full Stack Developer & Founder",
    bio: "Founder and leader of Aveion AI. Full-stack developer specializing in creating innovative solutions and leading teams to build cutting-edge applications.",
    imagePath: "/lovable-uploads/cc34679d-36d4-4f76-a99d-dce7d50cfaca.png",
    initials: "S",
    skills: ["React", "TypeScript", "Node.js", "AI Integration", "Team Leadership"],
    social: {
      github: "https://github.com/smitaveion",
      linkedin: "https://linkedin.com/in/smitaveion",
      twitter: "https://twitter.com/smitaveion",
      email: "smit@aveion.ai"
    }
  },
  {
    name: "Ankita Sharma",
    role: "Head of Creative Department & Senior UI/UX Designer",
    bio: "Leading the creative vision with innovative design thinking. Creates beautiful, intuitive user experiences that blend artistry with functionality.",
    imagePath: "/lovable-uploads/5b7ca514-45fe-4add-b1be-f18bcc910da1.png",
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
    role: "Cybersecurity Expert & Full Stack Developer",
    bio: "Security specialist with extensive knowledge in protecting digital assets. Combines security expertise with full-stack development skills to build robust applications.",
    imagePath: "/lovable-uploads/74032efd-a039-4b8e-8397-48960c90036e.png",
    initials: "TP",
    skills: ["Cybersecurity", "Penetration Testing", "React", "Node.js", "Security Architecture"],
    social: {
      github: "https://github.com/tanmayparmar",
      linkedin: "https://linkedin.com/in/tanmayparmar",
      twitter: "https://twitter.com/tanmayparmar",
      email: "tanmay@aveion.ai"
    }
  }
];

export default function Developers() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={cardVariants}>
        <h1 className="text-3xl font-bold tracking-tight purple-gradient-text">Meet Our Team</h1>
        <p className="text-muted-foreground mt-2">
          The talented developers behind Aveion AI, creating powerful tools to transform your data into insights.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {developers.map((developer, index) => (
          <motion.div
            key={developer.name}
            variants={cardVariants}
            custom={index}
            className="h-full"
          >
            <Card className="h-full hover-scale border-border/40 shadow-soft flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{developer.name}</CardTitle>
                    <CardDescription>{developer.role}</CardDescription>
                  </div>
                  <Avatar className="h-14 w-14 flex-shrink-0">
                    {developer.imagePath ? (
                      <AvatarImage src={developer.imagePath} alt={developer.name} />
                    ) : null}
                    <AvatarFallback className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-lg">
                      {developer.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-4">{developer.bio}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {developer.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="font-normal">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 border-t pt-4">
                {developer.social.github && (
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                    <a href={developer.social.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {developer.social.linkedin && (
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                    <a href={developer.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {developer.social.twitter && (
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                    <a href={developer.social.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {developer.social.email && (
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                    <a href={`mailto:${developer.social.email}`}>
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div variants={cardVariants} className="mt-10">
        <Card className="border-border/40 shadow-soft">
          <CardHeader>
            <CardTitle>About Our Development Process</CardTitle>
            <CardDescription>How we work together to build Aveion AI</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Our team follows an agile development approach, combining design thinking with data science expertise. 
              We believe in user-centered design, rapid prototyping, and continuous deployment to create tools that 
              truly serve your needs. Each team member brings unique skills and perspectives that contribute to the 
              robust, intuitive platform you see today.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
