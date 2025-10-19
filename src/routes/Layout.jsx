import React from 'react';
import { Outlet, Link, useLocation } from 'react-router';

export default function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/home' || location.pathname === '/';

  return (
    <>
      <header>
        <h1>Pokemon App</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
