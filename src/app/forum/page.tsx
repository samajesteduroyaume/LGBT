'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageSquare, ThumbsUp, Plus } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

export default function ForumPage() {
    const [posts, setPosts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function fetchPosts() {
            // Mocking forum posts for now
            const mockPosts = [
                {
                    id: '1',
                    title: 'Conseils pour un premier rendez-vous ?',
                    content: 'Salut tout le monde ! J\'ai mon premier date demain et je stress un peu...',
                    category: 'Conseils',
                    author: { username: 'Alex', avatar_url: '' },
                    likes: 5,
                    comments_count: 3,
                    created_at: new Date().toISOString()
                },
                {
                    id: '2',
                    title: 'Soirée LGBT+ à Paris ce weekend !',
                    content: 'Qui est motivé pour une sortie groupée au Marais samedi soir ?',
                    category: 'Événements',
                    author: { username: 'Sam', avatar_url: '' },
                    likes: 12,
                    comments_count: 8,
                    created_at: new Date().toISOString()
                }
            ]
            setPosts(mockPosts)
            setLoading(false)
        }
        fetchPosts()
    }, [])

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Forum Communautaire</h1>
                        <p className="text-zinc-400">Partagez, discutez et rencontrez la communauté.</p>
                    </div>
                    <Button className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200 gap-2">
                        <Plus className="h-4 w-4" /> Nouveau Post
                    </Button>
                </header>

                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {['Général', 'Conseils', 'Événements', 'Témoignages'].map((cat) => (
                        <Badge key={cat} variant="outline" className="border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer px-4 py-1">
                            {cat}
                        </Badge>
                    ))}
                </div>

                <div className="space-y-4">
                    {posts.map((post) => (
                        <Card key={post.id} className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-colors cursor-pointer text-zinc-100 shadow-md">
                            <CardHeader className="flex flex-row items-start gap-4 pb-2">
                                <Avatar className="h-10 w-10 border border-zinc-800">
                                    <AvatarImage src={post.author.avatar_url} />
                                    <AvatarFallback className="bg-zinc-800 text-zinc-400">{post.author.username[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-semibold hover:text-zinc-300">{post.title}</h3>
                                        <Badge variant="secondary" className="bg-zinc-800 text-zinc-400 border-none">{post.category}</Badge>
                                    </div>
                                    <p className="text-xs text-zinc-500">Posté par {post.author.username} • {new Date(post.created_at).toLocaleDateString()}</p>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-zinc-400 text-sm line-clamp-3">{post.content}</p>
                            </CardContent>
                            <CardFooter className="border-t border-zinc-800/50 pt-4 flex gap-6 text-zinc-500">
                                <div className="flex items-center gap-2 hover:text-white transition-colors">
                                    <ThumbsUp className="h-4 w-4" />
                                    <span className="text-sm">{post.likes}</span>
                                </div>
                                <div className="flex items-center gap-2 hover:text-white transition-colors">
                                    <MessageSquare className="h-4 w-4" />
                                    <span className="text-sm">{post.comments_count}</span>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
