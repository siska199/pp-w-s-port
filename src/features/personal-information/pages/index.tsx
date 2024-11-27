import React from 'react'

export const PersonalInformationUpsertPage = React.lazy(
  () =>
    import(
      '@features/personal-information/pages/personal-information-upsert/personal-information-upsert'
    )
)
