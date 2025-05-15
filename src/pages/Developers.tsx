
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const developers = [
  { 
    name: "Sarah Chen", 
    role: "Lead Developer",
    bio: "Full-stack developer with expertise in React and data visualization. Sarah leads the front-end development team and has 8+ years of experience building financial dashboards.",
    skills: ["React", "TypeScript", "D3.js", "Node.js", "AWS"]
  },
  { 
    name: "Marcus Johnson", 
    role: "Backend Developer",
    bio: "Database expert with deep knowledge of financial systems. Marcus architects the data infrastructure and ensures optimal performance for real-time analytics.",
    skills: ["Python", "PostgreSQL", "Redis", "Docker", "Kubernetes"]
  },
  { 
    name: "Priya Patel", 
    role: "UX/UI Designer",
    bio: "User experience specialist focused on creating intuitive interfaces for complex data visualization. Priya works to make financial information accessible and actionable.",
    skills: ["Figma", "Adobe XD", "User Research", "Wireframing", "UI Animation"]
  },
  { 
    name: "David Kim", 
    role: "Data Scientist",
    bio: "Expert in financial modeling and machine learning. David develops the algorithms that power our predictive analytics features and financial forecasting tools.",
    skills: ["Python", "TensorFlow", "R", "Statistical Modeling", "Financial Analysis"]
  }
];

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

export default function Developers() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight purple-gradient-text">Our Team</h1>
        <p className="text-muted-foreground">Meet the experts behind Fenty Analytics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {developers.map((dev, index) => (
          <motion.div key={dev.name} variants={cardVariants} className="h-full">
            <Card className="h-full hover-lift">
              <CardHeader className="flex flex-col items-center text-center pb-4">
                <Avatar className="h-24 w-24 mb-2">
                  <AvatarFallback className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xl">
                    {dev.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{dev.name}</CardTitle>
                <CardDescription className="font-medium text-purple-600 dark:text-purple-400">{dev.role}</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">{dev.bio}</p>
                
                <div>
                  <h4 className="text-xs text-muted-foreground mb-2 uppercase font-semibold">Skills</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {dev.skills.map(skill => (
                      <span 
                        key={skill} 
                        className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="mt-4">Contact</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Join Our Team</CardTitle>
          <CardDescription>We're always looking for talented individuals to join our team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            At Fenty Analytics, we're passionate about creating innovative solutions for financial data visualization and analysis.
            If you're interested in joining our team, check out our current openings or send us your resume.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button>View Open Positions</Button>
            <Button variant="outline">Contact HR</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
