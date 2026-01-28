// Type definitions for Jakarta Party Squad website

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  links: {
    instagram: string;
  };
}

export interface DropdownItem {
  name: string;
  href: string;
  description: string;
  icon: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  dropdown?: DropdownItem[];
}

export interface CallToAction {
  text: string;
  href: string;
}

export interface AboutItem {
  title: string;
  description: string;
  img: string;
}

export interface Benefit {
  name: string;
  description: string;
  icon: string;
}

export interface Partner {
  name: string;
  logo: string;
  url: string;
}

export interface Album {
  name: string;
  photo: string;
  url: string;
  date: string;
}

export interface SiteConfig {
  company: {
    name: string;
    logo: string;
  };
  team: {
    title: string;
    members: TeamMember[];
  };
  navigation: NavigationItem[];
  callToAction: CallToAction;
  callToActions: CallToAction[];
  mainHero: {
    title: string;
    subtitle: string;
    description: string;
    img: string;
    primaryAction: CallToAction;
    secondaryAction: CallToAction;
  };
  aboutus: {
    title: string;
    items: AboutItem[];
  };
  benefits: {
    title: string;
    subtitle: string;
    description: string;
    items: Benefit[];
  };
  partners: {
    title: string;
    description: string;
    items: Partner[];
    closing: string;
  };
  albums: {
    title: string;
    description: string;
    items: Album[];
  };
  gallery: {
    title: string;
  };
  about: {
    sections: Array<{
      name: string;
      href: string;
      content: string;
    }>;
    socialMedia: {
      instagram: string;
      tiktok: string;
      discord: string;
    };
  };
  founderSpeech: {
    title: string;
    name: string;
    avatar: string;
    speech: string;
  };
}

export interface MetadataConfig {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}
