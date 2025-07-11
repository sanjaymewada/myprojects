'use client';

import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { motion } from 'framer-motion'

type SocialIconKind = 'mail' | 'github' | 'youtube' | 'linkedin' | 'instagram' | 'threads' | 'medium' | 'x' | 'facebook' | 'twitter' | 'mastodon' | 'bluesky';

export default function Footer() {
  const socialIconsConfig = [
    { kind: 'mail' as SocialIconKind, href: `mailto:${siteMetadata.email || ''}` },
    { kind: 'github' as SocialIconKind, href: siteMetadata.github || '' },
    { kind: 'youtube' as SocialIconKind, href: siteMetadata.youtube || '' },
    { kind: 'linkedin' as SocialIconKind, href: siteMetadata.linkedin || '' },
    { kind: 'instagram' as SocialIconKind, href: siteMetadata.instagram || '' },
    { kind: 'threads' as SocialIconKind, href: siteMetadata.threads || '' },
    { kind: 'medium' as SocialIconKind, href: siteMetadata.medium || '' },
  ]

  const socialIcons = socialIconsConfig.filter(icon => icon.href !== '')

  return (
    <footer className="from-gray-50 dark:from-gray-900/50 to-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Social Icons */}
          <motion.div 
            className="mb-6 sm:mb-8 flex flex-wrap justify-center gap-3 sm:gap-4"
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
            {socialIcons.map((social) => (
              <motion.div
                key={social.kind}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                className="transform transition-transform duration-200"
              >
                <SocialIcon
                  kind={social.kind}
                  href={social.href}
                  size={6}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 sm:mb-8 h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent"
          />

          {/* Copyright Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center space-y-4"
          >
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <motion.span whileHover={{ scale: 1.05 }}>
                {siteMetadata.author}
              </motion.span>
              <span className="text-gray-400 dark:text-gray-600">•</span>
              <motion.span whileHover={{ scale: 1.05 }}>
                © {new Date().getFullYear()}
              </motion.span>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
            >
              <Link 
                href="https://github.com/NotHarshhaa/"
                className="flex items-center space-x-2"
              >
                <span>Made with</span>
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  ❤
                </motion.span>
                <span>by H A R S H H A A</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
