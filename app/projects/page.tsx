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
        <div className="space-y-6 pb-8 pt-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'
          >
            <div className="space-y-2">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
              >
              More DevOps Resources
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg leading-7 text-gray-500 dark:text-gray-400 max-w-2xl"
              >
                Explore our comprehensive collection of DevOps resources, tutorials, and best practices to enhance your skills and streamline your development workflow.
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button variant="outline" className="rounded-lg hover:scale-105 transition-transform duration-200 flex items-center gap-2">
                <Link href={siteMetadata.github} className="flex items-center gap-2">
                  <FaGithub className="w-5 h-5" />
                  <span>View on GitHub</span>
              </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
          >
            {['DevOps', 'Cloud Native', 'Automation'].map((category, index) => (
              <div key={category} className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors duration-200">
                <h3 className="text-xl font-bold mb-2">{category}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {index === 0 && 'Master the latest DevOps practices and tools'}
                  {index === 1 && 'Learn cloud-native architecture and deployment'}
                  {index === 2 && 'Explore automation and CI/CD pipelines'}
                </p>
          </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <ProjectTabs />
      </motion.div>
    </>
  )
}
