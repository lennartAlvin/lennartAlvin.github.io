import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
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
        Get in Touch
      </motion.h2>
      <motion.div
        className="flex flex-col items-center space-y-6"
        variants={fadeInUp}
      >
        <p className="text-lg text-gray-600 dark:text-[rgba(255,255,255,0.8)] text-center max-w-2xl">
          I'm always interested in hearing about new opportunities, interesting projects, or just having a chat.
        </p>
        <div className="flex space-x-6">
          <a
            href="https://github.com/lennartAlvin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-600 dark:text-[rgba(255,255,255,0.8)] hover:text-gray-900 dark:hover:text-white transition-colors transform hover:scale-110 duration-200"
          >
            <FaGithub className="w-8 h-8" />
          </a>
          <a
            href="https://www.linkedin.com/in/alvin-lennarthsson-aab594220/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-600 dark:text-[rgba(255,255,255,0.8)] hover:text-gray-900 dark:hover:text-white transition-colors transform hover:scale-110 duration-200"
          >
            <FaLinkedin className="w-8 h-8" />
          </a>
          <a
            href="mailto:alvin.lennarthsson@gmail.com"
            aria-label="Email"
            className="text-gray-600 dark:text-[rgba(255,255,255,0.8)] hover:text-gray-900 dark:hover:text-white transition-colors transform hover:scale-110 duration-200"
          >
            <FaEnvelope className="w-8 h-8" />
          </a>
        </div>
      </motion.div>
    </motion.section>
  );
}
