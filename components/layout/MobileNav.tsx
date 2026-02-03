/**
 * Mobile Navigation Component
 * Single Responsibility: Handle mobile menu display and interaction
 * Mobile-first: Designed specifically for mobile viewports
 */
'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Building2, Music, Waves, LucideIcon, Camera, FileText, Mail } from 'lucide-react';
import Link from 'next/link';
import { NavigationItem } from '@/types';
import { siteConfig } from '@/lib/config';

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  'building': Building2,
  'music': Music,
  'waves': Waves,
  'gallery': Camera,
  'blog': FileText,
  'contact': Mail,
};

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
}

export function MobileNav({ isOpen, onClose, navigation }: MobileNavProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const { callToAction } = siteConfig;
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
                    </nav>

                    {/* Footer CTA */}
                    <div className="border-t border-secondary/20 p-4 space-y-3">
                      <Link
                        href={callToAction.href}
                        className="block w-full text-center px-4 py-3 bg-gradient-to-r from-secondary to-accent text-bg-primary font-semibold rounded-full hover:shadow-glow-lg transition-all duration-400 min-h-[44px] flex items-center justify-center"
                        onClick={onClose}
                      >
                        {callToAction.text}
                      </Link>
                      <Link
                        href="https://calculator.jakartapartysquad.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center px-4 py-3 border-2 border-secondary text-secondary font-medium rounded-full hover:bg-secondary/10 transition-all duration-300 min-h-[44px] flex items-center justify-center"
                        onClick={onClose}
                      >
                        Party Calculator
                      </Link>
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
