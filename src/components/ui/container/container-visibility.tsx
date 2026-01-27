import React from 'react';

interface TProps {
    isVisible: boolean;
    children: React.ReactNode;
}
const ContainerVisibility = (props: TProps) => {
    const { children, isVisible } = props;
    if (!isVisible) return null;
    return children;
};

export default ContainerVisibility;
