interface ClanData {
  badgeUrls: object
  capitalLeague: object
  chatLanguage: object
  clanBuilderBasePoints: number
  clanCapital: object
  clanCapitalPoints: number
  clanLevel: number
  clanPoints: number
  description: string
  isFamilyFriendly: boolean
  isWarLogPublic: boolean
  labels: object
  location: object
  memberList: []
  members: number
  name: string
  requiredBuilderBaseTrophies: number
  requiredTownhallLevel: number
  tag: string
  type: string
  warFrequency: string
  warLeague: object
  warLosses: number
  warTies: number
  warWinStreak: number
  warWins: number
}

async function getClanData(tag: string): Promise<ClanData> {
  const token = process.env.TOKEN
  const clanTag = encodeURIComponent(`#${tag}`)

  const response = await fetch(
    `https://api.clashofclans.com/v1/clans/${clanTag}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 * 60 },
    },
  )

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération du clan')
  }

  return response.json()
}

interface ClanPageProps {
  params: { tag: string }
}

export default async function ClanPage({ params }: ClanPageProps) {
  const { tag } = params
  const clanData = await getClanData(tag)

  return (
    <div className="min-h-screen space-y-4 bg-gray-100 p-6">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{clanData.name}</h1>
          <p className="text-gray-600">Tag: {clanData.tag}</p>
        </div>
      </div>

      <p className="text-gray-700 italic">{clanData.description}</p>

      <div className="grid grid-cols-2 gap-4 rounded bg-white p-4 shadow">
        <p>
          <strong>Niveau :</strong> {clanData.clanLevel}
        </p>
        <p>
          <strong>Membres :</strong> {clanData.members}
        </p>
        <p>
          <strong>Points Clan :</strong> {clanData.clanPoints}
        </p>
        <p>
          <strong>Points Base Ouvrière :</strong>{' '}
          {clanData.clanBuilderBasePoints}
        </p>
        <p>
          <strong>Points Capitale :</strong> {clanData.clanCapitalPoints}
        </p>
        <p>
          <strong>Fréquence de guerre :</strong> {clanData.warFrequency}
        </p>
        <p>
          <strong>Ligue de guerre :</strong> {clanData.warLeague?.name}
        </p>
        <p>
          <strong>Victoires guerre :</strong> {clanData.warWins}
        </p>
        <p>
          <strong>Défaites guerre :</strong> {clanData.warLosses}
        </p>
        <p>
          <strong>Égalités guerre :</strong> {clanData.warTies}
        </p>
        <p>
          <strong>Série de victoires :</strong> {clanData.warWinStreak}
        </p>
        <p>
          <strong>Niveau HDV requis :</strong> {clanData.requiredTownhallLevel}
        </p>
        <p>
          <strong>Trophées base ouvrière requis :</strong>{' '}
          {clanData.requiredBuilderBaseTrophies}
        </p>
        <p>
          <strong>Type :</strong> {clanData.type}
        </p>
        <p>
          <strong>Langue :</strong> {clanData.chatLanguage?.name}
        </p>
        <p>
          <strong>Lieu :</strong> {clanData.location?.name}
        </p>
        <p>
          <strong>Famille friendly :</strong>{' '}
          {clanData.isFamilyFriendly ? 'Oui' : 'Non'}
        </p>
        <p>
          <strong>War Log Public :</strong>{' '}
          {clanData.isWarLogPublic ? 'Oui' : 'Non'}
        </p>
      </div>

      <div className="rounded bg-white p-4 shadow">
        <h2 className="mb-2 text-xl font-semibold">Capitale du clan</h2>
        <pre className="overflow-auto rounded bg-gray-200 p-2 text-sm">
          {JSON.stringify(clanData.clanCapital, null, 2)}
        </pre>
      </div>

      <div className="rounded bg-white p-4 shadow">
        <h2 className="mb-2 text-xl font-semibold">League Capitale</h2>
        <pre className="overflow-auto rounded bg-gray-200 p-2 text-sm">
          {JSON.stringify(clanData.capitalLeague, null, 2)}
        </pre>
      </div>

      <div className="rounded bg-white p-4 shadow">
        <h2 className="mb-2 text-xl font-semibold">Labels</h2>
        <pre className="overflow-auto rounded bg-gray-200 p-2 text-sm">
          {JSON.stringify(clanData.labels, null, 2)}
        </pre>
      </div>

      <div className="rounded bg-white p-4 shadow">
        <h2 className="mb-2 text-xl font-semibold">
          Liste des membres ({clanData.members})
        </h2>
        <pre className="max-h-96 overflow-auto rounded bg-gray-200 p-2 text-sm">
          {JSON.stringify(clanData.memberList, null, 2)}
        </pre>
      </div>
    </div>
  )
}
