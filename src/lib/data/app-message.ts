import { toCapitalize } from '@lib/helper/function'

const appMessage = {
  systemErrorMessage: 'Telah terjadi kesalahan pada pada sistem, silahkan contact admin apilikasi',
  warning: {
    deleteData: 'Are you sure you want to delete this data?'
  },
  selectInputPlaceolder: (name: string) => `Select a ${toCapitalize(name)}`
}
export default appMessage
