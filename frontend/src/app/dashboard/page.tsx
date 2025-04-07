'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, Sidebar, SidebarItem, SidebarItemGroup, SidebarItems  } from "flowbite-react";
export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const access = localStorage.getItem('access');
    if (!access) {
      router.push('/login');
    } else {
      try {
        const payload = JSON.parse(atob(access.split('.')[1]));
        setUsername(payload.username || 'User');
      } catch {
        setUsername('User');
      }
    }
  }, [router]);

  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      {/* Flowbite Navbar */}
      <Navbar fluid rounded className="fixed top-0 left-0 right-0 z-50 border-b dark:border-gray-700">
        <NavbarBrand href="https://flowbite.com">
          <img
            src="https://flowbite.s3.amazonaws.com/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite
          </span>
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          <span className="text-gray-900 dark:text-white">Welcome, {username}</span>
        </NavbarCollapse>
      </Navbar>

      {/* Sidebar Placeholder */}
      <aside
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full md:translate-x-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidenav"
        id="drawer-navigation"
      >
        <Sidebar aria-label="Dashboard Sidebar" className="h-full p-4 overflow-y-auto">
          <SidebarItems>
            <SidebarItemGroup>
              <SidebarItem href="#" icon={() => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" /></svg>}>
                Overview
              </SidebarItem>
              <SidebarItem href="#">
                Messages
              </SidebarItem>
              <SidebarItem href="#">
                Billing
              </SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
      </aside>

      <main className="p-4 md:ml-64 pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64"
            ></div>
          ))}
        </div>
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"></div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
            ></div>
          ))}
        </div>
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
            ></div>
          ))}
        </div>
      </main>
    </div>
  );
}
