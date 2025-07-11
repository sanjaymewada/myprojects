'use client';

import { Authors, allAuthors } from 'contentlayer/generated';
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import AuthorLayout from '@/layouts/AuthorLayout';
import { coreContent } from 'pliny/utils/contentlayer';
import NumberTicker from '@/components/components/ui/number-ticker';
import { badgeVariants } from '@/components/components/ui/badge';
import DownloadButton from '@/components/buttonDownload';
import siteMetadata from '@/data/siteMetadata';
import { motion } from 'framer-motion';
import { FaCloud, FaCode, FaBlog, FaRobot, FaServer, FaUserTie } from 'react-icons/fa';

const AchievementItem = ({ label, value }: { label: string; value: number }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
          <h2 className="font-semibold text-2xl sm:text-3xl md:text-2xl text-center">
      <NumberTicker value={value} />+
              <div className="text-sm sm:text-lg mt-2 text-gray-600 dark:text-gray-400">{label}</div>
  </h2>
  </motion.div>
);

const SkillCard = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex flex-col items-center p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
  >
    <Icon className="w-8 h-8 mb-2 text-primary-500" />
    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{title}</span>
  </motion.div>
);

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'prodevopsguy') as Authors;
  const mainContent = coreContent(author);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AuthorLayout content={mainContent}>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6 sm:space-y-8"
        >
          <motion.div variants={item}>
        <MDXLayoutRenderer code={author.body.code} />
          </motion.div>

          {/* Achievements Section */}
          <motion.div variants={item} className="my-8 sm:my-12">
            <h3 className="font-bold text-xl sm:text-2xl mb-4 sm:mb-6 text-center">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <AchievementItem label="Projects Completed" value={50} />
              <AchievementItem label="Certifications" value={15} />
              <AchievementItem label="Blog Posts" value={100} />
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={item} className="my-8 sm:my-12">
            <h3 className="font-bold text-xl sm:text-2xl mb-4 sm:mb-6">Technical Expertise</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              <SkillCard icon={FaCloud} title="Cloud" />
              <SkillCard icon={FaCode} title="DevOps" />
              <SkillCard icon={FaRobot} title="Automation" />
              <SkillCard icon={FaServer} title="CI/CD" />
              <SkillCard icon={FaBlog} title="Blogger" />
              <SkillCard icon={FaUserTie} title="Content Creator" />
        </div>
          </motion.div>

          {/* Additional Skills Tags */}
          <motion.div 
            variants={item}
            className="my-6 sm:my-8 p-4 sm:p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
          >
            <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4">Specialized Skills</h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={badgeVariants({ variant: 'outline' }) + " cursor-pointer"}
              >
                Infrastructure as Code
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={badgeVariants({ variant: 'outline' }) + " cursor-pointer"}
              >
                Kubernetes
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={badgeVariants({ variant: 'outline' }) + " cursor-pointer"}
              >
                Docker
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={badgeVariants({ variant: 'outline' }) + " cursor-pointer"}
              >
                AWS
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={badgeVariants({ variant: 'outline' }) + " cursor-pointer"}
              >
                Terraform
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={badgeVariants({ variant: 'outline' }) + " cursor-pointer"}
              >
                Jenkins
              </motion.span>
        </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            variants={item}
            className="mt-8 sm:mt-12 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
          <DownloadButton
            label="Join our Community"
            url={siteMetadata.CVUrl}
          />
            </motion.div>
          </motion.div>
        </motion.div>
      </AuthorLayout>
    </motion.div>
  );
}