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
  robots: {
    index: true,
    follow: true,
  }
}

import { Toaster } from "@/components/ui/sonner"
import { BottomNav } from "@/components/bottom-nav"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark">
      <body className="antialiased pb-16 md:pb-0">
        {children}
        <BottomNav />
        <Toaster />
      </body>
    </html>
  )
}
