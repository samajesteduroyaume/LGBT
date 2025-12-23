'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageSquare, ThumbsUp, Plus, X } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

export default function ForumPage() {
    const [posts, setPosts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [newPostTitle, setNewPostTitle] = useState('')
    const [newPostContent, setNewPostContent] = useState('')
    const [newPostCategory, setNewPostCategory] = useState('Général')

    const fetchPosts = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('forum_posts')
            .select(`
                *,
                author:author_id (
                    username,
                    avatar_url
                )
            `)
            .order('created_at', { ascending: false })

        if (data) {
            setPosts(data)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchPosts()
    }, [supabase])

    const handleCreatePost = async () => {
        if (!newPostTitle || !newPostContent) return

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { error } = await supabase
            .from('forum_posts')
            .insert({
                title: newPostTitle,
                content: newPostContent,
                category: newPostCategory,
                author_id: user.id
            })

        if (error) {
            toast.error("L'élite ne peut pas publier pour le moment.")
        } else {
            toast.success("Votre pensée prestigieuse a été publiée.")
            setShowCreateModal(false)
            setNewPostTitle('')
            setNewPostContent('')
            fetchPosts()
        }
    }

    return (
        <div className="min-h-screen bg-black text-zinc-100 p-4 md:p-8" onClick={(e: React.MouseEvent) => { }}>
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-end mb-12 border-b border-amber-500/10 pb-8">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200">Le Cercle</h1>
                        <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold mt-2">Discussions d'exception pour une communauté d'élite.</p>
                    </div>
                    <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-amber-200 to-amber-500 text-black font-black hover:scale-105 transition-transform gap-2 px-6 h-12 shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                                <Plus className="h-5 w-5" /> Nouveau Post
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-zinc-950 border-amber-500/20 text-white rounded-[2rem]">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">Nouvelle Pensée</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Titre Prestigieux</label>
                                    <Input
                                        value={newPostTitle}
                                        onChange={(e) => setNewPostTitle(e.target.value)}
                                        className="bg-black border-white/5 h-12 rounded-xl focus:ring-amber-500/30"
                                        placeholder="Comment puis-je..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Contenu de l'Aura</label>
                                    <Textarea
                                        value={newPostContent}
                                        onChange={(e) => setNewPostContent(e.target.value)}
                                        className="bg-black border-white/5 min-h-[150px] rounded-xl focus:ring-amber-500/30"
                                        placeholder="Partagez votre sagesse..."
                                    />
                                </div>
                                <Button
                                    onClick={handleCreatePost}
                                    className="w-full bg-gradient-to-r from-amber-200 to-amber-500 text-black font-black h-14 rounded-xl mt-4"
                                >
                                    Diffuser l'Excellence
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </header>

                <div className="flex gap-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
                    {['Général', 'Conseils', 'Événements', 'Témoignages'].map((cat) => (
                        <Badge key={cat} variant="outline" className="border-amber-500/10 bg-zinc-950 text-zinc-500 hover:text-amber-200 hover:border-amber-500/40 cursor-pointer px-6 py-2 uppercase tracking-tighter transition-all">
                            {cat}
                        </Badge>
                    ))}
                </div>

                <div className="space-y-6">
                    {posts.map((post) => (
                        <Card key={post.id} className="border-amber-500/5 bg-zinc-950/40 hover:bg-zinc-950 hover:border-amber-500/20 transition-all cursor-pointer text-zinc-100 shadow-xl backdrop-blur-sm group">
                            <CardHeader className="flex flex-row items-start gap-5 pb-4">
                                <Avatar className="h-12 w-12 border border-amber-500/10">
                                    <AvatarImage src={post.author.avatar_url} />
                                    <AvatarFallback className="bg-zinc-900 text-amber-500 font-bold">{post.author.username[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl font-bold tracking-tight group-hover:text-amber-200 transition-colors">{post.title}</h3>
                                        <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-none px-3 py-0.5 text-[10px] uppercase font-black">{post.category}</Badge>
                                    </div>
                                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold mt-1">Écrit par <span className="text-zinc-400">{post.author.username}</span> • {new Date(post.created_at).toLocaleDateString()}</p>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">{post.content}</p>
                            </CardContent>
                            <CardFooter className="border-t border-amber-500/5 pt-5 flex flex-col items-start gap-4">
                                <div className="flex gap-8 text-zinc-600 w-full">
                                    <div className="flex items-center gap-2 hover:text-amber-500 transition-colors group/stat cursor-pointer">
                                        <ThumbsUp className="h-4 w-4 transition-transform group-hover/stat:scale-110" />
                                        <span className="text-xs font-black">{post.likes_count || 0}</span>
                                    </div>
                                    <div className="flex items-center gap-2 hover:text-zinc-300 transition-colors group/stat cursor-pointer">
                                        <MessageSquare className="h-4 w-4 transition-transform group-hover/stat:scale-110" />
                                        <span className="text-xs font-black">{post.comments_count || 0}</span>
                                    </div>
                                </div>

                                {/* Section Commentaires Simplifiée */}
                                <div className="w-full space-y-3 pt-2">
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Répondre avec excellence..."
                                            className="h-10 bg-black/40 border-white/5 text-[10px] rounded-lg"
                                            onKeyDown={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                                                if (e.key === 'Enter') {
                                                    const content = e.currentTarget.value
                                                    if (!content) return
                                                    const { data: { user } } = await supabase.auth.getUser()
                                                    if (!user) return

                                                    const { error } = await supabase
                                                        .from('forum_comments')
                                                        .insert({
                                                            post_id: post.id,
                                                            author_id: user.id,
                                                            content: content
                                                        })

                                                    if (error) toast.error("Silence impérial forcé.")
                                                    else {
                                                        toast.success("Votre écho résonne dans le cercle.")
                                                        e.currentTarget.value = ''
                                                        fetchPosts()
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
