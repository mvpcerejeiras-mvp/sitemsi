import { Site, SiteCategory } from './types';

export const INITIAL_SITES: Site[] = [
  {
    id: 'MSI-001',
    name: 'Portal Financeiro',
    description: 'Gestão de contas, relatórios anuais e acompanhamento de fluxo de caixa em tempo real.',
    category: 'Finanças',
    url: 'https://financeiro.example.com',
    status: 'Online',
    iconName: 'account_balance',
    iconColorClass: 'text-primary',
    bgColorClass: 'bg-blue-50 dark:bg-blue-900/30'
  },
  {
    id: 'MSI-002',
    name: 'Educação Continuada',
    description: 'Acesso a cursos, trilhas de aprendizagem e materiais educativos para colaboradores.',
    category: 'Educação',
    url: 'https://edu.example.com',
    status: 'Online',
    iconName: 'school',
    iconColorClass: 'text-purple-600',
    bgColorClass: 'bg-purple-50 dark:bg-purple-900/30'
  },
  {
    id: 'MSI-003',
    name: 'Gestão de Projetos',
    description: 'Acompanhamento de cronogramas, tarefas e metas para equipes multidisciplinares.',
    category: 'Projetos',
    url: 'https://projetos.example.com',
    status: 'Online',
    iconName: 'assignment',
    iconColorClass: 'text-orange-600',
    bgColorClass: 'bg-orange-50 dark:bg-orange-900/30'
  },
  {
    id: 'MSI-004',
    name: 'Sistemas Integrados',
    description: 'Central de APIs e acessos diretos aos sistemas legados e microserviços.',
    category: 'Sistemas',
    url: 'https://api.example.com',
    status: 'Manutenção',
    iconName: 'terminal',
    iconColorClass: 'text-cyan-600',
    bgColorClass: 'bg-cyan-50 dark:bg-cyan-900/30'
  },
  {
    id: 'MSI-005',
    name: 'Comunidade Church',
    description: 'Portal de engajamento, agenda de eventos e comunicação interna da comunidade.',
    category: 'Church',
    url: 'https://church.example.com',
    status: 'Online',
    iconName: 'church',
    iconColorClass: 'text-rose-600',
    bgColorClass: 'bg-rose-50 dark:bg-rose-900/30'
  },
  {
    id: 'MSI-006',
    name: 'Suporte Técnico',
    description: 'Abertura de chamados, base de conhecimento e auxílio especializado em TI.',
    category: 'Sistemas',
    url: 'https://support.example.com',
    status: 'Online',
    iconName: 'support_agent',
    iconColorClass: 'text-emerald-600',
    bgColorClass: 'bg-emerald-50 dark:bg-emerald-900/30'
  },
  {
    id: 'MSI-0824',
    name: 'E-commerce Hub',
    description: 'Plataforma principal de compras para clientes de varejo.',
    category: 'Varejo',
    url: 'https://shop-a.com',
    status: 'Ativo',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbI_QjVFZkeuB3rP1tOyV23IUlavLbQOOy46bClGrNuX-fGhzBmjnLK_ViH3Zrx1F_DDI-S3JmI5MhsQhlZJVYtAziZIo3ZUrTgPuBu7tJQE1nHRh9M4NQIgAC4yVsmrYHdVU1AGITfOK1y8IXkJ5hCfQs9owbsZYnmtJKzqR1Vb4CRq_xUeRF1w2ZEyMcD839jXYkYxxj9Hr96EwYTvZhLMv3ZNgDna27eENFvfAShZgmYECZJO6qxuXm0Vgc85jLAQIrwBIPWf3v',
    iconName: 'shopping_bag'
  },
  {
    id: 'MSI-0825',
    name: 'Portal Corporativo',
    description: 'Notícias e recursos internos para funcionários.',
    category: 'Corporativo',
    url: 'https://corp-b.net',
    status: 'Inativo',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu8TQ-EUicXPEVk0O2NzT4Bpikeg-Vam5oOEiW-reJAJSElQUxGgydRwnAOse3nhf3klkLzqwEOhZK0YEpav6o3dzu-wpICt0oxOyG1rkb7ldwuwX0JOHvIVnLC6rETuLmeWHwT-MxhMJBPs1EYEtMDD1hpZK28kL2tv6bRwuUDQCfbu9zVBSrHQFq9jyRN78W2dsNVRy_2jFID_sEFTh3TFZm4myAg6BvM-lPzIxK7xbVwBgiUliIVFaiZwbYBI_C60AKxcSrqV3B',
    iconName: 'business'
  },
  {
    id: 'MSI-0826',
    name: 'Tech Blog Pro',
    description: 'Blog de tecnologia voltado ao público.',
    category: 'Mídia',
    url: 'https://blog-c.io',
    status: 'Ativo',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPC0mAI7fjAiQv34GYKEr8h-CEp3pa7SAfTGMlWm8vCng0kKZEqqef-2xO__JbbfYh79t6adP1MpkGR3alLQQLuEcioa_49wuAtmk0-6JkqtMRf0u5SEvv9lPHcpolpywYkWgiUQHzPnsJOw89_2b47keCf39_uqBoZ6M71jQurWf6anbQECzT4ITxViD4eDFhtDWZUq61JBg9UDmfc7J4jjACSsxl3PcQm5onExP1yT5WwNHWWkNbNljHy39FmJIRruLCa408JTcO',
    iconName: 'rss_feed'
  },
  {
    id: 'MSI-0827',
    name: 'Dashboard SaaS',
    description: 'Análises para clientes SaaS.',
    category: 'Tecnologia',
    url: 'https://saas-d.com',
    status: 'Ativo',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc07-_AmETL5DsKxuyrdiQHNgpD5I60z9gYnn9AXmz4tVkI6Pd9R1qRp-4-hykX9I8OF7J4ob_V1Wacq54eoQPLSz6-o5Cayyz9oI0kj8cJY1gRjfXtXaMNTfkLkbFeRGUIt4HdlQiHZIcXI6DA-goOPOQxmc529jGNgBx62TKch4foffZYZuUh7Emid2Es2Jf_BjGRai6MBWXoM1o4O3BSHZqE3muoGRsyi2Me0pVPaIEoKQX3ZTK7HvebSNlRd28BNXl4DWuz3O0',
    iconName: 'analytics'
  }
];

export const CATEGORIES: SiteCategory[] = ['Todos', 'Church', 'Projetos', 'Sistemas', 'Educação', 'Finanças', 'Varejo', 'Corporativo', 'Mídia', 'Tecnologia'];