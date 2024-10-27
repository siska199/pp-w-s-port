import { IconClose } from '@assets/icons'
import Button from '@components/ui/button'
import { cn } from '@lib/helper'
import { TBaseModal } from '@typescript/modules/ui/ui-types'
import { cva, VariantProps } from 'class-variance-authority'

export interface TModalProps extends TBaseModal, VariantProps<typeof modalVariants> {
  customeClass?: {
    mdModal?: string
    mdContent?: string
    mdBody?: string
    mdHeader?: string
  }
  className?: string
}

const ContainerModal = (props: TModalProps) => {
  const {
    isShow,
    customeClass,
    title,
    onClose: handleOnClose,
    children,
    variant = 'fadein-scaleup'
  } = props

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
  }

  return (
    <>
      <div
        className={cn(
          modalVariants({
            variant,
            className: `md-modal  ${isShow && 'md-show flex'} ${customeClass?.mdModal}`
          })
        )}
      >
        <div
          className={`md-content bottom-0 relative flex flex-col gap-4  w-full ${customeClass?.mdContent}`}
          onClick={handleStopPropagation}
        >
          {title && (
            <div
              className={`md-header border-b pb-2 font-bold text-gray-900 text-body-large ${customeClass?.mdHeader}`}
            >
              {title}
            </div>
          )}
          <Button
            className='absolute top-3 right-2 rounded-full w-[2rem] h-[2rem] '
            variant={'plain'}
            onClick={handleOnClose}
          >
            <IconClose />
          </Button>
          <div className={`max-h-[90vh] flex flex-col  space-y-2 ${customeClass?.mdBody}`}>
            {children}
          </div>
        </div>
      </div>

      <div className={`${isShow && 'md-show'} md-overlay h-screen max-h-screeen`} />
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
