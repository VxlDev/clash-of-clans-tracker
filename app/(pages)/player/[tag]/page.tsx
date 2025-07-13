import Image from 'next/image'

interface PlayerData {
  achievements: []
  attackWins: number
  bestBuilderBaseTrophies: number
  bestTrophies: number
  builderBaseLeague: object
  builderBaseTrophies: number
  builderHallLevel: number
  clan: object
  clanCapitalContributions: number
  defenseWins: number
  donations: number
  donationsReceived: number
  expLevel: number
  heroEquipment: []
  heroes: []
  labels: []
  league: object
  name: string
  playerHouse: object
  role: string
  spells: []
  tag: string
  townHallLevel: number
  townHallWeaponLevel: number
  troops: []
  trophies: number
  warPreference: string
  warStars: number
}

async function getPlayerData(tag: string): Promise<PlayerData> {
  const token = process.env.TOKEN
  const playerTag = encodeURIComponent(`#${tag}`)

  const response = await fetch(
    `https://api.clashofclans.com/v1/players/${playerTag}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 * 60 },
    },
  )

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération du joueur')
  }

  return response.json()
}

interface PlayerPageProps {
  params: { tag: string }
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { tag } = await params
  const playerData = await getPlayerData(tag)

  return (
    <div className="bg-gray-300 p-4">
      <div className="rounded bg-white p-4 shadow">
        <p>
          <strong>Nom :</strong> {playerData.name}
        </p>
        <p>
          <strong>Tag :</strong> {playerData.tag}
        </p>
        <p>
          <strong>Niveau d'expérience :</strong> {playerData.expLevel}
        </p>
        <p>
          <strong>Rôle :</strong> {playerData.role}
        </p>
        <p>
          <strong>Trophées :</strong> {playerData.trophies}
        </p>
        <p>
          <strong>Meilleurs trophées :</strong> {playerData.bestTrophies}
        </p>
        <p>
          <strong>Guerre préférée :</strong> {playerData.warPreference}
        </p>
        <p>
          <strong>Étoiles de guerre :</strong> {playerData.warStars}
        </p>
        <p>
          <strong>Victoires en attaque :</strong> {playerData.attackWins}
        </p>
        <p>
          <strong>Victoires en défense :</strong> {playerData.defenseWins}
        </p>
        <p>
          <strong>Dons :</strong> {playerData.donations}
        </p>
        <p>
          <strong>Dons reçus :</strong> {playerData.donationsReceived}
        </p>
        <p>
          <strong>Contribution capitale :</strong>{' '}
          {playerData.clanCapitalContributions}
        </p>
        <p>
          <strong>Hôtel de ville :</strong> {playerData.townHallLevel}
        </p>
        <p>
          <strong>Arme de l'HDV :</strong> {playerData.townHallWeaponLevel}
        </p>
        <p>
          <strong>Builder Hall :</strong> {playerData.builderHallLevel}
        </p>
        <p>
          <strong>Trophées base ouvrière :</strong>{' '}
          {playerData.builderBaseTrophies}
        </p>
        <p>
          <strong>Meilleurs trophées base ouvrière :</strong>{' '}
          {playerData.bestBuilderBaseTrophies}
        </p>
      </div>

      {/* Objets imbriqués */}
      <div className="rounded bg-white p-4 shadow">
        <h2 className="text-xl font-semibold">Clan</h2>
        <pre className="overflow-auto rounded bg-gray-200 p-2 text-sm">
          {JSON.stringify(playerData.clan, null, 2)}
        </pre>
        {playerData.clan && (
          <Image
            src={playerData.clan.badgeUrls.medium}
            width={100}
            height={100}
            alt="Clan Icon"
          />
        )}

        <h2 className="mt-4 text-xl font-semibold">League</h2>
        <pre className="overflow-auto rounded bg-gray-200 p-2 text-sm">
          {JSON.stringify(playerData.league, null, 2)}
        </pre>

        <h2 className="mt-4 text-xl font-semibold">Builder Base League</h2>
        <pre className="overflow-auto rounded bg-gray-200 p-2 text-sm">
          {JSON.stringify(playerData.builderBaseLeague, null, 2)}
        </pre>

        <h2 className="mt-4 text-xl font-semibold">Player House</h2>
        <pre className="overflow-auto rounded bg-gray-200 p-2 text-sm">
          {JSON.stringify(playerData.playerHouse, null, 2)}
        </pre>
      </div>
      <div className="space-y-6 rounded bg-white p-4 shadow">
        <h2 className="text-xl font-semibold">Héros</h2>
        <pre className="overflow-auto rounded bg-gray-200 p-2 text-sm">
          {JSON.stringify(playerData.heroes, null, 2)}
        </pre>

        <h2 className="text-xl font-semibold">Troupes</h2>
        <pre className="overflow-auto rounded bg-gray-200 p-2 text-sm">
          {JSON.stringify(playerData.troops, null, 2)}
        </pre>

        <h2 className="text-xl font-semibold">Sorts</h2>
        <pre className="overflow-auto rounded bg-gray-200 p-2 text-sm">
          {JSON.stringify(playerData.spells, null, 2)}
        </pre>

        <h2 className="text-xl font-semibold">Équipements Héros</h2>
        <pre className="overflow-auto rounded bg-gray-200 p-2 text-sm">
          {JSON.stringify(playerData.heroEquipment, null, 2)}
        </pre>

        <h2 className="text-xl font-semibold">Succès (Achievements)</h2>
        <pre className="overflow-auto rounded bg-gray-200 p-2 text-sm">
          {JSON.stringify(playerData.achievements, null, 2)}
        </pre>

        <h2 className="text-xl font-semibold">Labels</h2>
        <pre className="overflow-auto rounded bg-gray-200 p-2 text-sm">
          {JSON.stringify(playerData.labels, null, 2)}
        </pre>
      </div>
    </div>
  )
}
