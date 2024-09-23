import variant from '@lib/variant/variant-color'

export const variantAlertError = {
  'error-solid': variant['solid-error'],
  'error-soft': variant['soft-error'],
  'error-outline': variant['outline-error']
}
export const variantAlertSucess = {
  'sucess-solid': variant['solid-sucess'],
  'sucess-soft': variant['soft-sucess'],
  'sucess-outline': variant['outline-sucess']
}
export const variantAlertWarning = {
  'warning-solid': variant['solid-warning'],
  'warning-soft': variant['soft-warning'],
  'warning-ouline': variant['outline-warning']
}

const variantsAlert = {
  variant: {
    ...variantAlertSucess,
    ...variantAlertWarning,
    ...variantAlertError,
    notification: {
      ...variant
    },
    info: {
      ...variant
    }
  },
  position: {
    'top-left': 'top-6 left-6',
    'top-right': 'top-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-right': 'bottom-6 right-6'
  },
  isFixed: {
    true: 'fixed z-[99] ',
    false: 'static  '
  }
}

export default variantsAlert
