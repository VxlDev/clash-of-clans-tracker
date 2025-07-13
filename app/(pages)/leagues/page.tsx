import Image from 'next/image'

interface LeaguesData {
  test: number
}

async function getLeaguesData(): Promise<LeaguesData> {
  const token = process.env.TOKEN

  const response = await fetch(`https://api.clashofclans.com/v1/leagues`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 60 * 60 },
  })

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des leagues')
  }

  return response.json()
}

export default async function LeaguesPage() {
  const leaguesData = await getLeaguesData()

  return (
    <div className="margin-auto grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
      {leaguesData.items.map((league: object) => (
        <div
          key={league.name}
          className="flex flex-col items-center justify-center rounded-sm bg-gray-200 py-2"
        >
          <h2>{league.name}</h2>
          <Image
            src={league.iconUrls.small}
            alt={`${league.name} icon`}
            width={100}
            height={100}
          />
        </div>
      ))}
    </div>
  )
}
