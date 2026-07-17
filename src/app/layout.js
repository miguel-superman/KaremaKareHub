import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from './components/AuthProvider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Kamera Kare Hub — Healthcare Worker Verification Portal',
  description: 'Sign up as an independent healthcare worker. Get verified. Get hired.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}