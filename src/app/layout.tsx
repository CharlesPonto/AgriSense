import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import FirebaseErrorListener from '@/components/FirebaseErrorListener';

export const metadata: Metadata = {
  title: 'AgriSense - Agricultural Support for Davao',
  description: 'A mobile and web-based agricultural decision support system designed to help farmers in Davao detect crop diseases early, predict harvest yields, and receive weather- and risk-based alerts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=Belleza&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          {children}
          <FirebaseErrorListener />
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
