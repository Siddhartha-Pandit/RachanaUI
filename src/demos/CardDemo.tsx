import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/rachanaUI/ui/Card';

export default function CardDemo() {
  return (
    <div style={{ padding: 'var(--space-6)', display: 'grid', gap: 'var(--space-6)', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
      
      {/* KPI / Metric Card */}
      <Card status="success">
        <CardHeader>
          <CardDescription>Monthly Revenue</CardDescription>
          <CardTitle>$42,500.00</CardTitle>
        </CardHeader>
        <CardContent>
          <span style={{ color: 'var(--color-success-500)', fontSize: '14px', fontWeight: 600 }}>
            ↑ 12% from last month
          </span>
        </CardContent>
      </Card>

      {/* Interactive Project Card */}
      <Card interactive variant="elevated">
        <CardHeader>
          <CardTitle>RachanaUI Design System</CardTitle>
          <CardDescription>Last updated 2 hours ago</CardDescription>
        </CardHeader>
        <CardContent>
          <p style={{ fontSize: 'var(--type-body-md)' }}>
            Developing a production-grade component library with React and CSS variables.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-1)', marginTop: 'var(--space-2)' }}>
            {/* Mock Tags */}
            <span style={{ background: 'var(--color-neutral-100)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>React</span>
            <span style={{ background: 'var(--color-neutral-100)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>TypeScript</span>
          </div>
        </CardContent>
        <CardFooter>
          <button style={{ padding: '8px 16px', background: 'var(--color-primary-500)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
            View Details
          </button>
        </CardFooter>
      </Card>

      {/* Simple Outlined Card */}
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Dark Mode</span>
            <input type="checkbox" checked readOnly />
          </div>
        </CardContent>
      </Card>

    </div>
  );
}