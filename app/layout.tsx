import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Oscars 2026 Explorer',
  description: 'Browse 2026 Oscar nominees by category or film.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
