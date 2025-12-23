import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart, Shield, Users, MessageSquare, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* Header / Nav */}
      <header className="fixed top-0 z-50 w-full border-b border-amber-500/10 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-200 via-amber-500 to-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.3)]" />
            <span className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-100">LGBT+ Dating</span>
          </div>
          <Link href="/login">
            <Button variant="ghost" className="text-amber-500/80 hover:text-amber-500 hover:bg-amber-500/5 font-medium transition-all">
              Se connecter
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20">
          {/* Fondo de lujo con brillos */}
          <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-amber-500/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 -z-10 h-96 w-96 rounded-full bg-zinc-500/5 blur-[120px]" />

          <div className="max-w-5xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-5 py-2 text-sm font-medium text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
              </span>
              L'élégance du coeur
            </div>

            <h1 className="mb-8 text-6xl font-black tracking-tight sm:text-8xl lg:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 via-zinc-400 to-zinc-600">
              L'excellence <br className="hidden sm:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200">rencontre</span> l'amour.
            </h1>

            <p className="mx-auto mb-12 max-w-2xl text-lg text-zinc-500 sm:text-2xl leading-relaxed">
              La plateforme de rencontre la plus <span className="text-amber-500/80 italic">prestigieuse</span> et inclusive.
              Une expérience sur mesure pour les âmes exigeantes.
            </p>

            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Link href="/login">
                <Button className="h-16 bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 px-10 text-xl font-black text-black hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(251,191,36,0.2)] sm:w-auto">
                  Rejoindre l'Élite
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/forum">
                <Button variant="outline" className="h-16 border-zinc-800 bg-zinc-950/50 px-10 text-xl font-bold text-zinc-300 hover:bg-zinc-900 hover:border-zinc-700 transition-all sm:w-auto">
                  Le Cercle Privé
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-y border-amber-500/10 bg-zinc-950/20 py-32 px-4 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
              <div className="group space-y-6 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 border border-amber-500/20 shadow-[0_0_20px_rgba(251,191,36,0.05)] transition-all group-hover:border-amber-500/50 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.1)]">
                  <Shield className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-zinc-200">Confidentialité Royale</h3>
                <p className="text-zinc-500 leading-relaxed text-lg">
                  Un environnement hautement sécurisé où votre vie privée est notre priorité absolue.
                </p>
              </div>

              <div className="group space-y-6 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 border border-amber-500/20 shadow-[0_0_20px_rgba(251,191,36,0.05)] transition-all group-hover:border-amber-500/50 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.1)]">
                  <Heart className="h-8 w-8 text-amber-500" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-zinc-200">Matches d'Exception</h3>
                <p className="text-zinc-500 leading-relaxed text-lg">
                  Des algorithmes raffinés pour vous connecter avec des personnes qui partagent vos valeurs d'excellence.
                </p>
              </div>

              <div className="group space-y-6 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 border border-amber-500/20 shadow-[0_0_20px_rgba(251,191,36,0.05)] transition-all group-hover:border-amber-500/50 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.1)]">
                  <MessageSquare className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-zinc-200">Échanges Privilégiés</h3>
                <p className="text-zinc-500 leading-relaxed text-lg">
                  Messagerie haute performance et appels vidéo HD pour des moments de pure complicité.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-20 px-4 bg-black">
        <div className="container mx-auto flex flex-col items-center justify-between gap-10 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-200 to-amber-500" />
            <span className="text-lg font-black tracking-tighter uppercase text-zinc-300">Imperial Dating</span>
          </div>
          <p className="text-sm text-zinc-600 font-medium tracking-wide">
            &copy; 2025 L'EXCELLENCE LGBT. L'AMOUR SANS COMPROMIS.
          </p>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-zinc-500">
            <a href="#" className="hover:text-amber-500 transition-colors">Prestige</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Éthique</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
