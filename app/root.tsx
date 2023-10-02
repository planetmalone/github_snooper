import type { LinksFunction } from '@vercel/remix';
import { json } from '@vercel/remix';
import { cssBundleHref } from '@remix-run/css-bundle';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import stylesheet from './index.css';
import { FaBars } from 'react-icons/fa6';
import Sidebar from '~/components/Sidebar';
import Spinner from '~/components/Spinner';

export async function loader() {
  return json({
    ENV: {
      GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    }
  });
}

export const links: LinksFunction = () => [
  { rel: 'icon', href: '/favicon.ico' },
  { rel: 'manifest', href: '/manifest.json"/' },
  { rel: 'stylesheet', href: stylesheet },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export default function Root() {
  const { ENV } = useLoaderData<typeof loader>();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const asideDefaultStyles = 'fixed top-0 left-0 z-40 w-xs h-screen transition-transform -translate-x-full lg:translate-x-0';

  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <Meta/>
      <Links/>
      <title>GitHub Snooper</title>
    </head>
    <body>
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
    <ScrollRestoration/>
    <script
      dangerouslySetInnerHTML={{
        __html: `window.ENV = ${JSON.stringify(ENV)}`
      }}
    ></script>
    <Scripts/>
    <LiveReload/>
    </body>
    </html>
  );
}