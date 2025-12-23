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

    if (loading) return <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">Chargement...</div>

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4">
            <Card className="w-full max-w-2xl border-zinc-800 bg-zinc-900 text-zinc-100">
                <CardHeader>
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <Avatar className="h-24 w-24 border-2 border-zinc-800">
                                <AvatarImage src={avatarUrl} className="object-cover" />
                                <AvatarFallback className="bg-zinc-800 text-zinc-400 text-2xl font-bold">
                                    {username?.charAt(0).toUpperCase() || '?'}
                                </AvatarFallback>
                            </Avatar>
                            <label
                                htmlFor="avatar-upload"
                                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                            >
                                {uploading ? <Loader2 className="h-6 w-6 animate-spin text-white" /> : <Camera className="h-6 w-6 text-white" />}
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
                            <CardTitle className="text-2xl font-bold">Mon Profil</CardTitle>
                            <CardDescription className="text-zinc-400">Configurez votre identité sur la plateforme.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Pseudo</label>
                        <Input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Votre pseudo..."
                            className="border-zinc-800 bg-zinc-950 focus-visible:ring-zinc-700"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Bio</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Parlez-nous de vous..."
                            className="w-full h-32 rounded-md border border-zinc-800 bg-zinc-950 p-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-700"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Avatar URL</label>
                        <Input
                            value={avatarUrl}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                            placeholder="https://..."
                            className="border-zinc-800 bg-zinc-950 focus-visible:ring-zinc-700"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-zinc-800 pt-6">
                    <Button variant="ghost" onClick={() => router.push('/dashboard')} className="hover:bg-zinc-800">
                        Retour
                    </Button>
                    <Button onClick={updateProfile} disabled={loading} className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200 px-8">
                        {loading ? 'Enregistrement...' : 'Sauvegarder'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
