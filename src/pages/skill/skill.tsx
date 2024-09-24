import FormFilterSKill from "@components/modules/skill/form-filter-skill";
import Button from "@components/ui/button";

const Skill = () => {
  return(
    <div className=" space-y-8">
      <div className="border-b flex gap-4 items-center pb-8 ">
        <h2 className="font-bold text-heading-04">Skill</h2>
        <Button variant={'soft-primary'} className="!p-2 mt-1 w-8 h-8"><span className="text-body-large font-medium -mt-1">+</span></Button>
      </div>
      <FormFilterSKill/>
    </div>
  )
};

export default Skill;
