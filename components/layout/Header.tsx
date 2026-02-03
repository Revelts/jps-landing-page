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
import { Building2, Music, Waves, LucideIcon, User, LogOut, Settings, Camera, FileText, Mail, Ban, Receipt, Info, Users, Calendar, Handshake, Gift, Calculator } from 'lucide-react';
import { MobileNav } from './MobileNav';
import { LoginModal } from '../auth/LoginModal';
import { Container } from '../ui/Container';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  'building': Building2,
  'music': Music,
  'waves': Waves,
  'gallery': Camera,
  'blog': FileText,
  'contact': Mail,
  'info': Info,
  'users': Users,
  'calendar': Calendar,
  'handshake': Handshake,
  'gift': Gift,
  'calculator': Calculator,
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { navigation, company } = siteConfig;
  const { user, loading, logout } = useAuth();

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
            <nav className="hidden lg:flex items-center space-x-4">
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
              
              {/* Dashboard Dropdown (Only for logged-in users) */}
              {!loading && user && (
                <div
                  className="relative"
                  onMouseEnter={() => setOpenDropdown('Dashboard')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className="inline-flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-secondary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary/50 rounded px-3 py-2 hover:bg-secondary/5"
                  >
                    Dashboard
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                  {openDropdown === 'Dashboard' && (
                    <div className="absolute top-full left-0 pt-2 z-50">
                      <div className="w-64 bg-surface/90 backdrop-blur-xl rounded-xl shadow-glass border border-secondary/20 py-2">
                        <Link
                          href="/dashboard/blacklist"
                          className="flex items-start gap-3 px-4 py-3 hover:bg-secondary/10 transition-all duration-300 group"
                          onClick={() => setOpenDropdown(null)}
                        >
                          <div className="group-hover:scale-110 transition-transform duration-300 mt-0.5">
                            <Ban className="w-6 h-6 text-red-400" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-text-primary group-hover:text-secondary transition-colors">
                              Blacklist
                            </div>
                            <div className="text-xs text-text-tertiary">
                              Manage blacklist entries
                            </div>
                          </div>
                        </Link>
                        {/* Invoice - Only for Admin */}
                        {user.role === 'Admin' && (
                          <Link
                            href="/dashboard/invoice"
                            className="flex items-start gap-3 px-4 py-3 hover:bg-secondary/10 transition-all duration-300 group"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <div className="group-hover:scale-110 transition-transform duration-300 mt-0.5">
                              <Receipt className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-text-primary group-hover:text-secondary transition-colors">
                                Invoice
                              </div>
                              <div className="text-xs text-text-tertiary">
                                Generate invoices
                              </div>
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* User Menu / Login */}
              {!loading && (
                <>
                  {user ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setIsUserMenuOpen(true)}
                      onMouseLeave={() => setIsUserMenuOpen(false)}
                    >
                      <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-secondary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary/50 rounded-full hover:bg-secondary/5 border border-secondary/20">
                        <User className="h-4 w-4" />
                        <span>{user.name}</span>
                        <ChevronDownIcon className="h-4 w-4" />
                      </button>
                      {isUserMenuOpen && (
                        <div className="absolute top-full right-0 pt-2 z-50">
                          <div className="w-56 bg-surface/90 backdrop-blur-xl rounded-xl shadow-glass border border-secondary/20 py-2">
                            <div className="px-4 py-3 border-b border-secondary/20">
                              <p className="text-sm font-medium text-text-primary">{user.name}</p>
                              <p className="text-xs text-text-tertiary truncate">{user.email}</p>
                            </div>
                            <Link
                              href="/profile"
                              className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/10 transition-all duration-300 text-text-secondary hover:text-secondary"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <Settings className="h-4 w-4" />
                              <span className="text-sm">Settings</span>
                            </Link>
                            <button
                              onClick={() => logout()}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 transition-all duration-300 text-text-secondary hover:text-red-400"
                            >
                              <LogOut className="h-4 w-4" />
                              <span className="text-sm">Logout</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsLoginModalOpen(true)}
                      className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold border-2 border-secondary text-secondary rounded-full hover:bg-secondary/10 transition-all duration-300 min-h-[40px] hover:-translate-y-0.5"
                    >
                      <User className="h-4 w-4" />
                      Login
                    </button>
                  )}
                </>
              )}
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

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
