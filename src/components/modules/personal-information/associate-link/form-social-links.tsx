import InputBase from '@components/ui/input/input-base';
import {
  socialLinkContext,
  TSocialLink,
} from '@context/modules/personal-info/social-link-context';
import { TEventOnChange } from 'types/ui-types';
import { useContext, useEffect, useState } from 'react';
import Image from '@components/ui/image';
import Button from '@components/ui/button';
import socialLinkSchema from '@lib/validation/module/personal-information/social-link-schema';
import z from 'zod';
const FormSocialLinks = () => {
  const {
    state: { selectedSocialLinks },
  } = useContext(socialLinkContext);

  const [listFormSocialLink, setListFormSocialLink] = useState<
    (TSocialLink & { value: string })[]
  >([]);

  useEffect(() => {
    const updateListFormSocialLink = selectedSocialLinks?.map(
      (data: TSocialLink) => {
        const result = {
          ...data,
          value: data.defaultValue || '',
        };
        delete result.defaultValue;
        return result;
      }
    );
    setListFormSocialLink([...updateListFormSocialLink]);
  }, [selectedSocialLinks]);

  const handleOnChangeListFormSocialLink = (
    index: number,
    e: TEventOnChange
  ) => {
    listFormSocialLink[index] = {
      ...listFormSocialLink[index],
      value: e.target.value,
    };

    setListFormSocialLink([...listFormSocialLink]);
  };

  const handleOnSubmit = () => {
    try {
      let isValid = true;
      const updatelistFormSocialLink = listFormSocialLink?.map((form, i) => {
        const result = socialLinkSchema.safeParse({ url: form.value });
        if (!result.success) isValid = false;
        return {
          ...form,
          errorMessage: result.error?.errors[0]?.message,
        };
      });

      if (isValid) {
        //
      }

      setListFormSocialLink([...updatelistFormSocialLink]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log('is invalid', error.errors);
      }
    }
  };

  return (
    <div className="min-h-[10rem] space-y-4">
      {listFormSocialLink?.map((data, index) => {
        return (
          <InputBase
            key={index}
            {...data}
            onChange={(e) => handleOnChangeListFormSocialLink(index, e)}
            customeElement={{
              start: <Image src={data.image} className="w-4 h-4" />,
            }}
            label={data.name}
          />
        );
      })}
      {listFormSocialLink?.length > 0 && (
        <Button onClick={handleOnSubmit} className="ml-auto">
          Save
        </Button>
      )}
    </div>
  );
};

export default FormSocialLinks;
