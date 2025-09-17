import React, { Fragment } from 'react';

import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-scroll';

import config from '../config/index.json';

const Menu = () => {
  const { navigation, company, callToAction, callToActions } = config as any;
  type NavItem = { name: string; href: string };
  type CtaItem = { text: string; href: string };
  const ctaList: CtaItem[] = (
    callToActions && Array.isArray(callToActions)
      ? callToActions
      : [callToAction]
  ).filter(Boolean) as CtaItem[];
  const { name: companyName, logo } = company;

  return (
    <>
      <svg
        className={`hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-background transform translate-x-1/2`}
        fill="currentColor"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points="50,0 100,0 50,100 0,100" />
      </svg>

      <Popover>
        <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
          <nav
            className="relative flex items-center justify-between sm:h-10 lg:justify-start"
            aria-label="Global"
          >
            <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <a href="#">
                  <span className="sr-only">{companyName}</span>
                  <img
                    alt="logo"
                    className="h-16 w-auto sm:h-16 logo-drop"
                    src={logo}
                  />
                </a>
                <div className="-mr-2 flex items-center md:hidden">
                  <Popover.Button
                    className={`bg-background rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary`}
                  >
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="hidden md:flex md:items-center md:ml-10 md:pr-4 md:space-x-8">
              {navigation.map((item: NavItem) => (
                <Link
                  spy={true}
                  active="active"
                  smooth={true}
                  duration={1000}
                  key={item.name}
                  to={item.href}
                  className="font-medium text-gray-500 hover:text-gray-900"
                >
                  {item.name}
                </Link>
              ))}
              <div className="relative inline-block group">
                <span className="font-medium text-gray-500 hover:text-gray-900 cursor-pointer inline-block px-2 py-2">
                  Features
                </span>
                <div className="absolute left-0 top-full hidden group-hover:block w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                  <div className="py-1">
                    {ctaList.map((cta) => (
                      <a
                        key={cta.text}
                        href={cta.href}
                        target="_blank"
                        rel="noreferrer"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {cta.text}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div
              className={`rounded-lg shadow-md bg-background ring-1 ring-black ring-opacity-5 overflow-hidden`}
            >
              <div className="px-5 pt-4 flex items-center justify-between">
                <div>
                  <img className="h-8 w-auto" src={logo} alt="" />
                </div>
                <div className="-mr-2">
                  <Popover.Button
                    className={`bg-background rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary`}
                  >
                    <span className="sr-only">Close main menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item: NavItem) => (
                  <Link
                    spy={true}
                    active="active"
                    smooth={true}
                    duration={1000}
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="px-3 py-2 text-sm font-medium text-gray-500">
                    Features
                  </p>
                  {ctaList.map((cta) => (
                    <a
                      key={cta.text}
                      href={cta.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                      {cta.text}
                    </a>
                  ))}
                </div>
              </div>
              {/* Removed bottom CTA buttons in favor of Features list above */}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default Menu;
