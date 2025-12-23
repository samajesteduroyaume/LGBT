'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Camera, Loader2 } from 'lucide-react'

export default function ProfilePage() {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const [uploading, setUploading] = useState(false)
    const [user, setUser] = useState<any>(null)
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        async function getProfile() {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setUser(user)
                const { data, error } = await supabase
                    .from('profiles')
                    .select('username, bio, avatar_url')
                    .eq('id', user.id)
                    .single()

                if (data) {
                    setUsername(data.username || '')
                    setBio(data.bio || '')
                    setAvatarUrl(data.avatar_url || '')
                }
            } else {
                router.push('/login')
            }
            setLoading(false)
        }

        getProfile()
    }, [supabase, router])

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
            toast.success('Profile updated!')
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

    if (loading) return <div className="flex min-h-screen items-center justify-center bg-black text-amber-500 font-black uppercase tracking-widest animate-pulse">Prestige...</div>

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
            <Card className="w-full max-w-2xl border-amber-500/10 bg-zinc-950/50 backdrop-blur-sm text-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t border-amber-500/20">
                <CardHeader>
                    <div className="flex items-center gap-8">
                        <div className="relative group">
                            <Avatar className="h-28 w-28 border-2 border-amber-500/20 shadow-[0_0_20px_rgba(251,191,36,0.1)] transition-all group-hover:border-amber-500/50">
                                <AvatarImage src={avatarUrl} className="object-cover" />
                                <AvatarFallback className="bg-zinc-900 text-amber-500 text-3xl font-black">
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
                        <div>
                            <CardTitle className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">Identité Royale</CardTitle>
                            <CardDescription className="text-zinc-600 uppercase text-[10px] tracking-[0.2em] font-bold mt-1">Configurez votre présence dans le cercle.</CardDescription>
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
                            className="h-12 border-amber-500/10 bg-black/50 focus-visible:ring-amber-500/30 focus-visible:border-amber-500/50 text-zinc-200 placeholder:text-zinc-700 transition-all font-medium"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500">Votre Histoire (Bio)</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Partagez votre aura avec le cercle..."
                            className="w-full h-40 rounded-xl border border-amber-500/10 bg-black/50 p-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/20 focus-visible:border-amber-500/40 text-zinc-300 placeholder:text-zinc-700 transition-all leading-relaxed"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500">Lien Image (Optionnel)</label>
                        <Input
                            value={avatarUrl}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                            placeholder="https://..."
                            className="h-12 border-amber-500/10 bg-black/50 focus-visible:ring-amber-500/30 text-zinc-400 text-xs font-mono transition-all"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-amber-500/5 pt-8 bg-black/20 pb-8">
                    <Button variant="ghost" onClick={() => router.push('/dashboard')} className="text-zinc-600 hover:text-zinc-300 hover:bg-zinc-900/50 font-bold uppercase text-[10px] tracking-widest">
                        Annuler
                    </Button>
                    <Button onClick={updateProfile} disabled={loading} className="bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 text-black font-black uppercase tracking-widest px-10 h-12 shadow-[0_5px_20px_rgba(251,191,36,0.3)] hover:scale-105 transition-transform">
                        {loading ? 'Soumission...' : 'Confirmer'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
