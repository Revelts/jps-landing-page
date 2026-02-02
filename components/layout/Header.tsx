/**
 * Header Component
 * Single Responsibility: Site header with navigation
 * Mobile-first: Hamburger menu for mobile, full nav for desktop
 */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Building2, Music, Waves, LucideIcon } from 'lucide-react';
import { MobileNav } from './MobileNav';
import { Container } from '../ui/Container';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  'building': Building2,
  'music': Music,
  'waves': Waves,
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { navigation, company, callToAction } = siteConfig;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
          isScrolled
            ? 'bg-surface/70 backdrop-blur-xl border-b border-secondary/10 shadow-glass'
            : 'bg-surface/30 backdrop-blur-md'
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1">
              <Image
                src={company.logo}
                alt={company.name}
                width={48}
                height={48}
                className="h-10 w-auto sm:h-12 drop-shadow-lg shadow-indigo-500/50"
                priority
              />
              <span className="sr-only">{company.name}</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(item.name)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        className="inline-flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-secondary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary/50 rounded px-3 py-2 hover:bg-secondary/5"
                      >
                        {item.name}
                        <ChevronDownIcon className="h-4 w-4" />
                      </button>
                      {openDropdown === item.name && (
                        <div className="absolute top-full left-0 pt-2 z-50">
                          <div className="w-64 bg-surface/90 backdrop-blur-xl rounded-xl shadow-glass border border-secondary/20 py-2">
                            {item.dropdown.map((subItem) => {
                              const IconComponent = iconMap[subItem.icon] || Building2;
                              return (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="flex items-start gap-3 px-4 py-3 hover:bg-secondary/10 transition-all duration-300 group"
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  <div className="group-hover:scale-110 transition-transform duration-300 mt-0.5">
                                    <IconComponent className="w-6 h-6 text-secondary" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-text-primary group-hover:text-secondary transition-colors">
                                      {subItem.name}
                                    </div>
                                    <div className="text-xs text-text-tertiary">
                                      {subItem.description}
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-text-secondary hover:text-secondary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary/50 rounded px-3 py-2 hover:bg-secondary/5"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href={callToAction.href}
                className="inline-flex items-center px-5 py-2 text-sm font-semibold text-bg-primary bg-gradient-to-r from-secondary to-accent rounded-full hover:shadow-glow-lg transition-all duration-400 min-h-[40px] hover:-translate-y-0.5"
              >
                {callToAction.text}
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-secondary hover:bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary/50 min-h-[44px] min-w-[44px] transition-all duration-300"
              onClick={() => setIsOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </header>

      {/* Spacer to prevent content jump */}
      <div className="h-16 sm:h-20" />

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navigation={navigation}
      />
    </>
  );
}
