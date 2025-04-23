import { useTheme } from "./ThemeProvider";

export default function StatsCard({ icon: Icon, label, value, bgcolor, percent, background }) {
  const { theme } = useTheme();

  const backgroundStyle = background
    ? { background }
    : {};

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } p-4 rounded-lg shadow-md transition-all duration-300 hover:${
        theme === "dark" ? "bg-gray-750" : "bg-gray-50"
      } hover:shadow-lg hover:${
        theme === "dark" ? "border-blue-500" : "border-blue-300"
      } flex items-center pt-8 pb-8`}
      style={backgroundStyle}>
      <div className=" p-3 rounded-full mr-4" style={{ 'background': bgcolor }}>
        <Icon className={`h-5 w-5 ${theme === "dark" ? "text-white" : "text-gray-800"}`} />
      </div>
      <div>
        <p className={`text-xs font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-500"}`} style={{ fontSize: '16px' }}>{label}</p>
        <p className={`text-100 font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`} style={{ fontSize: '32px' }}>{value}</p>
      </div>
    </div>
  );
}