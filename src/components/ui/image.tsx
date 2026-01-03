import React, { HTMLProps, useCallback, useEffect, useState } from 'react';

import { useIntersectionObserver } from '@hooks/use-intersection-observer';
import { cn, getAssetURL } from '@lib/helper/function';

import noImageAvailable from '../../assets/images/no-image-available.svg';

export interface TPropsImage extends Omit<Partial<HTMLProps<HTMLImageElement>>, 'src'> {
    src: string;
    alt?: string;

    customeClassName?: {
        container?: string;
        image?: string;
        containerOverlay?: string;
    };

    withSkeleton?: boolean;
    withLoadEffect?: boolean;
    timeoutLoadImage?: number;

    /** Lazy */
    lazy?: boolean;
    rootMargin?: string;

    overlay?: {
        isShowOnHover?: boolean;
        withBackdrop?: boolean;
        content?: React.ReactNode;
    };
}

const Image = (props: TPropsImage) => {
    const {
        src,
        alt = 'image',
        className,
        customeClassName,
        overlay,

        withSkeleton = true,
        withLoadEffect = true,
        timeoutLoadImage = 0,

        lazy = true,
        rootMargin = '200px',

        ...attrs
    } = props;

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({
        rootMargin,
        freezeOnceVisible: true,
    });

    const [isLoading, setIsLoading] = useState(true);

    const resolvedSrc = src?.includes('http') ? src : src ? getAssetURL({ name: src }) : noImageAvailable;

    const handleLoad = useCallback(() => {
        if (timeoutLoadImage) {
            setTimeout(() => setIsLoading(false), timeoutLoadImage);
        } else {
            setIsLoading(false);
        }
    }, [timeoutLoadImage]);
    if (!mounted) return null;

    return (
        <div ref={lazy ? ref : undefined} className={cn('relative group w-full h-full overflow-hidden', className, customeClassName?.container)}>
            {withSkeleton && isLoading && <div className="absolute inset-0 animate-pulse bg-gray-300 rounded" />}

            {(!lazy || isVisible) && (
                <img
                    src={resolvedSrc}
                    alt={alt}
                    loading="eager"
                    decoding="async"
                    onLoad={handleLoad}
                    className={cn(
                        'w-full h-full object-cover object-center transition-all duration-300',
                        {
                            'blur-sm scale-[1.02]': isLoading && withLoadEffect,
                            'blur-0 scale-100': !isLoading,
                        },
                        customeClassName?.image,
                    )}
                    {...attrs}
                />
            )}

            {overlay?.content && (
                <div
                    className={cn(
                        'absolute inset-0 transition-all duration-300',
                        overlay.isShowOnHover && 'opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0',
                        overlay.withBackdrop && 'bg-black/30',
                        customeClassName?.containerOverlay,
                    )}
                >
                    {overlay.content}
                </div>
            )}
        </div>
    );
};

export default React.memo(Image);
