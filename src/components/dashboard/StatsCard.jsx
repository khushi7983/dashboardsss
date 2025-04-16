import { useTheme } from "./ThemeProvider";

export default function StatsCard({ icon: Icon, label, value, color, percent }) {
  const { theme } = useTheme();

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } p-4 rounded-lg shadow-md transition-all duration-300 hover:bg-${
        theme === "dark" ? "gray-750" : "gray-50"
      } hover:shadow-lg hover:border-${
        theme === "dark" ? "blue-500" : "blue-300"
      } flex items-center`}
    >
      <div className={`bg-${color}-500 bg-opacity-10 p-3 rounded-full mr-4`}>
        <Icon className={`h-5 w-5 ${theme === "dark" ? "text-white" : "text-gray-800"}`} />
      </div>
      <div>
        <p className={`text-xs font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{label}</p>
        <p className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{value}</p>
      </div>
    </div>
  );
}