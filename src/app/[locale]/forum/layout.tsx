import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Forum Communautaire',
    description: 'Partagez vos expériences et discutez avec la communauté LGBT+.',
}

import ForumPage from './page'

export default function Layout() {
    return <ForumPage />
}
