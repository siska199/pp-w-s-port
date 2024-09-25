import { IconHumburger, IconLogout, IconUser } from "@assets/icons";
import Logo from "@components/logo";
import Avatar from "@components/ui/avatar";
import Button from "@components/ui/button";
import DropdownBase, { TOptionDropdown } from "@components/ui/dropdown";
import useCurrentPath from "@hooks/useCurrentPath";
import { route } from "@lib/data/global";
import { handleSetAuth } from "@store/features/auth/authSlice";
import { handleToggleSidebar } from "@store/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@store/store";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";


const Navbar = () => {

  const {currentPath : {handle}}   = useCurrentPath()

  return (
    <nav className=" p-3 sticky border-b backdrop-blur-lg top-0 z-[10] flex gap-4 items-center">
      {
        handle?.name==="portofolio" ? <ContentPortofolio/> : <ContentProtectedRoute/>
      }
    </nav>
  );
};


const ContentProtectedRoute = ()=>{
  const isToggleSidebar = useAppSelector((state) => state?.ui?.isToggleSidebar);
  const dispatch        = useAppDispatch();
  const navigate        = useNavigate()

  const handleOnToggle = () => {
    dispatch(handleToggleSidebar(!isToggleSidebar));
  };

  const handleOnClickItemDropdown = (data:TOptionDropdown)=>{
    switch(data.value){
      case 'profile':
        break;
      case 'logout':
        dispatch(handleSetAuth(false))
        navigate(route.auth.child.signIn.fullPath,{replace:true})
        break;
    }
    
  }

  
  const optionDropdown = useMemo(()=>[
    {
      label     : (<><IconUser/> Change Profile</>),
      value     : "profile",
      className : "border-b",
    },
    {
      label     : (<><IconLogout  /> Sign Out</>),
      value     : "logout",
    },
  ],[])
  return <div className="px-3 flex justify-between w-full items-center">
      <IconHumburger className="cursor-pointer" onClick={handleOnToggle} />
      <div className="ml-auto">
        <div className="flex gap-4 ">
          <Avatar
            width={50}
            height={50}
            src={'avatar.png'}
            alt="avatar"
            className="self-center border-gray-200 rounded-full"
          />
          <div className="flex flex-col justify-center space-y-1">
            <p className="text-black font-semibold">Siska Apriana</p>
            <p>Frontend Developer</p>
          </div>
          <DropdownBase 
            options={optionDropdown} 
            onClick={handleOnClickItemDropdown}
            customeClass={{
              containerDropdown:"h-fit my-auto",
              btnDropdown:'rounded-full p-2 my-auto',
              overlay : 'mt-[1.4rem]'
            }}
            position="right"
          />
        </div>
      </div>
  </div>
}


const ContentPortofolio = ()=>{

  const sectionsMenu = [
    {
      name  : 'aboutme',
      title : 'About Me',
      url   : "#about-me",
      classsName: '' // Soft blue for a calm introduction
    },
    {
      name  : 'skill',
      title : 'Skill',
      url   : "#skill",
      classsName: '' // Green for growth and learning

    },
    {
      name  : 'work-history',
      title : 'Work History',
      url   : "#work-history",
      classsName: '' // Yellow for energy and focus on skills

    },
    {
      name  : 'project',
      title : 'Project',
      url   : "#project",
      classsName: '' // Pink for dynamism and creativity in work history

    },
    {
      name  : 'education',
      title : 'Education',
      url   : "#education",
      classsName: '' // Purple for innovation and project display

    },
  ]


  return <div className="flex  gap-8 md:py-2 justify-between items-center w-full px-3 ">
    <Logo className="min-w-[5rem]"/>

    <div className=" flex gap-4 ">
        {
          sectionsMenu?.map((data,i)=>(
            <div key={i} className={`${data.classsName} border-b  min-w-[7rem] text-center cursor-pointer-custome  pb-2 text-body-small font-medium w-fit  md:text-body-medium`}>
              {data?.title}
            </div>
          ))
        }
    </div>
  </div>
}

export default Navbar;
