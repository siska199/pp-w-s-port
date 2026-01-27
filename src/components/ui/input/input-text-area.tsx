import React from 'react';

import ContainerInput from '@components/ui/input/container-input';

import { TBasePropsInput } from '@typescript/ui-types';

interface TProps extends TBasePropsInput, React.HTMLProps<HTMLTextAreaElement> {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    isUpdated?: boolean;
}

const InputTextArea = (props: TProps) => {
    const { isUpdated: _isUpdated, ...attrs } = props;
    return (
        <ContainerInput<React.HTMLProps<HTMLTextAreaElement>>
            customeClass={{
                ...attrs?.customeClass,
                ciV2: `${attrs?.customeClass?.ciV2} `,
            }}
            {...attrs}
        >
            {(attrsInput) => <textarea {...attrsInput} />}
        </ContainerInput>
    );
};

export default React.memo(InputTextArea);
