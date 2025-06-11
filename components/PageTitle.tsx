'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative mb-8 w-fit"
    >
      {/* Background box with gradient border */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative rounded-xl border border-neutral-200/50 bg-white/50 p-6 shadow-lg backdrop-blur-sm dark:border-neutral-800/50 dark:bg-neutral-950/50 sm:p-8"
      >
        {/* Animated gradient borders */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"
        />

        {/* Title text */}
        <motion.h1 
          className="relative z-10 text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
        >
          <span className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent dark:from-white dark:via-neutral-200 dark:to-white">
            {children}
          </span>
        </motion.h1>

        {/* Corner accents */}
        <div className="absolute left-0 top-0 h-12 w-12 overflow-hidden">
          <motion.div
            initial={{ x: -20, y: -20 }}
            animate={{ x: 0, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            className="h-[2px] w-12 bg-gradient-to-r from-blue-500 to-purple-500"
          />
          <motion.div
            initial={{ x: -20, y: -20 }}
            animate={{ x: 0, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            className="h-12 w-[2px] bg-gradient-to-b from-blue-500 to-purple-500"
          />
        </div>
        <div className="absolute bottom-0 right-0 h-12 w-12 overflow-hidden">
          <motion.div
            initial={{ x: 20, y: 20 }}
            animate={{ x: 0, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            className="absolute bottom-0 h-[2px] w-12 bg-gradient-to-r from-purple-500 to-pink-500"
          />
          <motion.div
            initial={{ x: 20, y: 20 }}
            animate={{ x: 0, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            className="absolute right-0 h-12 w-[2px] bg-gradient-to-b from-purple-500 to-pink-500"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
