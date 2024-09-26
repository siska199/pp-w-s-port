import { IconArrowUp, IconSearch } from "@assets/icons";
import Badge from "@components/ui/badge";
import Button from "@components/ui/button";
import Image from "@components/ui/image";
import InputBase from "@components/ui/input/input-base";
import { projects } from "@lib/data/dummy";
import { useState } from "react";

const ProjectSection = () => {
    const [keyword, setKeyword] = useState('')
  return <div className="min-h-[calc(100%-5rem)] text-white my-8 md:space-y-4 py-8 px-4 md:px-8">
        <h3 className="text-heading-05 md:text-heading-03 text-center font-bold font-bubblegum-sans mb-6">Projects</h3>
        <InputBase customeClass={{ciV4:"max-w-[40rem] mx-auto", ciV2:"bg-transparent !border-primary", input:"bg-transparent placeholder:text-white" }} customeElement={{start:<IconSearch className="icon-white"/>}} name={'keyword'} value={keyword} onChange={(e)=>setKeyword(e.target.value)} placeholder="Search Project by Name, Category Skill, Skill or Company... "/>
        <div className="grid md:grid-cols-3 md:gap-4  mx-auto ">
        {
            projects?.map((project, i)=><CardProject key={i} {...project}/>)
        }
        </div>
        <div className="w-full justify-center flex">
            <Button shape={"circle"} variant={'link-black'} className="min-w-[20rem]  !text-white md:text-body-large bg-split !py-3 !rounded-md md:font-bold cursor-pointer-custome">Load More +</Button>
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
    return <div className="overflow-hidden px-4 py-8 ">
        <Image src={thumbnail} overlay={{
            withBackdrop:true,
            isShowOnHover:true,
            content : <div className="p-4 flex flex-col space-y-2 items-end">
                <p className="text-white font-bold">
                <Badge variant={"outline-white"} className="bg-transparent  font-bold" label={"Personal Project - Fullstack Developer"}/>
                </p>
                <p className="font-bold text-white">11 April 2022 - 15 April 2025</p>
            </div>
        }}

             className="  h-[13rem] md:h-[15rem] aspect-square border-1 shadow-image-arise border-gray-500 " customeClassName={{image:'', }}/>
        <div className="space-y-4 py-4">
            <h5 className=" text-white text-body-large font-bold">{props.title}</h5>
            <p className="text-white line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum consequatur suscipit illo, enim accusantium repellat?</p>
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
