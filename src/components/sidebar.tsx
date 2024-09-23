import Button from "@components/ui/button";
import Image from "@components/ui/image";
import useCurrentPath from "@hooks/useCurrentPath";
import menuSidebar from "@lib/data/menu-sidebar";
import { cn } from "@lib/helper";
import { useAppSelector } from "@store/store";

const Sidebar = () => {
  const isToggleSidebar = useAppSelector((state) => state?.ui?.isToggleSidebar);
  const { currentPath }= useCurrentPath()

  return (
    // <div className="bg-black/50 fixed translate-y-0  z-[9] w-full ">
    // </div>
      <div className=" md:z-0  h-screen md:relative bg-login  w-fit to-purple-300 ">
      <div
        className={cn({
          'sticky top-0  space-y-4 transition-all w-[15rem]  h-full' : true,
          'w-0 p-0'                                                   : isToggleSidebar,
        })}
      >
        {
          !isToggleSidebar && <>          
            <div className="gap-2 px-6 flex">
              <h3 className="text-body-3xl font-bold py-6 text-white">
                <span className="text-primary-50 ">S-</span>Port
              </h3>
            </div>
            <div className=" flex flex-col gap-4 p-4">
              {menuSidebar?.map((data, i) => (
                <Button
                  key={i}
                  to={data.url}
                  variant={"solid-white"}
                  className={cn({
                    'gap-4 w-full justify-start py-2  bg-glassmorphism  border-none hover:!text-black !text-white'  : true,
                    "bg-white !text-black ":currentPath.name === data.name
                  })}
                >

                  <Image 
                    src={data.src || ''} 
                    className={cn({
                      'w-6 h-6 bg-white border p-1 rounded-full  z-[9]'   : true,
                      'bg-primary-100 border-primary-700'               : currentPath.name === data.name,
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
