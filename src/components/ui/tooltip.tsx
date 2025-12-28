import { forwardRef, useEffect } from 'react';

import { cn } from '@lib/helper/function';

interface TPropsTooltip {
    children: React.ReactNode;
    text: string;
    variant?: 'top' | 'bottom' | 'left' | 'right';
    type?: 'glass';
    customeClass?: {
        tooltip?: string;
        rectangle?: string;
    };
}

const Tooltip = forwardRef<HTMLDivElement, TPropsTooltip>((props, ref) => {
    const { children, type, text, variant = 'top', customeClass } = props;

    useEffect(() => {
        import('@assets/styles/tooltip.css');
    }, []);

    if (!text) return null;

    return (
        <div data-text={text} className={classNameContainerTooltip({ customeClass, text, variant })} ref={ref}>
            {children}
            <span className={classNameContainerText({ customeClass, variant, type })}></span>
        </div>
    );
});

type TPropsClassNameContainerTooltip = Pick<TPropsTooltip, 'text' | 'variant' | 'type' | 'customeClass'>;

const classNameContainerTooltip = ({ customeClass, variant, type }: TPropsClassNameContainerTooltip) =>
    cn({
        'tooltip p-1  relative !overflow-visible w-fit  relative': true,
        [customeClass?.tooltip || '']: true,
        [variant || '']: true,
        'hover:before:!bg-white/15': type === 'glass',
    });

type TPropsClassNameContainerText = Pick<TPropsTooltip, 'customeClass' | 'variant' | 'type'>;

const classNameContainerText = ({ customeClass, variant, type }: TPropsClassNameContainerText) =>
    cn({
        'rectangle ': true,
        [customeClass?.rectangle || '']: true,
        [variant || '']: true,
        '!border-transparent !border-t-transparent !border-b-white/15 !border-l-transparent !border-r-transparent': type === 'glass',
    });

export default Tooltip;
