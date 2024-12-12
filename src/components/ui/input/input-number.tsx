import { useEffect, useState } from 'react'

import ContainerInput from '@components/ui/input/container-input'

import { TBasePropsInput } from '@typescript/ui-types'

interface TProps
  extends TBasePropsInput,
    Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'type'> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  value: string
  type: 'float' | 'integer'
  min?: number
  max?: number
}

const InputNumber = (props: TProps) => {
  const { onChange: handleOnChange, value, min, max, type, ...attrs } = props
  const [formatedValue, setFormatedValue] = useState<string>(value)

  useEffect(() => {
    setFormatedValue(formatValue(value))
  }, [])

  function formatValue(value: string): string {
    if (type === 'integer') return parseInt(value)?.toString()

    let valueFormatted = String(value)
      .replace(/[^\d.]+/g, '')
      .replace(/(\..*?)\./g, '$1')
      .replace(/(\.\d\d)\d+/g, '$1')
      .replace(/^0+(?=\d)/, '')

    const numericValue = parseFloat(valueFormatted)

    if (min || max) {
      if (min && numericValue < min) {
        valueFormatted = String(min)
      } else if (max && numericValue > max) {
        valueFormatted = String(max)
      }
    }

    return valueFormatted
  }

  const handleOnChangeFormatedValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueFormatted = formatValue(e.target.value)
    e.target.value = valueFormatted
    handleOnChange(e)
    setFormatedValue(e.target.value)
  }

  return (
    <ContainerInput<React.HTMLProps<HTMLInputElement>> {...attrs} onChange={handleOnChange}>
      {(attrsInput) => (
        <input {...attrsInput} value={formatedValue} onChange={handleOnChangeFormatedValue} />
      )}
    </ContainerInput>
  )
}

export default InputNumber
