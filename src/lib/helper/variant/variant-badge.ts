import variant from '@lib/helper/variant/variant-color';

const variantBadge = {
    ...variant,
};

export type TKeyVariantBadge = keyof typeof variantBadge;

export default variantBadge;
