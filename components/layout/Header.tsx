/**
 * Header Component
 * Single Responsibility: Site header with navigation
 * Mobile-first: Hamburger menu for mobile, full nav for desktop
 */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { MobileNav } from './MobileNav';
import { Container } from '../ui/Container';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { navigation, company } = siteConfig;

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
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-transparent'
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
                className="h-10 w-auto sm:h-12 logo-drop"
                priority
              />
              <span className="sr-only">{company.name}</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="https://schedule.jakartapartysquad.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary min-h-[40px]"
              >
                Event Schedule
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary min-h-[44px] min-w-[44px]"
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
