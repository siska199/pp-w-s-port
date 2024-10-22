import HeaderPage from '@components/ui/header-page';
import {
  ACTION_TYPE_SKILL,
  skillContext,
} from '@context/modules/skill/skill-context';
import { useContext } from 'react';
import FormFilterSKill from './form-filter-skill';
import TableSkill from './table-skill';
import ModalFormSkill from './modal-form-skill';

const MainSkill = () => {
  const { state, dispatch } = useContext(skillContext);

  const handleAddSkill = () => {
    dispatch({
      type: ACTION_TYPE_SKILL.SET_MODAL_FORM_SKILL,
      payload: {
        isShow: true,
      },
    });
  };

  return (
    <>
      <div className="space-y-8">
        <HeaderPage title={'Skill'} onClickAddData={handleAddSkill} />
        <FormFilterSKill />
        <TableSkill />
      </div>
      <ModalFormSkill />
    </>
  );
};

export default MainSkill;
