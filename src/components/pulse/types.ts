export type PulseToken = {
  id: string
  name: string
  symbol: string
  image: string
  ageSeconds: number
  marketCap: number
  liquidity: number
  volume: number
  txCount: number
  holders: number
  proTraders: number
  migrations: string
}

export type PulseColumnConfig = {
  key: "new" | "final" | "migrated"
  title: string
  data: PulseToken[]
}
