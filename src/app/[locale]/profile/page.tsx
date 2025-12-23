'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Camera, Loader2, Check, Star, Crown, Gift, Sparkles, Diamond, Wine, Gem, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog'

const PRESTIGE_GIFTS = [
    { id: '1', name: 'Champagne Impérial', icon: Wine, price: 50, color: 'text-amber-400' },
    { id: '2', name: 'Diadème d\'Or', icon: Crown, price: 150, color: 'text-amber-500' },
    { id: '3', name: 'Diamant du Cercle', icon: Diamond, price: 500, color: 'text-zinc-100' },
    { id: '4', name: 'Aura Mystique', icon: Sparkles, price: 75, color: 'text-amber-200' },
    { id: '5', name: 'Gemme Rare', icon: Gem, price: 200, color: 'text-amber-600' },
]

export default function ProfilePage() {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const [isVerified, setIsVerified] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [affinityScore, setAffinityScore] = useState(85)
    const [isCalculating, setIsCalculating] = useState(false)
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        async function getProfile() {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setUser(user)
                const { data, error } = await supabase
                    .from('profiles')
                    .select('username, bio, avatar_url, is_verified')
                    .eq('id', user.id)
                    .single()

                if (data) {
                    setUsername(data.username || '')
                    setBio(data.bio || '')
                    setAvatarUrl(data.avatar_url || '')
                    setIsVerified(data.is_verified || false)
                }
            } else {
                router.push('/login')
            }
            setLoading(false)
        }

        getProfile()
    }, [supabase, router])

    const simulateAffinity = () => {
        setIsCalculating(true)
        setAffinityScore(0)
        setTimeout(() => {
            setAffinityScore(Math.floor(Math.random() * (99 - 80 + 1)) + 80)
            setIsCalculating(false)
            toast.success("Analyse d'aura terminée", {
                description: "Votre prestige a été réévalué avec succès.",
                icon: <Sparkles className="h-4 w-4 text-amber-500" />
            })
        }, 2000)
    }

    const updateProfile = async () => {
        setLoading(true)
        const { error } = await supabase.from('profiles').upsert({
            id: user.id,
            username,
            bio,
            avatar_url: avatarUrl,
            updated_at: new Date().toISOString(),
        })

        if (error) {
            toast.error(error.message)
        } else {
            toast.success('Profil mis à jour !')
        }
        setLoading(false)
    }

    const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('Vous devez sélectionner une image.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${user.id}-${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            const { data } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath)

            setAvatarUrl(data.publicUrl)
            toast.success('Image téléchargée ! N\'oubliez pas de sauvegarder votre profil.')
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setUploading(false)
        }
    }

    if (loading) return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black gap-6">
            <Loader2 className="h-12 w-12 animate-spin text-amber-500" />
            <p className="text-amber-500/60 font-medium uppercase tracking-[0.3em] text-xs">Accès au cercle...</p>
        </div>
    )

    return (
        <div className="flex min-h-screen flex-col items-center bg-black p-4 pb-32 pt-10 overflow-x-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
                {/* Colonne Gauche : Profil Principal */}
                <Card className="lg:col-span-2 border-amber-500/10 bg-zinc-950/50 backdrop-blur-md text-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t border-amber-500/20">
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            <div className="relative group">
                                <Avatar className="h-32 w-32 border-2 border-amber-500/20 shadow-[0_0_20px_rgba(251,191,36,0.1)] transition-all group-hover:border-amber-500/50">
                                    <AvatarImage src={avatarUrl} className="object-cover" />
                                    <AvatarFallback className="bg-zinc-900 text-amber-500 text-4xl font-black italic">
                                        {username?.charAt(0).toUpperCase() || '?'}
                                    </AvatarFallback>
                                </Avatar>
                                <label
                                    htmlFor="avatar-upload"
                                    className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity backdrop-blur-sm"
                                >
                                    {uploading ? <Loader2 className="h-8 w-8 animate-spin text-amber-500" /> : <Camera className="h-8 w-8 text-amber-500" />}
                                    <input
                                        type="file"
                                        id="avatar-upload"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={uploadAvatar}
                                        disabled={uploading}
                                    />
                                </label>
                            </div>
                            <div className="text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row items-center gap-3">
                                    <CardTitle className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">{username || "Identité Royale"}</CardTitle>
                                    {isVerified && (
                                        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md shadow-xl border-t border-zinc-100/20">
                                            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-100 p-[1px]">
                                                <div className="flex h-full w-full items-center justify-center rounded-full bg-black">
                                                    <Check className="h-2.5 w-2.5 text-zinc-100" />
                                                </div>
                                            </div>
                                            <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-100">Certifié Elite</span>
                                        </div>
                                    )}
                                </div>
                                <CardDescription className="text-zinc-600 uppercase text-[10px] tracking-[0.2em] font-bold mt-2">Membre du cercle prestigieux</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-8 mt-4">
                        <div className="space-y-3">
                            <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500">Nom de Prestige</label>
                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Votre pseudo éminent..."
                                className="h-12 border-amber-500/10 bg-black/50 focus-visible:ring-amber-500/30 focus-visible:border-amber-500/50 text-zinc-200 placeholder:text-zinc-700 transition-all font-medium rounded-xl"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500">Votre Aura (Bio)</label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Partagez votre aura avec le cercle..."
                                className="w-full h-40 rounded-2xl border border-amber-500/10 bg-black/50 p-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/20 focus-visible:border-amber-500/40 text-zinc-300 placeholder:text-zinc-700 transition-all leading-relaxed"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t border-amber-500/5 pt-8 bg-black/20 pb-8 rounded-b-3xl">
                        <Button variant="ghost" onClick={() => router.push('/')} className="text-zinc-600 hover:text-zinc-400 hover:bg-zinc-900/50 font-bold uppercase text-[10px] tracking-widest">
                            Retour
                        </Button>
                        <Button onClick={updateProfile} disabled={loading} className="bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 text-black font-black uppercase tracking-widest px-10 h-14 shadow-[0_10px_30px_rgba(251,191,36,0.2)] hover:scale-105 transition-transform rounded-xl">
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Confirmer'}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Colonne Droite : Prestige & IA */}
                <div className="space-y-8">
                    {/* Score d'Affinité IA */}
                    <Card className="border-amber-500/10 bg-zinc-950/50 backdrop-blur-md text-zinc-100 shadow-xl border-t border-amber-500/20">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-amber-500" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Affinité IA Elite</span>
                                </div>
                                <button onClick={simulateAffinity} disabled={isCalculating} className="text-zinc-600 hover:text-amber-500 transition-colors">
                                    <Loader2 className={`h-3 w-3 ${isCalculating ? 'animate-spin' : ''}`} />
                                </button>
                            </div>
                        </CardHeader>
                        <CardContent className="text-center py-6">
                            <div className="relative inline-flex items-center justify-center">
                                <svg className="h-32 w-32">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="58"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="transparent"
                                        className="text-zinc-900"
                                    />
                                    <motion.circle
                                        cx="64"
                                        cy="64"
                                        r="58"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="transparent"
                                        strokeDasharray="364.4"
                                        initial={{ strokeDashoffset: 364.4 }}
                                        animate={{ strokeDashoffset: 364.4 * (1 - affinityScore / 100) }}
                                        transition={{ duration: 2, ease: "easeOut" }}
                                        className="text-amber-500"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-black text-zinc-100">{affinityScore}%</span>
                                    <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Aura Harmony</span>
                                </div>
                            </div>
                            <p className="mt-4 text-xs text-zinc-500 px-4">Votre prestige est évalué à un niveau exceptionnel.</p>
                        </CardContent>
                    </Card>

                    {/* Cadeaux de Prestige */}
                    <Card className="border-amber-500/10 bg-zinc-950/50 backdrop-blur-md text-zinc-100 shadow-xl border-t border-amber-500/20">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                                <Crown className="h-4 w-4 text-amber-200" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Trésors du Cercle</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-2">
                                {PRESTIGE_GIFTS.slice(0, 3).map((gift) => (
                                    <motion.div
                                        key={gift.id}
                                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(251, 191, 36, 0.05)' }}
                                        className="aspect-square rounded-xl bg-black/40 border border-white/5 flex flex-col items-center justify-center gap-1 group cursor-pointer"
                                    >
                                        <gift.icon className={`h-5 w-5 ${gift.color} opacity-40 group-hover:opacity-100 transition-colors`} />
                                        <span className="text-[7px] font-black text-zinc-700 group-hover:text-zinc-400 uppercase tracking-tighter text-center px-1 leading-tight">{gift.name}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="ghost" className="w-full mt-4 h-8 text-[8px] uppercase font-black tracking-widest text-zinc-600 hover:text-amber-200 hover:bg-amber-500/5">
                                        Voir la collection complète
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md bg-zinc-950 border-amber-500/20 text-white shadow-[0_0_50px_rgba(251,191,36,0.1)] rounded-[2rem]">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">Galerie de Prestige</DialogTitle>
                                        <DialogDescription className="text-zinc-500 uppercase text-[9px] tracking-widest font-bold">Échangez des trésors avec le cercle</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid grid-cols-2 gap-4 py-8">
                                        {PRESTIGE_GIFTS.map((gift) => (
                                            <motion.div
                                                key={gift.id}
                                                whileHover={{ scale: 1.05 }}
                                                className="flex flex-col items-center justify-center p-6 rounded-2xl bg-black border border-white/5 group cursor-pointer hover:border-amber-500/30 transition-all"
                                                onClick={() => toast.success(`Cadeau sélectionné: ${gift.name}`)}
                                            >
                                                <gift.icon className={`h-12 w-12 mb-4 ${gift.color} opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform`} />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-200 group-hover:text-amber-500">{gift.name}</span>
                                                <span className="mt-2 text-[8px] font-bold text-amber-500/40 uppercase">{gift.price} Gold</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <Button className="w-full bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 text-black font-black uppercase h-14 rounded-xl">Offrir un Trésor</Button>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                    {/* Sécurité Elite (2FA) */}
                    <Card className="border-amber-500/10 bg-zinc-950/50 backdrop-blur-md text-zinc-100 shadow-xl border-t border-amber-500/20">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-amber-500" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Sécurité Elite</span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-wider font-medium">Protégez votre aura avec la double authentification (2FA).</p>
                            <Button
                                variant="outline"
                                className="w-full border-amber-500/20 bg-amber-500/5 text-amber-500 text-[9px] font-black uppercase tracking-widest h-10 hover:bg-amber-500/10 hover:border-amber-500/40"
                                onClick={() => toast.info("Activation de la 2FA", { description: "Fonctionnalité bientôt disponible pour les membres du cercle." })}
                            >
                                Activer la 2FA
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </div>
    )
}
