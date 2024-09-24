import Button from "@components/ui/button";
import Image from "@components/ui/image";
import useCurrentPath from "@hooks/useCurrentPath";
import useMediaQuery from "@hooks/useMediaQuery";
import menuSidebar from "@lib/data/menu-sidebar";
import { cn } from "@lib/helper";
import { handleToggleSidebar } from "@store/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@store/store";
import { useEffect } from "react";

const Sidebar = () => {
  const isToggleSidebar = useAppSelector((state) => state?.ui?.isToggleSidebar);
  const dispatch        = useAppDispatch()
  const { currentPath } = useCurrentPath()
  const {isMaxMd}       = useMediaQuery()

  useEffect(()=>{
    dispatch(handleToggleSidebar(isMaxMd ? true : false))
  },[isMaxMd])


  return (
    <div className={` md:z-0  min-h-screen  md:relative w-fit ${isMaxMd && !isToggleSidebar && 'bg-black/50 fixed translate-y-0  z-[9] w-full'} `}>
      <div className={`sticky top-0  space-y-4 transition-all  bg-login  h-full ${isToggleSidebar?'w-0 p-0':'w-full md:w-[15rem] '}`}>
        {
          !isToggleSidebar && <>          
            <div onClick={()=> dispatch(handleToggleSidebar(!isToggleSidebar))} className="cursor-pointer gap-2 px-6 flex">
              <h3 className="text-body-3xl font-test font-bold py-6 text-white">
                <span className="text-primary-50 ">S-</span>Port
              </h3>
            </div>
            <div className=" flex flex-col gap-4 p-4">
              {menuSidebar?.map((data, i) => (
                <Button
                  key={i}
                  to={data.url}
                  variant={"solid-white"}
                  onClick={()=>isMaxMd?dispatch(handleToggleSidebar(true)):null}
                  className={cn({
                    'gap-4 w-full justify-start py-2  bg-glassmorphism  border-none hover:!text-black !text-white'  : true,
                    "bg-white !text-black ":currentPath?.handle?.name === data?.name
                  })}
                >

                  <Image 
                    src={data.src || ''} 
                    className={cn({
                      'w-6 h-6 bg-white border p-1 rounded-full  z-[9]'   : true,
                      'bg-primary-100 border-primary-700'               : currentPath?.handle?.name === data?.name,
                    })} 
                    customeClassName={{image:'object-contain'}} alt="icon menu sidebar" 
                  />
                  <span className={cn({})}>{data.title}</span>
                </Button>
              ))}
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default Sidebar;
