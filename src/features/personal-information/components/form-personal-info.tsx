import { useContext } from 'react';

import FormGeneralPersonlaInfo from '@features/personal-information/components/form-general-personal-info';
import SocialLinks from '@features/personal-information/components/social-link/social-links';
import { contextFormPersonalInfo } from '@features/personal-information/context/context-form-personal-info';
import Button from '@components/ui/button';
import Divider from '@components/ui/divider';
import KeyMetrics from '@features/personal-information/components/key-metric/key-metrics';

const FormPersonalInfo = () => {
    const { handleOnSubmit, isLoading } = useContext(contextFormPersonalInfo);
    return (
        <>
            <FormGeneralPersonlaInfo />
            <Divider />
            <SocialLinks />
            <Divider />
            <KeyMetrics />
            <Divider />
            <Button onClick={handleOnSubmit} className="ml-auto md:min-w-[8rem]" isLoading={isLoading}>
                Save
            </Button>
        </>
    );
};

export default FormPersonalInfo;
