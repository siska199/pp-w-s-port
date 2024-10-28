import { useState } from 'react'

import Container from '@components/ui/container/container'
import HelperMessage from '@components/ui/helper-message'

import { cn, isEmptyValue } from '@lib/helper'
import { TBasePropsInput } from '@typescript/modules/ui/ui-types'
import { IconClose, IconEye, IconEyeClose } from '@assets/icons'

export interface TPropsInput<TInput> extends TBasePropsInput {
  children: React.ReactNode | ((attrsInput: TInput) => React.ReactNode)
  disabled?: boolean
  name?: string
  type?: string
  onlyContainer?: boolean
  isClerable?: boolean
  value?: any
  onChange?: (e: any) => void
  childrenOverlay?: React.ReactNode
  isNotUsingDefaultStyle?: {
    input?: boolean
  }
  onCustomeClearHandler?: () => void
  customeClearValue?: string
  maxLength?: number
}

const ContainerInput = <TInput,>(props: TPropsInput<TInput>) => {
  const {
    name,
    children,
    onCustomeClearHandler,
    customeClearValue,
    isNotUsingDefaultStyle,
    childrenOverlay,
    label,
    isClerable = false,
    type,
    onlyContainer = false,
    errorMessage,
    customeElement,
    disabled,
    customeClass,
    value,
    onChange,
    maxLength,
    ...attrsInput
  } = props

  const [dynamicType, setDynamicType] = useState(type)

  const handleToggleTypePassword = () => {
    setDynamicType(dynamicType === 'password' ? 'text' : 'password')
  }

  const handelOnChange = (e: any) => {
    if (maxLength != Number(value?.length ?? 0) && onChange) return onChange(e)
  }

  const handleOnClearValue = () => {
    if (onCustomeClearHandler) return onCustomeClearHandler()
    if (onChange)
      return onChange({
        target: {
          name: name || '',
          value: Array.isArray(value) ? [] : ''
        }
      })
  }

  return (
    <Container className={`${customeClass?.ciV4} relative flex flex-col gap-1`}>
      <section className={`${customeClass?.ciV3} flex flex-col gap-2 w-full`}>
        {label && (
          <div className='flex justify-between gap-4'>
            <label htmlFor={name} className={'font-medium w-fit'}>
              {label}
            </label>

            {maxLength && (
              <span className='text-gray text-body-small'>
                {maxLength - Number(value?.length ?? 0)}
              </span>
            )}
          </div>
        )}

        {onlyContainer && typeof children !== 'function' ? (
          children
        ) : (
          <div
            className={cn({
              'bg-white flex flex-nowrap items-center gap-2 text-body-base border border-input rounded-lg  w-full ':
                true,
              [`${customeClass?.ciV2}`]: customeClass?.ciV2,
              '!bg-disabled !border': disabled,
              'focus-within:ring-primary-200 focus-within:!border-primary': !errorMessage,
              'border-error focus-within:!ring-error-200 focus-within:!border-error': errorMessage,
              'px-3 py-2': !customeElement?.preStart && !customeElement?.preEnd,
              'overflow-hidden': customeElement?.preStart || customeElement?.preEnd
            })}
          >
            <CustomeElement elmn1={customeElement?.preStart} elmn2={customeElement?.start} />

            <div className={`${customeClass?.ciV1} text-black flex flex-col w-full relative `}>
              {typeof children === 'function' ? (
                <>
                  {children({
                    ...(attrsInput as TInput),
                    className: cn({
                      'peer w-full shrink !outline-none border-none focus:border-none focus:ring-0 p-0 text-body-base placeholder:text-gray-400':
                        !isNotUsingDefaultStyle?.input,
                      'px-4': customeElement?.preEnd,
                      'pr-4 pl-1': customeElement?.preStart,
                      [customeClass?.input || '']: customeClass?.input
                    }),
                    name,
                    type: dynamicType,
                    disabled,
                    value,
                    onChange: handelOnChange,
                    maxLength
                  })}
                </>
              ) : (
                children
              )}
            </div>

            {isClerable && !isEmptyValue(customeClearValue) && (
              <IconClose className='cursor-pointer' onClick={handleOnClearValue} />
            )}

            <CustomeElement elmn1={customeElement?.preEnd} elmn2={customeElement?.end} />

            {type === 'password' && (
              <div onClick={handleToggleTypePassword} className='cursor-pointer-custome '>
                {dynamicType === 'password' ? <IconEye /> : <IconEyeClose />}
              </div>
            )}
          </div>
        )}
      </section>
      {childrenOverlay}
      <HelperMessage variant={'error'} message={errorMessage} />
    </Container>
  )
}

interface TPropsCustomeElement {
  elmn1?: React.ReactNode
  elmn2?: React.ReactNode
}

const CustomeElement = (props: TPropsCustomeElement) => {
  const { elmn1, elmn2 } = props

  return (
    <>
      <div className={`hidden ${elmn1 && 'shrink-0 !flex bg-gray-100 p-2'}`}>{elmn1}</div>

      <div className={`hidden ${elmn2 && 'shrink-0 !flex'}`}>{elmn2}</div>
    </>
  )
}

export default ContainerInput
