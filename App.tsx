import React, { ReactNode } from 'react';
import { HashRouter, Routes, Route, Link, NavLink, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import { HomePage, PortfolioPage, PricingPage, AboutPage, ContactPage, LoginPage, SignupPage, DashboardPage, OrderDetailPage, PortfolioManagementPage, CheckoutPage } from './pages';
import { Logo, Button, TwitterIcon, InstagramIcon, LinkedInIcon, ErrorBoundary } from './components';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Navbar: React.FC = () => {
    const { currentUser, logout } = useAuth();
    const location = useLocation();

    return (
        <header className="sticky top-0 bg-brand-surface/70 backdrop-blur-md z-50 border-b border-gray-800">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Logo />
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                        <NavLink 
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) => 
                                `text-lg font-medium transition-colors duration-200 ${isActive ? 'text-brand-gold' : 'text-gray-300 hover:text-brand-text'}`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
                <div className="flex items-center space-x-4">
                    {currentUser ? (
                        <>
                            <Button onClick={() => location.pathname !== '/dashboard' && window.location.assign('#/dashboard')} variant="secondary">Dashboard</Button>
                            <Button onClick={logout} variant="primary">Logout</Button>
                        </>
                    ) : (
                        <Button onClick={() => window.location.assign('#/login')} variant="primary">Login</Button>
                    )}
                </div>
            </nav>
        </header>
    );
}

const Footer: React.FC = () => {
  const socialLinks = [
      { name: 'Twitter', href: '#', icon: TwitterIcon },
      { name: 'Instagram', href: '#', icon: InstagramIcon },
      { name: 'LinkedIn', href: '#', icon: LinkedInIcon },
  ];

  return (
    <footer className="bg-brand-surface/70 backdrop-blur-md border-t border-gray-800">
      <div className="container mx-auto px-4 py-8 text-center text-gray-400">
        <div className="flex justify-center space-x-6 mb-6">
            {socialLinks.map((item) => (
                <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-brand-gold transition-colors duration-300"
                    aria-label={item.name}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <item.icon className="h-6 w-6" />
                </a>
            ))}
        </div>
        <p>&copy; {new Date().getFullYear()} Navaneethan Editor. All Rights Reserved.</p>
        <p className="text-sm mt-2">Crafting Cinematic Stories with Passion</p>
      </div>
    </footer>
  )
}

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { currentUser, loading } = useAuth();
    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-gold"></div>
        </div>
    );
    return currentUser ? <>{children}</> : <Navigate to="/login" />;
};


const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/pricing" element={<PricingPage />} />
        <Route path="/checkout/:packageId" element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        } />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/order/:orderId" element={
                  <ProtectedRoute>
                      <OrderDetailPage />
                  </ProtectedRoute>
              }/>
              <Route path="/admin/portfolio" element={
                  <ProtectedRoute>
                      <PortfolioManagementPage />
                  </ProtectedRoute>
              }/>
            </Routes>
          </Layout>
        </HashRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;