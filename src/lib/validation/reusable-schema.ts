import { handleValidateType } from '@lib/helper';
import validation, { messageError } from '@lib/validation';
import { TTypeFile } from 'types/ui-types';
import z, { ZodEffects, ZodOptional, ZodString } from 'zod';

export const zString = <TMandatory extends boolean = true>(params: {
  name: string;
  min?: number;
  max?: number;
  mandatory?: TMandatory;
}): TMandatory extends true ? ZodString : ZodOptional<ZodString> => {
  const { name, max = 255, min = 1, mandatory = true } = params;

  let stringSchema: ZodString | ZodOptional<ZodString> = z.string().max(max, {
    message: messageError.maxCharacter(name, max),
  });

  if (mandatory) {
    stringSchema = stringSchema
      .nonempty({
        message: messageError.required(name),
      })
      .min(min, {
        message: messageError.minCharacter(name, min),
      });
  } else {
    stringSchema = stringSchema.optional();
  }

  return stringSchema as TMandatory extends true
    ? ZodString
    : ZodOptional<ZodString>;
};

export const zNumber = (params: {
  name: string;
  min?: number;
  max?: number;
  mandatory?: boolean;
}): z.ZodNumber | z.ZodOptional<z.ZodNumber> => {
  const { name, max = 255, min = 1, mandatory = true } = params;

  const numberSchema = z.number().max(max, {
    message: messageError.maxNumber(name, max),
  });

  if (mandatory)
    return numberSchema.min(min, {
      message: messageError.minNumber(name, min),
    });

  return numberSchema.optional();
};

type TResultZPassword<TMandatory extends boolean> = TMandatory extends true
  ? ZodEffects<ZodString, string, string>
  : ZodEffects<ZodOptional<ZodString>, string | undefined, string | undefined>;

export const zPassword = <TMandatory extends boolean = true>(
  mandatory: TMandatory = true as TMandatory
): TResultZPassword<TMandatory> => {
  return zString<TMandatory>({ name: 'Password', mandatory }).refine(
    (val) => validation.password.regex.test(val as string),
    {
      message: validation.password.message,
    }
  ) as TResultZPassword<TMandatory>;
};

export const zEmail = (mandatory = true) => {
  return zString({ name: 'Email', mandatory }).refine(
    (val) => (mandatory ? validation.email.regex.test(val as string) : true),
    {
      message: validation.email.message,
    }
  );
};

export const zPhoneNumber = (mandatory = true) => {
  const phoneSchema = z
    .string()
    .max(15, { message: messageError.phoneNumberExceedLength })
    .refine((val) => /^08\d{8,13}$/.test(val), {
      message: messageError.phoneNumberFormat,
    });

  return mandatory ? phoneSchema : phoneSchema.optional();
};

export const zEnum = <TEnum extends [string, ...string[]]>(params: {
  enum: TEnum;
  mandatory?: boolean;
}): z.ZodEnum<TEnum> | z.ZodOptional<z.ZodEnum<TEnum>> => {
  const { enum: enumValues, mandatory } = params;
  const enumSchema = z.enum(enumValues);

  return mandatory ? enumSchema : enumSchema.optional();
};

export const zFileLocale = (params: {
  name: string;
  size?: number;
  listAcceptedType: TTypeFile[];
  mandatory?: boolean;
}): z.ZodType<File | null | undefined> => {
  const { size = 5, listAcceptedType, mandatory = true } = params;
  const fileSchema = z
    .instanceof(File, { message: 'File is required' })
    ?.refine(
      (file) => file.size > size * 1024 * 1024,
      messageError.fileType(listAcceptedType)
    )
    .refine((file) => {
      const isValid = handleValidateType({
        file,
        listAcceptedType,
      });
      return isValid;
    }, messageError.fileType(listAcceptedType));

  return mandatory ? fileSchema : fileSchema?.optional()?.nullable();
};

export const zLink = (params: { mandatory?: boolean }) => {
  const { mandatory } = params;
  const linkSchema = zString({ name: 'Link', max: 2083 })?.url({
    message: messageError.url,
  });
  return mandatory ? linkSchema : linkSchema?.optional();
};
