'use client';

import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';
import Link from './Link';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
import SearchButton from './SearchButton';
import VaulDrawer from './DrawerNav';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  
  const headerClass = `
    flex items-center justify-between w-full py-4 px-6
    bg-white/80 dark:bg-gray-950/80 backdrop-blur-md
    border-b border-gray-200 dark:border-gray-800
    ${siteMetadata.stickyNav ? 'sticky top-0 z-50' : ''}
  `;

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={headerClass.trim()}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center space-x-3">
            {/* Uncomment the line below to use the logo */}
            {/* <Logo /> */}
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600 text-transparent bg-clip-text">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </motion.div>

      <div className="flex items-center space-x-4 sm:space-x-6">
        <nav className="hidden sm:flex space-x-1">
          <motion.div 
            className="flex space-x-1"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.title}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variants={{
                      hidden: { opacity: 0, y: -20 },
                      show: { opacity: 1, y: 0 }
                    }}
                  >
                    <Link
                      href={link.href}
                      className={`relative px-4 py-2 rounded-full font-medium transition-colors duration-200
                        ${isActive 
                          ? 'text-primary-500 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                          : 'text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }
                      `}
                    >
                      {link.title}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-full ring-2 ring-primary-500 dark:ring-primary-400"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
          </motion.div>
        </nav>

        <div className="flex items-center space-x-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <SearchButton />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <ThemeSwitch />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <VaulDrawer/>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
