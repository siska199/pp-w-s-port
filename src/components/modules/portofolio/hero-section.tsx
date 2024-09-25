import { IconDownload } from "@assets/icons";
import Button from "@components/ui/button";
import Image from "@components/ui/image";

const HeroSection = () => {
  return <div className=" min-h-[calc(100%)] flex items-center justify-center gap-8">
    <div className="gap-2 flex flex-col justify-center h-full ">
        <h5 className="font-medium !text-white">I'm Siska Apriana Rifianti</h5>
        <h1 className="font-bold font-bubblegum-sans !text-white">Frontend Developer</h1>
        <div className="space-y-4">
            <p className="ml-1  italic text-body-large !text-white">Turning Vision into Reality with Scalable, Beautiful Code </p>
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
    <div className="">
        <Image className="clip-path-hero-img  w-[25rem] aspect-square bg-transparent" src="dummy-images/profesional-image.jpg"/>
    </div>
</div>;
};

export default HeroSection;
