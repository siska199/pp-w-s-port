import FormFilterSKill from "@components/modules/skill/form-filter-skill";
import TableSkill from "@components/modules/skill/TableSkill";
import HeaderPage from "@components/ui/header-page";

const Skill = () => {
  
  const handleAddSkill = ()=>{

  }
  return(
    <div className="container-page">
      <HeaderPage title="Skill" onClickAddData={handleAddSkill}/>
      <FormFilterSKill/>
      <TableSkill/>
    </div>
  )
};

export default Skill;
