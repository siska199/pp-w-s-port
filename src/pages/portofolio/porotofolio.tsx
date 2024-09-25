import CardAboutMe from "@components/modules/portofolio/card-about-me";
import CardSkill from "@components/modules/portofolio/card-skill";
import ThumbnailHeader from "@components/modules/portofolio/thumbnail-header";
import { useParams } from "react-router-dom";

const Portofolio = () => {

  const {id} = useParams();

  console.log("params: ", id)

  return <div className="h-full md:max-w-[900px] mx-auto ">
    <ThumbnailHeader/>
    <div className="px-12 py-8 mt-[8rem]">
      <div className=" border-t space-y-8 divide-y">
        <CardAboutMe/>
        <CardSkill/>
      </div>
    </div>
  </div>;
};

export default Portofolio;
