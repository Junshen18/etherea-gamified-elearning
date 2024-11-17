'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Home, 
  BookOpen,  
  Rocket, 
  User,
  type LucideIcon
} from 'lucide-react';

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Home', href: '/authenticated-pages/home' },
  { icon: BookOpen, label: 'Learn', href: '/authenticated-pages/learn' },
  { icon: Rocket, label: 'Bootcamp', href: '/authenticated-pages/bootcamp' },
  { icon: User, label: 'Profile', href: '/authenticated-pages/profile' }
];

const BottomNav = () => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className=" relative left-0 right-0 z-50 px-4 py-3 max-w-[428px] items-center justify-center ">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" />
      
      {/* Border frame */}
      <div className="relative border border-slate-700 bg-slate-900/50 rounded-2xl p-1">
        {/* Corner accents */}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-500" />
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-500" />
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-500" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-500" />

        {/* Navigation items */}
        <nav className="relative flex justify-around items-center px-4 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const isHovered = hoveredItem === item.label;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="relative group"
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex flex-col items-center">
                  <div className="relative p-2">
                    {/* Glow effect */}
                    {(isActive || isHovered) && (
                      <motion.div
                        layoutId="glow"
                        className="absolute inset-0 bg-cyan-500/20 rounded-xl"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30
                        }}
                      />
                    )}
                    
                    {/* Icon */}
                    <item.icon
                      className={`w-6 h-6 transition-colors duration-200 ${
                        isActive ? 'text-cyan-500' : 'text-slate-400 group-hover:text-cyan-400'
                      }`}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={`text-xs font-mono transition-colors duration-200 ${
                      isActive ? 'text-cyan-500' : 'text-slate-400 group-hover:text-cyan-400'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.div
                      layoutId="dot"
                      className="absolute -top-1 w-1 h-1 rounded-full bg-cyan-500"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30
                      }}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Decorative elements */}
      {/* <div className="absolute -bottom-2 left-4 w-1/4 h-1 bg-gradient-to-r from-cyan-500 to-transparent" />
      <div className="absolute -top-2 right-4 w-1/4 h-1 bg-gradient-to-l from-cyan-500 to-transparent" /> */}
    </div>
  );
};

export default BottomNav; 