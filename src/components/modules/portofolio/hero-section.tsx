import { IconDownload } from "@assets/icons";
import Button from "@components/ui/button";
import Image from "@components/ui/image";
import useMediaQuery from "@hooks/useMediaQuery";

const HeroSection = () => {

    const {isMaxMd} = useMediaQuery()
  return <div className=" min-h-[calc(100%)] flex flex-col-reverse md:flex-row items-center justify-center gap-8 pt-[rem] md:pt-0 px-2">
    <div className="gap-2 flex flex-col justify-center h-full ">
        <h5 className=" text-center !text-white">I'm Siska Apriana Rifianti</h5>
        <h1 className="font-bold text-center text-heading-03 md:text-heading-01 font-bubblegum-sans !text-white">Frontend Developer</h1>
        {
            isMaxMd && <Image className="md:clip-path-hero-img mx-auto rounded-full md:rounded-none w-[10rem] md:w-[25rem] aspect-square bg-transparent" src="dummy-images/profesional-image.jpg"/>
        }

        <div className="space-y-4 flex flex-col items-center">
            <p className="ml-1  italic text-body-large text-center !text-white">Turning Vision into Reality with Scalable, Beautiful Code </p>
            <Button shape={"circle"}>
                <IconDownload className="icon-white" /> Download Resume
            </Button>
            <div className="flex gap-2">
                <Button className="!p-2" variant={"soft-primary"}  ><Image className="w-6 aspect-square rounded-full" src="github.png"/></Button>
                <Button className="!p-2" variant={"soft-primary"}  ><Image className="w-6 aspect-square rounded-full" src="linkedin.png"/></Button>
                <Button className="!p-2" variant={"soft-primary"}  ><Image className="w-6 aspect-square rounded-full" src="whatsapp.png"/></Button>
                <Button className="!p-2" variant={"soft-primary"}  ><Image className="w-6 aspect-square rounded-full" src="gmail.png"/></Button>

            </div>
        </div>
    </div>
     <div className=" hidden md:flex w-full md:w-auto">
        <Image className="md:clip-path-hero-img mx-auto rounded-full md:rounded-none w-[10rem] md:w-[25rem] aspect-square bg-transparent" src="dummy-images/profesional-image.jpg"/>
    </div> 
</div>;
};

export default HeroSection;
