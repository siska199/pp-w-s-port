import InputBase from '@components/ui/input/input-base';
import InputSelect from '@components/ui/input/input-select';
import InputTextArea from '@components/ui/input/input-text-area';
import InputUploadFile from '@components/ui/input/input-upload-file';
import { zodResolver } from '@hookform/resolvers/zod';
import { provinces } from '@lib/data/dummy';
import { excludeRef } from '@lib/helper';
import personalInformationSchema, {
  personalInformationDefaultValues,
  TFormPersonalInformation,
} from '@lib/validation/module/personal-information-schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TEventOnChange } from 'types/ui-types';

const FormPersonlaInformation = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TFormPersonalInformation>({
    resolver: zodResolver(personalInformationSchema, {}, { raw: true }),
    defaultValues: personalInformationDefaultValues,
  });

  const handleOnChange = (e: TEventOnChange) => {
    const name = e.target.name as keyof TFormPersonalInformation;
    const value = e.target.value;
    setValue(name, value);
  };

  const handleOnSubmit: SubmitHandler<TFormPersonalInformation> = async (
    data
  ) => {
    try {
      console.log('data: ', data);
    } catch (error: any) {
      console.log('error: ', error?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <InputBase
          label="First Name"
          {...excludeRef(register('firstName'))}
          value={watch('firstName')}
          onChange={handleOnChange}
          errorMessage={errors?.firstName?.message}
          placeholder="e.g Siska Apriana"
        />
        <InputBase
          label="Last Name"
          {...excludeRef(register('lastName'))}
          value={watch('lastName')}
          onChange={handleOnChange}
          errorMessage={errors?.lastName?.message}
          placeholder="e.g Rifianti"
        />
      </div>
      <InputBase
        label="Profession"
        {...excludeRef(register('profession'))}
        value={watch('profession')}
        onChange={handleOnChange}
        errorMessage={errors?.profession?.message}
        placeholder="e.g Frontend Developer"
      />

      <div className="grid grid-cols-2 gap-4">
        <InputSelect
          label="Province"
          {...excludeRef(register('province'))}
          value={watch('province')}
          onChange={handleOnChange}
          options={provinces}
          placeholder="e.g Jawa Timur"
        />
        <InputSelect
          label="City"
          {...excludeRef(register('city'))}
          value={watch('city')}
          onChange={handleOnChange}
          options={provinces}
          placeholder="e.g Situbondo"
        />
        <InputSelect
          label="District"
          {...excludeRef(register('district'))}
          value={watch('district')}
          onChange={handleOnChange}
          options={provinces}
          placeholder="e.g Besuki"
        />
        <InputSelect
          label="Postal Code"
          {...excludeRef(register('postalCode'))}
          value={watch('postalCode')}
          onChange={handleOnChange}
          options={provinces}
          placeholder="e.g 68356"
        />
      </div>
      <InputTextArea
        label={'Bio'}
        {...excludeRef(register('bio'))}
        value={watch('bio')}
        maxLength={100}
        placeholder={`e.g I'm Frontend Developer based on Jakarta, Indonesia`}
        onChange={handleOnChange}
      />
      <InputUploadFile
        label="Professional Image"
        {...excludeRef(register('professionalImage'))}
        value={watch('professionalImage')}
        onChange={handleOnChange}
      />
    </form>
  );
};

export default FormPersonlaInformation;
