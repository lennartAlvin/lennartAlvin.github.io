import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';

export default function Hero() {
  return (
    <motion.section
      className="flex flex-col md:flex-row items-center justify-between py-16 px-4 rounded-2xl mb-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#1e1e2f] dark:to-[#121212]"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <motion.div className="md:w-1/2 space-y-6 md:pr-8" variants={fadeInUp}>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-[#a100ff] to-[#ff00c8]">
          Hi, I'm Alvin Lennarthsson
        </h1>
        <p className="text-xl text-gray-600 dark:text-[rgba(255,255,255,0.8)]">
          A software developer who enjoys crafting complete solutions from backend to frontend.
        </p>
        <p className="text-lg text-gray-600 dark:text-[rgba(255,255,255,0.8)]">
          Working with C# and .NET for backend systems while embracing modern frontend technologies,
          I strive to build applications that are both reliable and user-friendly. I'm passionate about
          clean code and always eager to learn new ways to improve my craft.
        </p>
      </motion.div>
      <motion.div
        className="md:w-1/2 mt-8 md:mt-0"
        variants={fadeInUp}
      >
        <motion.img
          src="/profile.jpg"
          alt="Alvin Lennarthsson"
          className="rounded-lg shadow-xl w-64 h-64 object-cover mx-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </motion.section>
  );
}
