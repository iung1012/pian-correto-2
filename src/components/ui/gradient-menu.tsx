"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Info, 
  Package, 
  Users, 
  BookOpen, 
  Phone,
  ChevronDown,
  Heart,
  Star,
  Award,
  Crown,
  Gem
} from "lucide-react";

interface MenuItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  submenu?: MenuItem[];
  gradient?: string;
}

const menuItems: MenuItem[] = [
  {
    label: "Home",
    href: "/",
    icon: <Home className="w-4 h-4" />,
    gradient: "from-blue-500 to-blue-600"
  },
  {
    label: "Quem Somos",
    href: "/about",
    icon: <Info className="w-4 h-4" />,
    gradient: "from-green-500 to-green-600"
  },
  {
    label: "Produtos",
    icon: <Package className="w-4 h-4" />,
    gradient: "from-orange-500 to-orange-600",
    submenu: [
      {
        label: "Linha Standard",
        href: "/products?category=Standard",
        icon: <Star className="w-4 h-4" />,
        gradient: "from-blue-400 to-blue-500"
      },
      {
        label: "Linha Premium",
        href: "/products?category=Premium",
        icon: <Award className="w-4 h-4" />,
        gradient: "from-orange-400 to-orange-500"
      },
      {
        label: "Premium Especial",
        href: "/products?category=Premium%20Especial",
        icon: <Crown className="w-4 h-4" />,
        gradient: "from-purple-400 to-purple-500"
      },
      {
        label: "Super Premium",
        href: "/products?category=Super%20Premium",
        icon: <Gem className="w-4 h-4" />,
        gradient: "from-yellow-400 to-yellow-500"
      }
    ]
  },
  {
    label: "Distribuidores",
    href: "/distributors",
    icon: <Users className="w-4 h-4" />,
    gradient: "from-purple-500 to-purple-600"
  },
  {
    label: "Blog",
    href: "/blog",
    icon: <BookOpen className="w-4 h-4" />,
    gradient: "from-pink-500 to-pink-600"
  },
  {
    label: "Contato",
    href: "/contact",
    icon: <Phone className="w-4 h-4" />,
    gradient: "from-red-500 to-red-600"
  }
];

const GradientMenu: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleItemClick = (item: MenuItem) => {
    if (item.submenu) {
      setActiveItem(activeItem === item.label ? null : item.label);
    }
  };

  const MenuItemComponent: React.FC<{ 
    item: MenuItem; 
    isSubmenu?: boolean;
    parentGradient?: string;
  }> = ({ item, isSubmenu = false, parentGradient }) => {
    const isActive = activeItem === item.label;
    const isHovered = hoveredItem === item.label;
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    
    const gradientClass = item.gradient || parentGradient || "from-gray-500 to-gray-600";

    const content = (
      <motion.div
        className={cn(
          "relative group cursor-pointer rounded-xl transition-all duration-300",
          isSubmenu 
            ? "p-3 hover:bg-white/10" 
            : "p-4 hover:shadow-lg"
        )}
        onMouseEnter={() => setHoveredItem(item.label)}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => handleItemClick(item)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Background gradient */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
        
        {/* Active state background */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-gray-100"
            layoutId="activeBackground"
          />
        )}

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Icon with gradient */}
            <motion.div
              className={cn(
                "p-2 rounded-lg transition-all duration-300",
                isHovered || isActive
                  ? "bg-black text-white shadow-lg"
                  : "bg-gray-100 text-gray-600"
              )}
              animate={{
                rotate: isHovered ? 5 : 0,
                scale: isHovered ? 1.1 : 1
              }}
            >
              {item.icon}
            </motion.div>

            {/* Label */}
            <motion.span
              className={cn(
                "font-bold transition-colors duration-300 font-barlow-condensed",
                isSubmenu ? "text-sm" : "text-base",
                isHovered || isActive ? "text-black" : "text-gray-700"
              )}
              animate={{
                x: isHovered ? 2 : 0
              }}
            >
              {item.label}
            </motion.span>
          </div>

          {/* Submenu indicator */}
          {hasSubmenu && (
            <motion.div
              animate={{ rotate: isActive ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </motion.div>
          )}
        </div>

        {/* Hover effect line */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 rounded-full bg-yellow-500"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? "100%" : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    );

    if (item.href && !hasSubmenu) {
      return <Link to={item.href}>{content}</Link>;
    }

    return content;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-2 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 font-barlow-condensed">PIAN ALIMENTOS</h3>
              <p className="text-xs text-gray-500 font-barlow-condensed">A gente entende esse amor</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-2 space-y-1">
          {menuItems.map((item, index) => (
            <div key={item.label}>
              <MenuItemComponent item={item} />
              
              {/* Submenu */}
              <AnimatePresence>
                {item.submenu && activeItem === item.label && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-4"
                  >
                    {item.submenu.map((subItem) => (
                      <Link key={subItem.label} to={subItem.href || "#"}>
                        <MenuItemComponent 
                          item={subItem} 
                          isSubmenu 
                          parentGradient={item.gradient}
                        />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2 font-montserrat">
              Mais de 3 décadas de tradição em nutrição animal
            </p>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500"></div>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-500"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GradientMenu;