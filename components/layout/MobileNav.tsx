/**
 * Mobile Navigation Component
 * Single Responsibility: Handle mobile menu display and interaction
 * Mobile-first: Designed specifically for mobile viewports
 */
'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Building2, Music, Waves, LucideIcon, Camera, FileText, Mail, Ban, Receipt, Info, Users, Calendar, Handshake, Gift, Calculator, LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';
import { NavigationItem } from '@/types';
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

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
}

export function MobileNav({ isOpen, onClose, navigation }: MobileNavProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const { user, loading, logout } = useAuth();
  
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-bg-primary/90 backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-sm">
                  <div className="flex h-full flex-col overflow-y-scroll bg-surface/95 backdrop-blur-xl shadow-glass border-l border-secondary/20">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-6 border-b border-secondary/20">
                      <Dialog.Title className="text-lg font-semibold text-text-primary tracking-wide">
                        Menu
                      </Dialog.Title>
                      <button
                        type="button"
                        className="rounded-md text-text-tertiary hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors duration-300"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 px-4 py-6 space-y-1">
                      {navigation.map((item) => (
                        <div key={item.name}>
                          {item.dropdown ? (
                            <div>
                              <button
                                onClick={() => setExpandedItem(expandedItem === item.name ? null : item.name)}
                                className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-text-secondary hover:bg-secondary/10 hover:text-secondary rounded-lg transition-all duration-300 min-h-[44px]"
                              >
                                <span>{item.name}</span>
                                <ChevronDownIcon
                                  className={`h-5 w-5 transition-transform duration-300 ${
                                    expandedItem === item.name ? 'rotate-180' : ''
                                  }`}
                                />
                              </button>
                              {expandedItem === item.name && (
                                <div className="mt-1 ml-4 space-y-1 animate-fade-in">
                                  {item.dropdown.map((subItem) => {
                                    const IconComponent = iconMap[subItem.icon] || Building2;
                                    return (
                                      <Link
                                        key={subItem.name}
                                        href={subItem.href}
                                        onClick={onClose}
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-text-tertiary hover:bg-secondary/10 hover:text-secondary rounded-lg transition-all duration-300"
                                      >
                                        <IconComponent className="w-5 h-5 text-secondary" />
                                        <div>
                                          <div className="font-medium">{subItem.name}</div>
                                          <div className="text-xs text-text-muted">{subItem.description}</div>
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className="block px-4 py-3 text-base font-medium text-text-secondary hover:bg-secondary/10 hover:text-secondary rounded-lg transition-all duration-300 min-h-[44px] flex items-center"
                            >
                              {item.name}
                            </Link>
                          )}
                        </div>
                      ))}

                      {/* Dashboard Section (for logged in users only) */}
                      {!loading && user && (
                        <div>
                          <button
                            onClick={() => setExpandedItem(expandedItem === 'Dashboard' ? null : 'Dashboard')}
                            className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-text-secondary hover:bg-secondary/10 hover:text-secondary rounded-lg transition-all duration-300 min-h-[44px]"
                          >
                            <span>Dashboard</span>
                            <ChevronDownIcon
                              className={`h-5 w-5 transition-transform duration-300 ${
                                expandedItem === 'Dashboard' ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {expandedItem === 'Dashboard' && (
                            <div className="mt-1 ml-4 space-y-1 animate-fade-in">
                              <Link
                                href="/dashboard/blacklist"
                                onClick={onClose}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-text-tertiary hover:bg-secondary/10 hover:text-secondary rounded-lg transition-all duration-300"
                              >
                                <Ban className="w-5 h-5 text-red-400" />
                                <div>
                                  <div className="font-medium">Blacklist</div>
                                  <div className="text-xs text-text-muted">Manage blacklist entries</div>
                                </div>
                              </Link>
                              {/* Invoice - Only for Admin */}
                              {user.role === 'Admin' && (
                                <Link
                                  href="/dashboard/invoice"
                                  onClick={onClose}
                                  className="flex items-center gap-3 px-4 py-3 text-sm text-text-tertiary hover:bg-secondary/10 hover:text-secondary rounded-lg transition-all duration-300"
                                >
                                  <Receipt className="w-5 h-5 text-accent" />
                                  <div>
                                    <div className="font-medium">Invoice</div>
                                    <div className="text-xs text-text-muted">Generate invoices</div>
                                  </div>
                                </Link>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </nav>

                    {/* Footer Auth */}
                    <div className="border-t border-secondary/20 p-4">
                      {!loading && (
                        <>
                          {user ? (
                            <button
                              onClick={() => logout()}
                              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-full transition-all duration-300 min-h-[44px] border border-red-500/30"
                            >
                              <LogOut className="w-5 h-5" />
                              <span className="font-medium">Logout</span>
                            </button>
                          ) : (
                            <Link
                              href="/login"
                              onClick={onClose}
                              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-secondary to-accent text-bg-primary font-semibold rounded-full hover:shadow-glow-lg transition-all duration-400 min-h-[44px]"
                            >
                              <LogIn className="w-5 h-5" />
                              <span>Login</span>
                            </Link>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
