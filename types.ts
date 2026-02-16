export type SiteCategory = string;

export type SiteStatus = 'Online' | 'Manutenção' | 'Ativo' | 'Inativo';

export interface Credential {
  id: string;
  label: string;
  username: string;
  password: string;
}

export interface InfraLink {
  id: string;
  label: string;
  url: string;
  service?: 'Supabase' | 'Github' | 'Vercel' | 'Hostinger' | 'AWS' | 'Cloudflare' | 'Firebase' | 'DigitalOcean' | 'Netlify' | 'Other';
}

export interface Site {
  id: string;
  name: string;
  description: string;
  category: SiteCategory;
  url: string;
  status: SiteStatus;
  logoUrl?: string; // URL for the small logo or icon background image
  iconName?: string; // Material Symbol name fallback
  iconColorClass?: string; // Tailwind class for icon color
  bgColorClass?: string; // Tailwind class for icon background
  chromeProfilePassword?: string;
  credentials?: Credential[];
  infraLinks?: InfraLink[];
}

export type ViewMode = 'portal' | 'admin';

export type AdminSubView = 'sites' | 'analytics' | 'settings';
