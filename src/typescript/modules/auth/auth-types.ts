
import { TUser } from "@typescript/modules/user/user-types"

/*--->Redux */
export interface TRAuthState {
  isAuthenticated: boolean
  user: TUser | null
}
