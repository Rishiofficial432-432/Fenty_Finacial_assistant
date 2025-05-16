
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Building, Briefcase, PieChart as PieChartIcon, Clock, RefreshCw, BarChart3, DollarSign } from "lucide-react";

// Import custom Home icon
import { Home } from "../icons/Home";

export const InvestmentsTab = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card className="overflow-hidden shadow-soft hover-lift border-border/40">
          <CardHeader>
            <CardTitle>Investment Portfolio</CardTitle>
            <CardDescription>
              Top performing assets in your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Amazon (AMZN)", type: "Stock", value: "$128,450", change: "+12.4%", sector: "Technology" },
                { name: "Apple (AAPL)", type: "Stock", value: "$95,200", change: "+8.7%", sector: "Technology" },
                { name: "U.S. Treasury Bonds", type: "Bond", value: "$75,000", change: "+3.2%", sector: "Government" },
                { name: "Vanguard Total Market ETF", type: "ETF", value: "$45,780", change: "+6.8%", sector: "Diversified" },
                { name: "Real Estate Property", type: "Real Estate", value: "$320,000", change: "+4.5%", sector: "Real Estate" }
              ].map((asset, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-card/60 hover:bg-card/80 transition-colors border border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-primary/10">
                      {asset.type === "Stock" && <Building className="h-4 w-4 text-primary" />}
                      {asset.type === "Bond" && <Briefcase className="h-4 w-4 text-primary" />}
                      {asset.type === "ETF" && <PieChartIcon className="h-4 w-4 text-primary" />}
                      {asset.type === "Real Estate" && <Home className="h-4 w-4 text-primary" />}
                    </div>
                    <div>
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-xs text-muted-foreground">{asset.sector}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{asset.value}</div>
                    <div className="text-xs text-green-500">{asset.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="bg-muted/20 border-t py-2 px-6 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Last updated: Today, 4:30 PM</span>
            <Button size="sm">View All Assets</Button>
          </CardFooter>
        </Card>
      </div>
      
      <div>
        <Card className="overflow-hidden shadow-soft hover-lift border-border/40 h-full">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Scheduled financial activities</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <ScrollArea className="h-[360px]">
              <div className="space-y-2 px-6">
                {[
                  { title: "Dividend Payment", date: "May 18", desc: "AAPL quarterly dividend", icon: <DollarSign className="h-4 w-4" /> },
                  { title: "Bond Maturity", date: "May 24", desc: "Treasury bond maturity", icon: <Briefcase className="h-4 w-4" /> },
                  { title: "Portfolio Review", date: "May 30", desc: "Scheduled advisor meeting", icon: <FileText className="h-4 w-4" /> },
                  { title: "Market Report", date: "June 2", desc: "Q2 market analysis", icon: <BarChart3 className="h-4 w-4" /> },
                  { title: "Rebalancing", date: "June 10", desc: "Portfolio rebalancing", icon: <RefreshCw className="h-4 w-4" /> },
                  { title: "Tax Payment", date: "June 15", desc: "Quarterly tax payment due", icon: <DollarSign className="h-4 w-4" /> },
                ].map((event, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/40 transition-colors">
                    <div className="mt-0.5 p-2 rounded-full bg-primary/10 text-primary">
                      {event.icon}
                    </div>
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs text-muted-foreground">{event.desc}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{event.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="bg-muted/20 border-t py-2 px-6 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Showing next 30 days</span>
            <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
              <RefreshCw className="h-3 w-3" /> Update
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
