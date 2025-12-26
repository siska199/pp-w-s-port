import React, { useState } from 'react';

import Image from '@components/ui/image';

import { getGeneralTypeFile } from '@lib/helper/function';
import { TFileWithPreview } from '@typescript/index-type';
export interface TPropsThumbnail {
    file: TFileWithPreview | null;
    className?: {
        containerImage?: string;
        containerPDF?: string;
    };
}

const PDFThumbnail = React.lazy(() => import('@components/ui/pdf-thumbnail'));
const ModalPreviewPDF = React.lazy(() => import('@components/ui/preview-file/modal-preview-pdf'));

const DisplayFile = React.memo((props: TPropsThumbnail) => {
    const { file, className } = props;
    const [showPreview, setShowPreview] = useState(false);

    const handleTogglePreview = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e?.stopPropagation();
        e?.preventDefault();
        setShowPreview(!showPreview);
    };

    if (!file) return null;

    return (
        <>
            {getGeneralTypeFile(file?.type) === 'image' && (
                <Image
                    className={`self-center  flex-shrink-0   h-[clamp(7rem,7rem,7rem)]  w-[clamp(7rem,7rem,7rem)] border ${className?.containerImage}`}
                    width={500}
                    height={500}
                    src={file?.preview || ''}
                    alt="Preview Image"
                />
            )}
            {getGeneralTypeFile(file?.type) === 'pdf' && (
                <>
                    <PDFThumbnail
                        customeClass={{
                            container: `flex-shrink-0  h-[clamp(7rem,7rem,7rem)]  w-[clamp(7rem,7rem,7rem)] cursor-zoom-in ${className?.containerPDF}`,
                        }}
                        file={file}
                        onClick={handleTogglePreview}
                    />
                    <ModalPreviewPDF file={file} isShow={showPreview} onClose={handleTogglePreview} />
                </>
            )}
        </>
    );
});

export default DisplayFile;
