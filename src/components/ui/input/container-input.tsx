import { IconClose, IconEye, IconEyeClose } from '@assets/icons'
import Container from '@components/ui/container'
import HelperMessage from '@components/ui/helper-message'
import { cn, isEmptyValue } from '@lib/helper'

import { useState } from 'react'
import { TBasePropsInput } from 'types/ui-types'

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
    variant = 'v1',
    isClerable = false,
    type,
    onlyContainer = false,
    errorMessage,
    customeElement,
    disabled,
    customeClass,
    value,
    onChange,
    ...attrsInput
  } = props
  const [dynamicType, setDynamicType] = useState(type)

  const handleToggleTypePassword = () => {
    setDynamicType(dynamicType === 'password' ? 'text' : 'password')
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
          <label
            htmlFor={name}
            className={cn({
              'font-medium w-fit': true
            })}
          >
            {label}
          </label>
        )}

        {onlyContainer && typeof children !== 'function' ? (
          children
        ) : (
          <div
            className={cn({
              'bg-white flex flex-nowrap items-center gap-2 text-body-base border border-input rounded-lg  w-full ': true,
              [customeClass?.ciV2 || '']: customeClass?.ciV2,
              '!bg-disabled !border': disabled,
              'focus-within:ring-primary-200 focus-within:!border-primary': !errorMessage,
              'border-error focus-within:!ring-error-200 focus-within:!border-error': errorMessage,
              'px-3 py-2 ': !customeElement?.preStart && !customeElement?.preEnd,
              'overflow-hidden': customeElement?.preStart || customeElement?.preEnd
            })}
          >
            <div
              className={cn({
                hidden: true,
                'shrink-0 !flex bg-gray-100 p-2 ': customeElement?.preStart
              })}
            >
              {customeElement?.preStart}
            </div>

            <div
              className={cn({
                hidden: true,
                'shrink-0 !flex ': customeElement?.start
              })}
            >
              {customeElement?.start}
            </div>

            <div className={`${customeClass?.ciV1} flex flex-col w-full relative `}>
              {typeof children === 'function' ? (
                <>
                  {children({
                    ...(attrsInput as TInput),
                    className: cn({
                      'peer w-full shrink !outline-none border-none focus:border-none focus:ring-0 p-0 text-body-base placeholder:text-gray-400': !isNotUsingDefaultStyle?.input,
                      '!bg-disabled': disabled,
                      'px-4': customeElement?.preEnd,
                      'pr-4 pl-1': customeElement?.preStart,
                      [customeClass?.input || '']: customeClass?.input
                    }),
                    name,
                    type: dynamicType,
                    disabled,
                    value,
                    onChange
                  })}
                </>
              ) : (
                children
              )}
            </div>

            {isClerable && !isEmptyValue(customeClearValue) && <IconClose className='cursor-pointer' onClick={handleOnClearValue} />}

            <div
              className={cn({
                hidden: true,
                'shrink-0 !flex': customeElement?.end
              })}
            >
              {customeElement?.end}
            </div>

            <div
              className={cn({
                hidden: true,
                'shrink-0 !flex bg-gray-100 p-2 ': customeElement?.preEnd
              })}
            >
              {customeElement?.preEnd}
            </div>

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

export default ContainerInput
