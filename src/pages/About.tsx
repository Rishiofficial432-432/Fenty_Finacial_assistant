
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight mb-4">About Fenty Analytics</h1>
        <p className="text-muted-foreground max-w-3xl">
          Fenty Analytics is a powerful financial dashboard that helps businesses and individuals 
          make data-driven decisions through interactive visualizations and AI-powered insights.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-gradient-to-br from-background to-secondary/20 shadow-lg transition-all duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our mission is to democratize financial data analysis, making it accessible to 
                everyone regardless of their technical expertise. We believe that powerful insights 
                should be available to all, driving better financial decisions.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-background to-primary/10 shadow-lg transition-all duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We envision a world where complex financial data is transformed into clear, 
                actionable insights. By combining cutting-edge visualization with AI-powered 
                analysis, we aim to revolutionize how people interact with financial information.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold mt-8 mb-4">Key Features</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Interactive Visualizations",
              description: "Explore your data with intuitive, interactive charts and graphs."
            },
            {
              title: "AI-Powered Insights",
              description: "Get intelligent analysis and recommendations based on your data."
            },
            {
              title: "Real-time Updates",
              description: "Stay informed with real-time data updates and alerts."
            },
            {
              title: "Customizable Dashboards",
              description: "Create personalized views tailored to your specific needs."
            },
            {
              title: "Secure Data Handling",
              description: "Rest easy knowing your financial data is protected with enterprise-grade security."
            },
            {
              title: "Collaborative Tools",
              description: "Share insights and work together with team members in real-time."
            }
          ].map((feature, index) => (
            <Card key={index} className="border shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-8">
        <Card className="bg-gradient-to-r from-muted to-muted/50 shadow-md">
          <CardHeader>
            <CardTitle>Get Started Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Ready to transform your financial analysis? Explore our platform and discover
              how Fenty Analytics can help you make better decisions with your data.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
