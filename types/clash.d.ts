export type ClashItem = {
  data: number
  lvl?: number
  cnt?: number
  weapon?: number
  timer?: number
  gear_up?: number
}

export type ClashData = {
  tag: string
  timestamp: number
  buildings: ClashItem[]
  traps: ClashItem[]
  decos: ClashItem[]
  obstacles: ClashItem[]
  units: ClashItem[]
  siege_machines: ClashItem[]
  heroes: ClashItem[]
  spells: ClashItem[]
  pets: ClashItem[]
  equipment: ClashItem[]
  house_parts: ClashItem[]
  skins: ClashItem[]
  sceneries: ClashItem[]
  buildings2: ClashItem[]
  traps2: ClashItem[]
  decos2: ClashItem[]
  obstacles2: ClashItem[]
  units2: ClashItem[]
  heroes2: ClashItem[]
  skins2: ClashItem[]
  sceneries2: ClashItem[]
}
