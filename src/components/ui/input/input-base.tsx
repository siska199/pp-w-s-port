import ContainerInput from '@components/ui/input/container-input'
import React from 'react'
import { TBasePropsInput } from 'types/ui-types'

interface TProps extends TBasePropsInput, React.HTMLProps<HTMLInputElement> {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputBase = (props: TProps) => {
  const { ...attrs } = props
  return (
    <ContainerInput<React.HTMLProps<HTMLInputElement>> {...attrs} isClerable>
      {(attrsInput) => <input {...attrsInput} id={attrsInput?.name} />}
    </ContainerInput>
  )
}

export default InputBase
