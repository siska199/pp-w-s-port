import React, { useEffect, useRef, useState } from 'react';

const LazyDocument = React.lazy(() => import('react-pdf').then((module) => ({ default: module.Document })));
const LazyPage = React.lazy(() => import('react-pdf').then((module) => ({ default: module.Page })));

interface TProps extends React.ComponentProps<typeof LazyDocument> {
    customeClass?: {
        container: string;
    };
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const PDFThumbnail = (props: TProps) => {
    const { onClick, ...attrsDocument } = props;
    const [containerSize, setContainerSize] = useState({ width: 0 });

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        import('react-pdf/dist/esm/Page/AnnotationLayer.css');
        import('react-pdf/dist/esm/Page/TextLayer.css');
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.clientWidth;
            setContainerSize({
                width: containerWidth,
            });
        }
    }, []);

    return (
        <div className={`border overflow-hidden flex items-center justify-center ${props.customeClass?.container || ''}`} ref={containerRef} onClick={onClick}>
            {containerSize.width > 0 && (
                <LazyDocument {...attrsDocument}>
                    <LazyPage pageNumber={1} width={containerSize.width} renderTextLayer={false} />
                </LazyDocument>
            )}
        </div>
    );
};

export default React.memo(PDFThumbnail);
