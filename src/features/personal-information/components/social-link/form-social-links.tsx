import React, { useCallback, useContext } from 'react';

import { contextFormPersonalInfo } from '@features/personal-information/context/context-form-personal-info';
import { TSelectedSocialLink } from '@features/personal-information/types/personal-information-types';
import Image from '@components/ui/image';
import InputBase from '@components/ui/input/input-base';

import { TEventOnChange } from '@typescript/ui-types';
import EmptyData from '@components/ui/empty-data';

const FormSocialLinks = (): JSX.Element => {
    const { listSelectedSocialLink } = useContext(contextFormPersonalInfo);

    if (listSelectedSocialLink.length === 0) {
        return (
            <EmptyData
                customeClass={{
                    container: 'w-full !border-none',
                    img: 'h-[5rem]',
                }}
            />
        );
    }

    return (
        <div className="space-y-4">
            {listSelectedSocialLink.map((item) => (
                <FormSocialLink key={item.name} {...item} />
            ))}
        </div>
    );
};

const FormSocialLink = React.memo((props: TSelectedSocialLink) => {
    const { name, image, value, errorMessage, placeholder } = props;
    const { setListSelectedSocialLink } = useContext(contextFormPersonalInfo);

    const handleOnChange = useCallback((e: TEventOnChange) => {
        const name = e.target.name;
        const value = e.target?.value;

        setListSelectedSocialLink((prev) =>
            prev?.map((socialLink) => {
                const isChangedData = socialLink?.name === name;
                return {
                    ...socialLink,
                    value: isChangedData ? value : socialLink?.value,
                    errorMessage: isChangedData ? '' : socialLink?.errorMessage,
                };
            }),
        );
    }, []);

    return (
        <InputBase
            name={name}
            customeElement={{
                start: <Image src={image} className="w-4 h-4" />,
            }}
            value={value}
            label={name}
            errorMessage={errorMessage}
            onChange={handleOnChange}
            placeholder={placeholder}
        />
    );
});

export default FormSocialLinks;
