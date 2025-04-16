
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
  const { isMobile } = useSidebar();
  const { theme } = useTheme();
  const [isAlliedUnitsOpen, setIsAlliedUnitsOpen] = useState(false);

  const navItems = [
    { icon: Home, label: "ASD", active: true },
    { icon: Users, label: "NDV" },
    {
      icon: Building,
      label: "Allied Units",
      subItems: [
        { label: "OWC" },
        { label: "AOB" },
        { label: "NRW" },
        { label: "SPV" }
      ]
    },
    { icon: Building, label: "Company" },
    { icon: Calendar, label: "Calendar" },
    { icon: Briefcase, label: "Leave" },
    { icon: Star, label: "Review" },
    { icon: FileText, label: "Report" },
    { icon: FileCog, label: "Manage" },
    { icon: SlidersHorizontal, label: "Settings" }
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
      } transition-all duration-300 shadow-lg overflow-hidden md:mt-10`}
    >
      <SidebarHeader>
        <div className="flex items-center p-4 md:mt-8">
          <motion.img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&crop=faces&w=60&h=60"
            alt="User"
            className={`w-14 h-14 rounded-full border-2 ${
              theme === "dark" ? "border-blue-500" : "border-blue-400"
            } mr-3 shadow-md`}
            loading="lazy"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="group-data-[collapsible=icon]:hidden">
            <motion.p
              className={`font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Kavin Hansen
            </motion.p>
            <motion.p
              className="text-sm text-muted-foreground"
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
        <SidebarMenu className="mt-4">
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
                        isActive={item.active}
                        tooltip={item.label}
                        className={`${
                          item.active
                            ? theme === "dark"
                              ? "bg-blue-700 text-white"
                              : "bg-blue-100 text-blue-800"
                            : theme === "dark"
                            ? "text-gray-300 hover:bg-gray-800"
                            : "text-gray-700 hover:bg-gray-100"
                        } rounded-lg transition-all duration-200 py-3 px-4 flex justify-between items-center w-full`}
                        onClick={() => setIsAlliedUnitsOpen(!isAlliedUnitsOpen)}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon
                            className={`h-5 w-5 ${
                              item.active
                                ? "text-blue-400"
                                : theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          />
                          <span className="font-medium">{item.label}</span>
                          {isAlliedUnitsOpen ? (
                            <ChevronDown className="h-4 w-4 ml-auto" />
                          ) : (
                            <ChevronRight className="h-4 w-4 ml-auto" />
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
                            <SidebarMenuSub className="pl-8">
                              {item.subItems.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.label}>
                                  <SidebarMenuSubButton
                                    asChild
                                    className={`${
                                      theme === "dark"
                                        ? "text-gray-400 hover:bg-gray-700"
                                        : "text-gray-600 hover:bg-gray-50"
                                    } rounded-md transition-all duration-200 py-2 px-3 text-sm w-full`}
                                  >
                                    <a href="#" className="flex items-center gap-2">
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
                      isActive={item.active}
                      tooltip={item.label}
                      className={`${
                        item.active
                          ? theme === "dark"
                            ? "bg-blue-700 text-white"
                            : "bg-blue-100 text-blue-800"
                          : theme === "dark"
                          ? "text-gray-300 hover:bg-gray-800"
                          : "text-gray-700 hover:bg-gray-100"
                      } rounded-lg transition-all duration-200 py-3 px-4 w-full`}
                    >
                      <a href="#" className="flex items-center gap-3">
                        <item.icon
                          className={`h-5 w-5 ${
                            item.active
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
        <div className="p-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="outline"
              className={`w-full flex items-center justify-center gap-2 ${
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