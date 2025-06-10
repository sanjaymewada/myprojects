'use client';

import Image from './Image'
import Link from './Link'
import { motion } from 'framer-motion'

const Card = ({ title, description, imgSrc, href }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  }

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <motion.div 
      className="md max-w-[544px] p-4 md:w-1/2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover="hover"
      variants={cardVariants}
    >
      <div
        className={`${
          imgSrc && 'h-full'
        } group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 dark:border-gray-800 dark:bg-gray-900 dark:shadow-gray-800/50`}
      >
        {imgSrc && (
          <div className="aspect-video overflow-hidden">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`} className="overflow-hidden">
                <motion.div variants={imageVariants}>
                  <Image
                    alt={title}
                    src={imgSrc}
                    className="object-cover object-center transition-all"
                    width={544}
                    height={306}
                  />
                </motion.div>
              </Link>
            ) : (
              <motion.div variants={imageVariants}>
                <Image
                  alt={title}
                  src={imgSrc}
                  className="object-cover object-center transition-all"
                  width={544}
                  height={306}
                />
              </motion.div>
            )}
          </div>
        )}
        <div className="p-6">
          <div className="flex flex-col space-y-3">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {href ? (
                <Link 
                  href={href} 
                  aria-label={`Link to ${title}`}
                  className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-[length:0px_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_2px] group-hover:bg-[length:100%_2px]"
                >
                  {title}
                </Link>
              ) : (
                title
              )}
            </h2>
            <p className="prose line-clamp-3 text-gray-600 dark:text-gray-400">{description}</p>
            {href && (
              <Link
                href={href}
                className="inline-flex items-center text-base font-medium text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Link to ${title}`}
              >
                Learn more
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ x: 0 }}
                  animate={{ x: 3 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1,
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </motion.svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Card
