import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';

interface SkillCategoryProps {
  title: string;
  skills: string[];
  isDark: boolean;
}

function SkillCategory({ title, skills, isDark }: SkillCategoryProps) {
  const isLearning = title === 'Currently Learning';
  return (
    <motion.div
      className={`p-6 rounded-xl backdrop-blur-sm ${
        isLearning
          ? `${isDark ? 'bg-[#ff00c8]/20' : 'bg-[#ff00c8]/10'} border-2 ${isDark ? 'border-[#ff00c8]/30' : 'border-[#ff00c8]/20'}`
          : `${isDark ? 'bg-[#1e1e2f]/90' : 'bg-white/90'} border ${isDark ? 'border-[#121212]' : 'border-gray-200'}`
      } shadow-lg`}
      variants={{
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: isDark
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
          : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        {isLearning && (
          <motion.span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ff00c8]/10 dark:bg-[#ff00c8]/30 text-[#ff0059] dark:text-[#ff00c8]"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
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
            className="text-gray-600 dark:text-[rgba(255,255,255,0.8)] flex items-center space-x-2"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isLearning ? 'bg-[#00f0ff] dark:bg-[#00e0d1]' : 'bg-[#00f0ff] dark:bg-[#00e0d1]'
              }`}
            ></span>
            <span>{skill}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

interface SkillsProps {
  isDark: boolean;
}

export default function Skills({ isDark }: SkillsProps) {
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
          isDark={isDark}
        />
        <SkillCategory
          title="Frontend Development"
          skills={['HTML5', 'CSS3', 'React/Next.js', 'TypeScript', 'Tailwind CSS', 'WinUI/XAML']}
          isDark={isDark}
        />
        <SkillCategory
          title="Tools & DevOps"
          skills={['Azure DevOps', 'Git', 'CI/CD', 'MSIX']}
          isDark={isDark}
        />
        <SkillCategory
          title="Testing & Quality"
          skills={['xUnit', 'AutoFixture', 'Moq', 'TDD']}
          isDark={isDark}
        />
        <SkillCategory
          title="Integration & Services"
          skills={['REST APIs', 'Payment Gateways', 'Azure Services', 'Third-party APIs']}
          isDark={isDark}
        />
        <SkillCategory
          title="Currently Learning"
          skills={['Cloud Architecture', 'Microservices', 'Docker', 'System Design']}
          isDark={isDark}
        />
      </motion.div>
    </motion.section>
  );
}
