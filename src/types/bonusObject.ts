import { CasinoBonus, OddsBonus, FreeSpins, Casino } from '@/src/types'

export type BonusObject = {
  _type: 'bonus-object'
  _key: string
  message: string
  casino: Casino
  bonus: CasinoBonus | OddsBonus
  freeSpins: FreeSpins
  terms: string
  title: string
  information: string[]
  buttonText: string
}
