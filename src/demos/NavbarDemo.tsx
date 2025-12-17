import React from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  Settings, 
  Search, 
  Bell, 
  HelpCircle, 
  CreditCard, 
  LogOut, 
  Box 
} from 'lucide-react';
import { 
  Navbar, 
  NavbarStart, 
  NavbarCenter, 
  NavbarEnd, 
  NavItem, 
  NavMenu, 
  IconButton 
} from '../components/rachanaUI/ui/Navbar'; // Adjust path if needed

export default function NavbarDemo() {
  return (
    <div style={{ minHeight: '150vh', background: 'var(--color-surface)' }}>
      
      {/* ======================================= */}
      {/* 1. NAVBAR COMPONENT USAGE               */}
      {/* ======================================= */}
      <Navbar sticky>
        
        {/* SLOT: START (Logo & Branding) */}
        <NavbarStart>
          <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <div style={{ 
              width: 32, 
              height: 32, 
              background: 'var(--color-primary-600)', 
              borderRadius: 'var(--radius-sm)', 
              display: 'grid', 
              placeItems: 'center',
              color: 'white'
            }}>
              <Box size={20} strokeWidth={3} />
            </div>
            <span style={{ 
              fontWeight: 700, 
              fontSize: '18px', 
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)' 
            }}>
              Rachana<span style={{ color: 'var(--color-primary-600)' }}>UI</span>
            </span>
          </div>
        </NavbarStart>

        {/* SLOT: CENTER (Main Navigation) */}
        <NavbarCenter>
          <NavItem active icon={LayoutDashboard}>Dashboard</NavItem>
          <NavItem icon={FolderKanban}>Projects</NavItem>
          <NavItem icon={Users}>Team</NavItem>
          
          {/* Dropdown Menu Example */}
          <NavMenu label="Resources">
            <NavItem icon={HelpCircle}>Documentation</NavItem>
            <NavItem icon={Box}>API Reference</NavItem>
            <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
            <NavItem icon={CreditCard}>Billing</NavItem>
          </NavMenu>
        </NavbarCenter>

        {/* SLOT: END (Global Actions) */}
        <NavbarEnd>
          {/* Search Trigger */}
          <div className="hidden md:flex" style={{ marginRight: '4px' }}>
            <IconButton icon={Search} onClick={() => console.log('Open Search')} />
          </div>
          
          <IconButton icon={Bell} onClick={() => console.log('Open Notifications')} />
          <IconButton icon={Settings} onClick={() => console.log('Open Settings')} />
          
          {/* User Profile Avatar */}
          <div 
            role="button"
            tabIndex={0}
            style={{ 
              width: 32, 
              height: 32, 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, var(--color-primary-200), var(--color-primary-100))', 
              border: '1px solid var(--border)',
              display: 'grid', 
              placeItems: 'center', 
              fontSize: '12px', 
              fontWeight: 700, 
              color: 'var(--color-primary-800)',
              marginLeft: 'var(--space-2)',
              cursor: 'pointer'
            }}
          >
            JD
          </div>
        </NavbarEnd>

      </Navbar>

      {/* ======================================= */}
      {/* 2. DUMMY PAGE CONTENT (For Scrolling)   */}
      {/* ======================================= */}
      <main style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: 'var(--space-6) var(--space-4)' 
      }}>
        
        {/* Header Section */}
        <header style={{ marginBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
            <span style={{ 
              fontSize: 'var(--type-body-sm)', 
              fontWeight: 600, 
              color: 'var(--color-primary-600)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em' 
            }}>
              Overview
            </span>
          </div>
          <h1 style={{ 
            fontSize: 'var(--type-h3)', 
            fontWeight: 'var(--font-weight-bold)', 
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em'
          }}>
            Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginTop: 'var(--space-2)' }}>
            Welcome back, John. Here is what’s happening with your projects today.
            Scroll down to test the sticky navbar shadow behavior.
          </p>
        </header>

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-6)'
        }}>
          {[1, 2, 3].map((item) => (
            <div key={item} style={{ 
              background: 'var(--color-surface-elevated)', 
              border: '1px solid var(--border)', 
              borderRadius: 'var(--radius-md)', 
              padding: 'var(--space-5)',
              boxShadow: 'var(--shadow-1)'
            }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Total Revenue</div>
              <div style={{ fontSize: '32px', fontWeight: 700 }}>$12,40{item}.00</div>
              <div style={{ color: 'var(--color-success-500)', fontSize: '14px', marginTop: '4px' }}>+12% from last month</div>
            </div>
          ))}
        </div>

        {/* Long Content for Scroll Testing */}
        <div style={{ 
          background: 'var(--color-surface-elevated)', 
          border: '1px solid var(--border)', 
          borderRadius: 'var(--radius-md)', 
          padding: 'var(--space-6)',
          height: '800px' 
        }}>
          <h3 style={{ fontSize: 'var(--type-body-lg)', marginBottom: 'var(--space-4)' }}>Recent Activity</h3>
          
          {[...Array(10)].map((_, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--space-3)', 
              padding: 'var(--space-3) 0', 
              borderBottom: i < 9 ? '1px solid var(--border)' : 'none' 
            }}>
              <div style={{ 
                width: 40, height: 40, borderRadius: '50%', 
                background: 'var(--color-neutral-100)' 
              }} />
              <div>
                <div style={{ fontWeight: 500 }}>New deployment triggered</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>2 minutes ago by <strong>Sarah Connor</strong></div>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}