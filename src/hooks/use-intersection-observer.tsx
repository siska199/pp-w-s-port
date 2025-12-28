import { useEffect, useRef, useState } from 'react';

export interface IntersectionOptions extends IntersectionObserverInit {
    freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = <T extends HTMLElement>(options?: IntersectionOptions) => {
    const { threshold = 0, root = null, rootMargin = '0px', freezeOnceVisible = true } = options || {};

    const ref = useRef<T | null>(null);
    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

    const isVisible = !!entry?.isIntersecting;

    useEffect(() => {
        if (!ref.current) return;
        if (freezeOnceVisible && isVisible) return;

        const observer = new IntersectionObserver(([entry]) => setEntry(entry), {
            threshold,
            root,
            rootMargin,
        });

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [root, rootMargin, threshold, freezeOnceVisible, isVisible]);

    return { ref, entry, isVisible };
};
