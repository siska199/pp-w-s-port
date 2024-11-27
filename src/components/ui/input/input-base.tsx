import React from 'react'

import ContainerInput from '@components/ui/input/container-input'

import { TBasePropsInput } from '@typescript/ui-types'

export interface TPropsInputBase extends TBasePropsInput, React.HTMLProps<HTMLInputElement> {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputBase = (props: TPropsInputBase) => {
  const { ...attrs } = props
  return (
    <ContainerInput<React.HTMLProps<HTMLInputElement>> {...attrs} isClerable>
      {(attrsInput) => <input {...attrsInput} id={attrsInput?.name} />}
    </ContainerInput>
  )
}

export default React.memo(InputBase)
