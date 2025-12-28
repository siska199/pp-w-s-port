import React, { useEffect, useState } from 'react';

import Container from '@components/ui/container/container';
import HelperMessage from '@components/ui/helper-message';

import { cn, isEmptyValue } from '@lib/helper/function';
import { TBasePropsInput } from '@typescript/ui-types';
import { IconClose, IconEye, IconEyeClose } from '@assets/icons';

export interface TPropsInput<TInput> extends TBasePropsInput {
    children: React.ReactNode | ((attrsInput: TInput) => React.ReactNode);
    disabled?: boolean;
    name?: string;
    type?: string;
    onlyContainer?: boolean;
    isClerable?: boolean;
    value?: any;
    onChange?: (e: any) => void;
    childrenOverlay?: React.ReactNode;
    isNotUsingDefaultStyle?: {
        input?: boolean;
    };
    onCustomeClearHandler?: () => void;
    maxLength?: number;
}

const ContainerInput = <TInput,>(props: TPropsInput<TInput>) => {
    const {
        name,
        children,
        onCustomeClearHandler,
        isNotUsingDefaultStyle,
        childrenOverlay,
        label,
        isClerable = false,
        type,
        onlyContainer = false,
        errorMessage,
        customeElement,
        disabled,
        customeClass,
        value,
        onChange,
        maxLength,
        ...attrsInput
    } = props;

    const [dynamicType, setDynamicType] = useState(type);

    useEffect(() => {
        import('@assets/styles/input/input-base.css');
    }, []);

    const handleToggleTypePassword = () => {
        setDynamicType(dynamicType === 'password' ? 'text' : 'password');
    };

    const handelOnChange = (e: any) => {
        const isReachLimit = Number(e.target.value?.length ?? 0) > Number(maxLength);
        if (!isReachLimit && onChange) return onChange(e);
    };

    const handleOnClearValue = () => {
        if (onCustomeClearHandler) return onCustomeClearHandler();
        if (onChange && !disabled)
            return onChange({
                target: {
                    name: name || '',
                    value: Array.isArray(value) ? [] : '',
                },
            });
    };

    return (
        <Container className={`${customeClass?.ciV4} relative flex flex-col gap-1`}>
            <section className={`${customeClass?.ciV3} flex flex-col gap-2 w-full`}>
                <Label label={label} name={name} value={value} maxLength={maxLength} />
                {onlyContainer && typeof children !== 'function' ? (
                    children
                ) : (
                    <div
                        className={classNameCIV2({
                            ciV2: customeClass?.ciV2,
                            ...customeElement,
                            errorMessage,
                            disabled,
                        })}
                    >
                        <CustomeElement type="start" elmn1={customeElement?.preStart} elmn2={customeElement?.start} />

                        <div className={`${customeClass?.ciV1} text-black flex flex-col w-full relative `}>
                            {typeof children === 'function' ? (
                                <>
                                    {children({
                                        ...(attrsInput as TInput),
                                        className: classNameInput({
                                            customeClassInput: customeClass?.input,
                                            ...customeElement,
                                            isNotUsingDefaultStyleInput: isNotUsingDefaultStyle?.input,
                                        }),
                                        name,
                                        type: dynamicType,
                                        disabled,
                                        value,
                                        onChange: handelOnChange,
                                        maxLength,
                                        id: name,
                                    })}
                                </>
                            ) : (
                                children
                            )}
                        </div>

                        {isClerable && !isEmptyValue(value) && !disabled && <IconClose className="cursor-pointer" onClick={handleOnClearValue} />}

                        <CustomeElement type="end" elmn1={customeElement?.preEnd} elmn2={customeElement?.end} />

                        {type === 'password' && (
                            <div onClick={handleToggleTypePassword} className="cursor-pointer-custome ">
                                {dynamicType === 'password' ? <IconEye /> : <IconEyeClose />}
                            </div>
                        )}
                    </div>
                )}
            </section>
            {childrenOverlay}
            <HelperMessage variant={'error'} message={errorMessage} />
        </Container>
    );
};

interface TPropsCustomeElement {
    elmn1?: React.ReactNode;
    elmn2?: React.ReactNode;
    type?: 'end' | 'start';
}
const CustomeElement = (props: TPropsCustomeElement) => {
    const { elmn1, elmn2, type } = props;
    return (
        <>
            {elmn1 && (
                <div
                    className={cn({
                        ['hidden']: true,
                        ['!flex shrink-0 bg-gray-100 p-2']: elmn1,
                    })}
                >
                    <div className="min-w-[1.5rem] flex justify-center items-center"> {elmn1}</div>
                </div>
            )}
            {elmn2 && (
                <div
                    className={cn({
                        ['hidden']: true,
                        ['shrink-0 !flex']: elmn2,
                        ['pr-2']: type === 'end',
                    })}
                >
                    {elmn2}
                </div>
            )}
        </>
    );
};

interface TPropsLabel {
    label?: string;
    maxLength?: number;
    name?: string;
    value: any;
}
const Label = (props: TPropsLabel) => {
    const { label, maxLength, value, name } = props;

    return (
        <>
            {label && (
                <div className="flex justify-between gap-4">
                    <label htmlFor={name} className={'font-medium w-fit'}>
                        {label}
                    </label>

                    {maxLength && <span className="text-gray text-body-small">{maxLength - Number(value?.length ?? 0)}</span>}
                </div>
            )}
        </>
    );
};

interface TClassNameCIV2 {
    ciV2: string;
    preStart: React.ReactNode;
    preEnd: React.ReactNode;
    errorMessage: string;
    disabled: boolean;
}
const classNameCIV2 = ({ ciV2, preStart, preEnd, errorMessage, disabled }: Partial<TClassNameCIV2>) =>
    cn({
        'bg-white flex flex-nowrap items-center gap-2 text-body-base border border-input rounded-lg  w-full ': true,
        [`${ciV2}`]: ciV2,
        '!bg-disabled !border': disabled,
        'focus-within:ring-primary-200 focus-within:border-primary': !errorMessage,
        'border-error focus-within:!ring-error-200 focus-within:!border-error': errorMessage,
        'px-3 py-2': !preStart && !preEnd,
        'overflow-hidden': preStart || preEnd,
    });

interface TClassNameInput {
    preStart: React.ReactNode;
    preEnd: React.ReactNode;
    isNotUsingDefaultStyleInput: boolean;
    customeClassInput: string;
}

const classNameInput = ({ preEnd, preStart, isNotUsingDefaultStyleInput, customeClassInput }: Partial<TClassNameInput>) =>
    cn({
        'peer w-full shrink !outline-none border-none focus:border-none focus:ring-0 p-0 text-body-base placeholder:text-gray-400': !isNotUsingDefaultStyleInput,
        'px-4': preEnd,
        'pr-4 pl-1': preStart,
        [customeClassInput || '']: customeClassInput,
    });
export default ContainerInput;
