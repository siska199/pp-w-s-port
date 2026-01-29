import React from 'react';

interface TProps {
    isVisible: boolean;
    children: React.ReactNode;
    emptyElmn? : React.ReactElement
}
const ContainerVisibility = (props: TProps) => {
    const { children, isVisible, emptyElmn } = props;
    if (!isVisible) return emptyElmn? emptyElmn: null;
    return children;
};

export default ContainerVisibility;
