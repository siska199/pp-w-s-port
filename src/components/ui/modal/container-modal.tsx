import React, { useEffect, useRef } from 'react'
import { cva, VariantProps } from 'class-variance-authority'

import Button from '@components/ui/button'

import { cn } from '@lib/helper/function'
import { TBaseModal } from '@typescript/ui-types'
import { IconClose } from '@assets/icons'

export interface TContainerModalProps extends TBaseModal, VariantProps<typeof modalVariants> {
  customeClass?: {
    mdOverlay?: string
    mdModal?: string
    mdContent?: string
    mdBody?: string
    mdHeader?: string
    mdFooter?: string
    btnClose?: {
      container?: string
      icon?: string
    }
  }
  footer?: React.ReactNode
}

const ContainerModal = (props: TContainerModalProps) => {
  const {
    isShow,
    customeClass,
    title,
    onClose: handleOnClose,
    children,
    variant = 'fadein-scaleup',
    footer
  } = props

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
  }
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    isShow && bodyRef?.current?.scrollTo(0, 0)
  }, [isShow])

  return (
    <>
      <div
        className={cn(
          modalVariants({
            variant,
            className: `md-modal p-0 px-4 ${isShow && 'md-show flex'} ${customeClass?.mdModal}`
          })
        )}
      >
        <div
          className={`md-content max-h-[95vh] bg-white relative flex flex-col gap-4 w-full ${customeClass?.mdContent}`}
          onClick={handleStopPropagation}
        >
          {title && (
            <div
              className={`md-header border-b p-4 !pt-2 font-bold text-gray-900 text-body-large ${customeClass?.mdHeader}`}
            >
              {title}
            </div>
          )}
          <Button
            className={`absolute top-3 z-[4] right-2 rounded-full p-1 ${customeClass?.btnClose?.container}`}
            variant={'transparent'}
            onClick={handleOnClose}
          >
            <IconClose
              className={`icon-black w-[1.25rem] h-[1.25rem] ${customeClass?.btnClose?.icon}`}
            />
          </Button>
          <div
            ref={bodyRef}
            className={`overflow-y-scroll  flex flex-col space-y-4 px-4 ${customeClass?.mdBody}`}
          >
            {children}
          </div>
          {footer && <div className={`${customeClass?.mdFooter}`}>{footer}</div>}
        </div>
      </div>

      <div
        className={`${isShow && 'md-show'} md-overlay ${customeClass?.mdOverlay}  h-screen max-h-screeen`}
      />
    </>
  )
}

const modalVariants = cva(' min-w-full p-4 md:min-w-[20rem] max-w-[90%] ', {
  variants: {
    variant: {
      'fadein-scaleup': 'md-fadein-scaleup min-h-[10rem]', // Fade in and scale up
      'slide-from-right': 'md-slide-from-right min-h-[10rem]', // Slide from the right
      drawer: 'md-drawer p-0 w-full' // Drawer
    }
  }
})

export default ContainerModal
