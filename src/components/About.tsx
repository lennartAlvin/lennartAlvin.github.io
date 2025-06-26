import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';

export default function About() {
  return (
    <motion.section
      className="py-16"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <motion.h2
        className="text-3xl font-bold mb-8 text-gray-900 dark:text-white"
        variants={fadeInUp}
      >
        About Me
      </motion.h2>
      <motion.div
        className="prose dark:prose-invert max-w-none"
        variants={fadeInUp}
      >
        <p className="text-lg text-gray-600 dark:text-gray-300">
          I'm a 24-year-old software developer based in Alingsås, Sweden. I recently graduated from the
          University of Borås with a Bachelor's degree in Information Systems. Currently working at WIS,
          I develop and maintain applications primarily built with .NET, WinUI, and Azure DevOps environments.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
          I'm particularly passionate about software quality, focusing heavily on clean architecture,
          API integrations, and automated testing. I have experience integrating external services and
          payment solutions into software systems, always striving for robust, maintainable solutions.
        </p>
      </motion.div>
    </motion.section>
  );
}
