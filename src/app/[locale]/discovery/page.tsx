'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChevronRight, Check, X, Heart, SlidersHorizontal, Sparkles, ShieldCheck, Video } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { GoldLoader } from '@/components/ui/gold-loader'
import { toast } from 'sonner'
import Image from 'next/image'
import Link from 'next/link'

export default function DiscoveryPage() {
    const [profiles, setProfiles] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)
    const [showFilters, setShowFilters] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        async function fetchProfiles() {
            setLoading(true)
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .neq('id', user.id)
                .limit(20)

            if (data) setProfiles(data)
            setLoading(false)
        }
        fetchProfiles()
    }, [supabase])

    const handleLike = async (profileId: string) => {
        setDirection(1)
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        // 1. Enregistrer le Like
        const { error } = await supabase
            .from('likes')
            .upsert({ sender_id: user.id, receiver_id: profileId })

        if (error) {
            toast.error("Erreur lors de l'expression de votre intérêt.")
        } else {
            // 2. Vérifier si c'est un Match mutuel
            const { data: matchData } = await supabase
                .from('likes')
                .select('*')
                .eq('sender_id', profileId)
                .eq('receiver_id', user.id)
                .single()

            if (matchData) {
                toast.success('Incroyable ! C\'est un Match Impérial !', {
                    description: "Une nouvelle connexion d'exception vient de naître.",
                    icon: <Sparkles className="h-4 w-4 text-amber-500" />
                })
                // Logique optionnelle : Créer une entrée dans 'matches'
                await supabase.from('matches').upsert({ user_1: user.id, user_2: profileId, status: 'match' })
            } else {
                toast.success('Intérêt manifesté avec élégance.')
            }
        }

        setTimeout(() => nextProfile(), 200)
    }

    const handleDislike = () => {
        setDirection(-1)
        setTimeout(() => nextProfile(), 200)
    }

    const nextProfile = () => {
        setCurrentIndex((prev) => prev + 1)
        setDirection(0)
    }

    if (loading) return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black gap-6">
            <GoldLoader />
            <p className="text-amber-500/60 font-medium uppercase tracking-[0.3em] text-xs animate-pulse">Recherche d'excellence...</p>
        </div>
    )

    if (currentIndex >= profiles.length) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black text-white p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">Silence Royal</h2>
                    <p className="text-zinc-500 text-lg uppercase tracking-widest font-medium">L'exceptionnel se fait attendre.</p>
                    <Button
                        variant="ghost"
                        onClick={() => setCurrentIndex(0)}
                        className="mt-6 text-amber-500 hover:text-amber-400 hover:bg-amber-500/5 uppercase text-[10px] tracking-widest font-black"
                    >
                        Relancer la quête
                    </Button>
                </motion.div>
            </div>
        )
    }

    const currentProfile = profiles[currentIndex]

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4 overflow-hidden relative">
            {/* Header Discovery */}
            <div className="absolute top-8 left-0 right-0 px-8 flex justify-between items-center z-20">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-100">Découverte</span>
                </div>
                <button
                    onClick={() => setShowFilters(true)}
                    className="h-10 w-10 rounded-xl bg-zinc-950 border border-amber-500/10 flex items-center justify-center text-zinc-500 hover:text-amber-500 hover:border-amber-500/30 transition-all"
                >
                    <SlidersHorizontal className="h-5 w-5" />
                </button>
            </div>

            {/* Modale de Filtres */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed inset-x-4 bottom-8 top-20 z-[60] bg-zinc-950/95 backdrop-blur-2xl border border-amber-500/20 rounded-[2rem] p-8 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">Préférences d'Élite</h2>
                            <button onClick={() => setShowFilters(false)} className="text-zinc-600 hover:text-white">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="space-y-10">
                            <section className="space-y-4">
                                <label className="text-[10px] uppercase tracking-widest font-black text-amber-500/60">Statut de Membre</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="flex items-center justify-center gap-2 h-14 rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-200 text-xs font-bold uppercase tracking-widest">
                                        <ShieldCheck className="h-4 w-4" /> Certifié Only
                                    </button>
                                    <button className="flex items-center justify-center gap-2 h-14 rounded-xl bg-black border border-white/5 text-zinc-600 text-xs font-bold uppercase tracking-widest">
                                        Tous
                                    </button>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <label className="text-[10px] uppercase tracking-widest font-black text-amber-500/60">Rayon de Présence</label>
                                <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden relative">
                                    <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-amber-200 to-amber-500" />
                                </div>
                                <div className="flex justify-between text-[10px] font-bold text-zinc-700 uppercase tracking-widest">
                                    <span>2 km</span>
                                    <span>50 km</span>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <label className="text-[10px] uppercase tracking-widest font-black text-amber-500/60">Intérêts Communs</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Mode', 'Arts', 'Gastronomie', 'Voyages Luxe', 'Opéra'].map(tag => (
                                        <span key={tag} className="px-4 py-2 rounded-full border border-white/5 bg-white/5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <Button
                            onClick={() => setShowFilters(false)}
                            className="w-full mt-12 bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 text-black font-black uppercase tracking-widest h-14 shadow-2xl"
                        >
                            Appliquer les critères
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="w-full max-w-md relative aspect-[3/4]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentProfile.id}
                        initial={{ opacity: 0, x: direction * 100, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: direction * -100, scale: 0.9 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full"
                    >
                        <Card className="w-full h-full border-amber-500/10 bg-zinc-950 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-t border-amber-500/20 rounded-[2.5rem] relative">
                            <div className="h-full w-full relative">
                                {currentProfile.avatar_url ? (
                                    <Image
                                        src={currentProfile.avatar_url}
                                        alt={currentProfile.username}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center bg-zinc-900 text-amber-500/30 text-6xl font-black italic">
                                        {currentProfile.username?.charAt(0)}
                                    </div>
                                )}

                                {/* Bouton Visio Rapide Or */}
                                <Link href="/visio" className="absolute top-6 left-6 z-10">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 backdrop-blur-xl flex items-center justify-center text-amber-500 shadow-2xl"
                                    >
                                        <Video className="h-6 w-6" />
                                    </motion.button>
                                </Link>

                                {/* Badge de vérification Argent Poli */}
                                {currentProfile.is_verified && (
                                    <div className="absolute top-6 right-6 z-10">
                                        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md shadow-xl border-t border-zinc-100/20">
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-100 p-[1px]">
                                                <div className="flex h-full w-full items-center justify-center rounded-full bg-black">
                                                    <Check className="h-3 w-3 text-zinc-100" />
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-100">Certifié Elite</span>
                                        </div>
                                    </div>
                                )}

                                <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black via-black/90 to-transparent">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">
                                            {currentProfile.username}
                                        </h3>
                                    </div>
                                    <p className="text-zinc-500 text-sm font-medium tracking-wide line-clamp-2 uppercase italic leading-relaxed">
                                        {currentProfile.bio || "Une âme en quête d'exception."}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex gap-12 mt-12">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-20 w-20 rounded-full border-white/5 bg-zinc-950 text-zinc-600 hover:text-zinc-300 hover:border-zinc-500/40 transition-all shadow-xl satin-shadow"
                        onClick={handleDislike}
                    >
                        <X className="h-10 w-10" />
                    </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-20 w-20 rounded-full border-amber-500/20 bg-zinc-950 text-amber-500 hover:text-amber-400 hover:border-amber-500 hover:bg-amber-500/10 transition-all shadow-[0_0_30px_rgba(251,191,36,0.3)] satin-shadow"
                        onClick={() => handleLike(currentProfile.id)}
                    >
                        <Heart className="h-10 w-10 fill-current" />
                    </Button>
                </motion.div>
            </div>
        </div >
    )
}
