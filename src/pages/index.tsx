import { useState } from 'react';
import Head from 'next/head';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Head>
        <title>Alvin Lennarthsson - Software Developer</title>
        <meta name="description" content="Portfolio of Alvin Lennarthsson - Software Developer specializing in C#, .NET, and API integration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        {/* Dark Mode Toggle */}
        <motion.button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition-transform"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isDarkMode ? '🌞' : '🌙'}
        </motion.button>

        {/* Hero Section */}
        <motion.section 
          className="flex flex-col md:flex-row items-center justify-between py-16 px-4 rounded-2xl mb-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="md:w-1/2 space-y-6 md:pr-8" variants={fadeInUp}>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
              Hi, I'm Alvin Lennarthsson
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              A software developer who enjoys crafting complete solutions from backend to frontend.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
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

        {/* About Section */}
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

        {/* Skills Section */}
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
            Skills & Technologies
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            <SkillCategory
              title="Backend Development"
              skills={[
                'C# / .NET 8',
                'ASP.NET Core',
                'Entity Framework Core',
                'RESTful APIs',
                'SQL Server',
                'LINQ',
                'Dependency Injection',
              ]}
              isDark={isDarkMode}
            />
            <SkillCategory
              title="Frontend Development"
              skills={['HTML5', 'CSS3', 'React/Next.js', 'TypeScript', 'Tailwind CSS', 'WinUI/XAML']}
              isDark={isDarkMode}
            />
            <SkillCategory
              title="Tools & DevOps"
              skills={['Azure DevOps', 'Git', 'CI/CD', 'MSIX']}
              isDark={isDarkMode}
            />
            <SkillCategory
              title="Testing & Quality"
              skills={['xUnit', 'AutoFixture', 'Moq', 'TDD']}
              isDark={isDarkMode}
            />
            <SkillCategory
              title="Integration & Services"
              skills={['REST APIs', 'Payment Gateways', 'Azure Services', 'Third-party APIs']}
              isDark={isDarkMode}
            />
            <SkillCategory
              title="Currently Learning"
              skills={['Cloud Architecture', 'Microservices', 'Docker', 'System Design']}
              isDark={isDarkMode}
            />
          </motion.div>
        </motion.section>

        {/* Projects Section */}
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
            Featured Projects
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
          >
            <ProjectCard
              title="Portfolio Website"
              description="A modern, responsive portfolio website built with Next.js and Tailwind CSS. Features dark mode support, smooth animations, and a clean, professional design showcasing my full-stack development skills."
              technologies={['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']}
              githubUrl="https://github.com/lennartAlvin/Portfolio"
              isDark={isDarkMode}
              impact="Personal project demonstrating modern web development practices"
            />
          </motion.div>
        </motion.section>

        {/* Contact Section */}
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
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl">
              I'm always interested in hearing about new opportunities, interesting projects, or just having a chat.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://github.com/lennartAlvin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors transform hover:scale-110 duration-200"
              >
                <FaGithub className="w-8 h-8" />
              </a>
              <a
                href="https://www.linkedin.com/in/alvin-lennarthsson-aab594220/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors transform hover:scale-110 duration-200"
              >
                <FaLinkedin className="w-8 h-8" />
              </a>
              <a
                href="mailto:alvin.lennarthsson@gmail.com"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors transform hover:scale-110 duration-200"
              >
                <FaEnvelope className="w-8 h-8" />
              </a>
            </div>
          </motion.div>
        </motion.section>
      </main>

      <motion.footer 
        className="py-8 text-center text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p>© {new Date().getFullYear()} Alvin Lennarthsson. All rights reserved.</p>
      </motion.footer>
    </div>
  );
}

function SkillCategory({ title, skills, isDark }: { title: string; skills: string[]; isDark: boolean }) {
  const isLearning = title === "Currently Learning";
  return (
    <motion.div 
      className={`p-6 rounded-xl backdrop-blur-sm ${
        isLearning 
          ? `${isDark ? 'bg-blue-900/20' : 'bg-blue-50'} border-2 ${isDark ? 'border-blue-500/30' : 'border-blue-200'}` 
          : `${isDark ? 'bg-gray-800/90' : 'bg-white/90'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`
      } shadow-lg`}
      variants={{
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 }
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: isDark ? '0 20px 25px -5px rgba(0, 0, 0, 0.3)' : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        {isLearning && (
          <motion.span 
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            In Progress
          </motion.span>
        )}
      </div>
      <ul className="space-y-2">
        {skills.map((skill) => (
          <li 
            key={skill} 
            className="text-gray-600 dark:text-gray-300 flex items-center space-x-2"
          >
            <span className={`w-2 h-2 rounded-full ${
              isLearning 
                ? 'bg-blue-500 dark:bg-blue-400' 
                : 'bg-blue-500 dark:bg-blue-400'
            }`}></span>
            <span>{skill}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ProjectCard({ title, description, technologies, githubUrl, isDark, impact }: {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  isDark: boolean;
  impact?: string;
}) {
  return (
    <motion.div 
      className={`p-8 rounded-xl ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} shadow-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-sm`}
      variants={{
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 }
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: isDark ? '0 20px 25px -5px rgba(0, 0, 0, 0.3)' : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{description}</p>
      {impact && (
        <div className="mb-6 flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <p className="text-green-600 dark:text-green-400 font-medium">
            {impact}
          </p>
        </div>
      )}
      <div className="flex flex-wrap gap-2 mb-6">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
      <motion.a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaGithub className="w-5 h-5" />
        <span>View on GitHub</span>
      </motion.a>
    </motion.div>
  );
} 