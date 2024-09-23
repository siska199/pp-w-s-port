import { TUser } from 'types/user-types'

/*--->Redux */

export interface TRAuthState {
  isAuthenticated: boolean
  user: TUser | null
}
