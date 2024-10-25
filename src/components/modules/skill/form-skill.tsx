import Button from '@components/ui/button';
import InputSelect from '@components/ui/input/input-select';
import ContainerModal from '@components/ui/modal/container-modal';
import {
  ACTION_TYPE_SKILL,
  skillContext,
  TTypeActionModalFormSkill,
} from '@context/modules/skill/skill-context';
import useFormCustome, { TOnFieldChange } from '@hooks/use-form-custome';
import skillSchema, {
  initialFormSkill,
  skillDefaultValues,
  TFormSkill,
} from '@lib/validation/module/skill/skill-schema';

import { useContext, useState } from 'react';

const FormSkill = () => {
  const {
    state: { modalFormSkill },
    dispatch,
  } = useContext(skillContext);

  const { handleSubmit, handleGetAttrs, handleOnChange, reset } =
    useFormCustome<TFormSkill>({
      formSchema: skillSchema,
      defaultValues: skillDefaultValues,
      onFieldChange: handleFieldChange,
    });

  const [formStaticAttrs, setFormStaticAttrs] = useState(initialFormSkill);

  function handleFieldChange(params: TOnFieldChange<TFormSkill>) {}

  const handleOnSubmit = handleSubmit(async (data) => {
    console.log('data: ', data);
  });

  const handlleCloseFormSkill = () => {
    dispatch({
      type: ACTION_TYPE_SKILL.SET_MODAL_FORM_SKILL,
      payload: {
        isShow: false,
      },
    });
    reset();
  };

  return (
    <ContainerModal
      isShow={modalFormSkill.isShow}
      onClose={handlleCloseFormSkill}
      title={
        <>
          <div>Form Skill</div>
          <div className="text-body-base font-normal">
            Action:{' '}
            {modalFormSkill.action === TTypeActionModalFormSkill.ADD
              ? 'Add'
              : 'Edit'}
          </div>
        </>
      }
      customeClass={{
        mdBody: '!overflow-visible',
        mdContent: '!overflow-visible w-[32rem]',
        mdModal: '!overflow-visible',
      }}
    >
      <form onSubmit={handleOnSubmit} className="space-y-4 w-full mx-auto">
        <div className="grid md:grid-cols-2 gap-4">
          <InputSelect
            {...handleGetAttrs('category')}
            {...formStaticAttrs['category']}
            onChange={handleOnChange}
          />
          <InputSelect
            {...handleGetAttrs('skill')}
            {...formStaticAttrs['skill']}
            onChange={handleOnChange}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <InputSelect
            {...handleGetAttrs('level')}
            {...formStaticAttrs['level']}
            onChange={handleOnChange}
          />
          <InputSelect
            {...handleGetAttrs('yearOfExperiance')}
            {...formStaticAttrs['yearOfExperiance']}
            onChange={handleOnChange}
          />
        </div>
        <Button type="submit" className="ml-auto">
          Save
        </Button>
      </form>
    </ContainerModal>
  );
};

export default FormSkill;
