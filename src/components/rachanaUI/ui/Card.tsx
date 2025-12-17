import React from 'react';
import '../css/Card.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'ghost' | 'elevated';
  interactive?: boolean;
  status?: 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
}

export const Card = ({ 
  variant = 'default', 
  interactive = false, 
  status,
  className = '', 
  children, 
  ...props 
}: CardProps) => {
  const variantClass = `card--${variant}`;
  const interactiveClass = interactive ? 'card--interactive' : '';
  const statusClass = status ? `card--status-${status}` : '';

  return (
    <div 
      className={`card ${variantClass} ${interactiveClass} ${statusClass} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`card-header ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={`card-title ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`card-description ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`card-content ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`card-footer ${className}`} {...props}>
    {children}
  </div>
);