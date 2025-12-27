export type PulseToken = {
  id: string
  name: string
  symbol: string
  imageUrl: string
  ageSeconds: number
  marketCap: number
  liquidity: number
  volume: number
  txCount: number
  holders: number
  proTraders: number
  migrations: number
  description: string
}

export type PulseColumnConfig = {
  key: "new" | "final" | "migrated"
  title: string
  data: PulseToken[]
}
