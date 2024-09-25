import { IconArrowUp } from "@assets/icons";
import Badge from "@components/ui/badge";
import Button from "@components/ui/button";
import Image from "@components/ui/image";
import { projects } from "@lib/data/dummy";

const ProjectSection = () => {
  return <div className="min-h-[calc(100%-5rem)] text-white my-8 space-y-10 ">
        <h3 className="text-heading-05 md:text-heading-03 text-center font-bold font-bubblegum-sans">Projects</h3>
        <div className="grid grid-cols-1 gap-8 max-w-[50rem] mx-auto">
        {
            projects?.map((project, i)=><CardProject key={i} {...project}/>)
        }
        </div>
  </div>;
};

interface TPropsCardProject {
    thumbnail : string;
    id : number
    title : string;
    description : string;
    techStack : string[]
}
const CardProject = (props : TPropsCardProject)=>{
    const {thumbnail,} = props
    return <div className="overflow-hidden border-b py-8 ">
        <Image src={thumbnail} className=" h-[15rem] border-1 shadow-2xl"/>
        <div className="space-y-4 p-4">
            <h5 className=" text-white text-body-large font-bold">{props.title}</h5>
            <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum consequatur suscipit illo, enim accusantium repellat?</p>
            <div className="flex gap-2 flex-wrap">
                {
                    props?.techStack?.map((tect)=><Badge variant={"soft-gray"} label={tect}/>)
                }
            </div>
            <Button variant={"solid-black"} >View Project <IconArrowUp className="icon-white rotate-90 mt-1"/></Button>
        </div>
    </div>
}

export default ProjectSection;
