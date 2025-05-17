
import { motion } from "framer-motion";
import { Wallet, DollarSign, BarChart3, TrendingUp, ArrowUpRight, Percent, Target, Activity } from "lucide-react";
import { KpiCard } from "./KpiCard";
import { cardVariants, monthlyIncomeData } from "./ChartData";

export const PrimaryKpiCards = () => {
  return (
    <>
      <motion.div variants={cardVariants} className="col-span-full grid grid-cols-2 gap-3 xs:gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Assets"
          value="$1,245,600"
          change={{ value: "8.2% this month", positive: true }}
          icon={<Wallet className="h-3.5 w-3.5" />}
          sparklineData={[
            { name: 'Apr', value: 1150000 },
            { name: 'May', value: 1180000 },
            { name: 'Jun', value: 1200000 },
            { name: 'Jul', value: 1245600 },
          ]}
          tooltipText="Sum of all assets in your portfolio including stocks, bonds, cash, and real estate"
        />
        
        <KpiCard
          title="Monthly Income"
          value="$24,350"
          change={{ value: "3.1% this month", positive: true }}
          icon={<DollarSign className="h-3.5 w-3.5" />}
          sparklineData={monthlyIncomeData}
          tooltipText="Total monthly income from all investments including dividends, interest, and rental income"
        />
        
        <KpiCard
          title="Expenses"
          value="$12,780"
          change={{ value: "2.4% this month", positive: false }}
          icon={<BarChart3 className="h-3.5 w-3.5" />}
          sparklineData={[
            { name: 'Apr', value: 12200 },
            { name: 'May', value: 12500 },
            { name: 'Jun', value: 12600 },
            { name: 'Jul', value: 12780 },
          ]}
          tooltipText="Total monthly expenses related to investment management and portfolio maintenance"
        />
        
        <KpiCard
          title="ROI"
          value="18.6%"
          change={{ value: "5.3% this year", positive: true }}
          icon={<TrendingUp className="h-3.5 w-3.5" />}
          sparklineData={[
            { name: 'Apr', value: 16.2 },
            { name: 'May', value: 17.1 },
            { name: 'Jun', value: 17.9 },
            { name: 'Jul', value: 18.6 },
          ]}
          tooltipText="Return on Investment across your entire portfolio, annualized"
        />
      </motion.div>
    </>
  );
};

export const SecondaryKpiCards = () => {
  return (
    <>
      <motion.div variants={cardVariants} className="col-span-full grid grid-cols-2 gap-3 xs:gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Net Worth Growth"
          value="12.4%"
          change={{ value: "1.8% this month", positive: true }}
          icon={<ArrowUpRight className="h-3.5 w-3.5" />}
          tooltipText="Year-to-date growth of your total net worth"
        />
        
        <KpiCard
          title="Dividend Yield"
          value="4.2%"
          change={{ value: "0.3% this month", positive: true }}
          icon={<Percent className="h-3.5 w-3.5" />}
          tooltipText="Average dividend yield across your dividend-paying investments"
        />
        
        <KpiCard
          title="Asset Utilization"
          value="85.3%"
          change={{ value: "2.1% this month", positive: true }}
          icon={<Target className="h-3.5 w-3.5" />}
          tooltipText="Percentage of total assets currently allocated in productive investments"
        />
        
        <KpiCard
          title="Risk Adjusted Return"
          value="7.8"
          change={{ value: "0.6 this month", positive: true }}
          icon={<Activity className="h-3.5 w-3.5" />}
          tooltipText="Sharpe ratio measuring return relative to risk taken"
        />
      </motion.div>
    </>
  );
};
