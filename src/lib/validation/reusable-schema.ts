import validation, { messageError } from '@lib/validation';
import z, { ZodEffects, ZodOptional, ZodString } from 'zod';

type TZString<TMandatory extends boolean> = (params: {
  name: string;
  min?: number;
  max?: number;
  mandatory?: TMandatory;
}) => ZodString | z.ZodOptional<ZodString>;

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

type TZNumber = (params: {
  name: string;
  min?: number;
  max?: number;
  mandatory?: boolean;
}) => z.ZodNumber | z.ZodOptional<z.ZodNumber>;

export const zNumber: TZNumber = (params) => {
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
    .max(15, { message: 'Phone number must not exceed 15 characters' })
    .refine((val) => /^08\d{8,13}$/.test(val), {
      message: 'Phone Number should be in 08XXXXXXXXXX format',
    });

  return mandatory ? phoneSchema : phoneSchema.optional();
};

type TZEnum<T extends [string, ...string[]]> = (params: {
  enum: [string, ...string[]];
  mandatory?: boolean;
}) => z.ZodEnum<T> | z.ZodOptional<z.ZodEnum<T>>;

export const zEnum: TZEnum<[string, ...string[]]> = (params) => {
  const { enum: enumValues, mandatory } = params;
  const enumSchema = z.enum(enumValues);

  return mandatory ? enumSchema : enumSchema.optional();
};
