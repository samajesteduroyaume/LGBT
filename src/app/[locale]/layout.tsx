import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'LGBT+ Dating | Rencontres Bienveillantes',
    template: '%s | LGBT+ Dating'
  },
  description: 'La plateforme de rencontre moderne, sécurisée et inclusive pour la communauté LGBT+.',
  keywords: ['rencontre', 'lgbt', 'gay', 'lesbienne', 'trans', 'dating', 'safe space', 'inclusif'],
  authors: [{ name: 'LGBT+ Dating Team' }],
  creator: 'LGBT+ Dating',
  metadataBase: new URL('https://votre-projet.vercel.app'), // À mettre à jour lors du déploiement
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://votre-projet.vercel.app',
    title: 'LGBT+ Dating | Rencontres Bienveillantes',
    description: 'La plateforme de rencontre moderne, sécurisée et inclusive pour la communauté LGBT+.',
    siteName: 'LGBT+ Dating',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LGBT+ Dating | Rencontres Bienveillantes',
    description: 'La plateforme de rencontre moderne, sécurisée et inclusive pour la communauté LGBT+.',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-512x512.png',
    apple: '/icons/icon-512x512.png',
  },
  themeColor: '#000000',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover'
  },
  robots: {
    index: true,
    follow: true,
  }
}

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Toaster } from "@/components/ui/sonner";
import { BottomNav } from "@/components/bottom-nav";
import "../globals.css";

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!['en', 'fr', 'de', 'es'].includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className="antialiased pb-16 md:pb-0">
        <NextIntlClientProvider messages={messages}>
          {children}
          <BottomNav />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
