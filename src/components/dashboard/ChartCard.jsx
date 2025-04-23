import { useEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "./ThemeProvider";

// Apply animated theme for smooth transitions
am4core.useTheme(am4themes_animated);

// Enhanced color palettes for better distinction in both themes
const colorPalettes = {
  dark: [
    { colorStart: "#FF5252", colorEnd: "#FF1744" }, // Red
    { colorStart: "#448AFF", colorEnd: "#2979FF" }, // Blue
    { colorStart: "#FFAB40", colorEnd: "#FF9100" }, // Orange
    { colorStart: "#69F0AE", colorEnd: "#00E676" }, // Green
    { colorStart: "#B388FF", colorEnd: "#7C4DFF" }, // Purple
    { colorStart: "#FF80AB", colorEnd: "#FF4081" }, // Pink
    { colorStart: "#84FFFF", colorEnd: "#18FFFF" }, // Cyan
    { colorStart: "#FFFF00", colorEnd: "#FFEA00" }, // Yellow
    { colorStart: "#EA80FC", colorEnd: "#D500F9" }, // Magenta
    { colorStart: "#80D8FF", colorEnd: "#00B0FF" }, // Light Blue
    { colorStart: "#A7FFEB", colorEnd: "#64FFDA" }, // Teal
    { colorStart: "#CCFF90", colorEnd: "#B2FF59" }  // Light Green
  ],
  light: [
    { colorStart: "#F44336", colorEnd: "#D32F2F" }, // Light mode Red
    { colorStart: "#2196F3", colorEnd: "#1976D2" }, // Light mode Blue
    { colorStart: "#FF9800", colorEnd: "#F57C00" }, // Light mode Orange
    { colorStart: "#4CAF50", colorEnd: "#388E3C" }, // Light mode Green
    { colorStart: "#673AB7", colorEnd: "#512DA8" }, // Light mode Purple
    { colorStart: "#E91E63", colorEnd: "#C2185B" }, // Light mode Pink
    { colorStart: "#00BCD4", colorEnd: "#0097A7" }, // Light mode Cyan
    { colorStart: "#FFEB3B", colorEnd: "#FBC02D" }, // Light mode Yellow
    { colorStart: "#9C27B0", colorEnd: "#7B1FA2" }, // Light mode Magenta
    { colorStart: "#03A9F4", colorEnd: "#0288D1" }, // Light mode Light Blue
    { colorStart: "#009688", colorEnd: "#00796B" }, // Light mode Teal
    { colorStart: "#8BC34A", colorEnd: "#689F38" }  // Light mode Light Green
  ]
};

// Function to generate distinct colors
function getDistinctColors(count, theme) {
  const palette = theme === "dark" ? colorPalettes.dark : colorPalettes.light;
  const colors = [];
  
  // If we need more colors than in the palette, we'll need to generate some
  for (let i = 0; i < count; i++) {
    if (i < palette.length) {
      colors.push(palette[i]);
    } else {
      // Generate a unique color by mixing palette colors
      const idx1 = i % palette.length;
      const idx2 = (i + 3) % palette.length;
      
      const color1 = am4core.color(palette[idx1].colorStart);
      const color2 = am4core.color(palette[idx2].colorEnd);
      
      // Create a new color by mixing the two existing colors
      const mixedColorStart = am4core.color(color1.rgb);
      mixedColorStart.lighten(0.2);
      
      const mixedColorEnd = am4core.color(color2.rgb);
      mixedColorEnd.brighten(0.2);
      
      colors.push({
        colorStart: mixedColorStart.hex,
        colorEnd: mixedColorEnd.hex
      });
    }
  }
  
  return colors;
}

export default function ChartCard({ title, chartType, selectOptions, chartData, height = 300 }) {
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
      chart.depth = 35;
      chart.angle = 30;
      chart.innerRadius = am4core.percent(25);
      // Set chart height dynamically based on the height prop
      chartRef.current.style.height = `${height}px`;
    } else if (chartType === "bar") {
      chart = am4core.create(chartRef.current, am4charts.XYChart3D);
      chart.padding(10, 10, 10, 10);
      // Set chart height to match pie chart height
      chartRef.current.style.height = `${height}px`;
    } else if (chartType === "clustered-bar") {
      chart = am4core.create(chartRef.current, am4charts.XYChart3D);
      chartRef.current.style.height = `${height}px`;
      chart.padding(10, 10, 10, 10);
    } else {
      console.error("Unsupported chart type:", chartType);
      return;
    }

    // Set theme-aware background
    chart.background.fill = am4core.color(theme === "dark" ? "#1F2937" : "#F9FAFB");

    // Configure chart
    if (chartType === "pie") {
      // Get distinct colors for each data point
      const distinctColors = getDistinctColors(chartData.length, theme);
      
      // Assign colors to data points
      const dataWithColors = chartData.map((item, index) => {
        return { 
          ...item, 
          colorStart: distinctColors[index].colorStart, 
          colorEnd: distinctColors[index].colorEnd,
          // Add an index property to ensure uniqueness
          index: index
        };
      });
      
      chart.data = dataWithColors;

      // Create enhanced series
      let series = chart.series.push(new am4charts.PieSeries3D());
      series.dataFields.value = "sanction";
      series.dataFields.category = "category";
      
      // FIX: Re-enable labels but position them for better readability
      series.alignLabels = false; // Don't try to align labels in straight lines
      series.labels.template.radius = 10; // Distance from slice to label
      series.labels.template.fill = am4core.color(theme === "dark" ? "#FFFFFF" : "#333333");
      series.labels.template.relativeRotation = 0; // Keep labels horizontal
      series.labels.template.text = "{category}: {value.percent.formatNumber('#.0')}%";
      series.labels.template.fontSize = 11;
      series.labels.template.fontWeight = "500";
      series.labels.template.maxWidth = 80;
      series.labels.template.wrap = true; // Enable text wrapping for longer labels
      series.labels.template.background.fill = am4core.color(theme === "dark" ? "rgba(31,41,55,0.7)" : "rgba(255,255,255,0.7)");
      series.labels.template.padding(5, 7, 5, 7);
      series.labels.template.background.cornerRadius = 3;
      series.labels.template.disabled = true;
  series.ticks.template.disabled = true;
      
      // Add line connecting the slice to its label
      series.ticks.template.strokeOpacity = 0.6;
      series.ticks.template.stroke = am4core.color(theme === "dark" ? "#D1D5DB" : "#6B7280");
      series.ticks.template.strokeWidth = 1;
      series.ticks.template.length = 10;
      
      // Enhanced slices styling
      series.slices.template.cornerRadius = 8;
      series.slices.template.innerCornerRadius = 5;
      
      // FIXED: Remove the black border of pie chart slices
      series.slices.template.stroke = am4core.color("rgba(0,0,0,0)");
      series.slices.template.strokeWidth = 0;
      series.slices.template.strokeOpacity = 0;
      
      // Add hover state for interactivity
      let hoverState = series.slices.template.states.create("hover");
      hoverState.properties.scale = 1.1;
      hoverState.properties.fillOpacity = 0.9;

      // Enable animation with better timing
      series.hiddenState.properties.opacity = 0;
      series.slices.template.showOnInit = true;
      series.slices.template.animationDuration = 800;
      series.slices.template.hiddenState.transitionDuration = 800;

      // Use distinct color gradients for each slice
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

      // Enhanced tooltip with better styling
      series.slices.template.tooltipText = "[bold]{category}[/]\n[font-size:14px]Sanction: {sanction}\nBorne: {borne}[/]";
      let tooltip = series.slices.template.tooltip || new am4core.Tooltip();
      series.slices.template.tooltip = tooltip;
      tooltip.getFillFromObject = false;
      tooltip.background.fill = am4core.color(theme === "dark" ? "rgba(31, 41, 55, 0.95)" : "rgba(255, 255, 255, 0.95)");
      tooltip.background.stroke = am4core.color(theme === "dark" ? "#4B5563" : "#D1D5DB");
      tooltip.background.strokeWidth = 2;
      tooltip.background.cornerRadius = 8;
      tooltip.label.fill = am4core.color(theme === "dark" ? "#FFFFFF" : "#1F2937");
      tooltip.padding();
      tooltip.pointerOrientation = "vertical";
      tooltip.label.fontSize = 13;
      tooltip.label.fontWeight = "500";
      tooltip.label.textAlign = "left";
      tooltip.label.lineHeight = 1.5;
      tooltip.boxShadow = new am4core.DropShadowFilter();
      tooltip.boxShadow.dx = 3;
      tooltip.boxShadow.dy = 3;
      tooltip.boxShadow.blur = 8;
      tooltip.boxShadow.opacity = 0.2;
      tooltip.zIndex = 1000;
      tooltip.animationDuration = 400;
      
      // Enhanced legend with better spacing and layout
      chart.legend = new am4charts.Legend();
      chart.legend.position = "bottom";
      chart.legend.contentAlign = "center";
      chart.legend.layout = "grid"; // Change to grid layout for better organization
      chart.legend.maxHeight = undefined; // Don't restrict height
      chart.legend.maxWidth = undefined; // Don't restrict width
      
      // Fix truncated labels in legend
      chart.legend.labels.template.truncate = false;
      chart.legend.labels.template.wrap = true;
      chart.legend.labels.template.maxWidth = 120;
      chart.legend.itemContainers.template.paddingTop = 5;
      chart.legend.itemContainers.template.paddingBottom = 5;
      chart.legend.useDefaultMarker = false;
      
      // Custom legend markers
      let marker = chart.legend.markers.template.children.getIndex(0);
      if (marker) {
        marker.cornerRadius(12, 12, 12, 12);
        marker.width = 16;
        marker.height = 16;
        marker.stroke = am4core.color(theme === "dark" ? "#4B5563" : "#D1D5DB");
        marker.strokeWidth = 1;
      }
      
      // Improve legend labels styling
      chart.legend.labels.template.fill = am4core.color(theme === "dark" ? "#FFFFFF" : "#333333");
      chart.legend.labels.template.fontSize = 12;
      chart.legend.valueLabels.template.fontSize = 11;
      chart.legend.valueLabels.template.fill = am4core.color(theme === "dark" ? "#D1D5DB" : "#4B5563");
      
      // Add more space between legend items
      chart.legend.itemContainers.template.paddingLeft = 5;
      chart.legend.itemContainers.template.paddingRight = 10;
      chart.legend.itemContainers.template.marginBottom = 3;
      
      // Add value to legend labels
      chart.legend.valueLabels.template.text = "{value.percent.formatNumber('#.#')}%";
      
      // Create vertical layout space for chart and legend
      chart.paddingBottom = 10;
      chart.paddingTop = 10;
      chart.paddingLeft = 10;
      chart.paddingRight = 10;
      
    } else if (chartType === "bar") {
      chart.data = chartData;

      // Enhanced X axis
      let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      xAxis.dataFields.category = "month";
      xAxis.renderer.grid.template.location = 0;
      xAxis.renderer.labels.template.fill = am4core.color(theme === "dark" ? "#FFFFFF" : "#333333");
      xAxis.renderer.labels.template.fontWeight = "bold";
      xAxis.renderer.grid.template.stroke = am4core.color(theme === "dark" ? "#4B5563" : "#D1D5DB");
      xAxis.renderer.labels.template.fontSize = 12;
      xAxis.renderer.cellStartLocation = 0.1;
      xAxis.renderer.cellEndLocation = 0.9;
      xAxis.title.text = "Months";
      xAxis.title.fill = am4core.color(theme === "dark" ? "#D1D5DB" : "#4B5563");
      xAxis.title.fontSize = 14;
      xAxis.title.fontWeight = "bold";
      xAxis.title.marginTop = 10;

      // Enhanced Y axis
      let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
      yAxis.renderer.labels.template.fill = am4core.color(theme === "dark" ? "#FFFFFF" : "#333333");
      yAxis.renderer.grid.template.stroke = am4core.color(theme === "dark" ? "#4B5563" : "#D1D5DB");
      yAxis.renderer.grid.template.strokeOpacity = 0.3;
      yAxis.renderer.grid.template.strokeWidth = 1;
      yAxis.renderer.labels.template.fontSize = 12;
      yAxis.min = 0;
      yAxis.title.text = "Values";
      yAxis.title.fill = am4core.color(theme === "dark" ? "#D1D5DB" : "#4B5563");
      yAxis.title.fontSize = 14;
      yAxis.title.fontWeight = "bold";
      yAxis.title.marginRight = 10;

      // Enhanced first series with better visuals for both themes
      let series1 = chart.series.push(new am4charts.ColumnSeries3D());
      series1.dataFields.valueY = "I";
      series1.dataFields.categoryX = "month";
      series1.name = "Internal";
      series1.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}[/]";
      series1.columns.template.fillOpacity = 0.9;
      series1.stacked = true;
      series1.columns.template.showOnInit = true;
      series1.columns.template.width = am4core.percent(70);
      series1.columns.template.animationDuration = 600;
      
      // Enhanced gradient for better visibility in both themes
      series1.columns.template.adapter.add("fill", () => {
        let gradient = new am4core.LinearGradient();
        gradient.rotation = 90;
        if (theme === "dark") {
          gradient.addColor(am4core.color("#60A5FA"));
          gradient.addColor(am4core.color("#2563EB"));
        } else {
          gradient.addColor(am4core.color("#3B82F6"));
          gradient.addColor(am4core.color("#1D4ED8"));
        }
        return gradient;
      });
      
      // Add stroke for better definition
      series1.columns.template.stroke = am4core.color(theme === "dark" ? "#1F2937" : "#FFFFFF");
      series1.columns.template.strokeWidth = 1;
      
      // Add hover state
      let hoverState1 = series1.columns.template.states.create("hover");
      hoverState1.properties.fillOpacity = 1;
      hoverState1.properties.scale = 1.1;

      // Enhanced second series with better visuals for both themes
      let series2 = chart.series.push(new am4charts.ColumnSeries3D());
      series2.dataFields.valueY = "M";
      series2.dataFields.categoryX = "month";
      series2.name = "Management";
      series2.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}[/]";
      series2.columns.template.fillOpacity = 0.9;
      series2.stacked = true;
      series2.columns.template.width = am4core.percent(70);
      series2.columns.template.showOnInit = true;
      series2.columns.template.animationDuration = 600;
      
      // Enhanced gradient for better visibility in both themes
      series2.columns.template.adapter.add("fill", () => {
        let gradient = new am4core.LinearGradient();
        gradient.rotation = 90;
        if (theme === "dark") {
          gradient.addColor(am4core.color("#F3F4F6"));
          gradient.addColor(am4core.color("#D1D5DB"));
        } else {
          gradient.addColor(am4core.color("#9CA3AF"));
          gradient.addColor(am4core.color("#6B7280"));
        }
        return gradient;
      });
      
      // Add stroke for better definition
      series2.columns.template.stroke = am4core.color(theme === "dark" ? "#1F2937" : "#FFFFFF");
      series2.columns.template.strokeWidth = 1;
      
      // Add hover state
      let hoverState2 = series2.columns.template.states.create("hover");
      hoverState2.properties.fillOpacity = 1;
      hoverState2.properties.scale = 1.1;

      // Enhanced legend with better styling
      chart.legend = new am4charts.Legend();
      chart.legend.position = "top";
      chart.legend.contentAlign = "center";
      chart.legend.paddingTop = 15;
      chart.legend.paddingBottom = 15;
      chart.legend.labels.template.fill = am4core.color(theme === "dark" ? "#FFFFFF" : "#333333");
      chart.legend.labels.template.fontSize = 13;
      chart.legend.valueLabels.template.fontSize = 13;
      chart.legend.markers.template.width = 15;
      chart.legend.markers.template.height = 15;
      
      // Add chart title
      let title = chart.titles.create();
      title.text = "Monthly Performance Metrics";
      title.fontSize = 18;
      title.fontWeight = "bold";
      title.align = "center";
      title.marginBottom = 20;
      title.fill = am4core.color(theme === "dark" ? "#FFFFFF" : "#333333");
      
      // Add cursor for better interactivity
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineX.strokeWidth = 0;
      chart.cursor.lineY.strokeWidth = 0;
      chart.cursor.behavior = "zoomXY";
    }
    else if (chartType === "clustered-bar") {
      chart = am4core.create(chartRef.current, am4charts.XYChart3D);
      chart.padding(10, 10, 10, 10);
      chartRef.current.style.height = `${height}px`;
    
      chart.data = chartData;
    
      let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      xAxis.dataFields.category = "category";
      xAxis.renderer.grid.template.location = 0;
      xAxis.renderer.labels.template.fill = am4core.color(theme === "dark" ? "#FFFFFF" : "#333333");
      xAxis.renderer.labels.template.fontWeight = "bold";
      // Improved axis colors for light theme
      xAxis.renderer.grid.template.stroke = am4core.color(theme === "dark" ? "#4B5563" : "#D1D5DB");
      xAxis.renderer.labels.template.fontSize = 12;
      xAxis.renderer.cellStartLocation = 0.1;
      xAxis.renderer.cellEndLocation = 0.9;
      xAxis.title.text = "Categories";
      xAxis.title.fill = am4core.color(theme === "dark" ? "#D1D5DB" : "#6B7280");
    
      let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
      yAxis.min = 0;
      yAxis.renderer.labels.template.fill = am4core.color(theme === "dark" ? "#FFFFFF" : "#333333");
      // Improved axis colors for light theme
      yAxis.renderer.grid.template.stroke = am4core.color(theme === "dark" ? "#4B5563" : "#D1D5DB");
      yAxis.renderer.grid.template.strokeOpacity = 0.3;
      yAxis.title.text = "Values";
      yAxis.title.fill = am4core.color(theme === "dark" ? "#D1D5DB" : "#6B7280");
    
      // Create multiple series based on keys
      const keys = Object.keys(chartData[0]).filter(k => k !== "category");
      const colors = getDistinctColors(keys.length, theme);
    
      keys.forEach((key, index) => {
        const series = chart.series.push(new am4charts.ColumnSeries3D());
        series.dataFields.valueY = key;
        series.dataFields.categoryX = "category";
        series.name = key;
        series.columns.template.tooltipText = `[bold]{name}[/]\n{categoryX}: {valueY}`;
        series.columns.template.fillOpacity = 0.9;
        series.columns.template.width = am4core.percent(70);
        series.columns.template.showOnInit = true;
        series.columns.template.animationDuration = 600;
    
        // Apply gradient
        const gradient = new am4core.LinearGradient();
        gradient.rotation = 90;
        gradient.addColor(am4core.color(colors[index].colorStart));
        gradient.addColor(am4core.color(colors[index].colorEnd));
        series.columns.template.fill = gradient;
        series.columns.template.stroke = am4core.color(theme === "dark" ? "#1F2937" : "#FFFFFF");
        series.columns.template.strokeWidth = 1;
    
        let hoverState = series.columns.template.states.create("hover");
        hoverState.properties.fillOpacity = 1;
        hoverState.properties.scale = 1.05;
      });
    
      // Enhanced legend with better styling
      chart.legend = new am4charts.Legend();
      chart.legend.position = "top";
      chart.legend.contentAlign = "center";
      chart.legend.paddingTop = 15;
      chart.legend.paddingBottom = 15;
      chart.legend.labels.template.fill = am4core.color(theme === "dark" ? "#FFFFFF" : "#333333");
      chart.legend.labels.template.fontSize = 13;
      chart.legend.useDefaultMarker = true;
      chart.legend.markers.template.width = 15;
      chart.legend.markers.template.height = 15;
    }
    
    chartInstance.current = chart;

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, [chartType, chartData, theme, height]);

  return (
    <Card className={`${
      theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
    } shadow-lg hover:shadow-xl rounded-lg overflow-hidden transition-all duration-300`}>
      <CardHeader className={`flex flex-row items-center justify-between border-b border-opacity-50 ${
        theme === "dark" ? "border-gray-700" : "border-gray-200"
      }`}>
        <CardTitle className={`text-xl font-semibold ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}>{title}</CardTitle>
        {selectOptions && (
          <Select defaultValue={selectOptions[0]}>
            <SelectTrigger className={`w-[150px] ${
              theme === "dark"
                ? "bg-gray-700 text-gray-200 border-gray-600"
                : "bg-gray-50 text-gray-800 border-gray-300"
            } rounded-md text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}>
              <SelectValue placeholder={selectOptions[0]} />
            </SelectTrigger>
            <SelectContent className={`${
              theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-800 border-gray-300"
            } rounded-md shadow-lg z-50`}>
              {selectOptions.map((option, index) => (
                <SelectItem
                  key={index}
                  value={option}
                  className={`${
                    theme === "dark" ? "hover:bg-gray-600 focus:bg-gray-600" : "hover:bg-gray-100 focus:bg-gray-100"
                  } text-sm py-2 cursor-pointer transition-colors duration-150`}
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent className={`px-5 py-5 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <div 
          className="w-full overflow-visible rounded-md" 
          style={{ position: 'relative', zIndex: 10, height: `${height}px` }} 
          ref={chartRef} 
        />
      </CardContent>
    </Card>
  );
}