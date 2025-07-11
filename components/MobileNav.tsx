'use client';

import { Dialog, Transition } from '@headlessui/react';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { Fragment, useState, useEffect, useRef } from 'react';
import Link from './Link';
import headerNavLinks from '@/data/headerNavLinks';
import { AlignJustify, X } from 'lucide-react';
import { Button } from './components/ui/button';
import { Separator } from './components/ui/separator';

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false);
  const navRef = useRef(null);

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        enableBodyScroll(navRef.current);
      } else {
        disableBodyScroll(navRef.current);
      }
      return !status;
    });
  };

  useEffect(() => {
    return clearAllBodyScrollLocks;
  }, []);

  return (
    <>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onToggleNav} 
        className="sm:hidden h-8 w-8"
      >
        <AlignJustify className="h-4 w-4" />
      </Button>
      <Transition appear show={navShow} as={Fragment} unmount={false}>
        <Dialog as="div" onClose={onToggleNav} unmount={false}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            unmount={false}
          >
            <div className="fixed inset-0 z-60 bg-black/25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-95"
            leave="transition ease-in duration-200 transform"
            leaveFrom="translate-x-0 opacity-95"
            leaveTo="translate-x-full opacity-0"
            unmount={false}
          >
            <Dialog.Panel className="fixed left-0 top-0 z-70 h-full w-full bg-white opacity-95 duration-300 dark:bg-gray-950 dark:opacity-[0.98]">
              <nav
                ref={navRef}
                className="flex h-full basis-0 flex-col items-start overflow-y-auto text-left px-4"
              >
                <div className="w-full flex justify-between items-center py-4">
                  <span className="text-lg font-bold tracking-wide text-gray-900 dark:text-gray-100">
                    Menu
                  </span>
                  <Separator orientation="vertical" className="mx-2 h-6" />
                  <Button
                    variant="ghost"
                    aria-label="Toggle Menu"
                    onClick={onToggleNav}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="w-full space-y-2 py-2">
                  {headerNavLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="block w-full py-2 text-lg font-medium tracking-wide text-gray-900 outline-none transition-colors hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
                      onClick={onToggleNav}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </nav>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default MobileNav;