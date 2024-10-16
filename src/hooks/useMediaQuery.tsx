import { useEffect, useState } from 'react';

const mediaQueryConfig = {
    isMinLg: '(min-width: 1024px)',
    isMinMd: '(min-width: 768px)',
    isMaxMd: '(max-width: 768px)',
    isMinSm: '(min-width: 640px)'
};


type TKeyMediaQuery = keyof typeof mediaQueryConfig

type TMediaQueryConfig = typeof mediaQueryConfig;

type TMediaQueryMatches = {
    [key in keyof TMediaQueryConfig]: boolean;
};

const useMediaQuery = () => {
    const [matches, setMatches] = useState<TMediaQueryMatches>(() => {
        const initialMatches: TMediaQueryMatches = {} as TMediaQueryMatches;
        for (const key in mediaQueryConfig) {
            initialMatches[key as TKeyMediaQuery] = window.matchMedia(mediaQueryConfig[key as TKeyMediaQuery]).matches;
        }
        return initialMatches;
    });

    useEffect(() => {
        const mediaQueryLists: { [key in keyof TMediaQueryConfig]: MediaQueryList } = {} as {
            [key in keyof TMediaQueryConfig]: MediaQueryList;
        };

        for (const key in mediaQueryConfig) {
            mediaQueryLists[key as TKeyMediaQuery] = window.matchMedia(mediaQueryConfig[key as TKeyMediaQuery]);
        }

        const handleMediaQueryChange = () => {
            const updatedMatches: TMediaQueryMatches = {} as TMediaQueryMatches;
            for (const key in mediaQueryConfig) {
                updatedMatches[key as TKeyMediaQuery] = mediaQueryLists[key as TKeyMediaQuery].matches;
            }

            
            setMatches(updatedMatches);
        };

        for (const key in mediaQueryLists) {
            mediaQueryLists[key as TKeyMediaQuery].addEventListener('change', handleMediaQueryChange);
        }

        const handleResize = () => {
            handleMediaQueryChange();
        };

        handleMediaQueryChange();
        
        window.addEventListener('resize', handleResize);

        return () => {
            for (const key in mediaQueryLists) {
                mediaQueryLists[key as  TKeyMediaQuery].removeEventListener('change', handleMediaQueryChange);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return matches;
};

export default useMediaQuery;
