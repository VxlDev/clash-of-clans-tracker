import { ClashData, ClashItem } from '@/types/clash'

export const getObjectFromId = (
  id: number,
  data: ClashData,
): ClashItem | undefined => {
  const allArrays = [
    data.buildings,
    data.traps,
    data.decos,
    data.obstacles,
    data.units,
    data.siege_machines,
    data.heroes,
    data.spells,
    data.pets,
    data.equipment,
    data.house_parts,
    data.skins,
    data.sceneries,
    data.buildings2,
    data.traps2,
    data.decos2,
    data.obstacles2,
    data.units2,
    data.heroes2,
    data.skins2,
    data.sceneries2,
  ]

  for (const arr of allArrays) {
    const found = arr.find((item) => item.data === id)
    if (found) return found
  }

  return undefined
}

const idToData: { [key: number]: { name: string; type: string } } = {
  1000000: { name: 'Army Camp', type: 'army' },
  1000001: { name: 'Town Hall', type: 'other' },
  1000002: { name: 'Elixir Collector', type: 'resources' },
  1000003: { name: 'Elixir Storage', type: 'resources' },
  1000004: { name: 'Gold Mine', type: 'resources' },
  1000005: { name: 'Gold Storage', type: 'resources' },
  1000006: { name: 'Barracks', type: 'army' },
  1000007: { name: 'Laboratory', type: 'army' },
  1000008: { name: 'Cannon', type: 'defense' },
  1000009: { name: 'Archer Tower', type: 'defense' },
  1000010: { name: 'Wall', type: 'defense' },
  1000011: { name: 'Wizard Tower', type: 'defense' },
  1000012: { name: 'Air Defense', type: 'defense' },
  1000013: { name: 'Mortar', type: 'defense' },
  1000014: { name: 'Clan Castle', type: 'other' },
  1000015: { name: "Builder's Hut", type: 'other' },
  1000019: { name: 'Hidden Tesla', type: 'defense' },
  1000020: { name: 'Spell Factory', type: 'army' },
  1000021: { name: 'X-Bow', type: 'defense' },
  1000023: { name: 'Dark Elixir Drill', type: 'resources' },
  1000024: { name: 'Dark Elixir Storage', type: 'resources' },
  1000026: { name: 'Dark Barracks', type: 'army' },
  1000027: { name: 'Inferno Tower', type: 'defense' },
  1000028: { name: 'Air Sweeper', type: 'defense' },
  1000029: { name: 'Dark Spell Factory', type: 'army' },
  1000031: { name: 'Eagle Artillery', type: 'defense' },
  1000032: { name: 'Bomb Tower', type: 'defense' },
  1000059: { name: 'Workshop', type: 'army' },
  1000064: { name: "B.O.B's Hut", type: 'other' },
  1000067: { name: 'Scattershot', type: 'defense' },
  1000068: { name: 'Pet House', type: 'army' },
  1000070: { name: 'Blacksmith', type: 'army' },
  1000071: { name: 'Hero Hall', type: 'army' },
  1000072: { name: 'Spell Tower', type: 'defense' },
  1000077: { name: 'Monolith', type: 'defense' },
  1000084: { name: 'Ricochet Cannon', type: 'defense' },
  1000085: { name: 'Multi-Archer Tower', type: 'defense' },
  1000093: { name: 'Helper Hut', type: 'other' },
}

export const getNameById = (id: number) => {
  return idToData[id]?.name ?? 'Unknown'
}

export const getTypeById = (id: number) => {
  return idToData[id]?.type ?? 'Unknown'
}

type TransformedItem = {
  id: number
  name: string
  type: string
  level?: number
  count?: number
  gear_up?: boolean
  weapon?: number
  timer?: number
}

type TransformedData = {
  buildings: TransformedItem[]
}

export const transformClashData = (data: ClashData): TransformedData => {
  const transformArray = (items: ClashItem[]): TransformedItem[] =>
    items.map((item) => {
      const transformed: TransformedItem = {
        id: item.data,
        name: getNameById(item.data),
        type: getTypeById(item.data),
        ...(item.lvl !== undefined && { level: item.lvl }),
        ...(item.cnt !== undefined && { count: item.cnt }),
        ...(item.gear_up !== undefined && { gear_up: !!item.gear_up }),
        ...(item.weapon !== undefined && { weapon: item.weapon }),
        ...(item.timer !== undefined && { timer: item.timer }),
      }

      return transformed
    })

  return {
    buildings: transformArray([...data.buildings, ...data.buildings2]),
  }
}
