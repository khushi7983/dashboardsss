import { Building, Briefcase, DollarSign, Users } from "lucide-react";
import StatsCard from "./StatsCard";
import { useEffect, useState } from "react";
import ApplicationCard from "./ApplicationCard";
import ChartCard from "./ChartCard";
import EmployeeStructure from "./EmployeeStructure";
import LeaveCard from "./LeaveCard";
import TodayCard from "./TodayCard";
import TodoCard from "./TodoCard";
import WelcomeCard from "./WelcomeCard";
import TeamActivity from "./TeamActivity";
import DepartmentLeads from "./DepartmentLeads";
import { useTheme } from "./ThemeProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format, isWithinInterval, subYears } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { theme } = useTheme();
  const [chartData, setChartData] = useState({
    pie: null,
    bar: null,
  });
  const [tradeFilters, setTradeFilters] = useState({
    trade: "All",
    age: "All",
    dateRange: { from: null, to: null },
    allTime: false,
  });
  const [trrdFilters, setTrrdFilters] = useState({
    type: "Transfer",
    trade: "All",
    age: "All",
    dateRange: { from: null, to: null },
  });
  const [healthFilters, setHealthFilters] = useState({
    age: "All",
    dateRange: { from: null, to: null },
    allTime: false,
  });

  // Enhanced JSON data with dates
  const tradeData = [
    { trade: "TA+", count: 120, below35: 50, age35to45: 40, above45: 30, date: "2025-01-15" },
    { trade: "FM", count: 80, below35: 30, age35to45: 30, above45: 20, date: "2025-02-01" },
    { trade: "CM", count: 95, below35: 40, age35to45: 35, above45: 20, date: "2025-03-10" },
    { trade: "HSK I", count: 60, below35: 20, age35to45: 20, above45: 20, date: "2025-01-20" },
    { trade: "HSK II", count: 70, below35: 25, age35to45: 25, above45: 20, date: "2025-02-15" },
    { trade: "SK", count: 110, below35: 45, age35to45: 40, above45: 25, date: "2025-03-01" },
    { trade: "TMM", count: 85, below35: 35, age35to45: 30, above45: 20, date: "2025-04-01" },
  ];

  const trrdData = [
    { type: "Transfer", trade: "TA+", count: 30, below35: 15, age35to45: 10, above45: 5, date: "2025-01-20" },
    { type: "Retirement", trade: "FM", count: 20, below35: 5, age35to45: 5, above45: 10, date: "2025-02-05" },
    { type: "Resignation", trade: "CM", count: 25, below35: 10, age35to45: 10, above45: 5, date: "2025-03-15" },
    { type: "Death", trade: "HSK I", count: 10, below35: 3, age35to45: 3, above45: 4, date: "2025-01-25" },
    { type: "Transfer", trade: "HSK II", count: 15, below35: 7, age35to45: 5, above45: 3, date: "2025-02-20" },
    { type: "Retirement", trade: "SK", count: 18, below35: 6, age35to45: 6, above45: 6, date: "2025-03-05" },
    { type: "Resignation", trade: "TMM", count: 22, below35: 8, age35to45: 8, above45: 6, date: "2025-04-05" },
  ];

  const healthData = [
    { status: "Medical Pending", count: 50, below35: 20, age35to45: 15, above45: 15, date: "2025-01-10" },
    { status: "HT", count: 30, below35: 10, age35to45: 10, above45: 10, date: "2025-02-15" },
    { status: "DIAB", count: 25, below35: 8, age35to45: 8, above45: 9, date: "2025-03-20" },
    { status: "HT + DIAB", count: 15, below35: 5, age35to45: 5, above45: 5, date: "2024-12-30" },
  ];

  const trades = ["All", "TA+", "FM", "CM", "HSK I", "HSK II", "SK", "TMM"];
  const ageOptions = ["All", "Below 35", "35-45", "Above 45"];

  useEffect(() => {
    setChartData({
      pie: [
        { category: "AOB", sanction: 300, borne: 210, colorStart: "#1E90FF", colorEnd: "#0000CD", label: "Administrative Officer Battalions" },
        { category: "SSWC", sanction: 1200, borne: 1000, colorStart: "#FFD700", colorEnd: "#FFA500", label: "Supply and Services Wing Command" },
        { category: "SMW", sanction: 600, borne: 500, colorStart: "#FFFFFF", colorEnd: "#F5F5F5", label: "Signal Maintenance Wing" },
        { category: "NAW", sanction: 800, borne: 650, colorStart: "#FF6347", colorEnd: "#B22222", label: "Network Administration Wing" },
        { category: "SSS", sanction: 1500, borne: 1300, colorStart: "#FFD700", colorEnd: "#FFA500", label: "Support Services Squadron" },
        { category: "NDV", sanction: 6000, borne: 5000, colorStart: "#FF6349", colorEnd: "#B22222", label: "Network Development" },
        { category: "GOI", sanction: 1800, borne: 1600, colorStart: "#1E90FF", colorEnd: "#0000CD", label: "General Operations Infantry" },
      ],
      bar: [
        { month: "Jan", I: 50, M: 30, label: "January 2025" },
        { month: "Feb", I: 60, M: 35, label: "February 2025" },
        { month: "Mar", I: 70, M: 40, label: "March 2025" },
        { month: "Apr", I: 80, M: 45, label: "April 2025" },
        { month: "May", I: 90, M: 50, label: "May 2025" },
        { month: "Jun", I: 100, M: 55, label: "June 2025" },
        { month: "Jul", I: 110, M: 60, label: "July 2025" },
        { month: "Aug", I: 120, M: 65, label: "August 2025" },
        { month: "Sep", I: 130, M: 70, label: "September 2025" },
        { month: "Oct", I: 140, M: 75, label: "October 2025" },
        { month: "Nov", I: 150, M: 80, label: "November 2025" },
        { month: "Dec", I: 160, M: 85, label: "December 2025" },
      ],
    });
  }, []);

  const filterByDateRange = (item, dateRange) => {
    if (!dateRange.from || !dateRange.to) return true;
    const itemDate = new Date(item.date);
    return isWithinInterval(itemDate, { start: dateRange.from, end: dateRange.to });
  };

  const filteredTradeData = tradeData.filter((item) => {
    if (tradeFilters.allTime) return true;
    if (tradeFilters.trade !== "All" && item.trade !== tradeFilters.trade) return false;
    if (tradeFilters.age === "Below 35" && item.below35 === 0) return false;
    if (tradeFilters.age === "35-45" && item.age35to45 === 0) return false;
    if (tradeFilters.age === "Above 45" && item.above45 === 0) return false;
    return filterByDateRange(item, tradeFilters.dateRange);
  });

  const filteredTrrdData = trrdData.filter((item) => {
    if (item.type !== trrdFilters.type) return false;
    if (trrdFilters.trade !== "All" && item.trade !== trrdFilters.trade) return false;
    if (trrdFilters.age === "Below 35" && item.below35 === 0) return false;
    if (trrdFilters.age === "35-45" && item.age35to45 === 0) return false;
    if (trrdFilters.age === "Above 45" && item.above45 === 0) return false;
    return filterByDateRange(item, trrdFilters.dateRange);
  });

  const filteredHealthData = healthData.filter((item) => {
    if (healthFilters.allTime) return true;
    if (healthFilters.age === "Below 35" && item.below35 === 0) return false;
    if (healthFilters.age === "35-45" && item.age35to45 === 0) return false;
    if (healthFilters.age === "Above 45" && item.above45 === 0) return false;
    return filterByDateRange(item, healthFilters.dateRange);
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <div
      className={`px-10 py-8 w-[calc(100vw-256px)] ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          : "bg-gray-50 text-gray-900"
      } min-h-screen overflow-x-auto`}
    >
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex text-sm font-medium">
          <li className="flex items-center">
            <a
              href="#"
              className={`${
                theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
              } transition-colors`}
            >
              Home
            </a>
            <span className={`mx-2 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>/</span>
          </li>
          <li className={`${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>Dashboard</li>
        </ol>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h4
          className={`text-3xl font-bold tracking-tight ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Admin Dashboard
        </h4>
      </div>

      <div className="gap-6">
        {/* Main Dashboard Content */}
        <div className="lg:col-span-9 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard icon={Users} label="Employees" value="700" color="blue" percent={70} />
            <StatsCard icon={Building} label="Companies" value="30" color="yellow" percent={30} />
            <StatsCard icon={Briefcase} label="Leaves" value="3" color="red" percent={3} />
            <StatsCard icon={DollarSign} label="Salary" value="$5.8M" color="green" percent={58} />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[600px]">
            {chartData.pie && (
              <ChartCard
                title="Sanction Overview"
                chartType="pie"
                chartData={chartData.pie}
                selectOptions={["This Year", "Last Year", "All Time"]}
                height={600} // Increased height to 600px for larger pie chart
              />
            )}
            {chartData.bar && (
              <ChartCard
                title="Monthly Metrics"
                chartType="bar"
                chartData={chartData.bar}
                selectOptions={["2025", "2024", "2023"]}
                height={600}
              />
            )}
          </div>

          {/* Tables Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trade Wise Section */}
            <div
              className={`p-6 rounded-xl ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } shadow-lg hover:shadow-xl transition-all duration-300 border ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h5 className="text-xl font-semibold mb-4">Trade Wise</h5>
              <div className="flex flex-wrap gap-4 mb-6">
                <Select
                  value={tradeFilters.trade}
                  onValueChange={(value) => setTradeFilters({ ...tradeFilters, trade: value })}
                >
                  <SelectTrigger
                    className={`w-[200px] ${
                      theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white"
                    }`}
                  >
                    <SelectValue placeholder="Select Trade" />
                  </SelectTrigger>
                  <SelectContent>
                    {trades.map((trade) => (
                      <SelectItem key={trade} value={trade}>
                        {trade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={tradeFilters.age}
                  onValueChange={(value) => setTradeFilters({ ...tradeFilters, age: value })}
                >
                  <SelectTrigger
                    className={`w-[150px] ${
                      theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white"
                    }`}
                  >
                    <SelectValue placeholder="Select Age" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageOptions.map((age) => (
                      <SelectItem key={age} value={age}>
                        {age}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-[280px] justify-start text-left font-normal ${
                        theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white"
                      } ${!tradeFilters.dateRange.from && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {tradeFilters.dateRange.from ? (
                        tradeFilters.dateRange.to ? (
                          <>
                            {format(tradeFilters.dateRange.from, "LLL dd, y")} -{" "}
                            {format(tradeFilters.dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(tradeFilters.dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        "Pick a date range"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="range"
                      selected={tradeFilters.dateRange}
                      onSelect={(range) => setTradeFilters({ ...tradeFilters, dateRange: range })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Button
                  onClick={() =>
                    setTradeFilters({
                      trade: "All",
                      age: "All",
                      dateRange: { from: null, to: null },
                      allTime: true,
                    })
                  }
                  className={
                    theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
                  }
                >
                  All Time
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table
                  className={`w-full ${
                    theme === "dark" ? "border-gray-700" : "border-gray-200"
                  } rounded-lg overflow-hidden`}
                >
                  <TableHeader>
                    <TableRow
                      className={`${
                        theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100"
                      }`}
                    >
                      <TableHead className="font-semibold">Trade</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="font-semibold text-center">Total</TableHead>
                      <TableHead className="font-semibold text-center">Below 35</TableHead>
                      <TableHead className="font-semibold text-center">35-45</TableHead>
                      <TableHead className="font-semibold text-center">Above 45</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {filteredTradeData.map((item) => (
                        <motion.tr
                          key={item.trade}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className={theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-200"}
                        >
                          <TableCell className="font-semibold">{item.trade}</TableCell>
                          <TableCell>{item.date}</TableCell>
                          <TableCell className="text-center">{item.count}</TableCell>
                          <TableCell className="text-center">{item.below35}</TableCell>
                          <TableCell className="text-center">{item.age35to45}</TableCell>
                          <TableCell className="text-center">{item.above45}</TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Transfer Retirement Resignation Death Section */}
            <div
              className={`p-6 rounded-xl ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } shadow-lg hover:shadow-xl transition-all duration-300 border ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h5 className="text-xl font-semibold mb-4">Transfer Retirement Resignation Death</h5>
              <Tabs defaultValue="Transfer" className="mb-6">
                <TabsList className={theme === "dark" ? "bg-gray-700" : "bg-gray-100"}>
                  <TabsTrigger
                    value="Transfer"
                    onClick={() => setTrrdFilters({ ...trrdFilters, type: "Transfer" })}
                    className={`data-[state=active]:bg-blue-600 data-[state=active]:shadow-lg data-[state=active]:text-white transition-all duration-300 ${
                      theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-200"
                    }`}
                  >
                    Transfer
                  </TabsTrigger>
                  <TabsTrigger
                    value="Retirement"
                    onClick={() => setTrrdFilters({ ...trrdFilters, type: "Retirement" })}
                    className={`data-[state=active]:bg-blue-600 data-[state=active]:shadow-lg data-[state=active]:text-white transition-all duration-300 ${
                      theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-200"
                    }`}
                  >
                    Retirement
                  </TabsTrigger>
                  <TabsTrigger
                    value="Resignation"
                    onClick={() => setTrrdFilters({ ...trrdFilters, type: "Resignation" })}
                    className={`data-[state=active]:bg-blue-600 data-[state=active]:shadow-lg data-[state=active]:text-white transition-all duration-300 ${
                      theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-200"
                    }`}
                  >
                    Resignation
                  </TabsTrigger>
                  <TabsTrigger
                    value="Death"
                    onClick={() => setTrrdFilters({ ...trrdFilters, type: "Death" })}
                    className={`data-[state=active]:bg-blue-600 data-[state=active]:shadow-lg data-[state=active]:text-white transition-all duration-300 ${
                      theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-200"
                    }`}
                  >
                    Death
                  </TabsTrigger>
                </TabsList>
                <TabsContent value={trrdFilters.type}>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <Select
                      value={trrdFilters.trade}
                      onValueChange={(value) => setTrrdFilters({ ...trrdFilters, trade: value })}
                    >
                      <SelectTrigger
                        className={`w-[200px] ${
                          theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white"
                        }`}
                      >
                        <SelectValue placeholder="Select Trade" />
                      </SelectTrigger>
                      <SelectContent>
                        {trades.map((trade) => (
                          <SelectItem key={trade} value={trade}>
                            {trade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={trrdFilters.age}
                      onValueChange={(value) => setTrrdFilters({ ...trrdFilters, age: value })}
                    >
                      <SelectTrigger
                        className={`w-[150px] ${
                          theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white"
                        }`}
                      >
                        <SelectValue placeholder="Select Age" />
                      </SelectTrigger>
                      <SelectContent>
                        {ageOptions.map((age) => (
                          <SelectItem key={age} value={age}>
                            {age}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-[280px] justify-start text-left font-normal ${
                            theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white"
                          } ${!trrdFilters.dateRange.from && "text-muted-foreground"}`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {trrdFilters.dateRange.from ? (
                            trrdFilters.dateRange.to ? (
                              <>
                                {format(trrdFilters.dateRange.from, "LLL dd, y")} -{" "}
                                {format(trrdFilters.dateRange.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(trrdFilters.dateRange.from, "LLL dd, y")
                            )
                          ) : (
                            "Pick a date range"
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="range"
                          selected={trrdFilters.dateRange}
                          onSelect={(range) => setTrrdFilters({ ...trrdFilters, dateRange: range })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="overflow-x-auto">
                    <Table
                      className={`w-full ${
                        theme === "dark" ? "border-gray-700 shadow-md hover:shadow-lg rounded-lg" : "border-gray-200"
                      } rounded-lg overflow-hidden`}
                    >
                      <TableHeader>
                        <TableRow
                          className={`${
                            theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100"
                          }`}
                        >
                          <TableHead className="font-semibold">Trade</TableHead>
                          <TableHead className="font-semibold">Date</TableHead>
                          <TableHead className="font-semibold text-center">Total</TableHead>
                          <TableHead className="font-semibold text-center">Below 35</TableHead>
                          <TableHead className="font-semibold text-center">35-45</TableHead>
                          <TableHead className="font-semibold text-center">Above 45</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <AnimatePresence>
                          {filteredTrrdData.map((item) => (
                            <motion.tr
                              key={`${item.type}-${item.trade}`}
                              variants={cardVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className={theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-200"}
                            >
                              <TableCell className="font-semibold">{item.trade}</TableCell>
                              <TableCell>{item.date}</TableCell>
                              <TableCell className="text-center">{item.count}</TableCell>
                              <TableCell className="text-center">{item.below35}</TableCell>
                              <TableCell className="text-center">{item.age35to45}</TableCell>
                              <TableCell className="text-center">{item.above45}</TableCell>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}