import { useTheme } from "./ThemeProvider";

export default function StatsCard({ icon: Icon, label, value, bgcolor, percent, background }) {
  const { theme } = useTheme();
  
  const isDark = theme === "dark";
  
  // Use the provided background or default based on theme
  const backgroundStyle = background
    ? { background }
    : {};
    
  // Ensure icon text has good contrast in both modes
  const iconTextColor = isDark ? "text-white" : "text-white";
  
  return (
    <div
      className={`${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } p-4 rounded-lg shadow-md transition-all duration-300 hover:${
        isDark ? "bg-gray-750" : "bg-gray-50"
      } hover:shadow-lg hover:${
        isDark ? "border-blue-500" : "border-blue-300"
      } flex items-center pt-8 pb-8`}
      style={backgroundStyle}>
      <div className="p-3 rounded-full mr-4" 
           style={{ 
             background: bgcolor,
             // Ensure consistent opacity in both modes
             opacity: isDark ? 1 : 0.9
           }}>
        <Icon className={`h-5 w-5 ${iconTextColor}`} />
      </div>
      <div>
        <p className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-200"}`}>
          {label}
        </p>
        <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-200"}`}>
          {value}
        </p>
        {/* {percent !== undefined && (
          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            {percent}% change
          </p>
        )} */}
      </div>
    </div>
  );
}