'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const pathTitles: Record<string, string> = {
  '/': 'Accueil',
  '/clan': 'Clan',
  '/player': 'Joueur',
  '/leagues': 'Leagues',
}

const Header = () => {
  const basePath = '/' + usePathname().split('/')[1]
  const title = pathTitles[basePath] || '???'

  return (
    <header className="title flex flex-col items-center justify-center bg-blue-500 py-8 uppercase">
      <h1 className="title text-6xl">{title}</h1>

      <nav className="flex gap-4">
        <Link href="/">Accueil</Link>
        <Link href="/player/22UUR8UOL">Joueur</Link>
        <Link href="/clan/2P2CG28CQ">Clan</Link>
        <Link href="/leagues">Leagues</Link>
      </nav>
    </header>
  )
}

export default Header
