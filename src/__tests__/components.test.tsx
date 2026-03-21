/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <button {...props}>{children}</button>,
    li: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <li {...props}>{children}</li>,
    form: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <form {...props}>{children}</form>,
    path: (props: Record<string, unknown>) => <path {...props} />,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  useInView: () => true,
  animate: jest.fn(() => ({ stop: jest.fn() })),
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    return <img src={typeof props.src === 'string' ? props.src : 'test.png'} alt={props.alt as string} />
  },
}))

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

// Mock next/dynamic
jest.mock('next/dynamic', () => () => {
  const Component = () => <div>Dynamic Component</div>
  Component.displayName = 'DynamicComponent'
  return Component
})

import { Button } from '../app/_components/Button'
import StatsSection from '../app/_components/StatsSection'
import ProcessSection from '../app/_components/ProcessSection'
import TestimonialsSection from '../app/_components/TestimonialsSection'
import Services from '../app/_components/Services'

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button text="Click Me" />)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('renders disabled state', () => {
    render(<Button text="Disabled" disabled={true} type="submit" />)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('renders with aria-label', () => {
    render(<Button text="Submit" ariaLabel="Submit form" />)
    expect(screen.getByLabelText('Submit form')).toBeInTheDocument()
  })
})

describe('StatsSection Component', () => {
  it('renders all stat labels', () => {
    render(<StatsSection />)
    expect(screen.getByText('Projects Delivered')).toBeInTheDocument()
    expect(screen.getByText('Happy Clients')).toBeInTheDocument()
    expect(screen.getByText('Years Experience')).toBeInTheDocument()
    expect(screen.getByText('Support Available')).toBeInTheDocument()
  })
})

describe('ProcessSection Component', () => {
  it('renders all process steps', () => {
    render(<ProcessSection />)
    expect(screen.getByText('Discovery')).toBeInTheDocument()
    expect(screen.getByText('Design')).toBeInTheDocument()
    expect(screen.getByText('Development')).toBeInTheDocument()
    expect(screen.getByText('Delivery')).toBeInTheDocument()
  })
})

describe('TestimonialsSection Component', () => {
  it('renders testimonials with client names', () => {
    render(<TestimonialsSection />)
    expect(screen.getByText('Rajesh Kumar')).toBeInTheDocument()
    expect(screen.getByText('Priya Sharma')).toBeInTheDocument()
    expect(screen.getByText('Amit Patel')).toBeInTheDocument()
  })
})

describe('Services Component', () => {
  it('renders service titles', () => {
    render(<Services />)
    expect(screen.getByText('Our Services')).toBeInTheDocument()
    expect(screen.getByText('Web Development')).toBeInTheDocument()
    expect(screen.getByText('AI & Machine Learning')).toBeInTheDocument()
    expect(screen.getByText('Mobile App Development')).toBeInTheDocument()
  })
})
