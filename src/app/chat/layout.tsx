import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Espace Discussion',
    description: 'Échangez avec vos matchs en toute sécurité.',
}

import ChatPage from './page'

export default function Layout() {
    return <ChatPage />
}
