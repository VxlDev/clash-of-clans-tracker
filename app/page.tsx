'use client'

import { ClashData } from '@/types/clash'
import { getNameById, getObjectFromId, transformClashData } from '@/utils/clash'
import { formatBuildTime, getMaxLevel } from 'coc-info'
import { useState } from 'react'

const Home = () => {
  const [userData, setUserData] = useState<ClashData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [hideCompleted, setHideCompleted] = useState<boolean>(false)

  const handleReadClipboard = async () => {
    setError(null)
    setSuccess(null)
    try {
      const text = await navigator.clipboard.readText()
      try {
        const parsed = JSON.parse(text)
        setUserData(parsed)
        setSuccess('Le presse-papiers a été lu avec succès.')
      } catch (err) {
        setError("Le contenu du presse-papiers n'est pas un JSON valide.")
      }
    } catch (err) {
      setError(`Erreur lors de la lecture du presse-papiers : ${err}`)
    }
  }

  const handleClear = () => {
    setUserData(null)
    setError(null)
    setSuccess('Le contenu a été supprimé.')
  }

  const handleHideCompleted = () => {
    setSuccess(null)
    if (userData == null) {
      setError('Aucun contenu à afficher/cacher...')
      return
    }
    setHideCompleted(!hideCompleted)
    setSuccess(
      `Les bâtiments complétés ont été ${hideCompleted ? 'affichés' : 'cachés'}.`,
    )
  }

  return (
    <div className="p-4">
      <p className="m-2 rounded-md bg-red-200 p-2">
        Attention ! Le site est en phase de développement. Il ne comprend pas
        tous les objets de Clash of Clans et peut contenir des erreurs.
      </p>
      <ol className="list-decimal px-8 py-4">
        <li>Se connecter en jeu</li>
        <li>
          Aller dans <span className="font-semibold">Paramètres</span> {'>'}{' '}
          <span className="font-semibold">Paramètres supplémentaires</span>
        </li>
        <li>
          Descendre à{' '}
          <span className="font-semibold">Exporter les données</span> et les
          copier
        </li>
        <li>
          Cliquer sur{' '}
          <span className="font-semibold">Importer mes données</span> et
          autoriser l'utilisation du presse-papiers.
        </li>
      </ol>
      <button
        className="mx-2 rounded-md bg-blue-300 p-4"
        onClick={handleReadClipboard}
      >
        Importer mes données
      </button>
      {/* <button
        className="mx-2 rounded-md bg-green-300 p-4"
        onClick={() => {
          if (userData == null) {
            setError("Veuillez d'abord entrer vos données...")
          } else {
            const data = transformClashData(userData)
            console.log(data)
          }
        }}
      >
        Transformer ces données en JSON
      </button> */}
      {userData && (
        <>
          <button
            className="mx-2 rounded-md bg-red-300 p-4"
            onClick={handleClear}
          >
            Supprimer mes données
          </button>
          <button
            className="mx-2 rounded-md bg-yellow-300 p-4"
            onClick={handleHideCompleted}
          >
            {`${hideCompleted ? 'Afficher' : 'Cacher'} les bâtiments déjà maxés`}
          </button>
        </>
      )}

      {error && <p className="m-2 rounded-md bg-red-200 p-2">{error}</p>}
      {success && <p className="m-2 rounded-md bg-green-200 p-2">{success}</p>}

      {!error && userData && (
        <div>
          <h2 className="font-bold">Tag : {userData.tag}</h2>
          <div className="flex flex-col">
            {userData.buildings
              .sort((a, b) =>
                getNameById(a.data).localeCompare(getNameById(b.data)),
              )
              .map((building, index) => {
                const name = getNameById(building.data)
                const level = building.lvl
                const maxLevel =
                  getMaxLevel(
                    name,
                    getObjectFromId(1000001, userData)?.lvl ?? 1,
                  ) ?? 1
                const count = building.cnt ?? 1
                if (
                  hideCompleted &&
                  (level == maxLevel || building.data == 1000001)
                ) {
                  return
                }
                return (
                  <span key={`building-${index}`}>
                    {count}x {name} {building.gear_up && ' (Geared Up)'} niveau{' '}
                    {level}
                    {building.data !== 1000001 && `/${maxLevel}`}{' '}
                    {building.timer && (
                      <span>
                        (Amélioration en cours:{' '}
                        {formatBuildTime(building.timer)})
                      </span>
                    )}
                  </span>
                )
              })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
