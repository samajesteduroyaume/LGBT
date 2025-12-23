import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Découverte',
    description: 'Découvrez de nouvelles personnes au sein de la communauté LGBT+.',
}

import DiscoveryPage from './page'

export default function Layout() {
    return <DiscoveryPage />
}
