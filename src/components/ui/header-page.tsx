import Button from "@components/ui/button";

interface TProps {
    title : string;
    onClickAddData? : ()=>void;
}


const HeaderPage = (props:TProps) => {
    const {title,onClickAddData} = props
  return(
    <div className="border-b flex gap-4 items-center pb-8 ">
        <h2 className="font-bold text-heading-04">{title}</h2>
        {
            onClickAddData && <Button variant={'soft-primary'} onClick={onClickAddData } className="!p-2 mt-1 w-8 h-8"><span className="text-body-large font-medium -mt-1">+</span></Button>
        }
    </div>
  )
};

export default HeaderPage;
