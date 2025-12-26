import { memo, useContext } from 'react';

import { contextFormPersonalInfo } from '@features/personal-information/context/context-form-personal-info';
import InputBase from '@components/ui/input/input-base';
import InputUploadFile from '@components/ui/input/input-file/input-file-v1';
import InputPhoneNumber from '@components/ui/input/input-phone-number';
import InputSelect from '@components/ui/input/input-select/input-select';
import InputTextArea from '@components/ui/input/input-text-area';

const FormGeneralPersonlaInfo = memo(() => {
    const { formGeneralPersonalInfo: form, handleOnChangeFormGeneralPersonalInfo: handleOnChange } = useContext(contextFormPersonalInfo);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <InputBase {...form['first_name']} onChange={handleOnChange} />
                <InputBase {...form['last_name']} onChange={handleOnChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <InputBase {...form['email']} onChange={handleOnChange} />
                <InputPhoneNumber {...form['phone_number']} onChange={handleOnChange} />
            </div>
            <InputSelect {...form['id_profession']} onChange={handleOnChange} />
            <div className="grid grid-cols-2 gap-4">
                <InputSelect {...form['id_province']} onChange={handleOnChange} />
                <InputSelect {...form['id_city']} onChange={handleOnChange} />
                <InputSelect {...form['id_district']} onChange={handleOnChange} />
                <InputSelect {...form['id_postal_code']} onChange={handleOnChange} />
            </div>
            <InputBase {...form['bio']} onChange={handleOnChange} />
            <InputTextArea {...form['about_me']} onChange={handleOnChange} />
            <InputUploadFile {...form['professional_image']} onChange={handleOnChange} />
            <InputUploadFile {...form['resume']} onChange={handleOnChange} />
        </div>
    );
});
export default FormGeneralPersonlaInfo;
