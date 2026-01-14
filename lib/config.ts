// Configuration loader with type safety
import { SiteConfig } from '@/types';
import configData from '@/config/index.json';

export const siteConfig: SiteConfig = configData as SiteConfig;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jakartapartysquad.com';
export const siteName = 'Jakarta Party Squad';
