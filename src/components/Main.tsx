import { Outlet, ScrollRestoration } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FaBars } from 'react-icons/fa6';
import { useState } from 'react';
import Spinner from './Spinner';

const Main = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const asideDefaultStyles = 'fixed top-0 left-0 z-40 w-xs h-screen transition-transform -translate-x-full lg:translate-x-0';

  return (
    <div className="text-zinc-800 dark:text-zinc-200">
      <button
        id="sidebar-trigger"
        type="button"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed items-center p-2 mt-2 ml-3 text-sm text-blue-500 rounded-lg z-10 lg:hidden hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:hover:bg-zinc-700 dark:focus:ring-zinc-600"
      >
        <span className="sr-only">Open sidebar</span>
        <FaBars className="w-6 h-6" aria-hidden="true"/>
      </button>
      <aside
        className={`${asideDefaultStyles} ${sidebarOpen ? 'translate-x-0' : ''}`}
      >
        <Sidebar onUserSelection={() => setSidebarOpen(false)}/>
      </aside>
      <div
        role="main"
        className="lg:ml-[350px]"
        onClick={() => setSidebarOpen(false)}>
        <div className="relative">
          <Spinner/>
          <Outlet/>
        </div>
      </div>
      <ScrollRestoration/>
    </div>
  );
};

export default Main;