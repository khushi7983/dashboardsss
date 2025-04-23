import { useLocation } from 'react-router-dom';
import { Building, Calendar, Cog, FileCog, FileText, Home, Briefcase, SlidersHorizontal, Star, Users, ChevronDown, ChevronRight } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarProvider,
  useSidebar
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";

export default function DashboardSidebar() {
  const { isMobile, state } = useSidebar();
  const { theme } = useTheme();
  const [isAlliedUnitsOpen, setIsAlliedUnitsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "ASD", route: "/" },
    { icon: Users, label: "NDV", route: "/nvd_dashboard" },
    {
      icon: Building,
      label: "Allied Units",
      subItems: [
        { label: "OWC", route: "/owc" },
        { label: "AOB", route: "/aob" },
        { label: "NRW", route: "/nrw" },
        { label: "SPV", route: "/spv" }
      ]
    },
    { icon: Building, label: "Hierarchy", route: "/hierarchy" },
    // { icon: Building, label: "Company", route: "/company" },
    // { icon: Calendar, label: "Calendar", route: "/calendar" },
    // { icon: Briefcase, label: "Leave", route: "/leave" },
    // { icon: Star, label: "Review", route: "/review" },
    // { icon: FileText, label: "Report", route: "/report" },
    // { icon: FileCog, label: "Manage", route: "/manage" },
    // { icon: SlidersHorizontal, label: "Settings", route: "/settings" }
  ];

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const subMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  return (
    <Sidebar
      className={`${
        theme === "dark"
          ? "bg-gray-900 border-r border-gray-800"
          : "bg-white border-r border-gray-200"
      } transition-all duration-300 shadow-lg overflow-hidden ${
        isMobile && state === "collapsed" ? "w-0" : isMobile ? "w-full" : "w-64"
      } md:mt-10`}
    >
      <SidebarHeader>
        <div className="flex items-center p-3 sm:p-4 md:mt-8">
          <motion.img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&crop=faces&w=60&h=60"
            alt="User"
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 ${
              theme === "dark" ? "border-blue-500" : "border-blue-400"
            } mr-2 sm:mr-3 shadow-md`}
            loading="lazy"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="group-data-[collapsible=icon]:hidden">
            <motion.p
              className={`font-semibold text-sm sm:text-base ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Kavin Hansen
            </motion.p>
            <motion.p
              className="text-xs sm:text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Admin
            </motion.p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="overflow-y-auto scrollbar-hide">
        <SidebarMenu className="mt-2 sm:mt-4">
          <AnimatePresence>
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                custom={index}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <SidebarMenuItem>
                  {item.subItems ? (
                    <>
                      <SidebarMenuButton
                        asChild
                        isActive={item.subItems.some((sub) => sub.route === location.pathname)}
                        tooltip={item.label}
                        className={`${
                          item.subItems.some((sub) => sub.route === location.pathname)
                            ? theme === "dark"
                              ? "bg-blue-700 text-white"
                              : "bg-blue-100 text-blue-800"
                            : theme === "dark"
                            ? "text-gray-300 hover:bg-gray-800"
                            : "text-gray-700 hover:bg-gray-100"
                        } rounded-lg transition-all duration-200 py-2 px-3 sm:py-3 sm:px-4 flex justify-between items-center w-full text-sm sm:text-base`}
                        onClick={() => setIsAlliedUnitsOpen(!isAlliedUnitsOpen)}
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <item.icon
                            className={`h-4 w-4 sm:h-5 sm:w-5 ${
                              item.subItems.some((sub) => sub.route === location.pathname)
                                ? "text-blue-400"
                                : theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          />
                          <span className="font-medium">{item.label}</span>
                          {isAlliedUnitsOpen ? (
                            <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 ml-auto" />
                          ) : (
                            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-auto" />
                          )}
                        </div>
                      </SidebarMenuButton>
                      <AnimatePresence>
                        {isAlliedUnitsOpen && (
                          <motion.div
                            variants={subMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                          >
                            <SidebarMenuSub className="pl-6 sm:pl-8">
                              {item.subItems.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.label}>
                                  <SidebarMenuSubButton
                                    asChild
                                    className={`${
                                      subItem.route === location.pathname
                                        ? theme === "dark"
                                          ? "bg-blue-700 text-white"
                                          : "bg-blue-100 text-blue-800"
                                        : theme === "dark"
                                        ? "text-gray-400 hover:bg-gray-700"
                                        : "text-gray-600 hover:bg-gray-50"
                                    } rounded-md transition-all duration-200 py-2 px-3 text-xs sm:text-sm w-full`}
                                  >
                                    <a href={subItem.route} className="flex items-center gap-2">
                                      <span>{subItem.label}</span>
                                    </a>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      isActive={item.route === location.pathname}
                      tooltip={item.label}
                      className={`${
                        item.route === location.pathname
                          ? theme === "dark"
                            ? "bg-blue-700 text-white"
                            : "bg-blue-100 text-blue-800"
                          : theme === "dark"
                          ? "text-gray-300 hover:bg-gray-800"
                          : "text-gray-700 hover:bg-gray-100"
                      } rounded-lg transition-all duration-200 py-2 px-3 sm:py-3 sm:px-4 w-full text-sm sm:text-base`}
                    >
                      <a href={item.route} className="flex items-center gap-2 sm:gap-3">
                        <item.icon
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${
                            item.route === location.pathname
                              ? "text-blue-400"
                              : theme === "dark"
                              ? "text-gray-400"
                              : "text-gray-500"
                          }`}
                        />
                        <span className="font-medium">{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-3 sm:p-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="outline"
              className={`w-full flex items-center justify-center gap-2 text-sm sm:text-base ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
              } rounded-lg py-2 transition-all duration-200`}
              onClick={() => {}}
            >
              <Cog className="h-4 w-4" />
              <span className="group-data-[collapsible=icon]:hidden font-medium">
                Settings
              </span>
            </Button>
          </motion.div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export function SidebarWrapper({ children }) {
  return (
    <SidebarProvider>
      {children}
    </SidebarProvider>
  );
}