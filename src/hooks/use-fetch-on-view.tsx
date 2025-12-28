import { useEffect, useRef, useState } from 'react';

import { useIntersectionObserver } from '@hooks/use-intersection-observer';

interface UseFetchOnViewOptions<T> {
    fetcher: () => Promise<T>;
    enabled?: boolean;
    rootMargin?: string;
}

export const useFetchOnView = <T,>({ fetcher, enabled = true, rootMargin = '200px' }: UseFetchOnViewOptions<T>) => {
    const fetchedRef = useRef<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({
        rootMargin,
        freezeOnceVisible: true,
    });

    useEffect(() => {
        if (!enabled || !isVisible || fetchedRef.current) return;

        fetchedRef.current = true;
        setLoading(true);

        fetcher();
    }, [enabled, isVisible, fetcher]);

    return {
        ref,
        loading,
        isVisible,
    };
};
