"use client";

import ProjectTabs from '@/components/ProjectTabs'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { Button } from '@/components/components/ui/button'

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="relative space-y-8 pb-8 pt-6">
          {/* Decorative background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
          </div>

          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'
          >
            <div className="relative space-y-4">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
              >
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  More DevOps Resources
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg leading-7 text-gray-600 dark:text-gray-300 max-w-2xl"
              >
                Explore our comprehensive collection of DevOps resources, tutorials, and best practices to enhance your skills and streamline your development workflow.
              </motion.p>
            </div>
            
            {/* GitHub Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition-all duration-500"></div>
              <Button 
                variant="outline" 
                className="relative rounded-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-gray-900/50 border border-gray-200/20 dark:border-gray-700/20 transition-all duration-300"
              >
                <Link href={siteMetadata.github} className="flex items-center gap-2">
                  <FaGithub className="w-5 h-5" />
                  <span className="relative">
                    View on GitHub
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Category Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {['DevOps', 'Cloud Native', 'Automation'].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
                <div className="relative p-6 rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/20 dark:border-gray-700/20 hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-300">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl transform group-hover:translate-x-6 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-xl transform group-hover:-translate-x-4 transition-transform duration-700"></div>
                  
                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                      {category}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {index === 0 && 'Master the latest DevOps practices and tools'}
                      {index === 1 && 'Learn cloud-native architecture and deployment'}
                      {index === 2 && 'Explore automation and CI/CD pipelines'}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Project Tabs Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="relative"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        <ProjectTabs />
      </motion.div>
    </>
  )
}
