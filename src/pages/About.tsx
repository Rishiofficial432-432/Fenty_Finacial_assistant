
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, ChartLine, Users, FileText, Settings, MessageCircle, Star } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "@/components/ui/use-toast";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export default function About() {
  const showNotification = () => {
    toast({
      id: "welcome-toast",
      title: "Welcome to Fenty Analytics",
      description: "Thanks for exploring our platform features!",
      variant: "info",
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl p-8 card-glass card-glass-dark">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-300/20 dark:bg-purple-700/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4 purple-gradient-text">About Fenty Analytics</h1>
          <p className="text-muted-foreground max-w-3xl text-lg">
            Fenty Analytics is an enterprise-grade financial dashboard that empowers businesses and individuals 
            to make data-driven decisions through interactive visualizations and AI-powered insights.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button onClick={showNotification} className="group hover-lift">
              Explore Features
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" className="hover-lift">
              Learn More
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="overflow-hidden shadow-soft hover-scale border-border/40">
            <div className="h-2 bg-gradient-to-r from-purple-400 to-purple-600"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-500" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our mission is to democratize financial data analysis, making it accessible to 
                everyone regardless of their technical expertise. We believe that powerful insights 
                should be available to all, driving better financial decisions.
              </p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden shadow-soft hover-scale border-border/40">
            <div className="h-2 bg-gradient-to-r from-purple-600 to-purple-400"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-purple-500" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We envision a world where complex financial data is transformed into clear, 
                actionable insights. By combining cutting-edge visualization with AI-powered 
                analysis, we aim to revolutionize how people interact with financial information.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <ChartLine className="h-6 w-6 text-purple-500" />
          Enterprise Features
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Interactive Visualizations",
              description: "Explore your data with intuitive, interactive charts and graphs.",
              icon: <ChartLine className="h-5 w-5 text-purple-500" />
            },
            {
              title: "AI-Powered Insights",
              description: "Get intelligent analysis and recommendations based on your data.",
              icon: <Star className="h-5 w-5 text-purple-500" />
            },
            {
              title: "Real-time Updates",
              description: "Stay informed with real-time data updates and alerts.",
              icon: <Shield className="h-5 w-5 text-purple-500" />
            },
            {
              title: "Customizable Dashboards",
              description: "Create personalized views tailored to your specific needs.",
              icon: <Settings className="h-5 w-5 text-purple-500" />
            },
            {
              title: "Secure Data Handling",
              description: "Rest easy knowing your financial data is protected with enterprise-grade security.",
              icon: <Shield className="h-5 w-5 text-purple-500" />
            },
            {
              title: "Collaborative Tools",
              description: "Share insights and work together with team members in real-time.",
              icon: <Users className="h-5 w-5 text-purple-500" />
            }
          ].map((feature, index) => (
            <Card key={index} className="overflow-hidden shadow-soft hover-lift transition-all duration-300 border-border/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  {feature.icon}
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-border/40">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-6">
              <CardHeader className="px-0">
                <CardTitle>Enterprise-Grade Security</CardTitle>
                <CardDescription>
                  Our platform implements industry-leading security practices to protect your data
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <ul className="space-y-2 mt-4">
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-purple-500" />
                    <span>End-to-end encryption</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-purple-500" />
                    <span>Regular security audits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-purple-500" />
                    <span>Role-based access control</span>
                  </li>
                </ul>
                <Button variant="outline" className="mt-6 hover-lift">
                  Learn more about security
                </Button>
              </CardContent>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/20">
              <AspectRatio ratio={16/9} className="h-full">
                <div className="flex items-center justify-center h-full w-full">
                  <div className="rounded-full h-24 w-24 bg-purple-500/20 flex items-center justify-center animate-pulse-soft">
                    <Shield className="h-12 w-12 text-purple-500" />
                  </div>
                </div>
              </AspectRatio>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-8">
        <Card className="overflow-hidden shadow-soft-lg card-glass card-glass-dark border-border/40">
          <div className="h-2 bg-gradient-to-r from-purple-400 via-purple-600 to-purple-400 animate-gradient-shift bg-[length:200%_auto]"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-purple-500" />
              Get Started Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Ready to transform your financial analysis? Explore our platform and discover
              how Fenty Analytics can help you make better decisions with your data.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Button className="hover-lift">
                Request Demo
              </Button>
              <Button variant="outline" className="hover-lift">
                View Documentation
                <FileText className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
