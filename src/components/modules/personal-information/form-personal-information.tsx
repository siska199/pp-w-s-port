import useGeneralAPI from '@apis/use-general-api';
import Button from '@components/ui/button';
import InputBase from '@components/ui/input/input-base';
import InputSelect from '@components/ui/input/input-select';
import InputTextArea from '@components/ui/input/input-text-area';
import InputTextEditor from '@components/ui/input/input-text-editor';
import InputUploadFile from '@components/ui/input/input-upload-file';
import { generateOptions } from '@lib/helper';
import { initialFormPersonalInformation } from '@lib/validation/module/personal-information/personal-information-schema';
import { TEventOnChange } from '@typescript/modules/ui/ui-types';
import { useEffect, useState } from 'react';

const FormPersonlaInformation = () => {
  const { getListProvince } = useGeneralAPI();

  const [form, setForm] = useState(initialFormPersonalInformation);

  useEffect(() => {
    handleInitialData();
  }, []);

  const handleInitialData = async () => {
    const provinces = await getListProvince();
    form['id_province'].options = generateOptions({
      options: provinces,
      labelName: 'name',
      valueName: 'id',
    });

    setForm({ ...form });
  };

  const handleOnChange = (e: TEventOnChange) => {
    const currForm = form;
    const name = e.target.name as keyof typeof form;
    const value = e.target.value;
    currForm[name] = value;

    if (name == 'id_province') {
      currForm['id_city'].value = '';
      currForm['id_district'].value = '';
      currForm['id_postal_code'].value = '';
    }

    if (name == 'id_city') {
      currForm['id_district'].value = '';
      currForm['id_postal_code'].value = '';
    }

    if (name == 'id_district') {
      currForm['id_postal_code'].value = '';
    }

    if (['id_city', 'id_province', 'id_postalcode']?.includes(name)) {
      form['id_city'].disabled = !currForm.id_province.value;
      form['id_district'].disabled = !currForm.id_city.value;
      form['id_postal_code'].disabled = !currForm.id_district.value;
    }

    setForm({
      ...currForm,
    });
  };

  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <InputBase {...form['first_name']} onChange={handleOnChange} />
        <InputBase {...form['last_name']} onChange={handleOnChange} />
      </div>
      <InputBase {...form['id_profession']} onChange={handleOnChange} />
      <div className="grid grid-cols-2 gap-4">
        <InputSelect {...form['id_province']} onChange={handleOnChange} />
        <InputSelect {...form['id_city']} onChange={handleOnChange} />
        <InputSelect {...form['id_district']} onChange={handleOnChange} />
        <InputSelect {...form['id_postal_code']} onChange={handleOnChange} />
      </div>
      <InputTextArea {...form['bio']} onChange={handleOnChange} />
      <InputTextEditor {...form['about_me']} onChange={handleOnChange} />
      <InputUploadFile
        {...form['professional_image']}
        onChange={handleOnChange}
      />

      <Button type="submit" className="ml-auto">
        Save
      </Button>
    </form>
  );
};

export default FormPersonlaInformation;
