import './globals.css';
import Shell from '@/components/Shell';

export const metadata = {
  title: 'Finanzas',
  description: 'App de finanzas personales',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Finanzas',
  },
};

export const viewport = {
  themeColor: '#4f46e5',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
