import React, { useEffect, useMemo, useRef, useState } from 'react';
import { messageError } from '@validation/constant';

import ContainerInput from '@components/ui/input/container-input';

import { cn, convertBytesToMegabytes, handleDownloadFile, isValidTypeFile } from '@lib/helper/function';
import { TBasePropsInput, TCustomeEventOnChange, TEventOnChange, TTypeFile } from '@typescript/ui-types';
import { IconClose, IconFile } from '@assets/icons';
type TFileWithPreview = File & { preview?: string };
export type TFileValue = TFileWithPreview | null;

type TProps = TBasePropsInput &
    Omit<Partial<React.HTMLProps<HTMLInputElement>>, 'value' | 'onChange'> & {
        multiple?: boolean;
        name: string;
        listAcceptedTypeFile?: TTypeFile[] | [];
        onChange: (e: TEventOnChange) => void;
        value: TFileValue[] | TFileValue | null;
        totalMaxSize?: number;
    };

const InputFileV2 = (props: TProps) => {
    const { listAcceptedTypeFile = [TTypeFile.ALL], onChange, totalMaxSize = 5, ...attrs } = props;
    const inputFileRef = useRef<HTMLInputElement | null>(null);

    const [dragActive, setDragActive] = useState(false);
    const [acceptedFile, setAcceptedFile] = useState('');
    const [errorMessageDynamic, setErrorMessageDynamic] = useState('');

    useEffect(() => {
        setAcceptedFile(listAcceptedTypeFile?.join(','));
    }, [listAcceptedTypeFile]);

    const arrValue = useMemo(() => [...Array.from(Array.isArray(attrs?.value) ? attrs.value : attrs.value ? [attrs.value] : [])], [attrs.value]);

    const handleFileDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const files = [...e.dataTransfer.files];
        handleOnChange(files);
        setDragActive(false);
    };

    const handleOnClickInput = () => {
        inputFileRef?.current?.click();
    };

    const handleOnChange = async (params: File[]) => {
        const files = [...params];

        const isValid = handleValidationInputFile(files);
        if (!isValid) return;

        const processedFiles = files;

        const value = attrs?.multiple ? [...processedFiles, ...arrValue] : processedFiles[0];

        onChange({
            target: {
                name: attrs?.name,
                value,
            },
        } as TCustomeEventOnChange<TProps['multiple'] extends true ? File[] : File>);

        setErrorMessageDynamic('');
    };

    const handleValidationInputFile = (file: File[] | File): boolean => {
        const isValid = true;
        const isMultiple = Array.isArray(file);

        const totalSize: number = convertBytesToMegabytes(isMultiple ? file?.reduce((acc, data) => acc + data?.size, 0) : file?.size);

        if (totalSize > totalMaxSize) {
            setErrorMessageDynamic(messageError.maxSizeFile);
            return false;
        }

        const isAllFileTypesAllowed = isMultiple ? file?.every((sFile) => isValidTypeFile({ file: sFile, listAcceptedTypeFile })) : isValidTypeFile({ file, listAcceptedTypeFile });

        if (!isAllFileTypesAllowed) {
            setErrorMessageDynamic('Please upload the correct type file');
        }

        return isValid;
    };

    const handleRemoveItem = (index: number) => {
        const isMultiple = Array.isArray(attrs?.value);
        const value = isMultiple ? Array.from(attrs?.value as File[])?.filter((_, i) => i !== index) : null;

        onChange({
            target: {
                name: attrs?.name,
                value,
            },
        });
    };

    return (
        <ContainerInput<React.HTMLProps<HTMLInputElement>>
            {...attrs}
            onChange={(e) => handleOnChange(e.target.files)}
            customeClass={{
                ciV2: '!border-none !p-0',
            }}
            errorMessage={errorMessageDynamic || props?.errorMessage}
        >
            {(attrsInput) => (
                <>
                    <div className={'flex flex-col gap-4 w-full sm:w-[20rem]'}>
                        <div
                            onDragEnter={handleFileDrag}
                            onDragOver={handleFileDrag}
                            onDragLeave={handleFileDrag}
                            onDrop={handleFileDrop}
                            className={cn({
                                'flex flex-col items-center justify-center gap-2 rounded-md cursor-pointer-custome  text-center border-2 border-dashed  p-4 md:p-8 h-fit md:h-[10rem]': true,
                                ' border-primary': dragActive,
                            })}
                            onClick={handleOnClickInput}
                        >
                            <div className="p-3 rounded-full w-fit bg-gray-100">
                                <IconFile className="icon-gray" />
                            </div>
                            <p className="text-gray-900 text-center">Select Files to Upload</p>
                            <p className="text-gray text-body-small text-center">Drag and Drop Files Here to Upload</p>
                        </div>

                        <div className="flex flex-col gap-2">{arrValue?.map((value, i) => <CardFileUploaded key={i} i={i} value={value} onRemoveItem={handleRemoveItem} />)}</div>
                    </div>
                    <input ref={inputFileRef} {...attrsInput} className="hidden" type="file" accept={acceptedFile} value={''} />
                </>
            )}
        </ContainerInput>
    );
};

interface TPropsCardFileUploaded {
    onRemoveItem: (i: number) => void;
    i: number;
    value: TFileValue;
}

const CardFileUploaded = (props: TPropsCardFileUploaded) => {
    const { value, onRemoveItem: handleRemoveItem, i } = props;
    const handleOnDownloadFile = () => {
        const file = value;
        handleDownloadFile({
            url: file?.preview ?? '',
            filename: file?.name ?? '',
        });
    };
    return (
        <div className="bg-gray-50 border items-center rounded-md p-2 relative flex gap-2 ">
            <IconFile className="w-10 h-10 flex-shrink-0 flex" />

            <div className="flex flex-col gap-2 flex-grow max-w-[calc(100%-3rem)] ">
                <div className="flex justify-between items-center gap-2 w-full">
                    <p onClick={handleOnDownloadFile} className="cursor-pointer-custome hover:underline truncate text-wrap w-full  ">
                        {value?.name}
                    </p>
                    <IconClose className="cursor-pointer-custome flex-shrink-0" onClick={() => handleRemoveItem(i)} />
                </div>
            </div>
        </div>
    );
};

export default InputFileV2;
