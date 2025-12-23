import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart, Shield, Users, MessageSquare, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white selection:bg-zinc-100 selection:text-zinc-950">
      {/* Header / Nav */}
      <header className="fixed top-0 z-50 w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-zinc-100 to-zinc-400 shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
            <span className="text-xl font-bold tracking-tighter">LGBT+ Dating</span>
          </div>
          <Link href="/login">
            <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-900">
              Se connecter
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20">
          {/* Background elements */}
          <div className="absolute top-1/4 left-1/4 -z-10 h-64 w-64 rounded-full bg-zinc-500/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 -z-10 h-64 w-64 rounded-full bg-zinc-100/10 blur-[120px]" />

          <div className="max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-sm font-medium text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-100 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-100"></span>
              </span>
              Nouveau : Appels vidéo inclusifs
            </div>

            <h1 className="mb-6 text-5xl font-black tracking-tight sm:text-7xl lg:text-8xl">
              Soyez <span className="text-zinc-400">vous-même</span>, trouvez l'amour.
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400 sm:text-xl">
              La plateforme de rencontre la plus sûre et la plus inclusive pour la communauté LGBT+.
              Découvrez des profils authentiques dans un espace bienveillant.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/login">
                <Button className="h-14 bg-zinc-100 px-8 text-lg font-bold text-zinc-900 hover:bg-zinc-200 sm:w-auto">
                  Commencer l'aventure
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/forum">
                <Button variant="outline" className="h-14 border-zinc-800 bg-transparent px-8 text-lg font-semibold hover:bg-zinc-900 sm:w-auto">
                  Explorer le Forum
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-zinc-900 bg-zinc-950/50 py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              <div className="group space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 transition-colors group-hover:border-zinc-700">
                  <Shield className="h-6 w-6 text-zinc-100" />
                </div>
                <h3 className="text-xl font-bold">Sécurité Maximale</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Modération proactive et outils de signalement avancés pour garantir un espace sans harcèlement.
                </p>
              </div>

              <div className="group space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 transition-colors group-hover:border-zinc-700">
                  <Users className="h-6 w-6 text-zinc-100" />
                </div>
                <h3 className="text-xl font-bold">Communauté Engagée</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Participez à des discussions thématiques sur notre forum et créez des liens au-delà du simple match.
                </p>
              </div>

              <div className="group space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 transition-colors group-hover:border-zinc-700">
                  <MessageSquare className="h-6 w-6 text-zinc-100" />
                </div>
                <h3 className="text-xl font-bold">Temps Réel</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Chat ultra-rapide et appels vidéo de haute qualité pour des connexions instantanées et authentiques.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 px-4 shadow-[0_-1px_20px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-zinc-100" />
            <span className="text-sm font-bold tracking-tight">LGBT+ Dating</span>
          </div>
          <p className="text-sm text-zinc-500">
            &copy; 2025 LGBT+ Dating platform. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">CGU</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
