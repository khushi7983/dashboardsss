import { useTheme } from "./ThemeProvider";

export default function StatsCard({ icon: Icon, label, value, bgcolor, percent, background }) {
  const { theme } = useTheme();
  
  // Set up dynamic styles based on theme
  const cardStyle = {
    background: background || (theme === "dark" ? "#1e293b" : "#ffffff"),
    borderColor: theme === "dark" ? "#334155" : "#e2e8f0",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  };
  
  // Icon background with better contrast in light mode
  const iconStyle = {
    background: bgcolor || (theme === "dark" ? "#334155" : "#dbeafe"),
    color: theme === "dark" ? "#ffffff" : "#1e40af"
  };
  
  // Text colors with better contrast
  const labelColor = theme === "dark" ? "#e2e8f0" : "#4b5563";
  const valueColor = theme === "dark" ? "#ffffff" : "#111827";

  return (
    <div
      className="p-4 rounded-lg border transition-all duration-300 hover:shadow-lg flex items-center pt-8 pb-8"
      style={cardStyle}
    >
      <div className="p-3 rounded-full mr-4" style={iconStyle}>
        <Icon className="h-5 w-5" style={{ color: theme === "dark" ? "#ffffff" : "#1e40af" }} />
      </div>
      <div>
        <p className="text-xs font-semibold" style={{ fontSize: '16px', color: labelColor }}>{label}</p>
        <p className="text-100 font-semibold" style={{ fontSize: '32px', color: valueColor }}>{value}</p>
      </div>
    </div>
  );
}