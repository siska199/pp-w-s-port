import useReusableAPI from '@apis/use-reusable-api';
import Button from '@components/ui/button';
import InputBase from '@components/ui/input/input-base';
import InputSelect from '@components/ui/input/input-select';
import InputTextArea from '@components/ui/input/input-text-area';
import InputTextEditor from '@components/ui/input/input-text-editor';
import InputUploadFile from '@components/ui/input/input-upload-file';
import useFormCustome, { TOnFieldChange } from '@hooks/useFormCustome';
import { generateOptions } from '@lib/helper';
import personalInformationSchema, {
  initialFormPersonalInformation,
  personalInformationDefaultValues,
  TFormPersonalInformation,
} from '@lib/validation/module/personal-information/personal-information-schema';
import { useEffect, useState } from 'react';

const FormPersonlaInformation = () => {
  const { getListProvince } = useReusableAPI();
  const { handleSubmit, handleGetAttrs, watch, reset, handleOnChange } =
    useFormCustome<TFormPersonalInformation>({
      formSchema: personalInformationSchema,
      defaultValues: personalInformationDefaultValues,
      onFieldChange: handleFieldChange,
    });

  const [formStaticAttrs, setFormStaticAttrs] = useState(
    initialFormPersonalInformation
  );

  useEffect(() => {
    handleInitialData();
  }, []);

  const handleInitialData = async () => {
    const provinces = await getListProvince();
    formStaticAttrs['province'].options = generateOptions({
      options: provinces,
      labelName: 'name',
      valueName: 'code',
    });
    setFormStaticAttrs({ ...formStaticAttrs });
  };

  function handleFieldChange(params: TOnFieldChange<TFormPersonalInformation>) {
    const { fieldName } = params;
    const currentValues = watch();

    if (fieldName === 'province') {
      currentValues.city = '';
      currentValues.district = '';
      currentValues.postalCode = '';
    }

    if (fieldName === 'city') {
      currentValues.district = '';
    }

    if (fieldName === 'district') {
      currentValues.postalCode = '';
    }

    formStaticAttrs['city'].disabled = !currentValues.province;
    formStaticAttrs['district'].disabled = !currentValues.city;
    formStaticAttrs['postalCode'].disabled = !currentValues.district;

    reset({
      ...currentValues,
    });
    setFormStaticAttrs({ ...formStaticAttrs });
  }

  const handleOnSubmit = handleSubmit(async (data) => {
    console.log('data: ', data);
  });

  return (
    <form onSubmit={handleOnSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <InputBase
          {...handleGetAttrs('firstName')}
          {...formStaticAttrs['firstName']}
          onChange={handleOnChange}
        />
        <InputBase
          {...handleGetAttrs('lastName')}
          {...formStaticAttrs['lastName']}
          onChange={handleOnChange}
        />
      </div>
      <InputBase
        {...handleGetAttrs('profession')}
        {...formStaticAttrs['profession']}
        onChange={handleOnChange}
      />
      <div className="grid grid-cols-2 gap-4">
        <InputSelect
          {...handleGetAttrs('province')}
          {...formStaticAttrs['province']}
          onChange={handleOnChange}
        />
        <InputSelect
          {...handleGetAttrs('city')}
          {...formStaticAttrs['city']}
          onChange={handleOnChange}
        />
        <InputSelect
          {...handleGetAttrs('district')}
          {...formStaticAttrs['district']}
          onChange={handleOnChange}
        />
        <InputSelect
          {...handleGetAttrs('postalCode')}
          {...formStaticAttrs['postalCode']}
          onChange={handleOnChange}
        />
      </div>
      <InputTextArea
        {...handleGetAttrs('bio')}
        {...formStaticAttrs['bio']}
        onChange={handleOnChange}
      />
      <InputTextEditor
        {...handleGetAttrs('aboutMe')}
        {...formStaticAttrs['aboutMe']}
        onChange={handleOnChange}
      />
      <InputUploadFile
        {...handleGetAttrs('professionalImage')}
        {...formStaticAttrs['professionalImage']}
        onChange={handleOnChange}
      />

      <Button type="submit" className="ml-auto">
        Save
      </Button>
    </form>
  );
};

export default FormPersonlaInformation;
