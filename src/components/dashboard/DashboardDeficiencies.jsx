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

export default function DashboardDeficiencies() {
  const { theme } = useTheme();
  const [chartData, setChartData] = useState({
    pie: null,
    bar: null,
  });
  const [deficiencyFilters, setDeficiencyFilters] = useState({
    grade: "All",
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

  // Updated JSON Data for Deficiencies
  const deficiencyData = [
    { 
      ser: 1, 
      grade: "Tradesman Male (TM)", 
      tm: 100, 
      sk: 150, 
      hskI: 80, 
      hskII: 120, 
      mcm: 60, 
      cm: 90, 
      fm: 70, 
      recruitmentPercent: 90, 
      promotionPercent: 10,
      date: "2025-01-15" 
    },
    { 
      ser: 2, 
      grade: "Skilled (SK)", 
      tm: 0, 
      sk: 200, 
      hskI: 100, 
      hskII: 150, 
      mcm: 80, 
      cm: 120, 
      fm: 90, 
      recruitmentPercent: 60, 
      promotionPercent: 40,
      date: "2025-02-01" 
    },
    { 
      ser: 3, 
      grade: "Highly Skilled (HSK I)", 
      tm: 0, 
      sk: 0, 
      hskI: 180, 
      hskII: 140, 
      mcm: 100, 
      cm: 130, 
      fm: 110, 
      recruitmentPercent: 0, 
      promotionPercent: 100,
      date: "2025-03-10" 
    },
    { 
      ser: 4, 
      grade: "Highly Skilled (HSK II)", 
      tm: 0, 
      sk: 0, 
      hskI: 0, 
      hskII: 160, 
      mcm: 120, 
      cm: 140, 
      fm: 130, 
      recruitmentPercent: 0, 
      promotionPercent: 100,
      date: "2025-01-20" 
    },
    { 
      ser: 5, 
      grade: "Master Craftsman (MCM)", 
      tm: 0, 
      sk: 0, 
      hskI: 0, 
      hskII: 0, 
      mcm: 140, 
      cm: 160, 
      fm: 150, 
      recruitmentPercent: 33.3, 
      promotionPercent: 66.7,
      date: "2025-02-15" 
    },
    { 
      ser: 6, 
      grade: "Chargeman (CM)", 
      tm: 0, 
      sk: 0, 
      hskI: 0, 
      hskII: 0, 
      mcm: 0, 
      cm: 180, 
      fm: 170, 
      recruitmentPercent: 0, 
      promotionPercent: 100,
      date: "2025-03-01" 
    },
    { 
      ser: 7, 
      grade: "Foreman (FM)", 
      tm: 0, 
      sk: 0, 
      hskI: 0, 
      hskII: 0, 
      mcm: 0, 
      cm: 0, 
      fm: 200, 
      recruitmentPercent: 0, 
      promotionPercent: 100,
      date: "2025-04-01" 
    },
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

  const grades = ["All", "Tradesman Male (TM)", "Skilled (SK)", "Highly Skilled (HSK I)", "Highly Skilled (HSK II)", "Master Craftsman (MCM)", "Chargeman (CM)", "Foreman (FM)"];
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

  const filteredDeficiencyData = deficiencyData.filter((item) => {
    if (deficiencyFilters.grade !== "All" && item.grade !== deficiencyFilters.grade) return false;
    return filterByDate(item, deficiencyFilters.date);
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
          <li className={`${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>Deficiencies Dashboard</li>
        </ol>
      </nav>

      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 items-center">
          <h4 className={`text-3xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Deficiencies Dashboard
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
                      ={Users} label="Total Deficiency" value="2450" bgcolor={'#133b78'} percent={70} />
                      <StatsCard background={'#f0b100'} icon={Building} label="Critical Deficiency" value="890" bgcolor={'#765e1a'} percent={30} />
                      <StatsCard background={'#f4444d'} icon={Briefcase} label="Avg Deficiency Rate" value="36.4%" bgcolor={'#60161a'} percent={3} />
                      <StatsCard background={'#269156'} icon={DollarSign} label="Fill Rate Target" value="75%" bgcolor={'#124c2c'} percent={58} />
                    </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[600px]">
            {chartData.pie && (
              <ChartCard
                title="Deficiency Distribution"
                chartType="pie"
                chartData={chartData.pie}
                selectOptions={["This Year", "Last Year", "All Time", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"]}
                height={600}
              />
            )}
            {chartData.bar && (
              <ChartCard
                title="Recruitment vs Promotion Trends"
                chartType="clustered-bar"
                chartData={chartData.bar}
                selectOptions={["This Year", "Last Year", "All Time", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"]}
                height={600}
                theme={theme}
              />
            )}
          </div>

          {/* Tables Section */}
          <div className="grid grid-cols-1 gap-4 mt-2">
            {/* Trade Wise Section - Updated for Deficiencies */}
            <div
              className={`p-6 rounded-xl ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } shadow-lg hover:shadow-xl transition-all duration-300 border ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h5 className="text-xl font-semibold mb-4">Trade Wise Deficiencies</h5>
              <div className="flex flex-wrap gap-4 mb-6">
                <Select
                  value={deficiencyFilters.grade}
                  onValueChange={(value) => setDeficiencyFilters({ ...deficiencyFilters, grade: value })}
                >
                  <SelectTrigger
                    className={`w-[200px] ${
                      theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white"
                    }`}
                  >
                    <SelectValue placeholder="Select Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input
                  type="date"
                  value={deficiencyFilters.date || ""}
                  onChange={(e) => {
                    setDeficiencyFilters({ ...deficiencyFilters, date: e.target.value });
                    handleDatePickerClick("Deficiencies", e.target.value);
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
                      <TableHead className="font-semibold">Ser</TableHead>
                      <TableHead className="font-semibold">Grade</TableHead>
                      <TableHead className="font-semibold text-center">TM</TableHead>
                      <TableHead className="font-semibold text-center">SK</TableHead>
                      <TableHead className="font-semibold text-center">HSK I</TableHead>
                      <TableHead className="font-semibold text-center">HSK II</TableHead>
                      <TableHead className="font-semibold text-center">MCM</TableHead>
                      <TableHead className="font-semibold text-center">CM</TableHead>
                      <TableHead className="font-semibold text-center">FM</TableHead>
                      <TableHead className="font-semibold text-center">Recruitment %</TableHead>
                      <TableHead className="font-semibold text-center">Promotion %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {filteredDeficiencyData.map((item) => (
                        <motion.tr
                          key={item.ser}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className={theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-200"}
                        >
                          <TableCell className="font-semibold">{item.ser}</TableCell>
                          <TableCell className="font-semibold">{item.grade}</TableCell>
                          <TableCell className="text-center">{item.tm}</TableCell>
                          <TableCell className="text-center">{item.sk}</TableCell>
                          <TableCell className="text-center">{item.hskI}</TableCell>
                          <TableCell className="text-center">{item.hskII}</TableCell>
                          <TableCell className="text-center">{item.mcm}</TableCell>
                          <TableCell className="text-center">{item.cm}</TableCell>
                          <TableCell className="text-center">{item.fm}</TableCell>
                          <TableCell className="text-center">{item.recruitmentPercent}%</TableCell>
                          <TableCell className="text-center">{item.promotionPercent}%</TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Additional sections can be added here if needed */}
          </div>
        </div>
      </div>
    </div>
  );
} 