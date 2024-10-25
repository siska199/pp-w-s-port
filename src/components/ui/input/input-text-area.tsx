import ContainerInput from '@components/ui/input/container-input'
import { TBasePropsInput } from '@typescript/modules/ui/ui-types'
import React from 'react'

interface TProps extends TBasePropsInput, React.HTMLProps<HTMLTextAreaElement> {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const InputTextArea = (props: TProps) => {
  const { ...attrs } = props
  return (
    <ContainerInput<React.HTMLProps<HTMLTextAreaElement>>
      customeClass={{
        ...attrs?.customeClass,
        ciV2: `${attrs?.customeClass?.ciV2} `
      }}
      {...attrs}
    >
      {(attrsInput) => <textarea {...attrsInput} />}
    </ContainerInput>
  )
}

export default InputTextArea
