
// Sample data for charts
export const pieData = [
  { name: "Stocks", value: 400, color: "#9b87f5" },
  { name: "Bonds", value: 300, color: "#8B5CF6" },
  { name: "Cash", value: 200, color: "#0FA0CE" },
  { name: "Real Estate", value: 100, color: "#ea384c" },
];

export const timeData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
];

export const comparisonData = [
  { name: "2023", actual: 4000, projected: 2400 },
  { name: "2024", actual: 3000, projected: 1398 },
  { name: "2025", actual: 2000, projected: 9800 },
  { name: "2026", actual: 2780, projected: 3908 },
  { name: "2027", actual: 1890, projected: 4800 },
];

export const sectorPerformanceData = [
  { name: 'Technology', value: 28.5, fill: '#9b87f5' },
  { name: 'Healthcare', value: 18.2, fill: '#8B5CF6' },
  { name: 'Finance', value: 15.7, fill: '#7E69AB' },
  { name: 'Consumer', value: 12.3, fill: '#6E59A5' },
  { name: 'Energy', value: 9.8, fill: '#0FA0CE' },
  { name: 'Other', value: 15.5, fill: '#ea384c' },
];

export const performanceData = [
  { name: 'ROI', value: 78, fill: '#8B5CF6' },
  { name: 'Growth', value: 67, fill: '#9b87f5' },
  { name: 'Yield', value: 85, fill: '#7E69AB' },
];

export const monthlyIncomeData = [
  { name: 'Jan', value: 21500 },
  { name: 'Feb', value: 22700 },
  { name: 'Mar', value: 24100 },
  { name: 'Apr', value: 23500 },
  { name: 'May', value: 24800 },
  { name: 'Jun', value: 24350 },
];

export const riskData = [
  { name: 'Very Low', value: 15 },
  { name: 'Low', value: 25 },
  { name: 'Medium', value: 35 },
  { name: 'High', value: 20 },
  { name: 'Very High', value: 5 },
];

export const marketData = [
  { name: 'Jan', stocks: 4000, bonds: 2400, cash: 2400 },
  { name: 'Feb', stocks: 3000, bonds: 1398, cash: 2210 },
  { name: 'Mar', stocks: 2000, bonds: 9800, cash: 2290 },
  { name: 'Apr', stocks: 2780, bonds: 3908, cash: 2000 },
  { name: 'May', stocks: 1890, bonds: 4800, cash: 2181 },
  { name: 'Jun', stocks: 2390, bonds: 3800, cash: 2500 },
  { name: 'Jul', stocks: 3490, bonds: 4300, cash: 2100 },
];

export const chartConfig = {
  stocks: { label: "Stocks", theme: { light: "#9b87f5", dark: "#9b87f5" } },
  bonds: { label: "Bonds", theme: { light: "#8B5CF6", dark: "#8B5CF6" } },
  cash: { label: "Cash", theme: { light: "#0FA0CE", dark: "#0FA0CE" } },
  realestate: { label: "Real Estate", theme: { light: "#ea384c", dark: "#ea384c" } },
  actual: { label: "Actual", theme: { light: "#9b87f5", dark: "#9b87f5" } },
  projected: { label: "Projected", theme: { light: "#0FA0CE", dark: "#0FA0CE" } },
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};
