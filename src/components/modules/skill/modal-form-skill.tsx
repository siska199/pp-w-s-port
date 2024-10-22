import InputSelect from '@components/ui/input/input-select';
import ContainerModal from '@components/ui/modal/container-modal';
import {
  ACTION_TYPE_SKILL,
  skillContext,
  TTypeActionModalFormSkill,
} from '@context/modules/skill/skill-context';
import useFormCustome, { TOnFieldChange } from '@hooks/useFormCustome';
import skillSchema, {
  initialFormSkill,
  skillDefaultValues,
  TFormSkill,
} from '@store/skill/skill-schema';
import { useContext, useState } from 'react';

const ModalFormSkill = () => {
  const {
    state: { modalFormSkill },
    dispatch,
  } = useContext(skillContext);

  const { handleSubmit, handleGetAttrs, handleOnChange } =
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
    >
      <form onSubmit={handleOnSubmit}>
        <div className="grid grid-cols-2">
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
        <div className="grid grid-cols-2">
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
      </form>
    </ContainerModal>
  );
};

export default ModalFormSkill;
