import { Metadata, ResolvingMetadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Check, ShieldCheck, Sparkles } from 'lucide-react'
import Image from 'next/image'

interface Props {
    params: { id: string; locale: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const supabase = await createClient()
    const { data: profile } = await supabase
        .from('profiles')
        .select('username, bio')
        .eq('id', params.id)
        .single()

    if (!profile) return { title: 'Profil Introuvable' }

    return {
        title: `${profile.username} | Majestic Circle`,
        description: profile.bio || `Découvrez le profil d'élite de ${profile.username} sur Majestic LGBT+.`,
        openGraph: {
            title: `${profile.username} - Aura Harmony`,
            description: profile.bio || "Membre distingué du cercle Majestic.",
            images: ['/icons/icon-512x512.png'],
        },
    }
}

export default async function PublicProfilePage({ params }: Props) {
    const supabase = await createClient()
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', params.id)
        .single()

    if (!profile) notFound()

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4 pt-20">
            <div className="w-full max-w-2xl">
                <Card className="border-amber-500/10 bg-zinc-950/80 backdrop-blur-2xl text-zinc-100 shadow-[0_50px_100px_rgba(0,0,0,0.8)] border-t border-amber-500/20 rounded-[3rem] overflow-hidden">
                    <div className="relative h-64 w-full">
                        {profile.avatar_url ? (
                            <Image
                                src={profile.avatar_url}
                                alt={profile.username}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="h-full w-full bg-zinc-900 flex items-center justify-center">
                                <span className="text-6xl font-black text-amber-500/20 italic">{profile.username?.charAt(0)}</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                    </div>

                    <CardContent className="relative -mt-16 px-10 pb-16">
                        <div className="flex flex-col items-center text-center">
                            <div className="relative mb-6">
                                <Avatar className="h-32 w-32 border-4 border-black shadow-2xl">
                                    <AvatarImage src={profile.avatar_url} className="object-cover" />
                                    <AvatarFallback className="bg-zinc-800 text-amber-500 text-4xl font-black italic">
                                        {profile.username?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                {profile.is_verified && (
                                    <div className="absolute -right-2 bottom-2 h-8 w-8 rounded-full border border-amber-500/30 bg-black flex items-center justify-center shadow-lg">
                                        <ShieldCheck className="h-5 w-5 text-amber-500" />
                                    </div>
                                )}
                            </div>

                            <h1 className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400 mb-2">
                                {profile.username}
                            </h1>
                            <div className="flex items-center gap-2 mb-8">
                                <Sparkles className="h-4 w-4 text-amber-500" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Membre Certifié Elite</span>
                            </div>

                            <p className="text-xl text-zinc-400 italic leading-relaxed max-w-lg mb-12">
                                "{profile.bio || "Une présence discrète et raffinée dans le cercle."}"
                            </p>

                            <div className="grid grid-cols-3 gap-8 w-full border-t border-white/5 pt-12">
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black text-amber-500">85%</span>
                                    <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-600">Affinité</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black text-zinc-300">12</span>
                                    <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-600">Trésors</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black text-zinc-300">Gold</span>
                                    <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-600">Rang</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
