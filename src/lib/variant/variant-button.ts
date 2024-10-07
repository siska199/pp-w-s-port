import variant from '@lib/variant/variant-color';

export const variantButton = {
  ...variant,
  'link-black': 'bg-white text-black',
  'link-gray': 'bg-white text-gray !font-medium hover:underline ',
  'link-primary': 'bg-white text-primary',
  'link-sucess': 'bg-white text-sucess',
  'link-warning': 'bg-white text-warning',
  'link-error': 'bg-white text-error',

  'no-style': '',
  plain:
    'bg-white hover:!bg-gray-100 text-gray-900 focus:ring-0 !p-2 border-none disabled:opacity-50',
  transparent:
    'bg-transparent hover:!bg-white/20 !rounded-full !p-2 focus:ring-0 active:!bg-white/20 disabled:opacity-50',
  glass: ' bg-glass text-white',
};

Object.entries(variantButton)?.forEach(([key, value]) => {
  const conditions = [
    {
      check: key?.includes('primary') && !key?.includes('link'),
      suffix: `${/solid|outline/.test(key) && 'hover:bg-primary-600'} ${
        /outline/.test(key) && 'hover:text-white'
      } ${
        /solid/.test(key) && ' disabled:bg-primary-300'
      }  focus:ring-4 focus:ring-primary-200 disabled:border-primary-300`,
    },
    {
      check: key?.includes('warning') && !key?.includes('link'),
      suffix: `${/solid|outline/.test(key) && 'hover:bg-warning-600'}  ${
        /outline/.test(key) && 'hover:text-white'
      }  ${
        /solid/.test(key) && ' disabled:bg-warning-300'
      } focus:ring-4 focus:ring-warning-200  disabled:border-warning-300`,
    },
    {
      check: key?.includes('sucess') && !key?.includes('link'),
      suffix: `${/solid|outline/.test(key) && 'hover:bg-sucess-600'}  ${
        /outline/.test(key) && 'hover:text-white'
      } ${
        /solid/.test(key) && ' disabled:bg-sucess-300 '
      }   focus:ring-4 focus:ring-sucess-200 disabled:border-sucess-300`,
    },
    {
      check: key?.includes('error') && !key?.includes('link'),
      suffix: `${/solid|outline/.test(key) && 'hover:bg-error-600'}  ${
        /outline/.test(key) && 'hover:text-white'
      } ${
        /solid/.test(key) && '  disabled:bg-error-300 '
      }   focus:ring-4 focus:ring-error-200 disabled:border-error-300`,
    },
    {
      check: key?.includes('black') && !key?.includes('link'),
      suffix: `${/solid|outline/.test(key) && 'hover:bg-black/90'}  ${
        /outline/.test(key) && 'hover:text-white'
      }   focus:ring-4 focus:ring-black/70`,
    },
    {
      check: key?.includes('white') && !key?.includes('link'),
      suffix: 'hover:!bg-gray-100 !text-gray-900 focus:ring-gray-200 ',
    },
    {
      check: key?.includes('link'),
      suffix:
        '!p-0 bg-transparent !inline font-normal !rounded-none justify-start',
    },
  ];

  conditions.forEach(({ check, suffix }) => {
    if (check) {
      variantButton[key as keyof typeof variantButton] = `${value} ${suffix}`;
    }
  });

  if (!key?.includes('link')) {
    variantButton[key as keyof typeof variantButton] = `${
      variantButton[key as keyof typeof variantButton]
    } cursor-pointer-custome`;
  }
});
