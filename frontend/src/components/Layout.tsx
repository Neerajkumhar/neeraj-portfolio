import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Code2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import LeetCodeStats from './LeetCodeStats';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Route change should always close the mobile sheet.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const linkClass = (isActive: boolean) =>
    `label transition-colors duration-150 py-2 ${
      isActive
        ? 'text-[var(--accent)]'
        : 'text-[var(--text-soft)] hover:text-[var(--accent)]'
    }`;

  const themeButton =
    'h-10 w-10 flex items-center justify-center rounded-sm text-[var(--text-soft)] hover:text-[var(--accent)] hover:bg-[var(--bg-sunken)] transition-colors duration-150';

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--bg-raised)]/90 backdrop-blur-md border-b border-[var(--rule)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="flex items-center gap-2 font-display text-xl text-[var(--text)] hover:text-[var(--accent)] transition-colors duration-150"
            >
              <Code2 className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
              <span>Neeraj Kumhar</span>
            </Link>

            <div className="hidden md:flex items-center gap-7">
              <nav aria-label="Primary">
                <ul className="flex items-center gap-7">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        aria-current={location.pathname === item.path ? 'page' : undefined}
                        className={linkClass(location.pathname === item.path)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <LeetCodeStats />

              <button type="button" onClick={toggleTheme} className={themeButton} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
                {theme === 'light' ? (
                  <Moon className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Sun className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>

            <div className="md:hidden flex items-center gap-1">
              <button type="button" onClick={toggleTheme} className={themeButton} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
                {theme === 'light' ? (
                  <Moon className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Sun className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                className={themeButton}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[var(--bg-raised)] border-b border-[var(--rule)]">
            <div className="px-5 sm:px-8 py-3">
              <nav aria-label="Mobile">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        aria-current={location.pathname === item.path ? 'page' : undefined}
                        className={`block label px-3 py-3 rounded-sm transition-colors duration-150 ${
                          location.pathname === item.path
                            ? 'text-[var(--accent)] bg-[var(--bg-sunken)]'
                            : 'text-[var(--text-soft)] hover:text-[var(--accent)]'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="px-3 py-3">
                <LeetCodeStats />
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="pt-16">
        {children}
      </main>

      <footer className="bg-[var(--bg-sunken)] border-t border-[var(--rule)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
              <span className="font-display text-lg">Neeraj Kumhar</span>
            </div>
            <p className="label text-[var(--text-faint)]">
              &copy; {new Date().getFullYear()} Neeraj Kumhar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
