import React, { useState, useEffect, createContext, useContext } from 'react';
import { Menu, X, ChevronDown, Search, Bell, User } from 'lucide-react';
import '../css/Navbar.css'; // The CSS file provided below

// --- 1. Types & Context ---

interface NavbarContextType {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  isScrolled: boolean;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) throw new Error('useNavbar must be used within a Navbar');
  return context;
};

// --- 2. Main Component ---

interface NavbarProps {
  children: React.ReactNode;
  sticky?: boolean;
  className?: string;
}

export const Navbar = ({ children, sticky = true, className = '' }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  return (
    <NavbarContext.Provider value={{
      isMobileMenuOpen,
      toggleMobileMenu: () => setIsMobileMenuOpen(!isMobileMenuOpen),
      closeMobileMenu: () => setIsMobileMenuOpen(false),
      isScrolled
    }}>
      <nav 
        className={`navbar ${sticky ? 'navbar--sticky' : ''} ${isScrolled ? 'navbar--scrolled' : ''} ${className}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-container">
          {children}
        </div>
      </nav>
      
      {/* Mobile Drawer Portal */}
      <MobileDrawer>{children}</MobileDrawer>
    </NavbarContext.Provider>
  );
};

// --- 3. Slot Components ---

export const NavbarStart = ({ children }: { children: React.ReactNode }) => (
  <div className="navbar-start">
    <HamburgerTrigger />
    {children}
  </div>
);

export const NavbarCenter = ({ children }: { children: React.ReactNode }) => (
  <div className="navbar-center desktop-only">
    {children}
  </div>
);

export const NavbarEnd = ({ children }: { children: React.ReactNode }) => (
  <div className="navbar-end">
    {children}
  </div>
);

// --- 4. Navigation Items ---

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
  active?: boolean;
  icon?: React.ElementType;
  onClick?: () => void;
}

export const NavItem = ({ children, href = "#", active, icon: Icon, onClick }: NavItemProps) => {
  return (
    <a 
      href={href} 
      className={`nav-item ${active ? 'active' : ''}`}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
    >
      {Icon && <Icon size={18} className="nav-icon" />}
      <span className="nav-label">{children}</span>
    </a>
  );
};

export const NavMenu = ({ label, children }: { label: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="nav-menu-wrapper"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        className={`nav-item nav-menu-trigger ${isOpen ? 'open' : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {label}
        <ChevronDown size={14} className={`chevron ${isOpen ? 'rotate' : ''}`} />
      </button>
      
      {/* Dropdown Content */}
      <div className={`nav-dropdown ${isOpen ? 'visible' : ''}`}>
        <div className="nav-dropdown-card">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- 5. Mobile Specifics ---

const HamburgerTrigger = () => {
  const { toggleMobileMenu, isMobileMenuOpen } = useNavbar();
  return (
    <button 
      className="hamburger-btn mobile-only" 
      onClick={toggleMobileMenu}
      aria-label="Toggle menu"
      aria-expanded={isMobileMenuOpen}
    >
      {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
};

// This extracts NavItems from children to render them in the mobile drawer
const MobileDrawer = ({ children }: { children: React.ReactNode }) => {
  const { isMobileMenuOpen, closeMobileMenu } = useNavbar();

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`mobile-backdrop ${isMobileMenuOpen ? 'open' : ''}`} 
        onClick={closeMobileMenu}
      />
      
      {/* Drawer */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <span className="text-sm font-bold">Menu</span>
          <button className="icon-btn" onClick={closeMobileMenu}><X size={20}/></button>
        </div>
        <div className="mobile-drawer-content">
          {/* We assume the consumer passes NavItems into NavbarCenter. 
              In a real app, you might pass a 'links' prop, but here we render contextually. */}
           <div className="mobile-nav-group">
             {/* Placeholder for demonstration - in production, map your routes here */}
             <NavItem href="#" active onClick={closeMobileMenu}>Dashboard</NavItem>
             <NavItem href="#" onClick={closeMobileMenu}>Projects</NavItem>
             <NavItem href="#" onClick={closeMobileMenu}>Team</NavItem>
             <NavItem href="#" onClick={closeMobileMenu}>Settings</NavItem>
           </div>
        </div>
      </div>
    </>
  );
};

// --- 6. Helper Components (Buttons/Logos) ---

export const IconButton = ({ icon: Icon, onClick }: { icon: any, onClick?: () => void }) => (
  <button className="icon-btn" onClick={onClick}>
    <Icon size={20} />
  </button>
);