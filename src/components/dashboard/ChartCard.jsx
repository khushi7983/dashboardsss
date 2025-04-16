import { useEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "./ThemeProvider";

// Apply animated theme for smooth transitions
am4core.useTheme(am4themes_animated);

export default function ChartCard({ title, chartType, selectOptions, chartData }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!chartRef.current) return;

    // Clean up previous chart instance
    if (chartInstance.current) {
      chartInstance.current.dispose();
    }

    // Create chart instance
    let chart;
    if (chartType === "pie") {
      chart = am4core.create(chartRef.current, am4charts.PieChart3D);
      chart.depth = 30;
      chart.angle = 30;
      chart.innerRadius = 30; // Add inner radius for better visuals
    } else if (chartType === "bar") {
      chart = am4core.create(chartRef.current, am4charts.XYChart3D);
      chart.padding(10, 10, 10, 10); // Add padding to prevent overflow
    } else {
      console.error("Unsupported chart type:", chartType);
      return;
    }

    // Set theme-aware background
    chart.background.fill = am4core.color(theme === "dark" ? "#1F2937" : "#F9FAFB");

    // Configure chart
    if (chartType === "pie") {
      chart.data = chartData;

      let series = chart.series.push(new am4charts.PieSeries3D());
      series.dataFields.value = "sanction";
      series.dataFields.category = "category";
      series.labels.template.disabled = true;
      series.ticks.template.disabled = true;
      series.slices.template.cornerRadius = 5;
      series.slices.template.innerCornerRadius = 3;

      // Enable animation
      series.hiddenState.properties.opacity = 0;
      series.slices.template.showOnInit = true;
      series.slices.template.animationDuration = 800;
      series.slices.template.hiddenState.transitionDuration = 800;

      series.slices.template.adapter.add("fill", (fill, target) => {
        if (target.dataItem && target.dataItem.dataContext) {
          let data = target.dataItem.dataContext;
          let gradient = new am4core.LinearGradient();
          gradient.rotation = 90;
          gradient.addColor(am4core.color(data.colorStart));
          gradient.addColor(am4core.color(data.colorEnd));
          return gradient;
        }
        return fill;
      });

      series.slices.template.tooltipText = "Sanction: {sanction}\nBorne: {borne}";
      let tooltip = series.slices.template.tooltip || new am4core.Tooltip();
      series.slices.template.tooltip = tooltip;
      tooltip.getFillFromObject = false;
      tooltip.background.fill = am4core.color(theme === "dark" ? "rgba(0, 0, 0, 0.85)" : "rgba(255, 255, 255, 0.95)");
      tooltip.background.stroke = am4core.color(theme === "dark" ? "#4B5563" : "#D1D5DB");
      tooltip.label.fill = am4core.color(theme === "dark" ? "#FFFFFF" : "#1F2937");
      tooltip.animationDuration = 400;

      chart.legend = new am4charts.Legend();
      chart.legend.position = "right";
      chart.legend.scrollable = true;
      chart.legend.maxWidth = 120; // Prevent legend overflow
      chart.legend.labels.template.truncate = true;
      chart.legend.labels.template.maxWidth = 100;
      chart.legend.itemContainers.template.paddingTop = 3;
      chart.legend.itemContainers.template.paddingBottom = 3;
      chart.legend.labels.template.fill = am4core.color(theme === "dark" ? "#D1D5DB" : "#4B5563");
      chart.legend.labels.template.fontSize = 12;
    } else if (chartType === "bar") {
      chart.data = chartData;

      let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      xAxis.dataFields.category = "month";
      xAxis.renderer.grid.template.location = 0;
      xAxis.renderer.labels.template.fill = am4core.color(theme === "dark" ? "#D1D5DB" : "#4B5563");
      xAxis.renderer.grid.template.stroke = am4core.color(theme === "dark" ? "#4B5563" : "#D1D5DB");
      xAxis.renderer.labels.template.fontSize = 12;

      let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
      yAxis.renderer.labels.template.fill = am4core.color(theme === "dark" ? "#D1D5DB" : "#4B5563");
      yAxis.renderer.grid.template.stroke = am4core.color(theme === "dark" ? "#4B5563" : "#D1D5DB");
      yAxis.renderer.grid.template.strokeOpacity = 0.15;
      yAxis.renderer.labels.template.fontSize = 12;

      let series1 = chart.series.push(new am4charts.ColumnSeries3D());
      series1.dataFields.valueY = "I";
      series1.dataFields.categoryX = "month";
      series1.name = "I";
      series1.stacked = true;
      series1.columns.template.showOnInit = true;
      series1.columns.template.animationDuration = 600;
      series1.columns.template.adapter.add("fill", () => {
        let gradient = new am4core.LinearGradient();
        gradient.rotation = 90;
        gradient.addColor(am4core.color(theme === "dark" ? "#3B82F6" : "#2563EB"));
        gradient.addColor(am4core.color(theme === "dark" ? "#1E40AF" : "#1E3A8A"));
        return gradient;
      });

      let series2 = chart.series.push(new am4charts.ColumnSeries3D());
      series2.dataFields.valueY = "M";
      series2.dataFields.categoryX = "month";
      series2.name = "M";
      series2.stacked = true;
      series2.columns.template.showOnInit = true;
      series2.columns.template.animationDuration = 600;
      series2.columns.template.adapter.add("fill", () => {
        let gradient = new am4core.LinearGradient();
        gradient.rotation = 90;
        gradient.addColor(am4core.color(theme === "dark" ? "#E5E7EB" : "#D1D5DB"));
        gradient.addColor(am4core.color(theme === "dark" ? "#D1D5DB" : "#9CA3AF"));
        return gradient;
      });

      chart.legend = new am4charts.Legend();
      chart.legend.position = "top";
      chart.legend.labels.template.fill = am4core.color(theme === "dark" ? "#D1D5DB" : "#4B5563");
      chart.legend.labels.template.fontSize = 12;
    }

    chartInstance.current = chart;

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, [chartType, chartData, theme]);

  return (
    <Card className={`${
      theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
    } shadow-md hover:shadow-lg rounded-lg overflow-hidden transition-all duration-300 animate-fadeIn h-[340px]`}>
      <CardHeader className="flex flex-row items-center justify-between px-4 py-3">
        <CardTitle className={`text-base font-medium ${
          theme === "dark" ? "text-blue-300" : "text-blue-700"
        }`}>{title}</CardTitle>
        {selectOptions && (
          <Select defaultValue={selectOptions[0]}>
            <SelectTrigger className={`w-[130px] h-8 ${
              theme === "dark"
                ? "bg-gray-700 text-gray-200 border-gray-600"
                : "bg-gray-50 text-gray-900 border-gray-300"
            } rounded-md text-xs font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}>
              <SelectValue placeholder={selectOptions[0]} />
            </SelectTrigger>
            <SelectContent className={`${
              theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-200"
            } rounded-md shadow-lg z-50 max-h-60 overflow-y-auto animate-slideDown`}>
              {selectOptions.map((option, index) => (
                <SelectItem
                  key={index}
                  value={option}
                  className={`${
                    theme === "dark" ? "hover:bg-gray-600 focus:bg-gray-600" : "hover:bg-gray-100 focus:bg-gray-100"
                  } text-xs py-1.5 px-3 cursor-pointer transition-colors duration-150`}
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <div className="h-[270px] w-full overflow-hidden" ref={chartRef} />
      </CardContent>
    </Card>
  );
}