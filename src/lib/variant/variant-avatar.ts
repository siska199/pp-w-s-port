import variant from "@lib/variant/variant-color"

const variantsAvatar = {
  variant: {
    ...variant
  },
  size: {
    tiny: 'w-[1.625rem] h-[1.625rem] text-[12px] [&>span]:w-[0.65rem] [&>span]:h-[0.65rem]',
    small: 'w-[2.375rem] h-[2.375rem] ',
    base: 'w-[2.875rem] h-[2.875rem] text-[16px]',
    large: 'w-[3.875rem] h-[3.875rem] text-[20px] [&>span]:top-1 [&>span]:right-1'
  },
  shape: {
    rounded: 'rounded-md [&>span]:-top-1 [&>span]:-right-1',
    circular: 'rounded-full'
  },
  status: {
    offline: '[&>span]:bg-gray',
    online: '[&>span]:bg-success ',
    away: '[&>span]:bg-warning',
    dontdistrub: '[&>span]:bg-error',
    icon: '[&>span]:bg-transparent'
  }
}

export default variantsAvatar
