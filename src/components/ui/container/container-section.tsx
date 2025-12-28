import React, { forwardRef } from 'react';

import Container, { TPropsContainer } from '@components/ui/container/container';
import HeaderSection from '@components/ui/header/header-section';

interface TProps extends TPropsContainer {
    children: React.ReactNode;
    title?: string;
}

const ContainerSection = forwardRef<HTMLDivElement, TProps>(({ children, className, title, ...attrs }, ref) => {
    return (
        <Container ref={ref} gap="base" variant={title ? 'vcc' : 'hcc'} className={`p-4 ${className ?? ''}`} {...attrs}>
            <HeaderSection title={title} />
            {children}
        </Container>
    );
});

ContainerSection.displayName = 'ContainerSection';

export default ContainerSection;
