import React, { useEffect, useRef, useState } from 'react';
import { messageError } from '@validation/constant';

import Avatar from '@components/ui/avatar';
import Button from '@components/ui/button';
import DisplayFile from '@components/ui/display/display-file';
import Image from '@components/ui/image';
import ContainerInput from '@components/ui/input/container-input';

import { compressImage, convertBytesToMegabytes, handleDownloadFile, isValidTypeFile } from '@lib/helper/function';
import { TFileWithPreview } from '@typescript/index-type';
import { TBasePropsInput, TCustomeEventOnChange, TTypeFile } from '@typescript/ui-types';
import { IconCamera, IconClose } from '@assets/icons';

export type TFileValue = TFileWithPreview | null;

export interface TPropsInputFileV1 extends Omit<TBasePropsInput, 'variant'>, Omit<Partial<React.HTMLProps<HTMLInputElement>>, 'value' | 'onChange'> {
    name: string;
    totalMaxSize?: number;
    listAcceptedTypeFile?: TTypeFile[] | [];
    onChange: (e: TCustomeEventOnChange<TFileValue>) => void;
    value: TFileValue | null | undefined;
    variant?: 'change-profile' | 'general';
    isCompress?: boolean;
}

const InputFileV1 = (props: TPropsInputFileV1) => {
    const { listAcceptedTypeFile = [TTypeFile.ALL], isCompress = false, totalMaxSize = 5, onChange, name, variant = 'general', errorMessage, ...attrsInput } = props;

    const inputFileRef = useRef<HTMLInputElement | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [acceptedFile, setAcceptedFile] = useState('');
    const [errorMessageDynamic, setErrorMessageDynamic] = useState('');

    useEffect(() => {
        setErrorMessageDynamic(errorMessage || '');
    }, [errorMessage]);

    useEffect(() => {
        setAcceptedFile(variant === 'change-profile' ? 'image/*' : listAcceptedTypeFile?.join(', '));
    }, [listAcceptedTypeFile]);

    const handleOnClickInput = <T extends React.MouseEvent>(e: T) => {
        e?.preventDefault();
        inputFileRef?.current?.click();
    };

    const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        try {
            const rawFile = e.target?.files?.[0];
            if (!rawFile) return;

            const isValidFile = handleValidationInputFile(rawFile);
            if (!isValidFile) {
                onChange({
                    target: {
                        name,
                        value: null,
                    },
                });
                return;
            }

            const processedFile = isCompress ? await compressImage(rawFile) : rawFile;

            const fileWithPreview: TFileWithPreview = Object.assign(processedFile, {
                preview: URL.createObjectURL(processedFile),
            });

            onChange({
                target: {
                    name,
                    value: fileWithPreview,
                },
            });
        } catch (error: any) {
            console.log('error: ', error?.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteFile = () => {
        onChange({
            target: {
                name,
                value: null,
            },
        });
    };

    const handleValidationInputFile = (file: File): boolean => {
        const totalSize = convertBytesToMegabytes(file.size);

        if (totalSize > totalMaxSize) {
            setErrorMessageDynamic(messageError.maxSizeFile);
            return false;
        }

        if (!isValidTypeFile({ file, listAcceptedTypeFile })) {
            setErrorMessageDynamic(messageError.fileType(listAcceptedTypeFile));
            return false;
        }

        setErrorMessageDynamic('');
        return true;
    };

    const handleOnDownloadFile = () => {
        const file = attrsInput?.value as TFileWithPreview | undefined;
        if (file?.preview && file?.name) {
            handleDownloadFile({
                url: file.preview,
                filename: file.name,
            });
        }
    };

    return (
        <>
            <ContainerInput<React.HTMLProps<HTMLInputElement>>
                {...attrsInput}
                customeClass={{
                    ...attrsInput.customeClass,
                    ciV2: '!border-none !p-0',
                }}
                errorMessage={errorMessageDynamic}
                isClerable={false}
            >
                {variant === 'change-profile' && (
                    <Avatar
                        size={'large'}
                        src={(attrsInput?.value as TFileWithPreview)?.preview || ''}
                        customeIcon={<IconCamera className="icon-primary-fill" onClick={(e) => handleOnClickInput(e)} />}
                    />
                )}
                {variant === 'general' && (
                    <div className="flex gap-4">
                        {(() => {
                            const file = attrsInput.value;
                            const isPdf = file?.type === 'application/pdf';
                            if (!file) {
                                return <PlaceholderImage url={isPdf ? 'placeholder-pdf.png' : 'placeholder-image.png'} errorMessageDynamic={errorMessageDynamic} />;
                            }

                            return <DisplayFile file={file} />;
                        })()}

                        <div className="my-auto space-y-3">
                            <p className="italic">
                                Please upload a file (Max size: {totalMaxSize}MB, Formats: {listAcceptedTypeFile?.includes(TTypeFile.ALL) ? 'All files' : listAcceptedTypeFile?.join(', ')})
                            </p>

                            <div className="flex gap-2">
                                <Button variant="outline-primary" isLoading={isLoading} onClick={handleOnClickInput}>
                                    Choose File
                                </Button>

                                {attrsInput?.value?.name && (
                                    <div className="flex gap-2 items-center">
                                        <span className={` text-gray ${attrsInput.value && 'cursor-pointer hover:underline'}`} onClick={handleOnDownloadFile}>
                                            {attrsInput?.value?.name ?? 'No File Chosen'}
                                        </span>
                                        <Button variant={'transparent'} onClick={handleDeleteFile}>
                                            <IconClose />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <input {...attrsInput} ref={inputFileRef} className="hidden " type="file" accept={acceptedFile} value={''} multiple={false} onChange={(e) => handleOnChange(e)} />
            </ContainerInput>
        </>
    );
};

const PlaceholderImage = (props: { errorMessageDynamic: string; url?: string }) => {
    const { errorMessageDynamic, url = 'placeholder-image.png' } = props;
    return (
        <Image
            className={`self-center h-[clamp(7rem,7rem,7rem)]  w-[clamp(7rem,7rem,7rem)] flex-shrink-0 border ${errorMessageDynamic && '!border-error'}`}
            width={500}
            height={500}
            src={url}
            alt="Initial Image"
        />
    );
};

export default React.memo(InputFileV1);
