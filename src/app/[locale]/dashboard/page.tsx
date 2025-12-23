import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/fr/login')
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white p-4">
            <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
            <p className="text-zinc-400 mb-8">Bonjour, {user.email}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <h2 className="text-xl font-semibold mb-2">Profil</h2>
                    <p className="text-zinc-500 text-sm">Gérez votre visibilité et vos préférences.</p>
                </div>
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <h2 className="text-xl font-semibold mb-2">Matches</h2>
                    <p className="text-zinc-500 text-sm">Découvrez qui vous a liké.</p>
                </div>
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <h2 className="text-xl font-semibold mb-2">Chat</h2>
                    <p className="text-zinc-500 text-sm">Commencez la discussion.</p>
                </div>
            </div>
        </div>
    )
}
