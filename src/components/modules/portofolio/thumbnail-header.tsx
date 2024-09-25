import Navbar from "@components/navbar";
import Button from "@components/ui/button";
import Image from "@components/ui/image";

const ThumbnailHeader = () => {

  return(
    <div className="w-full relative">
      <Image src="dummy-images/thumbnail.jpeg" className="h-[10rem] md:h-[17rem]" customeClassName={{image:"object-top"}}/>
      <div className="absolute px-6 md:px-8 -bottom-20 md:-bottom-24 flex gap-4 w-full">
        <Image  src="dummy-images/profesional-image.jpg" className=" w-[7rem] h-[7rem] md:w-[10rem] md:h-[10rem] shadow-lg rounded-full "/>
        <div className="relative mt-10 md:mt-20 flex gap-8 flex-col md:flex-row md:justify-between flex-grow">
          <div className="space-y-1 md:space-y-4">
            <h5 className="font-bold text-body-xl md:text-heading-05">Siska Apriana Rifianti</h5>
            <p className="leading-4">I'm a Frotend Developer based on Jakarta</p>
          </div>
            <Button className="absolute -bottom-6 md:static !font-medium !py-2 border-2 border-sucess-500" shape={"circle"} variant={"soft-sucess"}>Download Resume</Button>
        </div>
      </div>
    </div>
  )
};

export default ThumbnailHeader;