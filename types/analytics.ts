/**
 * Analytics Type Definitions
 * 
 * Comprehensive TypeScript interfaces for GTM dataLayer
 * Compatible with: GA4, Meta Pixel, and other tracking tools
 */

/**
 * Base DataLayer Event
 * All events must extend this interface
 */
export interface BaseDataLayerEvent {
  event: string;
  timestamp?: number;
  user_id?: string;
  session_id?: string;
}

/**
 * Page View Event
 * Triggered on route changes (SPA navigation)
 */
export interface PageViewEvent extends BaseDataLayerEvent {
  event: 'page_view';
  page_name: string;
  page_path: string;
  page_title: string;
  page_type: 'home' | 'about' | 'contact' | 'gallery' | 'partners' | 'community' | 'privacy' | 'terms' | 'other';
  page_category?: string;
  page_language?: string;
  referrer?: string;
}

/**
 * Button/Link Click Event
 * Generic click tracking for CTAs and navigation
 */
export interface ClickEvent extends BaseDataLayerEvent {
  event: 'button_click' | 'link_click';
  click_text: string;
  click_url?: string;
  click_id?: string;
  click_classes?: string;
  element_type: 'button' | 'link' | 'card' | 'icon';
  section_name?: string;
  position?: number;
}

/**
 * Form Interaction Events
 */
export interface FormStartEvent extends BaseDataLayerEvent {
  event: 'form_start';
  form_name: string;
  form_id: string;
  form_type: 'contact' | 'registration' | 'subscription' | 'other';
}

export interface FormSubmitEvent extends BaseDataLayerEvent {
  event: 'form_submit';
  form_name: string;
  form_id: string;
  form_type: 'contact' | 'registration' | 'subscription' | 'other';
  form_success?: boolean;
  form_error?: string;
}

/**
 * User Authentication Events
 */
export interface LoginEvent extends BaseDataLayerEvent {
  event: 'login';
  method: 'email' | 'google' | 'facebook' | 'instagram' | 'other';
  success: boolean;
}

export interface RegisterEvent extends BaseDataLayerEvent {
  event: 'register';
  method: 'email' | 'google' | 'facebook' | 'instagram' | 'other';
  success: boolean;
}

/**
 * Social Media Interaction Events
 */
export interface SocialClickEvent extends BaseDataLayerEvent {
  event: 'social_click';
  platform: 'instagram' | 'whatsapp' | 'email' | 'twitter' | 'facebook' | 'other';
  action: 'follow' | 'share' | 'contact' | 'view';
  content_name?: string;
}

/**
 * Navigation Events
 */
export interface NavigationClickEvent extends BaseDataLayerEvent {
  event: 'navigation_click';
  nav_type: 'header' | 'footer' | 'mobile_menu' | 'sidebar';
  nav_item: string;
  nav_destination: string;
}

/**
 * Media Interaction Events
 */
export interface ImageViewEvent extends BaseDataLayerEvent {
  event: 'image_view';
  image_url: string;
  image_alt?: string;
  gallery_name?: string;
  image_position?: number;
}

export interface VideoEvent extends BaseDataLayerEvent {
  event: 'video_start' | 'video_complete' | 'video_pause';
  video_url: string;
  video_title?: string;
  video_duration?: number;
  video_percent?: number;
}

/**
 * Conversion Events
 */
export interface ConversionEvent extends BaseDataLayerEvent {
  event: 'conversion' | 'purchase' | 'lead';
  transaction_id?: string;
  value?: number;
  currency?: string;
  items?: ConversionItem[];
  conversion_type: 'partnership' | 'booking' | 'registration' | 'contact' | 'other';
}

export interface ConversionItem {
  item_id: string;
  item_name: string;
  item_category?: string;
  price?: number;
  quantity?: number;
}

/**
 * Search Events
 */
export interface SearchEvent extends BaseDataLayerEvent {
  event: 'search';
  search_term: string;
  search_results?: number;
  search_type?: string;
}

/**
 * Error Events
 */
export interface ErrorEvent extends BaseDataLayerEvent {
  event: 'error';
  error_message: string;
  error_type: '404' | '500' | 'validation' | 'network' | 'other';
  error_location?: string;
}

/**
 * Custom Events
 * For ad-hoc tracking needs
 */
export interface CustomEvent extends BaseDataLayerEvent {
  event: 'custom_event';
  event_name: string;
  event_category?: string;
  event_label?: string;
  event_value?: number;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Union type of all possible events
 */
export type DataLayerEvent =
  | PageViewEvent
  | ClickEvent
  | FormStartEvent
  | FormSubmitEvent
  | LoginEvent
  | RegisterEvent
  | SocialClickEvent
  | NavigationClickEvent
  | ImageViewEvent
  | VideoEvent
  | ConversionEvent
  | SearchEvent
  | ErrorEvent
  | CustomEvent;

/**
 * GTM Configuration
 */
export interface GTMConfig {
  gtmId: string;
  dataLayerName?: string;
  auth?: string;
  preview?: string;
  enabled?: boolean;
}

/**
 * Analytics Context
 */
export interface AnalyticsContext {
  enabled: boolean;
  gtmId?: string;
  debug?: boolean;
  userId?: string;
  sessionId?: string;
}

/**
 * Window interface extension for dataLayer
 */
declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
    gtag?: (...args: unknown[]) => void;
  }
}
