import { useTheme } from "./ThemeProvider";

export default function StatsCard({ icon: Icon, label, value, bgcolor, percent, background }) {
  const { theme } = useTheme();

  const cardStyle = {
    background: background,
    borderColor: "#e2e8f0",
    boxShadow: "0 6px 12px -2px rgba(0, 0, 0, 0.15), 0 3px 6px -2px rgba(0, 0, 0, 0.1)",
  };

  const iconStyle = {
    background: bgcolor,
    color: "#ffffff",
  };

  const labelColor = "#4b5563";
  const valueColor = "#111827";

  return (
    <div
      className="p-4 rounded-lg border transition-all duration-300 hover:shadow-xl flex items-center pt-8 pb-8"
      style={cardStyle}
    >
      <div className="p-3 rounded-full mr-4" style={iconStyle}>
        <Icon className="h-5 w-5" style={{ color: iconStyle.color }} />
      </div>
      <div>
        <p className="text-xs font-semibold" style={{ fontSize: "16px", color: labelColor }}>
          {label}
        </p>
        <p className="text-100 font-semibold" style={{ fontSize: "32px", color: valueColor }}>
          {value}
        </p>
      </div>
    </div>
  );
}