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
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardASD() {
  const { theme } = useTheme();
  const [chartData, setChartData] = useState({
    pie: null,
    bar: null,
  });
  const [tradeFilters, setTradeFilters] = useState({
    trade: "All",
    age: "All",
    date: null, // Changed from dateRange to single date
  });
  const [trrdFilters, setTrrdFilters] = useState({
    type: "Transfer",
    trade: "All",
    age: "All",
    date: null, // Changed from dateRange to single date
  });
  const [healthFilters, setHealthFilters] = useState({
    status: "All",
    age: "All",
    date: null, // Changed from dateRange to single date
  });
  const [awardFilters, setAwardFilters] = useState({
    type: "All",
    trade: "All",
    age: "All",
    date: null, // Changed from dateRange to single date
  });

  // JSON Data
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

  const awardsData = [
    { type: "Excellence", trade: "TA+", count: 12, below35: 5, age35to45: 4, above45: 3, date: "2025-01-05" },
    { type: "Innovation", trade: "FM", count: 8, below35: 3, age35to45: 3, above45: 2, date: "2025-02-10" },
    { type: "Leadership", trade: "CM", count: 10, below35: 4, age35to45: 4, above45: 2, date: "2025-03-05" },
    { type: "Teamwork", trade: "HSK I", count: 6, below35: 2, age35to45: 2, above45: 2, date: "2025-01-15" },
    { type: "Excellence", trade: "HSK II", count: 7, below35: 3, age35to45: 2, above45: 2, date: "2025-02-20" },
    { type: "Innovation", trade: "SK", count: 9, below35: 4, age35to45: 3, above45: 2, date: "2025-03-10" },
    { type: "Leadership", trade: "TMM", count: 8, below35: 3, age35to45: 3, above45: 2, date: "2025-04-01" },
  ];

  const trades = ["All", "TA+", "FM", "CM", "HSK I", "HSK II", "SK", "TMM"];
  const ageOptions = ["All", "Below 35", "35-45", "Above 45"];
  const healthStatuses = ["All", "Medical Pending", "HT", "DIAB", "HT + DIAB"];
  const awardTypes = ["All", "Excellence", "Innovation", "Leadership", "Teamwork"];

  useEffect(() => {
    setChartData({
      pie: [
        { category: "AOB", sanction: 300, borne: 210, colorStart: "#1E90FF", colorEnd: "#0000CD", label: "Administrative Officer Battalions" },
        { category: "NDV", sanction: 6000, borne: 5000, colorStart: "#FF6349", colorEnd: "#B22222", label: "Network Development" },
        { category: "OWC", sanction: 1200, borne: 1000, colorStart: "#FFD700", colorEnd: "#FFA500", label: "Operational Warfare Center" },
        { category: "NRW", sanction: 600, borne: 500, colorStart: "#FFFFFF", colorEnd: "#F5F5F5", label: "Navigation Repair Workshop" },
        { category: "SPV", sanction: 800, borne: 650, colorStart: "#FF6347", colorEnd: "#B22222", label: "Special Project Vessel" },
      ],
      bar: [
        { category: "2018", Industrial: 40, NonIndustrial: 25 },
        { category: "2019", Industrial: 55, NonIndustrial: 30 },
        { category: "2020", Industrial: 60, NonIndustrial: 45 },
        { category: "2021", Industrial: 70, NonIndustrial: 50 },
        { category: "2022", Industrial: 65, NonIndustrial: 40 },
        { category: "2023", Industrial: 75, NonIndustrial: 55 },
      ]
    });
  }, []);

  // Updated filter function for single date (show records up to selected date)
  const filterByDate = (item, selectedDate) => {
    if (!selectedDate) return true; // If no date selected, show all
    const itemDate = new Date(item.date);
    const filterDate = new Date(selectedDate);
    return itemDate <= filterDate;
  };

  const filteredTradeData = tradeData.filter((item) => {
    if (tradeFilters.trade !== "All" && item.trade !== tradeFilters.trade) return false;
    if (tradeFilters.age === "Below 35" && item.below35 === 0) return false;
    if (tradeFilters.age === "35-45" && item.age35to45 === 0) return false;
    if (tradeFilters.age === "Above 45" && item.above45 === 0) return false;
    return filterByDate(item, tradeFilters.date);
  });

  const filteredTrrdData = trrdData.filter((item) => {
    if (item.type !== trrdFilters.type) return false;
    if (trrdFilters.trade !== "All" && item.trade !== trrdFilters.trade) return false;
    if (trrdFilters.age === "Below 35" && item.below35 === 0) return false;
    if (trrdFilters.age === "35-45" && item.age35to45 === 0) return false;
    if (trrdFilters.age === "Above 45" && item.above45 === 0) return false;
    return filterByDate(item, trrdFilters.date);
  });

  const filteredHealthData = healthData.filter((item) => {
    if (healthFilters.status !== "All" && item.status !== healthFilters.status) return false;
    if (healthFilters.age === "Below 35" && item.below35 === 0) return false;
    if (healthFilters.age === "35-45" && item.age35to45 === 0) return false;
    if (healthFilters.age === "Above 45" && item.above45 === 0) return false;
    return filterByDate(item, healthFilters.date);
  });

  const filteredAwardsData = awardsData.filter((item) => {
    if (awardFilters.type !== "All" && item.type !== awardFilters.type) return false;
    if (awardFilters.trade !== "All" && item.trade !== awardFilters.trade) return false;
    if (awardFilters.age === "Below 35" && item.below35 === 0) return false;
    if (awardFilters.age === "35-45" && item.age35to45 === 0) return false;
    if (awardFilters.age === "Above 45" && item.above45 === 0) return false;
    return filterByDate(item, awardFilters.date);
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  // Debug function to confirm date input change
  const handleDatePickerClick = (tableName, date) => {
    console.log(`Date selected for ${tableName}: ${date || 'None'}`);
  };

  // Inline CSS for date input to match theme and UI
  const dateInputStyle = {
    width: '200px',
    padding: '8px 12px',
    borderRadius: '6px',
    border: `1px solid ${theme === "dark" ? '#374151' : '#d1d5db'}`,
    backgroundColor: theme === "dark" ? '#1f2937' : '#ffffff',
    color: theme === "dark" ? '#ffffff' : '#111827',
    fontSize: '14px',
    lineHeight: '20px',
    outline: 'none',
    transition: 'border-color 0.2s',
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
          ASD Dashboard
        </h4>
      </div>

      <div className="gap-4">
        {/* Main Dashboard Content */}
        <div className="lg:col-span-9 space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard
              background={theme === "dark" ? "#2b7fff" : "#b3d4ff"}
              icon={Users}
              label="Sanction"
              value="7000"
              bgcolor={theme === "dark" ? "#133b78" : "#4b83f6"}
              percent={70}
            />
            <StatsCard
              background={theme === "dark" ? "#f0b100" : "#ffe8b3"}
              icon={Building}
              label="Borne"
              value="5400"
              bgcolor={theme === "dark" ? "#765e1a" : "#f4a261"}
              percent={30}
            />
            <StatsCard
              background={theme === "dark" ? "#f4444d" : "#ffc1cc"}
              icon={Briefcase}
              label="Deficency"
              value="1600"
              bgcolor={theme === "dark" ? "#60161a" : "#f87171"}
              percent={3}
            />
            <StatsCard
              background={theme === "dark" ? "#269156" : "#b7f5d1"}
              icon={DollarSign}
              label="Deficency Percentage"
              value="22.3%"
              bgcolor={theme === "dark" ? "#124c2c" : "#34d399"}
              percent={58}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[600px]">
            {chartData.pie && (
              <ChartCard
                title="Sanction Overview"
                chartType="pie"
                chartData={chartData.pie}
                selectOptions={["This Year", "Last Year", "All Time", '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010']}
                height={600}
              />
            )}
            {chartData.bar && (
              <ChartCard
                title="Industrial vs Non-Industrial Over Years"
                chartType="clustered-bar"
                chartData={chartData.bar}
                selectOptions={["This Year", "Last Year", "All Time", '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010']}
                height={600}
                theme={theme}
              />
            )}
          </div>

          {/* Tables Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
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
                <input
                  type="date"
                  value={tradeFilters.date || ''}
                  onChange={(e) => {
                    setTradeFilters({ ...tradeFilters, date: e.target.value });
                    handleDatePickerClick("Trade Wise", e.target.value);
                  }}
                  style={dateInputStyle}
                  placeholder="Select Date"
                />
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
                    <input
                      type="date"
                      value={trrdFilters.date || ''}
                      onChange={(e) => {
                        setTrrdFilters({ ...trrdFilters, date: e.target.value });
                        handleDatePickerClick("TRRD", e.target.value);
                      }}
                      style={dateInputStyle}
                      placeholder="Select Date"
                    />
                  </div>
                  <div className="overflow-x-auto pt-2">
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

            {/* Health Wise Section */}
            <div
              className={`p-6 rounded-xl ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } shadow-lg hover:shadow-xl transition-all duration-300 border ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h5 className="text-xl font-semibold mb-4">Health Wise</h5>
              <div className="flex flex-wrap gap-4 mb-6">
                <Select
                  value={healthFilters.status}
                  onValueChange={(value) => setHealthFilters({ ...healthFilters, status: value })}
                >
                  <SelectTrigger
                    className={`w-[200px] ${
                      theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white"
                    }`}
                  >
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {healthStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={healthFilters.age}
                  onValueChange={(value) => setHealthFilters({ ...healthFilters, age: value })}
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
                <input
                  type="date"
                  value={healthFilters.date || ''}
                  onChange={(e) => {
                    setHealthFilters({ ...healthFilters, date: e.target.value });
                    handleDatePickerClick("Health Wise", e.target.value);
                  }}
                  style={dateInputStyle}
                  placeholder="Select Date"
                />
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
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="font-semibold text-center">Total</TableHead>
                      <TableHead className="font-semibold text-center">Below 35</TableHead>
                      <TableHead className="font-semibold text-center">35-45</TableHead>
                      <TableHead className="font-semibold text-center">Above 45</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {filteredHealthData.map((item) => (
                        <motion.tr
                          key={item.status}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className={theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-200"}
                        >
                          <TableCell className="font-semibold">{item.status}</TableCell>
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

            {/* Awards Wise Section */}
            <div
              className={`p-6 rounded-xl ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } shadow-lg hover:shadow-xl transition-all duration-300 border ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h5 className="text-xl font-semibold mb-4">Awards Wise</h5>
              <div className="flex flex-wrap gap-4 mb-6">
                <Select
                  value={awardFilters.type}
                  onValueChange={(value) => setAwardFilters({ ...awardFilters, type: value })}
                >
                  <SelectTrigger
                    className={`w-[200px] ${
                      theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white"
                    }`}
                  >
                    <SelectValue placeholder="Select Award Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {awardTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={awardFilters.trade}
                  onValueChange={(value) => setAwardFilters({ ...awardFilters, trade: value })}
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
                  value={awardFilters.age}
                  onValueChange={(value) => setAwardFilters({ ...awardFilters, age: value })}
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
                <input
                  type="date"
                  value={awardFilters.date || ''}
                  onChange={(e) => {
                    setAwardFilters({ ...awardFilters, date: e.target.value });
                    handleDatePickerClick("Awards Wise", e.target.value);
                  }}
                  style={dateInputStyle}
                  placeholder="Select Date"
                />
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
                      <TableHead className="font-semibold">Award Type</TableHead>
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
                      {filteredAwardsData.map((item) => (
                        <motion.tr
                          key={`${item.type}-${item.trade}`}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className={theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-200"}
                        >
                          <TableCell className="font-semibold">{item.type}</TableCell>
                          <TableCell>{item.trade}</TableCell>
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
          </div>
        </div>
      </div>
    </div>
  );
}