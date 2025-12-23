'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart, Shield, Users, MessageSquare, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { motion, Variants } from 'framer-motion'
import { LocaleSwitcher } from '@/components/locale-switcher'

export default function Home() {
  const t = useTranslations('Home')

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* Header / Nav */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="fixed top-0 z-50 w-full border-b border-amber-500/10 bg-black/80 backdrop-blur-md"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-200 via-amber-500 to-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.3)] cursor-pointer"
            />
            <span className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-100">LGBT+ Dating</span>
          </div>
          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <Link href="/login">
              <Button variant="ghost" className="text-amber-500/80 hover:text-amber-500 hover:bg-amber-500/5 font-medium transition-all">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20">
          {/* Fondo de lujo con brillos */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-amber-500/5 blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 -z-10 h-96 w-96 rounded-full bg-zinc-500/5 blur-[120px]"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl text-center"
          >
            <motion.div
              variants={itemVariants}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-5 py-2 text-sm font-medium text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.1)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
              </span>
              L'élégance du coeur
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-8 text-6xl font-black tracking-tight sm:text-8xl lg:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 via-zinc-400 to-zinc-600"
            >
              {t.rich('title', {
                br: () => <br className="hidden sm:block" />,
                span: (chunks) => <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200">{chunks}</span>
              })}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mx-auto mb-12 max-w-2xl text-lg text-zinc-500 sm:text-2xl leading-relaxed"
            >
              {t.rich('subtitle', {
                span: (chunks) => <span className="text-amber-500/80 italic">{chunks}</span>
              })}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center justify-center gap-6 sm:flex-row"
            >
              <Link href="/login">
                <Button className="h-16 bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 px-10 text-xl font-black text-black hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(251,191,36,0.2)] sm:w-auto">
                  {t('cta')}
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/forum">
                <Button variant="outline" className="h-16 border-zinc-800 bg-zinc-950/50 px-10 text-xl font-bold text-zinc-300 hover:bg-zinc-900 hover:border-zinc-700 transition-all sm:w-auto">
                  {t('forum_cta')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="border-y border-amber-500/10 bg-zinc-950/20 py-32 px-4 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
              {[
                { icon: Shield, title: 'features.security', desc: 'features.security_desc', color: 'amber-400' },
                { icon: Heart, title: 'features.match', desc: 'features.match_desc', color: 'amber-500' },
                { icon: MessageSquare, title: 'features.chat', desc: 'features.chat_desc', color: 'amber-400' }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.8 }}
                  className="group space-y-6 text-center"
                >
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 border border-amber-500/20 shadow-[0_0_20px_rgba(251,191,36,0.05)] transition-all group-hover:border-amber-500/50 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.1)]">
                    <feature.icon className={`h-8 w-8 text-${feature.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-zinc-200">{t(feature.title)}</h3>
                  <p className="text-zinc-500 leading-relaxed text-lg">
                    {t(feature.desc)}
                  </p>
                </motion.div>
              ))}
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
