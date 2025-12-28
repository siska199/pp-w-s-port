import { HTMLProps } from 'react';

import { cn } from '@lib/helper/function';
import { IconLoadingThreeDots } from '@assets/icons';

type TPropsLoading = HTMLProps<HTMLDivElement> & {
    type?: 'lazy-load-page' | 'page';
};

const Loading = (props: TPropsLoading) => {
    const { className, type } = props;
    return (
        <div
            className={cn({
                'top-0 z-[999] w-full m-auto flex items-center justify-center': true,
                'fixed top-0 z-[999] h-screen bg-black/30 ': type === 'page',
                [className || '']: true,
            })}
        >
            <IconLoadingThreeDots className="w-[5rem] h-[5rem]" />
        </div>
    );
};

export default Loading;
