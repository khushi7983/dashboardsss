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

export default function DashboardNDV() {
  const { theme } = useTheme();
  const [chartData, setChartData] = useState({
    pie: null,
    bar: null,
  });
  const [tradeFilters, setTradeFilters] = useState({
    trade: "All",
    age: "All",
    date: null,
  });
  const [trrdFilters, setTrrdFilters] = useState({
    type: "Transfer",
    trade: "All",
    age: "All",
    date: null,
  });
  const [healthFilters, setHealthFilters] = useState({
    status: "All",
    age: "All",
    date: null,
  });
  const [awardFilters, setAwardFilters] = useState({
    type: "All",
    trade: "All",
    age: "All",
    date: null,
  });

  // Updated JSON Data
  const tradeData = [
    { trade: "TA+", count: 900, below35: 400, age35to45: 300, above45: 200, date: "2025-01-15" },
    { trade: "FM", count: 600, below35: 250, age35to45: 200, above45: 150, date: "2025-02-01" },
    { trade: "CM", count: 700, below35: 300, age35to45: 250, above45: 150, date: "2025-03-10" },
    { trade: "HSK I", count: 450, below35: 150, age35to45: 150, above45: 150, date: "2025-01-20" },
    { trade: "HSK II", count: 500, below35: 200, age35to45: 200, above45: 100, date: "2025-02-15" },
    { trade: "SK", count: 800, below35: 350, age35to45: 300, above45: 150, date: "2025-03-01" },
    { trade: "TMM", count: 650, below35: 250, age35to45: 250, above45: 150, date: "2025-04-01" },
  ];

  const trrdData = [
    { type: "Transfer", trade: "TA+", count: 200, below35: 90, age35to45: 60, above45: 50, date: "2025-01-20" },
    { type: "Retirement", trade: "FM", count: 150, below35: 40, age35to45: 50, above45: 60, date: "2025-02-05" },
    { type: "Resignation", trade: "CM", count: 180, below35: 80, age35to45: 70, above45: 30, date: "2025-03-15" },
    { type: "Death", trade: "HSK I", count: 50, below35: 15, age35to45: 15, above45: 20, date: "2025-01-25" },
    { type: "Transfer", trade: "HSK II", count: 120, below35: 50, age35to45: 40, above45: 30, date: "2025-02-20" },
    { type: "Retirement", trade: "SK", count: 130, below35: 50, age35to45: 40, above45: 40, date: "2025-03-05" },
    { type: "Resignation", trade: "TMM", count: 160, below35: 60, age35to45: 60, above45: 40, date: "2025-04-05" },
  ];

  const healthData = [
    { status: "Medical Pending", count: 400, below35: 150, age35to45: 120, above45: 130, date: "2025-01-10" },
    { status: "HT", count: 250, below35: 90, age35to45: 80, above45: 80, date: "2025-02-15" },
    { status: "DIAB", count: 200, below35: 70, age35to45: 60, above45: 70, date: "2025-03-20" },
    { status: "HT + DIAB", count: 100, below35: 30, age35to45: 30, above45: 40, date: "2024-12-30" },
  ];

  const awardsData = [
    { type: "ASD Cash", count: 12, below35: 5, age35to45: 4, above45: 3, date: "2025-01-05" },
    { type: "CNC Cash", count: 8, below35: 3, age35to45: 3, above45: 2, date: "2025-02-10" },
    { type: "CNC Commendation", count: 10, below35: 4, age35to45: 4, above45: 2, date: "2025-03-05" },
    { type: "CNS Cash", count: 6, below35: 2, age35to45: 2, above45: 2, date: "2025-01-15" },
    { type: "CNS Commendation", count: 7, below35: 3, age35to45: 2, above45: 2, date: "2025-02-20" },
    { type: "SHRAM Awards", count: 9, below35: 4, age35to45: 3, above45: 2, date: "2025-03-10" },
  ];

  const trades = ["All", "TA+", "FM", "CM", "HSK I", "HSK II", "SK", "TMM"];
  const ageOptions = ["All", "Below 35", "35-45", "Above 45"];
  const event = ["All", "Republic Day", "Independence Day", "Navy Day"];
  const healthStatuses = ["All", "Medical Pending", "HT", "DIAB", "HT + DIAB"];
  const awardTypes = ["All", "ASD Cash", "CNC Cash",
    "CNC Commendation",
    "CNS Cash",
    "CNS Commendation",
    "SHRAM Awards"];

  useEffect(() => {
    setChartData({
      pie: [
        { category: "PMO", sanction: 6000, borne: 4400, colorStart: "#FF6349", colorEnd: "#B22222", label: "Network Development" },
        { category: "GM(R)", sanction: 200, borne: 150, colorStart: "#1E90FF", colorEnd: "#0000CD", label: "Administrative Officer Battalions" },
        { category: "GM(T)", sanction: 800, borne: 600, colorStart: "#FFD700", colorEnd: "#FFA500", label: "Operational Warfare Center" },
        { category: "GM(HR)", sanction: 400, borne: 300, colorStart: "#FFFFFF", colorEnd: "#F5F5F5", label: "Navigation Repair Workshop" },
        { category: "GM(QA)", sanction: 600, borne: 450, colorStart: "#FF6347", colorEnd: "#B22222", label: "Special Project Vessel" },
      ],
      bar: [
        { category: "2018", Industrial: 300, NonIndustrial: 150 },
        { category: "2019", Industrial: 350, NonIndustrial: 200 },
        { category: "2020", Industrial: 400, NonIndustrial: 250 },
        { category: "2021", Industrial: 450, NonIndustrial: 300 },
        { category: "2022", Industrial: 500, NonIndustrial: 350 },
        { category: "2023", Industrial: 550, NonIndustrial: 400 },
      ],
    });
  }, []);

  // Filter function for single date (show records up to selected date)
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
    width: '150px',
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

      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 items-center">
          <h4 className={`text-3xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            ND(V) Dashboard
          </h4>
          <div className="flex justify-end">
            <a
              href="/hierarchy"
              className={`px-4 py-2 text-xl ${theme === "dark" ? "text-white" : "text-gray-900"} bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 rounded-lg shadow-md`}
            >
              Hierarchy
            </a>
          </div>
        </div>
      </div>

      <div className="gap-4">
        {/* Main Dashboard Content */}
        <div className="lg:col-span-9 space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <StatsCard background={'#2b7fff'} icon
                      ={Users} label="Sanction" value="6000" bgcolor={'#133b78'} percent={70} />
                      <StatsCard background={'#f0b100'} icon={Building} label="Borne" value="4400" bgcolor={'#765e1a'} percent={30} />
                      <StatsCard background={'#f4444d'} icon={Briefcase} label="Deficency" value="1200" bgcolor={'#60161a'} percent={3} />
                      <StatsCard background={'#269156'} icon={DollarSign} label="Deficency Percentage" value="27.3%" bgcolor={'#124c2c'} percent={58} />
                    </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[600px]">
            {chartData.pie && (
              <ChartCard
                title="Sanction Overview"
                chartType="pie"
                chartData={chartData.pie}
                selectOptions={["This Year", "Last Year", "All Time", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"]}
                height={600}
              />
            )}
            {chartData.bar && (
              <ChartCard
                title="Industrial vs Non-Industrial Over Years"
                chartType="clustered-bar"
                chartData={chartData.bar}
                selectOptions={["This Year", "Last Year", "All Time", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"]}
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
                    className={`w-[150px] ${
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
                  value={tradeFilters.date || ""}
                  onChange={(e) => {
                    setTradeFilters({ ...tradeFilters, date: e.target.value });
                    handleDatePickerClick("Trade Wise", e.target.value);
                  }}
                  style={dateInputStyle}
                  placeholder="Select Date"
                />
                 <input
                  type="date"
                  value={tradeFilters.date || ""}
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
                      {/* <TableHead className="font-semibold">Date</TableHead> */}
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
                          {/* <TableCell>{item.date}</TableCell> */}
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
                        className={`w-[150px] ${
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
                      value={trrdFilters.date || ""}
                      onChange={(e) => {
                        setTrrdFilters({ ...trrdFilters, date: e.target.value });
                        handleDatePickerClick("TRRD", e.target.value);
                      }}
                      style={dateInputStyle}
                      placeholder="Select Date"
                    />
                    <input
                      type="date"
                      value={trrdFilters.date || ""}
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
                          {/* <TableHead className="font-semibold">Date</TableHead> */}
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
                              {/* <TableCell>{item.date}</TableCell> */}
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
                    className={`w-[150px] ${
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
                  value={healthFilters.date || ""}
                  onChange={(e) => {
                    setHealthFilters({ ...healthFilters, date: e.target.value });
                    handleDatePickerClick("Health Wise", e.target.value);
                  }}
                  style={dateInputStyle}
                  placeholder="Select Date"
                />
                <input
                      type="date"
                      value={trrdFilters.date || ""}
                      onChange={(e) => {
                        setTrrdFilters({ ...trrdFilters, date: e.target.value });
                        handleDatePickerClick("TRRD", e.target.value);
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
                      {/* <TableHead className="font-semibold">Date</TableHead> */}
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
                          {/* <TableCell>{item.date}</TableCell> */}
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
                    className={`w-[150px] ${
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
                    className={`w-[150px] ${
                      theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white"
                    }`}
                  >
                    <SelectValue placeholder="Select Trade" />
                  </SelectTrigger>
                  <SelectContent>
                    {event.map((trade) => (
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
                  value={awardFilters.date || ""}
                  onChange={(e) => {
                    setAwardFilters({ ...awardFilters, date: e.target.value });
                    handleDatePickerClick("Awards Wise", e.target.value);
                  }}
                  style={dateInputStyle}
                  placeholder="Select Date"
                />
                <input
                      type="date"
                      value={trrdFilters.date || ""}
                      onChange={(e) => {
                        setTrrdFilters({ ...trrdFilters, date: e.target.value });
                        handleDatePickerClick("TRRD", e.target.value);
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
                      {/* <TableHead className="font-semibold">Date</TableHead> */}
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
                          {/* <TableCell>{item.date}</TableCell> */}
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