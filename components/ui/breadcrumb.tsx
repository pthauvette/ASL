import { ChevronRight, Home } from "lucide-react";
import { motion } from "motion/react";
import type { BreadcrumbItem } from "../../utils/form-types";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb = ({ items, className = "" }: BreadcrumbProps) => {
  return (
    <motion.nav
      className={`flex items-center space-x-2 text-sm ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isFirst = index === 0;

        return (
          <motion.div
            key={index}
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {/* Separator (except for first item) */}
            {!isFirst && (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}

            {/* Breadcrumb Item */}
            {item.onClick ? (
              <motion.button
                onClick={item.onClick}
                className={`flex items-center space-x-1 transition-colors ${
                  isLast 
                    ? "text-blue-900 font-medium cursor-default" 
                    : "text-gray-600 hover:text-blue-900"
                }`}
                whileHover={!isLast ? { scale: 1.05 } : {}}
                whileTap={!isLast ? { scale: 0.95 } : {}}
              >
                {isFirst && <Home className="w-4 h-4" />}
                <span>{item.label}</span>
              </motion.button>
            ) : (
              <span
                className={`flex items-center space-x-1 ${
                  isLast 
                    ? "text-blue-900 font-medium" 
                    : "text-gray-400"
                }`}
              >
                {isFirst && <Home className="w-4 h-4" />}
                <span>{item.label}</span>
              </span>
            )}
          </motion.div>
        );
      })}
    </motion.nav>
  );
};