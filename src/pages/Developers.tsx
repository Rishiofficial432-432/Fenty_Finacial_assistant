
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
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

// Developer data
const developers = [
  {
    name: "Alex Johnson",
    role: "Lead Developer",
    bio: "Full-stack developer with 8+ years of experience in React, Node.js, and cloud architecture.",
    image: "/developers/dev1.jpg",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
  },
  {
    name: "Sarah Williams",
    role: "UI/UX Designer",
    bio: "Creative designer focused on crafting intuitive and beautiful user experiences across web and mobile platforms.",
    image: "/developers/dev2.jpg",
    skills: ["Figma", "UI Design", "User Research", "Prototyping"],
  },
  {
    name: "Michael Chen",
    role: "Backend Developer",
    bio: "Database expert specializing in high-performance systems and API development.",
    image: "/developers/dev3.jpg",
    skills: ["Python", "PostgreSQL", "Docker", "Microservices"],
  },
  {
    name: "Jamie Taylor",
    role: "DevOps Engineer",
    bio: "Infrastructure specialist ensuring smooth deployment pipelines and robust system architecture.",
    image: "/developers/dev4.jpg",
    skills: ["Kubernetes", "CI/CD", "Terraform", "Linux"],
  },
];

export default function Developers() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight purple-gradient-text">Our Team</h1>
        <p className="text-muted-foreground">Meet the talented developers behind Fenty Analytics</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {developers.map((developer) => (
          <motion.div key={developer.name} variants={itemVariants}>
            <Card className="overflow-hidden shadow-soft hover-lift border-border/40 h-full">
              <CardHeader className="pb-2">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-2">
                    <AvatarImage src={developer.image} alt={developer.name} />
                    <AvatarFallback>{developer.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-center">{developer.name}</CardTitle>
                  <CardDescription className="text-center text-purple-500 font-medium">
                    {developer.role}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{developer.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {developer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
