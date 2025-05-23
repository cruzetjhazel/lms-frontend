import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Library Management System',
  description: 'A modern library management system for efficient book tracking and user management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
