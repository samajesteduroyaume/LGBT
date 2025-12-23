'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { GoldLoader } from '@/components/ui/gold-loader'
import { ShieldCheck, ArrowLeft, Mail, Lock } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
    const t = useTranslations('Auth')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !password) return
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            toast.error(error.message)
        } else {
            // Force relocation to dashboard with locale
            window.location.href = '/fr/dashboard'
        }
        setLoading(false)
    }

    const handleSignUp = async () => {
        if (!email || !password) return
        setLoading(true)
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback?next=/fr/dashboard`,
            }
        })
        if (error) {
            toast.error(error.message)
        } else {
            toast.success(t('checkEmail'))
        }
        setLoading(false)
    }

    const handleAnonymousLogin = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signInAnonymously()
        if (error) {
            toast.error(error.message)
        } else {
            router.push('/dashboard')
            router.refresh()
        }
        setLoading(false)
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-black p-4 overflow-hidden selection:bg-amber-500 selection:text-black">
            {/* Background Orbs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 -right-4 w-72 h-72 bg-amber-500/5 rounded-full blur-[120px]" />

            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-zinc-500 hover:text-amber-500 transition-colors uppercase text-[10px] font-black tracking-[0.3em]">
                <ArrowLeft className="h-4 w-4" />
                Retour
            </Link>

            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <GoldLoader />
                        <p className="text-zinc-500 uppercase text-[10px] font-black tracking-[0.3em] animate-pulse">{t('processing')}</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-md"
                    >
                        <Card className="border-amber-500/10 bg-zinc-950/40 backdrop-blur-2xl text-zinc-100 shadow-[0_50px_100px_rgba(0,0,0,0.8)] border-t border-amber-500/20 rounded-[3rem] overflow-hidden p-8">
                            <CardHeader className="space-y-4 text-center pb-8">
                                <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-200 via-amber-500 to-amber-200 p-[1px]">
                                    <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                                        <ShieldCheck className="h-6 w-6 text-amber-500" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <CardTitle className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">
                                        {t('title')}
                                    </CardTitle>
                                    <CardDescription className="text-zinc-500 text-xs font-medium uppercase tracking-widest">
                                        {t('subtitle')}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 group-focus-within:text-amber-500 transition-colors pl-1">
                                            {t('email')}
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-700" />
                                            <Input
                                                type="email"
                                                placeholder="votre@mail-prestige.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="bg-zinc-900/50 border-white/5 h-14 pl-12 rounded-2xl focus-visible:ring-amber-500/30 focus-visible:border-amber-500/30 transition-all placeholder:text-zinc-800"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 group-focus-within:text-amber-500 transition-colors pl-1">
                                            {t('password')}
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-700" />
                                            <Input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="bg-zinc-900/50 border-white/5 h-14 pl-12 rounded-2xl focus-visible:ring-amber-500/30 focus-visible:border-amber-500/30 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-4 pt-6 pb-2">
                                <Button
                                    onClick={handleLogin}
                                    className="w-full h-14 bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 text-black font-black text-sm uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-transform shadow-[0_20px_40px_rgba(251,191,36,0.15)]"
                                >
                                    {t('signIn')}
                                </Button>
                                <div className="flex w-full gap-2">
                                    <Button
                                        variant="ghost"
                                        onClick={handleSignUp}
                                        className="flex-1 h-12 text-zinc-500 hover:text-zinc-200 hover:bg-white/5 font-bold uppercase text-[9px] tracking-[0.2em] rounded-xl transition-all"
                                    >
                                        {t('signUp')}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={handleAnonymousLogin}
                                        className="flex-1 h-12 text-amber-500/50 hover:text-amber-500 hover:bg-amber-500/5 font-bold uppercase text-[9px] tracking-[0.2em] rounded-xl transition-all border border-amber-500/10"
                                    >
                                        {t('guestMode')}
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
