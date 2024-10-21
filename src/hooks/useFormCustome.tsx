import { zodResolver } from '@hookform/resolvers/zod';
import { excludeRef } from '@lib/helper';
import {
  DefaultValues,
  FieldValues,
  Path,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { TEventOnChange } from 'types/ui-types';
import { ZodSchema } from 'zod';

export interface TOnFieldChange<TFormSchema extends FieldValues> {
  fieldName: Path<TFormSchema>;
  value: any;
  setValue: UseFormSetValue<TFormSchema>;
}

export interface TFormCustome<TFormSchema extends FieldValues> {
  formSchema: ZodSchema<TFormSchema>;
  defaultValues: DefaultValues<TFormSchema>;
  onFieldChange?: (params: TOnFieldChange<TFormSchema>) => void;
}

type THandleGetAttrsReturn<
  TFormSchema extends FieldValues,
  TField extends Path<TFormSchema>
> = {
  value: TFormSchema[TField];
  errorMessage?: string;
} & Omit<ReturnType<UseFormRegister<TFormSchema>>, 'ref'> &
  TObject;

const useFormCustome = <TFormSchema extends FieldValues>(
  props: TFormCustome<TFormSchema>
) => {
  const { formSchema, defaultValues, onFieldChange } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    resetField,
    reset,
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema, {}, { raw: true }),
    defaultValues,
  });

  const handleOnChange = (e: TEventOnChange) => {
    const name = e.target.name as Path<TFormSchema>;
    const value = e.target.value;
    setValue(name, value);
    onFieldChange && onFieldChange({ fieldName: name, value, setValue });
  };

  const handleGetAttrs = <TField extends Path<TFormSchema>>(
    field: TField
  ): THandleGetAttrsReturn<TFormSchema, TField> => {
    return {
      ...excludeRef(register(field)),
      value: watch(field),
      errorMessage: errors?.[field]?.message as string,
    };
  };

  return {
    handleOnChange,
    handleSubmit,
    watch,
    register,
    errors,
    resetField,
    handleGetAttrs,
    reset,
  };
};

export default useFormCustome;
