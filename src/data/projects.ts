import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'A cutting-edge portfolio showcasing modern web development with futuristic design, advanced animations, and interactive elements. Built with Next.js and enhanced with custom cursor effects and particle backgrounds.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Canvas API'],
    githubUrl: 'https://github.com/lennartAlvin/Portfolio',
    liveUrl: '',
    impact: 'Demonstrates advanced frontend skills with 95+ performance score',
    year: '2024',
    category: 'Frontend',
    featured: true,
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory management, secure payment processing, and admin dashboard. Features advanced search, filtering, and recommendation algorithms.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'Redux'],
    githubUrl: 'https://github.com/lennartAlvin/ecommerce-platform',
    liveUrl: '',
    impact: 'Handles 10k+ transactions monthly with 99.9% uptime',
    year: '2024',
    category: 'Full-Stack',
    featured: true,
  },
  {
    id: 'ai-chat-application',
    title: 'AI Chat Application',
    description: 'Real-time chat application integrated with OpenAI GPT models. Features include voice recognition, file sharing, message encryption, and intelligent conversation summarization.',
    technologies: ['React', 'Socket.io', 'OpenAI API', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/lennartAlvin/ai-chat-app',
    impact: 'Serves 1000+ active users with advanced AI capabilities',
    year: '2024',
    category: 'AI/ML',
    featured: true,
  },
  {
    id: 'crypto-trading-dashboard',
    title: 'Crypto Trading Dashboard',
    description: 'Advanced cryptocurrency trading dashboard with real-time price charts, portfolio tracking, and automated trading strategies. Features WebSocket connections for live market data.',
    technologies: ['Vue.js', 'Chart.js', 'WebSocket', 'Python', 'FastAPI'],
    githubUrl: 'https://github.com/lennartAlvin/crypto-dashboard',
    impact: 'Manages $50k+ in trading volume with automated strategies',
    year: '2023',
    category: 'FinTech',
    featured: false,
  },
];

export const getFeaturedProjects = (): Project[] => 
  projects.filter(project => project.featured);

export const getProjectsByCategory = (category: Project['category']): Project[] =>
  projects.filter(project => project.category === category);

export const getProjectById = (id: string): Project | undefined =>
  projects.find(project => project.id === id); 