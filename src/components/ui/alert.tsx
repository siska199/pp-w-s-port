import { HTMLProps, useEffect, useState } from 'react'
import { cva, VariantProps } from 'class-variance-authority'

import { handleSetAlertConfig } from '@store/ui-slice'
import { cn } from '@lib/helper/function'
import variantsAlert, {
  variantAlertError,
  variantAlertSucess,
  variantAlertWarning
} from '@lib/helper/variant/variant-alert'
import variant from '@lib/helper/variant/variant-color'
import { TAlertConfig } from '@typescript/ui-types'
import { IconClose, IconDanger, IconInfo, IconNotification, IconSucess } from '@assets/icons'

interface TPropsVariantError extends VariantProps<typeof alertVariantError> {
  type: 'error'
}
interface TPropsVariantWarning extends VariantProps<typeof alertVariantWarning> {
  type: 'warning'
}

interface TPropsVariantSuccess extends VariantProps<typeof alertVariantSucess> {
  type: 'sucess'
}

interface TPropsVariantGeneral extends VariantProps<typeof alertVariantGeneral> {
  type?: 'notification' | 'info'
}

export type TAlertProps = HTMLProps<HTMLButtonElement> &
  TAlertConfig &
  (TPropsVariantError | TPropsVariantWarning | TPropsVariantSuccess | TPropsVariantGeneral)

const Alert = (props: TAlertProps) => {
  const {
    variant,
    customeIcon,
    type = 'info',
    withIcon,
    show,
    message,
    isFixed = true,
    withCloseBtn = false,
    autoClose = true,
    className = '',
    position = 'top-right',
    timeout = 3000,
    onDismiss: handleOnDismiss
  } = props
  const [isCloseAlert, setIsCloseAlert] = useState(!show)

  useEffect(() => {
    setIsCloseAlert(!show)
  }, [show])

  useEffect(() => {
    if (timeout > 0 && autoClose && show) {
      const timer = setTimeout(() => {
        setIsCloseAlert(true)
        handleOnDismiss ? handleOnDismiss() : handleSetAlertConfig({ show: false })
      }, timeout)
      return () => clearTimeout(timer)
    }
  }, [show])

  const getAlertVariant = () => {
    switch (type) {
      case 'error':
        return alertVariantError
      case 'sucess':
        return alertVariantSucess
      case 'warning':
        return alertVariantWarning
      case 'notification':
      case 'info':
        return alertVariantGeneral
      default:
        return alertVariantError // Default to error variant if type is not specified or unrecognized
    }
  }

  const paramsAlertVariant = { className, variant, position, isFixed }
  const alertVariant = getAlertVariant()

  return (show && !isCloseAlert) || !isFixed ? (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <div className={cn(alertVariant(paramsAlertVariant))}>
      <div
        className={cn({
          'flex gap-3 w-full relative': true,
          'pr-4': withCloseBtn
        })}
      >
        {withCloseBtn && (
          <IconClose
            onClick={handleOnDismiss}
            className={cn({
              'top-1 right-0 absolute  cursor-pointer-custome': true,
              'icon-warning': type === 'warning',
              'icon-error': type === 'error',
              'icon-sucess': type === 'sucess'
            })}
          />
        )}

        {withIcon && (
          <span className='mt-1'>
            {customeIcon ?? (
              <>
                {type === 'info' && <IconInfo className='icon-gray' />}
                {type === 'warning' && <IconInfo className='icon-warning ' />}
                {type === 'error' && <IconDanger className='icon-error' />}
                {type === 'sucess' && <IconSucess className='icon-sucess' />}
                {type === 'notification' && <IconNotification />}
              </>
            )}
          </span>
        )}
        {message}
      </div>
    </div>
  ) : null
}

const generalStyle =
  'flex flex-shrink gap-3 px-3 py-2 border w-fit min-w-[15rem] rounded-md max-w-[20rem]'

const alertVariantError = cva(generalStyle, {
  variants: {
    ...variantsAlert,
    variant: {
      ...variantAlertError
    }
  },
  defaultVariants: {
    variant: 'error-soft'
  }
})

const alertVariantSucess = cva(generalStyle, {
  variants: {
    ...variantsAlert,
    variant: {
      ...variantAlertSucess
    }
  },
  defaultVariants: {
    variant: 'sucess-soft'
  }
})

const alertVariantWarning = cva(generalStyle, {
  variants: {
    ...variantsAlert,
    variant: {
      ...variantAlertWarning
    }
  },
  defaultVariants: {
    variant: 'warning-soft'
  }
})

const alertVariantGeneral = cva(generalStyle, {
  variants: {
    ...variantsAlert,
    variant: {
      ...variant
    }
  },
  defaultVariants: {
    variant: 'solid-white'
  }
})

export default Alert
